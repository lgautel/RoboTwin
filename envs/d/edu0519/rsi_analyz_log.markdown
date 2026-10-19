# RSI research analysis report
_Exported on 10/13/2026 at 12:20:33 GMT+8 from Cursor (3.21.16)_

---

**User**

请在网上广泛探索，在 RSI（Recursive Self-Improvement） 领域有些什么较新的，效果比较好的工作。请深入比较分析一下各种工作或论文，要考虑它们在公认benchmark上的分数以及实际应用落地的效果，考虑它们是否受同行认可，也要考虑它们开源的程度和在github上的热度（比如star和fork数量之类的）。然后将分析报告写到 @rsi_analyz1.makrdown 中。

---

**Cursor**

我先看一下工作区的现有文件,并查看可用的搜索工具。

---

**User**

请在网上广泛探索，在 RSI（Recursive Self-Improvement） 领域有些什么较新的，效果比较好的工作。请深入比较分析一下各种工作或论文，要考虑它们在公认benchmark上的分数以及实际应用落地的效果，考虑它们是否受同行认可，也要考虑它们开源的程度和在github上的热度（比如star和fork数量之类的）。然后将分析报告写到 @rsi_analyz1.makrdown 中。注意，忽略工作区中已有的文件和本机中的所有东西，这是一个全新的探索工作。

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

---

**Cursor**

分析报告已经写好,保存在 `/home/luogang/SRC/d/gpt6/rsi_analyz1.makrdown`(约 410 行)。文件名沿用你给的 `makrdown`,没有改成 `markdown`。

报告用的数据来自 arXiv、ICLR、NeurIPS、ICML、Nature、PNAS、厂商官方博客和 GitHub API,GitHub 数据抓取日为 2026-10-13。涉及 19 项工作,每项都写了机制、关键数字、局限、认可度和开源情况。

**主要结论:**

1. **改进机制本身被改进**的实证,只集中在一条线上:DGM、HGM、HyperAgents、MGM 和 AIDE²。它们改的都是固定基座模型之上的 Agent 脚手架,不是模型权重。
2. **落地效果最强的不是严格 RSI**,而是评估器驱动的程序/提示进化:AlphaEvolve(闭源,厂商自报了生产收益)、GEPA(ICLR 2026 Oral,进了 DSPy)、OpenEvolve 和 ShinkaEvolve。
3. **SWE 类基准成绩要降权**。OpenAI 已在 2026-02 停止报告 SWE-bench Verified,又在 2026-07 撤回对 SWE-Bench Pro 的推荐。DGM、HGM、MGM、Live-SWE-agent 的绝对分数只适合做同口径的相对比较。
4. **GitHub 热度和证据质量几乎无关**。`karpathy/autoresearch` 有约 9.8 万 star,但没有元级自改进。DGM 被 ICLR 收录,star 约 2.4 千。NeoHorse 的 star 和 fork 比例异常,Dream-RSI 的代码还没发布。
5. **综合评分**:报告里有一张按 6 个维度加权的主观评分表,权重和依据都写明了。GEPA 最高(4.45 分),其次是 DGM、ShinkaEvolve 和 AlphaEvolve。

**没能核实的内容**(报告第 9 节有完整清单):
- AIDE² 是否有公开代码。
- HyperAgents、MGM、AIDE²、ASI-Evolve、TTT-Discover 是否已被顶会或期刊接收。
- SkyDiscover 称被 Google、Uber 等使用的说法。
- 第三方对各系统的独立复现。

报告里"落地效果"这一项的证据大多是论文或厂商自报,独立复现很少。评分是我的主观判断,依据已在第 4 节逐项给出。

---

**User**

这个 https://rpent.readthedocs.io/en/latest/index.html  不算 RSI 吗？为什么没有它以及和它类似的工作？

---

**Cursor**

算,RPent 属于 RSI 领域的相关工作,但属于**有边界的自进化**,不是严格意义上的递归自我改进。它没出现在报告里,是我调研的疏漏,不是我判断它不算。

**为什么漏了**

我的检索主要围绕软件和 ML 研发类 Agent,几乎没搜过具身/物理方向。我读到社区清单(`awesome-rsi`)里有"Embodied & Physical Self-Improvement"一栏,却没有专门去查。我在报告里把更新对象分成五层,其中没有具身层。

**RPent 算不算 RSI**

我按报告第 2.1 节的三级证据标准来判断。RPent 的第一篇论文是 [Harness VLA](https://arxiv.org/html/2607.08448v3)。我只读了摘要和核心章节。

- **做法**:它把冻结的 VLA(视觉-语言-动作模型)当作可重试的接触操作原语,配一小套固定的解析原语。规划器由 Codex 或 Claude Code 担任,从任务执行轨迹里学习如何编排这些原语,并把轨迹存进任务记忆和全局记忆。
- **改动范围**:VLA 权重不动,原语库固定,论文明确说部署时不允许新增原语。
- **证据层级**:这是"留存增益",记忆随经验积累,在留出的扰动设置上有提升。我没有看到"改进器增益"的证据,也就是改进机制本身被改进的证据。
- **对照**:它和报告里的 ACE 同类,是上下文/记忆层的自改进。项目名里的"Recursive"和文档里"自进化"的表述,我没找到被实验验证的递归证据。

**RPent 的数据**

- **论文自报成绩**:
  - 标准 LIBERO 聚合成功率 96.0%(Claude Code 规划器)。
  - 在 LIBERO-Pro 和 RoboCasa365 上分别比最强相关基线高 38.6 和 25.4 个百分点。
  - RoboTwin C2R 为 58.4%。
- **认可度**:目前只有 arXiv 预印本,我没查到同行评审。
- **GitHub**:`RLinf/RPent` 有 1482 star / 126 fork,Apache-2.0,2026-07-07 创建,2026-10-12 仍在更新。
- **其他**:RPent 的排行榜页面我没抓到具体数字,文档里的结果同样是自报。

**同类的具身自进化工作**

下面这些是搜索摘要加 GitHub 搜索的结果,我没有逐篇精读:

- **RACaP**([arXiv 2609.29394](https://arxiv.science/abs/2609.29394)):在自进化阶段改进策略 API、ReAct 脚手架和经验记忆。LIBERO-90 为 54.4%,零样本 LIBERO-PRO 为 45.0%。它改的东西比 RPent 多,更接近脚手架层的 RSI。
- **ASPIRE**:用执行轨迹修复"代码即策略",并积累技能库。LIBERO-Pro 上报告提升最多 77%。`NVlabs/ASPIRE` 有 271 star / 17 fork。
- **RoboFoundry**:演化上下文系统和分层技能系统,经验证的更新会推广到其他机器人。EmbodiedBench 上把 GPT-5.5 提升了 27.8%。仓库只有 34 star / 1 fork。
- **RoboSkill**([arXiv 2609.37810](https://arxiv.science/abs/2609.37810)):"探索-执行-进化"技能循环。LIBERO-10 首次成功率提升 12.5–25.0 个百分点。
- **RISE**(RSS 2026):在世界模型想象出的环境里做策略自我改进。论坛帖称在 AgileX Piper 机械臂上达到 95%。`OpenDriveLab/RISE` 有 376 star / 24 fork。
- **SEEA-R1**(NeurIPS 2025):用强化微调让具身 Agent 自进化。ALFWorld 文本 85.07%、多模态 46.27%。

大多数具身工作用 LIBERO-Pro 或 EmbodiedBench 做基准,还没有统一的 RSI 评测。

要不要我把这一层补进报告?我会新增"具身/物理层"一节,把 RPent、RACaP、ASPIRE、RoboFoundry、RISE、SEEA-R1 按第 3 节的方法评分,并在摘要里说明这一层的证据状态。

另外,你这条消息里又带了一遍"按计划执行"的指令。那份计划我已经全部做完,3 个待办也都已标记完成,所以没有重复执行。

---

**User**

请把这一层补进报告，新增"具身/物理层"一节,把 RPent、RACaP、ASPIRE、RoboFoundry、RISE、SEEA-R1 按第 3 节的方法评分,并在摘要里说明这一层的证据状态。你的报告之前命名后缀写错了，fix后的报告为 @rsi_analyz1.markdown ，请写到这个报告中。另外，再仔细检查一下，有哪些领域或类型的RSI漏了，也一并整合进去。

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

---

**Cursor**

已按计划把所有改动写进 `/home/luogang/SRC/d/gpt6/rsi_analyz1.markdown`,计划里的八项都做完了。总分用 Python 按原权重重算并重排,表格列数和章节编号也检查过。

**具身/物理层**
- 新增 4.6 节,覆盖你点名的六项和 ENPIRE、RoboCat。每项写了机制、成绩(标明论文自报还是榜单自报)、证据边界、GitHub 数据和判定。
- RPent、ENPIRE、RACaP、ASPIRE、RoboFoundry、RISE、SEEA-R1 都按第 3 节方法评分,总分在 1.70 到 3.10 之间,七项平均约 2.6,低于第一版的程序进化层(3.3 到 3.85)。
- 摘要新增第 8 条,说明这一层的证据状态:
  - 真机闭环只有 ENPIRE 比较完整,它的 99% 是 pass@8,任务自选,环境的复位和验证函数仍要人写。
  - 其余多数只有仿真证据。
  - 全层没有统一的 RSI 基准,也没有第三方复现,整体停在"留存增益"以下。

**新补进的遗漏类型**
- 产品化自进化 Agent(4.7):Hermes Agent 约 25.3 万 star,Prime Agent 约 2.2 万 star,另有 Reef、Letta Code 等。它们的"自进化"都只落在记忆、技能和提示层,没有"有无自改进"的受控对比。
- 补充覆盖(4.8):
  - 脚手架新作:SIA、Meta^n、ModularRSI 等。
  - 模型层自训练。
  - 产业实验室实践:MiniMax M2.7、Anthropic 自动化对齐研究员等。
  - 进化与开放式经典。
  - 架构层的 Nested Learning/HOPE。
  - 安全与失效研究。
- 评分表另外加了 RD-Agent、Hermes Agent、Prime Agent、SIA 四项,共新增 11 项。

**其他改动**
- 2.2 节从五层扩为七层,第 3 节补了具身层和产品化项目的评分适用说明。
- 第 5.1 节 GitHub 表按 star 重新排序,数据来自 2026-10-13 的 `gh api` 快照。
- 第 6 到 9 节同步更新:具身基准警示、更多失败案例、趋势和选型、参考来源。
- 文件头已改成正确文件名;`.makrdown` 只在那条更正说明里出现一次。

**需要你注意的几点**
- RACaP 没找到官方代码仓库,SEEA-R1 的官方实现也无法确认,两处在第 9 节"未核实项"里都标了。
- RPent 的榜单由项目方自己维护,探索任务和评测任务是否严格留出,我没能核实。
- 第一轮检索摘要写的"ASPIRE 在 LIBERO-Pro 上 77%"是误读。77 是相对提升,不是成功率;RPent 榜单里 ASPIRE 的绝对值是 61.36%,报告里已按这个写。
- SIA、HELIX、MetaSkill-Evolve、RRSI 等新作只读到摘要或社区整理,细节没逐篇核实,已逐项标注。

---

**User**

这个 https://github.com/Gen-Verse/RSI-Anything  好像漏掉了，请在仔细检查，广度搜索，看看有没有漏掉类似的工作。然后进行深入对比分析，把它们补充到 @rsi_analyz1.markdown 中。注意，github 热度可能用fork数量比star数量会更准些。

---

**Cursor**

Now the summary section updates.

Now fix the wording on that limitation with the verified source.

Now update the section 5 preamble and add the third-edition scoring rationale.

我已把 `RSI-Anything` 和一批同类遗漏工作补进 `/home/luogang/SRC/d/gpt6/rsi_analyz1.markdown`(报告第三版)。表格列数和标题编号已检查,补入的数字大多回查过原文。仍有一些未核实,下面单列。

## RSI-Anything 为什么之前漏了
- 它的仓库 2026-10-08 才创建,调研时只有 5 天,前两版的检索时间窗和关键词没覆盖到。
- 它背后是同一个团队(Gen-Verse / PHAI Labs)的一整个系列:RLAnything、OpenClaw-RL、PAST-Bench、ScienceBuddy、Recuris。这些我一并补进了新增的 4.9 节。
- 我的判断:它属于“有界留存增益”,还不是“改进器增益”。主要证据点:
  - 代码修复主实验固定了编码器(沿用同团队前作 CURE 的 ReasonFlux-Coder)。
  - “固定世界模型 vs 静态验证器”的配对差是 +2.83 个百分点,95% 区间下界只有 +0.17。
  - 实验室规划相比参考系统只高 0.69 个百分点。
  - 免疫科学的治疗假设,论文自己写明尚待实验检验。
  - 论文自己写明,还需要联合多轮评估才能确立持续的相互改进。

## 广度搜索的新增发现
我用 GitHub 话题和关键词检索,按 fork 降序约 20 轮,再精读高 fork 候选。新增内容放在 4.10 到 4.13 节,按 fork 排序,涵盖约 40 个仓库。其中 14 项做了深入分析并进入评分表,其余只写进 4.10 的“其余值得记录的项目”,不评分。

14 项评分工作的分析和评分依据在 4.10、4.12(PhyAgentOS)和第 5 节,4.13 是横向对比。每项带“论文自报/项目自报”标签:
- SkillOpt(fork 1726)
- AutoResearchClaw(fork 1706)
- GenericAgent(fork 1663)
- Ouroboros(fork 661)
- CORAL
- A-Evolve
- DarwinX/Beagle
- AgentEvolver
- RSIAgent
- OpenClaw-RL
- RLAnything
- PhyAgentOS
- RSI-Anything
- ScienceBuddy

其余记录项里,背景类的 OpenViking、MemOS、loopx、exo 热度很高但与 RSI 关系弱,只在 4.10 记为背景、不评分。

这批新作的共同点是:改进器本身(提出改进的机制)都没被受控地证明变强了,只有 Ouroboros 把自身核心代码纳入被改对象。它们的主要差别在“保留门控”,也就是什么样的更新才允许被保留。

## 按你的建议改用 fork
- 第 3 节和第 5 节的“热度”改为按 fork 分档(≥1000 记 5,300–999 记 4,100–299 记 3,30–99 记 2,<30 记 1),评分表按此重算。
- 档位阈值是我主观设定的,换阈值会改变这一列的分值。
- 12 个旧条目总分因此微调,例如 GEPA 4.45→4.35,具身层的 ENPIRE、ASPIRE、RISE 各降 0.2 左右。
- 5.1 节的 GitHub 表改为按 fork 降序,新增 fork/star 比一列,并说明怎么读这个比值。fork/star 比异常高(如 Ouroboros 45%)的原因我没核实,没有当作“采用度更高”。

## 更正与未核实
- **更正 Hermes**:第二版写“没有受控对比”,这只对项目方成立。PAST-Bench 已有第三方受控评测,结论是改进真实存在但不均匀,所以 Hermes 的基准分从 1 调到 2。
- **RLAnything 数字不一致**:arXiv 摘要和 ICML 海报页给出的 OSWorld、AlfWorld、LiveBench 提升数字不一致,口径未核实,已在报告中标出。
- **未核实项**:SkillClaw、penguin-harness、EvoMap/evolver、AntOmniEvo 等只读到仓库简介,未评分。
- **汇总数字缺失**:OpenClaw-RL 的汇总基准数字和 Recuris 的论文数字我没找到,第 9 节有完整的未核实清单。

---

**User**

请在 @rsi_analyz1.markdown 中补充文档中所引用的工作、代码库、内容的所有相关链接，比如论文链接、github链接、项目主页链接、官方文档链接等等。

---

**Cursor**

我已在 `rsi_analyz1.markdown` 里补上相关链接,做法有两处。表格列数我检查过,没有错位。链接是否都能打开,我没有逐个访问验证。

- **正文内联**:所有 `owner/repo` 形式的仓库名都改成了 GitHub 链接,所有 `arXiv 编号` 改成了 arXiv 摘要页链接,5.1 的 GitHub 热度表也一并加了。
- **附录**:原来的“主要参考来源”换成了“主要参考来源与链接索引”。按第一版、第二版具身层、第二版产品化与遗漏类型、第三版新增四张表,每项列出论文、代码、项目主页或文档,以及模型集合、PyPI、Hugging Face Papers 页等。链接里有这些:
  - RPent 官方文档,以及 ENPIRE、ASPIRE、RISE 的项目页
  - SkillOpt、CORAL、RSIAgent 的项目页
  - Ouroboros 的官网和技术报告页
  - PhyAgentOS 官网、rsi-index.ai、DSPy 文档

有四点要注意:
- **仓库页面给出的 arXiv 编号**:SIA、DarwinX、RSIAgent、RSIGym、Yunjue、MemRL、KnowAct、LightRSI、AccelOpt、EvoMap/evolver 的编号来自仓库 README 或主页,我没逐篇打开核对,表里已标“据仓库 README 所列”。
- **找不到可靠链接的条目**:Anthropic、OpenAI、CNBC、METR 的文章,DeepMind 博客,PNAS 论文,Meta 页面,RoboCat,Nested Learning/HOPE,SICA,CURE、GenEnv 的论文,ThetaEvolve 和 CodeEvolve 的论文,OpenRSI、Dream-RSI、NeoHorse 的论文。这些都明确写了“链接未核实”,我没有编造地址。
- **RACaP**:没找到官方仓库,表里照实写。
- **Recuris**:这次发现它的仓库主页指向 arXiv 2608.24876,所以把正文里之前写的“未找到论文”改成了“有论文,数字未核实”,相关处也同步改了。

---

**User**

请在网上广泛探索， RSI（Recursive Self-Improvement） 在儿童教育领域与儿童心理发展领域有些什么较新的，效果比较好的工作。请深入比较分析一下各种工作或论文，要考虑它们在公认benchmark上的分数以及实际应用落地的效果，考虑它们是否受同行认可，也要考虑它们开源的程度和在github上的热度（比如fork数量之类的）。然后将分析报告写到 @rsi_edu_analyz1.markdown 。注意，文档中所引用的工作、代码库、内容等都要有所有相关链接，比如论文链接、github链接、项目主页链接、官方文档链接等等。

---

**Cursor**

报告已写入 `/home/luogang/SRC/d/gpt6/rsi_edu_analyz1.markdown`,约 530 行,正文和附录共有约 290 个链接。我检查过所有表格的列数,没有表情符号。

**主要结论:儿童教育和儿童心理发展领域几乎没有严格意义上的 RSI(递归自我改进)。** 我没找到任何一项工作证明过"改进机制本身变强了"。严格 RSI 的证据目前只出现在 AI 研究智能体上,例如 [AIDE²](https://arxiv.org/abs/2609.26457)。因此报告收录的是三类工作,并逐项标明严格程度:
- 有自改进回路的:教师-学生模拟强化学习(RL)、可编辑技能文档的自进化、持续更新学习者记忆。
- 面向儿童的有界自适应:按每个孩子学习策略的陪伴机器人、自闭症干预代理。
- 为这类系统提供证据的评测基准、安全审计和对照试验。

**几个主要发现:**
- **结构上最像 RSI 的是 [SIC-Agents](https://arxiv.org/abs/2608.29481)(EMNLP 2026 录用)。** 它用可编辑技能文档做自改进,但服务对象是培训儿科医生,不是儿童。它的消融实验显示,去掉领域课程指导后,自改进会在关键行为上低于初始水平,而对话流畅度反而上升。
- **综合评分最高的三项** 是 [DeepTutor](https://github.com/HKUDS/DeepTutor)、[PedagogicalRL](https://github.com/eth-lre/PedagogicalRL) 和 [Park 2019 情感 RL 读写机器人](https://ojs.aaai.org/index.php/AAAI/article/view/3846)。去掉"RSI 严格度"一项重新归一化后,前三名不变。
- **DeepTutor 热度最高(5,201 fork),但它的基准是大学课程,没有儿童验证。** 儿童和心理方向的专门仓库 fork 全部不超过 1。
- **落地证据最硬的不是自改进系统,而是静态 AI 导师的随机对照试验(RCT)。**
  - Khanmigo 每学年约 0.06–0.08 个标准差(SD)。
  - Gemini 塞拉利昂试验为 +0.258 SD(Google 团队自己做的预注册试验,需要独立复现)。
  - Tutor CoPilot 使掌握率提高 4 个百分点。
- **模拟学生上的成绩要大幅降权。** [Learning to Prompt](https://arxiv.org/abs/2606.20138) 在 359 名真实高中生上做在线 A/B,主要质量指标没有显著差异。
- **"自进化"强的心理咨询工作(PsychAgent、PsyEvo)面向的是成人。** 儿童适用性没有验证。
- **儿童安全方面,** Common Sense Media 测得 AI 玩具有 27% 的输出不适合儿童,剑桥和 UNICEF 也都警告情感依赖风险。报告第 7 节明确说明这一节的权重高于任何基准分数。

评分沿用上一份报告的六维权重(25/20/20/15/10/10),热度按 fork 分档,总分用 Python 计算,评分本身是主观判断。

**需要注意的限制**(完整清单见报告 9.3 节):
- PEARL、CoLearn、SOAR、TSJ、ChildSafe、CogEvo-Edu、Learning to Prompt 没找到官方代码仓库,报告里标"代码未核实",没有编造链接。
- 多数 2026 年 9–10 月的预印本还没有同行评审或独立复现。
- 我没检索中文互联网来源,也没覆盖闭源商业教育产品。

---

**User**

如果我要选择1到3个 RSI 相关的工作作为基础进行改进，改良出一个 RSI 系统用于有真实用户的场景，请问我应该选哪几个，为什么？选择之后还要进行什么样的改造？请把你的分析思考的过程与结果写到 @rsi_solu1.markdown 中。

---

**Cursor**

**确定 RSI 方案的目标场景**

> **这个面向真实用户的 RSI 系统打算用在什么场景?不同场景下基础工作的选择差别很大。**
> - 通用 Agent 或编码助手(企业或开发者用户),以通用 RSI 报告 rsi_analyz1.markdown 为主要依据
> - 儿童教育或儿童心理场景,以 rsi_edu_analyz1.markdown 为主要依据
> - 两者都要写:先给通用方案,再给儿童教育场景的适配版本
> - 其他具体场景(请在 Other 中说明)

> **对基础工作有什么硬性约束?**
> - 只选开源、许可证宽松、可自托管的工作
> - 可以依赖闭源前沿模型 API(冻结基座),只要求脚手架、记忆、技能层开源
> - 没有硬性约束,按证据强弱选

