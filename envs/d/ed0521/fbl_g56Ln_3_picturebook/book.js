(function () {
  "use strict";

  const pages = [
    {
      title: "《小宇和安全小分队》",
      kicker: "封面",
      image: "assets/pages/page-01.svg",
      alt: "封面：小宇站在校园中央，纸飞机和高铁在身边",
      text: "<p><strong>说“停”——走安全线——报告大人——陪伙伴！</strong></p>"
    },
    {
      title: "像一座小小交通城",
      kicker: "第2页",
      image: "assets/pages/page-02.svg",
      alt: "校园像一座小小交通城，教学楼像车站",
      text: "<p>阳光小学开学啦！</p><p>小宇觉得，校园像一座小小的交通城：教室是车站，操场是广场，彩色小路就是安全的铁轨。</p>"
    },
    {
      title: "安全小分队成立",
      kicker: "第3页",
      image: "assets/pages/page-03.svg",
      alt: "小宇在教室角落搭起纸盒指挥中心",
      text: "<p>小宇最喜欢飞机和高铁。</p><p>他搭了一个小小的指挥中心，宣布：</p><p>“今天起，我们就是校园安全小分队！”</p>"
    },
    {
      title: "三个交通伙伴",
      kicker: "第4页",
      image: "assets/pages/page-04.svg",
      alt: "纸飞机、高铁和预警雷达三个交通伙伴",
      text: "<p>小飞机负责观察，小高铁负责带大家去安全站，预警雷达负责提醒大家找大人。</p><p>雷达上的盾牌图标只预警，不攻击。</p>"
    },
    {
      title: "一次小意外",
      kicker: "第5页",
      image: "assets/pages/page-05.svg",
      alt: "豆豆画高铁时，大壮不小心碰掉了画本",
      text: "<p>豆豆正在画一列长长的高铁。</p><p>大壮转身时，不小心碰掉了他的画本。</p><p>“哎呀，对不起！我不是故意的。”大壮说。</p>"
    },
    {
      title: "道歉和改正",
      kicker: "第6页",
      image: "assets/pages/page-06.svg",
      alt: "大壮和豆豆一起捡起画本",
      text: "<p>“没关系，我们一起捡起来吧。”豆豆说。</p><p>小飞机亮起了绿色的小灯：“这是一次意外。愿意道歉，也愿意改正，事情就能解决。”</p>"
    },
    {
      title: "高铁游戏开始",
      kicker: "第7页",
      image: "assets/pages/page-07.svg",
      alt: "孩子们准备一起玩高铁游戏",
      text: "<p>下课了，豆豆把高铁模型放到彩色线路上。</p><p>小宇说：“我们来玩高铁游戏吧！”</p><p>大家都想让高铁安全到站。</p>"
    },
    {
      title: "高铁被拿走",
      kicker: "第8页",
      image: "assets/pages/page-08.svg",
      alt: "大壮拿走了豆豆的高铁模型",
      text: "<p>大壮走过来，拿走了豆豆的高铁。</p><p>“这个高铁归我了！你画得真慢，像一辆停不动的小火车！”</p><p>豆豆小声说：“请把高铁还给我，我还在玩。”</p>"
    },
    {
      title: "安全路线被挡住",
      kicker: "第9页",
      image: "assets/pages/page-09.svg",
      alt: "大壮挡住黄色安全线，豆豆感到紧张",
      text: "<p>“我就不还！你也不能参加我们的游戏！”大壮说。</p><p>他站在黄色安全线前，挡住了豆豆。</p><p>小宇没有冲过去抢东西。</p>"
    },
    {
      title: "红色预警",
      kicker: "第10页",
      image: "assets/pages/page-10.svg",
      alt: "高铁又被拿走，预警雷达亮起红色盾牌",
      text: "<p>过了一会儿，大壮又一次拿走了高铁。</p><p>豆豆说：“我不喜欢这样……我有点害怕。”</p><p>预警雷达发出轻轻的“嘀、嘀”声：“伤害反复发生了，豆豆一个人很难解决。”</p>"
    },
    {
      title: "这不是普通玩笑",
      kicker: "第11页",
      image: "assets/pages/page-11.svg",
      alt: "三个红色预警线索：不喜欢、被拿走、被挡住",
      text: "<p>小宇看清了三个线索：豆豆说了“不喜欢”；高铁又一次被拿走；豆豆的安全线又一次被挡住。</p><p>“反复伤害别人，让别人害怕，这就不是普通的玩笑了。我们要找大人帮忙。”</p>"
    },
    {
      title: "第一步，说“停”",
      kicker: "第12页",
      image: "assets/pages/page-12.svg",
      alt: "豆豆站稳并做出停止手势",
      text: "<p>豆豆深呼吸，站稳身体。</p><p>在安全的时候，他清楚地说：</p><p><strong>“我不喜欢你抢我的东西。请停止！”</strong></p>"
    },
    {
      title: "第二步，走安全线",
      kicker: "第13页",
      image: "assets/pages/page-13.svg",
      alt: "小宇和豆豆沿黄色安全线走向安全站",
      text: "<p>小高铁亮起车灯：“第二步，走安全线！”</p><p>豆豆和小宇离开让人不舒服的地方，沿着黄色线路，走向老师能看见的安全站。</p>"
    },
    {
      title: "不安全时，直接离开",
      kicker: "第14页",
      image: "assets/pages/page-14.svg",
      alt: "黄色安全线变亮，孩子们直接离开危险处",
      text: "<p>预警雷达提醒：“如果现场不安全，可以不说‘请停止’，直接离开，马上找大人。”</p><p>小宇说：“我们不推、不打，也不抢回东西。安全最重要！”</p>"
    },
    {
      title: "第三步，报告大人",
      kicker: "第15页",
      image: "assets/pages/page-15.svg",
      alt: "小飞机带着四张报告线索卡片飞向老师",
      text: "<p>小飞机说：“第三步，报告大人。说清楚谁做了什么，在哪里发生，发生了几次，还有你的感受。”</p><p>豆豆练习说：“大壮连续两次抢我的高铁，还挡住我。我感到害怕。”</p>"
    },
    {
      title: "第四步，陪伙伴",
      kicker: "第16页",
      image: "assets/pages/page-16.svg",
      alt: "小宇和豆豆并肩走向老师",
      text: "<p>小宇说：“第四步，陪伙伴！”</p><p>看见同伴遇到伤害，不围观，不起哄，不跟着笑，也不要一个人去争斗。</p><p>陪他一起找老师，就是很勇敢的帮助。</p>"
    },
    {
      title: "安全站里的老师",
      kicker: "第17页",
      image: "assets/pages/page-17.svg",
      alt: "老师在安全站平视并安慰豆豆和小宇",
      text: "<p>老师认真听豆豆说完。</p><p>“谢谢你们告诉我。来求助不是告状，而是在保护自己和同伴。”</p><p>“豆豆，你没有做错什么。”</p>"
    },
    {
      title: "学会新的游戏规则",
      kicker: "第18页",
      image: "assets/pages/page-18.svg",
      alt: "老师和孩子们一起制定轮流、询问、停止的规则",
      text: "<p>老师说：“想参加游戏，可以先问：‘我能一起玩吗？’不能抢东西，也不能把别人赶走。”</p><p>大壮说：“对不起。我会先问，听到你说‘不喜欢’就停止。”</p>"
    },
    {
      title: "友善高铁出发",
      kicker: "第19页",
      image: "assets/pages/page-19.svg",
      alt: "大壮排队询问，三个孩子一起让友善高铁出发",
      text: "<p>大壮排在队伍最后，耐心等待。</p><p>“我能一起玩吗？”</p><p>“可以！”豆豆笑着说。</p><p>高铁沿着安全线路出发了：“呜——安全到站！”</p>"
    },
    {
      title: "勇气宣言",
      kicker: "第20页",
      image: "assets/pages/page-20.svg",
      alt: "夕阳下，孩子们和交通伙伴一起做出安全宣言",
      text: "<p>“遇到霸凌不是你的错。真正的勇敢，是保护自己，也用安全的方法帮助别人。”</p><p><strong>说“停”——走安全线——报告大人——陪伙伴！</strong></p><p>看见友善，就一起加入；看见伤害，就及时求助。</p>"
    }
  ];

  const image = document.getElementById("pageImage");
  const kicker = document.getElementById("pageKicker");
  const title = document.getElementById("pageTitle");
  const text = document.getElementById("pageText");
  const pageNumber = document.getElementById("pageNumber");
  const progress = document.getElementById("pageProgress");
  const previous = document.getElementById("prevButton");
  const next = document.getElementById("nextButton");
  const restart = document.getElementById("restartButton");
  const sound = document.getElementById("soundButton");
  let currentPage = 0;

  function renderPage(index) {
    currentPage = Math.max(0, Math.min(index, pages.length - 1));
    const page = pages[currentPage];
    image.src = page.image;
    image.alt = page.alt;
    kicker.textContent = page.kicker;
    title.textContent = page.title;
    text.innerHTML = page.text;
    pageNumber.textContent = `第${currentPage + 1}页 / 共${pages.length}页`;
    progress.value = currentPage + 1;
    previous.disabled = currentPage === 0;
    next.disabled = currentPage === pages.length - 1;
    document.title = `${page.title}｜小宇和安全小分队`;
    window.location.hash = `page-${String(currentPage + 1).padStart(2, "0")}`;
  }

  previous.addEventListener("click", () => renderPage(currentPage - 1));
  next.addEventListener("click", () => renderPage(currentPage + 1));
  restart.addEventListener("click", () => renderPage(0));
  progress.addEventListener("click", (event) => {
    const rect = progress.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    renderPage(Math.round(ratio * (pages.length - 1)));
  });
  sound.addEventListener("click", () => {
    const isOn = sound.getAttribute("aria-pressed") !== "true";
    sound.setAttribute("aria-pressed", String(isOn));
    sound.textContent = isOn ? "阅读提示：关" : "阅读提示：开";
    document.querySelector(".reading-note").hidden = isOn;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      renderPage(currentPage - 1);
    }
    if (event.key === "ArrowRight") {
      renderPage(currentPage + 1);
    }
  });

  const hashMatch = window.location.hash.match(/page-(\d+)/);
  renderPage(hashMatch ? Number(hashMatch[1]) - 1 : 0);
})();
