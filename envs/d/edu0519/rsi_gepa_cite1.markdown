# GEPA 替代方案深度对比分析:谁能取代 GEPA 成为 RSI 系统的核心优化器?

> 分析日期:2026-10-13。
> 本文件基于广泛的网络搜索及 GEPA 论文引用追踪(Semantic Scholar 525 篇引用论文全量分析),覆盖 2025 年至 2026 年 10 月期间发布的 80+ 项 prompt/skill/context/harness 优化工作。
> 背景文件:
> - [`rsi_solu1.markdown`](./rsi_solu1.markdown):RSI 系统选型方案(推荐 GEPA 作为核心)
> - [`rsi_analyz1.markdown`](./rsi_analyz1.markdown):通用 RSI 领域 40+ 项工作的对比分析
>
> 核心问题:GEPA(arXiv:2507.19457, ICLR 2026 Oral)是否已过时？有没有更新、更有效、开源更完整、可以直接作为基础代码进行改造的替代工作？

---

## 1. 背景与动机

### 1.1 为什么要重新审视 GEPA

在 [`rsi_solu1.markdown`](./rsi_solu1.markdown) 中,GEPA 被推荐为 RSI 系统的核心快速迭代优化器。选它的理由是:ICLR 2026 Oral、集成于 DSPy、Pareto front 进化、MIT 许可证、+6pp 超过 GRPO。

但 GEPA 论文发布于 2025 年 7 月(arXiv:2507.19457),距今已超过一年。在 LLM 优化领域,一年足以让格局发生根本变化。具体风险:

1. **2026 年中期已有多项工作直接对比并超越 GEPA** — ESPO、CASD、AgentGrad 等均在论文中报告了对 GEPA 的胜率
2. **GEPA 的 prompt 膨胀问题被正式识别** — ESPO 论文指出 GEPA 生成的 prompt 平均 1,878 字符,而 ESPO 仅 1,004 字符(短 47%),且 ESPO 在形式上将 GEPA 证明为自己的特例
3. **技能文档优化(SkillOpt 方向)已超越 prompt 优化成为主流** — 2026 年出现了十余项 Skill 优化工作,形成了独立的研究方向

### 1.2 搜索范围

本次搜索从三个角度展开:

| 角度 | 覆盖范围 |
|---|---|
| **GEPA 的直接竞争者** | 引用 GEPA 或直接对比 GEPA 的论文;2026 年发表的 prompt 优化方法;DSPy 生态内替代优化器 |
| **技能/策略优化** | SkillOpt 及后继者;上下文工程(ACE 方向);工作流进化(AFlow 方向);多智能体技能协同 |
| **生产级框架与工具** | 已有真实部署证据的工具;集成于主流 agent 框架的优化器;企业采用的优化方案 |

---

## 2. GEPA 基准画像

作为比较基线,先固定 GEPA 的关键参数:

| 维度 | GEPA |
|---|---|
| **论文** | arXiv:2507.19457 |
| **会议** | ICLR 2026 Oral |
| **机构** | UC Berkeley, Stanford, MIT, Databricks |
| **机制** | 反思式进化:从 Pareto 前沿选候选 → 小批量执行 → 全 trace 捕获 → LLM 反思诊断 → 突变+累积经验 |
| **优化对象** | Prompt 文本(指令、规则) |
| **框架集成** | DSPy(原生)、MLflow、DeepEval、Google ADK、Comet ML Opik |
| **核心结果** | 6 任务平均 +6pp 超 GRPO, 35x 更少 rollout;+14% 超 MIPROv2;AIME-2025 上 +12pp 超 MIPROv2 |
| **生产采用** | Nubank(68.88% → 88.89%）、Google Gemini Agent Platform(`adk optimize`)、Microsoft AI MAI-Thinking-1、Pydantic AI |
| **GitHub** | [gepa-ai/gepa](https://github.com/gepa-ai/gepa), 6,966 star / 576 fork, MIT 许可证 |
| **项目主页** | [gepa-ai.github.io/gepa](https://gepa-ai.github.io/gepa/) |
| **Semantic Scholar 引用数** | **525 篇**(89 篇有影响力引用),截至 2026-10-13 |
| **后继工作(同团队)** | optimize_anything ([arXiv:2605.19633](https://arxiv.org/abs/2605.19633))、Combee ([arXiv:2604.04247](https://arxiv.org/abs/2604.04247)) |
| **已知弱点** | ① Prompt 膨胀(平均 1,878 字符);② 被 ESPO 形式化为特例;③ 多 agent 场景未优化;④ 无约束感知能力;⑤ **紧预算下严重退化**(250 次 API 调用时 86% 的运行返回种子 prompt,见 BudgetAPO);⑥ **在未评分维度上产生回归**(引用有效性下降 10.7-41.6pp,见 arXiv:2610.13287);⑦ **优化增益在持续学习场景中不复合**(GEPA "transfers below the unoptimized baseline",见 Terminal-Bench 2.0) |

---

## 3. 发现的候选工作

### 3.1 第一梯队:有直接对比数据超越 GEPA 的工作

这些工作在论文中直接将 GEPA 作为 baseline 并报告了胜率。

#### 3.1.1 ESPO — Error-Structured Prompt Optimization

| 维度 | ESPO |
|---|---|
| **论文** | arXiv:2609.04197 |
| **会议** | EMNLP 2026 投稿 |
| **机构** | AWS Agentic AI |
| **日期** | 2026-09-03 |
| **机制** | 三阶段分解:诊断(将所有训练错误聚类为结构化模式) → 提议(四种互补生成策略) → 选择(bootstrap 稳定性筛选) |
| **vs GEPA** | **7 个基准平均 +3.76pp**(74.67% vs 70.91%);prompt 长度短 47%(1,004 vs 1,878 字符) |
| **理论关系** | **ESPO 在形式上包含 GEPA 为特例**(设 K=1, B=1, m=3 即恢复 GEPA) |
| **跨模型验证** | Gemma 3 12B, Mistral 14B, Qwen3 32B, Claude Haiku 4.5 |
| **开源** | ❌ **无公开代码仓库** |
| **可构建性** | 低 — 无代码可直接使用;但论文描述的三阶段框架清晰,可参考实现 |

**分析**:ESPO 是目前对 GEPA 最具理论优势的工作 — 不仅实验结果更好,而且在形式上证明 GEPA 是 ESPO 的退化特例。然而,截至 2026-10-13,ESPO 没有公开代码。作为论文参考极有价值,但不能直接作为基础代码。

#### 3.1.2 CASD — Coding-Agent Skill Distillation

| 维度 | CASD |
|---|---|
| **论文** | arXiv:2609.26261 |
| **机构** | Microsoft |
| **日期** | 2026-08-13 |
| **机制** | 使用现成的 coding agent 分析静态 trajectory 语料(不需要环境交互);coding agent 自行编写分析代码、识别系统性失败模式、蒸馏为行为规则 |
| **vs GEPA** | **agentic 基准上 +16.6pp vs GEPA 的 +10.9pp**;成本仅 ~$1.60(GEPA 的 1/22) |
| **核心优势** | 不需要迭代搜索循环;一次分析即可;22x 更便宜 |
| **开源** | ❌ **未找到公开代码** |
| **可构建性** | 中 — 方法论清晰(用 coding agent 分析 trajectory);但属于不同范式(一次性分析 vs 迭代优化) |

**分析**:CASD 代表了一种范式转变 — "用 coding agent 做 prompt 优化"。效果显著且成本极低。但它本质上是一次性蒸馏而非迭代优化,这意味着它更适合作为 RSI 系统中的**初始化器**(冷启动快速获得好的起点),而非持续改进的核心引擎。

#### 3.1.3 AgentGrad — Intervention-guided Prompt Optimization for Multi-Agent Systems

| 维度 | AgentGrad |
|---|---|
| **论文** | arXiv:2609.08572 |
| **会议** | NeurIPS 2026 |
| **机构** | Korea University, KAIST, Meta AI, UNIST |
| **日期** | 2026-09 |
| **机制** | 顺序干预识别哪个 agent 需要修复;语义文本梯度抽象将相似梯度聚类并提取共享纠正模式;专为多 agent 系统设计 |
| **vs GEPA** | **5 个 MAS 基准上全部胜出**(GPT-5-mini 和 Qwen3-8B);优化速度快 2.5x |
| **开源** | ❌ **未确认有公开代码** |
| **可构建性** | 低 — 多 agent 专用设计,且无代码 |

**分析**:AgentGrad 解决的是 GEPA 的一个盲区 — 多 agent 系统中的 prompt 优化。GEPA 是单 agent 优化器,无法识别"应该修改哪个 agent 的 prompt"。AgentGrad 的贡献在于引入了干预因果的思路。但目前无开源代码。

#### 3.1.4 ACE — Agentic Context Engineering

| 维度 | ACE |
|---|---|
| **论文** | arXiv:2510.04618 |
| **会议** | ICLR 2026 |
| **机构** | Stanford, SambaNova, Microsoft, Samsung, Meta |
| **日期** | 2025-10（ICLR 2026 接收） |
| **机制** | 三角色架构(Generator、Reflector、Curator),以增量 delta 更新方式进化结构化 context "playbook"。将 context 视为结构化产物,而非纯 prompt 文本 |
| **vs GEPA** | **适应延迟低 82-91%**;agent 任务 +10.6%,领域任务 +8.6%;匹配 AppWorld 排行榜冠军(使用更小的开源模型) |
| **GitHub** | ace-agent/ace, ~1,400 star, 169 fork, **Apache-2.0** |
| **开源完整度** | ✅ 有代码、有文档、有许可证 |
| **可构建性** | **高** — 模块化三角色设计,可拆可组;Apache-2.0 许可;结构化 playbook 输出人类可读可审计 |

**分析**:ACE 是第一梯队中唯一同时满足"超越 GEPA"和"开源可用"两个条件的工作。它的优化对象不是纯 prompt,而是结构化 context playbook — 这比 GEPA 的平坦 prompt 文本更适合长期累积经验。然而,ACE 的论文日期(2025-10)比 GEPA(2025-07)仅晚 3 个月,也不算很新。

#### 3.1.5 Contrastive Reflection

| 维度 | Contrastive Reflection |
|---|---|
| **论文** | arXiv:2606.30840 |
| **机构** | LinkedIn |
| **日期** | 2026-06-29 |
| **机制** | 识别以错误为锚的行为切片,从同一区域添加邻近成功样本,让 Teacher LLM 生成针对性 prompt 编辑;仅当验证集提升时接受编辑 |
| **vs GEPA** | HotpotQA 上 60.4% vs GEPA 57.0%(MIPROv2 59.4%) |
| **开源** | ❌ **未找到公开代码** |

---

### 3.2 第二梯队:同领域强竞争者(无直接 GEPA 对比但实力突出)

#### 3.2.1 SkillOpt — 技能文档优化(已在 rsi_solu1 中推荐)

| 维度 | SkillOpt |
|---|---|
| **论文** | arXiv:2605.23904 |
| **机构** | Microsoft Research |
| **日期** | 2026-05-22 |
| **机制** | 将紧凑的 Markdown skill.md 作为唯一可训练参数;独立优化器模型将评分 rollout 转为有界 add/delete/replace 编辑;仅当留出验证集严格提升时接受编辑 |
| **核心结果** | **52/52 评估格最佳或并列**(6 基准 × 7 目标模型 × 3 执行框架);GPT-5.5 上 +23.5pp(直接对话)、+24.8pp(Codex 内)、+19.1pp(Claude Code 内) |
| **GitHub** | microsoft/SkillOpt, **~18,300 star / ~1,700 fork**, MIT 许可证, 64 贡献者 |
| **PyPI** | `pip install skillopt`(v0.2.0, 2026-07-02 发布,含 SkillOpt-Sleep 夜间自进化功能） |
| **开源完整度** | ✅ 完整代码、数据、文档、部署就绪的 `best_skill.md` 产物;PyPI 包可直接安装 |
| **可构建性** | **极高** — 已是 rsi_solu1 的推荐组件;门控设计(留出验证)是整个领域最严格的之一;**SkillOpt-Sleep** 提供生产级的夜间自动进化 |

**分析**:SkillOpt 的优化对象是"技能文档"而非"prompt" — 这与 GEPA 不是同层竞争,而是互补或上层替代。在 rsi_solu1 中已被推荐为"深度训练层"。本次搜索进一步确认了它的领先地位 — 52/52 格最佳的结果截至 2026-10 仍未被超越。值得注意的是 v0.2.0 引入的 **SkillOpt-Sleep** 功能:系统在夜间自动收集当天的 rollout、运行优化、验证、部署更新后的技能文档 — 这本身就是一个生产级的有界 RSI 循环。

#### 3.2.2 metaTextGrad — 元优化器

| 维度 | metaTextGrad |
|---|---|
| **论文** | arXiv:2505.18524 |
| **会议** | NeurIPS 2025 |
| **机构** | Stanford / Zou Group |
| **机制** | 元优化 optimizer 本身(包括元 prompt 和元结构),使 optimizer 自适应特定任务。在 TextGrad 基础上的升级 |
| **核心结果** | 超过最佳基线 optimizer +11% 绝对提升 |
| **GitHub** | zou-group/metatextgrad(TextGrad: zou-group/textgrad, ~3,600 star / ~294 fork, MIT) |
| **可构建性** | 高 — TextGrad 生态成熟,MIT 许可;metaTextGrad 思路("优化 optimizer 自身")与 RSI 理念高度契合 |

**分析**:metaTextGrad 的核心贡献是"元优化" — 这正是 RSI 的精神(改进自身的改进过程)。但它是"有界"的元优化:只改元 prompt 和搜索策略,不改底层代码。作为 RSI 系统中的 meta 层,有独特价值。

#### 3.2.3 Trace2Skill — 轨迹蒸馏为技能

| 维度 | Trace2Skill |
|---|---|
| **论文** | arXiv:2603.25158 |
| **机构** | Alibaba / Qwen |
| **日期** | 2026-03-26(修订 2026-06-04） |
| **机制** | 三阶段:收集标注的成功/失败轨迹 → 并行用独立的 error 和 success 分析器提出 trajectory-level 技能补丁 → 层级合并为可移植技能目录 |
| **核心结果** | 从 Qwen3.5-35B 轨迹蒸馏的技能让 Qwen3.5-122B 在 WikiTableQuestions 上提升 +57.65pp;**跨模型、跨基准可迁移** |
| **GitHub** | Qwen-Applications/Trace2Skill |
| **可构建性** | 中 — 代码可用;但更适合作为 SkillOpt 的上游(初始技能生成),而非独立的核心优化器 |

#### 3.2.4 AFlow — MCTS 工作流生成

| 维度 | AFlow |
|---|---|
| **论文** | arXiv:2410.10762 |
| **会议** | ICLR 2025 Oral |
| **机构** | MetaGPT (DeepWisdom), HKUST |
| **机制** | 蒙特卡洛树搜索(MCTS)在代码表示的工作流空间上搜索;每个树节点 = 完整工作流;预定义算子(Ensemble, Review & Revise) |
| **核心结果** | 6 基准平均 +5.7%;较小模型超越 GPT-4o(成本仅 4.55%) |
| **GitHub** | FoundationAgents/AFlow |
| **可构建性** | 中 — 工作流级别优化,与 prompt 级别的 GEPA 不是同层竞争 |

#### 3.2.5 EvoSkill — 多 Agent 技能发现

| 维度 | EvoSkill |
|---|---|
| **论文** | arXiv:2603.02766 |
| **机构** | Sentient AGI |
| **日期** | 2026-03-03 |
| **机制** | 三 agent(Executor, Proposer, Skill-Builder)基于失败驱动发现;Pareto 前沿治理选择;仅保留通过留出验证的技能 |
| **核心结果** | +7.3% OfficeQA, +12.1% SealQA, +5.3% 零样本迁移到 BrowseComp |
| **兼容** | Claude Code, Codex CLI, OpenCode, OpenHands, Goose, Harbor |
| **GitHub** | sentient-agi/EvoSkill, ~1,300 star / ~132 fork, Apache-2.0 |
| **可构建性** | 中高 — Apache-2.0;兼容主流 agent 框架;git-branch 式变体追踪;支持 skill_only 和 prompt_only 模式 |

#### 3.2.6 AdalFlow — PyTorch 式 LLM 优化框架

| 维度 | AdalFlow |
|---|---|
| **机构** | SylphAI + UT Austin VITA Group |
| **GitHub** | SylphAI-Inc/AdalFlow, ~4,200 star / ~388 fork, MIT |
| **机制** | 类 PyTorch 框架,以 Parameter/Generator/AdalComponent/Trainer 抽象统一构建和优化 LLM 工作流;组合文本梯度(类 TextGrad)、少样本 bootstrap(类 DSPy)和指令历史 |
| **可构建性** | 高 — 干净的 PyTorch 式 API;MIT 许可;模型无关;但更偏底层框架,需要更多定制 |

#### 3.2.7 EvoAgentX — 自进化 Agent 工作流框架

| 维度 | EvoAgentX |
|---|---|
| **论文/会议** | EMNLP 2025 Demo |
| **机制** | 集成 TextGrad、AFlow、MIPRO,迭代优化 agent prompt、工具配置和工作流拓扑;支持 MCP 工具 |
| **GitHub** | EvoAgentX/EvoAgentX, ~3,400 star |
| **可构建性** | 高 — 作为集成框架,已将多种优化器打包;但自身是否已集成 GEPA/SkillOpt 等最新方法需验证 |

#### 3.2.8 HDSO — Hypothesis-Driven Skill Optimization

| 维度 | HDSO |
|---|---|
| **论文** | arXiv:2606.22330 |
| **日期** | 2026-06-21 |
| **机制** | 无训练框架。Curator 观察 executor trace → 提出可证伪假设+验证计划 → 通过配对 control/treatment 执行验证 → 仅合并有支持的候选 |
| **核心结果** | Qwen3-8B +6.9 Avg SR, Qwen3.6-27B +4.0;20% 噪声反馈下保持 +7.1pp |
| **可构建性** | 中 — "可证伪假设"的思路新颖且与科学方法论一致;但代码成熟度未知 |

#### 3.2.9 SkillGrad — 梯度下降式技能优化

| 维度 | SkillGrad |
|---|---|
| **论文** | arXiv:2605.27760 |
| **机构** | Penn State |
| **日期** | 2026-05-26 |
| **机制** | 类梯度下降框架:任务执行提供 trajectory-level loss → 自动诊断提供文本梯度 → momentum agent 将反复出现的模式积累为持久记忆覆盖 |
| **核心结果** | 超最强训练基线平均 +6.7pp |
| **GitHub** | wwwhy725/SkillGrad |

---

### 3.3 第三梯队:相邻领域或基础性工作

| 工作 | 机制 | 核心结果 | 开源 | 与 GEPA 的关系 |
|---|---|---|---|---|
| **TextGrad** (Nature 2025) | 通过 LLM 的文本反向传播 | 基础框架;metaTextGrad 在其上 +11% | zou-group/textgrad, ~3.6k star, MIT | GEPA 在某些任务上优于 TextGrad;但 TextGrad 生态更成熟 |
| **SIMBA** (DSPy 内置) | 小批量高方差样本 → append_a_demo / append_a_rule | 比 MIPROv2 更高效 | stanfordnlp/dspy 内置 | GEPA 的 DSPy 前辈,更简单但更快 |
| **GReaTer** (ICLR 2025) | 用任务 loss 梯度在推理 token 上进行自优化 | 匹配或超越 GPT-4 优化的 prompt | psunlpgroup/GreaTer | 针对开源轻量模型,与 GEPA 的闭源 API 依赖互补 |
| **PromptWizard** (Microsoft) | 变异-批评-合成循环;仅 69 次 API 调用 | 45 任务评估;API 效率极高 | microsoft/promptwizard | API 成本极低的替代;但效果弱于 GEPA |
| **TextReg** (Georgia Tech) | 正则化文本空间优化;解决 prompt 分布过拟合 | OOD +11.8% 超 TextGrad | luchengfu6/TextReg | 专注泛化;可作为 GEPA 的补丁方案 |
| **REMO** (2025-08) | 记忆增强反思 RAG + 元控制器 | GSM8K 93.2% | 未确认 | 记忆+反思方向;小规模 |
| **RPT** (Megagon Labs) | LLM 函数调用模拟人类 prompt 工程师 | 推理任务 +12.9pp | megagonlabs/RPT | 轻量级替代 |
| **CAPO** (Microsoft) | 约束感知 prompt 优化(对偶方法) | 约束满足+性能保持 | 未确认 | 解决 GEPA 缺乏的约束处理 |
| **MemAPO** | 双记忆(成功策略模板+失败模式) | 最佳平均性能;成本 -57.2% vs TextGrad | 未确认 | 记忆驱动;成本效率高 |
| **HAPO** | 分层归因;语义单元优化 | +13.28% 超 Zero-Shot CoT;多模态友好 | 未确认 | 多模态方向 |
| **ETGPO** | 错误分类学引导;1/3 token 预算 | 性能相当/更好,成本 1/3 | 未确认 | 高效替代 |

### 3.4 技能进化 via RL 的工作(参考)

这些工作使用强化学习进化技能,与 GEPA 的无梯度反思进化方向不同,但效果显著:

| 工作 | 会议 | 核心结果 | GitHub |
|---|---|---|---|
| **SkillRL** | NeurIPS 2026 | +15.3% 超强基线;Qwen2.5-7B 超 GPT-4o +41.9% | aiming-lab/SkillRL |
| **Skill-R1** (UCSD, Adobe) | 2026-05 | 双层 GRPO;黑盒兼容开源+闭源 | — |
| **Skill1** (USTC) | 2026-05 | ALFWorld 97.5% 成功率 | AlphaLab-USTC/Skill1 |
| **SkillMaster** | 2026-05 | ALFWorld +8.8%, WebShop +9.3% | — |

### 3.5 自改进整体系统(参考)

| 工作 | 会议 | 机制 | 核心结果 | GitHub |
|---|---|---|---|---|
| **DGM** | ICLR 2026 | Agent 用 LLM 诊断失败 + 写 Code Diff 改进自身;达尔文进化 | SWE-bench 20% → 50% | jennyzzt/dgm |
| **SICA** | ICLR 2025 Workshop | Agent 编辑自己的代码库 | SWE-bench Verified 17% → 53% | MaximeRobeyns/self_improving_coding_agent |

---

### 3.6 生产级平台生态(参考)

独立于算法选择,以下平台在生产环境中已形成生态:

| 平台 | GitHub star | 状态 | 说明 |
|---|---|---|---|
| **Opik** (Comet ML) | ~22,600 | 活跃, Apache-2.0 | 全栈追踪+评估+优化平台;集成 6 种 prompt 优化算法(含 GEPA);日处理 4000 万 trace |
| **Langfuse** | ~35,000 | 2026-01 被 ClickHouse 收购,保持开源 | Prompt 版本管理/推广/回滚;偏管理而非自动优化 |
| **Promptfoo** | ~22,400 | 2026-03 被 OpenAI 收购;MIT | 评估和红队测试;127 家 Fortune 500 使用;偏测试而非优化 |
| **Dify** | ~138,000 | 活跃, Apache-2.0 | 可视化应用构建器;偏部署基础设施而非优化算法 |
| **Braintrust** | 商业 | Notion/Stripe/Airtable 采用 | Loop AI 副驾驶自动优化;有 staging/production 质量门控 |

**启示**:这些平台提供了**部署基础设施**(追踪、评估、版本管理、灰度发布),但核心优化算法仍需自建或集成。RSI 系统的架构应考虑与这类平台的兼容性。

---

### 3.7 GEPA 引用论文中的新发现(引用追踪补充)

通过 Semantic Scholar API 对 GEPA 的 525 篇引用论文进行全量分析,以下是**之前搜索未覆盖到的重要新发现**,按影响力排序。

#### 3.7.1 Meta-Harness — 端到端 Harness 优化(★ 重要发现)

| 维度 | Meta-Harness |
|---|---|
| **论文** | [arXiv:2603.28052](https://arxiv.org/abs/2603.28052) |
| **机构** | Stanford, MIT, KRAFTON |
| **作者** | Yoonho Lee, Roshen Nair, Qizheng Zhang, Kangwook Lee, **Omar Khattab**, Chelsea Finn |
| **引用数** | **279 篇**(GEPA 引用论文中排名第 2,仅次于 ACE 的 414 篇) |
| **机制** | 将整个 "harness" 代码(脚手架、prompt、工具定义、记忆结构、编排逻辑)作为优化目标,而非仅优化 prompt |
| **vs GEPA** | **在形式上包含 GEPA 为特例** — GEPA 只优化 prompt,Meta-Harness 优化包含 prompt 在内的全部 harness 代码。文本分类上超过 SOTA 上下文管理系统 +7.7pp,同时使用 4x 更少 context token |
| **GitHub** | [stanford-iris-lab/meta-harness](https://github.com/stanford-iris-lab/meta-harness), **MIT 许可证** |
| **后继工作** | WHALE(联合权重优化)、Co-Harness(协同进化)等 |
| **可构建性** | **极高** — Stanford+MIT 团队(含 GEPA 共同作者 Khattab);MIT 许可证;279 篇引用证明广泛认可;已催生多项后续工作 |

**分析**:Meta-Harness 是本次引用追踪中最重要的发现。它与 GEPA 的关系类似于 ESPO 与 GEPA 的关系 — 在更高层次上包含 GEPA。但关键区别是:**Meta-Harness 有完整开源代码(MIT)且被广泛引用(279 篇)**。而且 Meta-Harness 的作者之一就是 GEPA 的共同作者 Omar Khattab,说明 GEPA 团队自己也在向 harness-level 优化演进。这可能改变推荐方案。

#### 3.7.2 NLPG — Natural-Language Policy Gradients

| 维度 | NLPG |
|---|---|
| **论文** | [arXiv:2609.33379](https://arxiv.org/abs/2609.33379) |
| **日期** | 2026-09 |
| **机制** | 外部策略记忆方法;自然语言类比的策略梯度;固定 agent 不改权重 |
| **vs GEPA** | **Qwen3-8B:59.00 vs GEPA 51.09(+7.91pp);GPT-4.1 Mini:63.33 vs 59.43（+3.90pp）**,六个基准平均 |
| **开源** | ❌ 未找到公开代码 |

#### 3.7.3 FLARE — Few-shot Learning-based Adaptive Reflective Engine

| 维度 | FLARE |
|---|---|
| **论文** | [arXiv:2608.02919](https://arxiv.org/abs/2608.02919) |
| **日期** | 2026-08 |
| **机制** | 将反思机制与参考示例结合;挑战 GEPA 的"少样本优化不如纯指令优化"的前提 |
| **vs GEPA** | **"在每个 task-model 对上均胜出"**。HotPotQA: 52.2 vs 42.2; Tool Calling: 87.0% vs 81.0%; GoEmotions: +15.3 vs +5.7; 仅需 100 个验证样本即达峰值 |
| **开源** | ❌ 未找到公开代码 |

#### 3.7.4 WDA — Streamlined Reflective Evolution

| 维度 | WDA |
|---|---|
| **论文** | [arXiv:2609.32458](https://arxiv.org/abs/2609.32458) |
| **日期** | 2026-09 |
| **作者** | Xiaofan Zhou, Lu Cheng (与 "What Should the Reflector See?" 同一团队) |
| **机制** | 精简 GEPA 式进化;联合进化阶段指令及其顺序结构;引入 SPLIT 进行冗余重分配 |
| **vs GEPA** | Qwen3.5-9B: 51.24 vs 45.37 (+5.87pp); GPT-4.1-mini: 49.00 vs 44.88 (+4.12pp); BBEH: 31.67 vs 23.33; LiveBench Math: 68.85 vs 59.84 |
| **开源** | ❌ 未找到公开代码 |

#### 3.7.5 StraTune — 自适应修订算子选择

| 维度 | StraTune |
|---|---|
| **论文** | [arXiv:2609.32886](https://arxiv.org/abs/2609.32886) |
| **日期** | 2026-09 |
| **机制** | GEPA 使用固定修订算子;StraTune 根据优化状态自适应选择算子。GEPA 被列为"最强 baseline" |
| **vs GEPA** | Haiku: LiveMath 65.88 vs 43.60, SpreadsheetBench 56.43 vs 52.50; Opus: LiveMath 81.52 vs 78.20 |
| **GitHub** | [seai-lab/StraTune](https://github.com/seai-lab/StraTune) |
| **开源** | ✅ 有代码 |

#### 3.7.6 RLMOpt — 递归语言模型驱动的 Prompt 优化

| 维度 | RLMOpt |
|---|---|
| **论文** | [arXiv:2608.10471](https://arxiv.org/abs/2608.10471) |
| **日期** | 2026-08 |
| **机制** | 搜索策略本身由 LM 驱动(递归);Pareto 选择 + 回归约束 |
| **vs GEPA** | **11 个基准中 9 个胜出**;四任务均值 0.610 vs 0.589; prompt 仅 GEPA 的 27-79% 长; rollout 更少;GEPA 在两个基准上跌破种子 prompt,RLMOpt 从未跌破 |
| **开源** | ❌ 未找到公开代码 |

#### 3.7.7 BudgetAPO — 紧预算下的 Prompt 优化

| 维度 | BudgetAPO |
|---|---|
| **论文** | [arXiv:2610.05671](https://arxiv.org/abs/2610.05671) |
| **日期** | 2026-10 |
| **机制** | 噪声自适应评估大小 + 反思式联合重写;专门解决 GEPA 在预算受限时的严重退化 |
| **vs GEPA** | Holm 校正检验下**所有科目第一**;250 次调用时 GEPA 86% 返回种子(BudgetAPO 仅 13%);GEPA 需要 5x 调用才能匹配 BudgetAPO 的 100 次调用得分 |
| **开源** | ❌ 未找到公开代码 |

**分析**:BudgetAPO 揭示了 GEPA 的一个严重实际问题 — 在 API 预算有限时几乎无法工作。对于面向真实用户的系统(API 成本敏感),这是一个关键缺陷。

#### 3.7.8 Feedback Descent — 基于配对比较的文本优化

| 维度 | Feedback Descent |
|---|---|
| **论文** | [arXiv:2511.07919](https://arxiv.org/abs/2511.07919) |
| **会议** | ICLR 2026 Workshop on RSI |
| **机构** | Stanford(Chelsea Finn 组） |
| **引用数** | 43 篇 |
| **机制** | 保留详细批评(而非压缩为标量奖励);跨 prompt/代码/分子的通用文本优化 |
| **vs GEPA** | IFBench: Qwen3-8B: GEPA 38.61 vs FD 44.22; GPT-4.1 Mini: GEPA 52.72 vs FD 54.59 |
| **开源** | ❌ 未找到公开代码 |

#### 3.7.9 LEVI — 强搜索架构替代更大 LLM

| 维度 | LEVI |
|---|---|
| **论文** | [arXiv:2605.09764](https://arxiv.org/abs/2605.09764) |
| **日期** | 2026-05 |
| **机制** | 多样性保持数据库 + 突变路由到更小 LLM + 排名保持代理基准 |
| **vs GEPA** | 4 个 prompt 优化基准上以**不到一半 rollout 预算**匹配或超越 GEPA;系统研究任务上以 35x 更低成本匹配最佳 |
| **GitHub** | [ttanv/levi](https://github.com/ttanv/levi) |
| **开源** | ✅ 有代码 |

#### 3.7.10 Advisor Models — 动态逐实例建议

| 维度 | Advisor Models |
|---|---|
| **论文** | [arXiv:2510.02453](https://arxiv.org/abs/2510.02453) |
| **会议** | **ICML 2026** (PMLR 306) |
| **作者** | Parth Asawa, Alan Zhu, Abigail O'Neill, **Matei Zaharia**, Alexandros G. Dimakis, Joseph E. Gonzalez |
| **机制** | 训练小模型生成动态的逐实例自然语言建议(vs GEPA 的静态优化 prompt) |
| **vs GEPA** | 个性化: 85-100% vs GEPA 40-60%; RuleArena(税务): +27.4%; GEPA "unable to regain standalone baseline" |
| **开源** | ❌ 未找到公开代码 |

**分析**:Advisor Models 由 GEPA 共同作者 Matei Zaharia 参与,发表于 ICML 2026。这再次说明 GEPA 团队自己也在超越 GEPA — 从静态 prompt 优化转向动态逐实例优化。

#### 3.7.11 SEPO — 证据驱动的结构化编辑

| 维度 | SEPO |
|---|---|
| **论文** | [arXiv:2608.28067](https://arxiv.org/abs/2608.28067) |
| **会议** | Findings of EMNLP 2026 |
| **日期** | 2026-08 |
| **机制** | 局部编辑效果谱系替代 GEPA 的整体 prompt 重写;GEPA 被列为"最强 baseline" |
| **vs GEPA** | Llama-3.1-8B: +3.1pp (61.9% vs 58.8%); Qwen3-8B: +2.2pp (73.3% vs 71.1%); token 用量 2.9M vs 4.1M; prompt 短 5x |
| **开源** | ❌ 未找到公开代码 |

#### 3.7.12 ARC — 层级化 Agent 配置学习

| 维度 | ARC |
|---|---|
| **论文** | [arXiv:2602.11574](https://arxiv.org/abs/2602.11574) |
| **日期** | 2026-02 |
| **机制** | 层级 SMDP 策略实现逐查询的 agent 配置;GEPA 作为 baseline |
| **vs GEPA** | DROP: +24.6pp (63.9% vs 39.3%); HotpotQA: +6.7pp; GSM8k: +5pp |
| **开源** | ❌ 未找到公开代码 |

#### 3.7.13 DSPy 新优化器:ReAnchor 和 GRPO

DSPy 在 2026 年新增了两个重要优化器:

| 优化器 | 版本 | 机制 | vs GEPA | 链接 |
|---|---|---|---|---|
| **dspy.experimental.ReAnchor** | DSPy 3.4.0 (2026-09-25) | 校准 Flex 程序中的决策预测器;用 proposer LM 改写 Flex 代码 | **Flex + ReAnchor 在已测试任务上超过 Predict + GEPA,成本低 4-6x** | [DSPy 3.4.0 Release](https://github.com/stanfordnlp/dspy/releases) |
| **dspy.GRPO** | DSPy 内置(源自 Arbor) | 多模块 Group Relative Policy Optimization;在线 RL 优化 DSPy 程序 | 不同范式(RL vs 进化),互补 | [arXiv:2508.04660](https://arxiv.org/abs/2508.04660); 原始仓库 [Ziems/arbor](https://github.com/Ziems/arbor)(已归档) |

**分析**:ReAnchor 的出现尤其重要 — DSPy 官方在 3.4.0 中引入了一个声称以 4-6x 更低成本超过 GEPA 的优化器。这意味着即使在 DSPy 生态内部,GEPA 也不再是唯一选择。

#### 3.7.14 GEPA 团队的自我超越:optimize_anything 和 Adaptive-GEPA

| 工作 | 论文 | 机制 | 结果 | 链接 |
|---|---|---|---|---|
| **optimize_anything** | [arXiv:2605.19633](https://arxiv.org/abs/2605.19633) (ACM CAIS 2026) | 将 GEPA 从 prompt 扩展到任意文本产物(代码、调度算法、CUDA kernel);声明式 API | Agent 架构在 ARC-AGI 上将准确率从 32.5% 提升到 89.5% | [gepa-ai/gepa](https://github.com/gepa-ai/gepa) |
| **Adaptive-GEPA** | [arXiv:2609.38762](https://arxiv.org/abs/2609.38762) | 为异构请求协同进化路由器和专家程序 | 70.6 vs 原始 GEPA 62.5 vs GRPO 54.0 (Qwen3-8B) | 无公开代码 |
| **Combee** | [arXiv:2604.04247](https://arxiv.org/abs/2604.04247) | 将 GEPA 式 prompt 学习扩展到更大 agent 系统 | 扩展 GEPA 的适用范围 | 无公开代码 |

#### 3.7.15 GEPA 的关键弱点:引用论文揭示的系统性问题

以下引用论文揭示了 GEPA 的多个系统性问题,对 RSI 系统设计有直接影响:

| 问题 | 论文 | 发现 |
|---|---|---|
| **紧预算退化** | BudgetAPO ([arXiv:2610.05671](https://arxiv.org/abs/2610.05671)) | 250 次 API 调用时,GEPA 86% 返回种子 prompt;需要 5x 调用才能匹配 BudgetAPO 的 100 次调用得分 |
| **未评分维度回归** | [arXiv:2610.13287](https://arxiv.org/abs/2610.13287) | GEPA/MIPROv2/TextGrad 均在未评分维度产生回归(引用有效性下降 10.7-41.6pp);加 1024-token 上限后回归降至 <1pp |
| **持续学习失败** | Terminal-Bench 2.0 ([arXiv:2607.14004](https://arxiv.org/abs/2607.14004)) | 优化增益仅在有回归控制时才复合;GEPA "transfers below unoptimized baseline" on new tasks |
| **过拟合/记忆** | [arXiv:2610.12601](https://arxiv.org/abs/2610.12601) | 深度研究 agent 上,GEPA 优化的近半数 prompt 是记忆化的答案;消融实验显示其贡献为零 |
| **反思策略不稳定** | [arXiv:2609.32452](https://arxiv.org/abs/2609.32452) | 9 种反思策略对比:无单一策略主导;Failures-only 均值最高(+8.0pp)但方差大 |
| **选择噪声锁定** | "Winner's Curse" ([arXiv:2610.09239](https://arxiv.org/abs/2610.09239)) | 自改进循环中的选择噪声导致次优 prompt 锁定 |
| **复杂搜索不必要** | NPO ([arXiv:2608.27266](https://arxiv.org/abs/2608.27266)) | 简单单谱系方法在 22 个 TextArena 游戏中匹配 GEPA;GEPA 的 Pareto 搜索增加的收益边际 |

#### 3.7.16 其他有代码的新竞争者

| 工作 | 论文 | 机制 | GitHub | 许可证 |
|---|---|---|---|---|
| **WHALE** | [arXiv:2609.00196](https://arxiv.org/abs/2609.00196) | 联合 harness 搜索 + 模型权重更新;基于 Meta-Harness | [krafton-ai/WHALE](https://github.com/krafton-ai/WHALE) | Apache-2.0 |
| **Continual Harness** | [arXiv:2605.09998](https://arxiv.org/abs/2605.09998) | 无重置的持续 harness 优化;完成了 Pokemon Blue/Yellow/Crystal | [sethkarten/continual-harness](https://github.com/sethkarten/continual-harness) | MIT |
| **Memento-Skills** | [arXiv:2603.18743](https://arxiv.org/abs/2603.18743) | Agent 设计 Agent;可复用技能作为持久进化记忆 | [Memento-Teams/Memento-Skills](https://github.com/Memento-Teams/Memento-Skills) | Apache-2.0 |
| **Promptomatix** | — | Salesforce 的自动 prompt 优化框架;基于 DSPy | [SalesforceAIResearch/promptomatix](https://github.com/SalesforceAIResearch/promptomatix) | Apache-2.0 |
| **AutoPrompt** | — | 基于意图的 Prompt 校准;迭代构建边界案例 | [Eladlev/AutoPrompt](https://github.com/Eladlev/AutoPrompt) | Apache-2.0 |
| **Promptolution** | [arXiv:2512.02840](https://arxiv.org/abs/2512.02840) (EACL 2026) | AutoML 组的统一模块化 prompt 优化框架 | [automl/promptolution](https://github.com/automl/promptolution) | Apache-2.0 |
| **RoboPhD** | [arXiv:2604.04347](https://arxiv.org/abs/2604.04347) | Elo 锦标赛选择(vs GEPA 的 Pareto 选择);无验证进化 | MIT 许可(optimize_anything() API) | — |
| **LEVI** | [arXiv:2605.09764](https://arxiv.org/abs/2605.09764) | 多样性保持 + 突变路由到更小 LLM;半预算匹配 GEPA | [ttanv/levi](https://github.com/ttanv/levi) | — |

---

## 4. 深度对比:GEPA vs 顶级候选

### 4.1 核心维度对比表

| 维度 | GEPA | **Meta-Harness** | ACE | SkillOpt | ESPO | CASD | metaTextGrad | EvoSkill |
|---|---|---|---|---|---|---|---|---|
| **优化对象** | Prompt 文本 | **全部 Harness 代码**(prompt+工具+记忆+编排) | 结构化 Context Playbook | Skill 文档 (Markdown) | Prompt 文本 | 行为规则(一次性) | 优化器元 prompt | 多 Agent 技能库 |
| **优化机制** | 反思式 Pareto 进化 | **端到端 harness 代码搜索** | 三角色 delta 更新 | 评分 rollout → 有界编辑 | 错误聚类 → 四策略提议 → bootstrap 筛选 | Coding agent 语料分析 | 元优化器自适应 | 失败驱动 Pareto 发现 |
| **迭代方式** | 多轮迭代 | 多轮迭代 | 多轮迭代 | 多轮迭代 | 多轮迭代 | **一次性** | 多轮迭代 | 多轮迭代 |
| **会议** | ICLR 2026 Oral | 预印本(279 引用) | ICLR 2026 | 预印本 | EMNLP 2026 投稿 | 预印本 | NeurIPS 2025 | 预印本 |
| **vs GEPA** | — | **包含 GEPA 为子集;+7.7pp, 4x 更少 token** | 延迟低 82-91% | 不同层(skill vs prompt) | **+3.76pp, 形式包含 GEPA** | **+5.7pp agentic, 22x 便宜** | 不同层(meta) | 不直接对比 |
| **开源完整度** | ✅ 完整 | **✅ 完整** | ✅ 完整 | ✅ 完整 | ❌ 无代码 | ❌ 未确认 | ✅ 有代码 | ✅ Apache-2.0 |
| **GitHub star** | 6,966 | **待确认** | 1,361 | 18,295 | 0 | 0 | 15 (metatextgrad) / 3,759 (textgrad) | 1,251 |
| **GitHub fork** | 576 | **待确认** | 169 | 1,729 | 0 | 0 | 2 / 294 | 132 |
| **许可证** | MIT | **MIT** | Apache-2.0 | MIT | — | — | MIT | Apache-2.0 |
| **引用数** | 525 (被引) | 279 | 414 | 133 | — | — | — | 100 |
| **门控设计** | Pareto 前沿 | 继承底层优化器 | Curator 审核 | **留出验证集严格提升** | Bootstrap 稳定性 | 无(一次性) | 无显式门控 | 留出验证 |
| **产物可读性** | Prompt 文本 | **Harness 代码(可读可审计)** | 结构化 Playbook | Markdown 文档 | Prompt 文本 | 规则列表 | 优化后的 prompt | 技能目录 |
| **多 agent 支持** | ❌ 单 agent | ✅(优化整体编排) | ❌ 单 agent | ❌ 单 agent | ❌ 单 agent | ❌ | ❌ | ✅ 多 agent |
| **可组合性** | DSPy 生态 | **通用(优化任意 harness)** | 独立 | 独立 | — | 与任何 coding agent 组合 | TextGrad 生态 | 兼容 6+ agent 框架 |

### 4.2 开源可构建性评估(按可构建性排序)

这是选型的核心:哪些工作可以直接作为基础代码进行改造?

| 排名 | 工作 | 可构建性评分 | 理由 |
|---|---|---|---|
| **#1** | **SkillOpt** | ⭐⭐⭐⭐⭐ | 18.3k star, 1.7k fork, MIT, 64 贡献者;代码完整、文档齐全、PyPI 包、SkillOpt-Sleep 夜间自进化;已是 RSI 领域最活跃的开源项目 |
| **#2** | **DSPy (含 GEPA/ReAnchor/GRPO)** | ⭐⭐⭐⭐⭐ | 38.6k star, 3.4k fork;GEPA+ReAnchor+GRPO 三优化器;生态极其成熟;但 GEPA 已被多方超越,ReAnchor 声称以 4-6x 更低成本胜出 |
| **★#3** | **Meta-Harness** | ⭐⭐⭐⭐½ | Stanford+MIT, MIT 许可, **279 篇引用**;含 GEPA 共同作者 Khattab;优化整体 harness 而非仅 prompt;**在形式上包含 GEPA 为子集**;已催生 WHALE、Co-Harness 等后续工作 |
| **#4** | **ACE** | ⭐⭐⭐⭐ | 1.4k star, 169 fork, Apache-2.0, **414 篇引用**(最高);模块化三角色设计;结构化 playbook 输出;但社区规模小于 SkillOpt |
| **#5** | **TextGrad** | ⭐⭐⭐½ | 3.8k star, MIT;Nature 发表;框架通用;但代码已 15 个月未更新(stale);metaTextGrad 仅 15 star |
| **#6** | **EvoAgentX** | ⭐⭐⭐½ | 3.4k star(已更名 ANative-Lab);集成多种优化器;但自身架构的改造空间受限 |
| **#7** | **EvoSkill** | ⭐⭐⭐ | 1.3k star, 132 fork, Apache-2.0;兼容 Claude Code/Codex/OpenHands 等 6+ 框架;git-branch 式变体追踪 |
| **#8** | **Memento-Skills** | ⭐⭐⭐ | 1.6k star, 181 fork, Apache-2.0;Agent 设计 Agent;可复用技能记忆;59 篇引用 |
| **#9** | **AdalFlow** | ⭐⭐⭐ | 4.2k star, MIT;PyTorch 式 API;但代码活跃度下降(5 个月未更新) |
| **#10** | **SkillRL** | ⭐⭐⭐ | 1.0k star, 80 fork, MIT, NeurIPS 2026;RL 技能进化;Qwen2.5-7B 超 GPT-4o +41.9% |
| — | ESPO | ⭐ | 理论最强(形式包含 GEPA)但无代码 |
| — | CASD | ⭐ | 方法新颖(22x 更便宜)但无代码,且为一次性方案 |
| — | FLARE | ⭐ | 每个 task-model 对均胜 GEPA 但无代码 |
| — | NLPG | ⭐ | +7.91pp 超 GEPA 但无代码 |

---

## 5. 综合分析与推荐

### 5.1 核心发现

1. **GEPA 在 prompt 优化领域已被全面超越**。引用追踪发现 14 项工作在论文中直接报告了对 GEPA 的胜率,包括 ESPO(形式包含 GEPA)、FLARE(每个 task-model 对均胜)、NLPG(+7.91pp)、WDA(+5.87pp)、RLMOpt(9/11 胜)。GEPA 团队自己也在向更高层次演进(optimize_anything, Advisor Models)。

2. **Meta-Harness 是最重要的新发现** — 它在形式上将 GEPA 包含为子集(GEPA 只优化 prompt,Meta-Harness 优化整体 harness 代码),由 Stanford+MIT 团队开发(含 GEPA 共同作者 Khattab),MIT 许可证,279 篇引用,有完整开源代码。这是目前唯一同时满足"理论上包含 GEPA"+"完整开源"+"广泛引用"三个条件的工作。

3. **GEPA 有多个被论文正式记录的系统性弱点**:紧预算退化(86% 返回种子)、未评分维度回归(引用有效性 -41.6pp)、持续学习失败(低于未优化 baseline)、过拟合/记忆化、选择噪声锁定。这些不是边缘问题,而是影响生产部署的核心缺陷。

4. **DSPy 生态内部也在超越 GEPA** — dspy.experimental.ReAnchor 声称以 4-6x 更低成本超过 Predict+GEPA。GEPA 即使在自己的"主场"DSPy 中也不再是唯一最优选择。

5. **技能文档优化已成为独立且更有效的方向**。SkillOpt(52/52 格全胜, 18.3k star)、Trace2Skill(+57.65pp 跨模型迁移)、以及 2026 年爆发的 10+ 项 Skill* 工作,确认"优化 Markdown 技能文档"比"优化 prompt 文本"更适合 RSI 系统。

6. **Harness-level 优化是新的前沿**。Meta-Harness(279 引用)、WHALE、Co-Harness、Agentic Harness Engineering(124 引用)等工作表明,优化整体 harness(包括 prompt、工具、记忆、编排)比仅优化 prompt 更有效。GEPA 团队自己的 optimize_anything 也在向这个方向演进。

### 5.2 推荐方案

#### 方案 A:保留 GEPA,增强组合(保守方案)

**保留 GEPA 作为 DSPy 层的快速迭代优化器,但用新发现的工作填补其弱点**。

修改 rsi_solu1 的方式:
- 核心不变:GEPA(快速迭代) + SkillOpt(深度训练)
- 新增:借鉴 ESPO 的三阶段框架**改造 GEPA 的反思模块**,解决 prompt 膨胀问题
- 新增:用 CASD 的思路做**冷启动**(一次性分析大量 trajectory → 高质量初始技能)
- 新增:参考 AgentGrad 的干预因果方法扩展到**多 agent 场景**
- 新增:引入 CAPO 的约束感知机制处理**运营约束**(工具调用限制、回复长度、安全率)

优点:改动小,DSPy 生态完整,风险低
缺点:GEPA 的底层 Pareto 进化机制不变,无法获得 ESPO 级别的理论提升

#### 方案 B:用 ACE 替换 GEPA,升级到"结构化上下文"范式

**用 ACE 替换 GEPA 作为核心迭代优化器,因为 ACE 的优化对象(结构化 playbook)比 GEPA 的(平坦 prompt)更适合 RSI 系统**。

| 层次 | 原方案 (rsi_solu1) | 新方案 |
|---|---|---|
| **快速迭代层** | GEPA(prompt 进化) | **ACE**(结构化 context playbook 进化) |
| **深度训练层** | SkillOpt(技能文档优化) | SkillOpt(不变) |
| **冷启动** | 无 | **CASD 式 trajectory 分析** → 生成初始 playbook 和技能 |
| **元优化层** | 无 | **metaTextGrad 思路** → 定期优化 ACE 的 Reflector prompt |
| **治理层** | Ouroboros + Recuris + SIC-Agents | 不变 |
| **约束处理** | 无 | **CAPO 式对偶方法** → 运营约束感知 |

优点:ACE 414 篇引用(最高)、ICLR 2026、Apache-2.0;结构化 playbook 与 SkillOpt 天然对齐;三角色模块化设计
缺点:ACE 社区规模(1.4k star)远小于 SkillOpt(18.3k);没有 Meta-Harness 那样的全 harness 覆盖能力

#### 方案 C:用 Meta-Harness 替换 GEPA,升级到"全 Harness"范式(★ 新推荐方案)

**用 Meta-Harness 替换 GEPA 作为核心优化引擎,因为 Meta-Harness 在形式上包含 GEPA(优化整体 harness 而非仅 prompt),且有完整开源代码和广泛引用**。

| 层次 | 原方案 (rsi_solu1) | 新方案 |
|---|---|---|
| **核心优化引擎** | GEPA(仅 prompt 进化) | **Meta-Harness**(全 harness 代码优化,含 prompt/工具/记忆/编排) |
| **深度训练层** | SkillOpt(技能文档优化) | SkillOpt(不变;技能文档作为 harness 的一部分被 Meta-Harness 优化) |
| **冷启动** | 无 | **CASD 式 trajectory 分析** → 生成初始 harness 和技能 |
| **预算控制** | 无 | 借鉴 **BudgetAPO** 的噪声自适应评估 → 解决 GEPA 的紧预算退化问题 |
| **回归防护** | 无 | 借鉴 **Terminal-Bench 2.0** 的回归控制 → 确保优化增益在持续学习中复合 |
| **元优化层** | 无 | **DSPy ReAnchor** → 低成本优化 harness 内的决策模块 |
| **治理层** | Ouroboros + Recuris + SIC-Agents | 不变 |
| **约束处理** | 无 | **CAPO 式对偶方法** → 运营约束感知 |

推荐理由:

1. **Meta-Harness 在形式上包含 GEPA** — GEPA 只优化 prompt,Meta-Harness 优化包含 prompt 在内的全部 harness 代码(工具定义、记忆结构、编排逻辑);这不是增量改进,而是维度提升
2. **Meta-Harness 有 GEPA 共同作者 Omar Khattab 参与** — 可以理解为 GEPA 团队自己认可的升级方向
3. **MIT 许可证 + 完整开源 + 279 篇引用** — 满足"广泛认可"+"开源完整"+"可作为基础代码"全部三个条件
4. **已催生活跃的后续工作生态** — WHALE(联合权重)、Co-Harness(协同进化)、Continual Harness(持续学习)等证明方法论的可扩展性
5. **解决了 GEPA 的核心缺陷** — 通过优化整体 harness,可以同时优化 prompt 和工具/记忆/编排,避免 GEPA 的"只优化 prompt 但工具/编排成为瓶颈"的问题
6. **与 SkillOpt 互补** — Meta-Harness 优化 harness 代码(包括如何调用/使用 skill),SkillOpt 优化 skill 文档内容;两者在不同层次工作

实施要点:
- 从 stanford-iris-lab/meta-harness 仓库 fork
- 集成 SkillOpt 的留出验证门控(Meta-Harness 的默认门控可能不够严格)
- 借鉴 BudgetAPO 的预算控制机制,解决底层 GEPA 的紧预算退化
- 借鉴 Terminal-Bench 2.0 的回归控制,确保持续学习场景下增益复合
- 将 SkillOpt 的 skill.md 作为 harness 的组成部分纳入 Meta-Harness 的优化范围

#### 方案 D:全面升级到 SkillOpt 系生态(激进方案)

**放弃 prompt/harness 级优化,全面转向技能文档优化。以 SkillOpt 为唯一核心,辅以 Trace2Skill(初始化)、EvoSkill(多 agent 扩展)、SkillGrad(梯度式精调)。**

优点:SkillOpt 18.3k star 的生态远强于 Meta-Harness/ACE;52/52 全胜;所有产物都是人类可读的 Markdown;PyPI 包 + SkillOpt-Sleep 夜间自进化
缺点:放弃了 prompt/harness 级别的细粒度优化;SkillOpt 不处理工具/编排优化;目标模型切换可能需要重新训练

### 5.3 最终推荐(更新)

**推荐方案 C(Meta-Harness 替换 GEPA)**,原因:

1. Meta-Harness 是目前唯一同时满足以下全部条件的工作:
   - ✅ 理论上包含 GEPA 为子集(优化整体 harness)
   - ✅ 完整开源(MIT 许可证)
   - ✅ 广泛认可(279 篇引用,Stanford+MIT 团队,含 GEPA 共同作者)
   - ✅ 可直接作为基础代码改造

2. 相比之前推荐的 ACE(方案 B),Meta-Harness 的优势在于:
   - 优化范围更广(全 harness vs 仅 context playbook)
   - 学术团队更强(含 GEPA 原作者)
   - 后续生态更活跃(WHALE、Co-Harness 等)

3. 保留 SkillOpt 作为深度训练层,两层优化的架构不变 — Meta-Harness 负责 harness 整体优化,SkillOpt 负责 skill 文档的精细训练

4. 同时吸收引用论文揭示的关键教训:
   - 预算控制(BudgetAPO)→ 避免紧预算退化
   - 回归控制(Terminal-Bench 2.0)→ 确保持续学习增益复合
   - 未评分维度防护(arXiv:2610.13287)→ 加 token 上限和多维评估

**密切关注**:ESPO(一旦开源)、dspy.ReAnchor(4-6x 更低成本声称)、FLARE(每个 task-model 对均胜 GEPA)。

---

## 6. 对 rsi_solu1.markdown 的影响

如果采用推荐方案 C(Meta-Harness 替换 GEPA),rsi_solu1 需要做以下修改:

| 章节 | 原内容 | 建议修改 |
|---|---|---|
| 3.1 核心(必选) | GEPA 作为核心 | 改为 **Meta-Harness** 作为核心优化引擎 |
| 3.2 按场景叠加 | GEPA + SkillOpt | **Meta-Harness + SkillOpt** |
| 4.1 两层优化架构 | 第一层: GEPA (prompt 进化) | 第一层: **Meta-Harness (全 harness 代码优化)** |
| 4.3 门控系统 | GEPA 的 Pareto 门控 | **SkillOpt 的留出验证** + **回归控制**(借鉴 Terminal-Bench 2.0) |
| 5.0 实施路线图 | Phase 1: GEPA 单机 baseline | Phase 1: **Meta-Harness 单机 baseline** |
| 新增 | 无 | 新增冷启动模块(CASD 式 trajectory 分析) |
| 新增 | 无 | 新增约束感知模块(CAPO 式对偶方法) |
| 新增 | 无 | 新增**预算控制**(BudgetAPO 的噪声自适应评估) |
| 新增 | 无 | 新增**回归防护**(未评分维度监控 + token 上限) |
| 新增 | 无 | 新增**元优化层**(DSPy ReAnchor 优化 harness 内决策模块) |
| 更新 L2 教训 | "落地效果最强的是 GEPA" | 更新为 "Meta-Harness 在形式上包含 GEPA;GEPA 已被 14 项工作超越" |

---

## 7. 参考文献与链接

### 7.1 核心引用(含完整链接)

| 工作 | arXiv | GitHub | 引用数 | star/fork | 许可证 | 主页/文档 | 状态 |
|---|---|---|---|---|---|---|---|
| **GEPA** | [2507.19457](https://arxiv.org/abs/2507.19457) | [gepa-ai/gepa](https://github.com/gepa-ai/gepa) | 525 | 6,966/576 | MIT | [主页](https://gepa-ai.github.io/gepa/) | 活跃 |
| **Meta-Harness** | [2603.28052](https://arxiv.org/abs/2603.28052) | [stanford-iris-lab/meta-harness](https://github.com/stanford-iris-lab/meta-harness) | 279 | 待确认 | MIT | — | 活跃 |
| **ACE** | [2510.04618](https://arxiv.org/abs/2510.04618) | [ace-agent/ace](https://github.com/ace-agent/ace) | 414 | 1,361/169 | Apache-2.0 | [主页](https://ace-agent.github.io/) | 活跃 |
| **SkillOpt** | [2605.23904](https://arxiv.org/abs/2605.23904) | [microsoft/SkillOpt](https://github.com/microsoft/SkillOpt) | 133 | 18,295/1,729 | MIT | [主页](https://microsoft.github.io/SkillOpt/), [aka.ms/skillopt](https://aka.ms/skillopt), PyPI: `skillopt` | 活跃 |
| **DSPy** | — | [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) | — | 38,609/3,418 | MIT | [dspy.ai](https://dspy.ai) | 活跃 |
| **TextGrad** | [2406.07496](https://arxiv.org/abs/2406.07496) | [zou-group/textgrad](https://github.com/zou-group/textgrad) | — | 3,759/294 | MIT | [textgrad.com](http://textgrad.com/) | 停滞(2025-07) |
| **metaTextGrad** | [2505.18524](https://arxiv.org/abs/2505.18524) | [zou-group/metatextgrad](https://github.com/zou-group/metatextgrad) | — | 15/2 | MIT | — | 停滞(2025-11) |
| **EvoSkill** | [2603.02766](https://arxiv.org/abs/2603.02766) | [sentient-agi/EvoSkill](https://github.com/sentient-agi/EvoSkill) | 100 | 1,251/132 | Apache-2.0 | — | 活跃 |
| **Trace2Skill** | [2603.25158](https://arxiv.org/abs/2603.25158) | [Qwen-Applications/Trace2Skill](https://github.com/Qwen-Applications/Trace2Skill) | — | 312/20 | Apache-2.0 | — | 低活跃 |
| **SkillRL** | [2602.08234](https://arxiv.org/abs/2602.08234) | [aiming-lab/SkillRL](https://github.com/aiming-lab/SkillRL) | — | 1,007/80 | MIT | — | 活跃 |
| **AFlow** | [2410.10762](https://arxiv.org/abs/2410.10762) | [FoundationAgents/AFlow](https://github.com/FoundationAgents/AFlow) | — | 612/100 | MIT | — | 停滞(2025-12) |
| **EvoAgentX** | — | [ANative-Lab/EvoAgentX](https://github.com/ANative-Lab/EvoAgentX) | — | 3,376/316 | Other | [主页](https://anative-lab.github.io/EvoAgentX/) | 活跃 |
| **AdalFlow** | — | [SylphAI-Inc/AdalFlow](https://github.com/SylphAI-Inc/AdalFlow) | — | 4,221/388 | MIT | [文档](http://adalflow.sylph.ai/) | 低活跃(2026-05) |
| **PromptWizard** | [2405.18369](https://arxiv.org/abs/2405.18369) | [microsoft/PromptWizard](https://github.com/microsoft/PromptWizard) | — | 4,019/357 | MIT | — | 停滞(2025-10) |
| **Trace (OptoPrime)** | [2406.16218](https://arxiv.org/abs/2406.16218) | [microsoft/Trace](https://github.com/microsoft/Trace) | — | 763/63 | MIT | [文档](https://microsoft.github.io/Trace/), PyPI: `trace-opt` | 活跃 |
| **SkillGrad** | [2605.27760](https://arxiv.org/abs/2605.27760) | [wwwhy725/SkillGrad](https://github.com/wwwhy725/SkillGrad) | — | 28/7 | MIT | — | 低活跃 |
| **ADAS** | [2408.08435](https://arxiv.org/abs/2408.08435) | [ShengranHu/ADAS](https://github.com/ShengranHu/ADAS) | — | 1,646/239 | Apache-2.0 | [主页](https://www.shengranhu.com/ADAS/) | 停滞(2025-01) |
| **DGM** | [2505.22954](https://arxiv.org/abs/2505.22954) | [jennyzzt/dgm](https://github.com/jennyzzt/dgm) | — | 2,413/451 | Apache-2.0 | — | 停滞(2025-08) |
| **MemSkill** | [2602.02474](https://arxiv.org/abs/2602.02474) | [ViktorAxelsen/MemSkill](https://github.com/ViktorAxelsen/MemSkill) | — | 581/37 | Apache-2.0 | — | 活跃 |
| **AutoSkill** | [2603.01145](https://arxiv.org/abs/2603.01145) | [ECNU-ICALK/AutoSkill](https://github.com/ECNU-ICALK/AutoSkill) | — | 599/59 | — | — | 低活跃 |
| **HyperAgents** | — | [facebookresearch/HyperAgents](https://github.com/facebookresearch/HyperAgents) | — | 2,802/366 | Other | — | 活跃 |
| **Dynamic Cheatsheet** | [2504.07952](https://arxiv.org/abs/2504.07952) | [suzgunmirac/dynamic-cheatsheet](https://github.com/suzgunmirac/dynamic-cheatsheet) | — | 277/40 | MIT | — | 低活跃 |

### 7.1b 引用追踪新发现的工作(含完整链接)

| 工作 | arXiv | GitHub | 许可证 | 备注 |
|---|---|---|---|---|
| **ESPO** | [2609.04197](https://arxiv.org/abs/2609.04197) | 无 | — | 形式包含 GEPA;EMNLP 2026 投稿 |
| **CASD** | [2609.26261](https://arxiv.org/abs/2609.26261) | 未确认 | — | Semantic Scholar 未索引此 ID,可能有误 |
| **AgentGrad** | [2609.08572](https://arxiv.org/abs/2609.08572) | 无 | — | NeurIPS 2026 |
| **NLPG** | [2609.33379](https://arxiv.org/abs/2609.33379) | 无 | — | +7.91pp 超 GEPA |
| **FLARE** | [2608.02919](https://arxiv.org/abs/2608.02919) | 无 | — | 每个 task-model 对均胜 |
| **WDA** | [2609.32458](https://arxiv.org/abs/2609.32458) | 无 | — | +5.87pp 超 GEPA |
| **StraTune** | [2609.32886](https://arxiv.org/abs/2609.32886) | [seai-lab/StraTune](https://github.com/seai-lab/StraTune) | — | 自适应修订算子 |
| **RLMOpt** | [2608.10471](https://arxiv.org/abs/2608.10471) | 无 | — | 9/11 胜 GEPA |
| **BudgetAPO** | [2610.05671](https://arxiv.org/abs/2610.05671) | 无 | — | GEPA 紧预算退化 |
| **SEPO** | [2608.28067](https://arxiv.org/abs/2608.28067) | 无 | — | Findings of EMNLP 2026 |
| **ARC** | [2602.11574](https://arxiv.org/abs/2602.11574) | 无 | — | +24.6pp DROP |
| **Advisor Models** | [2510.02453](https://arxiv.org/abs/2510.02453) | 无 | — | ICML 2026 |
| **Feedback Descent** | [2511.07919](https://arxiv.org/abs/2511.07919) | 无 | — | ICLR 2026 Workshop |
| **LEVI** | [2605.09764](https://arxiv.org/abs/2605.09764) | [ttanv/levi](https://github.com/ttanv/levi) | — | 半预算匹配 GEPA |
| **RoboPhD** | [2604.04347](https://arxiv.org/abs/2604.04347) | — | MIT | Elo 锦标赛 |
| **NPO** | [2608.27266](https://arxiv.org/abs/2608.27266) | 无 | — | 简单方法匹配 GEPA |
| **Ranking-PE** | [2609.40361](https://arxiv.org/abs/2609.40361) | 无 | — | 临床诊断专用 |
| **Contrastive Reflection** | [2606.30840](https://arxiv.org/abs/2606.30840) | 无 | — | KDD 2026 Workshop |
| **WHALE** | [2609.00196](https://arxiv.org/abs/2609.00196) | [krafton-ai/WHALE](https://github.com/krafton-ai/WHALE) | Apache-2.0 | 联合 harness+权重 |
| **Continual Harness** | [2605.09998](https://arxiv.org/abs/2605.09998) | [sethkarten/continual-harness](https://github.com/sethkarten/continual-harness) | MIT | 持续 harness |
| **Memento-Skills** | [2603.18743](https://arxiv.org/abs/2603.18743) | [Memento-Teams/Memento-Skills](https://github.com/Memento-Teams/Memento-Skills) | Apache-2.0 | [主页](https://memento.run/research/skills/) |
| **Promptomatix** | — | [SalesforceAIResearch/promptomatix](https://github.com/SalesforceAIResearch/promptomatix) | Apache-2.0 | Salesforce |
| **AutoPrompt** | — | [Eladlev/AutoPrompt](https://github.com/Eladlev/AutoPrompt) | Apache-2.0 | 3,017 star |
| **Promptolution** | [2512.02840](https://arxiv.org/abs/2512.02840) | [automl/promptolution](https://github.com/automl/promptolution) | Apache-2.0 | [文档](https://gepromptet.github.io/promptolution/), EACL 2026 |
| **optimize_anything** | [2605.19633](https://arxiv.org/abs/2605.19633) | [gepa-ai/gepa](https://github.com/gepa-ai/gepa) | MIT | GEPA 团队自研后继 |
| **Adaptive-GEPA** | [2609.38762](https://arxiv.org/abs/2609.38762) | 无 | — | GEPA 异构扩展 |
| **Combee** | [2604.04247](https://arxiv.org/abs/2604.04247) | 无 | — | GEPA 团队参与 |
| **CORAL** | [2604.01658](https://arxiv.org/abs/2604.01658) | [Human-Agent-Society/CORAL](https://github.com/Human-Agent-Society/CORAL) | — | COLM 2026 |
| **dspy.GRPO** | [2508.04660](https://arxiv.org/abs/2508.04660) | [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) (内置); 原 [Ziems/arbor](https://github.com/Ziems/arbor) (已归档) | MIT | DSPy 新优化器 |
| **Contrastive Reflection** | [2606.30840](https://arxiv.org/abs/2606.30840) | 无 | — | LinkedIn, KDD 2026 Workshop |

### 7.2 相关综述与评估

| 综述/评估 | arXiv | 说明 |
|---|---|---|
| "Self-Improvements in Modern Agentic Systems: A Survey" (2026-07) | [2607.13104](https://arxiv.org/abs/2607.13104) | 97 页,~670 引用;Schmidhuber 参与;最全面的自改进 agent 综述 |
| "A Survey of Automatic Prompt Engineering" (2025-02) | [2502.11560](https://arxiv.org/abs/2502.11560) | 形式化 prompt 优化为最大化问题 |
| "A Systematic Survey of Automatic Prompt Optimization Techniques" (EMNLP 2025) | [2502.16923](https://arxiv.org/abs/2502.16923) | 五部分统一 APO 框架 |
| "Agent Skills for Large Language Models" (2026-02) | [2602.12430](https://arxiv.org/abs/2602.12430) | 技能架构综述 |
| "Rethinking the Evaluation of Harness Evolution" (2026-07) | [2607.12227](https://arxiv.org/abs/2607.12227) | **46 引用**;harness 进化方法(含 GEPA)评估方法论批判 |
| "Harness Updating Is Not Harness Benefit" (2026-05) | [2605.30621](https://arxiv.org/abs/2605.30621) | **27 引用**;解耦自进化 agent 的进化能力 |
| "Do Prompt Optimizers Break Requirements?" (2026-10) | [2610.13287](https://arxiv.org/abs/2610.13287) | 预注册研究;GEPA 在未评分维度产生回归 |
| "Terminal-Bench 2.0" (2026-07) | [2607.14004](https://arxiv.org/abs/2607.14004) | 优化增益复合性测试;GEPA 在持续学习中失败 |
| "The Winner's Curse in Self-Improvement Loops" (2026-10) | [2610.09239](https://arxiv.org/abs/2610.09239) | 自改进循环中的选择噪声与锁定分析 |
| "What Should the Reflector See?" (2026-09) | [2609.32452](https://arxiv.org/abs/2609.32452) | GEPA 式反思的经验研究;无单一策略主导 |
| "MAS-PromptBench" (2026-06) | [2606.23664](https://arxiv.org/abs/2606.23664) | 多 agent 系统 prompt 优化基准;评估 GEPA; GitHub: [juyangbai/MAS-PromptBench](https://github.com/juyangbai/MAS-PromptBench) |
| "From Static Templates to Dynamic Graphs" (2026-03) | [2603.22386](https://arxiv.org/abs/2603.22386) | **32 引用**;LLM agent 工作流优化综述 |

### 7.3 补充发现

| 工作 | arXiv | 说明 |
|---|---|---|
| CAPO (Microsoft) | [2608.16068](https://arxiv.org/abs/2608.16068) | 约束感知 prompt 优化 |
| SkillProx (HKUST) | [2608.07449](https://arxiv.org/abs/2608.07449) | 近端文本梯度下降;但关键阈值可能是测试集选择的 |
| SkillReducer (HKUST, Tsinghua) | [2603.29919](https://arxiv.org/abs/2603.29919) | 技能 token 压缩;48% 描述压缩 + 39% 正文压缩 |
| SkillGLoW | [2609.02217](https://arxiv.org/abs/2609.02217) | 过程族技能合并;+17.2pp |
| MMG2Skill (NJU) | [2606.01993](https://arxiv.org/abs/2606.01993) | 多模态指南蒸馏为技能 |
| SkillRL (NeurIPS 2026) | [2602.08234](https://arxiv.org/abs/2602.08234) | RL 技能进化;Qwen2.5-7B 超 GPT-4o +41.9% |
| Skill1 (USTC) | [2605.06130](https://arxiv.org/abs/2605.06130) | ALFWorld 97.5% |
| MemSkill (NeurIPS 2026) | [2602.02474](https://arxiv.org/abs/2602.02474) | 记忆技能进化 |
| AutoSkill (Shanghai AI Lab) | [2603.01145](https://arxiv.org/abs/2603.01145) | 终身学习技能自进化 |
| DGM (ICLR 2026) | [2505.22954](https://arxiv.org/abs/2505.22954) | 达尔文哥德尔机 |
| SICA (ICLR 2025 Workshop) | [2504.15228](https://arxiv.org/abs/2504.15228) | 自改进编码 agent |
| ReflectivePrompt (ITMO) | [2508.18870](https://arxiv.org/abs/2508.18870) | 进化算法+反思;BBH +28% |
| ADAS (ICLR 2025) | [2408.08435](https://arxiv.org/abs/2408.08435) | 元 agent 搜索 |
| Dynamic Cheatsheet (Stanford) | [2504.07952](https://arxiv.org/abs/2504.07952) | 测试时自适应记忆;ACE 超越其 +7.6% |
| "What Should the Reflector See?" (2026-09) | [2609.32452](https://arxiv.org/abs/2609.32452) | GEPA 式反思的经验研究;结论:无单一策略主导 |

---

## 附录 A:搜索过程记录

### A.1 第一轮搜索(关键词搜索,2026-10-13)

通过三个并行搜索方向进行:

1. **GEPA 直接竞争者搜索**:搜索引用/对比 GEPA 的论文、2026 年后的 prompt 优化方法、DSPy 生态替代优化器。发现 20 项相关工作,其中 5 项有直接 GEPA 对比数据。
2. **技能/策略优化领域搜索**:搜索 SkillOpt 后继者、ACE 后继者、GitHub 热门新库。发现 30+ 项工作,确认技能文档优化已成为 2026 年最活跃的子领域。
3. **生产级工具搜索**:搜索有真实部署证据的框架和企业采用的优化方案。

### A.2 第二轮搜索(引用追踪,2026-10-13)

针对 GEPA 论文(arXiv:2507.19457)的引用进行全量追踪:

1. **Semantic Scholar 引用搜索**:通过 Semantic Scholar API 获取 GEPA 的全部 525 篇引用论文,分批次处理。发现 50+ 项提出竞争/改进方法的引用论文,其中 14 项有直接 GEPA 对比数据(第一轮仅发现 5 项)。关键新发现:Meta-Harness(279 引用)、NLPG、FLARE、WDA、BudgetAPO 等。
2. **arXiv 和会议论文搜索**:在 arXiv、OpenReview 上搜索提及 GEPA 的论文。发现 14 项新竞争方法(含 RLMOpt、StraTune 等有代码者)和 9 项 GEPA 扩展工作(含 Adaptive-GEPA、MAMuT-GEPA)。
3. **GitHub 生态和 DSPy 社区搜索**:验证 46 个 GitHub 仓库的链接和指标;发现 DSPy 新优化器(ReAnchor, GRPO);发现 GEPA 的 8 个重要 fork/周边工具;确认 10 个已停滞/归档的仓库。

### A.3 数据验证说明

- GitHub 指标(star, fork, 最后更新)通过 GitHub API 直接获取,以搜索时间点为准
- 引用数来自 Semantic Scholar API
- arXiv 链接经过逐一验证(注:CASD arXiv:2609.26261 在 Semantic Scholar 中未索引,该 ID 可能有误)
- 部分较新预印本(2026-09/10)的链接可能在访问时已更新;建议使用前验证

> **覆盖范围**:两轮搜索共覆盖 80+ 项工作,其中 28 项有直接 GEPA 对比数据,14 项有开源代码(GitHub),525 篇引用论文全量分析。
