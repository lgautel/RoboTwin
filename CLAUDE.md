# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RoboTwin is a scalable bimanual robotic manipulation platform and benchmark (CVPR 2025 Highlight). It provides simulation environments for dual-arm robot tasks, data collection pipelines, and 11+ policy baselines. Built on SAPIEN 3.0.0b1 physics engine with MPLib motion planning.

Documentation: https://robotwin-platform.github.io/doc/

## Installation

```bash
bash script/_install.sh
```

This installs dependencies, patches SAPIEN's `urdf_loader.py` (UTF-8 encoding) and MPLib's `planner.py` (collision check removal), and installs CuRobo. Assets must be downloaded separately from HuggingFace.

## Common Commands

### Data Collection
```bash
bash collect_data.sh ${task_name} ${task_config} ${gpu_id}
# Example: bash collect_data.sh beat_block_hammer demo_randomized 0
```

### Policy Evaluation
```bash
python script/eval_policy.py --task_name ${task} --task_config ${config} --policy ${policy_name} --ckpt_path ${path} --gpu_id 0
```

### Test Rendering
```bash
python script/test_render.py
```

## Architecture

### Task System (`envs/`)
- `_base_task.py`: `Base_Task(gym.Env)` — core simulation lifecycle, physics rendering, action execution, observation collection
- `_GLOBAL_CONFIGS.py`: global configuration constants
- `robot/robot.py`: dual-arm robot control, kinematics, motion planning
- `camera/camera.py`: camera simulation (D435 depth cameras for head and wrist views)
- 50+ task files (e.g., `beat_block_hammer.py`): each defines a task class inheriting from `Base_Task`, loaded dynamically via `importlib`

Task classes must match their filename (e.g., `envs/beat_block_hammer.py` defines class `beat_block_hammer`).

### Policy Framework (`policy/`)
Each policy directory (DP, ACT, DP3, RDT, pi0, pi05, openvla-oft, TinyVLA, DexVLA, LLaVA-VLA, GO1) follows a standard interface in `deploy_policy.py`:
- `get_model(usr_args)` — loads checkpoint and config, returns model
- `eval(TASK_ENV, model, observation)` — runs inference and calls `TASK_ENV.take_action(action)`

`Your_Policy/` is a template for adding new policies.

### Configuration (`task_config/`)
- `_embodiment_config.yml`: maps robot names (aloha-agilex, piper, franka-panda, ARX-X5, ur5-wsg) to asset paths
- `_camera_config.yml`: camera sensor specs
- `demo_randomized.yml` / `demo_clean.yml`: task configs controlling domain randomization, episode count, data types (rgb, depth, pointcloud, qpos, endpose)

### Scripts (`script/`)
- `collect_data.py`: main data collection — dynamically imports tasks, reads YAML configs, runs episodes
- `eval_policy.py`: policy evaluation — loads environments and policies, tracks success rates, generates video
- `add_annotation.py`: adds language annotations to trajectories
- `create_messy_data.py` / `create_object_data.py`: generate scene variations with clutter/objects
- `policy_model_server.py` / `eval_policy_client.py`: distributed inference (server/client)

### Code Generation (`code_gen/`)
AI-powered task code generation using LLM APIs (OpenAI/DeepSeek). Generates new task implementations from descriptions.

### Data Flow
```
collect_data.sh → script/collect_data.py → envs/{task_name}.py (dynamic import)
                                         → task_config/{config}.yml
                                         → saves to ./data/{task_name}/{config}/
```

## Key Patterns
- All scripts expect to be run from the repository root (`sys.path.append("./")`)
- Tasks and policies are loaded dynamically via `importlib.import_module()`
- YAML configs drive all simulation parameters (embodiment, cameras, domain randomization)
- Observations include RGB, depth, point clouds, joint positions, and end-effector poses
- Supports 5 robot embodiments configured via `_embodiment_config.yml`
