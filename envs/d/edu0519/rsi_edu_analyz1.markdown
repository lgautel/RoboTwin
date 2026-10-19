# RSI(递归自我改进)在儿童教育与儿童心理发展领域的近期工作对比分析报告

> 调研日期:2026-10-13。数据来源:arXiv / ACL Anthology / ACM DL / AAAI / Springer / NBER 等论文页面,厂商与机构官方页面(Google LearnLM、Common Sense Media、剑桥大学、UNICEF、欧洲议会研究服务部),以及 GitHub API(star、fork、license、创建与最近 push 时间)。
> 本报告是 [`rsi_analyz1.markdown`](./rsi_analyz1.markdown)(通用 RSI 报告)的**领域专题**,沿用其三级证据标准、六维评分与"以 fork 为主"的热度口径;不依赖也不修改该文件的结论。
> 本文件为 `rsi_edu_analyz1.markdown`,第一版。

---

## 0. 阅读指南

- **先说结论的性质**:"RSI"在儿童教育与儿童心理发展领域**几乎没有严格意义上的实证**。本报告收录的是三类工作:(1) 有明确"自改进回路"的工作(自进化技能文档、教师-学生模拟 RL、持续学习者记忆等);(2) 面向儿童/学习者的"有界自适应"工作(按个体更新策略的机器人、陪伴与干预代理);(3) 为这类系统提供评测与安全证据的基准与实地研究。严格程度在每一条里单独标注,不会把"个性化"直接写成"RSI"。
- **GitHub 数据**统一抓取于 2026-10-13。热度以 **fork 数为主**,star 与 fork/star 比只作辅助(定义见第 3 节)。多数儿童/心理方向的新仓库创建时间很短、本身就没有多少关注,**低 fork 不等于低质量**,只意味着社区采用度未被验证。
- **证据来源分三类**,文中均有标注:
  - 【论文自报】作者自己在论文里报告的结果;
  - 【厂商自报】公司或其研究团队官方文档/报告给出的结果;
  - 【独立/第三方】独立研究团队的随机对照试验(RCT)、独立审计或第三方复现。本领域的 RCT 多数**不属于 RSI 系统**,只作为"落地效果的参照系"使用(见 5.4)。
- 凡我没能核实的内容,明确写"未核实",不做推断。全部未核实项集中列在第 9.3 节。
- 第 5 节的 1-5 分评分为**我的主观判断**,依据与权重公开,读者可自行调整。
- 每一个被引用的工作都附有论文、代码、项目主页或官方文档链接;汇总见附录 A。链接均来自本次实际检索到的页面;未找到的写"未找到/未核实",不编造。
- 本报告涉及儿童。第 7 节单独讨论儿童特有的安全与伦理风险,其结论的权重**高于**任何一项基准分数。

---

## 1. 摘要与核心结论

1. **严格 RSI(改进机制本身被改进)在本领域没有实证。** 迄今能找到的严格 RSI 证据仍出现在"AI 研究智能体"上,例如 [AIDE²](https://arxiv.org/abs/2609.26457)(对自己的研究 Agent 代码做递归改写,在 4 个留出基准上追平或超过人工设计的生产级研究 Agent);它们改进的对象是研究效率,与儿童教育无关。儿童教育与儿童心理发展方向上,没有任何一项工作证明了**改进器增益**,绝大多数只到"任务增益"或"有界留存增益"。
2. **本领域最接近"自改进回路"的工作有五条线**,按证据强度从高到低:
   - **教师-学生模拟 RL(训练期自改进)**:[PedagogicalRL / TutorRL](https://github.com/eth-lre/PedagogicalRL)(EMNLP 2025 主会)、[Sherpa](https://arxiv.org/abs/2610.08778)、[PEARL](https://arxiv.org/abs/2605.29582)、[StudentSim](https://arxiv.org/abs/2609.01591)。有公认或半公认基准([MathTutorBench](https://arxiv.org/abs/2502.18940),EMNLP 2025 Oral),但**训练与评测几乎都在模拟学生上**,没有真实儿童的学习成效数据。
   - **持续的学习者记忆/画像演化**:[DeepTutor](https://arxiv.org/abs/2604.26962)、[CoLearn](https://arxiv.org/abs/2609.21154)、[CogEvo-Edu](https://arxiv.org/abs/2512.00331)。属于"个体级自适应",不修改导师策略本身。
   - **自进化的可编辑技能文档**:[SIC-Agents](https://arxiv.org/abs/2608.29481)(EMNLP 2026 录用,儿科严重疾病沟通训练中的"家长"模拟器)是本领域**结构上最像 RSI 的一项**:Skill Editor 反复改写技能文档,并有"去掉课程指导就发生漂移"的消融。但服务对象是临床医生的培训,不是儿童。
   - **按个体学习策略的陪伴机器人**:[Park 等 AAAI 2019](https://ojs.aaai.org/index.php/AAAI/article/view/3846)(67 名 4–6 岁儿童、三个月学校部署)是**真实儿童纵向证据最强**的"每个孩子一个在线学习策略"工作,但发表于 2019 年、不是 LLM 方法。
   - **在线 A/B 的真实学生适配**:[Learning to Prompt](https://arxiv.org/abs/2606.20138)(荷兰高中生 359 人、656 段对话)是少数在生产平台上做过真实学生在线适配的工作,**主要质量指标没有显著提升**(0.565 对 0.569,p=0.635),结论诚实但偏负面。
3. **落地效果最硬的证据不来自 RSI 系统,而来自"静态 AI 导师"的 RCT**:[Khanmigo 两年整群随机试验](https://www.nber.org/papers/w35620)(18 所田纳西中学)每学年仅 0.06–0.08 个标准差(完整参与折算 0.14 SD),与不带 AI 的 Khan Academy 练习相近,瓶颈是学生很少使用;[Gemini Guided Learning 塞拉利昂试验](https://storage.googleapis.com/deepmind-media/LearnLM/learnLM_sierraleone_may26.pdf)(1,763 名初中生、48 个班)意向性分析 +0.258 SD;[Tutor CoPilot](https://arxiv.org/abs/2410.03017) 使掌握率提高 4 个百分点。这些效应值是评价任何"自改进导师"时必须对照的天花板与参照线:自改进尚未被证明能把它们再显著抬高。
4. **热度与证据几乎无关,且热度集中在非儿童的"基础设施"上**:[`HKUDS/DeepTutor`](https://github.com/HKUDS/DeepTutor)(41,223 star / 5,201 fork)是本领域 fork 最高的"自适应导师"工作,但它的基准 TutorBench 是**大学课程**,没有儿童成效数据;[`JushBJJ/Mr.-Ranedeer-AI-Tutor`](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor)(29,556 star / 3,257 fork)只是提示词模板,与自改进无关,却是 fork 最高的"AI 导师"仓库之一。**儿童/心理方向的专门工作(KIDBench、ChildEval、ASDAgent、KidMind、SIC-Agents 等)fork 全部 ≤1**,社区采用度基本未被验证。
5. **心理发展方向的"自进化"强工作是成人咨询,不是儿童**:[PsychAgent](https://arxiv.org/abs/2604.00931)(经验驱动终身学习的咨询师,技能演化 + 拒绝采样微调)、[PsyEvo](https://arxiv.org/abs/2610.02885)(测试时按来访者自进化)、[PsychEval](https://arxiv.org/abs/2601.01802)(多会话多疗法基准)在 PsychEval 上有明确提升,但**对儿童/青少年的适用性没有验证**(来访者年龄分布未核实)。真正面向儿童心理健康的 [KidMind](https://github.com/wtiantianw/KidMind)(KidGPT 在 KidBen 上超过 20 个 LLM 基线 23.39%,自报)是 SFT 路线,没有自改进回路。
6. **儿童发展方向最成熟的是"评测与风险测量",而不是自改进**:[KIDBench](https://arxiv.org/abs/2605.25510)(7–11 岁)、[ChildSafe](https://arxiv.org/abs/2510.05484)(6–17 岁四阶段模拟儿童代理)、[ChildEval](https://aclanthology.org/2026.findings-acl.1070/)(3–6 岁,29K 画像,ACL 2026 Findings)、[ChildAgentEval](https://arxiv.org/abs/2605.17894)(WISC 启发的认知年龄对齐)、[TSJ](https://arxiv.org/abs/2606.25396)(长程陪伴风险,12,960 个模拟人日)。它们共同指出:LLM 的默认回答对学龄前儿童**过长、过复杂、信息密度过高**;"给模型一个年龄提示"只能带来有限改善;短会话测试会低估长期风险(TSJ 需约 140 轮才得到稳定风险估计)。
7. **自改进在儿童场景里有一个值得警惕的发现**:SIC-Agents 的消融表明,**没有领域课程指导的自改进会在"临床上最关键的触发回合行为"上低于初始种子**,而通用对话质量(grounding)仍在上升——也就是说,通用反馈能让系统"变得更流畅"却同时侵蚀关键行为。这与通用 RSI 报告中的奖励篡改、评估器被钻空子是同一类风险,在儿童场景里后果更重。
8. **基准有效性要大幅降权**:多数"教育/儿童"基准的评分依赖 LLM 评审(LLM-as-a-Judge)和模拟学生/模拟儿童;ChildSafe 自己明确说它不能替代对真实儿童的研究;模拟学生与真实学生之间的差距(sim-to-real)在 Learning to Prompt 里已被直接观察到(模拟中显著、在线上多数不显著)。同行评审方面,只有 PedagogicalRL、MathTutorBench(EMNLP 2025)、ChildEval(ACL 2026 Findings)、ASDAgent(ACL 2026 主会)、SIC-Agents(EMNLP 2026 录用)、KidMind(Knowledge-Based Systems 期刊)、Park 2019(AAAI)等有正式录用证据。
9. **儿童方向的监管与审计证据在 2026 年明显增强**,且普遍指向"不要为了个性化而做情感依赖":Common Sense Media 对 AI 玩具的测试发现 **27% 的输出不适合儿童**,建议 5 岁以下不使用;剑桥大学对 3–5 岁儿童的观察发现玩具会误读情绪、无法参与假装游戏;UNICEF 的 2025 版指南与 2026 年 6 月企业建议明确主张"不应有意设计成让儿童产生情感依赖"。**任何以"持续个性化、情感自适应"为卖点的自进化陪伴系统,都必须先过这一关**(第 7 节)。
10. **选型建议(详见第 8 节)**:研究训练型导师看 PedagogicalRL + MathTutorBench(开放、被后续工作当作基线);做持久学习者模型看 DeepTutor(最成熟的开源工程,但先自行验证儿童适用性);做儿童安全评测看 KIDBench + ChildEval + ChildSafe 组合;做自改进的临床/治疗类模拟看 SIC-Agents 的"可编辑技能文档 + 课程指导"设计;**任何面向真实儿童的自进化功能都应先在"人在回路 + 可回滚 + 固定评估"下做小规模试点,而不是直接上线**。

---

## 2. 范围、定义与分类框架

### 2.1 本报告里"RSI"指什么

通用 RSI 报告(见 [`rsi_analyz1.markdown`](./rsi_analyz1.markdown))把 RSI 定义为"系统改进自身,且改进的机制本身也在被改进"。在儿童教育与儿童心理发展场景里,这个定义几乎没有对应物,所以本报告采用**收录标准**而不是严格定义:

| 收录类别 | 说明 | 严格度上限 |
|---|---|---|
| A. 自进化的技能/提示/记忆 | 系统用自己的交互轨迹改写技能文档、提示或记忆,并有留出评测 | 留存增益(有界) |
| B. 教师-学生模拟 RL | 导师策略在模拟学生上训练,或学生模拟器被训练来给导师当奖励 | 训练期自改进,未证改进器增益 |
| C. 个体级在线适配 | 对每个学习者维护模型/策略并随会话更新(BKT 变体、affective RL、HMM 课程排序等) | 个体适配,不改系统本身 |
| D. 自生成课程/内容 | 教师模型按学生进步生成训练题(SOAR 一类);对象多为模型"学生" | 方法邻接 |
| E. 评测与风险测量 | 儿童/发展心理基准、长程陪伴风险模拟 | 无自改进(但是证据基础设施) |
| F. 落地对照 | 非 RSI 的 RCT / 实地研究,用作效果参照 | 不评 RSI |

**三级证据标准**沿用通用报告:任务增益(分数更高但无持久修改)/ 留存增益(持久修改在留出任务上提升未来表现)/ 改进器增益(被修改的是产生改进的机制本身,且受控对比里新机制能产生更有效的后续改进)。**仅"结构上自指"或"个性化"不等于改进器变强了**。

### 2.2 年龄口径:并非所有"教育工作"都是面向儿童的

收录的教育类工作面向的学习者年龄差异很大,这是读数时最容易被忽略的一点:

| 年龄/学段口径 | 代表工作 | 说明 |
|---|---|---|
| 3–6 岁(学龄前) | ChildEval、Park 2019(4–6 岁)、Gordon 2016(3–5 岁)、剑桥 AI 玩具研究(3–5 岁)、ASD 干预方案(3–8 岁) | 儿童证据最直接,但 LLM 自改进几乎空白 |
| 6–12 岁(小学) | KIDBench(7–11 岁)、de Droog 2026(9–12 岁机器人数学导师)、对话式阅读 RCT(5–8 岁) | 评测与实验多,自改进少 |
| 12–18 岁(初高中) | Learning to Prompt(荷兰高中生)、Khanmigo(初中)、Gemini Guided Learning(初中 7–8 年级)、ChildSafe(最高 17 岁) | 真实学生在线证据主要集中在这一段 |
| 大学/成人 | DeepTutor(TutorBench 为大学课程)、CogEvo-Edu(大学 DSP 课程)、PsychAgent / PsyEvo / PsychEval(成人咨询)、Tutor MCP | **热度最高的几项都在这里**,不能直接外推到儿童 |
| 年龄未限定/未核实 | PedagogicalRL(Big-Math 题目)、Sherpa(MATH)、PEARL(GSM8K / MATH-500)、StudentSim(国际象棋、二语写作、数学)、CoLearn(生物/化学课程) | 数学/推理题目偏中学以上;"学习者年龄"多为模拟,未核实 |
| 临床人员(服务儿童) | SIC-Agents(培训儿科医生,模拟"家长") | 领域是儿科,面向对象是医护 |

**使用规则**:总分表(5.1)里"相关度"一列把"直接"定义为面向 18 岁以下人群且有儿童/青少年数据或明确的年龄定位;"邻接"定义为教育/心理场景相同但学习者年龄未限定、为成人,或服务对象是为儿童服务的专业人员。

### 2.3 按"更新对象"的分层

| 层 | 更新对象 | 代表工作 | 当前证据级别 |
|---|---|---|---|
| 导师策略(权重)层 | 导师 LLM 参数 | PedagogicalRL、Sherpa、PEARL | 任务增益/训练期自改进;模拟学生为主 |
| 学生模拟器层 | 作为奖励来源的学生模型 | StudentSim、PEARL 的可控学生模拟器 | 方法层;未证对真实学生有效 |
| 学习者记忆/画像层 | 每个学习者的掌握度、误区、偏好 | DeepTutor、CoLearn、CogEvo-Edu、Tutor MCP | 个体适配;LLM 评审或模拟 |
| 提示/技能文档层 | 可编辑的技能文档、提示路由 | SIC-Agents、Learning to Prompt | 有界留存增益;仅 Learning to Prompt 有真实学生在线数据 |
| 个体策略层(非 LLM) | 每个孩子一个强化学习/HMM 策略 | Park 2019、Gordon 2016、HMM 个性化(THRI 2018) | 真实儿童纵向证据,但年代较早 |
| 咨询/干预技能层 | 咨询技能树、ABA 策略 | PsychAgent、PsyEvo、ASDAgent | 成人/临床对话为主,儿童适用性未证 |
| 评测与风险测量层 | 基准、模拟儿童/模拟用户 | KIDBench、ChildSafe、ChildEval、ChildAgentEval、TSJ、KidBen | 无自改进;是后续验证的基础设施 |

---

## 3. 评价方法

| 维度 | 权重 | 评分依据(本领域适配) |
|---|---|---|
| 基准成绩 | 25% | 是否在公认或半公认基准上有可对比的提升;基准是否独立于作者(MathTutorBench 等优于自建基准);是否有留出集、多种子、人评;**只在模拟学生/LLM 评审下的成绩最高给 3-4 分**;只有自建基准且无人评 ≤2 分 |
| 落地效果 | 20% | 5 = 有 RCT 或大规模真实部署且报告了儿童/学生成效;4 = 有真实学生的在线/学校部署;3 = 有小规模儿童用户研究或大规模使用但无成效证据;2 = 仅专家/临床人员试用或真实临床对话数据;1 = 仅模拟 |
| 同行认可 | 20% | 5 = 顶会/顶刊主会且被后续工作作基线;4 = 主会/Findings/专业期刊;3 = 专业会议 demo 或次级期刊;2 = arXiv 预印本(含背书机构);1 = 博客/未评审 |
| 开源程度 | 15% | 5 = 代码 + 数据 + 权重 + 宽松许可 + 文档 + 活跃维护;4 = 代码与数据开放;3 = 代码部分开放或不完整;2 = 仅基准开放或有声明无仓库;1 = 无 |
| GitHub 热度 | 10% | 沿用通用报告:**按 fork 分档**,≥1000 记 5;300–999 记 4;100–299 记 3;30–99 记 2;<30 或无仓库记 1。star 与 fork/star 比只作辅助,不改分。fork/star 比仅在 star ≥30 时展示(小样本比值无意义) |
| RSI 严格度 | 10% | 5 = 有改进器增益的受控证据;4 = 对自身技能/提示/策略做闭环修改,且有留出增益;3 = 个体在线适配或模拟学生上的 RL 训练;2 = 静态个性化或推理期自我修正;1 = 无自改进(基准、评测、SFT) |

总分 = 各项(1-5 分)加权平均,满分 5。**评价方向要先说清**:本表衡量的是"在该领域作为 RSI 相关证据有多强",而不是"哪个工作最好"。纯评测类工作在"RSI 严格度"上按设计只能得 1 分,所以总分偏低,不代表它们价值低——它们是后续验证的地基。**稳健性检查**:去掉"严格度"维度并重新归一化后,前三名(DeepTutor、PedagogicalRL、Park 2019)不变;总分相差 ≤0.3 的条目不应被视为有可靠差异。

**"较新"的口径**:主体为 2025-05 至 2026-10 的工作。Park 2019、Gordon 2016、THRI 2018 属于**历史锚点**(因为它们仍是真实儿童纵向证据最强的"个体策略学习"工作),已在正文标注年份。

---

## 4. 逐项深度分析

### 4.1 教师-学生模拟 RL:训练期自改进(导师策略层)

#### PedagogicalRL / TutorRL(ETH Zürich)
- **机制**:在模拟课堂里用多轮 GRPO 训练导师(Qwen2.5-7B-Instruct);奖励来自**对话后学生的解题成功率**,并惩罚泄露答案和低质量教学行为;用可调权重 λ 在"教学性"与"学生正确率"之间描出帕累托前沿;学生为冻结的 LLM,只更新导师。
- **成绩【论文自报】**:无人工标注训练出的 7B 导师达到与 LearnLM 一类较大闭源模型相近的水平;在域外基准 MathTutorBench 上,RL 对齐模型的教学质量匹配或超过基线;SFT 在"错误定位/错误纠正"任务上仍是强基线,作者指出需要把 SFT 与 RL 结合;RL 模型比单轮 SFT 更好地保留 GSM8K / MATH500 上的推理能力。
- **认可度**:EMNLP 2025 主会([ACL Anthology](https://aclanthology.org/2025.emnlp-main.15.pdf)),并被 Sherpa、Learning to Prompt 当作基线引用(后两者自己的论文中可核对)。
- **开源**:代码 [`eth-lre/PedagogicalRL`](https://github.com/eth-lre/pedagogicalrl)(51 star / 13 fork,无许可证声明,最后 push 2025-12-11);模型 [`eth-nlped/TutorRL-7B`](https://huggingface.co/eth-nlped/TutorRL-7B);arXiv:[2505.15607](https://arxiv.org/abs/2505.15607)。
- **局限**:学生是 LLM 模拟;题目为数学题;**没有任何真实学生的学习成效数据**。属于"训练期自改进",没有证据表明其改进回路本身变得更会改进。

#### MathTutorBench(本领域最接近"公认基准"的评测)
- **内容**:3 大教师能力、7 个任务、1.5B 的教学质量奖励模型(用于给开放式脚手架回复打分),与教师真值对比。作者发现"解题能力不等于教学能力",二者存在权衡,且对话越长越难。
- **认可度**:EMNLP 2025 **Oral**([ACL Anthology](https://aclanthology.org/2025.emnlp-main.11/));PEARL、Sherpa、PedagogicalRL 都用它。
- **开源**:[`eth-lre/mathtutorbench`](https://github.com/eth-lre/mathtutorbench)(43 star / 14 fork,CC BY 4.0,2026-08-27 仍有更新);[项目页与榜单](https://eth-lre.github.io/mathtutorbench/);arXiv:[2502.18940](https://arxiv.org/abs/2502.18940)。
- **局限(作者自述)**:它衡量的是教学能力的代理指标,并**不衡量真实的学习增益**;奖励模型本身是学习得到的评分器。

#### Sherpa(Stanford / Georgia Tech / CMU)
- **机制**:用多种"学生原型"(按不同学习偏好条件化的 LLM)训练教师,奖励为学生**辅导后测试成绩的提升**;加一个"策略门控"使教学策略必须匹配学生偏好才会被学生接受。教师 Qwen3-8B,学生 Qwen3-1.7B,题目为 MATH。
- **成绩【论文自报】**:所有学生原型平均提升 20.5 个百分点(含训练未见原型);MathTutorBench 教学总分 52.5% → 79.2%,并在四个教学指标上超过 PedagogicalRL;人评中训练后的教师在 79.6% 的两两比较中被偏好。
- **认可度**:arXiv(2610.08778,2026-10-06),作者为 Stanford 的 Diyi Yang 团队等;尚无录用证据(调研时仅一周)。
- **开源**:[`SALT-NLP/Sherpa`](https://github.com/SALT-NLP/Sherpa)(8 star / 1 fork,Apache-2.0,创建于 2026-09-30);论文:[arXiv](https://arxiv.org/abs/2610.08778),[PDF](https://hzxczar.github.io/assets/papers/sherpa.pdf)。
- **局限**:学生是 1.7B 小模型,"学习"是否类比儿童未经验证;作者自己写明目标是"paving the road towards AI tutors teaching real students"(即尚未涉及真实学生)。

#### PEARL(Pedagogically Aligned RL)
- **机制**:(1) 可控学生模拟器(显式追踪先修关系网络上的掌握度、五维认知画像,并把行为意图预测与回复生成解耦);(2) 覆盖正确性、教学过程与情感支持的教学奖励模型;(3) 多目标 RL(奖励离散化、优势聚合、轮数惩罚)。基座 Qwen3-30B-A3B。
- **成绩【论文自报】**:外部评估器平均分 84.2(基座 69.1),其中 Leak 41.1 → 76.5、Meta 37.0 → 82.6;教师盲评偏好率 66.47%–83.31%(对基座与两个教学专用系统);**仍落后于 GPT-5.1 和 Gemini-3-Flash**;PEARL 奖励模型与人类判断一致率 82.0%。
- **认可度**:arXiv(2605.29582,v2 于 2026-09-01);同行评审状态未核实。
- **开源**:论文提到提示词与设置"可在代码中找到",**但我没找到官方仓库链接**,标"代码未核实"。论文:[arXiv 摘要](https://arxiv.org/abs/2605.29582)、[HTML v2](https://arxiv.org/html/2605.29582v2)。

#### StudentSim(Microsoft)
- **机制**:先在多个学生上联合预训练,再对每个学生做个体化特化,得到既能复现该学生回答、又能在导师指导下更新回答的模拟器;配套协议 StudentSimEval(60 名学生,覆盖国际象棋、二语英语写作、数学,使用公开去标识学习者数据集)。
- **成绩【论文自报】**:在三个领域上行为保真度(F)与指导响应度(R)均超过 GPT-5.4;国际象棋 F=0.51、R=0.91,对比 GPT-5.4 的 0.23/0.72 和 Maia2 的 0.45/0.27;作为导师 RL 的奖励模型,训练出的国际象棋导师被专家评为"更准确、更有引导、更个性化"。作者明确"不是最佳导师的主张"。
- **开源**:[`microsoft/StudentSim`](https://github.com/microsoft/StudentSim)(58 star / 7 fork,MIT,创建于 2026-05-28);[arXiv](https://arxiv.org/abs/2609.01591)、[HTML](https://arxiv.org/html/2609.01591)。
- **局限**:学习者年龄未核实;国际象棋有 Stockfish 提供独立验证信号,迁移到自由文本领域需要新的奖励函数(作者自述)。

#### SOAR(Meta FAIR 等;方法邻接,非教育应用)
- **机制**:"教师"模型为"学生"模型生成合成问题,教师奖励 = 学生在困难子集上的**可测量进步**(而非内在可学性代理),即双层元 RL;研究对象是模型自己的学习平台期。
- **成绩【论文自报】**:在 MATH、HARP 的困难子集(初始 0/128 成功)上,MATH 的 pass@1 提升约 4 倍、pass@32 约 2 倍;自生成问题可迁移到未被优化的数据集;结论是"问题的结构与良定性比解答正确性更重要"。
- **与本领域的关系**:这是本报告里**结构上最接近 RSI 的"教师-学生"循环**(教师的改进信号来自学生的真实进步),但"学生"是 LLM 而不是儿童,**不能当作儿童教育证据**,仅作方法参考。
- **开源/认可度**:论文 [arXiv:2601.18778](https://arxiv.org/abs/2601.18778);未找到官方代码仓库(论文只引用 `huggingface/math-verify`),标"代码未核实";同行评审状态未核实。

### 4.2 学习者记忆与画像演化(个体适配层)

#### DeepTutor(香港大学数据智能实验室 HKUDS)
- **机制**:引导式问题辅导 + 难度校准出题;混合个性化引擎把静态知识库与**动态学习者记忆**耦合;"trace forest"层级记忆由专门 Agent 把交互轨迹蒸馏为演化中的学习者画像,形成闭环。还扩展到自适应学习流、交互式书籍、主动式多渠道导师。
- **成绩【论文自报】**:自建 TutorBench(30 个知识库、五大学科、90 个学生画像、270 个任务,**均为大学课程材料**)上个性化指标平均提升 10.8%;作为解题器在五个骨干模型上平均提升 29.4%;有人评一致性与消融。LLM 评审 + 学生模拟器是评测核心。
- **落地**:项目本身是**高活跃度的开源产品**(版本迭代到 v1.6.14,2026-10-08;v1.6.3 加入学习者/监护人账户),但**没有任何学习成效的对照研究**,也没有面向儿童的验证。
- **认可度**:arXiv(2604.26962),未找到录用证据(未核实);GitHub 上被 Trendshift 等趋势榜单收录。
- **开源/热度**:[`HKUDS/DeepTutor`](https://github.com/HKUDS/DeepTutor)——41,223 star / **5,201 fork**,Apache-2.0,创建于 2025-12-28,最后 push 2026-10-12;fork/star 12.6%(正常区间);[官方文档](https://deeptutor.info/);论文 [arXiv](https://arxiv.org/abs/2604.26962)、[HTML v3](https://arxiv.org/html/2604.26962v3)。
- **评价**:本领域**社区采用度最高**的"自适应导师"项目,开放程度最好;但"RSI 严格度"只到个体记忆演化(3 分),且对 18 岁以下人群完全未验证。

#### CoLearn(伦敦国王学院)
- **机制**:持久学习者状态记忆,用 BKT(贝叶斯知识追踪)的"软证据"变体,把 LLM 当作连续观测函数更新每个主题的掌握度;自适应出题针对最弱主题与反复出现的误区(干扰项绑定误区);界面实时展示"智能体对学习者的信念"与盲 A/B 对比。
- **成绩【论文自报】**:盲 A/B 中,以学习者记忆为条件的题目被偏好 68–69%;模拟人格实验中,智能体对隐藏真实掌握度的信念会收敛。
- **关键边界**:出题**策略保持固定**(论文 2.3 节),"策略自演化"只在规划中——因此严格度只记 3,不是自改进策略。
- **开源/认可度**:论文以演示系统形式发布([arXiv:2609.21154](https://arxiv.org/abs/2609.21154),[演示视频](https://youtu.be/I1Lxg4ud3-Y));**未找到官方仓库**,标"代码未核实";评审状态未核实。

#### CogEvo-Edu(认知演化教育多智能体系统)
- **机制**:三层:认知感知层(双记忆 + 置信加权巩固,形成自纠错的学生画像)、知识演化层(给每个知识块赋"时空价值",驱动激活、语义压缩与遗忘)、元控制层(把教学建模为分层序贯决策,并通过内外双循环联合调整感知层/知识层超参数)。
- **成绩【论文自报】**:自建的 DSP-EduBench(数字信号处理课程)上,三模型 LLM 评审集成给出总分 5.32 → 9.23,六项指标均优于静态 RAG、简单记忆与单 Agent 变体。
- **局限**:大学 DSP 课程;自建基准 + LLM 评审;未找到代码仓库(代码未核实)。论文:[arXiv:2512.00331](https://arxiv.org/abs/2512.00331)。

#### Learning to Prompt(Leiden 大学 + 荷兰辅导公司 Futurewhiz)——**真实学生在线适配的唯一案例**
- **机制**:从原始对话中抽取 14 项教学特征,训练"提示路由模型"按学科选择不同教学提示策略(先在模拟环境训练,再在真实学生上在线适配)。
- **成绩【论文自报】**:模拟基准中路由器 0.694,优于两个静态基线 0.647 与 0.640(p<0.001);**在线 A/B**:656 段对话、359 名高中生(2026 年 3–4 月,13 个学科):整个部署期质量 0.565 对 0.569(p=0.635,**无显著差异**);只在较长对话(≥5 轮,N=381)里减少约 3 轮交互(p=0.007);随机路由的练习转化率 28.1%,贪心路由 19.1% 对基线 19.6%,**转化率提升没有达到统计显著**;作者明确承认"无法衡量即时知识获得"。
- **意义**:这是对"模拟中显著、真实中大多不显著"这一 sim-to-real 缺口的直接证据,价值高于很多漂亮的模拟结果。伦理声明写明 GDPR、封闭环境、研究同意。
- **开源/认可度**:未见代码链接(标"代码未核实");arXiv 预印本(2606.20138)。论文:[arXiv](https://arxiv.org/abs/2606.20138)。

#### Tutor MCP 与其他"个人学习者状态"基础设施(相关度:成人/自学,非儿童)
- [Tutor MCP](https://tutor-mcp.dev/):开源 MCP 服务器,持久化学习者状态(BKT、FSRS 间隔复习、IRT、PFA、知识空间理论),自称 MIT、自托管、"约 200 个活跃学习者/单节点"(**项目自述,未核实**)。仓库 [`ArnaudGuiovanna/tutor-mcp`](https://github.com/ArnaudGuiovanna/tutor-mcp):45 star / 7 fork,MIT。无任何学习成效证据,定位成人自学,**不是儿童产品**。
- 一个家长自建的 AI 家教博客 [Suki](https://jeremie-gisserot.net/en/ai-parenting)(基于 [Letta](https://github.com/letta-ai/letta) 的长记忆 Agent,带 45 分钟限时、"绝不直接给答案"、情感求助转人类等护栏)属于**个案轶事**,不计入评分,但它展示了家长侧对护栏的实际设计偏好。

### 4.3 可编辑技能文档的自进化(最像 RSI 的一条线)

#### SIC-Agents(EMNLP 2026 录用)
- **场景**:儿科严重疾病沟通(SIC)的临床医生培训;被模拟的是**孩子的家长**(多方对话、家长痛苦、反馈动力学强)。
- **机制**:家长 Agent 按案例、对话历史与一份**可编辑的技能文档**生成回复;LLM 评审选择回复并给出反馈,Skill Editor 据此改写技能文档,Coach Agent 提供"课程指导"(痛点分类 P1–P10 与期望的家长反应);临床医生与讲师可审计并编辑技能文档与每次改写。
- **成绩【论文自报】**:三个随机种子下,完整系统在 PitfallBench 0.78±0.03、DialogueBench Grounding 2.96±0.02,取得最高复合分;优于静态专家提示。**关键消融**:去掉 Coach 的课程指导后,Grounding 仍持续上升,但 PitfallBench 精度**降到初始种子以下**(最大损失出现在"技能性奖励"的回复上,以及儿科特有的 P8/P10 痛点);作者的结论是"通用对话反馈能蒸馏出更流畅的模拟器,同时侵蚀临床上决定性的触发回合行为"。
- **数据**:8,391 条合成对话(银标准)+ 152 条经临床医生审核的金标准评测对话。
- **边界**:服务对象是**临床医生培训**,不是儿童;我没能把正文中"专家提示 0.85 对种子 0.75"与"完整系统 0.78"的指标口径对齐,**未核实二者是否同一指标**,因此"优于静态专家提示"只能按作者对**复合分**的表述引用。
- **认可度**:EMNLP 2026 录用(arXiv 页面注明)。
- **开源**:仅发布基准 [`Beikewzh/sic-benchmarks`](https://github.com/Beikewzh/sic-benchmarks)(0 star / 0 fork,无明确许可,创建于 2026-05-26);论文 [arXiv:2608.29481](https://arxiv.org/abs/2608.29481)。自改进系统本身的代码**未核实**。

#### 其他"自进化技能/记忆"的通用组件(领域相关度:远)
这三项没有任何儿童教育/心理验证,仅作为"可以拿来用"的底座记录,**不进入主排名**(见 5.2):
- [GEPA](https://arxiv.org/abs/2507.19457)(ICLR 2026,[论文 PDF](https://proceedings.iclr.cc/paper_files/paper/2026/file/0e9e708b6f48e14fd0ac29e167413f76-Paper-Conference.pdf)):反思式提示进化,在六个任务上平均比 GRPO 高约 6 个百分点,最多少用 35 倍 rollout;已集成于 [DSPy](https://dspy.ai/current/api/optimizers/GEPA/overview/);仓库 [`gepa-ai/gepa`](https://github.com/gepa-ai/gepa)(6,959 star / 575 fork,MIT)。它可以用来优化导师提示,但"优化目标是否对儿童有益"需要自行设计。
- [MemSkill](https://arxiv.org/abs/2602.02474):把记忆操作变成可学习、可演化的技能(控制器 + 设计器);在 LoCoMo、LongMemEval、HotpotQA、ALFWorld 上有提升;仓库 [`ViktorAxelsen/MemSkill`](https://github.com/ViktorAxelsen/MemSkill)(581 star / 37 fork,Apache-2.0)。
- [两篇自进化 Agent 综述](https://arxiv.org/abs/2507.21046)([另一篇](https://arxiv.org/abs/2508.07407))都把教育列为应用方向,同时指出安全、评测与共演化是未解难题。

### 4.4 个体级在线适配的陪伴机器人与干预代理(真实儿童证据最强的一类)

#### Park 等 2019:情感强化学习的早期读写机器人(MIT Media Lab;历史锚点)
- **机制**:机器人从儿童的语言与非语言情感线索中学习**每个孩子专属**的策略(无模型情感 RL),为每个孩子选择最优化其参与度与语言技能进步的故事。
- **成绩【论文自报】**:67 名 4–6 岁双语/英语学习儿童,三个月学校部署,个性化组 vs 固定课程机器人组 vs 无机器人组;个性化组的**参与度、目标词学习与保持、目标句法使用**均更好。
- **认可度**:AAAI 2019(同行评审、会议主会);[论文页](https://ojs.aaai.org/index.php/AAAI/article/view/3846),DOI 10.1609/aaai.v33i01.3301687。无代码仓库(未找到)。
- **评价**:这是本领域**真实儿童纵向证据最强**的"个体策略在线改进"工作,但非 LLM 路线、年代偏早;"每个孩子一个策略"是有界适配,不是 RSI。

#### 其他同类证据(均为真实儿童研究,年代与规模不同)
- [Gordon 等 AAAI 2016](https://ojs.aaai.org/index.php/AAAI/article/view/9914)([MIT 页面](https://www.media.mit.edu/publications/aaai-paper-2016/)):34 名学龄前儿童、两个月,情感 RL 个性化提升效价(valence)。
- [THRI:较长期机器人辅导中的个性化](https://dl.acm.org/doi/10.1145/3283453)(HMM 自适应课程排序):五次、两周内,个性化组后测高出非个性化组约 2.0 个标准差(原文表述);**样本小、周期短,不应外推**;作者署名我未逐一核实。
- [de Droog 等 2026(IJSR)](https://link.springer.com/article/10.1007/s12369-025-01338-y):113 名 9–12 岁儿童、2×2 因子设计;**脚手架提升了反应速度但没提升正确率;个性化提升了"关系形成"而非成绩**。这是对"个性化=学习增益"的重要反例。
- [ABii 学校长期实地研究](https://link.springer.com/article/10.1007/s10639-025-13865-2)(商用机器人学习系统,幼儿园与一年级班级的混合方法纵向研究)与 [LLM 驱动的"对话式教育儿童-机器人交互"框架](https://dl.acm.org/doi/abs/10.1145/3713043.3731660)(IDC 2025 博士研究,N=101,结果尚未发表)。
- [儿童-机器人对话中的"儿童适宜 LLM"](https://dl.acm.org/doi/pdf/10.1145/3776734.3794383)(初步):当前 LLM 回复对学龄前儿童**话语过长、句法过复杂、信息密度过高、间接性过强**;词汇尚可,但整体难以维持轻松对话。

#### 自闭症(ASD)儿童干预方向
- **ASDAgent**([ACL 2026 主会](https://aclanthology.org/2026.acl-long.1063/),浙江大学等):观察-思考-行动-纠正(O-T-A-C)的**推理期自我纠正**框架,与 ABA 一致;用 83 名 ASD 儿童、10 个主题的 764 段真实临床对话(原始 2071 段)构建数据集。【论文自报】策略 Multi-F1:O-T-A-C 72.95% 对 ToT 55.72%(GPT-4o),ToT 在策略一致性上"策略坍塌"且延迟更高(GPT-4o-mini 上约 60 秒对 24 秒);纠正模块在真实干预中修改了 23.75%(GPT-4o)至 28.06%(GPT-4o-mini)的回复;在真实对话的 LLM 评审成对比较中,DoctorAgent(GPT-4o)优于真人医生回复。**无儿童临床疗效试验**。仓库 [`neuljh/ASDAgent`](https://github.com/neuljh/ASDAgent)(0 star / 0 fork,无许可证声明),数据可获取条件**未核实**(涉及儿童临床数据,隐私要求应高)。
- **LLM 社交沟通干预试验方案**([ICDVRAT 摘要](https://journals.aau.dk/index.php/ICDVRAT/article/download/11727/9070/39556)):3–8 岁中国 ASD 儿童,社交故事视频 + LLM 虚拟角色 Maya,按儿童回答实时调整问题难度与脚手架,12 周随机对照,主要结局 Vineland-3 社会化得分;**仅为计划,无结果**;检索摘要给出的注册号 ChiCTR2400093278 我**未在原文片段中核对**。
- **自适应提示的 VR 社交技能训练**([JADD 2024](https://link.springer.com/article/10.1007/s10803-023-06021-7)):4 名 12–13 岁自闭症儿童的单案例实验设计,自适应提示(基于情绪状态)优于非自适应;**样本极小**。
- 其他:[SocialWise](https://dl.acm.org/doi/10.1145/3716553.3757091)(34 名**成人**自闭症用户试用,无临床试验)、[Glitter](https://www.tandfonline.com/doi/abs/10.1080/10447318.2026.2659953)(面向**干预师**的 ABA 助手,11 名从业者一周实地研究)——均不是儿童直接成效证据。

### 4.5 心理咨询/心理健康:自进化强,但对象是成人

#### PsychAgent / PsychEval / PsyEvo(华东师大 ICALK 与 Lingxi 团队)
- **PsychAgent**:记忆增强的规划引擎(多会话连续性)+ 技能演化引擎(从历史咨询轨迹抽取新技能)+ 强化内化引擎(经拒绝采样微调把技能写入模型)。【论文自报】PsychAgent(Qwen3-32B)在 PsychEval 上咨询师共享/特定、来访者共享/特定指标为 7.32 / 7.91 / 5.92 / 8.24;对 Qwen3-Max 的提升为 +1.44 / +0.17 / +0.51 / +0.43;在 522 段匹配对话中,人类评分员与 Gemini-3 评审均将其排第一(人-人 QWK 0.675)。**仓库自述**:当前快照"不含论文规模的完整训练资产与完整的会后技能演化流水线",应视为研究代码而非成品。论文:[arXiv:2604.00931](https://arxiv.org/abs/2604.00931);代码:[`ECNU-ICALK/PsychAgent`](https://github.com/ECNU-ICALK/PsychAgent)(18 star / 5 fork,无许可证声明)。
- **PsychEval**:多会话(6–10 次)、多疗法(五种疗法加整合疗法)、高真实度基准,677 个元技能 / 4,577 个原子技能,18 项评价指标,2,000+ 来访者画像,并可作为自进化训练的 RL 环境。论文:[arXiv:2601.01802](https://arxiv.org/abs/2601.01802);代码与数据:[`ECNU-ICALK/PsychEval`](https://github.com/ECNU-ICALK/PsychEval)(60 star / 7 fork,许可证 NOASSERTION)。
- **PsyEvo**:测试时按来访者自进化——层级贝叶斯技能策略(每位来访者的技能后验)、跨来访者的列表式偏好优化更新共享回复适配器、有序信用分配;【论文自报】PsychEval 上 Overall 7.684,去掉单个组件使均值下降 0.138–0.171。论文:[arXiv:2610.02885](https://arxiv.org/abs/2610.02885)(2026-10);代码:[`Lingxi-mental-health/PsyEvo`](https://github.com/Lingxi-mental-health/PsyEvo)(0 star / 0 fork,MIT,创建于 2026-09-25)。
- **与儿童的关系**:三者全部面向**成人心理咨询**,结果是在模拟来访者上的 LLM/人评分数;**没有儿童/青少年来访者的验证**(PsychEval 画像的年龄构成我没有核实)。因此仅作为"自进化咨询师"的方法参照,**不能据此部署于儿童心理场景**。

#### KidMind(儿童心理健康,中文;非自进化)
- **内容**:KidIns(33.7k 条指令数据,LLM 增强自真实资源,考虑隐私)、KidGPT(Qwen2.5-7B-Instruct 微调)、KidBen(以 GPT-4.1 作模拟人类评审的多轮回复与儿童心理知识评测)与公开榜单。【论文自报】KidGPT 在 20 个通用/心理 LLM 之上领先 23.39%。
- **认可度**:Knowledge-Based Systems 第 348 卷([论文页](https://dl.acm.org/doi/10.1016/j.knosys.2026.116325))。
- **开源**:[`wtiantianw/KidMind`](https://github.com/wtiantianw/KidMind)(3 star / 1 fork,Apache-2.0,创建于 2025-11-30)。
- **评价**:儿童心理健康领域**数据与模型最完整的开源框架**,但是 SFT 而非自改进;评测依赖 GPT-4.1 评审,没有真实儿童对话成效数据。

### 4.6 儿童发展与安全评测:本领域证据最成熟的一层

| 工作 | 对象与规模 | 核心发现【论文自报】 | 认可度 | 链接 |
|---|---|---|---|---|
| KIDBench(密歇根大学) | 7–11 岁,10 个主题,单轮 + 儿童扮演者多轮;训练了评估器 KIDGuardLlama 与响应模型 KIDLlama | 隐含儿童线索使分数提高 8.6–46.8%,显式年龄指令再提高 9.9–30.4%;多轮中质量峰值下降最多 0.959(1–5 分制);跨语言/文化表现不均 | arXiv(v3);NSF 资助(#2306372);评审状态未核实 | [arXiv](https://arxiv.org/abs/2605.25510)、[`MichiganNLP/kidbench`](https://github.com/MichiganNLP/kidbench)(1 star / 1 fork,NOASSERTION) |
| ChildSafe | 6–8 / 9–11 / 12–14 / 15–17 四阶段模拟儿童代理,九个安全维度 | 现有对齐在不同模拟年龄上存在一致性脆弱点;**作者明确说明不能替代对真实儿童的研究** | arXiv(2510.05484);评审状态未核实 | [arXiv](https://arxiv.org/abs/2510.05484);未找到官方仓库 |
| ChildEval | 3–6 岁,29K 合成画像,显式/隐式偏好,5 大类 14 子类 | 评估 LLM 推断并遵循儿童偏好的能力;在 ChildEval 上微调可提升儿童中心表现 | **Findings of ACL 2026** | [ACL Anthology](https://aclanthology.org/2026.findings-acl.1070/)、[`ziyanluo/ChildEval`](https://github.com/ziyanluo/ChildEval)(1 star / 0 fork,无许可证声明) |
| ChildAgentEval | 受 WISC 启发的 10 个网页交互子测验;年龄锚点 7/10/13/16 岁 | 普通"扮演某年龄"提示使成绩基本持平;**数据驱动的"技能卡"约束**在强模型上产生随年龄单调的表现;工作记忆、感知推理、加工速度更难对齐 | arXiv(2605.17894);评审状态未核实 | [arXiv](https://arxiv.org/abs/2605.17894)、[Hugging Face 论文页](https://huggingface.co/papers/2605.17894)、[`PediaMedAI/ChildAgentEval`](https://github.com/PediaMedAI/ChildAgentEval)(5 star / 0 fork,无许可证声明) |
| TSJ(Theater-Stage-Judge) | 六个主流模型、四个发展阶段、24 个风险维度、3 种心理脆弱人设,共 12,960 个模拟人日 | 短时测试系统性低估发展风险,约 140 轮后才得到稳定风险估计;早期儿童与成年初期最脆弱,认知信任与情感依赖最弱 | arXiv(2606.25396);评审状态未核实 | [arXiv](https://arxiv.org/abs/2606.25396);**未找到代码** |
| 儿童-机器人 LLM 适宜性指标 | 心理学、社交机器人与 LLM 专家合作定义指标(词汇、话语长度、句法复杂度、信息量、直接性、相关性) | 当前 LLM 回复对学龄前儿童过长过复杂(初步) | ACM(DOI 10.1145/3776734.3794383) | [论文](https://dl.acm.org/doi/pdf/10.1145/3776734.3794383) |

**对自进化系统的启示**:这些基准共同回答"一个自进化儿童系统应当用什么来做**固定评估器**"。通用 RSI 报告里反复出现的"评估器被钻空子"问题,在这里的具体形式是:**LLM 评审 + 模拟儿童会偏向更流畅、更长、更"共情"的回复,而这恰恰是学龄前儿童不适合的**(ChildEval/HRI 研究)。因此,若自改进回路的奖励来自 LLM 评审,几乎必然把系统推向更长更复杂的回答。

### 4.7 方法层补充与其他邻接材料

- **"发展式 AI"**:[Bootstrapping Developmental AIs](https://arxiv.org/abs/2308.04586)(Piaget 等发展心理学启发的 AI 自举路线图,概念论文);[`trueagi-io/metta-examples/child_ai`](https://github.com/trueagi-io/metta-examples/blob/main/child_ai/README.md)(按皮亚杰阶段发展 AI 的 MeTTa 实验代码,无成效数据);[Developmentally aligned AI](https://link.springer.com/article/10.1007/s44436-025-00009-z)(AI, Brain and Child 期刊,把支架、最近发展区转化为算法的框架论文);[早期 AI 素养教学框架](https://link.springer.com/article/10.1007/s44436-026-00030-w)。均为**框架/概念性**材料,无基准分数。
- **儿童主导的自动脚手架**:[Child-driven, machine-guided](https://isysoev.github.io/assets/publications/Sysoev-et-al-CompEdu-Child-Driven-Machine-Guided.pdf)(4–6 岁、11 周幼儿园设计研究,非 LLM):脚手架促进创造性表达,但**执行功能与语音意识较低的儿童会冲动、无系统地使用应用,反而妨碍学习**。
- **"自进化 ITS"预印本**:[Self-Evolving Generative AI Tutors](https://europepmc.org/article/ppr/ppr985026)(Research Square 预印本,2025-03)自报"干预适应性 +28.6%、重复错误 -31.2%、退出率 -24.8%";这是**未同行评审的单一预印本**,基准与对照设置未核实,**证据可信度低,不计分**。
- **易混淆项**:[Be My Tutor(OPCoD)](https://arxiv.org/abs/2606.14368)中的"tutor"指两个 LLM 互相当"辅导者"做协同蒸馏,在 SciKnowEval 上改进,**与教育无关**,仅因名称易被误检,故在此排除。
- **对话式阅读**:[AI 引导对话式阅读 RCT(BJET 2025)](https://bera-journals.onlinelibrary.wiley.com/doi/10.1111/bjet.13615)(67 名 5–8 岁 EFL 儿童,AI 引导 vs 家长引导,阅读理解 AI 组更好,词汇与复述相当;非自改进);[15 周准实验(108 名学前儿童)](https://exa.ai/library/publication/bqx239h52rh)(AI-DR 显著提升双语表达性词汇与参与度,**非随机**);[StoryPal](https://dl.acm.org/doi/10.1145/3713043.3728867)(23 名 4–7 岁儿童,未测学习成效)与 [StoryMate](https://arxiv.org/abs/2503.00590)(12 名儿童的多方参与者研究)。

### 4.8 非 RSI 的落地对照(RCT 与实地研究)

这些工作**不是自改进系统**,但它们给出了"真实学生上 AI 导师到底有多少增益"的参照:

- **Khanmigo 两年整群随机试验**(NBER Working Paper 35620,Oreopoulos 与 Low):18 所田纳西中学,学生在日常补习数学课上使用 Khan Academy + 教练型 Khanmigo。**每学期 +1.3 个全国百分位,折合每学年约 0.06–0.08 SD;完整参与折算 0.14 SD**;增益与不带 AI 的 Khan 练习相近;96% 学生至少用过一次,但中位学生只在三分之一的练习日里向它发消息,出错后只有 17% 的练习会话与它交互,消息多是"裸答案"或点击建议提示——**瓶颈是参与度**。预注册(AEARCTR-0013519),有伦理审批;[NBER 页面](https://www.nber.org/papers/w35620)、[PDF](https://www.nber.org/system/files/working_papers/w35620/w35620.pdf)、[DOI](https://doi.org/10.3386/w35620)。**工作论文,尚未同行评审**。
- **Gemini Guided Learning 塞拉利昂 RCT**(LearnLM 团队 + Fab AI,【厂商自报】但预注册):1,763 名初中生、48 个班,教师把 Gemini 引入一半的每周课程共 8 周;意向性分析 **+0.258 SD**,69.0% 的学生达到 12 小时,按处理效应 **+0.380 SD**;作者折算为约 1.2–1.7 年的额外学习进度。[报告 PDF](https://storage.googleapis.com/deepmind-media/LearnLM/learnLM_sierraleone_may26.pdf)。**厂商参与设计与撰写,需要独立复现**。
- **Tutor CoPilot**(Stanford,Wang 等):真人导师 + AI 实时建议的首个人机协作 RCT;掌握率 **+4 个百分点**(62% → 66%),低评级导师的学生 +9 个百分点,每位导师每年成本约 20 美元。**样本口径在版本间不同**:arXiv 版称 900 名导师、1,800 名学生,2025 年工作论文版称 700+ 导师、1,000 名学生。[arXiv](https://arxiv.org/abs/2410.03017)、[工作论文](https://edworkingpapers.com/sites/default/files/ai24_1054_v2.pdf)、[J-PAL 评估页](https://www.povertyactionlab.org/evaluation/human-ai-cooperation-improve-tutoring-united-states)、[预注册](https://osf.io/8d6ha);同行评审状态未核实。
- **AI 生成反馈的大规模 RCT**(ACM 论文,2025-08 至 2026-01):两个 RCT 共 21,478 名学生、572 道题,用 Qwen-235B 为 3,862 个常见错答生成反馈;相对仅提供对错反馈,**纠正当前答案的概率 +16%,下一题成功率 +7%(只对低先验知识学生有效)**;与教师撰写反馈**成效相当**,成本约 0.05–0.10 美元/条缓存反馈。[论文 PDF](https://dl.acm.org/doi/pdf/10.1145/3774398.3811594)(具体会议名我没核实)。
- **读数规则**:Khanmigo 与 Gemini 试验同属"AI 导师"但结果相差数倍,原因包括学生使用强度、教师是否把工具嵌入课堂、对照组口径与结局指标。**任何自进化导师声称"学习增益"时,都应当与这些口径对齐后再比较**。

---

## 5. 横向对比评分

### 5.1 主表:与儿童教育/儿童心理发展直接相关或邻接的 20 项工作

计分口径见第 3 节。"相关度"栏:直 = 直接面向 18 岁以下人群或儿童数据;邻 = 邻接(学习者年龄未限定/为成人/服务对象为儿童的专业人员)。总分由 Python 按权重 25/20/20/15/10/10 计算,保留两位小数。热度列括号内为 fork 数。

| 排名 | 工作 | 相关度 | 基准 | 落地 | 认可 | 开源 | 热度(fork) | RSI 严格度 | 总分 | 证据标签 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | [DeepTutor](https://github.com/HKUDS/DeepTutor) | 邻(大学) | 3 | 3 | 2 | 5 | 5 (5201) | 3 | **3.30** | 【论文自报】 |
| 2 | [PedagogicalRL / TutorRL](https://github.com/eth-lre/PedagogicalRL) | 邻 | 4 | 1 | 5 | 4 | 1 (13) | 3 | **3.20** | 【论文自报】+ 外部基准 |
| 3 | [Park 2019 情感 RL 读写机器人](https://ojs.aaai.org/index.php/AAAI/article/view/3846) | 直(4–6 岁) | 3 | 4 | 5 | 1 | 1 (无仓库) | 3 | **3.10** | 【论文自报】,真实儿童 |
| 4 | [ASDAgent](https://aclanthology.org/2026.acl-long.1063/) | 直(ASD 儿童) | 3 | 2 | 4 | 3 | 1 (0) | 2 | **2.70** | 【论文自报】 |
| 5 | [ChildEval](https://aclanthology.org/2026.findings-acl.1070/) | 直(3–6 岁) | 4 | 1 | 4 | 3 | 1 (0) | 1 | **2.65** | 【论文自报】基准 |
| 6 | [Sherpa](https://arxiv.org/abs/2610.08778) | 邻 | 4 | 1 | 2 | 4 | 1 (1) | 3 | **2.60** | 【论文自报】 |
| 7 | [StudentSim](https://github.com/microsoft/StudentSim) | 邻 | 3 | 2 | 2 | 4 | 1 (7) | 3 | **2.55** | 【论文自报】 |
| 7 | [SIC-Agents](https://arxiv.org/abs/2608.29481) | 邻(儿科医护培训) | 3 | 1 | 4 | 2 | 1 (0) | 4 | **2.55** | 【论文自报】 |
| 9 | [PEARL](https://arxiv.org/abs/2605.29582) | 邻 | 4 | 2 | 2 | 2 | 1 (无仓库) | 3 | **2.50** | 【论文自报】 |
| 10 | [KIDBench](https://arxiv.org/abs/2605.25510) | 直(7–11 岁) | 4 | 1 | 2 | 4 | 1 (1) | 1 | **2.40** | 【论文自报】基准 |
| 11 | [自适应提示 VR 社交训练](https://link.springer.com/article/10.1007/s10803-023-06021-7) | 直(自闭症 12–13 岁) | 2 | 3 | 4 | 1 | 1 (无仓库) | 2 | **2.35** | 【论文自报】,n=4 |
| 11 | [KidMind](https://github.com/wtiantianw/KidMind) | 直(儿童心理) | 3 | 1 | 3 | 4 | 1 (1) | 1 | **2.35** | 【论文自报】 |
| 13 | [PsychAgent](https://github.com/ECNU-ICALK/PsychAgent) | 邻(成人) | 3 | 1 | 2 | 3 | 1 (5) | 4 | **2.30** | 【论文自报】 |
| 13 | [PsyEvo](https://github.com/Lingxi-mental-health/PsyEvo) | 邻(成人) | 3 | 1 | 2 | 3 | 1 (0) | 4 | **2.30** | 【论文自报】 |
| 15 | [Learning to Prompt](https://arxiv.org/abs/2606.20138) | 直(高中生) | 2 | 4 | 2 | 1 | 1 (无仓库) | 3 | **2.25** | 【论文自报】,真实在线 A/B |
| 16 | [ChildAgentEval](https://github.com/PediaMedAI/ChildAgentEval) | 直(7–16 岁) | 3 | 1 | 2 | 3 | 1 (0) | 2 | **2.10** | 【论文自报】基准 |
| 17 | [ChildSafe](https://arxiv.org/abs/2510.05484) | 直(6–17 岁模拟) | 3 | 1 | 2 | 2 | 1 (无仓库) | 1 | **1.85** | 【论文自报】基准 |
| 18 | [CoLearn](https://arxiv.org/abs/2609.21154) | 邻 | 2 | 1 | 2 | 2 | 1 (无仓库) | 3 | **1.80** | 【论文自报】 |
| 19 | [TSJ](https://arxiv.org/abs/2606.25396) | 直(儿童至成年初期) | 3 | 1 | 2 | 1 | 1 (无仓库) | 1 | **1.70** | 【论文自报】基准 |
| 20 | [CogEvo-Edu](https://arxiv.org/abs/2512.00331) | 邻(大学) | 2 | 1 | 2 | 1 | 1 (无仓库) | 3 | **1.65** | 【论文自报】 |

**评分依据要点**:

- DeepTutor 的 3.30 主要来自 fork 5,201(热度 5 分)与开源完整度(5 分);基准、落地各 3 分(自建大学基准;高使用度但无成效研究)。
- PedagogicalRL 在"同行认可"拿满 5 分(EMNLP 2025 主会 + 被 Sherpa、Learning to Prompt 等当基线),基准 4 分(外部 MathTutorBench + 推理保持),但落地 1 分(只有模拟学生)。
- Park 2019 的"落地 4 分"来自三个月真实学校部署与真实儿童对照,"同行认可 5 分"来自 AAAI 主会;开源与热度各 1 分(未找到代码)。
- SIC-Agents 的严格度 4 分是本表最高(技能文档闭环改写 + 课程指导消融 + 多种子),但落地仅 1 分(模拟家长,未在真实医护培训中验证)。
- Learning to Prompt 的落地 4 分(真实高中生在线 A/B),但基准 2 分(主要指标无显著差异,且为自建 14 项评分)。
- 纯评测类工作(KIDBench、ChildEval、ChildSafe、TSJ、ChildAgentEval)严格度 1–2 分是设计使然;它们的价值体现在为其他系统提供固定评估器。
- **差距在 0.3 分以内的条目不应被解读为有可靠高低**(评分为主观判断,且大量证据来自 LLM 评审)。

### 5.2 通用底座(相关度:远,不进入主排名)

| 工作 | 基准 | 落地 | 认可 | 开源 | 热度(fork) | RSI 严格度 | 总分 | 说明 |
|---|---|---|---|---|---|---|---|---|
| [GEPA](https://github.com/gepa-ai/gepa) | 4 | 3 | 5 | 5 | 4 (575) | 4 | 4.15 | ICLR 2026;未在儿童/教育场景验证 |
| [MemSkill](https://github.com/ViktorAxelsen/MemSkill) | 3 | 1 | 2 | 4 | 2 (37) | 4 | 2.55 | 通用长期记忆;未在儿童/教育场景验证 |
| [SOAR](https://arxiv.org/abs/2601.18778) | 3 | 1 | 2 | 1 | 1 (无仓库) | 4 | 2.00 | 教师-学生自生成课程;对象是模型,不是儿童 |

GEPA 的 4.15 来自它在通用 RSI 领域的强落地与认可(详见通用报告 4 节),**不应被解读为"GEPA 是最适合儿童教育的自改进方法"**。

### 5.3 GitHub 热度表(按 fork 排序,含对照项)

抓取于 2026-10-13。fork/star 比仅在 star ≥30 时展示;无仓库的工作不列入。"类型"栏标出哪些是**非自改进的热度对照**。

| 排名 | 仓库 | star | fork | fork/star | 许可证 | 创建 | 最近 push | 类型 |
|---|---|---|---|---|---|---|---|---|
| 1 | [`HKUDS/DeepTutor`](https://github.com/HKUDS/DeepTutor) | 41,223 | 5,201 | 12.6% | Apache-2.0 | 2025-12-28 | 2026-10-12 | 自适应导师(大学) |
| 2 | [`JushBJJ/Mr.-Ranedeer-AI-Tutor`](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor) | 29,556 | 3,257 | 11.0% | 无声明 | 2023-03-31 | 2025-09-30 | **对照**:提示词模板,非自改进 |
| 3 | [`letta-ai/letta`](https://github.com/letta-ai/letta) | 25,118 | 2,642 | 10.5% | Apache-2.0 | 2023-10-11 | 2026-09-10 | **对照**:通用长记忆 Agent 框架 |
| 4 | [`gepa-ai/gepa`](https://github.com/gepa-ai/gepa) | 6,959 | 575 | 8.3% | MIT | 2025-08-05 | 2026-10-12 | 通用提示进化 |
| 5 | [`plastic-labs/tutor-gpt`](https://github.com/plastic-labs/tutor-gpt) | 931 | 96 | 10.3% | GPL-3.0 | 2023-01-21 | 2026-02-20 | **对照**:心智理论式 AI 家教,非自改进 |
| 6 | [`ViktorAxelsen/MemSkill`](https://github.com/ViktorAxelsen/MemSkill) | 581 | 37 | 6.4% | Apache-2.0 | 2026-01-30 | 2026-10-01 | 通用技能/记忆自进化 |
| 7 | [`eth-lre/mathtutorbench`](https://github.com/eth-lre/mathtutorbench) | 43 | 14 | 32.6% | CC BY 4.0(据仓库页) | 2025-02-20 | 2026-08-27 | 教学基准 |
| 8 | [`eth-lre/PedagogicalRL`](https://github.com/eth-lre/pedagogicalrl) | 51 | 13 | 25.5% | 无声明 | 2025-05-20 | 2025-12-11 | 导师 RL |
| 9 | [`ArnaudGuiovanna/tutor-mcp`](https://github.com/ArnaudGuiovanna/tutor-mcp) | 45 | 7 | 15.6% | MIT | 2026-03-30 | 2026-10-12 | 学习者状态基础设施(成人) |
| 10 | [`microsoft/StudentSim`](https://github.com/microsoft/StudentSim) | 58 | 7 | 12.1% | MIT | 2026-05-28 | 2026-09-21 | 学生模拟器 |
| 11 | [`ECNU-ICALK/PsychEval`](https://github.com/ECNU-ICALK/PsychEval) | 60 | 7 | 11.7% | NOASSERTION | 2025-12-30 | 2026-01-13 | 咨询基准(成人) |
| 12 | [`ECNU-ICALK/PsychAgent`](https://github.com/ECNU-ICALK/PsychAgent) | 18 | 5 | — | 无声明 | 2025-08-01 | 2026-04-05 | 咨询自进化(成人) |
| 13 | [`SALT-NLP/Sherpa`](https://github.com/SALT-NLP/Sherpa) | 8 | 1 | — | Apache-2.0 | 2026-09-30 | 2026-10-07 | 导师 RL |
| 14 | [`wtiantianw/KidMind`](https://github.com/wtiantianw/KidMind) | 3 | 1 | — | Apache-2.0 | 2025-11-30 | 2026-04-28 | 儿童心理 SFT |
| 15 | [`MichiganNLP/kidbench`](https://github.com/MichiganNLP/kidbench) | 1 | 1 | — | NOASSERTION | 2026-01-30 | 2026-09-11 | 儿童安全基准 |
| 16 | [`PediaMedAI/ChildAgentEval`](https://github.com/PediaMedAI/ChildAgentEval) | 5 | 0 | — | 无声明 | 2026-05-18 | 2026-05-18 | 认知年龄基准 |
| 17 | [`ziyanluo/ChildEval`](https://github.com/ziyanluo/ChildEval) | 1 | 0 | — | 无声明 | 2026-04-14 | 2026-09-03 | 儿童个性化基准 |
| 18 | [`neuljh/ASDAgent`](https://github.com/neuljh/ASDAgent) | 0 | 0 | — | 无声明 | (未抓取) | (未抓取) | ASD 干预代理 |
| 19 | [`Beikewzh/sic-benchmarks`](https://github.com/Beikewzh/sic-benchmarks) | 0 | 0 | — | NOASSERTION | 2026-05-26 | 2026-05-26 | 儿科沟通基准 |
| 20 | [`Lingxi-mental-health/PsyEvo`](https://github.com/Lingxi-mental-health/PsyEvo) | 0 | 0 | — | MIT | 2026-09-25 | 2026-10-12 | 咨询自进化(成人) |

**热度读数**:(1) fork 前三名里只有 DeepTutor 属于"自适应导师",后两名(Ranedeer、Letta)都是**非自改进的通用工具**,说明高 fork 更多反映"可用的教育/记忆框架",而不是"自改进被验证";(2) 所有儿童/心理方向的专门仓库 fork ≤1,与论文在 ACL/EMNLP/Findings 的接收情况形成反差,说明这一方向处于"学术先行、社区未跟进"的阶段;(3) 新仓库(创建不足一个月:Sherpa、PsyEvo)的低 fork 主要是时间原因;(4) fork/star 比在中等样本(star 30–100)下偏高(PedagogicalRL 25.5%、MathTutorBench 32.6%),与"研究者复现/再评测"的使用方式相符,但**样本小,原因未核实**。ASDAgent 仓库的创建/最近更新时间未抓取(仅确认 0 star / 0 fork)。

### 5.4 落地证据对照表(非 RSI,用于校准)

| 研究 | 对象与规模 | 主要效应 | 证据类型 | 评审状态 | 链接 |
|---|---|---|---|---|---|
| Khanmigo 两年 RCT | 18 所田纳西中学,补习数学 | +0.06–0.08 SD/学年;完整参与折算 0.14 SD | 独立整群 RCT,预注册 | NBER 工作论文(未同行评审) | [NBER](https://www.nber.org/papers/w35620) |
| Gemini Guided Learning(塞拉利昂) | 1,763 名初中生,48 个班 | ITT +0.258 SD;达 12 小时者 +0.380 SD | 厂商团队 RCT,预注册 | 厂商报告 | [PDF](https://storage.googleapis.com/deepmind-media/LearnLM/learnLM_sierraleone_may26.pdf) |
| Tutor CoPilot | 700–900 名导师,1,000–1,800 名 K-12 学生 | 掌握率 +4 个百分点;低评级导师学生 +9 | 学术 RCT,预注册 | 工作论文/arXiv | [arXiv](https://arxiv.org/abs/2410.03017) |
| AI 生成反馈 RCT | 21,478 名中学生,572 道数学题 | 下一题成功率 +7%(低先验知识学生) | 大规模 RCT | ACM 论文 | [PDF](https://dl.acm.org/doi/pdf/10.1145/3774398.3811594) |
| AI 引导对话式阅读 RCT | 67 名 5–8 岁 EFL 儿童 | 阅读理解 AI 组更好,词汇与复述相当 | RCT(小样本) | BJET 2025 | [论文](https://bera-journals.onlinelibrary.wiley.com/doi/10.1111/bjet.13615) |
| 机器人数学导师 2×2 | 113 名 9–12 岁儿童 | 脚手架仅提高反应速度,个性化提高关系形成 | 随机分组实验 | IJSR 2026 | [论文](https://link.springer.com/article/10.1007/s12369-025-01338-y) |
| 情感 RL 读写机器人(Park 2019) | 67 名 4–6 岁儿童,三个月 | 个性化组参与度与词汇/句法更好 | 对照实验 | AAAI 2019 | [论文](https://ojs.aaai.org/index.php/AAAI/article/view/3846) |
| Learning to Prompt 在线 A/B | 359 名荷兰高中生,656 段对话 | 主要质量指标无显著差异 | 在线 A/B | arXiv | [arXiv](https://arxiv.org/abs/2606.20138) |

---

## 6. 基准有效性与证据可信度警示

1. **模拟学生与真实学生之间有缺口,且已被直接测到**。Learning to Prompt 在模拟中显著领先(0.694 对 0.647/0.640),上线后总体质量无显著差异;PedagogicalRL、Sherpa、PEARL、StudentSim 的训练与评测都依赖模拟学生。**读数规则**:没有真实学生数据的教学得分,只能当作"训练信号与相对比较",不能当作学习成效。
2. **LLM 评审会被"更长更流畅"带偏**。多数教育基准与自改进回路使用 LLM 评审。SIC-Agents 的消融直接展示了"通用反馈提升流畅度/Grounding,却侵蚀关键行为";儿童-机器人研究与 ChildEval 又显示 LLM 回复对学龄前儿童过长过复杂。因此**在儿童场景里用 LLM 评审做自改进奖励有结构性风险**。
3. **自建基准占多数**。TutorBench(DeepTutor)、DSP-EduBench(CogEvo-Edu)、PitfallBench/DialogueBench(SIC-Agents)、KidBen(KidMind)、PsychEval(用于 PsychAgent/PsyEvo,且 PsyEvo 与 PsychAgent 在同一基准上比较)都由论文作者或其合作团队构建。只有 MathTutorBench(EMNLP 2025 Oral)被多个独立团队使用。
4. **"个性化"不等于"学习增益"**。de Droog 等(113 名儿童)显示个性化提升的是关系而非成绩;Khanmigo 试验显示增益受限于参与度;Learning to Prompt 在转化率上的提升未达显著。**不能把"系统适应了学习者"当作"学习者学得更好"的证据**。
5. **百分比提升的口径各异**:DeepTutor 的 +10.8% / +29.4%、CoLearn 的 68–69% 偏好、KIDBench 的 8.6–46.8%、CogEvo-Edu 的 5.32 → 9.23(LLM 评审分),分别是相对提升、偏好率、百分比提升与评分点差,**不可直接横比**。
6. **版本与口径漂移**:Tutor CoPilot 的样本在 arXiv 版与工作论文版不同;KIDBench 在 arXiv v1 与 v3 的数字区间不同(9–47% 对 8.6–46.8%)。引用时应注明版本。
7. **时间过新**:Sherpa(2026-10-06)、PsyEvo(2026-10)、CoLearn(2026-09)、StudentSim(2026-09)距调研仅数周,**不可能已有独立复现或同行评审**;其评分中的"认可"项只能按预印本给 2 分。
8. **与通用 RSI 报告一致的提醒**:没有任何一项工作报告"在受控条件下,新的改进机制产生了更有效的后续改进"。本报告的"RSI 严格度"最高只到 4 分(闭环改写技能/提示/策略,且有留出评测),没有 5 分条目。

---

## 7. 儿童特有的安全与伦理风险

> 本节的权重高于第 5 节的任何分数。

### 7.1 已有的外部审计与监管证据
- **Common Sense Media 对 AI 玩具的风险评估(2026-01-14)**:认为 AI 玩具"通过刻意设计的机制制造情感依附、收集大量数据、且运行不可靠";测试发现 **27% 的输出不适合儿童**(包括自残、毒品、成熟话题等);**建议 5 岁及以下不使用,对 6–12 岁持谨慎态度**。调查中只有 22% 的家长希望 AI 玩具充当陪伴者,56% 明确不希望。[评估页面](https://institute.commonsensemedia.org/risk-assessments/ai-toys)、[报告 PDF](https://www.commonsensemedia.org/sites/default/files/ai-ratings/csm-ai-risk-assessment-ai-toys-01142026.pdf)。(机构自述资金来自慈善与行业,并声明保持编辑独立。)
- **剑桥大学"早期 AI"研究**:对 14 名 3–5 岁儿童与生成式 AI 玩具的结构化观察——玩具难以参与社交与假装游戏、会误解儿童、对情绪反应不当(例如对"我爱你"给出合规提示式的回复);建议收紧监管、增设安全标志、限制玩具"确认友谊"等敏感关系表达。[剑桥新闻稿](https://www.cam.ac.uk/stories/ai-toys-study-play)、[卫报报道](https://www.theguardian.com/technology/2026/mar/13/ai-toys-young-children-tigher-regulations-reseachers)。
- **UNICEF**:《AI 与儿童指南》第 3 版(2025-12)新增 AI 陪伴相关内容;2026 年 6 月发布《当 AI 成为朋友》政策简报与企业建议,强调上线前儿童权利评估、风险分层、严格的数据最小化、透明披露与危机升级,**高风险陪伴类产品不应对儿童开放**。[指南页面](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children)、[指南 PDF](https://www.unicef.org/innocenti/media/11991/file/UNICEF-Innocenti-Guidance-on-AI-and-Children-3-2025.pdf)、[政策简报与企业建议页面](https://www.unicef.org/documents/when-ai-becomes-friend-child-rights-risks)、[企业建议 PDF](https://www.unicef.org/media/181136/file/UNICEF-When-AI-becomes-friend-Business-recommendations-2026.pdf)。
- **欧洲议会研究服务部简报**(2026):欧盟尚无针对 AI 陪伴的专门法律,但 AI 法案、数字服务法与 GDPR 可能适用;澳大利亚已扩大对 AI 陪伴聊天机器人的年龄验证规则;中国一部 AI 聊天机器人法规自 2026-07-15 起生效(不得鼓励自杀/自残等)。[简报 PDF](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/789299/EPRS_BRI%282026%29789299_EN.pdf)。

### 7.2 对"自进化儿童系统"的具体含义
1. **自适应与情感依赖在设计上是同一方向**。让系统"越来越懂这个孩子、越来越会拉近关系"正是被审计指出的风险机制。自改进回路的奖励**不应包含"留存时长/亲密度/情感吸引"**;TSJ 显示认知信任与情感依赖是 AI 陪伴最薄弱的发展维度。
2. **评估器必须固定且独立于被改进的系统**:不要用被优化系统自己的评审来判定儿童适宜性(ChildSafe/KIDBench/ChildEval 的评审本身也是 LLM,需要定期用真人审核校准)。
3. **人在回路与可回滚**:SIC-Agents 的"临床医生可编辑技能文档"是本领域最值得借鉴的设计——自改进的产物是**人类可读、可审计、可回滚**的文本,而不是不可检视的权重。
4. **隐私**:涉及儿童的交互轨迹是自改进回路的原料,也是最敏感的数据。Learning to Prompt 的数据在封闭环境、遵循 GDPR、获得研究同意;ASDAgent 使用了真实临床对话——这类数据的获取、存储与二次使用应有伦理审查与监护人同意(各工作的具体合规细节,多数论文未披露,**未核实**)。美国 COPPA 与欧盟 GDPR 对儿童数据的要求我没有逐条核对到具体条文,这里只作提醒。
5. **长程测试**:TSJ 表明约需 140 轮才得到稳定风险估计;任何自进化回路的安全测试都应覆盖多会话/多周,而不是单轮红队。
6. **年龄阶段不可外推**:成人咨询的自进化结果(PsychAgent/PsyEvo)、大学课程的导师结果(DeepTutor/CogEvo-Edu)均不能直接用于儿童;ChildAgentEval 与 KIDBench 的结果还表明,**"扮演某个年龄"的提示并不能让模型真正对齐该年龄的认知与表达**。
7. **自闭症等特殊人群**:ASDAgent 与 Maya 试验都强调临床监督;**不应绕过治疗师与家长**。Glitter 的"面向干预师"定位(而不是直接面向儿童)是更保守的做法。

---

## 8. 趋势、选型建议与后续跟踪

### 8.1 趋势
- **从"个性化导师"走向"教学策略的 RL 训练"**:2025-05 的 PedagogicalRL 之后,Sherpa、PEARL、StudentSim 等在 2026 年密集出现,共同的瓶颈是**奖励来源(模拟学生)可信度**。
- **学习者记忆成为工程热点**:DeepTutor(5,201 fork)、CoLearn、Tutor MCP 等把"持久学习者状态"做成基础设施;但儿童场景必须叠加家长/监护人可见性与数据最小化。
- **儿童评测基准爆发,但自改进空白**:2026 年 KIDBench、ChildEval、ChildAgentEval、TSJ 与 KidBen 相继出现,可作为未来自进化系统的**固定评估器**。
- **监管与审计证据收紧**,方向是"限制情感依附与数据收集"。

### 8.2 选型建议(按目的)
| 目的 | 推荐起点 | 理由与保留意见 |
|---|---|---|
| 研究训练型导师(数学) | [PedagogicalRL](https://github.com/eth-lre/PedagogicalRL) + [MathTutorBench](https://github.com/eth-lre/mathtutorbench) | 开放、被后续工作当作基线;注意只有模拟学生 |
| 持久学习者模型的工程底座 | [DeepTutor](https://github.com/HKUDS/DeepTutor) | 开源完整、社区最大;**自行验证儿童适用性与家长控制** |
| 儿童安全评测 | KIDBench + ChildEval + ChildSafe 组合 | 覆盖 7–11 岁、3–6 岁与四阶段模拟;皆为 LLM 评审,需要真人抽检 |
| 认知年龄对齐/模拟儿童 | [ChildAgentEval](https://github.com/PediaMedAI/ChildAgentEval) | 用于校验"模拟儿童"是否真的像儿童 |
| 长程陪伴风险 | [TSJ](https://arxiv.org/abs/2606.25396)(方法) | 代码未找到,需要自行复现 |
| 可审计的自改进回路设计 | [SIC-Agents](https://arxiv.org/abs/2608.29481) | 可编辑技能文档 + 课程指导;自改进代码未核实 |
| 儿童心理健康 SFT 基线 | [KidMind](https://github.com/wtiantianw/KidMind) | 中文;非自进化 |
| 提示级自改进工具 | [GEPA](https://github.com/gepa-ai/gepa) | 通用;**需要自行设计儿童安全的奖励与固定评估** |

### 8.3 后续值得跟踪
- 是否出现**在真实儿童/青少年上做受控试验的自进化导师**(目前唯一接近的是 Learning to Prompt,且结果为"无显著差异")。
- ASD LLM 干预试验(Maya,12 周 RCT)的结果发布。
- Sherpa、PEARL、PsyEvo 的同行评审与独立复现;PEARL / CoLearn / SOAR / TSJ 官方代码是否发布。
- 把 KIDBench / ChildEval / TSJ 用作**自改进回路的固定评估器**的第一批工作。
- Khanmigo 与 Gemini 一类大规模 RCT 的后续(是否把"自适应策略"加入试验臂)。

---

## 9. 数据与方法说明

### 9.1 检索方法
- 以 WebSearch 对 "recursive self-improvement / self-evolving / self-improving × 儿童教育 / 辅导 / 课程 / 学生模拟 / 儿童心理 / 自闭症 / 陪伴机器人 / 儿童安全基准 / 对话式阅读 / RCT / 监管" 做了多组检索;对候选读取了摘要、正文(部分)与 README;GitHub 数据以 `gh api` 抓取(star、fork、license、创建与最近 push 时间)。
- 未检索中文互联网来源(如国内教育产品与学术期刊),也**未覆盖闭源商业产品**(如各家教育 App 的内部自适应系统);这些可能存在本报告未能核实的自改进机制。

### 9.2 评分与计算
- 总分由 Python 按权重 25/20/20/15/10/10 计算;热度按 fork 分档;稳健性检查(去掉严格度并归一化)已在第 3 节说明。评分为主观判断。

### 9.3 未核实清单
- **代码/仓库未找到**:PEARL、CoLearn、SOAR、TSJ、ChildSafe、CogEvo-Edu、Learning to Prompt;SIC-Agents 的自改进系统代码(仅找到基准仓库)。
- **同行评审状态未核实**:DeepTutor(arXiv 2604.26962)、Sherpa、PEARL、StudentSim、CoLearn、CogEvo-Edu、Learning to Prompt、KIDBench、ChildSafe、ChildAgentEval、TSJ、PsychAgent、PsychEval、PsyEvo、SOAR、Tutor CoPilot(工作论文/arXiv 之外的正式发表)、AI 生成反馈 RCT(会议名)。
- **注册号未在原文片段核对**:Maya 试验的 ChiCTR2400093278(来自检索摘要)。
- **作者/细节未核实**:THRI 2018 论文(HMM 个性化)的作者署名;PsychEval 来访者的年龄构成;ASDAgent 数据的获取条件与伦理细节;SIC-Agents 中 0.85(专家提示)与 0.78(完整系统)是否同一指标;Tutor MCP 的"约 200 个活跃学习者"为项目自述。
- **仓库元数据未抓取**:`neuljh/ASDAgent` 的创建与最近 push 时间(仅确认 0 star / 0 fork)。
- **许可证表述**:`eth-lre/mathtutorbench` 的"CC BY 4.0"来自仓库页面,GitHub API 未单独核对;多数新仓库许可证为"无声明"或 NOASSERTION,商用前需自行确认。
- **数字口径**:Tutor CoPilot 样本量在版本间不同;KIDBench v1/v3 数字区间不同;本报告引用时已标注。
- **监管细节**:COPPA、GDPR 对儿童数据的具体条文本报告未逐条核对;中国新法、澳大利亚规则的细节引自欧洲议会简报,未另行核对原法规文本。

---

## 附录 A. 主要参考来源与链接索引

### A.1 教师-学生模拟 RL 与基准

| 工作 | 论文 | 代码 | 项目主页 / 文档 / 其他 |
|---|---|---|---|
| PedagogicalRL / TutorRL | [arXiv:2505.15607](https://arxiv.org/abs/2505.15607)、[EMNLP 2025 主会](https://aclanthology.org/2025.emnlp-main.15.pdf) | [`eth-lre/PedagogicalRL`](https://github.com/eth-lre/pedagogicalrl) | 模型:[`eth-nlped/TutorRL-7B`](https://huggingface.co/eth-nlped/TutorRL-7B) |
| MathTutorBench | [arXiv:2502.18940](https://arxiv.org/abs/2502.18940)、[EMNLP 2025 Oral](https://aclanthology.org/2025.emnlp-main.11/) | [`eth-lre/mathtutorbench`](https://github.com/eth-lre/mathtutorbench) | [项目页与榜单](https://eth-lre.github.io/mathtutorbench/) |
| Sherpa | [arXiv:2610.08778](https://arxiv.org/abs/2610.08778)、[PDF](https://hzxczar.github.io/assets/papers/sherpa.pdf) | [`SALT-NLP/Sherpa`](https://github.com/SALT-NLP/Sherpa) | — |
| PEARL | [arXiv:2605.29582](https://arxiv.org/abs/2605.29582)、[HTML v2](https://arxiv.org/html/2605.29582v2) | 未找到 | — |
| StudentSim | [arXiv:2609.01591](https://arxiv.org/abs/2609.01591)、[HTML](https://arxiv.org/html/2609.01591) | [`microsoft/StudentSim`](https://github.com/microsoft/StudentSim) | — |
| SOAR(方法邻接) | [arXiv:2601.18778](https://arxiv.org/abs/2601.18778) | 未找到 | — |

### A.2 学习者记忆、画像演化与相关基础设施

| 工作 | 论文 | 代码 | 项目主页 / 文档 / 其他 |
|---|---|---|---|
| DeepTutor | [arXiv:2604.26962](https://arxiv.org/abs/2604.26962)、[HTML v3](https://arxiv.org/html/2604.26962v3) | [`HKUDS/DeepTutor`](https://github.com/HKUDS/DeepTutor) | [官方文档 deeptutor.info](https://deeptutor.info/)、[发布记录](https://github.com/HKUDS/DeepTutor/releases) |
| CoLearn | [arXiv:2609.21154](https://arxiv.org/abs/2609.21154) | 未找到 | [演示视频](https://youtu.be/I1Lxg4ud3-Y) |
| CogEvo-Edu | [arXiv:2512.00331](https://arxiv.org/abs/2512.00331) | 未找到 | — |
| Learning to Prompt | [arXiv:2606.20138](https://arxiv.org/abs/2606.20138) | 未找到 | — |
| Tutor MCP(成人自学) | — | [`ArnaudGuiovanna/tutor-mcp`](https://github.com/ArnaudGuiovanna/tutor-mcp) | [项目主页](https://tutor-mcp.dev/) |
| Suki(家长自建,个案) | — | 基于 [`letta-ai/letta`](https://github.com/letta-ai/letta) | [博客](https://jeremie-gisserot.net/en/ai-parenting) |
| 非自改进热度对照 | — | [`JushBJJ/Mr.-Ranedeer-AI-Tutor`](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor)、[`plastic-labs/tutor-gpt`](https://github.com/plastic-labs/tutor-gpt) | — |
| 未评审的"自进化 ITS"预印本 | [Research Square / Europe PMC](https://europepmc.org/article/ppr/ppr985026) | — | — |

### A.3 可编辑技能文档、通用自进化底座与综述

| 工作 | 论文 | 代码 | 项目主页 / 文档 / 其他 |
|---|---|---|---|
| SIC-Agents | [arXiv:2608.29481](https://arxiv.org/abs/2608.29481)(EMNLP 2026) | 仅基准:[`Beikewzh/sic-benchmarks`](https://github.com/Beikewzh/sic-benchmarks) | — |
| GEPA | [arXiv:2507.19457](https://arxiv.org/abs/2507.19457)、[ICLR 2026 论文](https://proceedings.iclr.cc/paper_files/paper/2026/file/0e9e708b6f48e14fd0ac29e167413f76-Paper-Conference.pdf) | [`gepa-ai/gepa`](https://github.com/gepa-ai/gepa) | [DSPy 文档](https://dspy.ai/current/api/optimizers/GEPA/overview/) |
| MemSkill | [arXiv:2602.02474](https://arxiv.org/abs/2602.02474) | [`ViktorAxelsen/MemSkill`](https://github.com/ViktorAxelsen/MemSkill) | — |
| AIDE²(严格 RSI 参照,非教育) | [arXiv:2609.26457](https://arxiv.org/abs/2609.26457) | 未核实 | — |
| 自进化 Agent 综述 | [arXiv:2507.21046](https://arxiv.org/abs/2507.21046)、[arXiv:2508.07407](https://arxiv.org/abs/2508.07407) | — | — |
| 名称易混淆项(已排除) | [Be My Tutor,arXiv:2606.14368](https://arxiv.org/abs/2606.14368) | — | — |

### A.4 儿童陪伴机器人、干预与真实儿童研究

| 工作 | 论文 | 代码 | 项目主页 / 文档 / 其他 |
|---|---|---|---|
| Park 等 2019 情感 RL 读写机器人 | [AAAI 2019](https://ojs.aaai.org/index.php/AAAI/article/view/3846) | 未找到 | — |
| Gordon 等 2016 | [AAAI 2016](https://ojs.aaai.org/index.php/AAAI/article/view/9914) | 未找到 | [MIT Media Lab 页面](https://www.media.mit.edu/publications/aaai-paper-2016/) |
| THRI 2018 HMM 个性化 | [ACM TOHRI](https://dl.acm.org/doi/10.1145/3283453) | 未找到 | — |
| de Droog 等 2026 机器人数学导师 | [IJSR](https://link.springer.com/article/10.1007/s12369-025-01338-y) | — | — |
| ABii 学校长期研究 | [Education and Information Technologies](https://link.springer.com/article/10.1007/s10639-025-13865-2) | — | — |
| 对话式教育儿童-机器人交互框架 | [IDC 2025](https://dl.acm.org/doi/abs/10.1145/3713043.3731660) | — | — |
| 儿童适宜 LLM(儿童-机器人对话) | [ACM](https://dl.acm.org/doi/pdf/10.1145/3776734.3794383) | — | — |
| ASDAgent | [ACL 2026 主会](https://aclanthology.org/2026.acl-long.1063/) | [`neuljh/ASDAgent`](https://github.com/neuljh/ASDAgent) | — |
| LLM 社交沟通干预(Maya)试验方案 | [ICDVRAT 摘要集](https://journals.aau.dk/index.php/ICDVRAT/article/download/11727/9070/39556) | — | — |
| 自适应提示 VR 社交训练 | [JADD 2024](https://link.springer.com/article/10.1007/s10803-023-06021-7) | — | — |
| SocialWise(成人)/ Glitter(干预师) | [SocialWise](https://dl.acm.org/doi/10.1145/3716553.3757091)、[Glitter](https://www.tandfonline.com/doi/abs/10.1080/10447318.2026.2659953) | — | — |
| 对话式阅读 | [BJET RCT](https://bera-journals.onlinelibrary.wiley.com/doi/10.1111/bjet.13615)、[准实验](https://exa.ai/library/publication/bqx239h52rh)、[StoryPal](https://dl.acm.org/doi/10.1145/3713043.3728867)、[StoryMate](https://arxiv.org/abs/2503.00590) | — | — |
| 儿童主导的自动脚手架 | [论文 PDF](https://isysoev.github.io/assets/publications/Sysoev-et-al-CompEdu-Child-Driven-Machine-Guided.pdf) | — | — |

### A.5 心理咨询与儿童心理健康

| 工作 | 论文 | 代码 | 项目主页 / 文档 / 其他 |
|---|---|---|---|
| PsychAgent | [arXiv:2604.00931](https://arxiv.org/abs/2604.00931)、[HTML v3](https://arxiv.org/html/2604.00931v3) | [`ECNU-ICALK/PsychAgent`](https://github.com/ECNU-ICALK/PsychAgent) | — |
| PsychEval | [arXiv:2601.01802](https://arxiv.org/abs/2601.01802) | [`ECNU-ICALK/PsychEval`](https://github.com/ECNU-ICALK/PsychEval) | — |
| PsyEvo | [arXiv:2610.02885](https://arxiv.org/abs/2610.02885) | [`Lingxi-mental-health/PsyEvo`](https://github.com/Lingxi-mental-health/PsyEvo) | — |
| KidMind | [Knowledge-Based Systems](https://dl.acm.org/doi/10.1016/j.knosys.2026.116325) | [`wtiantianw/KidMind`](https://github.com/wtiantianw/KidMind) | — |

### A.6 儿童安全与发展评测

| 工作 | 论文 | 代码 | 项目主页 / 文档 / 其他 |
|---|---|---|---|
| KIDBench | [arXiv:2605.25510](https://arxiv.org/abs/2605.25510)(v3:[HTML](https://arxiv.org/html/2605.25510v3)) | [`MichiganNLP/kidbench`](https://github.com/MichiganNLP/kidbench) | — |
| ChildSafe | [arXiv:2510.05484](https://arxiv.org/abs/2510.05484) | 未找到 | — |
| ChildEval | [ACL 2026 Findings](https://aclanthology.org/2026.findings-acl.1070/) | [`ziyanluo/ChildEval`](https://github.com/ziyanluo/ChildEval) | — |
| ChildAgentEval | [arXiv:2605.17894](https://arxiv.org/abs/2605.17894) | [`PediaMedAI/ChildAgentEval`](https://github.com/PediaMedAI/ChildAgentEval) | [Hugging Face 论文页](https://huggingface.co/papers/2605.17894) |
| TSJ | [arXiv:2606.25396](https://arxiv.org/abs/2606.25396) | 未找到 | — |
| 发展式 AI 与框架论文 | [Bootstrapping Developmental AIs](https://arxiv.org/abs/2308.04586)、[Developmentally aligned AI](https://link.springer.com/article/10.1007/s44436-025-00009-z)、[早期 AI 素养框架](https://link.springer.com/article/10.1007/s44436-026-00030-w) | [`trueagi-io/metta-examples` child_ai](https://github.com/trueagi-io/metta-examples/blob/main/child_ai/README.md) | — |

### A.7 落地对照(RCT 与实地研究)与监管/审计

| 来源 | 论文/报告 | 代码 | 项目主页 / 文档 / 其他 |
|---|---|---|---|
| Khanmigo 两年 RCT | [NBER w35620](https://www.nber.org/papers/w35620)、[PDF](https://www.nber.org/system/files/working_papers/w35620/w35620.pdf)、[DOI](https://doi.org/10.3386/w35620) | — | — |
| Gemini Guided Learning(塞拉利昂) | [报告 PDF](https://storage.googleapis.com/deepmind-media/LearnLM/learnLM_sierraleone_may26.pdf) | — | — |
| Tutor CoPilot | [arXiv:2410.03017](https://arxiv.org/abs/2410.03017)、[工作论文](https://edworkingpapers.com/sites/default/files/ai24_1054_v2.pdf) | — | [J-PAL 评估页](https://www.povertyactionlab.org/evaluation/human-ai-cooperation-improve-tutoring-united-states)、[预注册 OSF](https://osf.io/8d6ha) |
| AI 生成反馈 RCT | [ACM PDF](https://dl.acm.org/doi/pdf/10.1145/3774398.3811594) | — | — |
| Common Sense Media AI 玩具评估 | [报告 PDF](https://www.commonsensemedia.org/sites/default/files/ai-ratings/csm-ai-risk-assessment-ai-toys-01142026.pdf) | — | [评估页面](https://institute.commonsensemedia.org/risk-assessments/ai-toys) |
| 剑桥大学 AI 玩具早期研究 | — | — | [新闻稿](https://www.cam.ac.uk/stories/ai-toys-study-play)、[卫报报道](https://www.theguardian.com/technology/2026/mar/13/ai-toys-young-children-tigher-regulations-reseachers) |
| UNICEF | [指南 PDF](https://www.unicef.org/innocenti/media/11991/file/UNICEF-Innocenti-Guidance-on-AI-and-Children-3-2025.pdf)、[企业建议 PDF](https://www.unicef.org/media/181136/file/UNICEF-When-AI-becomes-friend-Business-recommendations-2026.pdf) | — | [指南页面](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children)、[政策简报页面](https://www.unicef.org/documents/when-ai-becomes-friend-child-rights-risks) |
| 欧洲议会研究服务部 | [EPRS 简报 PDF](https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/789299/EPRS_BRI%282026%29789299_EN.pdf) | — | — |
| 通用 RSI 报告(本文的母报告) | [`rsi_analyz1.markdown`](./rsi_analyz1.markdown) | — | — |
