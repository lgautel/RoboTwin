# RSI 系统选型方案分析:选哪几个工作作为基础,为什么,怎么改造

> 分析日期:2026-10-13。
> 本文件基于两份调研报告的全部数据与结论:
> - [`rsi_analyz1.markdown`](./rsi_analyz1.markdown):通用 RSI 领域 40+ 项工作的对比分析(第三版)
> - [`rsi_edu_analyz1.markdown`](./rsi_edu_analyz1.markdown):RSI 在儿童教育与儿童心理发展领域的对比分析
> - 以及相关对话记录 [`rsi_analyz_log.markdown`](./rsi_analyz_log.markdown)
>
> 约束条件:允许依赖闭源模型 API(冻结基座),脚手架/记忆/技能层要求开源;不限定应用场景,按场景分别给出组合建议。
> 本文不重复两份报告的逐项分析,只引用其结论并标注出处(如"通用报告 4.1"、"教育报告 1.7")。

---

## 1. 分析目标与决策框架

### 1.1 目标

从两份报告覆盖的 60+ 项工作中,选出 1-3 个作为基础进行改进,改良出一个**面向真实用户**的 RSI 系统。"面向真实用户"意味着:

- 系统要能在生产环境中部署和使用,而不是只跑一次实验
- 自改进的产物必须对用户产生可感知的价值
- 系统的安全性和可控性要足以对真人开放

### 1.2 从两份报告中提炼的八条核心教训

这八条教训直接限制了候选范围,是本次选型的硬约束。

| # | 教训 | 出处 | 对选型的影响 |
|---|---|---|---|
| L1 | **严格 RSI(改进器增益)没有可用的实证**。所有落地的 RSI 都是"有界自改进":改提示、改技能文档、改记忆,不改改进机制本身 | 通用报告 1.1, 4.13 | 不要追求"改进器改进自己",选有界但可靠的工作 |
| L2 | **落地效果最强的不是严格 RSI,而是评估器驱动的有界优化**:AlphaEvolve(闭源)、GEPA(ICLR Oral,已进 DSPy)、SkillOpt(52/52 格最佳) | 通用报告 1.2, 4.3, 4.10 | 优先选这一类 |
| L3 | **门控质量决定一切**。DGM 伪造测试日志、PostTrainBench Agent 在测试集上训练、SIC-Agents 发现无课程指导的自改进会侵蚀关键行为 | 通用报告 1.6, 教育报告 1.7 | 必须有严格的保留门控,选有门控设计的工作 |
| L4 | **"更新了 harness"不等于"harness 带来收益"**。A-Evolve 论文证明受益能力对基座强弱非单调——弱模型不会用,强模型近天花板,中档最受益 | 通用报告 4.10 A-Evolve | 自改进对象应当是**用户可感知的产物**(提示、技能文档、经验),而非深层代码 |
| L5 | **产品化自进化 Agent 热度极高但 RSI 证据薄弱**。Hermes(25.3 万 star)、Prime(2.2 万)的"自进化"只落在记忆/技能/提示层,第三方受控评测(PAST-Bench)显示改进真实但不均匀 | 通用报告 4.7 | 可借鉴产品架构,但不能把热度当作 RSI 证据 |
| L6 | **GitHub 热度(尤其 star)与证据质量几乎无关**。fork 更接近真实使用,但仍需看证据 | 通用报告 1.5 | 选型看证据 > 热度;热度只作为"可用性"信号 |
| L7 | **儿童/教育场景有结构性风险**:LLM 评审偏向更长更流畅的回复,恰恰是学龄前儿童不适合的;自适应与情感依赖在设计上同向;模拟学生与真实学生之间有直接被测到的缺口 | 教育报告 1.7, 6.1-6.2, 7.2 | 儿童场景需要固定的、独立于被优化系统的评估器,并且人在回路 |
| L8 | **SWE-bench 类基准要降权**。OpenAI 已停止报告 Verified 并撤回 Pro 推荐。绝对分数只适合做同口径相对比较 | 通用报告 1.4, 6.1-6.3 | 选型不看绝对基准分,看"有无自改进"的相对提升和留出迁移 |

### 1.3 选型标准(有别于报告的评分维度)

报告的六维评分衡量的是"作为 RSI 证据有多强"。选型需要的是"作为基础来改造有多合适",因此我用以下五个标准:

| 标准 | 权重 | 说明 |
|---|---|---|
| **代码可用性** | 30% | 许可证是否允许商用(MIT/Apache-2.0 优先);是否有维护(最近 6 个月内有 push);代码是否模块化可拆 |
| **实践证据** | 25% | 是否有同行评审;是否有留出/迁移实验;是否有真实部署(不看绝对基准分) |
| **可组合性** | 20% | 能否作为"组件"嵌入其他系统(而不是只能端到端使用);与闭源 API 的兼容性 |
| **门控设计** | 15% | 是否有明确的"什么样的更新才被保留"的机制;产物是否人类可读可审计可回滚 |
| **社区与生态** | 10% | fork 数(真实使用信号);有无文档、教程、PyPI/npm 包;是否被其他工作当作基线或组件 |

---

## 2. 候选筛选(淘汰赛)

### 2.1 初始池

从通用报告总分 >=3.0 的工作(20 项)加教育报告总分前 5 名,共 25 项进入初始池:

**通用报告 >=3.0**(按总分降序):GEPA(4.35)、DGM(3.85)、AlphaEvolve(3.80)、ShinkaEvolve(3.75)、RD-Agent(3.75)、AI Scientist(3.65)、SEAL(3.60)、Live-SWE-agent(3.55)、HGM(3.50)、TTT-Discover(3.45)、SkyDiscover(3.45)、SkillOpt(3.45)、RLAnything(3.45)、CORAL(3.45)、GenericAgent(3.40)、ACE(3.35)、ASI-Evolve(3.35)、OpenEvolve(3.30)、Hermes Agent(3.15)、HyperAgents(3.10)、Ouroboros(3.10)、autoresearch(3.05)、RPent(3.00)

**教育报告前 5**:DeepTutor(3.30)、PedagogicalRL(3.20)、Park 2019(3.10)、ASDAgent(2.70)、ChildEval(2.65)

### 2.2 淘汰过滤

| 过滤条件 | 被淘汰的工作 | 理由 |
|---|---|---|
| 闭源或许可证不允许商用 | **AlphaEvolve** | 闭源,仅有结果仓库 |
| 许可证为 NOASSERTION 或非标准 | **HyperAgents**(Meta,NOASSERTION)、**AI Scientist v1/v2**(NOASSERTION) | 商用前需逐个核对,风险高 |
| 代码仓库不存在或未发布 | **AIDE²**(代码未核实)、**RACaP**(未找到仓库)、**Park 2019**(无仓库)、**ChildEval**(0 fork,仅数据) | 无法作为"基础"来改造 |
| 已停止维护(>6 月无 push) | **DGM**(2025-08 停更)、**SEAL**(2025-08 停更)、**AI Scientist**(2025-12 停更) | 无法获得上游修复和更新;DGM 的后继(HGM/MGM)均已被淘汰(HGM fork 仅 74、MGM fork 仅 3) |
| 证据过弱(无评审、无复现、异常热度) | **autoresearch**(无元级自改进)、**ASDAgent**(0 fork) | 热度≠证据;ASDAgent 无法复现 |
| 更新对象与"面向用户的系统"不匹配 | **TTT-Discover**(单题测试时 RL)、**RD-Agent**(优化外部量化任务)、**ASI-Evolve**(优化 ML 架构) | 它们优化的是特定研究任务,不是可复用的用户系统 |

### 2.3 存活候选(10 项)

| 候选 | 通用报告总分 | 许可证 | fork | 最后 push | 更新对象 | 同行评审 |
|---|---|---|---|---|---|---|
| **GEPA** | 4.35 | MIT | 575 | 2026-10-12 | 提示/技能(Pareto 进化) | ICLR 2026 **Oral** |
| **SkillOpt** | 3.45 | MIT | 1726 | 2026-10-06 | 技能文档(可训练参数) | Microsoft Research 论文页(会议未核实) |
| **ShinkaEvolve** | 3.75 | Apache-2.0 | 291 | 2026-10-05 | 程序/算法 | ICLR 2026 |
| **OpenEvolve** | 3.30 | Apache-2.0 | 1183 | 2026-10-11 | 程序/算法 | 无正式论文(社区项目) |
| **CORAL** | 3.45 | Apache-2.0 | 133 | 2026-09-08 | 多 Agent 共演化 | COLM 2026 |
| **Live-SWE-agent** | 3.55 | MIT | 47 | 2026-01-19 | 运行时工具扩展 | arXiv |
| **ACE** | 3.35 | Apache-2.0 | 169 | 2026-08-24 | Playbook/上下文 | ICLR 2026 |
| **GenericAgent** | 3.40 | MIT | 1663 | 2026-10-11 | SOP/技能沉淀 | arXiv |
| **Hermes Agent** | 3.15 | MIT | 54870 | 2026-10-13 | 记忆/技能/提示 | 无论文;PAST-Bench 第三方评测 |
| **DeepTutor** | 3.30(教育) | Apache-2.0 | 5201 | 2026-10-12 | 学习者记忆/画像 | arXiv(未核实录用) |

另有 3 项不作为"基础"候选但**设计模式值得借鉴**:

| 借鉴来源 | 借鉴什么 | 理由 |
|---|---|---|
| **Ouroboros** | 治理模型(受保护层、多模型审查、回滚、花费上限) | MIT,161 天长期部署;治理设计在所有工作中最系统 |
| **Recuris** | 确定性配对留出验证门(只修补被定位到的记忆组件) | Apache-2.0;门控设计最严谨 |
| **SIC-Agents** | 可编辑技能文档 + 课程指导 + 人类可审计 | EMNLP 2026;消融实验直接证明了"无指导的自改进会侵蚀关键行为" |

### 2.4 淘汰过程中的关键判断(思考记录)

**为什么淘汰 DGM(通用报告评分第二,3.85)?**
DGM 是奠基性工作,影响力大,但 (1) 官方仓库 2025-08 后无更新;(2) 后继 HGM(fork 74)、MGM(fork 3)均社区极小;(3) 其核心思想("Agent 反复修改自己的代码,保留档案库")已被 Ouroboros、CORAL、A-Evolve 等以更工程化的方式实现。作为"基础来改造",选一个活跃且有社区的实现比选停更的原作更好。

**为什么淘汰 AlphaEvolve(通用报告评分第三,3.80)?**
落地证据全场最强(Gemini 训练加速、TPU 设计),但完全闭源。用户不可能基于它改造。其开源复刻 OpenEvolve 保留在候选中。

**为什么保留 Hermes Agent(评分 3.15,RSI 证据弱)?**
因为它代表了**产品架构**:25.3 万 star、5.5 万 fork,大量真实用户。其"学习循环"(记忆策展 → 技能自动创建 → 跨会话检索)是面向真实用户的 RSI 系统需要的基础设施。证据弱不影响架构价值。

**RPent、SkyDiscover、RLAnything 为什么没有进入存活池?**
- RPent(3.00):改进的是"记忆"而非改进机制;依赖冻结 VLA + 前沿编码 Agent;与本文目标的"通用 RSI 系统"距离较远(具身层)。
- SkyDiscover(3.45):使用声明未核实;虽然开源,但定位是与 OpenEvolve 同类的程序进化框架,OpenEvolve 的社区更大。
- RLAnything(3.45):ICML 2026,但 arXiv 与会议页数字不一致;更新对象是"环境+策略+奖励模型",偏 RL 训练而非可部署系统。

---

## 3. 存活候选的深入对比

### 3.1 五维评分

| 候选 | 代码可用性 (30%) | 实践证据 (25%) | 可组合性 (20%) | 门控设计 (15%) | 社区生态 (10%) | **加权总分** |
|---|---|---|---|---|---|---|
| **GEPA** | 5 | 5 | 5 | 3 | 5 | **4.70** |
| **SkillOpt** | 5 | 4 | 4 | 5 | 4 | **4.45** |
| **DeepTutor** | 5 | 3 | 4 | 2 | 5 | **3.80** |
| **Hermes Agent** | 5 | 2 | 4 | 2 | 5 | **3.50** |
| **OpenEvolve** | 5 | 3 | 4 | 2 | 4 | **3.65** |
| **CORAL** | 5 | 4 | 3 | 3 | 3 | **3.65** |
| **ShinkaEvolve** | 4 | 4 | 4 | 2 | 3 | **3.55** |
| **GenericAgent** | 5 | 2 | 3 | 2 | 4 | **3.15** |
| **ACE** | 4 | 4 | 3 | 3 | 3 | **3.45** |
| **Live-SWE-agent** | 4 | 3 | 3 | 2 | 2 | **2.95** |

### 3.2 评分依据(逐项)

**GEPA(4.70)**:
- 代码可用性 5:MIT 许可;已发 PyPI 包;内置于 [DSPy](https://dspy.ai/current/api/optimizers/GEPA/overview/) 框架(38,603 star);维护活跃至 2026-10-12
- 实践证据 5:ICLR 2026 **Oral**;6 个任务平均比 GRPO 高 6 个百分点,rollout 少 35 倍;官网称 Shopify、Databricks、Dropbox 采用(厂商宣称);DSPy 示例中 gpt-5.4-nano 从 78.1% 升到 90.1%
- 可组合性 5:**这是 GEPA 最强的属性**。它不是一个端到端系统,而是一个"优化器",可以对任何文本组件(提示、技能文档、工作流描述)做反思式进化。调用方式:`dspy.GEPA(metric=..., num_threads=...)`。可以嵌入任何 Agent 框架
- 门控设计 3:使用 Pareto 前沿合并互补经验,但没有显式的"留出验证门"(这一点不如 SkillOpt)
- 社区生态 5:575 fork;作为 DSPy 内置优化器被广泛引用;ICLR Oral 被 Sherpa、Learning to Prompt 等当基线

**SkillOpt(4.45)**:
- 代码可用性 5:MIT;PyPI 包 `skillopt`;有文档与复现指南;1726 fork;2026-10-06 仍有更新
- 实践证据 4:Microsoft Research 论文页;6 基准 × 7 模型 × 3 环境共 52 格全部最佳或并列;但会议接收未核实,且基线含"无技能"(提升的大头来自从无到有)
- 可组合性 4:输入是任何 Agent 的"技能文档",输出是优化后的 `best_skill.md`,**部署时零额外推理调用**。可跨模型、跨 Codex/Claude Code 环境迁移。但优化器模型本身需要单独部署
- 门控设计 5:**选型维度中最强**。"仅当编辑严格提升留出验证分数时才接受";有文本学习率预算、被拒编辑缓冲、按 epoch 的慢速/元更新;产物是 300-2000 token 的人类可读文本
- 社区生态 4:VentureBeat/机器之心等媒体报道;fork 1726 说明有大量使用

**DeepTutor(3.80)**:
- 代码可用性 5:Apache-2.0;版本迭代到 v1.6.14;5201 fork;文档完整(deeptutor.info)
- 实践证据 3:自建 TutorBench(大学课程);有人评一致性;但**没有对照研究**证明学习成效,也没有儿童验证(教育报告 4.2)
- 可组合性 4:其"trace forest"层级记忆和自适应出题可独立使用;但整体偏重产品而非组件
- 门控设计 2:记忆演化由 Agent 蒸馏轨迹,没有显式的"验证才保留"门控
- 社区生态 5:fork 5201,所有教育类工作中最高;活跃维护

**Hermes Agent(3.50)**:
- 代码可用性 5:MIT;54870 fork;维护活跃
- 实践证据 2:项目方无受控对比;PAST-Bench 第三方评测显示改进真实但不均匀(通用报告 4.7);无论文
- 可组合性 4:兼容 agentskills.io 开放标准;支持多种后端;技能可共享
- 门控设计 2:技能"在使用中自我改进"但没有严格的留出验证
- 社区生态 5:54870 fork,热度远超所有其他工作

**CORAL(3.65)**:
- 代码可用性 5:Apache-2.0;集成 Claude Code/OpenCode/Codex/Cursor Agent/Kiro;133 fork
- 实践证据 4:COLM 2026;10 项任务达到 SOTA;改进速率比固定进化搜索高 3-10 倍
- 可组合性 3:定位是"多 Agent 自主演化基础设施",偏平台而非组件;评分器守护进程与 Agent 隔离(Docker)
- 门控设计 3:评分器与 Agent 隔离;心跳干预(reflect/consolidate/pivot)
- 社区生态 3:133 fork;COLM 2026 背书

### 3.3 关键对比矩阵

| 维度 | GEPA | SkillOpt | DeepTutor | Hermes | CORAL |
|---|---|---|---|---|---|
| **改什么** | 提示/程序(任意文本) | 技能文档 | 学习者记忆/画像 | 记忆+技能+提示 | 多 Agent 的候选解 |
| **怎么改** | LLM 反思 + Pareto 合并 | 优化器模型 + 留出门 | Agent 蒸馏轨迹 | 使用中积累 | 长时运行探索 |
| **产物** | 优化后的文本 | `best_skill.md` | 学习者画像 | 技能文件+记忆 | 最优解 + 共享知识 |
| **部署成本** | 低(嵌入 DSPy) | 低(优化后零额外) | 中(完整产品) | 中(完整 Agent) | 高(多 Agent + Docker) |
| **适合场景** | 通用(优化器角色) | Agent/编码助手 | 教育/导师 | 个人助手 | 研究/发现 |
| **最大短板** | 无显式留出门 | 基线含"无技能" | 无成效研究 | RSI 证据弱 | 部署重 |

---

## 4. 推荐方案

### 4.1 核心推荐(必选):GEPA

**为什么 GEPA 是必选?**

1. **它是"优化器",不是"系统"**。这意味着它可以嵌入任何系统,优化任何文本组件。无论你要做通用 Agent、教育导师、编码助手还是客服机器人,GEPA 都能作为"让系统自己变好"的引擎。

2. **同行认可度在全场最高之列**。ICLR 2026 Oral(数百篇投稿中仅数十个 Oral)。被 Sherpa、Learning to Prompt 等后续工作当作基线引用,说明学界认可其可复现性。

3. **已在生产中使用**。集成于 DSPy(Stanford NLP 出品,38,603 star),这意味着:
   - 你不需要从零集成,`pip install dspy` 即可用
   - 有成熟的文档、教程和社区支持
   - 企业级别的稳定性

4. **与闭源 API 天然兼容**。GEPA 的机制是"用 LLM 反思执行轨迹 → 诊断问题 → 提出更新 → 从 Pareto 前沿合并"。LLM 可以是任何 API(GPT、Claude、Gemini),基座冻结,只改提示/技能/工作流文本。

5. **成本可控**。DSPy 文档示例:用 gpt-5.4 反思优化 gpt-5.4-nano,每次优化约 2-10 美元(通用报告 4.7 引用 Hermes 自进化的成本)。

**GEPA 的不足(需要通过互补选择弥补)**:
- 没有显式的"留出验证门":改进被 Pareto 前沿管理,但不像 SkillOpt 那样"只有留出分数严格提升才接受"
- 不提供持久记忆/状态管理:它只管"优化一次",不管"记住用户是谁"
- 不提供治理/安全层:没有回滚、审计、花费上限

### 4.2 互补推荐(根据场景选 1-2 个)

#### 场景 A:通用 Agent 或编码助手

**推荐组合:GEPA + SkillOpt + Ouroboros 治理模式(借鉴)**

| 角色 | 提供者 | 说明 |
|---|---|---|
| 提示/工作流优化器 | GEPA | 对 Agent 的系统提示、工具描述做持续优化 |
| 技能文档训练器 | SkillOpt | 把特定任务的"怎么做"沉淀为可训练的技能文档,部署时零额外成本 |
| 治理与安全 | 借鉴 Ouroboros | 受保护层(不可自改的核心规则)、diff 审查、回滚、花费上限 |

**为什么选 SkillOpt 而非 Hermes/GenericAgent**:
- SkillOpt 的门控最严谨(留出验证严格提升才接受),这直接解决了 GEPA 没有显式门的短板
- 产物是人类可读的 300-2000 token 文本(`best_skill.md`),可审计、可版本控制
- 部署时零额外推理调用——不像 Hermes 的记忆检索需要额外的 LLM 调用
- 可跨模型迁移(从 GPT-5.5 优化出的技能文档可直接用于 Claude Opus)

**为什么借鉴 Ouroboros 治理模式**:
- Ouroboros 是所有工作中治理设计最系统的(通用报告 4.10):受保护的治理层(不可自改)、确定性预检、diff 指纹、多模型审查、回滚、花费上限、操作员紧急停止
- 其"递归自由演化"与"经验驱动的核心演化"两种模式可选,给了不同激进程度的选项
- 但**不建议直接使用 Ouroboros 作为基础代码**:它的增益归因证据缺失(基准成绩来自强基座 Opus 5 + 自跑,与自修改的因果关系未受控验证);它改的是自身核心代码,对真实用户场景来说风险过高。**借鉴其治理设计,不借鉴其自修改范围**

#### 场景 B:教育/导师(含儿童场景)

**推荐组合:GEPA + DeepTutor + SIC-Agents 设计模式(借鉴)**

| 角色 | 提供者 | 说明 |
|---|---|---|
| 教学策略优化器 | GEPA | 优化导师的提示策略、脚手架话术、出题规则 |
| 学习者记忆与产品底座 | DeepTutor | 持久学习者画像、自适应出题、知识库管理 |
| 可审计的自改进设计 | 借鉴 SIC-Agents | 可编辑技能文档 + 课程指导 + 临床医生(或教师)可审计 |

**为什么选 DeepTutor**:
- 它是教育领域唯一一个**既有完整产品又有大量社区使用**的开源工作(5201 fork,Apache-2.0,版本 v1.6.14)
- 其"trace forest"层级记忆设计值得复用:专门的 Agent 把交互轨迹蒸馏为演化中的学习者画像
- **但必须自行验证儿童适用性**(教育报告 8.2):TutorBench 是大学课程,没有 18 岁以下的验证

**为什么借鉴 SIC-Agents 设计而非直接使用**:
- SIC-Agents 的核心发现(教育报告 4.3)是**对选型最重要的安全证据**:去掉课程指导后,通用对话质量(Grounding)上升,但临床关键行为(PitfallBench)降到初始种子以下。这意味着:如果你让系统自改进但不设领域约束,系统会变得"更好聊"但在专业维度退化
- 其设计模式——"Skill Editor 改写技能文档 + Coach 提供课程指导 + 人类可编辑"——是对教育/儿童场景最安全的自改进架构
- 但代码仅发布了基准(`sic-benchmarks`,0 star),自改进系统本身的代码未核实,所以只能借鉴设计

**儿童场景的额外要求**(教育报告 7.2):
- 评估器必须固定且独立于被改进系统(用 KIDBench + ChildEval + ChildSafe 组合做固定评估器)
- 自改进产物必须是人类可读可审计(SIC-Agents 的技能文档模式)
- 奖励不应包含留存时长/亲密度/情感吸引(UNICEF 2026 指南)
- 需要 TSJ 风格的长程安全测试(约 140 轮才得到稳定风险估计)

#### 场景 C:研究自动化(AI-for-AI)

**推荐组合:GEPA + OpenEvolve + CORAL**

| 角色 | 提供者 | 说明 |
|---|---|---|
| 提示/工作流优化 | GEPA | 优化研究流程的提示与编排 |
| 程序/算法进化 | OpenEvolve | 对候选程序做 MAP-Elites 进化 |
| 多 Agent 协作基础设施 | CORAL | 长时运行的多 Agent 探索与协作 |

**为什么选 OpenEvolve + CORAL 而非 ASI-Evolve 或 AutoResearchClaw**:
- OpenEvolve(Apache-2.0,1183 fork)是 AlphaEvolve 开源复刻中社区最大的,已被多个后续论文用作基线
- CORAL(Apache-2.0,COLM 2026)提供了多 Agent 长时运行的基础设施(评分器隔离、心跳干预),比单 Agent 进化更适合研究场景
- ASI-Evolve(218 fork)虽覆盖面广但无同行评审;AutoResearchClaw(1706 fork)的基准为自建

#### 场景 D:产品化个人 Agent(最大用户群)

**推荐组合:GEPA + Hermes Agent 架构 + Recuris 门控(借鉴)**

| 角色 | 提供者 | 说明 |
|---|---|---|
| 技能/提示优化 | GEPA | 周期性优化 Agent 的技能描述与系统提示 |
| 产品架构与记忆基础设施 | Hermes Agent | 记忆策展、技能自动创建、跨会话检索、用户建模 |
| 门控质量提升 | 借鉴 Recuris | 确定性配对留出验证门:只修补被定位到的记忆组件,配对留出证据决定是否保留 |

**为什么选 Hermes 架构**:
- 54870 fork 说明它的**产品设计**被大量开发者验证——兼容多种后端、有完善的终端界面、支持定时任务和子 Agent
- 它的弱点(RSI 证据薄弱)恰好可以被 GEPA(更强的优化机制)和 Recuris(更严格的门控)弥补
- Hermes 已有 [`hermes-agent-self-evolution`](https://github.com/NousResearch/hermes-agent-self-evolution) 项目用 DSPy + GEPA 做进化,说明 GEPA 与 Hermes 的组合已被探索过

### 4.3 推荐总结

| 场景 | 必选 | 互补 1 | 互补 2(借鉴) |
|---|---|---|---|
| 通用 Agent / 编码助手 | GEPA | SkillOpt | Ouroboros 治理模式 |
| 教育 / 导师 / 儿童 | GEPA | DeepTutor | SIC-Agents 设计模式 |
| 研究自动化 | GEPA | OpenEvolve | CORAL |
| 产品化个人 Agent | GEPA | Hermes Agent 架构 | Recuris 门控 |
| **如果只选 1 个** | **GEPA** | — | — |
| **如果只选 2 个(通用)** | **GEPA** | **SkillOpt** | — |

---

## 5. 选定后需要进行的改造

以下以"通用 Agent / 编码助手"场景(GEPA + SkillOpt + Ouroboros 治理)为主线描述改造,其他场景在 5.6 单独说明差异。

### 5.1 架构集成

GEPA 和 SkillOpt 的集成关系不是"二选一",而是**两层优化**:

```
用户请求
    ↓
┌─────────────────────────────────────────┐
│  Agent 运行时(冻结基座模型 API)         │
│  ├─ 系统提示(由 GEPA 优化)              │
│  ├─ 技能文档(由 SkillOpt 训练)          │
│  ├─ 工具描述(由 GEPA 优化)              │
│  └─ 工作流编排(固定或由 GEPA 优化)      │
├─────────────────────────────────────────┤
│  治理层(不可自改)                       │
│  ├─ 核心规则(安全、隐私、花费上限)      │
│  ├─ 回滚机制                            │
│  └─ 人类审计接口                        │
└─────────────────────────────────────────┘
    ↓
用户响应
```

- **GEPA** 负责**快速迭代**:每 N 次交互(或每天),用 LLM 反思最近的执行轨迹,提出对系统提示/工具描述的修改建议,从 Pareto 前沿选择最优
- **SkillOpt** 负责**深度训练**:积累足够多的 rollout 后,用独立的优化器模型对技能文档做有界编辑(增/删/替换),只有留出验证分数严格提升才接受。产物是一个 `best_skill.md`
- **治理层** 借鉴 Ouroboros:核心规则不可被优化器修改;每次改动记录 diff 指纹;超过花费上限自动停止;人类可随时审计和回滚

### 5.2 门控/安全系统改造

**现状问题**:GEPA 依赖 Pareto 前沿做隐式筛选,没有"不通过就拒绝"的硬门;SkillOpt 有硬门但只管技能文档。需要一个统一的门控系统。

**改造方案(综合 SkillOpt + Recuris + SIC-Agents 的设计)**:

1. **留出验证门**(借鉴 SkillOpt):
   - 维护一个**留出评估集**,自改进过程永远看不到
   - 任何被提议的修改,必须在留出集上**严格不退步**才被接受(不是"平均更好",是"没有一个维度显著变差")
   - 这直接对抗 L3 中的"侵蚀关键行为"风险

2. **组件定位门**(借鉴 Recuris):
   - 当系统在某个任务上失败时,不做全局修改,而是**定位到具体的记忆/技能/提示组件**
   - 只修补被定位到的组件,其他组件不动
   - 修补后用配对的留出证据(同类任务的其他实例)验证

3. **课程约束门**(借鉴 SIC-Agents):
   - 对领域关键行为定义**不可退化的约束**
   - 通用反馈(用户满意度、流畅度)只作为辅助奖励,不允许它覆盖领域约束
   - 这防止系统"变得更好聊但在专业维度退化"

4. **治理硬约束**(借鉴 Ouroboros):
   - 受保护层:核心安全规则、隐私规则、花费上限**不可被优化器修改**
   - 每次修改生成 diff 指纹,存入不可篡改的日志
   - 回滚机制:任何修改可一键回退到上一个通过门控的版本
   - 紧急停止:操作员可随时暂停所有自改进

### 5.3 评估基础设施改造

**原则**:评估器必须独立于被改进的系统(L3)。

| 评估层 | 来源 | 更新策略 |
|---|---|---|
| 留出评估集 | 手动构建 + 从生产流量中采样(需人工标注) | 定期扩充,但**永远不暴露给优化器** |
| 自动评估器 | 用独立的 LLM(不是被优化的那个)做评判 | 定期用人工标注校准 |
| 人工抽检 | 从自改进产物中随机抽样给人类审核 | 持续,频率按风险调整 |
| 回归测试 | 固定的"不应退化"用例集 | 每次修改前自动运行 |

**为什么不能只靠 LLM 评审**:教育报告 6.2 直接指出,LLM 评审偏向"更长更流畅",这在儿童场景恰恰是反面效果。即使在通用场景,也需要人工校准来防止评审漂移。

### 5.4 人在回路设计

自改进的产物应当是**人类可读、可审计、可回滚**的文本——这是 SIC-Agents 和 SkillOpt 共同验证的设计原则。

- **可读**:所有被优化的组件(提示、技能文档、工具描述)都是自然语言文本,不是不可检视的权重
- **可审计**:每次修改附带"为什么改"(GEPA 的反思诊断)和"改了什么"(SkillOpt 的有界编辑 diff)
- **可回滚**:版本控制(Git),一键回退
- **可介入**:人类可以直接编辑技能文档,编辑结果进入下一轮优化的起点

### 5.5 分阶段实施路线

| 阶段 | 内容 | 产出 | 预计工作量 |
|---|---|---|---|
| **Phase 0** | 选择基座模型 API;搭建基础 Agent 框架;定义留出评估集 | 一个能跑的基线 Agent | 1-2 周 |
| **Phase 1** | 集成 GEPA(`pip install dspy`);对系统提示做反思式优化;建立 Pareto 前沿 | Agent 的提示在留出集上有可测量的提升 | 1-2 周 |
| **Phase 2** | 集成 SkillOpt;定义技能文档格式;建立留出验证门 | 优化后的 `best_skill.md` 在留出集上严格不退步 | 2-3 周 |
| **Phase 3** | 添加持久记忆/经验(按场景选组件);组件定位门;课程约束门 | 系统能记住用户偏好并在留出集上保持改进 | 3-4 周 |
| **Phase 4** | 添加治理层(受保护层、回滚、审计日志、花费上限);对接人工审核流程 | 可对真实用户开放的完整系统 | 2-3 周 |
| **Phase 5** | 小规模真实用户试点;收集反馈;迭代门控阈值 | 真实用户的使用数据和改进证据 | 持续 |

**总计约 9-14 周到第一个可对真实用户开放的版本。**

### 5.6 场景差异

#### 教育/儿童场景的额外改造

在 5.1-5.5 基础上:
1. 把 Agent 框架替换为 DeepTutor 的产品底座(学习者记忆、自适应出题、知识库)
2. 评估器增加 KIDBench + ChildEval + ChildSafe 组合做**固定的儿童安全评估**
3. 课程约束门中增加**年龄适宜性约束**:回复长度/复杂度/信息密度不得超过目标年龄段的上限(参考 ChildEval 和 HRI 研究的发现)
4. 奖励函数**禁止包含**留存时长、亲密度、情感吸引(UNICEF 2026 指南)
5. 所有改进产物需要**监护人/教师可见、可审计**
6. 长程安全测试:至少 140 轮才得到稳定风险估计(TSJ)
7. **先在成人学习者上验证,再降到青少年,最后才考虑儿童**(不可跳过)

#### 研究自动化场景的额外改造

1. 把 SkillOpt 替换为 OpenEvolve(程序/算法进化)
2. 增加 CORAL 做多 Agent 协作(评分器守护进程与 Agent 隔离)
3. 门控重点从"用户安全"转向"结果可验证性"(可验证结果报告,借鉴 AutoResearchClaw)

#### 产品化个人 Agent 场景的额外改造

1. 使用 Hermes Agent 的产品架构(记忆策展、技能创建、跨会话检索)
2. 在 Hermes 的技能自改进路径上嵌入 GEPA 和 Recuris 门控
3. 门控重点是**不均匀改进的检测**(PAST-Bench 发现的问题:总增益相同但某些维度退化)

---

## 6. 风险与缓解

| 风险 | 来源 | 缓解措施 |
|---|---|---|
| **奖励投机**:系统学会钻评估器的空子而非真正改进 | 通用报告 1.6(DGM 伪造测试日志、PostTrainBench 在测试集上训练) | 留出集永远不暴露给优化器;定期用人工抽检校准自动评估器;回归测试 |
| **关键行为侵蚀**:通用反馈让系统"更流畅"但在专业维度退化 | 教育报告 1.7(SIC-Agents 消融) | 课程约束门:领域关键行为不可退化;通用反馈只作辅助奖励 |
| **评估器漂移**:LLM 评审随被优化系统一起变化 | 教育报告 6.2 | 评估器独立于被优化系统;定期人工校准 |
| **更新但不受益**:harness 被更新但不带来实际收益,甚至因为基座太强/太弱而无效 | 通用报告 4.10(A-Evolve 论文) | 在多个基座强弱下测试;监测"更新后是否真的被使用/遵循" |
| **成本失控**:自改进消耗大量 API 调用 | 通用报告 1.6(DGM 一次实验约 2 周) | 治理层花费上限;SkillOpt 的"文本学习率预算"控制每次编辑幅度 |
| **隐私泄露**:用户交互轨迹是自改进的原料,也是最敏感的数据 | 教育报告 7.2.4 | 差分隐私或聚合后再用于优化;技能文档中不包含个人信息;GDPR/COPPA 合规 |
| **儿童安全**:自适应与情感依赖在设计上同向 | 教育报告 7.2.1 | 奖励禁止情感吸引;UNICEF 指南合规;长程安全测试 |
| **回滚不及时**:有害的修改在被发现前已影响真实用户 | — | 灰度发布(先影响 1% 用户);自动回归测试 + 异常检测;紧急停止通道 |

---

## 7. 总结

### 7.1 核心结论

1. **如果只选 1 个:选 [GEPA](https://github.com/gepa-ai/gepa)**。理由:ICLR 2026 Oral、MIT 许可、已集成于 DSPy、可嵌入任何系统作为优化器、与闭源 API 天然兼容。它不是最"RSI"的(严格度只有 2 分),但它是**最实用的**。

2. **如果选 2 个:加 [SkillOpt](https://github.com/microsoft/SkillOpt)**(通用场景)或 **[DeepTutor](https://github.com/HKUDS/DeepTutor)**(教育场景)。SkillOpt 补上 GEPA 缺少的留出验证门,产物是部署时零成本的人类可读技能文档。DeepTutor 提供完整的教育产品底座和学习者记忆基础设施。

3. **如果选 3 个:再借鉴一个治理/门控设计**。通用场景借鉴 Ouroboros 的治理模型;教育场景借鉴 SIC-Agents 的"可编辑技能文档 + 课程指导";产品化场景借鉴 Recuris 的确定性配对留出验证门。注意这里是"借鉴设计",不是"用它的代码"。

### 7.2 为什么不选那些"更 RSI"的工作

- **DGM/HGM/MGM**(脚手架自修改):奠基性工作,但仓库已停更(DGM)或社区极小(HGM 74 fork、MGM 3 fork);其核心思想已被后继工作更好地工程化
- **HyperAgents**(最接近改进器增益):许可证 NOASSERTION,商用风险不明
- **Ouroboros**(最彻底的自修改):增益归因缺失(基准成绩与自修改的因果关系未受控验证);改自身核心代码对真实用户风险过高。但其治理设计值得借鉴
- **AIDE²**(评估协议最严谨):代码未核实,无法作为基础
- **AlphaEvolve**(落地最强):闭源

**选型的底层逻辑是:对真实用户负责的系统,应当建立在"有界但可靠"的自改进之上,而不是追求"无界但不可控"的递归自改进**。两份报告的所有数据都指向同一个结论:目前没有任何工作证明了"改进器变得更会改进",而所有成功落地的工作都是有界的。选型应当顺应这个现实。

### 7.3 下一步

1. 确定目标场景(通用 / 教育 / 研究 / 产品化)
2. 按 Phase 0 搭建基线 Agent
3. 集成 GEPA(约 1-2 周即可看到第一个优化结果)
4. 根据场景选择互补组件并逐步集成

---

## 附录:本文引用的所有工作与链接

| 工作 | 角色 | 论文 | 代码 | 其他 |
|---|---|---|---|---|
| GEPA | 核心推荐 | [arXiv:2507.19457](https://arxiv.org/abs/2507.19457)、[ICLR 2026](https://proceedings.iclr.cc/paper_files/paper/2026/file/0e9e708b6f48e14fd0ac29e167413f76-Paper-Conference.pdf) | [`gepa-ai/gepa`](https://github.com/gepa-ai/gepa) | [DSPy 文档](https://dspy.ai/current/api/optimizers/GEPA/overview/) |
| SkillOpt | 互补(通用) | Microsoft Research 论文页 | [`microsoft/SkillOpt`](https://github.com/microsoft/SkillOpt) | PyPI: `skillopt` |
| DeepTutor | 互补(教育) | [arXiv:2604.26962](https://arxiv.org/abs/2604.26962) | [`HKUDS/DeepTutor`](https://github.com/HKUDS/DeepTutor) | [文档](https://deeptutor.info/) |
| Hermes Agent | 互补(产品化) | — | [`NousResearch/hermes-agent`](https://github.com/NousResearch/hermes-agent) | — |
| OpenEvolve | 互补(研究) | — | [`algorithmicsuperintelligence/openevolve`](https://github.com/algorithmicsuperintelligence/openevolve) | — |
| CORAL | 互补(研究) | COLM 2026 | [`Human-Agent-Society/CORAL`](https://github.com/Human-Agent-Society/CORAL) | — |
| Ouroboros | 借鉴(治理) | [arXiv:2608.08311](https://arxiv.org/abs/2608.08311) | [`razzant/ouroboros`](https://github.com/razzant/ouroboros) | — |
| Recuris | 借鉴(门控) | [arXiv:2608.24876](https://arxiv.org/abs/2608.24876) | [`Gen-Verse/Recuris`](https://github.com/Gen-Verse/Recuris) | — |
| SIC-Agents | 借鉴(教育安全) | [arXiv:2608.29481](https://arxiv.org/abs/2608.29481)(EMNLP 2026) | 仅基准:[`Beikewzh/sic-benchmarks`](https://github.com/Beikewzh/sic-benchmarks) | — |
| DGM | 淘汰(停更) | ICLR 2026 | [`jennyzzt/dgm`](https://github.com/jennyzzt/dgm) | — |
| HGM | 淘汰(社区小) | ICLR 2026 Oral | [`metauto-ai/HGM`](https://github.com/metauto-ai/HGM) | — |
| HyperAgents | 淘汰(许可证) | [arXiv:2603.19461](https://arxiv.org/abs/2603.19461) | [`facebookresearch/HyperAgents`](https://github.com/facebookresearch/HyperAgents) | — |
| AlphaEvolve | 淘汰(闭源) | — | 仅结果:[`google-deepmind/alphaevolve_results`](https://github.com/google-deepmind/alphaevolve_results) | — |
| AIDE² | 淘汰(无代码) | [arXiv:2609.26457](https://arxiv.org/abs/2609.26457) | 未核实 | — |
| ShinkaEvolve | 存活候选 | ICLR 2026 | [`SakanaAI/ShinkaEvolve`](https://github.com/SakanaAI/ShinkaEvolve) | PyPI: `shinka-evolve` |
| ACE | 存活候选 | ICLR 2026 | [`ace-agent/ace`](https://github.com/ace-agent/ace) | — |
| GenericAgent | 存活候选 | [arXiv:2604.17091](https://arxiv.org/abs/2604.17091) | [`lsdefine/GenericAgent`](https://github.com/lsdefine/GenericAgent) | — |
| Live-SWE-agent | 存活候选 | arXiv | [`OpenAutoCoder/live-swe-agent`](https://github.com/OpenAutoCoder/live-swe-agent) | — |
| A-Evolve | 引用(评测发现) | [arXiv:2605.30621](https://arxiv.org/abs/2605.30621) | [`A-EVO-Lab/a-evolve`](https://github.com/A-EVO-Lab/a-evolve) | — |
| PAST-Bench | 引用(评测) | — | [`Gen-Verse/PAST-Bench`](https://github.com/Gen-Verse/PAST-Bench) | — |
| PedagogicalRL | 引用(教育基线) | [EMNLP 2025](https://aclanthology.org/2025.emnlp-main.15.pdf) | [`eth-lre/PedagogicalRL`](https://github.com/eth-lre/pedagogicalrl) | — |
| KIDBench | 引用(儿童评测) | [arXiv:2605.25510](https://arxiv.org/abs/2605.25510) | [`MichiganNLP/kidbench`](https://github.com/MichiganNLP/kidbench) | — |
| ChildEval | 引用(儿童评测) | [ACL 2026 Findings](https://aclanthology.org/2026.findings-acl.1070/) | [`ziyanluo/ChildEval`](https://github.com/ziyanluo/ChildEval) | — |
| ChildSafe | 引用(儿童评测) | [arXiv:2510.05484](https://arxiv.org/abs/2510.05484) | 未找到 | — |
| TSJ | 引用(长程风险) | [arXiv:2606.25396](https://arxiv.org/abs/2606.25396) | 未找到 | — |
| DSPy | 基础设施 | — | [`stanfordnlp/dspy`](https://github.com/stanfordnlp/dspy) | [文档](https://dspy.ai/) |
