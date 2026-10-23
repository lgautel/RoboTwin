function B(ch, scene, who, sub, o) {
  o = o || {};
  const text = sub || "";
  const ms = o.ms || (o.title ? 3600 : o.act ? 3000 : Math.max(4400, Math.min(9200, 2200 + Array.from(text).length * 120)));
  return Object.assign({ ch: String(ch), scene: scene, who: who || "", sub: text, ms: ms }, o);
}

const beats = [
  B("0", "sky", "", "三、二、一，改航", { title: 1, imagine: true, plane: { x: 80, y: 170, r: -8, s: 1.2 } }),
  B("0", "sky", "仪表", "咚咚号，准备进站。", { pos: { xiaoyu: 430 } }),
  B("0", "sky", "小宇", "收到。纸飞机，爬升！", { plane: { x: 400, y: 120, r: 10, s: 1.15 }, walk: true }),
  B("0", "sky", "", "纸飞机歪进教室。", { act: 1, plane: { x: 780, y: 240, r: 36, s: 0.7 } }),
  B("0", "class", "", "叮铃铃。下课了。", { act: 1, imagine: false, plane: null, walk: false }),

  B("1", "class", "", "第一关　三盏灯", { title: 1, lights: "", bubbles: 0, missile: "hide", pos: { lele: 150, xiaoyu: 320, akai: 480, zhuang: null, teacher: null, jia: null, yi: null }, train: { x: 170, y: 360, s: 0.55 } }),
  B("1", "class", "", "咔哒。请站稳。", { act: 1, train: { x: 175, y: 348, s: 1 } }),
  B("1", "class", "乐乐", "各位旅客，咚咚号马上开。下一站，操场。"),
  B("1", "class", "小宇", "等等我！我的纸飞机要跟车跑。", { plane: { x: 360, y: 330, s: 0.85, r: -10 } }),
  B("1", "class", "", "纸飞机翻了个跟头，掉进铅笔盒。", { act: 1, plane: { x: 530, y: 370, r: 70, s: 0.7 } }),
  B("1", "class", "阿凯", "你的飞机又想抄近路。", { plane: null }),
  B("1", "class", "乐乐", "高铁不抄近路。高铁排队。"),
  B("1", "class", "", "影子先到。", { act: 1, pos: { zhuang: { x: 860, shadow: true } } }),
  B("1", "class", "", "壮壮把车头抽起来。轮子空转。", { act: 1, pos: { zhuang: 690 }, train: { x: 700, y: 150, r: -16, s: 1 }, walk: true }),
  B("1", "class", "壮壮", "这趟车现在归我。谁哭谁下车。", { pos: { zhuang: { x: 690, mood: "angry" } }, walk: false }),
  B("1", "class", "乐乐", "还给我。车头后面写着我的名字。", { pos: { lele: { x: 150, mood: "sad" } } }),
  B("1", "class", "壮壮", "乐——乐——站。乐乐站到了。你要是来抢，我就把车厢拆成积木。"),
  B("1", "class", "", "乐乐把手缩了回来。", { act: 1 }),
  B("1", "class", "小宇", "壮壮，你又在开快车逗他吧？昨天你把脚搁在我的跑道上，后来还是拿开了呀。", { pos: { xiaoyu: { x: 320, mood: "happy" } } }),
  B("1", "class", "壮壮", "昨天拿开，今天不拿开。我高兴。乐乐，你再报一次站，我学给你听。"),
  B("1", "class", "乐乐", "各位旅客……请把咚咚号还给我。"),
  B("1", "class", "壮壮", "各位旅客，请把咚咚号还给我——"),
  B("1", "class", "", "壮壮把高铁塞进口袋，跑向门口。", { act: 1, train: { x: 800, y: 400, s: 0.38 }, pos: { zhuang: 820 }, walk: true }),
  B("1", "class", "小宇", "你看他跑的，像一列不进站的车。挺好玩。", { walk: false }),
  B("1", "class", "阿凯", "你看乐乐。他没有报下一站。他的嘴是闭着的。"),
  B("1", "class", "小宇", "他怎么不笑？玩笑都会笑啊。"),
  B("1", "class", "阿凯", "搞不清的时候，看三盏灯。", { imagine: true, lights: "0", screen: "起飞检查" }),
  B("1", "class", "仪表", "起飞检查。第一盏：是故意的吗？", { screen: "他看见了名字，还是拿走了。" }),
  B("1", "class", "", "第一盏灯亮了。", { act: 1, lights: "1" }),
  B("1", "class", "小宇", "故意的。"),
  B("1", "class", "仪表", "第二盏：是一次又一次吗？", { screen: "昨天跑道　　上次滑梯" }),
  B("1", "class", "阿凯", "昨天跑道。上次滑梯。今天整列火车。", { lights: "2" }),
  B("1", "class", "小宇", "一次又一次。"),
  B("1", "class", "仪表", "第三盏：对方害怕，或者难过吗？", { screen: "乐乐怕车厢被拆掉" }),
  B("1", "class", "乐乐", "我怕他把车厢拆了。我拼了很久。"),
  B("1", "class", "", "三盏一起亮。", { act: 1, lights: "3" }),
  B("1", "class", "仪表", "三盏都亮。这不是玩。这是霸凌。"),
  B("1", "class", "小宇", "我刚才笑了。乐乐都快哭了，我还在笑。", { imagine: false, screen: "", lights: "3" }),
  B("1", "class", "阿凯", "现在灯亮了，就不晚。"),
  B("1", "class", "小宇", "那我去把车抢回来。我比他快。", { pos: { xiaoyu: { x: 400, mood: "angry", hands: true } } }),
  B("1", "class", "阿凯", "先记住这一关。灯会认人。车还在他口袋里。我们跟着，看他下一回还这样吗。", { pos: { xiaoyu: { x: 320, mood: "happy", hands: false } } }),
  B("1", "class", "小宇", "咚咚号，你等着。我们不会让你一个人停在别人口袋里。", { pos: { xiaoyu: { mood: "sad" } } }),

  B("2", "hall", "", "第二关　气泡", { title: 1, imagine: false, lights: "", screen: "", bubbles: 0, horn: false, pos: { lele: { x: 80, mood: "sad" }, zhuang: { x: 700, mood: "angry" }, jia: 470, yi: 580, xiaoyu: -140, akai: -140, teacher: null }, train: { x: 760, y: 400, s: 0.36 } }),
  B("2", "hall", "乐乐", "下一站……下一站还没想好。", { walk: true, pos: { lele: 120 } }),
  B("2", "hall", "壮壮", "各位旅客，乐乐站到了。乐乐站是个小车站。小车站没有人下车。", { horn: true, walk: false }),
  B("2", "hall", "", "哈哈。笑声变成气泡。", { act: 1, bubbles: 4 }),
  B("2", "hall", "小宇", "这个报站……有一点好笑。", { pos: { lele: 40, xiaoyu: 200, akai: 340 }, walk: true }),
  B("2", "hall", "阿凯", "气泡很好笑。你看乐乐想不想站在气泡里面。", { walk: false }),
  B("2", "hall", "小宇", "他不想。", { pos: { xiaoyu: { x: 200, mood: "sad" } } }),
  B("2", "hall", "壮壮", "小宇！你来报一句。你纸飞机最快。学他：请把车还给我。"),
  B("2", "hall", "小宇", "不报。不笑。", { pos: { xiaoyu: { x: 40, cover: true, mood: "happy" }, lele: 190, akai: 330, jia: 500, yi: 620, zhuang: 780 }, bubbles: "pop" }),
  B("2", "hall", "小宇", "我们不笑他。乐乐，跟我们的车走。", { pos: { xiaoyu: { x: 40, cover: false }, akai: 330, lele: 190 } }),
  B("2", "hall", "阿凯", "书包带空着也没关系。人在，站就在。"),
  B("2", "hall", "乐乐", "你们不学我报站？", { pos: { lele: { x: 250, mood: "happy" } } }),
  B("2", "hall", "小宇", "不学。真的高铁要是会说话，也会说：不笑旅客。"),
  B("2", "hall", "同学甲", "那我也不学了。", { bubbles: "pop" }),
  B("2", "hall", "同学乙", "小车站那句我说错了。乐乐走路，就只是乐乐走路。", { bubbles: 0, pos: { jia: null, yi: null } }),
  B("2", "hall", "壮壮", "哼。没劲。车还在我这儿。", { horn: false }),
  B("2", "hall", "", "他拍拍口袋，跑掉了。", { act: 1, pos: { zhuang: 1000 }, walk: true, train: { x: 1040, y: 410, s: 0.36 } }),
  B("2", "hall", "乐乐", "他还是不还。", { walk: false, pos: { lele: { mood: "sad" } } }),
  B("2", "hall", "小宇", "这一关我们做到了。气泡靠笑声变大。我们不吹气，气泡就破。下一关，让老师的哨子响。"),
  B("2", "hall", "", "远处，哨子响了一声。", { act: 1 }),

  B("3", "yard", "", "第三关　中止", { title: 1, bubbles: 0, horn: false, imagine: false, missile: "hide", train: null, pos: { jia: 140, lele: { x: 270, mood: "happy" }, akai: 400, xiaoyu: 530, zhuang: null, teacher: null }, ball: { x: 80, y: 400 } }),
  B("3", "yard", "乐乐", "规则写在地上呢。踢完，到队尾，像列车回库。"),
  B("3", "yard", "壮壮", "我先踢。我最长。最长的车厢挂在最前面。", { pos: { zhuang: { x: 180, mood: "angry" } }, ball: { x: 200, y: 405 }, train: { x: 230, y: 430, s: 0.34 }, walk: true }),
  B("3", "yard", "阿凯", "最长也要进站。你排我后面。", { walk: false }),
  B("3", "yard", "壮壮", "站台是我说了算。乐乐，你那么小，球会把你滚扁。走开。"),
  B("3", "yard", "乐乐", "我排着队。我也要踢。"),
  B("3", "yard", "壮壮", "看见没有？让开站台。", { pos: { lele: { x: 360, mood: "sad" }, zhuang: 150 }, walk: true }),
  B("3", "yard", "仪表", "倒计时。三。", { imagine: true, missile: "arm", count: "3", rocket: "gray", rocketText: "", walk: false, pos: { xiaoyu: { x: 30, y: 0, mood: "angry", hands: true }, akai: { x: 530, y: 0 }, lele: null, zhuang: null, jia: null, teacher: null } }),
  B("3", "yard", "小宇", "他推了乐乐。我可以让这枚比他更快——"),
  B("3", "yard", "仪表", "二。", { missile: "two", count: "2" }),
  B("3", "yard", "阿凯", "中止！打向同学的那一下，取消。", { missile: "abort", pos: { akai: { x: 500, y: -24 } }, walk: true }),
  B("3", "yard", "", "导弹留在井里，变成橙色的呼叫弹。", { act: 1, missile: "orange", rocket: "orange", rocketText: "呼叫", count: "2", walk: false }),
  B("3", "yard", "小宇", "可是他推人。", { pos: { xiaoyu: { x: 30, hands: false, mood: "sad" } } }),
  B("3", "yard", "阿凯", "这枚留下。它以后只负责叫人来。现在先回到操场。用嘴。用腿。去找真的塔台。"),
  B("3", "yard", "小宇", "那怎么办？球在他脚下。人被他推开了。", { imagine: false, missile: "hide", pos: { jia: { x: 40, y: 0 }, zhuang: { x: 170, y: 0, mood: "angry" }, lele: { x: 360, y: 0, mood: "sad" }, akai: { x: 510, y: 0, hands: false }, xiaoyu: { x: 660, y: 0, mood: "sad", hands: false } } }),
  B("3", "yard", "阿凯", "把倒计时换成三句人话。看着他。短。大声。"),
  B("3", "yard", "小宇", "壮壮，请停下。", { pos: { xiaoyu: { hands: true, mood: "happy" } } }),
  B("3", "yard", "阿凯", "请停下。", { pos: { akai: { hands: true } } }),
  B("3", "yard", "乐乐", "请停下。球是排队的人的。", { pos: { lele: { hands: true, mood: "happy" } } }),
  B("3", "yard", "壮壮", "三个小不点叫停？我又没打你们。我先玩一会儿。"),
  B("3", "yard", "小宇", "你推了乐乐。咚咚号还在你口袋里。我们改航。我们去找林老师。"),
  B("3", "yard", "壮壮", "找老师就是告状。告状的人排最后。"),
  B("3", "yard", "小宇", "告诉老师，是呼叫塔台。飞机遇到事，就呼叫。我们走。", { walk: true, pos: { xiaoyu: { x: 430, hands: false }, akai: { x: 580, hands: false }, lele: { x: 730, hands: false }, jia: null } }),
  B("3", "yard", "", "远处哨声响起。", { act: 1, walk: false, pos: { teacher: 860 } }),

  B("4", "class", "", "第四关　塔台", { title: 1, imagine: false, missile: "hide", lights: "3", ball: null, pos: { xiaoyu: { x: 20, y: 0, hands: false, mood: "happy" }, akai: { x: 160, y: 0, hands: false }, lele: { x: 300, y: 0, hands: false, mood: "sad" }, teacher: { x: 740, y: 0 }, zhuang: null, jia: null }, train: { x: 980, y: 420, s: 0.34 } }),
  B("4", "class", "林老师", "你们三节车厢一起进站。发生什么事了？"),
  B("4", "class", "乐乐", "老师，咚咚号在壮壮口袋里。他说要拆成积木。走廊里他学我报站。操场上他不排队，还往前冲，我只好自己刹车。"),
  B("4", "class", "林老师", "谢谢你说得这么清楚。那一下，身上疼吗？"),
  B("4", "class", "乐乐", "不很疼。我怕。我怕下一次车就散了。"),
  B("4", "class", "林老师", "怕，就要呼叫。小宇，你当时想做什么？"),
  B("4", "class", "小宇", "我想发射。脑子里井盖都打开了。阿凯跳上去，按了中止。后来我们说了「请停下」，就来找你。"),
  B("4", "class", "林老师", "中止按得对。话说得对。找到我也对。要是真的对推回去，操场会变成两列车对开。球还是没人好好踢。"),
  B("4", "class", "林老师", "壮壮，把咚咚号拿出来，放回桌面这条轨道上。让大家看见它还是一整列。", { pos: { zhuang: { x: 500, mood: "sad" } }, train: { x: 530, y: 390, s: 0.45 } }),
  B("4", "class", "", "车厢还连着，放回轨道。", { act: 1, train: { x: 280, y: 352, s: 1, r: 0 } }),
  B("4", "class", "壮壮", "我又没拆。我就是想让它在我口袋里开。他们都有人一起排。乐乐老抱着一列车，我不拿，他都不看我。"),
  B("4", "class", "林老师", "你想一起玩。这句话是真的。拿别人的车、学别人的报站、把人推出队伍，这三件会让人害怕。人一害怕，站台就会空。"),
  B("4", "class", "壮壮", "那我嘴上怎么说？"),
  B("4", "class", "林老师", "先把车留在轨道上。再学一句。看着乐乐：我想一起玩，可以排队吗？"),
  B("4", "class", "壮壮", "我想一起玩……可以排队吗？", { pos: { zhuang: { mood: "sad" }, lele: { mood: "happy" } } }),
  B("4", "class", "乐乐", "可以。排在队尾。咚咚号也从队尾发车。"),
  B("4", "class", "林老师", "现在学塔台口令。拍三下手。看片子的小朋友也可以拍。", { pos: { teacher: { clap: true } } }),
  B("4", "class", "林老师", "第一声，悬停。看着对方，说短句：请停下。"),
  B("4", "class", "小宇、阿凯、乐乐", "请停下。", { pos: { xiaoyu: { hands: true, clap: true }, akai: { hands: true, clap: true }, lele: { hands: true, clap: true } } }),
  B("4", "class", "林老师", "第二声，改航。不还手。离开那里，拉上一个朋友一起走。", { pos: { teacher: { clap: false } } }),
  B("4", "class", "小宇、阿凯、乐乐", "改航。拉上朋友。"),
  B("4", "class", "林老师", "第三声，呼叫塔台。马上告诉老师。回到家，再告诉爸爸妈妈。"),
  B("4", "class", "小宇、阿凯、乐乐", "呼叫塔台。告诉爸爸妈妈。"),
  B("4", "class", "", "脚跟被踩到。仪表显示：意外。", { act: 1, imagine: true, lights: "accident", screen: "" }),
  B("4", "class", "阿凯", "对不起。我看着手，没看着你的脚。", { imagine: false, lights: "3", pos: { akai: { mood: "sad", clap: false, hands: false } } }),
  B("4", "class", "小宇", "我不害怕。你也不是一次又一次故意的。灯不亮。", { pos: { xiaoyu: { mood: "happy", hands: false, clap: false }, lele: { clap: false, hands: false } } }),
  B("4", "class", "林老师", "不小心碰到别人，马上说对不起，那是意外。霸凌是另一件事：故意，一次又一次，让别人害怕、难过。三盏都亮，才用这三声。"),
  B("4", "class", "林老师", "我们把三声再送一遍。看片子的人跟着拍。", { pos: { teacher: { clap: true } } }),
  B("4", "class", "林老师", "请停下。\n拉上朋友，改航。\n呼叫塔台，告诉爸爸妈妈。", { pos: { xiaoyu: { clap: true }, akai: { clap: true }, lele: { clap: true }, zhuang: { clap: true } } }),
  B("4", "class", "林老师", "小宇，你要是再想倒计时，可以在脑子里数。数到二，就按中止。中止以后，做这三声。想象用来壮胆。三声用来保护朋友。", { pos: { teacher: { clap: false }, xiaoyu: { clap: false }, akai: { clap: false }, lele: { clap: false }, zhuang: { clap: false } } }),
  B("4", "class", "小宇", "数到二，就中止。然后：停下，改航，呼叫。我记住了。"),

  B("5", "yard", "", "第五关　发车", { title: 1, imagine: false, lights: "", missile: "hide", screen: "", pos: { lele: { x: 180, y: 0, mood: "happy", clap: false, hands: false }, akai: { x: 320, y: 0, clap: false, hands: false }, xiaoyu: { x: 460, y: 0, clap: false, hands: false }, zhuang: null, teacher: { x: 820, y: 0, clap: false }, jia: null, yi: null }, ball: { x: 90, y: 400 }, train: { x: 210, y: 340, s: 0.42 } }),
  B("5", "yard", "", "壮壮又想插到球前面。", { act: 1, pos: { zhuang: { x: 120, y: 0, mood: "angry" } }, walk: true }),
  B("5", "yard", "小宇", "三。二。中止。", { imagine: true, missile: "shut", count: "2", rocket: "orange", rocketText: "呼叫", walk: false, pos: { xiaoyu: { x: 60, y: -10 } } }),
  B("5", "yard", "小宇、阿凯、乐乐", "请停下！", { imagine: false, missile: "hide", pos: { xiaoyu: { x: 460, y: 0, hands: true, mood: "happy" }, akai: { hands: true }, lele: { hands: true } } }),
  B("5", "yard", "", "他们拉着手走开，向老师呼叫。", { act: 1, walk: true, pos: { zhuang: 40, lele: 200, akai: 340, xiaoyu: { x: 490, hands: true } } }),
  B("5", "yard", "", "信号弹向上飞，烟写成：找老师。", { act: 1, imagine: true, missile: "up", walk: false }),
  B("5", "yard", "壮壮", "我就是想先踢一脚。", { imagine: false, missile: "hide", pos: { zhuang: { x: 140, mood: "sad" } } }),
  B("5", "yard", "小宇", "想踢，就说那句。"),
  B("5", "yard", "壮壮", "我想一起玩。可以排队吗？"),
  B("5", "yard", "乐乐", "可以。排在小宇后面。踢完，回队尾。", { pos: { lele: { hands: false } } }),
  B("5", "yard", "阿凯", "队尾有位置。最长的也能排进去。", { pos: { akai: { hands: false } } }),
  B("5", "yard", "", "壮壮走到队尾。", { act: 1, pos: { zhuang: { x: 640, mood: "happy" }, xiaoyu: { hands: false } }, walk: true, ball: { x: 170, y: 400 } }),
  B("5", "yard", "乐乐", "各位旅客，这趟可以开了。", { walk: false, ball: { x: 300, y: 400 } }),
  B("5", "yard", "壮壮", "这球会回来。排队也能踢到。", { ball: { x: 620, y: 400 }, walk: true }),
  B("5", "yard", "小宇", "三辆一起发车。谁也不抄谁的道。", { walk: false, plane: { x: 150, y: 390, s: 0.9 }, train: { x: 300, y: 380, s: 1 }, ball: { x: 480, y: 400 } }),
  B("5", "yard", "", "纸飞机给列车开道。叮。", { act: 1, plane: { x: 250, y: 370, r: 14, s: 0.85 } }),
  B("5", "yard", "乐乐", "下一站，朋友站。"),
  B("5", "yard", "林老师", "这颗星，因为你们保护了朋友。壮壮，你今天把那句说完了，也回到了队尾。你的星，等你连续三天都这样排队，再来贴。公平要练，不止练一次。", { stars: [[210, 250], [350, 250], [490, 250]] }),
  B("5", "yard", "壮壮", "三天就三天。我跑得快。排队也可以很快地排好。"),
  B("5", "yard", "小宇", "我昨天差点发射。今天数到二，我就中止了。星亮着，是因为乐乐还在队里，咚咚号还是一整列。"),
  B("5", "yard", "林老师", "我们把检查和口令留在嘴巴里，带回家。", { pos: { xiaoyu: { clap: true }, akai: { clap: true }, lele: { clap: true }, zhuang: { clap: true }, teacher: { clap: true } } }),
  B("5", "yard", "小宇、阿凯、乐乐、壮壮", "第一盏，是故意的吗？\n第二盏，是一次又一次吗？\n第三盏，对方害怕、难过吗？"),
  B("5", "yard", "小宇、阿凯、乐乐、壮壮", "请停下！\n拉上朋友，改航！\n呼叫塔台！告诉爸爸妈妈！"),
  B("5", "map", "小宇", "三，二，一。改航。", { endcard: true, stars: null, pos: { xiaoyu: null, akai: null, lele: null, zhuang: null, teacher: null, jia: null, yi: null }, plane: { x: 160, y: 330, s: 1.1 }, train: { x: 400, y: 350, s: 1 }, ball: { x: 680, y: 360 } }),
  B("5", "map", "", "终", { title: 1, endcard: true }),
  B("5", "map", "", "下一站，朋友站", { title: 1, endcard: true, ms: 5200 })
];

const WHO = {
  "小宇": ["xiaoyu"],
  "阿凯": ["akai"],
  "乐乐": ["lele"],
  "壮壮": ["zhuang"],
  "林老师": ["teacher"],
  "同学甲": ["jia"],
  "同学乙": ["yi"],
  "小宇、阿凯、乐乐": ["xiaoyu", "akai", "lele"],
  "小宇、阿凯、乐乐、壮壮": ["xiaoyu", "akai", "lele", "zhuang"]
};
const CHNAME = { "0": "序幕", "1": "第一关", "2": "第二关", "3": "第三关", "4": "第四关", "5": "第五关" };
const ACTORS = [
  ["xiaoyu", "小宇", "#3d7eff", '<path d="M96 146 l16 -4 -7 7 9 1 -14 6z" fill="#ffd166" stroke="#1b1b1b" stroke-width="2"/>'],
  ["akai", "阿凯", "#3cbf7a", '<circle cx="66" cy="80" r="10" fill="none" stroke="#1b1b1b" stroke-width="3"/><circle cx="96" cy="80" r="10" fill="none" stroke="#1b1b1b" stroke-width="3"/><path d="M76 80 H86" stroke="#1b1b1b" stroke-width="3"/>'],
  ["lele", "乐乐", "#ff8a5b", '<rect x="112" y="128" width="24" height="28" rx="4" fill="#ffd166" stroke="#1b1b1b" stroke-width="3"/><text x="124" y="147" font-size="11" text-anchor="middle" fill="#1b1b1b">咚</text>'],
  ["zhuang", "壮壮", "#ef4d4d", ""],
  ["teacher", "林老师", "#7c6bff", '<circle cx="112" cy="150" r="8" fill="#ffd166" stroke="#1b1b1b" stroke-width="3"/>'],
  ["jia", "甲", "#ffd166", ""],
  ["yi", "乙", "#ff8ad4", ""]
];

let t = 0;
let playing = true;
let last = 0;
let beatIndex = -1;
let scrubbing = false;
const sticky = {};
const positions = {};
const props = { plane: null, train: null, ball: null };
const STICKY_KEYS = ["imagine", "missile", "bubbles", "lights", "horn", "screen", "endcard", "stars", "count", "rocket", "rocketText", "walk"];

function resetSticky() {
  sticky.imagine = false;
  sticky.missile = "hide";
  sticky.bubbles = 0;
  sticky.lights = "";
  sticky.horn = false;
  sticky.screen = "";
  sticky.endcard = false;
  sticky.stars = null;
  sticky.count = "";
  sticky.rocket = "gray";
  sticky.rocketText = "";
  sticky.walk = false;
  ACTORS.forEach(function (a) { positions[a[0]] = null; });
  props.plane = null;
  props.train = null;
  props.ball = null;
}

function buildTimes() {
  let acc = 0;
  beats.forEach(function (b) {
    b.start = acc;
    acc += b.ms;
    b.end = acc;
  });
  return acc;
}
const total = buildTimes();

function indexAt(ms) {
  let lo = 0;
  let hi = beats.length - 1;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (beats[mid].start <= ms) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

function makeActor(id, name, shirt, extra) {
  const el = document.createElement("div");
  el.className = "actor";
  el.id = id;
  el.dataset.mood = "happy";
  el.innerHTML =
    '<div class="bob"><svg viewBox="0 0 160 230">' +
    '<ellipse cx="80" cy="214" rx="34" ry="7" fill="rgba(0,0,0,.18)"/>' +
    '<text x="80" y="20" text-anchor="middle" font-size="18" font-weight="700" fill="#1b1b1b">' + name + "</text>" +
    '<rect x="58" y="176" width="14" height="28" rx="6" fill="#2c2c2c" stroke="#1b1b1b" stroke-width="3"/>' +
    '<rect x="88" y="176" width="14" height="28" rx="6" fill="#2c2c2c" stroke="#1b1b1b" stroke-width="3"/>' +
    '<rect x="48" y="120" width="64" height="64" rx="16" fill="' + shirt + '" stroke="#1b1b1b" stroke-width="4"/>' +
    '<circle cx="80" cy="78" r="36" fill="#ffd2ad" stroke="#1b1b1b" stroke-width="4"/>' +
    '<path d="M46 72 Q80 36 114 72 Q98 52 80 50 Q62 52 46 72" fill="#2b2b2b"/>' +
    '<path class="brow brow-l" d="M56 66 L74 72" stroke="#1b1b1b" stroke-width="3" fill="none"/>' +
    '<path class="brow brow-r" d="M86 72 L104 66" stroke="#1b1b1b" stroke-width="3" fill="none"/>' +
    '<circle cx="66" cy="82" r="4.5" fill="#1b1b1b"/>' +
    '<circle cx="96" cy="82" r="4.5" fill="#1b1b1b"/>' +
    '<path class="mouth mouth-happy" d="M64 98 Q80 110 96 98" fill="none" stroke="#1b1b1b" stroke-width="3" stroke-linecap="round"/>' +
    '<path class="mouth mouth-sad" d="M64 106 Q80 94 96 106" fill="none" stroke="#1b1b1b" stroke-width="3" stroke-linecap="round"/>' +
    (extra || "") +
    '<rect class="arm arm-l" x="34" y="132" width="18" height="48" rx="9" fill="#ffd2ad" stroke="#1b1b1b" stroke-width="4"/>' +
    '<rect class="arm arm-r" x="108" y="132" width="18" height="48" rx="9" fill="#ffd2ad" stroke="#1b1b1b" stroke-width="4"/>' +
    "</svg></div>";
  document.getElementById("cast").appendChild(el);
}

function placeProp(el, p) {
  if (!p) {
    el.style.display = "none";
    return;
  }
  el.style.display = "block";
  const r = p.r || 0;
  const s = p.s || 1;
  el.style.transform = "translate(" + p.x + "px," + p.y + "px) rotate(" + r + "deg) scale(" + s + ")";
}

function apply(b) {
  STICKY_KEYS.forEach(function (k) {
    if (Object.prototype.hasOwnProperty.call(b, k)) sticky[k] = b[k];
  });
  ["plane", "train", "ball"].forEach(function (k) {
    if (Object.prototype.hasOwnProperty.call(b, k)) props[k] = b[k];
  });
  if (b.pos) {
    Object.keys(b.pos).forEach(function (id) {
      const v = b.pos[id];
      if (v == null) {
        positions[id] = null;
        return;
      }
      const prev = positions[id] || { mood: "happy" };
      const next = typeof v === "number" ? { x: v } : v;
      positions[id] = {
        x: next.x != null ? next.x : prev.x,
        y: next.y != null ? next.y : prev.y,
        mood: next.mood || prev.mood || "happy",
        cover: !!next.cover,
        hands: !!next.hands,
        clap: !!next.clap,
        shadow: !!next.shadow
      };
    });
  }
  const stage = document.getElementById("stage");
  stage.dataset.scene = b.scene;
  stage.dataset.imagine = sticky.imagine ? "1" : "0";
  stage.dataset.missile = sticky.missile || "hide";
  stage.dataset.bubbles = String(sticky.bubbles || 0);
  stage.dataset.lights = sticky.lights == null ? "" : String(sticky.lights);
  stage.dataset.end = sticky.endcard ? "1" : "0";
  document.getElementById("who").textContent = b.who || "";
  document.getElementById("line").textContent = b.sub || "";
  document.getElementById("tag").textContent = CHNAME[b.ch] || "";
  document.getElementById("count").textContent = sticky.count || "";
  const rocket = document.getElementById("rocket");
  rocket.textContent = sticky.rocketText || "";
  rocket.className = sticky.rocket === "orange" ? "orange" : "gray";
  const screen = document.getElementById("screen");
  screen.textContent = sticky.screen || "";
  screen.classList.toggle("on", !!sticky.screen);
  document.getElementById("lamps").classList.toggle("hot", b.who === "仪表");
  const speakers = WHO[b.who] || [];
  ACTORS.forEach(function (a) {
    const id = a[0];
    const el = document.getElementById(id);
    const p = positions[id];
    el.classList.toggle("on", !!p);
    el.classList.toggle("walk", !!sticky.walk && !!p);
    el.classList.toggle("speak", speakers.indexOf(id) >= 0);
    if (!p) return;
    el.dataset.mood = p.mood || "happy";
    el.classList.toggle("cover", !!p.cover);
    el.classList.toggle("hands", !!p.hands);
    el.classList.toggle("clap", !!p.clap);
    el.classList.toggle("shadow", !!p.shadow);
    el.style.transform = "translate(" + (p.x || 0) + "px," + (p.y || 0) + "px)";
  });
  placeProp(document.getElementById("plane"), props.plane);
  placeProp(document.getElementById("train"), props.train);
  placeProp(document.getElementById("ball"), props.ball);
  const horn = document.getElementById("horn");
  const z = positions.zhuang;
  if (sticky.horn && z) {
    horn.style.display = "block";
    horn.style.transform = "translate(" + (z.x + 78) + "px,168px)";
  } else horn.style.display = "none";
  const starEls = document.querySelectorAll(".star");
  starEls.forEach(function (el, i) {
    const s = sticky.stars && sticky.stars[i];
    if (!s) {
      el.style.display = "none";
      return;
    }
    el.style.display = "block";
    el.style.transform = "translate(" + s[0] + "px," + s[1] + "px)";
  });
  document.querySelectorAll("#chapters button").forEach(function (btn) {
    btn.setAttribute("aria-current", btn.dataset.ch === b.ch ? "true" : "false");
  });
}

function fmt(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

function paintUi() {
  const clock = document.getElementById("clock");
  const scrub = document.getElementById("scrub");
  const play = document.getElementById("play");
  clock.textContent = fmt(t) + " / " + fmt(total);
  if (!scrubbing) scrub.value = String(Math.round((t / total) * 1000));
  play.textContent = t >= total ? "重播" : playing ? "暂停" : "播放";
}

function rebuild(ms) {
  resetSticky();
  t = Math.max(0, Math.min(total, ms));
  const i = indexAt(t);
  for (let k = 0; k <= i; k++) apply(beats[k]);
  beatIndex = i;
}

function showChapter(ch) {
  const b = beats.find(function (x) { return x.ch === String(ch); });
  if (!b) return;
  playing = true;
  rebuild(b.start);
}

window.film = {
  seek: function (ms) { rebuild(ms); playing = t < total; },
  chapter: showChapter,
  find: function (text) {
    const b = beats.find(function (x) { return (x.sub || "").indexOf(text) >= 0; });
    if (!b) return "";
    playing = false;
    rebuild(b.start);
    return b.sub;
  },
  state: function () {
    const b = beats[Math.max(0, beatIndex)];
    return { t: t, total: total, sub: b && b.sub, scene: b && b.scene, ch: b && b.ch, missile: sticky.missile, imagine: sticky.imagine };
  }
};

function frame(now) {
  if (playing) {
    if (last) t += Math.min(100, now - last);
    last = now;
  } else last = 0;
  if (t >= total) {
    t = total;
    playing = false;
  }
  const i = indexAt(t);
  if (i !== beatIndex) {
    beatIndex = i;
    apply(beats[i]);
  }
  paintUi();
  requestAnimationFrame(frame);
}

function boot() {
  const frameEl = document.getElementById("frame");
  const stage = document.getElementById("stage");
  function fit() {
    const scale = frameEl.clientWidth / 960;
    stage.style.transform = "scale(" + scale + ")";
    frameEl.style.height = 540 * scale + "px";
  }
  ACTORS.forEach(function (a) { makeActor(a[0], a[1], a[2], a[3]); });
  resetSticky();
  const hash = (location.hash || "").replace("#", "");
  if (hash && beats.some(function (b) { return b.ch === hash; })) showChapter(hash);
  else apply(beats[0]);
  fit();
  addEventListener("resize", fit);
  document.getElementById("play").addEventListener("click", function () {
    if (t >= total) {
      resetSticky();
      t = 0;
      beatIndex = -1;
    }
    playing = !playing;
  });
  const scrub = document.getElementById("scrub");
  scrub.addEventListener("pointerdown", function () { scrubbing = true; playing = false; });
  scrub.addEventListener("input", function () {
    rebuild((Number(scrub.value) / 1000) * total);
    playing = false;
  });
  addEventListener("pointerup", function () { scrubbing = false; });
  document.getElementById("chapters").addEventListener("click", function (ev) {
    const btn = ev.target.closest("button");
    if (!btn) return;
    showChapter(btn.dataset.ch);
  });
  addEventListener("keydown", function (ev) {
    if (ev.code === "Space") {
      ev.preventDefault();
      document.getElementById("play").click();
    }
  });
  requestAnimationFrame(frame);
}

document.addEventListener("DOMContentLoaded", boot);
