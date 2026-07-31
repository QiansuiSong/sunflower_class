// 向日葵中班：全部可扩展内容集中在此文件。
// 后续增加角色、事件、结局时，优先只修改本文件。

const GAME_DATA = {
  title: "向日葵中班",
  subtitle: "新学期生存与交友记录",
  maxDays: 18,
  initialStats: { courage: 1, kindness: 1, creativity: 1, order: 1, energy: 5 },
  statLabels: { courage: "勇气", kindness: "体贴", creativity: "灵感", order: "靠谱", energy: "精力" },
  characters: [
    { id:"qaq", name:"QAQ丨", icon:"丨", trait:"看起来随时在发呆，其实会默默记住每个人的习惯。", likes:"安静陪伴、游戏、意外的小惊喜" },
    { id:"diandian", name:"点点", icon:"·", trait:"行动快，主意多，遇到热闹一定会冲到最前面。", likes:"新鲜事、比赛、被认真回应" },
    { id:"moto", name:"蘑托车", icon:"菇", trait:"胜负心很强，嘴上不服输，真正遇到麻烦时却很可靠。", likes:"挑战、竞速、明确的规则" },
    { id:"huahua", name:"花花", icon:"花", trait:"擅长发现别人忽略的小东西，也很会把普通日子变漂亮。", likes:"手工、布置、被信任审美" },
    { id:"momo", name:"馍馍", icon:"馍", trait:"稳稳当当，常常先照顾大家有没有吃饱。", likes:"分享食物、实用方案、慢慢聊天" },
    { id:"niko", name:"妮蔻", icon:"妮", trait:"观察力敏锐，喜欢试探规则边界，但不会真的让朋友难堪。", likes:"谜题、秘密计划、有趣的反转" },
    { id:"taoba", name:"桃爸", icon:"桃", trait:"有保护欲，习惯先确认所有人是否安全。", likes:"照顾人、修理东西、被托付" },
    { id:"puff", name:"泡芙", icon:"芙", trait:"情绪写在脸上，开心和委屈都来得快，真诚得没有死角。", likes:"甜食、夸奖、一起完成小目标" },
    { id:"huan", name:"欢佬", icon:"欢", trait:"看起来很会摸鱼，关键时刻却总能提出最省力的办法。", likes:"轻松氛围、聪明捷径、不被催" },
    { id:"xizhou", name:"西洲", icon:"洲", trait:"表达克制，做事有自己的节奏，答应的事情一定会完成。", likes:"安静工作、清晰分工、长线计划" },
    { id:"latiao", name:"辣条", icon:"辣", trait:"说话直接，热情也直接，最讨厌大家有话不说。", likes:"坦率沟通、热闹活动、共同吐槽" },
    { id:"cutie", name:"小可爱", icon:"爱", trait:"擅长调节气氛，但并不只是负责可爱，也有很强的坚持。", likes:"合作、纪念品、认真对待承诺" }
  ],
  chapters: [
    { day:1, title:"转学生报到", text:"你抱着新书包站在向日葵中班门口。这里没有固定座位，窗边堆着半成品手工，黑板上写着：『本学期目标——让每个人都留下值得记住的事。』" },
    { day:6, title:"活动周开始", text:"班级决定举办活动周。大家第一次需要把各自的想法拼成同一件事，原本轻松的相处也开始出现分歧。" },
    { day:12, title:"暴雨与停电", text:"一场突如其来的暴雨打乱了准备。教室停电，仓库进水，活动是否还能继续，取决于之前积累下来的信任。" },
    { day:17, title:"学期最后两天", text:"颁奖前，大家开始整理本学期的物品。很多不起眼的选择，在这时显出了真正的意义。" }
  ],
  dailyActions: [
    { id:"help", title:"帮忙处理班务", desc:"整理、修补、跑腿。稳定但消耗精力。", energy:-1, stats:{order:1,kindness:1}, bonds:["taoba","xizhou","momo"] },
    { id:"play", title:"加入课间游戏", desc:"输赢不重要——至少大家嘴上这么说。", energy:-1, stats:{courage:1}, bonds:["qaq","moto","diandian"] },
    { id:"create", title:"制作活动道具", desc:"把废纸、胶带和奇怪灵感变成作品。", energy:-1, stats:{creativity:1}, bonds:["huahua","puff","cutie"] },
    { id:"chat", title:"在走廊聊天", desc:"有时真正重要的信息不在会议里。", energy:0, stats:{kindness:1}, bonds:["latiao","niko","huan"] },
    { id:"rest", title:"安静休息", desc:"坐到窗边，看一会儿云。", energy:2, stats:{}, bonds:["qaq","xizhou"] }
  ],
  events: [
    {
      id:"seat", day:[1,2], title:"没有固定座位的教室", characters:["qaq","diandian"],
      text:"点点招手让你坐到热闹的桌边，QAQ丨则把窗边空着的椅子往外推了一点。两边都没有催你。",
      choices:[
        { text:"先去热闹的桌边认识大家", effects:{stats:{courage:1}, bonds:{diandian:2,moto:1,latiao:1}}, result:"你很快记住了几个人的名字，也被迫参加了一轮规则还没听懂的游戏。" },
        { text:"坐到窗边，和QAQ丨慢慢熟悉", effects:{stats:{kindness:1}, bonds:{qaq:3,xizhou:1}}, flags:["window_seat"], result:"QAQ丨没有主动介绍自己，只把多余的一支笔放到你手边。下课时，你已经不再觉得沉默尴尬。" }
      ]
    },
    {
      id:"lost_badge", day:[2,4], title:"消失的班牌", characters:["niko","taoba","puff"],
      text:"活动用的向日葵班牌不见了。泡芙急得快哭，妮蔻却说她昨晚看到班牌还在，桃爸已经开始检查门窗。",
      choices:[
        { text:"按时间顺序询问所有人", effects:{stats:{order:2}, bonds:{taoba:2,niko:1}}, flags:["careful_search"], result:"你发现班牌不是被偷，而是被夹进了晾干的海报里。妮蔻对你的调查方式很满意。" },
        { text:"先安慰泡芙，再一起重新做一个", effects:{stats:{kindness:2,creativity:1}, bonds:{puff:3,huahua:1}}, result:"旧班牌后来找到了，但泡芙坚持把你们做的新班牌也挂起来。" },
        { text:"宣布谁找到就请谁吃点心", effects:{stats:{courage:1}, bonds:{momo:2,diandian:1,huan:1}}, result:"全班搜索效率突然提高。馍馍提醒你，下次最好先确认点心预算。" }
      ]
    },
    {
      id:"lunch", day:[3,5], title:"午饭交换会", characters:["momo","latiao","cutie"],
      text:"馍馍提出交换一口午饭。辣条直接把最辣的那份推过来，小可爱则认真询问每个人的忌口。",
      choices:[
        { text:"组织一张忌口与偏好表", effects:{stats:{order:2,kindness:1}, bonds:{momo:2,cutie:2}}, flags:["food_list"], result:"后来每次班级聚餐，这张表都会被拿出来更新。" },
        { text:"挑战辣条的特辣饭团", effects:{stats:{courage:2}, bonds:{latiao:3,moto:1}}, result:"你坚持吃完了，但下午一直在找水。辣条正式把你列入“能一起冒险的人”。" },
        { text:"只交换自己最喜欢的一口", effects:{stats:{kindness:1}, bonds:{qaq:1,momo:1,puff:1,cutie:1}}, result:"你没有吃到最多，却记住了四个人最舍不得分享的味道。" }
      ]
    },
    {
      id:"rain_game", day:[4,6], title:"雨天室内赛", characters:["moto","qaq","huan"],
      text:"体育活动因下雨取消。蘑托车立刻发起桌面竞速赛，欢佬建议干脆用纸团模拟，QAQ丨已经默默画好了赛道。",
      choices:[
        { text:"坚持制定公平而完整的规则", effects:{stats:{order:2}, bonds:{moto:2,xizhou:1}}, flags:["fair_rules"], result:"比赛进行得很顺利，蘑托车虽然输了，却承认规则没有问题。" },
        { text:"接受欢佬的三分钟极速版本", effects:{stats:{creativity:1}, bonds:{huan:3,diandian:1}}, flags:["shortcut"], result:"三分钟后全班都加入了，唯一的问题是没人能解释最终比分。" },
        { text:"和QAQ丨完善手绘赛道", effects:{stats:{creativity:2}, bonds:{qaq:3,huahua:1}}, flags:["paper_track"], result:"你们画出的赛道后来被贴在墙上，成为活动周的第一个正式项目。" }
      ]
    },
    {
      id:"week_plan", day:[6,7], title:"活动周要做什么", characters:["diandian","huahua","xizhou"],
      text:"点点想办大型闯关，花花想把教室改造成故事空间，西洲提醒大家只有五天准备。争论逐渐从方案变成了谁更认真。",
      choices:[
        { text:"把两种方案合成“故事闯关”", effects:{stats:{creativity:2,courage:1}, bonds:{diandian:2,huahua:2}}, flags:["story_fair"], result:"方案更复杂了，但所有人的眼睛都亮了起来。西洲要求你们当天写出任务清单。" },
        { text:"选择更容易完成的故事展", effects:{stats:{order:2}, bonds:{huahua:3,xizhou:2}}, flags:["story_show"], result:"点点有点失望，不过在你邀请她负责互动环节后，她重新投入了准备。" },
        { text:"先做小型测试，再决定规模", effects:{stats:{order:1,creativity:1}, bonds:{xizhou:3,niko:1}}, flags:["prototype"], result:"测试暴露了很多问题，也让大家第一次相信缩小范围不是退缩。" }
      ]
    },
    {
      id:"paint_argument", day:[7,9], title:"颜料弄脏了作品", characters:["huahua","puff","latiao"],
      text:"泡芙不小心打翻颜料，花花准备了一下午的背景板被染出大片蓝色。辣条认为应该立刻说明是谁的责任，泡芙却一句话也说不出来。",
      choices:[
        { text:"让泡芙先道歉，再一起修补", effects:{stats:{kindness:1,order:1}, bonds:{huahua:2,puff:2,latiao:1}}, result:"花花接受了道歉，并把污迹改成夜空。泡芙之后主动负责所有颜料的收纳。" },
        { text:"直接说污迹反而更有意思", effects:{stats:{creativity:2}, bonds:{puff:2,huahua:1,huan:1}}, result:"花花没有立刻高兴，但她研究了一会儿，真的从污迹里画出了一片海。" },
        { text:"保护泡芙，不提是谁打翻的", effects:{stats:{kindness:1}, bonds:{puff:3,huahua:-1,latiao:-1}}, flags:["hidden_mistake"], result:"事情暂时过去了。只是花花之后检查材料时，比以前沉默了许多。" }
      ]
    },
    {
      id:"missing_moto", day:[8,10], title:"蘑托车突然退出", characters:["moto","taoba","qaq"],
      text:"蘑托车连续输了三次测试赛，丢下一句“这种项目没意思”便离开教室。桃爸准备去找人，QAQ丨却说现在追上去只会吵架。",
      choices:[
        { text:"立刻追出去，直接问他到底怎么了", effects:{stats:{courage:2}, bonds:{moto:3,latiao:1}}, result:"蘑托车先说没事，后来承认他害怕正式活动时拖累大家。你们约定再练一次，只记录自己的进步。" },
        { text:"先调整赛道，再邀请他回来测试", effects:{stats:{order:1,kindness:1}, bonds:{qaq:2,moto:2}}, result:"新赛道保留了难度，却不再依赖运气。蘑托车回来后什么也没解释，只认真跑完了十次。" },
        { text:"让桃爸去找，自己继续推进准备", effects:{stats:{order:2}, bonds:{taoba:2,xizhou:1,moto:-1}}, result:"桃爸把人带了回来，但你和蘑托车之间多了一点没有说开的距离。" }
      ]
    },
    {
      id:"secret_room", day:[9,11], title:"妮蔻的秘密房间", characters:["niko","huan","cutie"],
      text:"妮蔻发现储物柜后方有一块能打开的旧隔板，里面堆着往届学生留下的纸条。欢佬想把它做成隐藏关卡，小可爱担心公开别人的留言不合适。",
      choices:[
        { text:"只使用空白纸条，保留旧留言原样", effects:{stats:{kindness:2,order:1}, bonds:{cutie:3,niko:2}}, flags:["secret_mailbox"], result:"你们把那里改成秘密信箱。第一张新纸条写着：谢谢有人没有把过去当成道具。" },
        { text:"挑选没有私人内容的趣味留言展示", effects:{stats:{creativity:2}, bonds:{niko:3,huan:2}}, flags:["old_notes"], result:"旧留言成为故事线索，参加者需要判断哪些是真话。妮蔻负责设计了最难的一题。" },
        { text:"把隔板关回去，当作没发现", effects:{stats:{order:1}, bonds:{cutie:1,xizhou:1,niko:-1}}, result:"秘密被保住了，但妮蔻显然不满意。当天放学前，她还是独自把柜子周围清理干净。" }
      ]
    },
    {
      id:"power_cut", day:[12,12], title:"暴雨、停电与进水", characters:["taoba","xizhou","momo","huahua"],
      text:"仓库的水正慢慢漫向纸制道具，教室里一片昏暗。所有人同时提出办法，却没人知道先做什么。",
      choices:[
        { text:"先确认人员安全，再分组抢救材料", require:{stat:"order",min:5}, effects:{stats:{order:2,kindness:1}, bonds:{taoba:3,xizhou:3,momo:1}}, flags:["storm_leader"], result:"你写下三项优先顺序。桃爸检查安全，西洲分配工具，馍馍把干毛巾送到每组。损失比预想少得多。" },
        { text:"先把最难重做的背景板搬走", effects:{stats:{courage:1,creativity:1}, bonds:{huahua:3,puff:1}}, flags:["saved_art"], result:"你和花花踩着积水抬走背景板。其他材料损失了一些，但核心场景保住了。" },
        { text:"用桌椅和塑料布临时挡水", effects:{stats:{creativity:2,order:1}, bonds:{huan:2,moto:2,taoba:1}}, flags:["water_wall"], result:"欢佬找到最省力的搭法，蘑托车负责搬桌子。那道歪歪扭扭的防线竟然坚持到了雨停。" }
      ]
    },
    {
      id:"storm_confession", day:[13,14], title:"停电后的那封信", characters:["qaq","cutie","puff"],
      text:"秘密信箱里出现一张没有署名的纸条：『如果活动失败，是不是大家就不会再一起玩了？』泡芙觉得像自己写的，小可爱却说不该追查作者。QAQ丨看着你，似乎知道答案。",
      choices:[
        { text:"公开回复：活动失败也不等于关系结束", effects:{stats:{kindness:2,courage:1}, bonds:{puff:2,cutie:2,qaq:1}}, flags:["public_reply"], result:"第二天，信箱里多了许多回复。有人写“会一起重做”，有人写“失败以后可以先吃饭”。" },
        { text:"请QAQ丨把回复交给写信的人", effects:{stats:{kindness:2}, bonds:{qaq:3,puff:1}}, flags:["private_reply"], result:"QAQ丨没有告诉你作者是谁。放学时，他只说：已经收到了，而且有用。" },
        { text:"把担心变成一次全班风险讨论", effects:{stats:{order:2}, bonds:{xizhou:2,cutie:1,latiao:1}}, result:"大家列出最坏情况与替代方案。气氛并不轻松，但从那以后，没人再把失败当成不能说的话。" }
      ]
    },
    {
      id:"credit", day:[14,16], title:"谁做得最多", characters:["latiao","huan","xizhou"],
      text:"临近完成，辣条发现任务表上很多成果没有署名。有人认为没必要计较，西洲却说长期这样会让承担最多的人最先累倒。",
      choices:[
        { text:"补记每个人的贡献，也记录互相帮助", effects:{stats:{order:2,kindness:1}, bonds:{xizhou:3,latiao:2,cutie:1}}, flags:["credit_board"], result:"贡献板没有变成排名，反而让很多不起眼的工作第一次被看见。" },
        { text:"大家共同完成，不再区分个人", effects:{stats:{kindness:1}, bonds:{huan:2,puff:1,xizhou:-1}}, result:"争论暂时结束，但西洲把自己剩下的任务悄悄划掉了两项。" },
        { text:"请每个人说出最感谢的一位同学", effects:{stats:{kindness:2,courage:1}, bonds:{latiao:2,huan:1,xizhou:1}}, flags:["thanks_circle"], result:"最初没人愿意开口。辣条第一个说完后，感谢逐渐具体到每一卷胶带和每一次等待。" }
      ]
    },
    {
      id:"final_rehearsal", day:[16,17], title:"最后一次彩排", characters:["diandian","moto","huahua","qaq"],
      text:"彩排在最后一关卡住了。时间只剩一晚：可以删掉结尾保证稳定，也可以继续修到最后。",
      choices:[
        { text:"删掉复杂结尾，保证所有参与者都能完成", effects:{stats:{order:2}, bonds:{xizhou:2,taoba:1,cutie:1}}, flags:["safe_finale"], result:"成品少了一点惊喜，却运行得非常顺畅。西洲说，完成本身也是一种诚意。" },
        { text:"保留结尾，全班一起修到能运行", require:{stat:"energy",min:2}, effects:{stats:{courage:2,creativity:1}, energy:-2, bonds:{diandian:2,moto:2,huahua:2}}, flags:["true_finale"], result:"你们试了十七次。第十八次，最后一盏纸灯终于按顺序亮起，全班安静了一秒，然后一起欢呼。" },
        { text:"让QAQ丨提出最小改动方案", effects:{stats:{creativity:1,order:1}, bonds:{qaq:3,huan:1}}, flags:["qaq_solution"], result:"QAQ丨删掉了一个没人注意的步骤，整个流程突然连通。他说自己只是“不想再试第十八次”。" }
      ]
    },
    {
      id:"festival", day:[18,18], title:"向日葵开放日", characters:["all"],
      text:"开放日开始。有人在入口紧张地念错台词，有人在隐藏关卡里笑得太大声，也有人专门回来挑战第二次。你站在教室中央，发现这里已经不再像第一天那样陌生。",
      choices:[
        { text:"留在入口，照顾第一次参加的人", effects:{stats:{kindness:2}, bonds:{cutie:2,momo:2,taoba:1}}, flags:["final_host"] , result:"你没有体验完整活动，却记住了许多参与者放松下来的表情。" },
        { text:"到最混乱的关卡现场救火", effects:{stats:{courage:1,order:1}, bonds:{moto:2,diandian:2,latiao:1}}, flags:["final_rescue"], result:"你一整天都在奔跑。闭馆后，蘑托车把冠军贴纸贴在了你的袖口上。" },
        { text:"悄悄走完整条故事路线", effects:{stats:{creativity:1,kindness:1}, bonds:{qaq:2,huahua:2,niko:1}}, flags:["final_witness"], result:"你看见每个人的工作如何接在一起。最后一张纸条上写着：『欢迎来到向日葵中班。』" }
      ]
    }
  ],
  followups: [
    {
      id:"truth_after_hidden", day:[10,13], requireFlag:"hidden_mistake", title:"没有说开的责任", characters:["huahua","puff"],
      text:"花花发现收纳记录不对，已经猜到颜料是谁打翻的。泡芙问你，现在还要不要说实话。",
      choices:[
        { text:"陪泡芙一起坦白", effects:{stats:{courage:1,kindness:1}, bonds:{huahua:3,puff:2}}, flags:["repaired_trust"], result:"花花真正介意的不是颜料，而是自己被排除在真相之外。三个人一起重做了收纳规则。" },
        { text:"继续保守秘密", effects:{bonds:{puff:1,huahua:-2}}, result:"秘密没有被揭穿，但之后花花不再把重要材料交给你保管。" }
      ]
    },
    {
      id:"track_return", day:[13,16], requireFlag:"paper_track", title:"被雨泡皱的赛道", characters:["qaq","moto"],
      text:"最初画的纸赛道被雨水泡皱。QAQ丨准备扔掉，蘑托车却说它是第一个正式项目。",
      choices:[
        { text:"把皱纹改成赛道地形", effects:{stats:{creativity:2}, bonds:{qaq:2,moto:2}}, flags:["kept_track"], result:"最终展览里，那张不平整的纸成为最受欢迎的纪念品之一。" },
        { text:"扫描保存后重新画一张", effects:{stats:{order:2}, bonds:{qaq:1,xizhou:1}}, result:"新赛道更清楚，旧赛道则被收进班级档案盒。" }
      ]
    },
    {
      id:"mailbox_help", day:[14,16], requireFlag:"secret_mailbox", title:"只写了一个句号的纸条", characters:["niko","cutie","qaq"],
      text:"秘密信箱里出现一张只写了“。”的纸条。妮蔻觉得是暗号，小可爱觉得可能有人不知道怎么开口。",
      choices:[
        { text:"回一张“我们看见了”的纸条", effects:{stats:{kindness:2}, bonds:{cutie:2,qaq:2}}, flags:["saw_the_dot"], result:"第二天，句号旁边多了一句话：『那我明天再试着说。』" },
        { text:"设计一套不用写字的心情贴纸", effects:{stats:{creativity:2}, bonds:{niko:2,huahua:1}}, result:"信箱很快贴满不同颜色的符号。有人第一次用它表达“今天不想说话”。" }
      ]
    },
    {
      id:"shortcut_cost", day:[11,14], requireFlag:"shortcut", title:"捷径留下的问题", characters:["huan","xizhou"],
      text:"欢佬设计的快速计分法在多人测试时失效。西洲没有责怪他，只问今晚谁来补记录。",
      choices:[
        { text:"和欢佬一起补完规则", effects:{stats:{order:2}, bonds:{huan:3,xizhou:1}}, result:"欢佬一边抱怨一边把漏洞全部补上，最后承认“省力也要省得负责”。" },
        { text:"改回最初的完整规则", effects:{stats:{order:1}, bonds:{xizhou:2,huan:-1}}, result:"问题解决了，但欢佬明显觉得自己的尝试被全盘否定。" }
      ]
    }
  ],
  awards: [
    { id:"sun", name:"向日葵中心奖", desc:"能让不同的人继续朝同一个方向前进。", test:s=>s.stats.kindness>=7 && s.stats.order>=6 },
    { id:"spark", name:"意外灵感奖", desc:"总能从麻烦里找到新的可能。", test:s=>s.stats.creativity>=8 },
    { id:"anchor", name:"可靠锚点奖", desc:"混乱时最先看清下一步的人。", test:s=>s.stats.order>=8 },
    { id:"brave", name:"先试一次奖", desc:"即使没有把握，也愿意迈出第一步。", test:s=>s.stats.courage>=8 },
    { id:"listener", name:"被认真听见奖", desc:"让许多没有说出口的话获得回应。", test:s=>s.stats.kindness>=9 },
    { id:"full_story", name:"把故事走到底奖", desc:"见证了活动从第一张草图到最后一盏灯。", test:s=>s.flags.includes("true_finale") && s.flags.includes("final_witness") }
  ]
};

// 剧情版 v2：扩展事件池、连续剧情、主要结局与奖项。
GAME_DATA.events.push(
  {
    id:"name_wall", day:[2,5], title:"名字墙上的空位", characters:["cutie","qaq","huahua"],
    text:"小可爱正在制作全班名字墙，却发现有人不喜欢被拍照，也有人不知道该给自己画什么标志。你的名字旁边也还是空白。",
    choices:[
      {text:"给每个人设计可自行修改的符号",effects:{stats:{creativity:2,kindness:1},bonds:{cutie:2,huahua:2}},flags:["symbol_wall"],result:"名字墙逐渐长出奇怪又准确的符号。QAQ丨最后给自己画了一条竖线。"},
      {text:"先留下空位，等大家自己决定",effects:{stats:{kindness:2},bonds:{qaq:2,cutie:1}},flags:["respected_blank"],result:"空白没有显得不完整，反而像一种被允许的等待。几天后，有人悄悄补上了自己的标志。"},
      {text:"发起一分钟快速自画像",effects:{stats:{courage:1,creativity:1},bonds:{diandian:2,puff:1}},result:"画得最不像的人反而笑得最大声。你的画像被点点坚持贴在最中间。"}
    ]
  },
  {
    id:"broken_game", day:[3,7], title:"只剩一半规则的旧游戏", characters:["qaq","niko","moto"],
    text:"储物箱里翻出一盒旧桌游，说明书只剩后半页。蘑托车想按经验补规则，妮蔻坚持缺失部分可能藏着完全不同的玩法。",
    choices:[
      {text:"根据零件反推原本规则",effects:{stats:{order:1,creativity:1},bonds:{niko:2,qaq:1}},flags:["recovered_game"],result:"你们拼出一套能自洽的规则。没人知道是否正确，但它像真的流传过很多年。"},
      {text:"让蘑托车设计竞技版",effects:{stats:{courage:1},bonds:{moto:3}},flags:["moto_rules"],result:"新规则异常激烈。蘑托车赢了第一局，却主动削弱了自己最占优势的角色。"},
      {text:"把缺失规则当成每局随机任务",effects:{stats:{creativity:2},bonds:{niko:3,huan:1}},flags:["chaos_game"],result:"游戏变得无法预测，甚至出现了“本局不能说完整句子”的任务。"}
    ]
  },
  {
    id:"quiet_lunch", day:[4,8], title:"今天不想一起吃饭", characters:["xizhou","puff","momo"],
    text:"西洲独自把午饭带到走廊尽头。泡芙担心他是不是生气了，馍馍却说，有时一个人吃饭只是想安静。",
    choices:[
      {text:"替他保留安静，不去追问",effects:{stats:{kindness:2},bonds:{xizhou:3,momo:1}},flags:["quiet_respected"],result:"下午西洲主动回来说明，他只是需要把脑子里的事情排好。你没有要求解释，反而让他更愿意解释。"},
      {text:"送一份点心后马上离开",effects:{stats:{kindness:1},bonds:{xizhou:2,momo:2}},result:"点心盒晚上洗干净放回了你的桌上，下面压着一张写有“谢谢”的便签。"},
      {text:"直接问是不是有人让他不舒服",effects:{stats:{courage:1},bonds:{puff:1,xizhou:-1}},result:"西洲说没有，并明显不想继续谈。泡芙后来意识到，关心也可能让人必须立刻回答。"}
    ]
  },
  {
    id:"class_pet", day:[5,9], title:"窗台上的不速之客", characters:["taoba","diandian","huahua"],
    text:"一只受伤的小鸟落在窗台。点点想立刻把它带进教室，桃爸担心错误照顾反而害了它，花花已经找来纸盒。",
    choices:[
      {text:"联系专业救助并隔远观察",effects:{stats:{order:2,kindness:1},bonds:{taoba:3,huahua:1}},flags:["bird_rescue"],result:"救助人员确认小鸟只是短暂撞晕。它飞走时，全班都下意识放轻了声音。"},
      {text:"做一个临时安静角等待恢复",effects:{stats:{creativity:1,kindness:1},bonds:{huahua:2,diandian:1}},result:"纸盒上被画满向日葵，但你们忍住没有围观。小鸟傍晚自己飞走了。"},
      {text:"把这件事变成自然观察课",effects:{stats:{creativity:1},bonds:{diandian:2,niko:1}},result:"大家记录了羽毛颜色和停留时间。桃爸提醒你们，观察的第一条规则是不要打扰。"}
    ]
  },
  {
    id:"rumor", day:[7,11], title:"“活动可能取消”的传言", characters:["latiao","niko","puff"],
    text:"不知道谁说老师认为准备进度太慢，活动周可能取消。消息传了一圈后，已经变成“开放日确定取消”。",
    choices:[
      {text:"找到消息源并公开核实",effects:{stats:{order:2,courage:1},bonds:{latiao:2,niko:1}},flags:["rumor_checked"],result:"原话只是“需要准备取消部分项目的方案”。传言停下了，但大家也开始认真考虑备用计划。"},
      {text:"先安抚大家，等正式通知",effects:{stats:{kindness:2},bonds:{puff:2,momo:1}},result:"情绪稳定了，不过半天后仍有人不断来问你是否知道内幕。"},
      {text:"顺势组织一次最坏情况演练",effects:{stats:{order:1,courage:1},bonds:{xizhou:2,huan:1}},flags:["backup_plan"],result:"取消传言是假的，备用方案却在之后真正救了你们一次。"}
    ]
  },
  {
    id:"two_leaders", day:[8,12], title:"两个负责人", characters:["diandian","xizhou","latiao"],
    text:"点点一直在现场临时调整，西洲则按照任务表推进。两人都认为对方不断打乱自己的工作，终于在全班面前吵了起来。",
    choices:[
      {text:"明确区分现场决策与进度管理",effects:{stats:{order:2},bonds:{diandian:2,xizhou:2}},flags:["dual_lead"],result:"两个人第一次承认，他们争的不是谁做主，而是谁必须为哪种问题负责。"},
      {text:"让两人交换职责半天",effects:{stats:{kindness:1,creativity:1},bonds:{diandian:2,xizhou:2}},flags:["role_swap"],result:"半天后，两个人都不再觉得对方的工作“只是说几句话”或“只是填表”。"},
      {text:"全班投票选一个总负责人",effects:{stats:{courage:1},bonds:{latiao:2,diandian:-1,xizhou:-1}},result:"结果很明确，气氛却没有变好。输的一方照做了，但不再主动补充意见。"}
    ]
  },
  {
    id:"gift_budget", day:[9,13], title:"纪念品预算只够一半", characters:["cutie","momo","huan"],
    text:"小可爱设计的纪念徽章超出预算。馍馍建议减少数量，欢佬说可以改用废弃瓶盖，但成品不会像原设计那么整齐。",
    choices:[
      {text:"改成每个人都不同的瓶盖徽章",effects:{stats:{creativity:2},bonds:{cutie:2,huan:2}},flags:["bottle_badges"],result:"没有两枚徽章完全一样。小可爱一开始很犹豫，后来把“不整齐”写进了作品说明。"},
      {text:"只送给完成全部关卡的人",effects:{stats:{order:1,courage:1},bonds:{moto:2,cutie:-1}},flags:["limited_badges"],result:"徽章变成奖品，挑战热度明显上升，也有人因为没拿到而失望。"},
      {text:"取消实物，改写每人的纪念留言",effects:{stats:{kindness:2},bonds:{momo:2,cutie:2}},flags:["message_gifts"],result:"写留言花的时间比制作徽章还久，但许多人把它夹进了书里。"}
    ]
  },
  {
    id:"night_guard", day:[11,14], title:"谁留下来看守材料", characters:["taoba","moto","huan"],
    text:"天气预报说夜里可能有强风。桃爸想留下确认窗户，蘑托车说自己也可以，欢佬则质疑为什么一定要有人牺牲休息。",
    choices:[
      {text:"制定轮班并限制每人停留时间",effects:{stats:{order:2,kindness:1},bonds:{taoba:2,moto:1,huan:1}},flags:["safe_shift"],result:"没有人独自承担整晚。第二天大家都有点困，却没人觉得自己被理所当然地留下。"},
      {text:"和桃爸一起留下",effects:{stats:{courage:1},energy:-1,bonds:{taoba:3}},flags:["night_watch"],result:"风没有想象中大。你们在昏暗教室里修好了三个一直被拖延的小问题。"},
      {text:"加固窗户后全员按时回家",effects:{stats:{creativity:1,order:1},bonds:{huan:3,xizhou:1}},flags:["no_martyr"],result:"事实证明欢佬是对的：解决风险不一定需要一个人留下来证明负责。"}
    ]
  },
  {
    id:"lost_voice", day:[12,15], title:"主持人说不出话了", characters:["puff","latiao","qaq"],
    text:"负责开场的泡芙因为紧张突然失声。辣条说现在必须马上换人，QAQ丨却把台词拆成几张很短的卡片。",
    choices:[
      {text:"陪泡芙按卡片一句句练习",effects:{stats:{kindness:2},bonds:{puff:3,qaq:1}},flags:["puff_host"],result:"泡芙最后仍有两次停顿，但每一次都自己接了下去。"},
      {text:"把开场改成全班接力",effects:{stats:{creativity:2},bonds:{puff:2,latiao:2,cutie:1}},flags:["relay_host"],result:"没有人需要独自承担整段台词。开场意外成了最有班级特色的环节。"},
      {text:"由自己临时替代主持",effects:{stats:{courage:2},bonds:{latiao:2,puff:1}},flags:["player_host"],result:"你顺利完成了开场。泡芙很感谢你，却也偷偷把原稿留了下来。"}
    ]
  },
  {
    id:"copycat", day:[13,16], title:"隔壁班做了相似的活动", characters:["huahua","diandian","niko"],
    text:"隔壁班公开了活动预告，其中几个设计和你们很像。点点怀疑他们偷看过方案，花花担心大家会认为向日葵中班在模仿。",
    choices:[
      {text:"继续原计划，用完成度证明差异",effects:{stats:{order:1,courage:1},bonds:{huahua:2,xizhou:1}},flags:["kept_identity"],result:"相似的入口后面是完全不同的体验。花花终于相信，想法相似不等于作品相同。"},
      {text:"临时加入只有本班知道的故事细节",effects:{stats:{creativity:2},bonds:{niko:3,diandian:1}},flags:["secret_lore"],result:"旧纸条、纸赛道和午饭偏好都变成了故事线索。外人看不懂，熟悉的人却不断笑出来。"},
      {text:"直接去隔壁班询问",effects:{stats:{courage:2},bonds:{diandian:2,latiao:1}},result:"对方也以为是你们参考了他们。两边对照时间后发现，只是同时想到类似方案。"}
    ]
  },
  {
    id:"empty_corner", day:[14,17], title:"没人负责的角落", characters:["qaq","xizhou","huahua"],
    text:"所有主要区域都完成了，只有教室后方留着一块空地。任务表上没有它，大家也都说已经没有精力再增加项目。",
    choices:[
      {text:"保持空白，设置成休息区",effects:{stats:{kindness:2,order:1},bonds:{qaq:2,xizhou:2}},flags:["rest_corner"],result:"开放日当天，这个没有任务的角落坐满了人。它成了少数不用完成什么的地方。"},
      {text:"把本学期失败品集中陈列",effects:{stats:{creativity:2,courage:1},bonds:{huahua:2,niko:2}},flags:["failure_museum"],result:"皱掉的纸、写错的牌子和废弃规则被认真标注。许多人停留得比在成品区更久。"},
      {text:"最后加一个高难隐藏关",effects:{stats:{courage:1},energy:-1,bonds:{moto:3,diandian:1}},flags:["last_secret"],result:"你们赶在闭馆前调通。只有七个人发现它，其中三个人回来挑战了第二次。"}
    ]
  },
  {
    id:"photo_choice", day:[15,17], title:"合照里应该留下什么", characters:["cutie","qaq","latiao"],
    text:"小可爱想拍一张正式合照，QAQ丨不喜欢面对镜头，辣条认为不拍以后一定会后悔。",
    choices:[
      {text:"允许每个人用自己的方式入镜",effects:{stats:{kindness:2,creativity:1},bonds:{cutie:2,qaq:2}},flags:["free_photo"],result:"有人露脸，有人只伸出手，还有人让作品替自己出现。照片很乱，却没人缺席。"},
      {text:"拍正式照，再补一张随意照",effects:{stats:{order:1,kindness:1},bonds:{cutie:3,latiao:1}},flags:["two_photos"],result:"正式照被贴在公告板，真正被大家反复传看的却是第二张。"},
      {text:"不拍人，只拍完成后的教室",effects:{stats:{creativity:1},bonds:{qaq:2,huahua:2}},flags:["room_portrait"],result:"空教室里到处都是人的痕迹。那张照片后来比任何合照都更像回忆。"}
    ]
  },
  {
    id:"last_apology", day:[16,17], title:"最后一天前的道歉", characters:["latiao","huan","xizhou"],
    text:"欢佬承认自己早期少做了一部分记录，却一直装作没事。辣条认为现在才说没有意义，西洲则等着他提出补救办法。",
    choices:[
      {text:"要求他具体补完缺失内容",effects:{stats:{order:2},bonds:{huan:2,xizhou:2}},flags:["late_repair"],result:"道歉没有自动消除影响，但缺失的记录终于被补齐。欢佬第一次没有用玩笑结束谈话。"},
      {text:"接受道歉，让大家说出仍介意的事",effects:{stats:{kindness:2,courage:1},bonds:{latiao:2,huan:2}},flags:["honest_circle"],result:"谈话比预想中更长。没有所有问题都解决，但至少它们不再躲在“算了”后面。"},
      {text:"事情已经结束，不再追究",effects:{stats:{kindness:1},bonds:{huan:2,xizhou:-1}},result:"气氛迅速轻松下来。西洲没有反对，只把那份不完整的记录单独收进了文件夹。"}
    ]
  }
);

GAME_DATA.followups.push(
  {id:"symbol_return",day:[10,14],requireFlag:"symbol_wall",title:"被换掉的名字标志",characters:["cutie","qaq"],text:"有人悄悄换掉了自己最初的标志。小可爱担心是不是设计得不够好，QAQ丨说，也可能只是人改变了。",choices:[
    {text:"允许所有人随时重画",effects:{stats:{kindness:2},bonds:{cutie:2,qaq:1}},flags:["changing_symbols"],result:"名字墙不再是一张完成品，而像一份不断更新的自我介绍。"},
    {text:"保留新旧两个版本",effects:{stats:{creativity:1,order:1},bonds:{cutie:2,huahua:1}},result:"新旧标志并排贴着，变化本身也成了这个学期的一部分。"}
  ]},
  {id:"game_final",day:[12,16],requireFlag:"recovered_game",title:"旧游戏的真正说明书",characters:["niko","moto","qaq"],text:"妮蔻在柜子夹层找到了旧游戏说明书的前半页。你们之前推测的规则，只有一半正确。",choices:[
    {text:"按原规则完整玩一次",effects:{stats:{order:1},bonds:{niko:2,moto:2}},flags:["original_game"],result:"原版更严谨，却没有你们自创版本里那些奇怪的笑点。"},
    {text:"把两套规则合成班级版",effects:{stats:{creativity:2},bonds:{qaq:2,niko:2,moto:1}},flags:["class_game"],result:"盒盖上被写下新的名字。旧游戏从此真正属于了这一届。"}
  ]},
  {id:"bird_return",day:[14,17],requireFlag:"bird_rescue",title:"窗台上的一根羽毛",characters:["taoba","huahua"],text:"窗台上出现一根和那只小鸟颜色相似的羽毛。没人能确定是不是它留下的。",choices:[
    {text:"做成班级书签保存",effects:{stats:{creativity:1,kindness:1},bonds:{huahua:2,taoba:1}},flags:["feather_bookmark"],result:"书签被夹进班级记录册，旁边写着“无法确认，但愿意相信”。"},
    {text:"留在窗边，不把它占为己有",effects:{stats:{kindness:2},bonds:{taoba:2,qaq:1}},result:"第二天羽毛被风吹走了。你们仍然记得它曾经在那里。"}
  ]},
  {id:"backup_used",day:[12,15],requireFlag:"backup_plan",title:"真正用上的备用方案",characters:["xizhou","huan","diandian"],text:"停电后原定流程无法运行。那份因为传言而准备的备用方案，成了唯一能立刻执行的版本。",choices:[
    {text:"完整切换到备用流程",effects:{stats:{order:2},bonds:{xizhou:3,huan:1}},flags:["plan_b_saved"],result:"活动规模缩小，却几乎没有停顿。大家第一次真心感谢那场虚惊。"},
    {text:"只采用其中最关键的部分",effects:{stats:{creativity:1,order:1},bonds:{diandian:2,xizhou:1}},result:"原方案保住了特色，备用方案则接住了最容易失败的地方。"}
  ]},
  {id:"roles_return",day:[14,16],requireFlag:"role_swap",title:"交换回来以后",characters:["diandian","xizhou"],text:"职责已经换回，但点点开始主动更新任务表，西洲也会在现场允许临时调整。两人都假装这和交换经历无关。",choices:[
    {text:"把新的协作方式写进规则",effects:{stats:{order:2},bonds:{diandian:2,xizhou:2}},flags:["shared_leadership"],result:"规则没有规定谁更重要，只写清了信息必须如何流动。"},
    {text:"不点破，让默契自然形成",effects:{stats:{kindness:1},bonds:{diandian:2,xizhou:2}},result:"没人宣布和解，但下一次分歧只用了两分钟。"}
  ]},
  {id:"badge_after",day:[15,17],requireFlag:"bottle_badges",title:"少了一枚瓶盖徽章",characters:["cutie","momo","huan"],text:"制作完成后发现徽章比人数少一枚。最容易的做法，是让负责制作的人不拿。",choices:[
    {text:"拆开两枚重新组合成三枚",effects:{stats:{creativity:2},bonds:{cutie:2,huan:2}},flags:["everyone_badge"],result:"三枚都变得更小，却没有任何人被排除在外。"},
    {text:"举行抽签，结果由运气决定",effects:{stats:{courage:1},bonds:{huan:1,momo:1}},result:"抽签很公平，但没抽到的人还是笑得有些勉强。"}
  ]},
  {id:"voice_return",day:[17,17],requireFlag:"puff_host",title:"泡芙要求再练一次",characters:["puff","qaq"],text:"正式开始前，泡芙说想从头完整讲一遍。这会占用最后检查设备的时间。",choices:[
    {text:"陪她完整练完",effects:{stats:{kindness:2},energy:-1,bonds:{puff:3,qaq:1}},flags:["voice_found"],result:"最后一句结束时，她已经不再看卡片。设备检查虽然匆忙，却没有出问题。"},
    {text:"只练最容易卡住的部分",effects:{stats:{order:1,kindness:1},bonds:{puff:2,xizhou:1}},result:"她仍然紧张，但知道自己最可能在哪里停下来，也知道停下来以后怎么继续。"}
  ]},
  {id:"failure_answer",day:[17,17],requireFlag:"failure_museum",title:"失败展需要一句说明",characters:["huahua","niko","moto"],text:"失败品已经摆好，只差入口说明。蘑托车不喜欢“失败展”这个名字，妮蔻则认为越直接越好。",choices:[
    {text:"写：这些东西没有被白做",effects:{stats:{kindness:1,creativity:1},bonds:{huahua:2,moto:2}},flags:["failure_has_value"],result:"许多人看完后开始讲自己丢掉过的半成品。"},
    {text:"写：请找出它们后来去了哪里",effects:{stats:{creativity:2},bonds:{niko:3}},flags:["failure_clues"],result:"失败品与最终作品之间被连成了一条隐藏故事线。"}
  ]}
);

GAME_DATA.endings = [
  {id:"heart",name:"大家会先来找你",desc:"你成为了班级里最让人安心的存在。很多故事能继续，不是因为你解决了问题，而是因为你让人愿意说出问题。",priority:60,test:s=>s.stats.kindness>=10},
  {id:"architect",name:"把混乱变成可以完成的事",desc:"你让计划、责任和时间真正接在一起。开放日结束后，大家才发现许多顺利并不是自然发生的。",priority:58,test:s=>s.stats.order>=10},
  {id:"spark",name:"教室里多出了原本不存在的东西",desc:"你不断把意外改写成新玩法。这个学期最受欢迎的部分，很多都不在最初方案里。",priority:56,test:s=>s.stats.creativity>=10},
  {id:"first_step",name:"总要有人先走出去",desc:"你未必每次都判断正确，却一次次让停滞的事情重新开始。别人后来愿意尝试，也有你的一部分原因。",priority:54,test:s=>s.stats.courage>=10},
  {id:"shared_class",name:"没有谁被留在故事外面",desc:"你反复选择让不同的人都能参与。向日葵中班没有最整齐的成果，却留下了最完整的一群人。",priority:80,test:s=>s.flags.includes("everyone_badge")&&s.flags.includes("free_photo")&&s.flags.includes("rest_corner")},
  {id:"true_story",name:"把故事走到了最后一盏灯",desc:"从第一张草图到最后一次亮灯，你没有为了稳定放弃那个最初让大家兴奋的结尾。",priority:78,test:s=>s.flags.includes("true_finale")&&s.flags.includes("final_witness")},
  {id:"class_archive",name:"这一届留下了自己的传说",desc:"旧游戏、秘密纸条和失败品被你们重新连接。后来的人也许看不懂全部细节，但会知道这里曾发生过很多事。",priority:76,test:s=>s.flags.includes("class_game")&&s.flags.includes("secret_lore")&&s.flags.includes("failure_clues")},
  {id:"trust_rebuilt",name:"有些关系是在犯错以后开始的",desc:"你没有让秘密永远停留在保护的名义下。坦白很迟，却让信任第一次变得真实。",priority:74,test:s=>s.flags.includes("repaired_trust")&&s.flags.includes("honest_circle")},
  {id:"quiet_place",name:"给不想向前的人留一把椅子",desc:"你没有要求每个人都热闹、勇敢或高效。那个可以暂时停下来的角落，成了许多人最记得的地方。",priority:72,test:s=>s.flags.includes("quiet_respected")&&s.flags.includes("rest_corner")&&s.flags.includes("respected_blank")},
  {id:"storm_team",name:"暴雨里没有一个英雄",desc:"你们靠分工、备用方案与共同承担渡过混乱。没有谁独自拯救全班，这正是最可靠的地方。",priority:70,test:s=>s.flags.includes("storm_leader")&&s.flags.includes("plan_b_saved")&&(s.flags.includes("safe_shift")||s.flags.includes("no_martyr"))},
  {id:"friendship",name:"一个人的学期也可以很完整",desc:"你和一位同学建立了格外深的联系。许多班级大事会淡去，但你们共享的细节不会。",priority:40,test:s=>Math.max(...Object.values(s.bonds))>=12},
  {id:"ordinary",name:"你在这里留下了自己的位置",desc:"你没有成为所有事情的中心，也没有走出一条可以简单命名的路线。但十八天以后，这间教室里已经有了无法替代你的部分。",priority:0,test:s=>true}
];

GAME_DATA.awards = [
  {id:"sun",name:"向日葵中心奖",desc:"能让不同的人继续朝同一个方向前进。",test:s=>s.stats.kindness>=7&&s.stats.order>=6},
  {id:"spark",name:"意外灵感奖",desc:"总能从麻烦里找到新的可能。",test:s=>s.stats.creativity>=8},
  {id:"anchor",name:"可靠锚点奖",desc:"混乱时最先看清下一步的人。",test:s=>s.stats.order>=8},
  {id:"brave",name:"先试一次奖",desc:"即使没有把握，也愿意迈出第一步。",test:s=>s.stats.courage>=8},
  {id:"listener",name:"被认真听见奖",desc:"让许多没有说出口的话获得回应。",test:s=>s.stats.kindness>=9},
  {id:"full_story",name:"把故事走到底奖",desc:"见证活动从第一张草图到最后一盏灯。",test:s=>s.flags.includes("true_finale")&&s.flags.includes("final_witness")},
  {id:"truth",name:"迟到的坦白奖",desc:"保护一个人，也没有让另一个人永远被蒙在鼓里。",test:s=>s.flags.includes("repaired_trust")},
  {id:"archivist",name:"班级考古学家",desc:"让旧物不只是旧物，而成为这一届的新故事。",test:s=>s.flags.includes("class_game")||s.flags.includes("old_notes")},
  {id:"no_one_out",name:"一个也不能少",desc:"在资源不足时仍设法让每个人都得到一份。",test:s=>s.flags.includes("everyone_badge")},
  {id:"failure",name:"失败品保存协会",desc:"认真保存那些没有成功、却并非没有价值的尝试。",test:s=>s.flags.includes("failure_museum")},
  {id:"quiet",name:"安静权利守护者",desc:"知道有时最好的关心，是允许别人暂时不回答。",test:s=>s.flags.includes("quiet_respected")&&s.flags.includes("respected_blank")},
  {id:"bird",name:"窗台观察员",desc:"在好奇之前先学会不打扰。",test:s=>s.flags.includes("bird_rescue")},
  {id:"plan_b",name:"备用方案不是诅咒",desc:"提前想过失败，因此真正失败时没有慌乱。",test:s=>s.flags.includes("plan_b_saved")},
  {id:"two_heads",name:"两个负责人也可以",desc:"没有急着选出唯一正确的人，而是让不同能力各自负责。",test:s=>s.flags.includes("shared_leadership")||s.flags.includes("dual_lead")},
  {id:"voice",name:"把声音还给本人",desc:"没有因为紧张就替别人决定她做不到。",test:s=>s.flags.includes("voice_found")},
  {id:"identity",name:"只有我们看得懂",desc:"把共同经历藏进作品，让它真正属于这个班级。",test:s=>s.flags.includes("secret_lore")},
  {id:"rest",name:"什么都不用做奖",desc:"为疲惫的人留下一个不需要完成任务的角落。",test:s=>s.flags.includes("rest_corner")},
  {id:"photo",name:"不标准合照奖",desc:"让每个人用自己愿意的方式出现在回忆里。",test:s=>s.flags.includes("free_photo")},
  {id:"responsible_shortcut",name:"负责任的捷径奖",desc:"省力以后，仍愿意回来补上省略的部分。",test:s=>s.flags.includes("shortcut")&&s.history.some(h=>h.title==="捷径留下的问题")},
  {id:"deep_friend",name:"放学后还会继续说话",desc:"与一位同学建立了格外深的关系。",test:s=>Math.max(...Object.values(s.bonds))>=12}
];
