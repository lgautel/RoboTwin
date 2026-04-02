# RoboTwin 项目代码设计文档

> 本文档系统性地分析 RoboTwin 2.0 项目的代码架构设计，阐述其核心优势、设计原理与最佳使用方式。

---

## 目录

1. [项目概述与核心优势](#1-项目概述与核心优势)
2. [整体架构设计](#2-整体架构设计)
3. [核心类设计](#3-核心类设计)
4. [任务系统设计](#4-任务系统设计)
5. [机器人控制与运动规划](#5-机器人控制与运动规划)
6. [感知系统设计](#6-感知系统设计)
7. [策略框架设计](#7-策略框架设计)
8. [数据采集流水线](#8-数据采集流水线)
9. [策略评估流水线](#9-策略评估流水线)
10. [配置系统设计](#10-配置系统设计)
11. [域随机化设计](#11-域随机化设计)
12. [最佳实践指南](#12-最佳实践指南)

---

## 1. 项目概述与核心优势

### 1.1 项目定位

RoboTwin 2.0 是一个**可扩展的双臂机器人操作仿真平台与基准**（CVPR 2025 Highlight），基于 SAPIEN 3.0.0b1 物理引擎构建。它提供了从**仿真环境搭建**、**专家数据采集**、**策略训练**到**策略评估**的完整闭环工具链。

核心数据：
- **50+ 双臂操作任务**，覆盖抓取、放置、搬运、工具使用等场景
- **5 种机器人形态**（Aloha-AgileX、Piper、Franka-Panda、ARX-X5、UR5-WSG）
- **11+ 策略基线**（DP、ACT、DP3、RDT、pi0、pi05、OpenVLA-oft、TinyVLA、DexVLA、LLaVA-VLA、GO1）
- **100,000+ 预采集专家轨迹**

### 1.2 核心优势

| 优势 | 说明 | 论文数据 |
|------|------|----------|
| **闭环代码生成** | 利用 VLM 自动生成任务代码，视觉反馈修正错误 | 成功率 47.4% → 71.3% |
| **五维域随机化** | 场景杂物、背景纹理、光照、桌面高度、语言指令 | 未见任务提升 31.9% |
| **跨形态支持** | 自适应抓取姿态生成，适配不同自由度平台 | 低自由度平台提升 22.7% |
| **Sim-to-Real** | 合成数据增强真实世界策略性能 | 真实场景提升 24.4% |
| **标准化基准** | 统一接口评估不同策略，公开排行榜 | 5+ 策略横向对比 |
| **大规模数据集** | 开源 100K+ 专家轨迹，支持多模态观测 | HuggingFace 公开 |

### 1.3 系统总览

```mermaid
graph TB
    subgraph "流水线层 Pipeline"
        CD["collect_data.py<br/>数据采集"]
        EP["eval_policy.py<br/>策略评估"]
        PS["policy_model_server.py<br/>分布式推理"]
    end

    subgraph "策略接口层 Policy Interface"
        DP["deploy_policy.py<br/>标准化接口"]
        PM["DP / ACT / DP3 / RDT<br/>pi0 / TinyVLA / DexVLA ..."]
    end

    subgraph "环境层 Environment"
        BT["Base_Task<br/>(gym.Env)"]
        TK["50+ Task 子类"]
    end

    subgraph "机器人控制层 Robot Control"
        RB["Robot<br/>双臂控制"]
        MP["MplibPlanner<br/>RRT + TOPP"]
        CP["CuroboPlanner<br/>GPU 加速"]
    end

    subgraph "感知层 Perception"
        CA["Camera<br/>多相机系统"]
        AC["Actor<br/>物体封装"]
    end

    subgraph "物理仿真层 Simulation"
        SA["SAPIEN 3.0.0b1<br/>物理引擎"]
    end

    subgraph "配置系统 Configuration"
        TC["task_config/*.yml"]
        EC["embodiment_config"]
        CC["camera_config"]
    end

    CD --> BT
    EP --> DP
    DP --> PM
    EP --> BT
    PS --> PM
    BT --> TK
    BT --> RB
    BT --> CA
    BT --> AC
    RB --> MP
    RB --> CP
    CA --> SA
    RB --> SA
    AC --> SA
    TC --> BT
    EC --> RB
    CC --> CA
```

---

## 2. 整体架构设计

### 2.1 分层架构

RoboTwin 采用**六层分层架构**，每层职责清晰、接口明确：

```mermaid
graph TB
    subgraph L6["第六层: 流水线层"]
        direction LR
        L6A["collect_data.py"] ~~~ L6B["eval_policy.py"] ~~~ L6C["policy_model_server.py"]
    end

    subgraph L5["第五层: 策略接口层"]
        direction LR
        L5A["encode_obs()"] ~~~ L5B["get_model()"] ~~~ L5C["eval()"] ~~~ L5D["reset_model()"]
    end

    subgraph L4["第四层: 感知层"]
        direction LR
        L4A["Camera 多相机"] ~~~ L4B["RGB / Depth / PCD"] ~~~ L4C["FPS 下采样"]
    end

    subgraph L3["第三层: 机器人控制层"]
        direction LR
        L3A["Robot 双臂"] ~~~ L3B["运动规划"] ~~~ L3C["TOPP 轨迹优化"]
    end

    subgraph L2["第二层: 环境层"]
        direction LR
        L2A["Base_Task (gym.Env)"] ~~~ L2B["Task 子类"] ~~~ L2C["Actor 封装"]
    end

    subgraph L1["第一层: 物理仿真层"]
        direction LR
        L1A["SAPIEN Engine"] ~~~ L1B["Scene / Entity"] ~~~ L1C["Physics Step"]
    end

    L6 --> L5
    L5 --> L4
    L5 --> L2
    L4 --> L1
    L3 --> L1
    L2 --> L3
    L2 --> L4
    L2 --> L1
```

### 2.2 关键设计决策

**为什么继承 `gym.Env`？**

RoboTwin 的 `Base_Task` 继承 Gymnasium 的 `gym.Env`，这是一个经过深思熟虑的选择：
- 与强化学习生态（Stable Baselines、CleanRL 等）无缝集成
- 标准化的 `step()` / `reset()` / `get_obs()` 接口，降低策略适配成本
- 社区共识：研究者熟悉这套 API，新策略可快速接入

**为什么使用 Template Method 模式？**

50+ 任务共享 90% 的初始化和执行逻辑（场景创建、机器人加载、相机设置、物理步进），仅在物体加载 (`load_actors`)、执行逻辑 (`play_once`)、成功判断 (`check_success`) 三处不同。Template Method 将不变的骨架固化在 `Base_Task` 中，子类只需关注任务特定逻辑。

**为什么使用 YAML 配置驱动？**

实验需要大量调参（机器人形态、相机参数、域随机化强度等），硬编码到 Python 中会导致代码膨胀。YAML 配置实现了**代码与参数分离**，同一份代码通过不同配置文件即可生成不同条件的数据。

---

## 3. 核心类设计

### 3.1 类图总览

```mermaid
classDiagram
    class gym_Env {
        <<abstract>>
        +step(action)
        +reset()
    }

    class Base_Task {
        -scene: sapien.Scene
        -robot: Robot
        -cameras: Camera
        -plan_success: bool
        -eval_success: bool
        -take_action_cnt: int
        -step_lim: int
        -data_type: dict
        -now_obs: dict
        +_init_task_env_(kwargs)
        +setup_scene()
        +create_table_and_wall()
        +load_robot(kwargs)
        +load_camera(kwargs)
        +load_actors()* 
        +play_once()*
        +check_success()* bool
        +get_obs() dict
        +take_action(action, action_type)
        +move(arm1_actions, arm2_actions)
        +grasp_actor(actor, arm_tag)
        +place_actor(actor, arm_tag, target)
        +together_move_to_pose(left, right)
        +move_by_displacement(arm_tag, x, y, z)
        +close_gripper(arm_tag)
        +open_gripper(arm_tag)
        +check_stable()
    }

    class Robot {
        -left_entity: PhysxArticulation
        -right_entity: PhysxArticulation
        -left_planner: Planner
        -right_planner: Planner
        -need_topp: bool
        -communication_flag: bool
        +_init_robot_(scene, kwargs)
        +set_planner(scene)
        +init_joints()
        +move_to_homestate()
        +left_plan_path(pose) dict
        +right_plan_path(pose) dict
        +left_plan_multi_path(poses) dict
        +right_plan_multi_path(poses) dict
        +left_plan_grippers(now, target) dict
        +set_arm_joints(pos, vel, arm_tag)
        +set_gripper(val, arm_tag, step)
        +get_left_ee_pose() list
        +get_right_ee_pose() list
        +get_left_arm_jointState() list
        +get_right_arm_jointState() list
    }

    class Camera {
        -head_camera: sapien.Camera
        -left_camera: sapien.Camera
        -right_camera: sapien.Camera
        -observer_camera: sapien.Camera
        -world_camera1: sapien.Camera
        -world_camera2: sapien.Camera
        -pcd_down_sample_num: int
        +load_camera(scene)
        +update_picture()
        +get_rgb() dict
        +get_depth() dict
        +get_pcd(if_combine) ndarray
        +get_world_pcd() ndarray
        +get_config() dict
        +get_observer_rgb() ndarray
    }

    class Actor {
        -actor: sapien.Entity
        -config: dict
        -mass: float
        +get_point(type, idx, ret)
        +get_contact_point(idx, ret)
        +get_functional_point(idx, ret)
        +get_target_point(idx, ret)
        +get_orientation_point(ret)
        +get_pose() sapien.Pose
        +get_name() str
        +set_mass(mass)
    }

    class Action {
        +arm_tag: ArmTag
        +action: str
        +target_pose: list
        +target_gripper_pos: float
        +args: dict
    }

    class ArmTag {
        <<Singleton>>
        +value: str
        +opposite: ArmTag
    }

    class MplibPlanner {
        +plan(qpos, target_pose)
        +TOPP(path, timestep)
    }

    class CuroboPlanner {
        +plan(qpos, target_pose)
        +plan_batch(qpos, poses)
    }

    gym_Env <|-- Base_Task
    Base_Task *-- Robot : 组合
    Base_Task *-- Camera : 组合
    Base_Task o-- Actor : 聚合 0..*
    Base_Task ..> Action : 使用
    Action --> ArmTag
    Robot --> MplibPlanner : 策略模式
    Robot --> CuroboPlanner : 策略模式

    class beat_block_hammer {
        +load_actors()
        +play_once()
        +check_success() bool
    }
    class pick_dual_bottles {
        +load_actors()
        +play_once()
        +check_success() bool
    }
    class handover_block {
        +load_actors()
        +play_once()
        +check_success() bool
    }

    Base_Task <|-- beat_block_hammer
    Base_Task <|-- pick_dual_bottles
    Base_Task <|-- handover_block
```

### 3.2 各类职责说明

| 类 | 文件 | 职责 |
|----|------|------|
| `Base_Task` | `envs/_base_task.py` | 任务生命周期管理：场景初始化、物体加载、动作执行、观测采集、数据保存 |
| `Robot` | `envs/robot/robot.py` | 双臂机器人控制：运动规划、关节驱动、夹爪控制、末端执行器状态查询 |
| `Camera` | `envs/camera/camera.py` | 多相机管理：RGB/深度/点云采集、FPS 下采样、相机内外参维护 |
| `Actor` | `envs/utils/actor_utils.py` | 物体操作封装：抓取点、功能点、目标点的世界坐标变换 |
| `Action` | `envs/utils/action.py` | 动作表示：目标位姿 (`move`)、夹爪状态 (`open`/`close`/`gripper`) |
| `ArmTag` | `envs/utils/action.py` | 手臂标识：单例模式，`"left"` / `"right"` 及其反向引用 |

### 3.3 关键数据结构

**观测 (Observation) 数据结构：**

```python
observation = {
    "observation": {
        "head_camera": {
            "intrinsic_cv": ndarray[3,3],   # 相机内参
            "extrinsic_cv": ndarray[4,4],   # 相机外参
            "cam2world_gl": ndarray[4,4],   # 相机到世界变换
            "rgb": ndarray[H,W,3],          # uint8 RGB 图像
            "depth": ndarray[H,W],          # float64 深度 (毫米)
        },
        "left_camera": { ... },
        "right_camera": { ... },
    },
    "joint_action": {
        "left_arm": ndarray[7],             # 左臂关节角度
        "left_gripper": float,              # 归一化 [0,1]
        "right_arm": ndarray[7],            # 右臂关节角度
        "right_gripper": float,             # 归一化 [0,1]
        "vector": ndarray[16],              # 拼接向量
    },
    "endpose": {
        "left_endpose": [x,y,z,qx,qy,qz,qw],
        "left_gripper": float,
        "right_endpose": [x,y,z,qx,qy,qz,qw],
        "right_gripper": float,
    },
    "pointcloud": ndarray[N,6],             # xyz + rgb
}
```

**动作 (Action) 类型：**

| action_type | 格式 | 说明 |
|-------------|------|------|
| `qpos` | `[left_arm(7) + left_gripper(1) + right_arm(7) + right_gripper(1)]` | 关节角度控制 |
| `ee` | `[left_ee(7) + left_gripper(1) + right_ee(7) + right_gripper(1)]` | 末端执行器位姿控制 |
| `delta_ee` | `[left_delta(7) + left_gripper(1) + right_delta(7) + right_gripper(1)]` | 增量末端执行器控制 |

---

## 4. 任务系统设计

### 4.1 Template Method 模式

`Base_Task` 定义了任务的完整生命周期骨架，子类通过重写三个抽象方法来实现具体任务逻辑：

```python
# 子类必须重写的三个方法
class MyTask(Base_Task):
    def load_actors(self):
        """加载任务所需的物体到场景中"""
        self.obj = create_actor(self.scene, ...)
        
    def play_once(self):
        """定义任务的执行逻辑（动作序列）"""
        self.move(
            self.grasp_actor(self.obj, arm_tag="left"),
        )
        
    def check_success(self) -> bool:
        """判断任务是否成功完成"""
        return np.linalg.norm(obj_pos - target_pos) < 0.05
```

### 4.2 任务初始化序列图

```mermaid
sequenceDiagram
    participant Script as collect_data.py
    participant Factory as class_decorator()
    participant Task as TaskSubclass
    participant BT as Base_Task
    participant Robot as Robot
    participant Camera as Camera
    participant Scene as SAPIEN Scene

    Script->>Factory: class_decorator(task_name)
    Factory->>Factory: importlib.import_module(f"envs.{task_name}")
    Factory->>Task: getattr(module, task_name)()
    Factory-->>Script: task_instance

    Script->>Task: setup_demo(**config)
    Task->>BT: _init_task_env_(**kwargs)

    Note over BT: 阶段 1: 场景创建
    BT->>BT: setup_scene()
    BT->>Scene: 创建 Engine + Renderer + Scene
    BT->>BT: create_table_and_wall()
    BT->>Scene: 添加桌面、墙壁、灯光

    Note over BT: 阶段 2: 机器人加载
    BT->>Robot: load_robot(**kwargs)
    Robot->>Robot: _init_robot_(scene, **kwargs)
    Robot->>Scene: 加载 URDF 模型
    Robot->>Robot: set_planner(scene)
    Robot->>Robot: init_joints()
    Robot->>Robot: move_to_homestate()
    Robot->>Robot: set_origin_endpose()

    Note over BT: 阶段 3: 感知系统
    BT->>Camera: load_camera(**kwargs)
    Camera->>Scene: 创建 head/wrist/observer/world 相机
    Camera->>Camera: update_picture()

    Note over BT: 阶段 4: 任务物体
    BT->>Task: load_actors() [子类重写]
    Task->>Scene: 创建物体 (Actor 封装)
    Task->>BT: add_prohibit_area(actor, padding)

    Note over BT: 阶段 5: 稳定性验证
    BT->>BT: check_stable()
    BT->>Scene: 多步物理仿真
    BT->>BT: 检查物体位置是否稳定
```

### 4.3 任务执行序列图

```mermaid
sequenceDiagram
    participant Script as collect_data.py
    participant Task as TaskSubclass
    participant BT as Base_Task
    participant Robot as Robot
    participant Scene as SAPIEN

    Script->>Task: play_once() [子类重写]

    Note over Task: 构建动作序列
    Task->>BT: grasp_actor(obj, "left")
    BT->>BT: choose_grasp_pose(obj, "left")
    BT->>Robot: create_target_pose_list(pose, center, "left")
    Robot-->>BT: 10 个旋转变体候选姿态
    BT->>Robot: left_plan_multi_path(pose_list)
    Robot-->>BT: 批量规划结果
    BT->>BT: choose_best_pose(results)
    BT-->>Task: (ArmTag("left"), [Action(move), Action(close)])

    Task->>BT: move(left_actions, right_actions)

    Note over BT: 同步双臂执行
    BT->>BT: together_move_to_pose(left_pose, right_pose)
    BT->>Robot: left_plan_path(target_pose)
    BT->>Robot: right_plan_path(target_pose)

    loop 每个仿真步
        BT->>Robot: set_arm_joints(pos[t], vel[t], "left")
        BT->>Robot: set_arm_joints(pos[t], vel[t], "right")
        BT->>Scene: scene.step()
        BT->>BT: _update_render()
        opt 数据采集模式
            BT->>BT: _take_picture() → PKL
        end
    end

    Task->>Task: check_success()
    Task-->>Script: success / failure
```

### 4.4 Factory 模式：动态任务加载

任务通过 `importlib` 动态加载，实现了**任务注册零成本**——只需在 `envs/` 目录下创建同名 Python 文件，文件内定义同名类即可：

```python
# script/collect_data.py 中的工厂方法
def class_decorator(task_name):
    envs_module = importlib.import_module(f"envs.{task_name}")
    env_class = getattr(envs_module, task_name)
    env_instance = env_class()
    return env_instance
```

**约定**：`envs/beat_block_hammer.py` 文件内必须定义 `class beat_block_hammer(Base_Task)` 类。文件名与类名严格一致。

### 4.5 示例：pick_dual_bottles 任务流程

```python
class pick_dual_bottles(Base_Task):
    def load_actors(self):
        # 创建两个瓶子和目标位置
        self.bottle1 = create_actor(...)  # 左侧
        self.bottle2 = create_actor(...)  # 右侧
        self.target_left = [x1, y1, z1]
        self.target_right = [x2, y2, z2]

    def play_once(self):
        # 1. 双臂同时抓取
        self.move(
            self.grasp_actor(self.bottle1, "left"),
            self.grasp_actor(self.bottle2, "right")
        )
        # 2. 双臂同时抬起
        self.move(
            self.move_by_displacement("left", z=0.1),
            self.move_by_displacement("right", z=0.1)
        )
        # 3. 双臂同时放置
        self.move(
            self.place_actor(self.bottle1, "left", self.target_left),
            self.place_actor(self.bottle2, "right", self.target_right)
        )

    def check_success(self):
        pos1 = self.bottle1.get_pose().p
        pos2 = self.bottle2.get_pose().p
        return (np.linalg.norm(pos1[:2] - self.target_left[:2]) < 0.1 and
                np.linalg.norm(pos2[:2] - self.target_right[:2]) < 0.1)
```

---

## 5. 机器人控制与运动规划

### 5.1 双臂架构设计

`Robot` 类采用**左右对称镜像 API** 设计，每条手臂拥有独立的规划器、关节控制和状态查询：

```
Robot
├── 左臂 (left)
│   ├── left_entity → URDF 模型
│   ├── left_planner → 运动规划器
│   ├── left_arm_joints → 7 自由度关节
│   ├── left_gripper → 夹爪
│   └── left_ee → 末端执行器
└── 右臂 (right)
    ├── right_entity → URDF 模型
    ├── right_planner → 运动规划器
    ├── right_arm_joints → 7 自由度关节
    ├── right_gripper → 夹爪
    └── right_ee → 末端执行器
```

**两种构型模式**：
- **单一构型** (`dual_arm_embodied=True`)：如 Aloha-AgileX，左右臂在同一个 URDF 模型中
- **独立构型** (`dual_arm_embodied=False`)：如 Franka + UR5，左右臂是不同的机器人模型，通过 `embodiment_dis` 设置间距

### 5.2 运动规划策略

```mermaid
classDiagram
    class Robot {
        +left_planner_type: str
        +right_planner_type: str
        +set_planner(scene)
        +left_plan_path(pose) dict
        +left_plan_multi_path(poses) dict
    }

    class MplibPlanner {
        <<CPU>>
        +plan(qpos, target) path
        +TOPP(path, timestep) trajectory
        特点: RRT 采样 + TOPP 时间优化
        适用: 通用场景 稳定可靠
    }

    class CuroboPlanner {
        <<GPU>>
        +plan(qpos, target) path
        +plan_batch(qpos, targets) paths
        特点: GPU 并行轨迹优化
        适用: 批量规划 高性能需求
    }

    Robot --> MplibPlanner : planner_type = "mplib_RRT"
    Robot --> CuroboPlanner : planner_type = "curobo"
```

### 5.3 运动规划序列图

```mermaid
sequenceDiagram
    participant BT as Base_Task
    participant Robot as Robot
    participant Planner as Planner
    participant TOPP as TOPPRA
    participant Scene as SAPIEN

    Note over BT: 单臂规划流程
    BT->>Robot: left_plan_path(target_pose)
    Robot->>Robot: _trans_from_gripper_to_endlink(pose, "left")
    
    alt communication_flag = True (多进程)
        Robot->>Robot: left_conn.send(("plan_path", args))
        Note right of Robot: 独立进程中执行
        Robot->>Robot: left_conn.recv()
    else communication_flag = False (单进程)
        Robot->>Planner: plan(current_qpos, target_pose)
    end
    
    Planner-->>Robot: raw_waypoints
    
    alt need_topp = True
        Robot->>TOPP: 时间最优路径参数化
        TOPP-->>Robot: position[] + velocity[]
    end
    
    Robot-->>BT: {"status": "Success", "position": ndarray, "velocity": ndarray}

    Note over BT: 执行轨迹
    loop 每个路径点 t
        BT->>Robot: set_arm_joints(position[t], velocity[t], "left")
        Robot->>Scene: 设置关节驱动目标 + 速度
        Robot->>Scene: 计算被动力(重力补偿)
        BT->>Scene: scene.step() (Δt = 1/250s)
    end
```

### 5.4 批量抓取姿态选择

抓取操作中，`Robot` 会为一个基准抓取姿态生成 **10 个旋转变体**（`ROTATE_NUM=10`），然后通过批量规划找到最优可达姿态：

```mermaid
sequenceDiagram
    participant BT as Base_Task
    participant Robot as Robot
    participant Planner as Planner

    BT->>BT: choose_grasp_pose(actor, arm_tag)
    BT->>BT: 获取 Actor 的 contact_point 列表

    loop 每个接触点
        BT->>Robot: create_target_pose_list(grasp_pose, center, arm_tag)
        Robot-->>BT: 10 个旋转变体姿态

        BT->>Robot: left_plan_multi_path(10 个姿态)
        Robot->>Planner: plan_batch(current_qpos, 10 个目标)
        Planner-->>Robot: 10 个规划结果 (Success/Fail)
        Robot-->>BT: {status[10], position[10,N,J], velocity[10,N,J]}

        BT->>BT: choose_best_pose(results)
        Note over BT: 选择路径最短的成功方案
    end

    BT-->>BT: 返回最优抓取姿态 + 预到达位姿
```

### 5.5 同步双臂执行

双臂同时运动时，采用**归一化进度同步**策略，确保两臂协调运动：

```python
# 核心同步逻辑 (简化)
now_left_id, now_right_id = 0, 0
while now_left_id < left_n_step or now_right_id < right_n_step:
    left_progress = now_left_id / left_n_step
    right_progress = now_right_id / right_n_step
    
    if now_left_id < left_n_step and left_progress <= right_progress:
        robot.set_arm_joints(left_pos[now_left_id], left_vel[now_left_id], "left")
        now_left_id += 1
    
    if now_right_id < right_n_step and right_progress <= left_progress:
        robot.set_arm_joints(right_pos[now_right_id], right_vel[now_right_id], "right")
        now_right_id += 1
    
    scene.step()
```

---

## 6. 感知系统设计

### 6.1 多相机配置

```mermaid
graph LR
    subgraph "相机系统"
        HC["Head Camera<br/>头部固定相机<br/>主视角观测"]
        WL["Left Wrist Camera<br/>左腕部相机<br/>跟随左臂"]
        WR["Right Wrist Camera<br/>右腕部相机<br/>跟随右臂"]
        OC["Observer Camera<br/>第三人称相机<br/>320x240 可视化"]
        WC1["World Camera 1<br/>世界相机 1<br/>640x480 重建"]
        WC2["World Camera 2<br/>世界相机 2<br/>640x480 重建"]
    end

    subgraph "输出模态"
        RGB["RGB 图像"]
        DEP["深度图 (mm)"]
        PCD["点云 (xyz+rgb)"]
        SEG["分割图 (mesh/actor)"]
        CAM["相机内外参"]
    end

    HC --> RGB
    HC --> DEP
    HC --> PCD
    HC --> SEG
    WL --> RGB
    WL --> DEP
    WR --> RGB
    WR --> DEP
    WC1 --> PCD
    WC2 --> PCD
    OC --> RGB

    HC --> CAM
    WL --> CAM
    WR --> CAM
```

### 6.2 点云处理流程

点云生成采用 **Farthest Point Sampling (FPS)** 进行下采样，确保空间均匀覆盖：

```mermaid
flowchart LR
    A["原始深度图"] --> B["深度到3D点<br/>使用相机内参"]
    B --> C["世界坐标变换<br/>cam2world_gl"]
    C --> D{"pcd_crop?"}
    D -- Yes --> E["工作空间裁剪<br/>pcd_crop_bbox"]
    D -- No --> F["保留所有点"]
    E --> G["FPS 下采样<br/>pcd_down_sample_num"]
    F --> G
    G --> H["输出: ndarray[N,6]<br/>xyz + rgb"]
```

### 6.3 相机类型规格

| 类型 | 分辨率 | FOV | 用途 |
|------|--------|-----|------|
| D435 | 320x240 | 37° | 默认相机（head/wrist）|
| Large_D435 | 640x480 | 37° | 高分辨率版本 |
| L515 | 320x180 | 45° | 宽视角相机 |
| Large_L515 | 640x360 | 45° | 高分辨率宽视角 |

---

## 7. 策略框架设计

### 7.1 标准化接口

所有策略必须在 `deploy_policy.py` 中实现四个函数：

```python
def encode_obs(observation: dict) -> dict:
    """将环境观测转换为模型输入格式"""
    
def get_model(usr_args: dict) -> Model:
    """加载模型检查点，返回初始化好的模型"""
    
def eval(TASK_ENV, model, observation: dict):
    """单步评估：观测 → 推理 → 执行"""
    
def reset_model(model):
    """重置模型状态（观测窗口、时间聚合等）"""
```

### 7.2 策略接口类图

```mermaid
classDiagram
    class PolicyInterface {
        <<interface>>
        +encode_obs(observation) dict
        +get_model(usr_args) Model
        +eval(TASK_ENV, model, observation)
        +reset_model(model)
    }

    class ModelInterface {
        <<interface>>
        +get_action(obs) ndarray
        +update_obs(obs)
        +set_language(instruction)
        +reset_observation_window()
    }

    class TaskEnvInterface {
        <<interface>>
        +get_instruction() str
        +get_obs() dict
        +take_action(action, action_type)
    }

    class DP {
        n_obs_steps: int
        n_action_steps: int
        temporal_agg: bool
    }
    class ACT {
        all_time_actions: Tensor
        temporal_agg: bool
    }
    class DP3 {
        Hydra配置系统
        使用点云输入
    }
    class RDT {
        checkpoint_path: str
        rdt_step: int
    }
    class pi0 {
        pi0_step: int
        observation_window: Object
    }
    class TinyVLA {
        vla_process: InternVL3Process
        stats: dict
    }
    class GO1 {
        <<HTTP Client>>
        host: str
        port: int
    }

    PolicyInterface <|.. DP
    PolicyInterface <|.. ACT
    PolicyInterface <|.. DP3
    PolicyInterface <|.. RDT
    PolicyInterface <|.. pi0
    PolicyInterface <|.. TinyVLA
    PolicyInterface <|.. GO1

    DP ..|> ModelInterface
    ACT ..|> ModelInterface
    DP3 ..|> ModelInterface
    RDT ..|> ModelInterface
    pi0 ..|> ModelInterface
    TinyVLA ..|> ModelInterface
    GO1 ..|> ModelInterface

    PolicyInterface ..> TaskEnvInterface : eval() 使用
```

### 7.3 策略评估工作流

```mermaid
flowchart TD
    A["eval_policy.py 启动"] --> B["加载 task_config YAML"]
    B --> C["加载 embodiment + camera 配置"]
    C --> D["class_decorator: 动态加载 Task"]
    D --> E["get_model: 加载策略模型"]
    E --> F{"遍历测试种子"}

    F --> G["setup_demo(seed, eval=True)"]
    G --> H["Expert Check:<br/>play_once() 验证种子可行性"]
    H --> I{"专家成功?"}
    I -- No --> J["跳过该种子"]
    J --> F
    I -- Yes --> K["重新初始化环境"]
    K --> L["reset_model(model)"]
    L --> M["observation = get_obs()"]

    M --> N["eval(TASK_ENV, model, observation)"]
    N --> O["encode_obs → get_action → take_action"]
    O --> P{"step_lim 或 success?"}
    P -- No --> O
    P -- Yes --> Q["记录成功/失败"]
    Q --> F

    F -- 所有种子完成 --> R["汇总成功率<br/>保存视频日志"]
```

### 7.4 各策略特点对比

| 策略 | 输入模态 | 语言条件 | 时间聚合 | 特殊依赖 |
|------|----------|----------|----------|----------|
| DP | RGB + qpos | 无 | 是 | diffusion_policy |
| ACT | RGB + qpos | 无 | 可选 | DETR |
| DP3 | 点云 + qpos | 无 | 是 | Hydra, 3D-Diffusion-Policy |
| RDT | RGB + qpos | 是 | 否 | Decision Transformer |
| pi0 | RGB + qpos | 是 | 否 | OpenPI |
| TinyVLA | RGB + qpos | 是 | 否 | InternVL3 |
| GO1 | RGB + qpos | 是 | 否 | HTTP 远程推理 |

---

## 8. 数据采集流水线

### 8.1 端到端工作流

```mermaid
flowchart TD
    A["bash collect_data.sh<br/>task_name task_config gpu_id"] --> B["设置 CUDA_VISIBLE_DEVICES"]
    B --> C["python script/collect_data.py"]

    C --> D["加载 task_config YAML"]
    D --> E["加载 embodiment + camera 配置"]
    E --> F["class_decorator: 创建 Task 实例"]

    F --> G{"遍历 episode_num 集"}

    G --> H["setup_demo(seed=N)"]
    H --> I["_init_task_env_: 初始化场景"]
    I --> J["load_actors: 加载物体"]
    J --> K["check_stable: 物理稳定性检查"]
    K --> L{"稳定?"}
    L -- No --> M["跳过 + 下一个种子"]
    M --> G
    L -- Yes --> N["play_once: 执行任务"]

    N --> O{"每个动作步骤"}
    O --> P["执行运动规划"]
    P --> Q["scene.step() 物理仿真"]
    Q --> R{"帧编号 % save_freq == 0?"}
    R -- Yes --> S["get_obs → _take_picture → PKL"]
    R -- No --> O
    S --> O

    O -- 完成 --> T["check_success()"]
    T --> U{"成功?"}
    U -- Yes --> V["merge_pkl_to_hdf5_video()"]
    V --> W["episode{N}.hdf5 + episode{N}.mp4"]
    U -- No --> X["丢弃 + 重试"]
    X --> G
    W --> G

    G -- 所有 episode 完成 --> Y["清理 .cache 目录"]
```

### 8.2 数据存储结构

```
data/{task_name}/{task_config}/
├── .cache/                          # 临时缓存（采集完成后删除）
│   └── episode{N}/
│       ├── 0.pkl                    # 帧 0 的完整观测字典
│       ├── 1.pkl                    # 帧 1
│       └── ...
├── data/
│   ├── episode0.hdf5                # 合并后的 HDF5 数据
│   ├── episode1.hdf5
│   └── ...
├── video/
│   ├── episode0.mp4                 # 第三人称视角视频
│   └── ...
└── _traj_data/
    ├── episode0.pkl                 # 轨迹规划数据
    └── ...
```

**HDF5 内部结构**：

```
episode{N}.hdf5
├── observation/
│   ├── head_camera/
│   │   ├── rgb          [T, H, W, 3] uint8
│   │   ├── depth        [T, H, W] float64
│   │   ├── intrinsic_cv [T, 3, 3]
│   │   └── extrinsic_cv [T, 4, 4]
│   ├── left_camera/ ...
│   └── right_camera/ ...
├── joint_action/
│   ├── left_arm         [T, 7]
│   ├── left_gripper     [T]
│   ├── right_arm        [T, 7]
│   └── right_gripper    [T]
├── endpose/
│   ├── left_endpose     [T, 7]
│   └── right_endpose    [T, 7]
└── pointcloud/          [T, N, 6]
```

---

## 9. 策略评估流水线

### 9.1 本地评估模式

```mermaid
sequenceDiagram
    participant User as 用户
    participant Eval as eval_policy.py
    participant Task as Task 环境
    participant Policy as 策略模型

    User->>Eval: python eval_policy.py --task beat_block_hammer --policy DP
    Eval->>Eval: 加载配置 (task + embodiment + camera + policy)
    Eval->>Policy: get_model(merged_args)
    Policy-->>Eval: model

    loop 每个测试种子 (100个)
        Eval->>Task: setup_demo(seed, eval_mode=True)

        Note over Eval,Task: Expert Check
        Eval->>Task: play_once()
        Task-->>Eval: success?
        alt 专家失败
            Note over Eval: 跳过该种子
        else 专家成功
            Eval->>Task: 重新初始化 (相同种子)
            Eval->>Policy: reset_model(model)
            Eval->>Task: get_obs()

            loop 直到 step_lim 或 success
                Eval->>Policy: eval(Task, model, obs)
                Policy->>Policy: encode_obs(obs)
                Policy->>Policy: get_action()
                Policy->>Task: take_action(action, "qpos")
                Task->>Task: 运动规划 + 物理仿真
                Task-->>Policy: new_obs
                Policy->>Policy: update_obs(new_obs)
                Task->>Task: check_success()
            end

            Eval->>Eval: 记录成功率
        end
    end

    Eval->>Eval: 输出最终成功率 + 保存视频
```

### 9.2 分布式评估架构

当策略模型过大无法与仿真环境共用 GPU 时，采用 **Server/Client 分离**架构：

```mermaid
graph LR
    subgraph "GPU Server"
        MS["policy_model_server.py"]
        Model["策略模型<br/>(GPU 推理)"]
        MS --> Model
    end

    subgraph "CPU/GPU Client"
        EC["eval_policy_client.py"]
        Env["Task 环境<br/>(SAPIEN 仿真)"]
        EC --> Env
    end

    EC -- "Socket: JSON + Base64 NumPy" --> MS
    MS -- "Socket: 动作序列" --> EC
```

**通信协议**：
```
请求: [4字节长度][JSON 负载]
  JSON: {"cmd": "get_action", "obs": {numpy_array_base64}}

响应: [4字节长度][JSON 负载]
  JSON: {"res": {numpy_array_base64}}
```

NumPy 数组通过 `NumpyEncoder` 序列化为 Base64，保证高效传输。

---

## 10. 配置系统设计

### 10.1 配置层级

```mermaid
flowchart LR
    TC["task_config/*.yml<br/>任务配置"] --> |embodiment 字段| EC["_embodiment_config.yml<br/>形态注册表"]
    EC --> |file_path| RC["assets/embodiments/<br/>{name}/config.yml<br/>机器人详细配置"]
    TC --> |camera 字段| CC["_camera_config.yml<br/>相机规格"]
    TC --> |task_name| SL["_eval_step_limit.yml<br/>评估步数限制"]

    RC --> |URDF, joints, planner| Robot["Robot 初始化"]
    CC --> |h, w, fov| Camera["Camera 初始化"]
    TC --> |domain_randomization| DR["域随机化"]
    TC --> |data_type| DP["数据采集"]

    subgraph "命令行覆盖"
        CLI["--task_name --policy_name<br/>--ckpt_setting --seed"]
    end

    CLI --> |最高优先级| TC
```

### 10.2 核心配置文件

**任务配置 (`demo_randomized.yml` 示例)**：

```yaml
render_freq: 0                # 渲染频率 (0=无头模式)
episode_num: 50               # 采集集数
save_freq: 15                 # 保存频率 (每N帧)
embodiment: [aloha-agilex]    # 机器人形态

domain_randomization:
  random_background: true     # 随机背景纹理
  cluttered_table: true       # 桌面杂物
  clean_background_rate: 0.02 # 2% 使用干净背景
  random_light: true          # 随机光照
  crazy_random_light_rate: 0.02
  random_table_height: 0.03   # 3cm 桌面高度变化
  random_head_camera_dis: 0.05 # 5cm 相机位置抖动

camera:
  head_camera_type: D435
  wrist_camera_type: D435
  collect_head_camera: true
  collect_wrist_camera: true

data_type:
  rgb: true
  depth: false
  pointcloud: false
  endpose: true
  qpos: true
```

**形态配置 (`_embodiment_config.yml`)**：

```yaml
aloha-agilex:
  file_path: "./assets/embodiments/aloha-agilex/"
piper:
  file_path: "./assets/embodiments/piper"
franka-panda:
  file_path: "./assets/embodiments/franka-panda/"
ARX-X5:
  file_path: "./assets/embodiments/ARX-X5"
ur5-wsg:
  file_path: "./assets/embodiments/ur5-wsg"
```

### 10.3 异构双臂配置

支持**左右臂使用不同机器人**：

```yaml
# 单一形态 (双臂同型)
embodiment: [aloha-agilex]

# 异构形态 (左右不同 + 间距)
embodiment: [franka-panda, piper, 0.8]
#            左臂形态      右臂形态  间距(米)
```

配置解析逻辑：
```python
if len(embodiment_type) == 1:
    # 双臂同型: dual_arm_embodied = True
    left_robot_file = right_robot_file = embodiment_path
elif len(embodiment_type) == 3:
    # 异构双臂: dual_arm_embodied = False
    left_robot_file = embodiment_type[0]
    right_robot_file = embodiment_type[1]
    embodiment_dis = embodiment_type[2]
```

---

## 11. 域随机化设计

### 11.1 五维随机化体系

```mermaid
flowchart TD
    DR["域随机化<br/>Domain Randomization"] --> SC["维度 1: 场景杂物<br/>cluttered_table"]
    DR --> BG["维度 2: 背景纹理<br/>random_background"]
    DR --> LT["维度 3: 光照变化<br/>random_light"]
    DR --> TH["维度 4: 桌面高度<br/>random_table_height"]
    DR --> LI["维度 5: 语言指令<br/>language_num"]

    SC --> |"get_cluttered_table()"| SC1["随机放置 0~10 个干扰物"]
    SC1 --> SC2["碰撞检测 + prohibited_area 避让"]

    BG --> |"11,000 张纹理"| BG1["seen/ 训练集"]
    BG --> BG2["unseen/ 测试集"]
    BG --> |"clean_background_rate"| BG3["概率使用干净背景"]

    LT --> LT1["方向光: 随机颜色+强度"]
    LT --> LT2["点光源: 随机颜色+强度"]
    LT --> |"crazy_random_light_rate"| LT3["极端光照: 每帧随机"]

    TH --> |"Uniform[-h, 0]"| TH1["桌面 Z 轴偏移"]

    LI --> LI1["LLM 生成多样指令"]
    LI --> LI2["占位符替换:<br/>{object_id} → 描述<br/>{l} → 'the left arm'"]
    LI --> LI3["seen/unseen 描述分裂"]
```

### 11.2 为什么需要五维随机化？

论文实验表明，策略在环境变化时性能下降严重：
- RDT 模型性能下降 **20.8%**
- Pi0 模型性能下降 **30.1%**

五维随机化的协同作用：

| 维度 | 解决的问题 | 对应的真实世界变化 |
|------|-----------|------------------|
| 场景杂物 | 目标检测鲁棒性 | 桌面上有其他无关物品 |
| 背景纹理 | 视觉特征泛化 | 不同房间、桌面材质 |
| 光照变化 | 光照不变性 | 不同时间、灯光条件 |
| 桌面高度 | 空间感知鲁棒性 | 不同高度的工作台 |
| 语言指令 | 语义理解泛化 | 不同表述方式 |

### 11.3 训练/测试分裂设计

域随机化中的 **seen/unseen 分裂** 是评估泛化能力的关键设计：

- **背景纹理**：`assets/background_texture/seen/` vs `unseen/`
- **语言描述**：`objects_description/{obj}/` 中每个物体都有 `"seen"` 和 `"unseen"` 描述列表
- **评估配置**：`instruction_type: "seen"` 或 `"unseen"` 控制使用哪组描述

---

## 12. 最佳实践指南

### 12.1 新建任务

```mermaid
flowchart LR
    A["1. 创建<br/>envs/my_task.py"] --> B["2. 继承 Base_Task<br/>class my_task(Base_Task)"]
    B --> C["3. 实现<br/>load_actors()"]
    C --> D["4. 实现<br/>play_once()"]
    D --> E["5. 实现<br/>check_success()"]
    E --> F["6. 添加步数限制<br/>_eval_step_limit.yml"]
    F --> G["7. 测试采集<br/>bash collect_data.sh"]
```

**关键要点**：
- 文件名与类名必须一致（如 `my_task.py` → `class my_task`）
- 使用 `Actor` 封装物体，利用 `get_contact_point()` 获取抓取候选点
- 使用高层 API（`grasp_actor`、`place_actor`、`move_by_displacement`）构建动作序列
- 调用 `self.add_prohibit_area(actor, padding)` 避免杂物与任务物体重叠

### 12.2 新增策略

```mermaid
flowchart LR
    A["1. 复制<br/>policy/Your_Policy/"] --> B["2. 实现<br/>deploy_policy.py<br/>四个标准函数"]
    B --> C["3. 配置<br/>deploy_policy.yml"]
    C --> D["4. 实现模型<br/>get_action()<br/>update_obs()"]
    D --> E["5. 编写<br/>eval.sh"]
    E --> F["6. 运行评估<br/>bash eval.sh"]
```

**标准模板**：
```python
# policy/Your_Policy/deploy_policy.py

def encode_obs(observation):
    """提取 RGB 图像和关节状态"""
    head_rgb = observation["observation"]["head_camera"]["rgb"]
    qpos = observation["joint_action"]["vector"]
    return {"image": head_rgb, "state": qpos}

def get_model(usr_args):
    """加载检查点"""
    ckpt_path = f"checkpoints/{usr_args['ckpt_setting']}/model.pt"
    model = YourModel.load(ckpt_path)
    return model

def eval(TASK_ENV, model, observation):
    """推理循环"""
    obs = encode_obs(observation)
    instruction = TASK_ENV.get_instruction()
    model.set_language(instruction)
    
    actions = model.get_action(obs)
    for action in actions:
        TASK_ENV.take_action(action, action_type='qpos')
        observation = TASK_ENV.get_obs()
        obs = encode_obs(observation)
        model.update_obs(obs)

def reset_model(model):
    """重置模型的观测窗口"""
    model.reset_observation_window()
```

### 12.3 新增机器人形态

1. 准备 URDF/SRDF 文件和 `config.yml`，放入 `assets/embodiments/{name}/`
2. 在 `_embodiment_config.yml` 中注册路径
3. `config.yml` 中指定关节名称、夹爪参数、规划器类型、相机位置

### 12.4 域随机化调优

| 场景 | 推荐配置 |
|------|----------|
| **调试/开发** | 使用 `demo_clean.yml`，关闭所有随机化 |
| **训练数据采集** | 使用 `demo_randomized.yml`，开启全部随机化 |
| **控制实验** | 自定义 YAML，逐维度开启以分析各维度贡献 |
| **泛化测试** | 使用 `unseen` 纹理和描述，评估域外性能 |

### 12.5 性能优化建议

- **无头模式**：`render_freq: 0` 关闭可视化，大幅提升采集速度
- **点云下采样**：`pcd_down_sample_num: 1024` 平衡精度与计算量
- **GPU 规划器**：大批量规划时使用 CuroboPlanner 加速
- **分布式推理**：大模型评估使用 server/client 分离，避免 GPU 内存竞争
- **缓存清理**：`clear_cache_freq` 控制 PKL 缓存清理频率，防止磁盘溢出

---

## 附录 A：AI 代码生成系统

`code_gen/` 模块实现了基于 LLM 的**闭环任务代码生成**：

```mermaid
flowchart TD
    A["任务描述<br/>task_description"] --> B["gpt_agent.py<br/>LLM 生成代码"]
    B --> C["生成 play_once() 实现"]
    C --> D["test_gen_code.py<br/>执行测试"]
    D --> E{"成功?"}
    E -- Yes --> F["输出最终代码"]
    E -- No --> G["observation_agent.py<br/>VLM 分析失败原因"]
    G --> H["生成修正建议"]
    H --> B
```

该闭环机制将代码生成成功率从 47.4% 提升至 71.3%，是 RoboTwin 2.0 的核心创新之一。

---

## 附录 B：设计模式总结

| 设计模式 | 应用位置 | 作用 |
|----------|---------|------|
| **Template Method** | `Base_Task` → 50+ Task 子类 | 固化任务生命周期骨架，子类只需实现 3 个方法 |
| **Strategy** | `Robot` → MplibPlanner / CuroboPlanner | 运动规划器可切换，适配不同性能需求 |
| **Factory** | `class_decorator()` + `importlib` | 动态加载任务和策略，零注册成本 |
| **Adapter** | `Actor` 封装 `sapien.Entity` | 为物理引擎对象提供操作语义接口 |
| **Singleton** | `ArmTag("left")` / `ArmTag("right")` | 确保手臂标识唯一性，支持安全比较 |
| **Observer** | `scene.step()` + `_update_render()` | 物理步进与渲染回调解耦 |

---

## 附录 C：依赖关系图

```mermaid
graph TD
    BT["Base_Task"] --> Robot
    BT --> Camera
    BT --> Actor
    BT --> Action
    BT --> SAPIEN["SAPIEN 3.0.0b1"]

    Robot --> MplibPlanner
    Robot --> CuroboPlanner
    Robot --> SAPIEN
    Robot --> transforms3d

    MplibPlanner --> mplib
    MplibPlanner --> toppra

    CuroboPlanner --> curobo["nvidia-curobo"]
    CuroboPlanner --> torch["PyTorch + CUDA"]

    Camera --> SAPIEN
    Camera --> pytorch3d["PyTorch3D (FPS)"]
    Camera --> torch

    Actor --> SAPIEN

    subgraph "数据处理"
        h5py
        imageio
        moviepy
    end

    subgraph "策略框架"
        DP_dep["diffusion_policy"]
        ACT_dep["DETR"]
        DP3_dep["Hydra + OmegaConf"]
        VLA_dep["InternVL3 / OpenVLA"]
    end
```
