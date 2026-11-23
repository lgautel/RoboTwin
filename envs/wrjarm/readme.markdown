# 开源轻量机械臂与无人机空中操作项目调研

> 调研日期：2026-11-23  
> 排序口径：各组均按代码仓库默认分支的最后提交时间由新到旧排列。  
> 数据快照：Stars、Forks、价格及仓库状态均为调研日附近的公开快照，会随时间变化。  
> 范围说明：第二组采用广义“空中操作器（aerial manipulator）”口径，既包括传统多关节机械臂，也包括连续体臂、软夹爪和触觉手；每项均明确标注类型，避免把夹爪误称为传统机械臂。

## 一、结论先行

### 1. 轻量机械臂

- **最低成本、社区最活跃的具身学习入口：SO-101。** 单 follower 的官方 BOM 约 122 美元，LeRobot 生态最强，但负载、刚度和重复定位不能与工业臂类比。
- **最完整的开源桌面工业布局：PAROL6。** CAD、BOM、控制器和固件较齐，但开环步进意味着丢步不可检测，标称重复性不等于绝对定位精度。
- **成熟 ROS/MoveIt 教学基线：OpenMANIPULATOR-X。** 维护时间长、文档完整，代价是 4 轴姿态能力有限且 Dynamixel 成本较高。
- **较大负载的开放研究平台：reBot B601 与 OpenArm。** 两者软件栈较完整；前者更接近单臂工作台平台，后者偏双臂力控和接触研究，均不属于百美元级产品。
- **值得观察的新平台：OpenEAI-Arm、EDULITE A3。** 规格和开放资料有吸引力，但独立复现与长期耐久证据还不充分。

### 2. 无人机与操作器整合

- **通用软硬件底座：Sarax。** PX4、ROS、Gazebo、参数化硬件和实机资料相对齐全，但技术栈仍以 ROS 1 为主。
- **活跃 ROS 2 工程框架：Aerostack2。** 插件化载荷/夹爪接口适合工程集成，但它不是一套固定的多关节机械臂。
- **实机自主抓取代表：OSPREY。** 公开了感知、控制、夹爪和 CAD，并有 144 次室内实验；ROS 2 Foxy 等依赖已经老化。
- **飞行—接触耦合研究：Borinot。** 开放硬件和全身 MPC 价值较高，但复现难度显著高于普通四旋翼夹爪。
- **学习与仿真：AM-Bench、IsaacLab Gripper Drone。** 适合并行训练和控制比较，不应被当作可直接制造的实机方案。
- **传统多关节臂仿真基线：RISC Aerial-Manipulator-Gazebo。** 7-DOF Kinova 配置清楚，但 ROS 1、RotorS、Gazebo 7 已明显陈旧。

## 二、调研方法与筛选过程

### 1. 检索路径

本次先做关键词广搜，再回到一手来源核验。主要关键词组合包括：

- `open source lightweight robot arm`、`desktop robot arm ROS MoveIt`、`low cost robot arm open hardware`
- `LeRobot arm`、`open hardware embodied AI arm`、`3D printed robot arm`
- `open source aerial manipulator`、`UAV manipulator ROS PX4 Gazebo`
- `drone robotic arm GitHub`、`aerial gripper open source`、`continuum aerial manipulator`
- `Isaac Lab aerial manipulation`、`soft gripper UAV`、`dual arm aerial robot`

信息源按可信度大致分为：

1. **一手证据**：项目仓库、许可证文件、官方文档、BOM/CAD、论文及实验数据。
2. **二手证据**：ROS Index、Hackaday、大学课程、独立复现记录和用户购买/装配记录。
3. **社区信号**：Stars、Forks、贡献者、Issue、长期提交记录。它们只反映关注度或协作规模，不等于性能认证。

### 2. 入选标准

轻量机械臂主榜要求：

- 有公开代码仓库，并开放机械设计、固件、控制软件或其中足以复现核心功能的一部分；
- 面向桌面、教育、研究或可移动场景，整机通常为数百克到约 7 kg；“轻量”不等于“廉价”；
- 许可证可识别，且不以“仅非商业使用”冒充严格开源；
- 有足够元信息说明用途、硬件和软件栈。

空中操作项目主榜要求：

- 已把飞行平台与某种操作器放在同一系统、仿真或任务链路中；
- 有明确开源许可证；仅公开论文、视频或无许可证源码的项目不进入主榜；
- 可以是实机平台、仿真基准或工程框架，但必须标明成熟度；
- 广义操作器包括传统串联臂、连续体臂、软夹爪和触觉手。

### 3. 排序与事实边界

- “由新到旧”统一解释为**默认分支最后提交时间**，而不是首次发布年份。这样更能反映当前维护活跃度。
- GitHub 的 `updated_at` 可能因讨论、Star 等事件变化，因此不用于排序。
- 厂商或作者自报的负载、精度、耐久和成功率均标为“项目方/论文报告”；没有独立复测时不把它写成行业共识。
- 未公布的数据明确写“未公开”，不依据图片或舵机型号猜测。

## 三、10 个轻量级开源机械臂项目

### 1. reBot Arm B601-DM / B601-RS

- **仓库**：[Seeed-Projects/reBot-DevArm](https://github.com/Seeed-Projects/reBot-DevArm)
- **项目/规格页**：[reBot Arm B601-RS](https://www.seeedstudio.com/reBot-Arm-B601-RS-Assembled-Kit-with-Gripper-p-6865.html)
- **首次公开 / 最后提交**：2025-11-25 / **2026-11-23**
- **社区快照**：约 4,808 Stars、511 Forks
- **许可证**：硬件 CERN-OHL-W-2.0；软件 Apache-2.0
- **开源范围**：钣金件和打印件源文件、BOM、装配资料、Python SDK、ROS 1/2、MoveIt、LeRobot、Isaac Sim、Pinocchio
- **结构与规格**：6 轴加夹爪；DM 标称负载 1.5 kg、最大臂展约 767 mm、整机约 4.5–4.7 kg；RS 标称负载 2.5 kg、臂展约 754 mm、整机约 6.7 kg
- **成本**：组装版约 1,599–1,799 美元；电源、夹具和 leader arm 可能另购
- **技术栈**：CAN、Python、ROS/ROS 2、MoveIt 2、LeRobot、Isaac Sim、Pinocchio
- **适合任务**：具身数据采集、中等负载抓取、ROS 2/MoveIt 教学、仿真到实机研究

**简评与业界评价**

它是本组中“开放制造资料、ROS/LeRobot 兼容和负载能力”最均衡的新项目之一，短期社区增长很快，也已经进入 LeRobot 支持范围。项目方的[耐久测试](https://github.com/Seeed-Projects/reBot-DevArm/blob/main/hardware/reBot_B601_DM/performance_testing/Performance_Testing.md)同时暴露了现实边界：DM 在满伸展或持续负载时可能因电机过热停机，建议减少有效工作半径并改善散热。现阶段性能证据仍主要来自厂商，独立实验室长期评测不足。

**结论**：适合预算在千美元级、需要完整软件生态的实验室；不属于低功耗、随身或百美元级机械臂。

### 2. SO-101（仓库沿用 SO-ARM100 名称）

- **仓库**：[TheRobotStudio/SO-ARM100](https://github.com/TheRobotStudio/SO-ARM100)
- **生态文档**：[Hugging Face LeRobot SO-101](https://huggingface.co/docs/lerobot/so101)
- **首次公开 / 最后提交**：2024-05-10 / **2026-11-20**
- **社区快照**：约 8,191 Stars、764 Forks
- **许可证**：Apache-2.0
- **开源范围**：CAD、STEP/STL、BOM、装配指南、URDF、MuJoCo 模型；控制与训练主要通过 LeRobot
- **结构与规格**：5 个臂关节加 1 个夹爪，使用 Feetech STS3215 总线舵机；官方没有统一公布标准版负载、重量和重复定位精度
- **成本**：官方 BOM 约 121.94 美元/单 follower，leader + follower 约 229.88 美元，不含 3D 打印
- **技术栈**：LeRobot/Python、USB 串行总线舵机、URDF、MuJoCo、3D 打印
- **适合任务**：leader-follower 遥操作、模仿学习、低成本数据采集、课程实验

**简评与业界评价**

SO-101 是目前最有社区势能的低成本具身学习机械臂之一，优势不是机械性能，而是价格、文档、数据集和 LeRobot 工作流。社区实测普遍指出舵机齿隙、打印公差、结构刚度和发热是主要限制；商业套件宣称的 200–500 g 负载也不能直接外推到所有电压、材料和装配版本。[第三方资料整理](https://goatfarm.team/p/so-101-arm)显示其数据集生态增长很快，[实机评测](https://www.essentialgrade.com/waveshare-so-arm101-6-axis-robotic-arm-review-a-deep-dive-into-open-source-ai-robotics/)则提到打印件公差和夹爪耐久问题。

**结论**：低成本具身 AI 入门首选；不适合精密装配、持续受力或把厂商峰值负载当作满伸动态负载。

### 3. OpenMANIPULATOR-X

- **仓库**：[ROBOTIS-GIT/open_manipulator](https://github.com/ROBOTIS-GIT/open_manipulator)
- **产品与规格**：[ROBOTIS OpenMANIPULATOR](https://en.robotis.com/model/page.php?co_id=prd_openmanipulator)
- **ROS 包索引**：[ROS Index](https://index.ros.org/r/open_manipulator/)
- **首次公开 / 最后提交**：2017-01-20 / **2026-11-18**
- **社区快照**：约 678 Stars、251 Forks
- **许可证**：软件 Apache-2.0；官方提供机械图和可打印件，但硬件资料的许可需逐文件确认
- **开源范围**：ROS 2 控制、MoveIt、Gazebo、GUI、遥操作、CAD/3D 图纸
- **结构与规格**：4 个臂关节加夹爪；标称负载 500 g、臂展 380 mm、整机约 0.70 kg、重复定位小于 0.2 mm
- **成本**：官方套件约 1,400–1,630 美元，电源、OpenCR 或 U2D2 可能另购
- **技术栈**：DYNAMIXEL、ROS 2 Humble/Jazzy、MoveIt 2、Gazebo Harmonic、Python/C++、Arduino/OpenCR
- **适合任务**：ROS 课程、运动规划、移动底盘搭载、低风险桌面抓取

**简评与业界评价**

它的核心价值是成熟度而不是性价比：ROS 包发布、文档、DYNAMIXEL 工具和 TurtleBot 集成都经过多年使用。教育项目与论文长期采用它，通常认为文档和教学体验稳定；批评则集中在仅 4 个姿态关节、工作空间和负载有限，以及电机成本高。

**结论**：机构课程和 ROS/MoveIt 基线的低风险选择；若目标是低成本模仿学习，SO-101 更合适。

### 4. PAROL6

- **仓库**：[Source-Robotics/PAROL6-Desktop-robot-arm](https://github.com/Source-Robotics/PAROL6-Desktop-robot-arm)
- **官方文档**：[PAROL6 Documentation](https://docs.source-robotics.com/PAROL-docs/)
- **ROS 2/MoveIt**：[PAROL6-ROS2-MOVEIT](https://github.com/Source-Robotics/PAROL6-ROS2-MOVEIT)
- **首次公开 / 最后提交**：2023-07-16 / **2026-11-17**
- **社区快照**：约 3,499 Stars、419 Forks
- **许可证**：硬件 CERN-OHL-S-2.0；固件 GPL-3.0；ROS 集成 MIT
- **开源范围**：STL/STEP、BOM、制造与装配说明、控制板、固件、URDF、MuJoCo
- **结构与规格**：6 轴；臂展 408 mm；全工作区标称负载 0.5 kg、近基座约 1 kg；整机 5.5 kg；项目方标称重复定位 0.1 mm
- **成本**：DIY/套件因配置约 1,200–2,400 欧元，完整整机更高
- **技术栈**：NEMA17、STM32F446、TMC5160、PlatformIO、Python、ROS 2/MoveIt、URDF、MuJoCo
- **适合任务**：工业布局教学、轨迹规划、机械设计与固件研究

**简评与业界评价**

[Hackaday 的项目介绍](https://hackaday.com/2023/08/15/hackaday-prize-2023-parol6-a-gpl-desktop-robotic-arm/)肯定其完成度和社区，同时质疑绝对定位精度及长期重复性。官方文档明确说明关节采用开环步进，没有编码器和制动器：丢步不可检测，断电可能下落，减速器也存在回差。ROS 2 仓库对真实硬件的直接连接仍有待完善，不能把“有 MoveIt 配置”理解为全部实机功能即插即用。

**结论**：最适合希望理解机械、驱动和控制全链路的 DIY 团队；不是闭环工业臂的廉价等价物。

### 5. OpenArm 2.0

- **仓库**：[enactic/openarm](https://github.com/enactic/openarm)
- **硬件仓库**：[enactic/openarm_hardware](https://github.com/enactic/openarm_hardware)
- **官方文档**：[OpenArm Docs](https://docs.openarm.dev/)
- **首次公开 / 最后提交**：2024-09-29 / **2026-11-16**
- **社区快照**：主仓约 3,717 Stars、401 Forks
- **许可证**：硬件 CERN-OHL-S-2.0；软件通常为 Apache-2.0
- **开源范围**：CAD/STL/BOM、PCB 和线缆资料、CAN 控制、ROS 2、MoveIt、MuJoCo、Isaac Lab、遥操作与数据工具
- **结构与规格**：每臂 7 轴加夹爪；单臂约 5.5 kg、臂展约 633 mm；标称负载 4.1 kg、短时峰值 6 kg
- **成本**：完整双臂系统 BOM 约 6,500 美元
- **技术栈**：QDD 可回驱关节、CAN-FD 1 kHz、ROS 2、MuJoCo、Isaac Lab、dora-rs、Python
- **适合任务**：双臂遥操作、接触丰富任务、力反馈、物理 AI 数据采集

**简评与业界评价**

OpenArm 在开放研究级平台中很有代表性：可回驱、负载较高、双臂和仿真链路完整。外部采用案例肯定其双向力反馈与遥操作潜力，但普遍也承认集成工作量大，不是即插即用的生产设备。项目更新快，部分接口和流程也会随版本变化。

**结论**：适合有工程能力的具身智能实验室；虽然单臂重量仍属轻量研究臂，但成本和系统复杂度已超出普通桌面教学平台。

### 6. OpenEAI-Arm V0.9

- **仓库**：[eai-yeslab/OpenEAI-Arm](https://github.com/eai-yeslab/OpenEAI-Arm)
- **第三方资料检查**：[Robotheca OpenEAI-Arm](https://robotheca.org/robots/openeai-arm)
- **首次公开 / 最后提交**：2026-02-08 / **2026-09-19**
- **社区快照**：约 142 Stars、4 Forks
- **许可证**：BSD-3-Clause
- **开源范围**：BOM、STEP/STL、机械图、URDF/SDF、装配资料、C++ 控制库、Python 绑定、ROS 2、遥操作和 VLA 数据采集
- **结构与规格**：6 轴加独立末端通道；臂展约 636.7 mm、主体约 3.3 kg；项目方标称额定负载 2 kg、原型重复定位 ±0.03 mm
- **成本**：项目记录制造成本约人民币 5,500 元
- **技术栈**：CAN、C++/CMake、Python、ROS 2、URDF/SDF、GELLO、SpaceMouse、VR 遥操作
- **适合任务**：中等负载抓取、VLA/模仿学习数据采集、遥操作

**简评与业界评价**

它在成本、重量和 2 kg 负载之间给出了很有吸引力的纸面平衡。Robotheca 的资料完整性检查给出较高分，但该分数评价的是文件可复现度，不是精度或耐久性能。项目方的 ±0.03 mm 仍需独立、标准化测量复核。

**结论**：值得跟踪的新兴平台；在独立复现和长期使用数据增加前，不宜把原型指标直接等同于量产能力。

### 7. EDULITE A3 / EL-A3

- **仓库**：[RobStride/EDULITE_A3](https://github.com/RobStride/EDULITE_A3)
- **资料页**：[Robotheca EL-A3](https://robotheca.org/robots/el-a3)
- **首次公开 / 最后提交**：2026-02-10 / **2026-08-03**
- **社区快照**：约 173 Stars、31 Forks
- **许可证**：MIT
- **开源范围**：STEP、3MF、线束、PCB、装配 SOP、Python SDK、ROS 2 控制、MoveIt 配置
- **结构与规格**：6 个臂关节加夹爪；臂展约 400 mm；额定负载 500 g、峰值 1 kg；整机约 3 kg
- **成本**：零售约 960–1,115 美元，地区、CAN 适配器和运费会改变总价
- **技术栈**：RobStride 关节电机、CAN、Python、ROS 2/ros2_control、MoveIt 2、Pinocchio、Foxglove
- **适合任务**：拖动示教、重力补偿、力位混合控制、多臂研究

**简评与业界评价**

功能和价格定位有吸引力，尤其是拖动示教与力控接口。独立购买记录提供了实际部署和价格信息，也报告过腕部打印结构损坏，说明耐久性和新版结构仍需持续观察。CAN 协议与关键关节供应由厂商控制，也是“硬件文件开放”之外的供应链风险。

**结论**：适合愿意承担早期平台风险的教学与研究团队；采购前应确认结构版本、备件和售后。

### 8. G-ARM

- **仓库**：[vidalperezbohoyo/g-arm](https://github.com/vidalperezbohoyo/g-arm)
- **同行评审论文**：[A low-cost 3D-printed robotic arm for education](https://link.springer.com/article/10.1007/s11042-025-20748-8)
- **首次公开 / 最后提交**：2023-04-12 / **2026-05-24**
- **社区快照**：约 15 Stars、2 Forks
- **许可证**：CERN-OHL-S-2.0
- **开源范围**：FreeCAD、STL、装配资料、控制软件
- **结构与规格**：6 轴；论文报告满伸静态负载约 365 g、近基座约 480 g；总重未公开
- **成本**：论文估算 BOM 约 171 欧元
- **技术栈**：ESP32/GRBL、ROS 2 Humble、ros2_control、MoveIt 2、RViz、Python
- **适合任务**：低成本 ROS 2/MoveIt 教学、课程装配和运动学实验

**简评与业界评价**

社区规模很小，但证据质量高于许多“高 Star、无测试”的 DIY 项目。论文记录了在两门大学课程中持续八个月的教学评估，给出了耐用性和教学可行性证据。风险是维护主要集中于少数作者，供应链和跨机构复现还不成熟。

**结论**：低成本 ROS 2 教育的高性价比候选，尤其适合重视论文验证而非社区热度的课程。

### 9. Thor

- **仓库**：[AngelLM/Thor](https://github.com/AngelLM/Thor)
- **项目主页**：[Thor Open Source Robotic Arm](http://thor.angel-lm.com/)
- **社区项目页**：[Hackaday.io Thor](https://hackaday.io/project/12989-thor)
- **首次公开 / 最后提交**：2015-04-23 / **2025-05-09**
- **社区快照**：约 1,658 Stars、278 Forks
- **许可证**：CC BY-SA 4.0
- **开源范围**：FreeCAD、STEP、STL、PCB、固件和装配资料
- **结构与规格**：6 轴；官方目标最大负载约 750 g（含工具）
- **成本**：官方历史目标低于 350 欧元，实际成本取决于打印、电机和控制板
- **技术栈**：Arduino Mega、自制控制板或打印机控制板、GRBL/RepRapFirmware、G-code；社区另有 ROS 2/MoveIt 移植
- **适合任务**：3D 打印机械设计、步进驱动、DIY 装配和教学

**简评与业界评价**

Thor 是经典开源打印机械臂之一，十年以上公开历史和较多衍生项目说明机械设计有参考价值。其局限也很典型：开环步进、打印齿轮、皮带和结构形变限制精度，ROS 生态主要来自后续社区移植。

**结论**：适合机械设计和 DIY 课程；若需要现代 ROS 2 的低维护部署，应优先评估 OpenMANIPULATOR-X 或 G-ARM。

### 10. Koch v1.1

- **仓库**：[jess-moss/koch-v1-1](https://github.com/jess-moss/koch-v1-1)
- **LeRobot 文档**：[Koch Arm](https://github.com/huggingface/lerobot/blob/main/docs/source/koch.mdx)
- **首次公开 / 最后提交**：2024-07-18 / **2024-09-17**
- **社区快照**：约 737 Stars、69 Forks
- **许可证**：Apache-2.0
- **开源范围**：SolidWorks/CAD、STL、BOM、装配视频、接线图；控制由 LeRobot 提供
- **结构与规格**：5 个臂关节加夹爪；DYNAMIXEL XL330/XL430；官方未公布臂展、负载、重量和重复定位
- **成本**：leader 约 199 美元、follower 约 278 美元，合计约 477 美元
- **技术栈**：DYNAMIXEL、USB 总线控制、LeRobot/Python、3D 打印
- **适合任务**：leader-follower 遥操作、早期 LeRobot 数据采集

**简评与业界评价**

Koch 是 LeRobot 早期的重要平台，DYNAMIXEL 的反馈质量通常优于低价舵机，但成本也更高。上游仓库长期没有新提交，社区资料普遍把它视为被 SO-101 部分替代的历史平台；缺少公开负载和精度数据也限制了严肃选型。

**结论**：适合作为 LeRobot 硬件演化和数据兼容性对照，不是当前低成本新建平台的默认首选。

## 四、10 个无人机与空中操作器开源项目

### 1. Aerostack2 Gripper/Payload

- **仓库**：[aerostack2/aerostack2](https://github.com/aerostack2/aerostack2)
- **载荷插件文档**：[Payload Plugins](https://aerostack2.org/docs/plugins/payload)
- **首次公开 / 最后提交**：2022-12-09 / **2026-11-19**
- **社区快照**：约 416 Stars、115 Forks
- **许可证**：BSD-3-Clause
- **操作器类型**：双指、吸盘或单舵机夹爪插件；**不是固定多关节机械臂**
- **飞行平台**：可配置四旋翼、六旋翼及实体平台
- **技术栈**：ROS 2 Humble/Jazzy、Gazebo Fortress/Harmonic、C++、插件化行为接口
- **仿真/实机**：两者均支持，具体硬件由平台插件决定
- **任务**：飞行中开合夹爪、拾取/释放载荷、行为树式任务编排

**简评与业界评价**

Aerostack2 的价值是工程框架和 ROS 2 维护活跃度，而不是一套固定机械臂。其社区规模是本组较大的，[Aerospace 2023 论文](https://doi.org/10.3390/aerospace10090814)验证了整体框架的仿真到实机方法，但不是夹爪性能专项评测。

**结论**：适合把现有 UAV、夹爪和任务规划快速拼成 ROS 2 系统；不适合直接研究多关节臂与机体的耦合动力学。

### 2. AirPicking

- **仓库**：[marcomelloni/AirPicking](https://github.com/marcomelloni/AirPicking)
- **首次公开 / 最后提交**：2026-10-18 / **2026-10-18**
- **社区快照**：0 Stars、0 Forks
- **许可证**：MIT
- **操作器类型**：两个对称单关节肩臂，共 2 个主动臂关节；末端抓取用仿真磁吸关节简化
- **飞行平台**：PX4 X500 四旋翼
- **技术栈**：PX4 SITL、Gazebo Harmonic、MAVSDK、Python、下视相机
- **仿真/实机**：仅仿真
- **任务**：视觉搜索、目标定位、100–300 g 轻物体自主拾取

**简评与业界评价**

优点是技术栈较新、安装路径清楚、任务闭环完整。项目方报告定位误差约 2 cm、航点误差 2–4 cm，但没有论文、实机或第三方复现；磁吸式 `DetachableJoint` 也绕开了真实接触、夹持力和物体滑移问题。

**结论**：适合作为 PX4 + Gazebo 新版教学演示；不能用其成功率推断真实机械臂抓取能力。

### 3. AM-Bench

- **仓库**：[ambench/ambench](https://github.com/ambench/ambench)
- **文档**：[AM-Bench Documentation](https://ambench.github.io/docs/)
- **论文**：[arXiv:2609.00641](https://arxiv.org/abs/2609.00641)
- **首次公开 / 最后提交**：2026-09-07 / **2026-09-14**
- **社区快照**：约 67 Stars、11 Forks
- **许可证**：Apache-2.0
- **操作器类型**：随 embodiment 变化，覆盖欠驱、全驱和过驱飞行操作系统，不是一套固定 DOF 硬件
- **飞行平台**：UAQuad、UAHexa、FAHexa、OmniHexa 等仿真实体
- **技术栈**：Isaac Lab、Isaac Sim、PID/L1/MPC、ACT、Diffusion Policy、OpenPI
- **仿真/实机**：仅仿真基准
- **任务**：12 个接触、运输和受约束交互任务，含气动、地效、执行器饱和等扰动

**简评与业界评价**

它是本组覆盖任务和控制/学习基线最系统的新仿真项目之一，适合做算法横评。主要限制是需要 NVIDIA GPU 和特定 Isaac Sim/Isaac Lab 版本，且没有实机制造与部署链路。

**结论**：空中操作策略学习和控制比较的优先基准；不应被列为开源硬件机械臂。

### 4. IsaacLab Gripper Drone Pickplace

- **仓库**：[uiseoklee/Isaaclab-Gripper-Drone-Pickplace](https://github.com/uiseoklee/Isaaclab-Gripper-Drone-Pickplace)
- **首次公开 / 最后提交**：2025-06-25 / **2026-09-04**
- **社区快照**：约 30 Stars、1 Fork
- **许可证**：Apache-2.0
- **操作器类型**：简单单通道夹爪；**不是串联机械臂**
- **飞行平台**：四旋翼仿真实体
- **技术栈**：Isaac Lab、Isaac Sim、Python、并行强化学习
- **仿真/实机**：仅仿真
- **任务**：接近、抓取、运输、放置，多阶段奖励，支持 128 个以上并行环境

**简评与业界评价**

项目聚焦一个清晰的 pick-and-place 学习任务，许可证明确，持续维护情况好于很多一次性论文代码。其动作空间和接触模型被大幅简化，没有实机迁移、飞控和机械制造资料。

**结论**：适合研究奖励设计、并行 RL 和策略训练；不能代表真实 UAV 机械臂的结构或安全约束。

### 5. Borinot

- **仓库**：[hidro-iri/Borinot](https://github.com/hidro-iri/Borinot)
- **论文**：[Borinot: an aerial robot for whole-body physical interaction](https://arxiv.org/abs/2307.14686)
- **首次公开 / 最后提交**：2023-09-01 / **2026-04-30**
- **社区快照**：约 25 Stars、6 Forks
- **许可证**：BSD-3-Clause
- **操作器类型**：可更换力矩控制肢体，论文实例为平面 2-DOF；同一肢体可作尾、手或腿
- **飞行平台**：六旋翼
- **技术栈**：全身力矩级 MPC、硬件 BOM、装配和操作手册
- **仿真/实机**：实机实验平台
- **任务**：飞行、接触、辅助稳定、操作与着陆等全身物理交互

**简评与业界评价**

Borinot 不是“给普通无人机挂一个夹爪”，而是从动力学上把飞行和接触统一起来。论文和开放硬件使其研究价值较高；代价是控制、标定和机械复杂度高，2-DOF 肢体也不适合精细六维末端操作。

**结论**：适合研究飞行—接触耦合、全身 MPC 和多用途肢体；不适合追求快速复现的入门团队。

### 6. Omnidirectional Dual-Arm Aerial Manipulator

- **硬件仓库**：[BioMorphic-Intelligence-Lab/dual-arm-aerial-manipulator](https://github.com/BioMorphic-Intelligence-Lab/dual-arm-aerial-manipulator)
- **控制仓库**：[manipulator_assisted_landing](https://github.com/BioMorphic-Intelligence-Lab/manipulator_assisted_landing)
- **论文**：[arXiv:2602.10703](https://arxiv.org/abs/2602.10703)
- **首次公开 / 最后提交**：2026-02-16 / **2026-02-16**（硬件仓库）
- **社区快照**：硬件仓库约 1 Star、0 Fork
- **许可证**：MIT
- **操作器类型**：双臂，每臂为 3R 串联结构，并通过可全周旋转枢轴扩展工作空间
- **飞行平台**：四旋翼机身，可扩展为六旋翼
- **技术栈**：Fusion 360、STEP/STL/DXF、Feetech 智能舵机、Python、OptiTrack
- **仿真/实机**：实机
- **任务**：接触探测、屋面坡度估计和斜面辅助着陆

**简评与业界评价**

机械资料开放程度较高，适合制造复现。论文报告 9 次飞行着陆全部成功、最大坡度 30.5°、平均坡度估计误差 2.87°；样本量仍小，且系统依赖外部动捕和高摩擦实验表面，不能直接外推到户外屋面。

**结论**：双臂接触感知和辅助着陆的前沿原型；社区与独立复现尚处早期。

### 7. OSPREY

- **仓库**：[srl-ethz/osprey](https://github.com/srl-ethz/osprey)
- **论文**：[arXiv:2409.07662](https://arxiv.org/abs/2409.07662)
- **首次公开 / 最后提交**：2024-09-12 / **2024-11-25**
- **社区快照**：约 41 Stars、4 Forks
- **许可证**：MIT
- **操作器类型**：四个 Fin-Ray 式柔性手指，每指一个主动弯曲通道；不是传统串联臂
- **飞行平台**：约 2.479 kg 定制四旋翼，载荷约 500 g
- **技术栈**：ROS 2 Foxy、PX4/MAVLink、OAK-D、Spectacular VIO、SAM2、Arduino、Siemens NX CAD
- **仿真/实机**：实机；支持 Vicon 或机载 VIO
- **任务**：自动搜索、零样本目标分割、抓取、运输和投放

**简评与业界评价**

这是自主性、实机证据和资料开放度都较强的项目。论文在 9 类物体、144 次室内抓取中报告平均成功率 85%，并展示无外部定位的户外抓取；作者也明确承认阵风、近地效应和目标姿态会导致失败。ROS 2 Foxy 已停止支持，部分感知/CAD 依赖也增加复现门槛。

**结论**：自主实机空中抓取的优先参考；软件迁移与硬件采购成本需要预留。

### 8. Sarax

- **仓库**：[SaxionMechatronics/sarax](https://github.com/SaxionMechatronics/sarax)
- **论文**：[ICUAS 2024](https://doi.org/10.1109/ICUAS60882.2024.10556971)
- **首次公开 / 最后提交**：2024-02-08 / **2024-10-21**
- **社区快照**：约 39 Stars、5 Forks
- **许可证**：BSD-3-Clause
- **操作器类型**：模块化、可更换操作单元；仓库不限定统一 DOF
- **飞行平台**：参数化多旋翼
- **技术栈**：Ubuntu 20.04、ROS Noetic、PX4、MAVROS、Gazebo、QGroundControl、Docker
- **仿真/实机**：SITL、室内和室外实机
- **任务**：接触、维护、表面处理和可持续基础设施作业

**简评与业界评价**

Sarax 的强项是“硬件、仿真、飞控、容器和实机流程”相对齐全。ICUAS 论文和项目资料给出了室内外实验与风机接触演示。最大问题是 ROS Noetic/Ubuntu 20.04/PX4 1.x 逐渐老化，迁移到 ROS 2 和新 Gazebo 需要额外工作。

**结论**：当前最均衡的通用空中操作研究底座之一，尤其适合愿意维护 ROS 1 栈的团队。

### 9. AeCoM Aerial Continuum Manipulator

- **仓库**：[arclab-hku/AeCoM_Aerial-Continuum-Manipulator](https://github.com/arclab-hku/AeCoM_Aerial-Continuum-Manipulator)
- **论文**：[IEEE TSMC 2023](https://doi.org/10.1109/TSMC.2023.3257166)
- **首次公开 / 最后提交**：2023-04-01 / **2024-06-29**
- **社区快照**：约 24 Stars、1 Fork
- **许可证**：MIT
- **操作器类型**：腱驱连续体机械臂，不能用传统离散关节 DOF 简单描述
- **飞行平台**：四旋翼
- **技术栈**：CAD、MCU 通信、IMU 运动学、腱松弛抑制、实验资料
- **仿真/实机**：实机研究原型
- **任务**：柔顺接触、狭窄空间操作和连续体形状控制

**简评与业界评价**

相较刚性串联臂，连续体结构对碰撞和接触更友好，许可证也清晰。公开仓库更偏机械与底层控制，并不是完整 ROS/飞控一键部署包；复现者仍需补齐飞行控制、标定和系统集成。

**结论**：连续体空中机械臂的重要开放参考；适合有软体机器人和嵌入式经验的研究团队。

### 10. RISC Aerial-Manipulator-Gazebo

- **仓库**：[RISC-NYUAD/Aerial-Manipulator-Gazebo](https://github.com/RISC-NYUAD/Aerial-Manipulator-Gazebo)
- **首次公开 / 最后提交**：2020-10-16 / **2022-02-07**
- **社区快照**：约 44 Stars、12 Forks
- **许可证**：GPL-3.0
- **操作器类型**：Kinova 7-DOF 球腕机械臂
- **飞行平台**：HarrierD7 Vulcan UAV
- **技术栈**：ROS 1、RotorS、Gazebo 7、C++、Eigen
- **仿真/实机**：公开部分主要为仿真
- **任务**：UAV/机械臂遥操作、起飞悬停、抓取重物和适应控制

**简评与业界评价**

它是少数把传统 7-DOF 臂、飞行器和完整 Gazebo 场景一起开放的项目，适合研究浮动基座与机械臂耦合。44 Stars/12 Forks 对小众学术仿真项目是不错的社区信号，但没有对应的公开实机复现和标准化成功率；Gazebo 7、RotorS 和旧 ROS 依赖也带来较高现代化成本。

**结论**：经典多关节 UAV 机械臂仿真基线；新项目应考虑迁移到 ROS 2、新 Gazebo 或 Isaac Lab。

## 五、边界项目与淘汰说明

下列项目有技术价值，但未进入主榜：

- **AR4 MK5**：机械性能和 ROS 2 驱动较完整，但机械设计采用带“非商业”限制的 shared-source 许可，不能与 CERN-OHL/MIT/Apache 的开源硬件等同。
- **Niryo One**：历史上很有影响力，软件为 GPL，但硬件为 CC BY-NC-SA 且已停产，因此不进入严格开源主榜。
- **RoArm-M2-S**：控制仓库开放，但机械 CAD 不完整开放；更适合称“开源控制的软件可扩展产品”。
- **ALOHA 2**：学术影响力很大，但完整双臂工作站价格和尺寸不符合本报告的轻量桌面主线，部分硬件许可也需逐项核验。
- **AET / Aerial Elephant Trunk**：论文和原型突出，但仓库的“GPLv2 + 仅学术使用”附加限制与标准开源定义冲突。
- **JSK Hydrus / DRAGON / SPIDAR**：实机与论文积累非常强，但仓库缺少清晰的项目级许可证，不能默认拥有修改和再分发权。
- **FlyingToolbox**：多工具实机能力非常突出，但仓库未检测到明确许可证。
- **RAPTOR**：高速抓取实验有代表性，但搭建仓库引用的核心仓库已失效，且授权不清晰。
- **MAGMaS、AEROARMS、AMSL/DLR 若干项目**：能找到论文或邻接基础设施，却未找到足以复现整机的项目级开放仓库。

## 六、横向选型建议

### 1. 按使用目标

- **百美元级具身学习与批量数据采集**：SO-101。
- **低成本 ROS 2 教学**：G-ARM；预算更高且重视成熟文档时选 OpenMANIPULATOR-X。
- **机械、驱动和固件全链路教学**：PAROL6 或 Thor。
- **中等负载、ROS 与 LeRobot 并用**：reBot B601。
- **双臂力控、接触和遥操作研究**：OpenArm。
- **观察中的中端新平台**：OpenEAI-Arm、EDULITE A3。
- **ROS 2 无人机载荷/夹爪工程整合**：Aerostack2。
- **空中操作通用软硬件平台**：Sarax。
- **自主实机抓取**：OSPREY。
- **飞行—接触全身控制**：Borinot。
- **仿真学习与算法横评**：AM-Bench；单一抓放 RL 可用 IsaacLab Gripper Drone。
- **传统 7-DOF 空中机械臂仿真**：RISC Aerial-Manipulator-Gazebo。
- **连续体与柔顺空中操作**：AeCoM。

### 2. 共同风险

1. **“开源”层级不同**：有的项目开放全部 CAD、BOM、固件和控制；有的只开放软件或模型。选型前必须逐目录检查许可证。
2. **重复定位不等于绝对精度**：开环步进、塑料结构和舵机齿隙会让项目方的重复性指标难以转化为真实任务精度。
3. **峰值负载不等于持续满伸负载**：机械臂的热、惯量和力矩随姿态变化，厂商峰值数字不能直接用于节拍设计。
4. **仿真成功不等于实机可用**：磁吸关节、理想摩擦和完美状态估计会显著高估抓取成功率。
5. **ROS/Gazebo 版本债务明显**：许多空中操作项目仍依赖 ROS Melodic/Noetic、Gazebo Classic、RotorS 或 ROS 2 Foxy。
6. **论文样本量有限**：9 次或几十次成功实验可以证明可行性，但不足以证明工业可靠性。
7. **社区热度不是质量认证**：Stars 有助于判断生态和文档需求，却不能替代负载、精度、耐久和安全测试。

## 七、最终判断

轻量开源机械臂已经形成两条清晰路线：一条以 SO-101、Koch 为代表，围绕低成本遥操作、数据采集和模仿学习；另一条以 PAROL6、OpenMANIPULATOR-X、reBot、OpenArm 为代表，强调运动规划、较高负载或接触控制。前者更容易规模化，后者更适合严肃控制和机械研究。

无人机空中操作仍明显处于研究阶段。开源项目常在“仿真完整但无实机”与“实机论文很强但软件/许可证不完整”之间取舍。若要新建项目，较稳妥的路线是：用 Aerostack2 或 Sarax 搭建飞行与任务基础设施，以 OSPREY/AeCoM/Borinot 作为具体操作器和控制参考，再用 AM-Bench 做算法对照。任何实机方案都应额外考虑桨叶防护、失效安全、载荷脱落、动捕依赖和法规要求。

---

### 数据解释备注

- 所有价格只用于量级比较，不含税费、运费、3D 打印、相机、计算机、动捕和安全设施，除非项目明确包含。
- “未公开”优于基于图片推断；连续体臂和软夹爪不强行换算为传统关节 DOF。
- 仓库最后提交时间通过默认分支提交记录交叉核验；项目可能在其他分支、子仓库或论文页继续更新。
- 本报告中的“业界评价”包含产业媒体、教育采用、第三方装配记录和学术共同体反馈；对缺乏独立评价的新项目，已明确写明证据仅来自项目方。
