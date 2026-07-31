// 向日葵中班：全部可扩展内容集中在此文件。
// 后续增加角色、事件、结局时，优先只修改本文件。

const GAME_DATA = {
  title: "向日葵中班",
  subtitle: "幼儿园里的小小冒险与回忆簿",
  maxDays: 18,
  initialStats: { courage: 1, kindness: 1, creativity: 1, order: 1, energy: 6 },
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
    { id:"xizhou", name:"西洲", icon:"洲", trait:"最近常跟家长外出，来园次数很少；只要出现就很会聊天，对亲近的人格外大方，遇到大家不敢指出的问题会直接开口。", likes:"热闹聊天、好吃的点心、舞台表演、把问题说清楚" },
    { id:"latiao", name:"辣条", icon:"辣", trait:"说话直接，热情也直接，最讨厌大家有话不说。", likes:"坦率沟通、热闹活动、共同吐槽" },
    { id:"cutie", name:"小可爱", icon:"爱", trait:"擅长调节气氛，但并不只是负责可爱，也有很强的坚持。", likes:"合作、纪念品、认真对待承诺" }
  ],
  chapters: [
    { day:1, title:"转学生报到", text:"你抱着新书包站在向日葵中班门口。教室里有积木、有蜡笔，还有没贴完的手工作品。老师在黑板上画了一朵大大的向日葵：『希望每个小朋友都能留下闪闪发亮的回忆。』" },
    { day:6, title:"活动周开始", text:"班级决定在开放日把教室布置成好玩的故事乐园。大家都很兴奋，也开始为了“先做什么”“做成什么样”出现小小分歧。" },
    { day:12, title:"暴雨与停电", text:"一场突如其来的暴雨打乱了准备。教室停电，材料角也有些进水。开放日还能不能顺利开始，就要看大家会不会一起想办法了。" },
    { day:17, title:"学期最后两天", text:"开放日前的最后两天，大家开始把散落的贴纸、小卡片和半成品整理好。许多当时不起眼的小选择，这时都慢慢变成了很重要的回忆。" }
  ],
  dailyActions: [
    { id:"help", title:"帮忙收拾教室", desc:"整理蜡笔、扶正小椅子、帮老师递材料。稳稳当当，但会有点累。", energy:-1, stats:{order:1,kindness:1}, bonds:["taoba","xizhou","momo"] },
    { id:"play", title:"加入课间游戏", desc:"跑一跑、跳一跳、玩一玩。大家嘴上说不在乎输赢，其实还是会偷偷较劲。", energy:-1, stats:{courage:1}, bonds:["qaq","moto","diandian"] },
    { id:"create", title:"做手工和布置", desc:"把彩纸、胶带和奇怪灵感一起变成可爱的作品。", energy:-1, stats:{creativity:1}, bonds:["huahua","puff","cutie"] },
    { id:"chat", title:"在角落悄悄聊天", desc:"很多小秘密、好主意和小情绪，都会在这里悄悄冒出来。", energy:0, stats:{kindness:1}, bonds:["latiao","niko","huan"] },
    { id:"rest", title:"安静休息", desc:"坐到窗边发一会儿呆，顺便看看云和树。", energy:2, stats:{}, bonds:["qaq","xizhou"] }
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
      text:"准备贴在教室门口的向日葵班牌突然不见了。泡芙急得快哭，妮蔻说她昨天明明还见过，桃爸已经蹲下来检查桌子底下和材料箱。",
      choices:[
        { text:"按时间顺序询问所有人", effects:{stats:{order:2}, bonds:{taoba:2,niko:1}}, flags:["careful_search"], result:"你发现班牌不是被偷，而是被夹进了晾干的海报里。妮蔻对你的调查方式很满意。" },
        { text:"先安慰泡芙，再一起重新做一个", effects:{stats:{kindness:2,creativity:1}, bonds:{puff:3,huahua:1}}, result:"旧班牌后来找到了，但泡芙坚持把你们做的新班牌也挂起来。" },
        { text:"宣布谁找到就请谁吃点心", effects:{stats:{courage:1}, bonds:{momo:2,diandian:1,huan:1}}, result:"大家一下子更有精神了。馍馍提醒你，下次要先问清楚点心够不够分。" }
      ]
    },
    {
      id:"lunch", day:[3,5], title:"午饭盒里的颜色", characters:["momo","latiao","cutie"],
      text:"午饭时间，小可爱把主食、蔬菜和水果摆得整整齐齐。馍馍想到什么就说什么，忽然问辣条是不是最喜欢辣味。辣条立刻回答：‘名字是名字，我又没答应一定要吃辣。’",
      choices:[
        { text:"和小可爱一起数今天有几种颜色", effects:{stats:{order:1,kindness:1}, bonds:{cutie:3,momo:1}}, flags:["lunch_colors"], result:"大家发现颜色最多的不一定吃得最多。小可爱只调整自己的饭盒，没有要求别人照她那样摆。" },
        { text:"请辣条说说自己真正喜欢的味道", effects:{stats:{kindness:1}, bonds:{latiao:3,momo:1}}, result:"辣条认真说了几个甜味点心，最后提醒馍馍：名字不能替别人回答问题。馍馍很快点头，又去问下一个话题。" },
        { text:"把饭盒颜色画成今天的色卡", effects:{stats:{creativity:2}, bonds:{momo:2,cutie:2}}, result:"色卡里有米饭的白、番茄的红和叶菜的绿。下午做手工时，大家真的用上了这组颜色。" }
      ]
    },
    {
      id:"rain_game", day:[4,6], title:"雨天室内赛", characters:["moto","qaq","huan"],
      text:"外面下起了雨，操场去不成了。蘑托车立刻提议在教室里办一场桌面小赛车比赛，欢佬说用纸团也能玩，QAQ丨已经默默画好了赛道。",
      choices:[
        { text:"坚持制定公平而完整的规则", effects:{stats:{order:2}, bonds:{moto:2,xizhou:1}}, flags:["fair_rules"], result:"比赛进行得很顺利，蘑托车虽然输了，却承认规则没有问题。" },
        { text:"接受欢佬的三分钟极速版本", effects:{stats:{creativity:1}, bonds:{huan:3,diandian:1}}, flags:["shortcut"], result:"三分钟后全班都加入了，唯一的问题是没人能解释最终比分。" },
        { text:"和QAQ丨完善手绘赛道", effects:{stats:{creativity:2}, bonds:{qaq:3,huahua:1}}, flags:["paper_track"], result:"你们画出的赛道后来被贴在墙上，成为开放日最早完成的一块游戏板。" }
      ]
    },
    {
      id:"week_plan", day:[6,7], title:"开放日玩什么", characters:["diandian","huahua","xizhou"],
      text:"点点想办热闹的闯关游戏，花花想把教室布置成故事角，西洲提醒大家准备时间只有几天。大家越说越认真，差点忘了原本只是想做一件好玩的事。",
      choices:[
        { text:"把两种方案合成“故事闯关”", effects:{stats:{creativity:2,courage:1}, bonds:{diandian:2,huahua:2}}, flags:["story_fair"], result:"方案更复杂了，但所有人的眼睛都亮了起来。西洲让大家把要做的事画成几张小卡片，免得第二天又忘记。" },
        { text:"选择更容易完成的故事展", effects:{stats:{order:2}, bonds:{huahua:3,xizhou:2}}, flags:["story_show"], result:"点点有点失望，不过在你邀请她负责互动环节后，她重新投入了准备。" },
        { text:"先让几个人试玩，再决定要做多大", effects:{stats:{order:1,creativity:1}, bonds:{xizhou:3,niko:1}}, flags:["prototype"], result:"试玩时发现了几个不好玩的地方，大家也明白少做一点并不等于不好。" }
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
      text:"蘑托车连续输了三次试跑，小脸一下子垮了，丢下一句“这个不好玩”就跑出了教室。桃爸准备去找他，QAQ丨却说现在追上去只会吵起来。",
      choices:[
        { text:"立刻追出去，直接问他到底怎么了", effects:{stats:{courage:2}, bonds:{moto:3,latiao:1}}, result:"蘑托车先说没事，后来承认她担心开放日那天自己玩不好会扫兴。你们约定再练一次，只和自己上一次比较。" },
        { text:"先调整赛道，再邀请他回来测试", effects:{stats:{order:1,kindness:1}, bonds:{qaq:2,moto:2}}, result:"新赛道保留了难度，却不再依赖运气。蘑托车回来后什么也没解释，只认真跑完了十次。" },
        { text:"让桃爸去找，自己继续推进准备", effects:{stats:{order:2}, bonds:{taoba:2,xizhou:1,moto:-1}}, result:"桃爸把人带了回来，但你和蘑托车之间多了一点没有说开的距离。" }
      ]
    },
    {
      id:"secret_room", day:[9,11], title:"妮蔻的秘密房间", characters:["niko","huan","cutie"],
      text:"妮蔻发现储物柜后面有一块会动的小木板，里面塞着以前小朋友留下的纸条。欢佬想把那里变成隐藏角落，小可爱却担心别人的留言不该被随便摊开。",
      choices:[
        { text:"只使用空白纸条，保留旧留言原样", effects:{stats:{kindness:2,order:1}, bonds:{cutie:3,niko:2}}, flags:["secret_mailbox"], result:"你们把那里改成秘密信箱。第一张新纸条写着：谢谢有人没有把过去当成道具。" },
        { text:"挑选没有私人内容的趣味留言展示", effects:{stats:{creativity:2}, bonds:{niko:3,huan:2}}, flags:["old_notes"], result:"旧留言成为故事线索，参加者需要判断哪些是真话。妮蔻负责设计了最难的一题。" },
        { text:"把隔板关回去，当作没发现", effects:{stats:{order:1}, bonds:{cutie:1,xizhou:1,niko:-1}}, result:"秘密被保住了，但妮蔻显然不满意。当天放学前，她还是独自把柜子周围清理干净。" }
      ]
    },
    {
      id:"power_cut", day:[12,12], title:"暴雨天的大慌张", characters:["taoba","xizhou","momo","huahua"],
      text:"材料角的积水慢慢靠近纸道具，教室里也暗了下来。大家都在同时说办法，一时间反而不知道该先做什么。",
      choices:[
        { text:"先听老师安排，再一起把纸道具搬高", require:{stat:"order",min:5}, effects:{stats:{order:2,kindness:1}, bonds:{taoba:3,xizhou:3,momo:1}}, flags:["storm_leader"], result:"老师先让大家离开积水边。桃爸检查哪些东西还能搬，西洲直接叫大家别一起喊，馍馍把干毛巾一条条送过去。最后只湿了几张彩纸。" },
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
        { text:"请大家一起想“如果下雨还能怎么玩”", effects:{stats:{order:2}, bonds:{xizhou:2,cutie:1,latiao:1}}, result:"大家想出了停电时玩手影、下雨时玩猜声音。担心没有完全消失，但至少变成了可以一起准备的小办法。" }
      ]
    },
    {
      id:"credit", day:[14,16], title:"谁做得最多", characters:["latiao","huan","xizhou"],
      text:"快完成时，辣条发现很多帮忙的小事没人记得是谁做的。有人觉得没关系，西洲却说总是这样，会让最认真帮忙的小朋友最先委屈。",
      choices:[
        { text:"把每个人帮过什么画在向日葵花瓣上", effects:{stats:{order:2,kindness:1}, bonds:{xizhou:3,latiao:2,cutie:1}}, flags:["credit_board"], result:"花瓣墙没有变成比赛，反而让很多平时没人注意的小帮忙被大家看见。" },
        { text:"大家共同完成，不再区分个人", effects:{stats:{kindness:1}, bonds:{huan:2,puff:1,xizhou:-1}}, result:"争论暂时结束，但西洲把自己剩下的任务悄悄划掉了两项。" },
        { text:"请每个人说出最感谢的一位同学", effects:{stats:{kindness:2,courage:1}, bonds:{latiao:2,huan:1,xizhou:1}}, flags:["thanks_circle"], result:"最初没人愿意开口。辣条第一个说完后，感谢逐渐具体到每一卷胶带和每一次等待。" }
      ]
    },
    {
      id:"final_rehearsal", day:[16,17], title:"最后一次彩排", characters:["diandian","moto","huahua","qaq"],
      text:"彩排在最后一关卡住了。时间只剩一晚：可以删掉结尾保证稳定，也可以继续修到最后。",
      choices:[
        { text:"删掉复杂结尾，保证所有参与者都能完成", effects:{stats:{order:2}, bonds:{xizhou:2,taoba:1,cutie:1}}, flags:["safe_finale"], result:"最后一段少了一点花样，却让每个小朋友都能顺利玩完。西洲说，能好好玩到最后已经很不错。" },
        { text:"保留结尾，全班一起试到它能顺利玩", require:{stat:"energy",min:2}, effects:{stats:{courage:2,creativity:1}, energy:-2, bonds:{diandian:2,moto:2,huahua:2}}, flags:["true_finale"], result:"你们试了十七次。第十八次，最后一盏纸灯终于按顺序亮起，全班安静了一秒，然后一起欢呼。" },
        { text:"让QAQ丨提出最小改动方案", effects:{stats:{creativity:1,order:1}, bonds:{qaq:3,huan:1}}, flags:["qaq_solution"], result:"QAQ丨删掉了一个没人注意的步骤，整个游戏顺序突然顺了。他说自己只是“不想再试第十八次”。" }
      ]
    },
    {
      id:"festival", day:[18,18], title:"向日葵中班开放日", characters:["all"],
      text:"开放日终于开始了。有人在门口紧张得把欢迎词说错，有人在隐藏角落里笑得前仰后合，也有人玩完还想再来一次。你站在教室中央，忽然觉得这里已经很像自己的教室了。",
      choices:[
        { text:"留在入口，照顾第一次参加的人", effects:{stats:{kindness:2}, bonds:{cutie:2,momo:2,taoba:1}}, flags:["final_host"] , result:"你没有体验完整活动，却记住了许多参与者放松下来的表情。" },
        { text:"到最混乱的关卡现场救火", effects:{stats:{courage:1,order:1}, bonds:{moto:2,diandian:2,latiao:1}}, flags:["final_rescue"], result:"你一整天都在奔跑。活动结束后，蘑托车把冠军贴纸贴在了你的袖口上。" },
        { text:"悄悄走完整条故事路线", effects:{stats:{creativity:1,kindness:1}, bonds:{qaq:2,huahua:2,niko:1}}, flags:["final_witness"], result:"你看见每个人做的小东西怎样接在一起。最后一张纸条上写着：『欢迎来到向日葵中班。』" }
      ]
    }
  ],
  followups: [
    {
      id:"truth_after_hidden", day:[10,13], requireFlag:"hidden_mistake", title:"没有说开的责任", characters:["huahua","puff"],
      text:"花花发现颜料盒的位置不对，已经猜到颜料是谁打翻的。泡芙问你，现在还要不要说实话。",
      choices:[
        { text:"陪泡芙一起坦白", effects:{stats:{courage:1,kindness:1}, bonds:{huahua:3,puff:2}}, flags:["repaired_trust"], result:"花花真正介意的不是颜料，而是自己被排除在真相之外。三个人一起重做了收纳规则。" },
        { text:"继续保守秘密", effects:{bonds:{puff:1,huahua:-2}}, result:"秘密没有被揭穿，但之后花花不再把重要材料交给你保管。" }
      ]
    },
    {
      id:"track_return", day:[13,16], requireFlag:"paper_track", title:"被雨泡皱的赛道", characters:["qaq","moto"],
      text:"最初画的纸赛道被雨水泡皱。QAQ丨准备扔掉，蘑托车却说它是最早画好的游戏板。",
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
      text:"欢佬设计的快速计分法在多人测试时失效。西洲没有责怪他，只问今晚谁来把漏掉的贴纸和分数补上。",
      choices:[
        { text:"和欢佬一起补完规则", effects:{stats:{order:2}, bonds:{huan:3,xizhou:1}}, result:"欢佬一边抱怨一边把漏洞全部补上，最后承认“省力也要省得负责”。" },
        { text:"改回最初的完整规则", effects:{stats:{order:1}, bonds:{xizhou:2,huan:-1}}, result:"问题解决了，但欢佬明显觉得自己的尝试被全盘否定。" }
      ]
    }
  ],
  awards: [
    { id:"sun", name:"向日葵小太阳奖", desc:"能让不同的人继续朝同一个方向前进。", test:s=>s.stats.kindness>=7 && s.stats.order>=6 },
    { id:"spark", name:"小脑瓜亮晶晶奖", desc:"总能从麻烦里找到新的可能。", test:s=>s.stats.creativity>=8 },
    { id:"anchor", name:"稳稳当当奖", desc:"混乱时最先看清下一步的人。", test:s=>s.stats.order>=8 },
    { id:"brave", name:"我先来试试奖", desc:"即使没有把握，也愿意迈出第一步。", test:s=>s.stats.courage>=8 },
    { id:"listener", name:"认真听你说奖", desc:"让许多没有说出口的话获得回应。", test:s=>s.stats.kindness>=9 },
    { id:"full_story", name:"把灯灯全部点亮奖", desc:"见证了活动从第一张草图到最后一盏灯。", test:s=>s.flags.includes("true_finale") && s.flags.includes("final_witness") }
  ]
};

// 剧情版 v2：扩展事件池、连续剧情、主要结局与奖项。
GAME_DATA.events.push(
  {
    id:"name_wall", day:[2,5], title:"名字墙还差一个小标记", characters:["cutie","qaq","huahua"],
    text:"小可爱正在制作全班名字墙，却发现有人不喜欢被拍照，也有人不知道该给自己画什么标志。你的名字旁边也还是空白。",
    choices:[
      {text:"给每个人设计可自行修改的符号",effects:{stats:{creativity:2,kindness:1},bonds:{cutie:2,huahua:2}},flags:["symbol_wall"],result:"名字墙逐渐长出奇怪又准确的符号。QAQ丨最后给自己画了一条竖线。"},
      {text:"先留下空位，等大家自己决定",effects:{stats:{kindness:2},bonds:{qaq:2,cutie:1}},flags:["respected_blank"],result:"空白没有显得不完整，反而像一种被允许的等待。几天后，有人悄悄补上了自己的标志。"},
      {text:"发起一分钟快速自画像",effects:{stats:{courage:1,creativity:1},bonds:{diandian:2,puff:1}},result:"画得最不像的人反而笑得最大声。你的画像被点点坚持贴在最中间。"}
    ]
  },
  {
    id:"broken_game", day:[3,7], title:"只剩半张说明书的旧桌游", characters:["qaq","niko","moto"],
    text:"储物箱里翻出一盒旧桌游，说明书只剩后半页。蘑托车想按经验补规则，妮蔻坚持缺失部分可能藏着完全不同的玩法。",
    choices:[
      {text:"根据零件反推原本规则",effects:{stats:{order:1,creativity:1},bonds:{niko:2,qaq:1}},flags:["recovered_game"],result:"你们拼出一套能自洽的规则。没人知道是否正确，但它像真的流传过很多年。"},
      {text:"让蘑托车设计竞技版",effects:{stats:{courage:1},bonds:{moto:3}},flags:["moto_rules"],result:"新规则异常激烈。蘑托车赢了第一局，却主动削弱了自己最占优势的角色。"},
      {text:"把缺失规则当成每局随机任务",effects:{stats:{creativity:2},bonds:{niko:3,huan:1}},flags:["chaos_game"],result:"游戏变得无法预测，甚至出现了“本局不能说完整句子”的任务。"}
    ]
  },
  {
    id:"quiet_lunch", day:[4,8], title:"今天想一个人安静吃饭", characters:["xizhou","puff","momo"],
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
    id:"rumor", day:[7,11], title:"“开放日会不会办不成？”", characters:["latiao","niko","puff"],
    text:"不知道谁说老师觉得大家准备得太慢，开放日可能要缩小规模。消息传了一圈后，已经变成“开放日要取消了”。",
    choices:[
      {text:"去问老师原话到底是什么",effects:{stats:{order:2,courage:1},bonds:{latiao:2,niko:1}},flags:["rumor_checked"],result:"老师原本只说“下雨时有几个游戏可能要换地方”。传言停下了，大家也开始准备室内玩法。"},
      {text:"先安抚大家，等正式通知",effects:{stats:{kindness:2},bonds:{puff:2,momo:1}},result:"情绪稳定了，不过半天后仍有人不断来问你是否知道内幕。"},
      {text:"顺势组织一次下雨天玩法试演",effects:{stats:{order:1,courage:1},bonds:{xizhou:2,huan:1}},flags:["backup_plan"],result:"取消传言是假的，室内玩法却在之后真的派上了用场。"}
    ]
  },
  {
    id:"two_leaders", day:[8,12], title:"两个小队长", characters:["diandian","xizhou","latiao"],
    text:"点点总喜欢一边玩一边临时想新主意，西洲则坚持照着安排表一点点完成。两人都觉得对方在打乱自己的节奏，最后在全班面前闹起了别扭。",
    choices:[
      {text:"约好一个负责临场主意，一个负责安排顺序",effects:{stats:{order:2},bonds:{diandian:2,xizhou:2}},flags:["dual_lead"],result:"两个人第一次发现，他们吵的不是谁更厉害，而是谁来管“突然想到的新主意”和“本来答应好的事”。"},
      {text:"让两人半天互换任务",effects:{stats:{kindness:1,creativity:1},bonds:{diandian:2,xizhou:2}},flags:["role_swap"],result:"半天后，两个人都不再觉得对方的事情“只是说几句话”或者“只是写写画画”。"},
      {text:"让大家举手选一个总小队长",effects:{stats:{courage:1},bonds:{latiao:2,diandian:-1,xizhou:-1}},result:"结果很明确，气氛却没有变好。输的一方照做了，但不再主动补充意见。"}
    ]
  },
  {
    id:"gift_budget", day:[9,13], title:"材料盒只够做一半徽章", characters:["cutie","momo","huan"],
    text:"小可爱想做的纪念徽章需要很多亮片和贴纸，可材料盒里的东西只够做一半。馍馍建议少做一点，欢佬说也可以改用瓶盖和彩纸，只是不会那么整齐。",
    choices:[
      {text:"改成每个人都不同的瓶盖徽章",effects:{stats:{creativity:2},bonds:{cutie:2,huan:2}},flags:["bottle_badges"],result:"没有两枚徽章完全一样。小可爱一开始很犹豫，后来把“不整齐”写进了作品说明。"},
      {text:"只送给完成全部关卡的人",effects:{stats:{order:1,courage:1},bonds:{moto:2,cutie:-1}},flags:["limited_badges"],result:"徽章变成奖品，挑战热度明显上升，也有人因为没拿到而失望。"},
      {text:"取消实物，改写每人的纪念留言",effects:{stats:{kindness:2},bonds:{momo:2,cutie:2}},flags:["message_gifts"],result:"写留言花的时间比制作徽章还久，但许多人把它夹进了书里。"}
    ]
  },
  {
    id:"night_guard", day:[11,14], title:"大风天前要不要再检查一遍", characters:["taoba","moto","huan"],
    text:"老师说明天可能有大风，窗边和门口的装饰最好今天离园前再检查一遍。桃爸想多留一会儿把东西收稳，蘑托车说自己也可以帮忙，欢佬却觉得不一定非要拖到很晚。",
    choices:[
      {text:"约好分工，大家一起快快检查完",effects:{stats:{order:2,kindness:1},bonds:{taoba:2,moto:1,huan:1}},flags:["safe_shift"],result:"大家一起把容易被风吹跑的东西都收好，没有谁被单独留下到很晚。第二天看着还稳稳挂着的装饰，大家都很开心。"},
      {text:"陪桃爸把窗边角落再检查一遍",effects:{stats:{courage:1},energy:-1,bonds:{taoba:3}},flags:["night_watch"],result:"你们把窗边的小风车、门口的纸牌和松掉的绳子都重新系好。虽然回家晚了一点，但第二天一进门就能看到它们还好好地挂着。"},
      {text:"先把关键地方加固好，再一起按时回家",effects:{stats:{creativity:1,order:1},bonds:{huan:3,xizhou:1}},flags:["no_martyr"],result:"事实证明欢佬说得没错：把容易出问题的地方先处理好，比硬撑着待到很晚更有用。"}
    ]
  },
  {
    id:"lost_voice", day:[12,15], title:"泡芙一紧张就说不出话", characters:["puff","latiao","qaq"],
    text:"负责开场欢迎的泡芙因为太紧张，一张嘴就卡住了。辣条说不如赶紧换人，QAQ丨却把欢迎词拆成几张很短很短的小卡片。",
    choices:[
      {text:"陪泡芙按卡片一句句练习",effects:{stats:{kindness:2},bonds:{puff:3,qaq:1}},flags:["puff_host"],result:"泡芙最后仍有两次停顿，但每一次都自己接了下去。"},
      {text:"把开场改成全班接力",effects:{stats:{creativity:2},bonds:{puff:2,latiao:2,cutie:1}},flags:["relay_host"],result:"没有人需要独自承担整段台词。开场意外成了最有班级特色的环节。"},
      {text:"由自己临时替代主持",effects:{stats:{courage:2},bonds:{latiao:2,puff:1}},flags:["player_host"],result:"你顺利完成了开场。泡芙很感谢你，却也偷偷把原稿留了下来。"}
    ]
  },
  {
    id:"copycat", day:[13,16], title:"隔壁班也做了很像的游戏", characters:["huahua","diandian","niko"],
    text:"隔壁班把开放日的海报贴出来后，大家发现其中几个游戏和你们想的很像。点点怀疑他们偷看过，花花则担心来参观的人会觉得向日葵中班在学别人。",
    choices:[
      {text:"继续原计划，用把自己的细节认真做好",effects:{stats:{order:1,courage:1},bonds:{huahua:2,xizhou:1}},flags:["kept_identity"],result:"相似的入口后面是完全不同的体验。花花终于相信，想法相似不等于作品相同。"},
      {text:"临时加入只有本班知道的故事细节",effects:{stats:{creativity:2},bonds:{niko:3,diandian:1}},flags:["secret_lore"],result:"旧纸条、纸赛道和午饭偏好都变成了故事线索。外人看不懂，熟悉的人却不断笑出来。"},
      {text:"直接去隔壁班询问",effects:{stats:{courage:2},bonds:{diandian:2,latiao:1}},result:"对方也以为是你们参考了他们。两边问过老师后发现，只是同时想到类似方案。"}
    ]
  },
  {
    id:"empty_corner", day:[14,17], title:"教室最后空着的一角", characters:["qaq","xizhou","huahua"],
    text:"大家把主要区域都准备得差不多了，只剩教室后面一小块空地。布置图上没有它，大家也都说自己已经有点累了。",
    choices:[
      {text:"保持空白，设置成休息区",effects:{stats:{kindness:2,order:1},bonds:{qaq:2,xizhou:2}},flags:["rest_corner"],result:"开放日当天，这个没有游戏规则的角落坐满了人。它成了少数不用完成什么的地方。"},
      {text:"把本学期失败品集中陈列",effects:{stats:{creativity:2,courage:1},bonds:{huahua:2,niko:2}},flags:["failure_museum"],result:"皱掉的纸、写错的牌子和废弃规则被认真标注。许多人停留得比在成品区更久。"},
      {text:"最后加一个很难发现的小机关",effects:{stats:{courage:1},energy:-1,bonds:{moto:3,diandian:1}},flags:["last_secret"],result:"你们赶在开放日前试成功了。只有七个人发现它，其中三个人回来挑战了第二次。"}
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
    id:"last_apology", day:[16,17], title:"开放日前的道歉", characters:["latiao","huan","xizhou"],
    text:"欢佬承认自己前几天答应画的几张记录卡其实一直没做，却一直装作已经放进材料盒了。辣条觉得现在才说太晚了，西洲则等着他拿出补救办法。",
    choices:[
      {text:"让他把缺的记录卡补出来",effects:{stats:{order:2},bonds:{huan:2,xizhou:2}},flags:["late_repair"],result:"道歉没有一下子让大家不介意，但缺的记录卡真的被补好了。欢佬也第一次没有靠开玩笑把事情糊弄过去。"},
      {text:"接受道歉，让大家说出仍介意的事",effects:{stats:{kindness:2,courage:1},bonds:{latiao:2,huan:2}},flags:["honest_circle"],result:"谈话比预想中更长。没有所有问题都解决，但至少它们不再躲在“算了”后面。"},
      {text:"都快结束了，先不追究",effects:{stats:{kindness:1},bonds:{huan:2,xizhou:-1}},result:"气氛迅速轻松下来。西洲没有反对，只把那份不完整的记录单独收进了文件夹。"}
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
  {id:"backup_used",day:[12,15],requireFlag:"backup_plan",title:"真正用上的备用方案",characters:["xizhou","huan","diandian"],text:"停电后，原来要亮灯和播放的小环节一下子做不了了。那份因为传言而提前准备的“备用小游戏路线”，这时成了最能立刻用上的方案。",choices:[
    {text:"把几个游戏改成停电也能玩的版本",effects:{stats:{order:2},bonds:{xizhou:3,huan:1}},flags:["plan_b_saved"],result:"亮灯游戏被换成了手影和猜声音，虽然和原计划不同，大家还是顺利玩了下去。"},
    {text:"只采用其中最关键的部分",effects:{stats:{creativity:1,order:1},bonds:{diandian:2,xizhou:1}},result:"原方案保住了特色，备用方案则接住了最容易失败的地方。"}
  ]},
  {id:"roles_return",day:[14,16],requireFlag:"role_swap",title:"交换回来以后",characters:["diandian","xizhou"],text:"虽然已经换回原来的分工，点点却开始主动把新主意写到安排表上，西洲也会在现场允许临时改动。两个人都假装这和之前互换任务没关系。",choices:[
    {text:"把新的合作办法画进布置图",effects:{stats:{order:2},bonds:{diandian:2,xizhou:2}},flags:["shared_leadership"],result:"布置图没有写谁更重要，只画清楚新主意该放在哪里、答应的事情该怎么记住。"},
    {text:"不点破，让默契自然形成",effects:{stats:{kindness:1},bonds:{diandian:2,xizhou:2}},result:"没人宣布和解，但下一次意见不同时，他们很快就说清楚了。"}
  ]},
  {id:"badge_after",day:[15,17],requireFlag:"bottle_badges",title:"少了一枚瓶盖徽章",characters:["cutie","momo","huan"],text:"徽章全都做好后，大家发现居然还差一枚。最省事的做法，是让负责制作的人自己不要拿。",choices:[
    {text:"拆开两枚重新组合成三枚",effects:{stats:{creativity:2},bonds:{cutie:2,huan:2}},flags:["everyone_badge"],result:"三枚都变得更小，却没有任何人被排除在外。"},
    {text:"举行抽签，结果由运气决定",effects:{stats:{courage:1},bonds:{huan:1,momo:1}},result:"抽签很公平，但没抽到的人还是笑得有些勉强。"}
  ]},
  {id:"voice_return",day:[17,17],requireFlag:"puff_host",title:"泡芙要求再练一次",characters:["puff","qaq"],text:"正式开始前，泡芙小声说想把欢迎词从头到尾完整练一遍。这样会占用最后检查灯和道具的时间。",choices:[
    {text:"陪她完整练完",effects:{stats:{kindness:2},energy:-1,bonds:{puff:3,qaq:1}},flags:["voice_found"],result:"最后一句结束时，她已经不再看卡片。设备检查虽然匆忙，却没有出问题。"},
    {text:"只练最容易卡住的部分",effects:{stats:{order:1,kindness:1},bonds:{puff:2,xizhou:1}},result:"她仍然紧张，但知道自己最可能在哪里停下来，也知道停下来以后怎么继续。"}
  ]},
  {id:"failure_answer",day:[17,17],requireFlag:"failure_museum",title:"失败展需要一句说明",characters:["huahua","niko","moto"],text:"那些没成功的半成品已经摆好了，只差一张入口说明。蘑托车不太喜欢“失败展”这个名字，妮蔻却觉得直接一点也很好。",choices:[
    {text:"写：这些东西没有被白做",effects:{stats:{kindness:1,creativity:1},bonds:{huahua:2,moto:2}},flags:["failure_has_value"],result:"许多人看完后开始讲自己丢掉过的半成品。"},
    {text:"写：请找出它们后来去了哪里",effects:{stats:{creativity:2},bonds:{niko:3}},flags:["failure_clues"],result:"失败品与最终作品之间被连成了一条隐藏故事线。"}
  ]}
);

GAME_DATA.endings = [
  {id:"heart",name:"大家愿意把心事告诉你",desc:"这一学期里，你多次选择先听清别人的感受，再决定要不要帮忙。你没有替所有人解决问题，也没有保证每次都能得到好结果；但开放日结束后，大家遇到难开口的事情时，仍会自然地坐到你旁边。这个结局评价的是你在许多小选择里留下的耐心，而不是某一位同学对你的依赖。",priority:0,test:s=>true},
  {id:"architect",name:"你把混乱变成了可以完成的事",desc:"你经常选择整理顺序、补足缺口、提前准备和确认细节。别人未必总喜欢你的安排，但当材料不够、规则混乱或时间紧张时，你留下的办法让大家还能继续。开放日结束后，教室里没有谁特别夸耀你，可许多顺利都能追溯到你做过的选择。",priority:0,test:s=>true},
  {id:"spark",name:"你让意外长出了新的玩法",desc:"你没有执着于把所有东西恢复成原计划。画坏的纸、弄乱的规则和临时出现的空位，经常被你改造成另一种玩法。这个学期留下的许多有趣部分，并不是因为你提前想得最周全，而是因为你愿意在事情出错后继续创造。",priority:0,test:s=>true},
  {id:"first_step",name:"你总愿意先试一次",desc:"当大家都在等别人行动时，你经常选择先开口、先尝试或先承担一次失败。你有时判断正确，也有时把事情弄得更复杂，但许多停住的故事因为你的选择重新开始。开放日结束后，大家记住的不是你每次都成功，而是你很少让害怕成为唯一的答案。",priority:0,test:s=>true},
  {id:"friendship",name:"你认真留下了一段关系",desc:"这一学期里，你把许多时间和选择集中给了同一个人。你没有因此认识所有同学，也错过了一些集体事件，但你和那个人共享的细节变得越来越多。这个结局并不评价谁更重要，只说明你选择让一段关系慢慢变深。",priority:0,test:s=>true},
  {id:"ordinary",name:"你在这里留下了自己的位置",desc:"你的选择没有形成特别鲜明的单一路线。你帮助过人，也优先照顾过自己；尝试过新事，也有几次决定先休息。开放日结束后，没有一个奖项能完整概括你，但大家已经会自然地给你留位置、问你明天还来不来。",priority:0,test:s=>true},
  {id:"shared_class",name:"你总在确认有没有人被落下",desc:"当材料、机会或注意力不够分时，你多次选择重新分配，而不是默认让某个人退出。结果未必最漂亮，过程也更麻烦，但开放日结束后，每个人都能指出一处自己真正参与过的地方。这个结局来自你连续做出的包容选择。",priority:0,test:s=>s.flags.includes("everyone_badge")&&s.flags.includes("free_photo")&&s.flags.includes("rest_corner")},
  {id:"true_story",name:"你把答应过的事走到了最后",desc:"你曾有机会缩短、替换或放弃那个最初答应大家的结尾，但你选择继续调整，并承担额外的精力成本。最终成果并不完美，其中仍有迟到和失误，可它确实完成了。这个结局评价的是你对自己承诺的坚持。",priority:0,test:s=>s.flags.includes("true_finale")&&s.flags.includes("final_witness")},
  {id:"class_archive",name:"你把散落的回忆连成了故事",desc:"你多次选择保留旧纸条、失败品和看似无用的线索，并主动寻找它们之间的联系。开放日里，参观的人未必看懂全部细节，但同学们知道那些故事为什么重要。这个结局来自你对共同记忆的整理，而不是某个角色的个人支线。",priority:0,test:s=>s.flags.includes("class_game")&&s.flags.includes("secret_lore")&&s.flags.includes("failure_clues")},
  {id:"trust_rebuilt",name:"你没有用“算了”盖住问题",desc:"面对隐瞒、失约和受伤的感受时，你选择让事情被说清楚，也接受坦白以后关系不会立刻恢复。你没有制造一个完美和解，却让之后的相处不再建立在假装没发生过之上。",priority:0,test:s=>s.flags.includes("repaired_trust")&&s.flags.includes("honest_circle")},
  {id:"quiet_place",name:"你允许别人按自己的速度参加",desc:"你没有要求每个人都必须热闹、勇敢或立刻回答。你多次为不想露脸、暂时疲惫或需要独处的人保留选择。开放日结束后，那些安静的空间和不完整的合照，成为你这一局最清楚的痕迹。",priority:0,test:s=>s.flags.includes("quiet_respected")&&s.flags.includes("rest_corner")&&s.flags.includes("respected_blank")},
  {id:"storm_team",name:"你让大家一起承担了混乱",desc:"意外发生时，你没有寻找一个人来负责全部，也没有把风险推给最可靠的人。你选择分工、备用方案和共同承担损失。最后仍有东西没能保住，但没人需要独自背负失败。",priority:0,test:s=>s.flags.includes("storm_leader")&&s.flags.includes("plan_b_saved")&&(s.flags.includes("safe_shift")||s.flags.includes("no_martyr"))},
  {id:"many_seasons",name:"你学会了不把每次经历当成同一条路",desc:"经历多个学期后，你面对似曾相识的场景时，没有机械重复以前的答案。你愿意承认记忆可能混在一起，也重新观察眼前的人和变化。这个结局来自多周目中的不同选择，而不是单纯完成足够次数。",priority:0,test:(s,m)=>m.runs>=4&&s.flags.includes("memory_page_rebuilt")&&s.flags.includes("remembered_dream")},
  {id:"keeper_between",name:"你没有把别人的回忆据为己有",desc:"当不属于这一学期的东西出现在你面前时，你选择寻找原来的归属，而不是把它当成自己的收藏。你没有因此得到更耀眼的奖励，却学会了有些故事可以被认真保管，却不必由自己拥有。",priority:0,test:(s,m)=>m.runs>=3&&s.flags.includes("meta_badge_returned")}
];

GAME_DATA.awards = [
  {id:"sun",name:"向日葵小太阳奖",desc:"能让不同的人继续朝同一个方向前进。",test:s=>s.stats.kindness>=7&&s.stats.order>=6},
  {id:"spark",name:"小脑瓜亮晶晶奖",desc:"总能从麻烦里找到新的可能。",test:s=>s.stats.creativity>=8},
  {id:"anchor",name:"稳稳当当奖",desc:"混乱时最先看清下一步的人。",test:s=>s.stats.order>=8},
  {id:"brave",name:"我先来试试奖",desc:"即使没有把握，也愿意迈出第一步。",test:s=>s.stats.courage>=8},
  {id:"listener",name:"认真听你说奖",desc:"让许多没有说出口的话获得回应。",test:s=>s.stats.kindness>=9},
  {id:"full_story",name:"把灯灯全部点亮奖",desc:"见证活动从第一张草图到最后一盏灯。",test:s=>s.flags.includes("true_finale")&&s.flags.includes("final_witness")},
  {id:"truth",name:"迟到的坦白奖",desc:"保护一个人，也没有让另一个人永远被蒙在鼓里。",test:s=>s.flags.includes("repaired_trust")},
  {id:"archivist",name:"班级考古学家",desc:"让旧物不只是旧物，而成为这一届的新故事。",test:s=>s.flags.includes("class_game")||s.flags.includes("old_notes")},
  {id:"no_one_out",name:"一个也不能少",desc:"在材料不够时仍设法让每个人都得到一份。",test:s=>s.flags.includes("everyone_badge")},
  {id:"failure",name:"小失败也珍贵奖",desc:"认真保存那些没有成功、却并非没有价值的尝试。",test:s=>s.flags.includes("failure_museum")},
  {id:"quiet",name:"安静一下也没关系奖",desc:"知道有时最好的关心，是允许别人暂时不回答。",test:s=>s.flags.includes("quiet_respected")&&s.flags.includes("respected_blank")},
  {id:"bird",name:"窗台小观察家",desc:"在好奇之前先学会不打扰。",test:s=>s.flags.includes("bird_rescue")},
  {id:"plan_b",name:"备用方案不是诅咒",desc:"提前想过失败，因此真正失败时没有慌乱。",test:s=>s.flags.includes("plan_b_saved")},
  {id:"two_heads",name:"两个小队长也可以",desc:"没有急着选出唯一正确的人，而是让不同能力各自负责。",test:s=>s.flags.includes("shared_leadership")||s.flags.includes("dual_lead")},
  {id:"voice",name:"把声音还给本人",desc:"没有因为紧张就替别人决定她做不到。",test:s=>s.flags.includes("voice_found")},
  {id:"identity",name:"只有我们看得懂",desc:"把共同经历藏进作品，让它真正属于这个班级。",test:s=>s.flags.includes("secret_lore")},
  {id:"rest",name:"什么都不用做奖",desc:"为疲惫的人留下一个不需要完成任务的角落。",test:s=>s.flags.includes("rest_corner")},
  {id:"photo",name:"想怎么入镜都可以奖",desc:"让每个人用自己愿意的方式出现在回忆里。",test:s=>s.flags.includes("free_photo")},
  {id:"responsible_shortcut",name:"负责任的捷径奖",desc:"省力以后，仍愿意回来补上省略的部分。",test:s=>s.flags.includes("shortcut")&&s.history.some(h=>h.title==="捷径留下的问题")},
  {id:"deep_friend",name:"放学后还想一起玩",desc:"与一位同学建立了格外深的关系。",test:s=>Math.max(...Object.values(s.bonds))>=12}
];

// v4 群像扩展：新增 8 个独立事件与 8 个条件后续事件。
// 12 名角色在新增普通事件中各出现 2 次，避免任何角色成为固定主角。
GAME_DATA.events.push(
  {
    id:"shadow_play", day:[2,6], title:"窗帘后面的影子剧场", characters:["qaq","diandian","huahua"],
    text:"午后的阳光把窗框投在白窗帘上。点点立刻用手比出一只大怪兽，花花想做纸偶，QAQ丨则默默把椅子挪成了观众席。",
    choices:[
      {text:"一起做一场有开头和结尾的小影子戏",effects:{stats:{creativity:2},bonds:{huahua:2,qaq:1,diandian:1}},flags:["shadow_story"],result:"纸兔子、手掌怪兽和一条总是走错方向的小鱼，最后真的演完了一个完整故事。"},
      {text:"让每个人轮流即兴表演",effects:{stats:{courage:1,kindness:1},bonds:{diandian:2,qaq:1}},flags:["shadow_turns"],result:"有人表演得很大声，也有人只让一只小鸟飞过窗帘。轮到QAQ丨时，他让一条竖线站了整整十秒。"},
      {text:"只把影子形状描下来做成墙面装饰",effects:{stats:{order:1,creativity:1},bonds:{huahua:2}},result:"墙上多了一排奇怪轮廓。第二天大家还在争论其中一个到底是兔子还是水壶。"}
    ]
  },
  {
    id:"sticker_trade", day:[3,7], title:"贴纸交换摊开张了", characters:["moto","momo","niko"],
    text:"妮蔻把自己的贴纸排成一排，宣布可以交换。蘑托车只想换到闪电贴纸，馍馍却发现有人拿着最喜欢的贴纸，明明舍不得还硬说可以换。",
    choices:[
      {text:"规定喜欢的贴纸可以标记为“不交换”",effects:{stats:{kindness:2,order:1},bonds:{momo:2,niko:1}},flags:["safe_stickers"],result:"摊位上第一次出现了“只展示”的一栏。舍不得不再是一件需要假装没有的事。"},
      {text:"举办一次盲抽交换",effects:{stats:{courage:1,creativity:1},bonds:{niko:2,moto:1}},flags:["blind_trade"],result:"蘑托车抽到了一只粉红兔子，嘴上说太幼稚，最后却贴在了自己的计分卡背面。"},
      {text:"让每个人讲讲为什么喜欢自己的贴纸",effects:{stats:{kindness:2},bonds:{momo:2,moto:1}},result:"原本普通的小贴纸忽然都有了故事。妮蔻听完后，主动取消了两笔不太公平的交换。"}
    ]
  },
  {
    id:"shoe_mixup", day:[4,8], title:"午睡后鞋子全乱了", characters:["taoba","puff","huan"],
    text:"午睡结束后，鞋架前一片混乱。泡芙只找到一只自己的鞋，桃爸开始检查每一双，欢佬则说：『把所有鞋排成队，不就自己招供了吗？』",
    choices:[
      {text:"按颜色和大小一起分类寻找",effects:{stats:{order:2},bonds:{taoba:2,huan:1}},flags:["shoe_sort"],result:"鞋子很快一双双配回去了。最后那只孤零零的小鞋，原来被踢进了午睡垫下面。"},
      {text:"先安慰泡芙，再请大家检查自己有没有穿错",effects:{stats:{kindness:2},bonds:{puff:3,taoba:1}},result:"有人低头一看，才发现自己左右脚都不是同一双。泡芙终于笑了出来。"},
      {text:"把找鞋变成一场侦探游戏",effects:{stats:{creativity:1,courage:1},bonds:{huan:2,puff:1}},flags:["shoe_detective"],result:"欢佬画了一张非常潦草的“鞋印地图”，居然真的指向了正确方向。"}
    ]
  },
  {
    id:"fancy_paper", day:[5,9], title:"一叠漂亮得舍不得用的纸", characters:["xizhou","latiao","cutie"],
    text:"西洲带来一叠摸起来很厚、边缘还闪着细光的彩纸，随手放在手工桌上。小可爱觉得剪坏太可惜，辣条却说：『纸不就是拿来剪的吗？』西洲抬头补了一句：『终于有人说了句有用的。』",
    choices:[
      {text:"每个人先画好轮廓，再开始剪",effects:{stats:{order:1,creativity:1},bonds:{xizhou:2,cutie:2}},flags:["careful_paper"],result:"浪费的边角很少。西洲嘴上嫌大家太慢，最后却把剩下的纸也留在了班里。"},
      {text:"直接拿来做最大的一朵向日葵",effects:{stats:{courage:1,creativity:2},bonds:{latiao:2,xizhou:1}},flags:["big_sunflower"],result:"第一刀下去时大家都倒吸一口气。完成后，那朵向日葵几乎占了半面墙。"},
      {text:"先问清楚是不是可以随便使用",effects:{stats:{kindness:1},bonds:{xizhou:2,cutie:1}},result:"西洲说：『我放在这里，不是让你们隔着三米欣赏的。』说完还把最好看的金色纸推了过来。"}
    ]
  },
  {
    id:"bubble_day", day:[7,11], title:"泡泡水只剩最后一瓶", characters:["qaq","moto","taoba"],
    text:"户外活动时，泡泡水只剩一小瓶。蘑托车想比赛谁吹得最大，桃爸担心抢来抢去会洒掉，QAQ丨则已经拿着一根吸管研究怎么吹出两个连在一起的泡泡。",
    choices:[
      {text:"轮流吹，每个人都有三次机会",effects:{stats:{order:2},bonds:{taoba:2,moto:1}},flags:["bubble_turns"],result:"规则很简单，大家却认真得像在参加大赛。最后最大的一只泡泡落在QAQ丨头上才破。"},
      {text:"一起研究能不能吹出奇怪形状",effects:{stats:{creativity:2},bonds:{qaq:3,moto:1}},flags:["bubble_lab"],result:"没有人吹出方形泡泡，但你们成功做出了一串像葡萄一样的小泡泡。"},
      {text:"把最后一瓶留给还没玩过的人",effects:{stats:{kindness:2},bonds:{taoba:2,qaq:1}},result:"蘑托车虽然有点不甘心，还是站在旁边负责宣布每一只泡泡的“正式成绩”。"}
    ]
  },
  {
    id:"nap_story", day:[8,12], title:"午睡前没讲完的故事", characters:["diandian","momo","puff"],
    text:"午睡前，老师讲的故事正好停在小熊打开门之前。点点坚持门后是宝藏，泡芙觉得一定是迷路的小动物，馍馍说也可能只是晚饭。",
    choices:[
      {text:"让大家轮流接一句，编出自己的结尾",effects:{stats:{creativity:2,kindness:1},bonds:{diandian:2,puff:2,momo:1}},flags:["story_chain"],result:"故事越接越长，小熊最后带着宝藏、迷路的小动物和晚饭一起回了家。"},
      {text:"把三种猜想都画下来，醒来后投票",effects:{stats:{order:1,creativity:1},bonds:{puff:2,diandian:1}},flags:["story_vote"],result:"午睡醒来后，大家忘了投票，却围着三张画继续编了半天。"},
      {text:"先睡觉，把答案留到明天",effects:{energy:1,stats:{kindness:1},bonds:{momo:2}},result:"馍馍说这才是最合理的办法。第二天故事继续时，三个人发现自己全都猜错了。"}
    ]
  },
  {
    id:"garden_sign", day:[10,14], title:"小花盆需要一块牌子", characters:["huahua","niko","xizhou"],
    text:"窗边的小芽终于长出来了，可大家忘了种的是什么。花花想画一块漂亮牌子，妮蔻想写“神秘植物”，西洲看了一眼说：『等它长大不就知道了，急什么。』",
    choices:[
      {text:"做一块可以每天记录变化的观察牌",effects:{stats:{order:1,creativity:1},bonds:{huahua:2,niko:1}},flags:["plant_log"],result:"牌子上很快画满叶片、天气和猜测。西洲虽然说很麻烦，却每天都会看一眼。"},
      {text:"就写“还不知道是什么”",effects:{stats:{kindness:1,courage:1},bonds:{niko:2,xizhou:1}},flags:["unknown_plant"],result:"这块诚实的牌子反而最受欢迎。每个人经过时都会留下一个新的猜测。"},
      {text:"请西洲选一块耐用的材料来做",effects:{stats:{order:1},bonds:{xizhou:2,huahua:1}},result:"第二天他带来一块防水小木牌，嘴上说只是家里多余的。花花在上面画了一圈很小的向日葵。"}
    ]
  },
  {
    id:"puppet_voice", day:[12,16], title:"纸袋偶到底该怎么说话", characters:["huan","latiao","cutie"],
    text:"小可爱做了三个纸袋偶，却没人决定它们该用什么声音。辣条想让每个角色都大声说话，欢佬却觉得动嘴太累，提议让纸偶只举牌子。",
    choices:[
      {text:"每个人给一个纸偶配不同声音",effects:{stats:{courage:1,creativity:1},bonds:{latiao:2,cutie:2}},flags:["puppet_voices"],result:"一只纸偶声音像巨人，一只像蚊子，还有一只每说一句就忍不住笑。"},
      {text:"让纸偶用表情和小牌子交流",effects:{stats:{creativity:2},bonds:{huan:3,cutie:1}},flags:["silent_puppets"],result:"欢佬做的第一张牌子写着“我懒得说”。没想到沉默纸偶后来成了最受欢迎的角色。"},
      {text:"让来参观的人现场替纸偶配音",effects:{stats:{courage:2},bonds:{latiao:2,huan:1}},result:"每一场的故事都不一样。有一次反派纸偶因为声音太可爱，当场被大家原谅了。"}
    ]
  }
);

GAME_DATA.followups.push(
  {
    id:"shadow_return", day:[10,15], requireFlag:"shadow_story", title:"影子剧场少了一个角色", characters:["qaq","diandian","huahua"],
    text:"再次排影子戏时，大家发现那条总走错方向的小鱼纸偶不见了。点点想马上重做，花花却舍不得原来的样子。",
    choices:[
      {text:"照着大家的记忆各画一条小鱼",effects:{stats:{creativity:2},bonds:{huahua:2,diandian:1}},result:"三条小鱼长得完全不同，于是剧本也变成了三条小鱼互相找朋友。"},
      {text:"保留空位，让影子里的缺口也成为故事",effects:{stats:{kindness:1,creativity:1},bonds:{qaq:2,huahua:1}},result:"演到小鱼出场时，窗帘上只留下一小块光。QAQ丨说：『它今天请假。』"}
    ]
  },
  {
    id:"sticker_return", day:[11,16], requireFlag:"safe_stickers", title:"那张一直不交换的贴纸", characters:["moto","momo","niko"],
    text:"有个小朋友把最喜欢的贴纸贴在“不交换”栏里很多天，今天却忽然想把它送出去。妮蔻怀疑他只是不敢反悔。",
    choices:[
      {text:"再确认一次，真的愿意才送",effects:{stats:{kindness:2},bonds:{momo:2,niko:1}},result:"确认过后，他还是决定送出。收到贴纸的人也把自己最宝贝的一张放进了“不交换”栏。"},
      {text:"建议先借一天，不急着永久交换",effects:{stats:{order:1,kindness:1},bonds:{niko:2,moto:1}},result:"第二天，贴纸被好好还回来。原来分享不一定非要失去。"}
    ]
  },
  {
    id:"shoe_return", day:[12,16], requireFlag:"shoe_detective", title:"鞋印地图又派上用场了", characters:["taoba","puff","huan"],
    text:"一只室内鞋又不见了。泡芙立刻拿出上次那张歪歪扭扭的鞋印地图，欢佬自己都没想到它会被保留下来。",
    choices:[
      {text:"在旧地图上补画新的线索",effects:{stats:{order:1,creativity:1},bonds:{huan:2,puff:2}},result:"地图越来越乱，却真的带大家找到了藏在窗帘后的鞋。"},
      {text:"请桃爸教大家做一张更清楚的地图",effects:{stats:{order:2},bonds:{taoba:3,huan:1}},result:"新地图清楚得多。欢佬评价：『确实更好，但少了一点侦探的灵魂。』"}
    ]
  },
  {
    id:"paper_return", day:[13,17], requireFlag:"big_sunflower", title:"大向日葵掉了一片花瓣", characters:["xizhou","latiao","cutie"],
    text:"墙上的大向日葵掉下一片金色花瓣。小可爱很着急，辣条说贴回去就行，西洲则评价：『这么大一朵，少一片终于没那么挤了。』",
    choices:[
      {text:"把掉下来的花瓣做成班级书签",effects:{stats:{creativity:2},bonds:{cutie:2,xizhou:1}},result:"向日葵少了一片花瓣，回忆册里却多了一枚闪闪发亮的书签。"},
      {text:"重新贴好，再多加几片不同颜色的",effects:{stats:{courage:1,creativity:1},bonds:{latiao:2,cutie:1}},result:"修好后的花朵反而更不整齐。西洲看了半天，只说：『至少比原来有意思。』"}
    ]
  },
  {
    id:"bubble_return", day:[14,17], requireFlag:"bubble_lab", title:"真的吹出了一个方泡泡？", characters:["qaq","moto","taoba"],
    text:"桃爸带来一个立方体形状的小框架。蘑托车坚信这次一定能吹出方泡泡，QAQ丨则已经开始试。",
    choices:[
      {text:"大家一起慢慢实验",effects:{stats:{creativity:2,order:1},bonds:{qaq:2,taoba:2}},result:"框架里面真的出现了像方块一样的泡泡膜。蘑托车宣布这算成功，尽管它飞出去后还是圆的。"},
      {text:"办一场“最奇怪泡泡”比赛",effects:{stats:{courage:1,creativity:1},bonds:{moto:3,qaq:1}},result:"最后获胜的是一只粘在吸管上、怎么也不肯飞走的小泡泡。"}
    ]
  },
  {
    id:"story_return", day:[14,17], requireFlag:"story_chain", title:"小熊的故事被别人续写了", characters:["diandian","momo","puff"],
    text:"你们编的小熊故事被贴在阅读角后，别的小朋友又在下面画了新的一页：宝藏突然长出了脚。",
    choices:[
      {text:"继续往后接，变成全班共同故事",effects:{stats:{creativity:2,kindness:1},bonds:{diandian:2,puff:2}},result:"故事长到没有人记得最初是谁开始的，但每个人都能找到自己画过的一页。"},
      {text:"把不同结尾分成好几本小书",effects:{stats:{order:1,creativity:1},bonds:{momo:2,puff:1}},result:"阅读角多了三本同名却完全不同的小书。馍馍最喜欢有晚饭的那一本。"}
    ]
  },
  {
    id:"garden_return", day:[15,17], requireFlag:"plant_log", title:"神秘小芽终于开花了", characters:["huahua","niko","xizhou"],
    text:"观察牌写满以后，小花盆终于开出一朵很小的黄色花。妮蔻翻遍记录想确认名字，花花只顾着看它，西洲说：『先拍下来，等会儿又不认识了。』",
    choices:[
      {text:"把每天的记录整理成一本成长册",effects:{stats:{order:1,creativity:1},bonds:{huahua:2,niko:2}},result:"从第一片叶子到第一朵花，每一天都被留下。西洲带来一本很好看的空白小册子，嘴上只说放着也是放着。"},
      {text:"先不查名字，给它起一个班级昵称",effects:{stats:{kindness:1,creativity:1},bonds:{niko:2,xizhou:1}},result:"大家叫它“小黄点”。后来查到正式名字后，也没有人愿意改口。"}
    ]
  },
  {
    id:"puppet_return", day:[16,17], requireFlag:"silent_puppets", title:"沉默纸偶第一次开口", characters:["huan","latiao","cutie"],
    text:"一直只举牌子的纸偶，在最后一次表演前需要说一句结尾。欢佬坚持它开口就不好笑了，辣条却觉得观众一定在等。",
    choices:[
      {text:"只让它在最后说一句“谢谢”",effects:{stats:{kindness:1,courage:1},bonds:{cutie:2,huan:2}},result:"纸偶沉默了整场，最后突然小声说谢谢。全场安静一秒后，掌声比前几次都响。"},
      {text:"继续保持沉默，用一张更大的牌子结尾",effects:{stats:{creativity:2},bonds:{huan:3,latiao:1}},result:"大牌子上写着“我都说完了”。辣条嘴上嫌弃，却笑得最响。"}
    ]
  }
);


// v5：多周目、精力与结局系统重做。
GAME_DATA.maxEnergy = 8;
GAME_DATA.dailyActions = [
  { id:"help", title:"帮忙收拾教室", desc:"一次做完很多杂事，能力成长稳定，也最累。", energy:-2, stats:{order:1,kindness:1}, bonds:["taoba","xizhou","momo"] },
  { id:"play", title:"加入课间游戏", desc:"尽情跑跳，容易和活跃的同学变熟。", energy:-2, stats:{courage:1}, bonds:["qaq","moto","diandian"] },
  { id:"create", title:"认真做一件大手工", desc:"需要长时间专心，有时会为了成品忘记休息。", energy:-3, stats:{creativity:2}, bonds:["huahua","puff","cutie"] },
  { id:"chat", title:"在角落悄悄聊天", desc:"不太累，但得到的成长较少，也可能听见别人不愿公开的烦恼。", energy:-1, stats:{kindness:1}, bonds:["latiao","niko","huan"] },
  { id:"rest", title:"什么都不安排，好好休息", desc:"会错过今天的一次主动成长，但恢复大量精力。", energy:3, stats:{}, bonds:["qaq","xizhou"] }
];


// 奖章用于记录最有代表性的行为。结算时最多展示两枚。
GAME_DATA.awards.forEach((a,i)=>a.priority = 100-i);

// 多周目特殊事件：只有完成指定周目或收集条件后才可能出现。
GAME_DATA.events.push(
  {id:"meta_same_dream",day:[2,5],requireMeta:{runs:2},title:"好像做过一样的梦",characters:["qaq","niko"],text:"午睡醒来后，你准确说出了妮蔻接下来会把积木藏在哪里。她盯着你看了很久，QAQ丨则说自己也觉得今天像发生过。",choices:[
    {text:"把梦里记得的事全部说出来",effects:{stats:{courage:1,creativity:1},bonds:{niko:2,qaq:1}},flags:["remembered_dream"],result:"有些事情真的照着你说的发生了，有些却完全不同。妮蔻开始记录那些不一致的地方。"},
    {text:"当作巧合，不让大家担心",effects:{stats:{kindness:1},bonds:{qaq:2}},flags:["hid_dream"],result:"QAQ丨没有追问，只在放学时说：『下次如果又梦到，记得告诉我结尾。』"}
  ]},
  {id:"meta_empty_cubby",day:[7,11],requireMeta:{runs:3,endings:3},title:"储物格里不属于这一学期的东西",characters:["cutie","huahua","xizhou"],text:"你的储物格里出现一枚旧徽章，背面写着一个你已经在别的学期见过的奖项名称。可这一学期没人做过这种徽章。",choices:[
    {text:"把它放进秘密信箱，等待失主",effects:{stats:{kindness:2},bonds:{cutie:2,huahua:1}},flags:["meta_badge_returned"],result:"第二天徽章不见了，信箱里多了一张纸：『谢谢你没有把别人的回忆当成自己的。』"},
    {text:"先收藏起来，看看它还会不会变化",effects:{stats:{creativity:1},bonds:{xizhou:2}},flags:["meta_badge_kept"],result:"西洲说留着来历不明的东西很蠢，却还是给你一个小盒子，免得它被弄丢。"}
  ]},
  {id:"meta_missing_page",day:[13,16],requireMeta:{runs:4,events:35},title:"回忆册里被撕掉的一页",characters:["all"],text:"班级回忆册中间少了一页，前后内容却接得很自然，像所有人都忘记了那里原本写过什么。只有你记得，那一页应该属于某个以前的学期。",choices:[
    {text:"请每个人画下自己觉得缺少的东西",effects:{stats:{kindness:1,creativity:1},bonds:{qaq:1,diandian:1,moto:1,huahua:1,momo:1,niko:1,taoba:1,puff:1,huan:1,xizhou:1,latiao:1,cutie:1}},flags:["memory_page_rebuilt"],result:"十二幅画彼此完全不同。你们没有找回原来的那一页，却做出了一页谁也无法独自完成的新回忆。"},
    {text:"保留空白，承认有些事真的想不起来",effects:{stats:{courage:1,order:1},bonds:{qaq:2,xizhou:1}},flags:["memory_page_blank"],result:"大家在空白页角落签了名字。它成了整本回忆册里最安静、也最常被翻到的一页。"}
  ]}
);


// 幼儿园尺度的复杂情绪事件：不保证每次选择都得到圆满结果。
GAME_DATA.events.push(
  {id:"jealous_drawing",day:[4,8],title:"被夸奖的只有一幅画",characters:["huahua","puff","cutie"],text:"老师把花花的画贴在最中间，泡芙的画却因为位置不够被收进了文件夹。泡芙嘴上说没关系，午饭时却把自己的画揉出了一条折痕。",choices:[
    {text:"把自己的位置让给泡芙的画",effects:{stats:{kindness:2},bonds:{puff:2,huahua:-1}},flags:["gave_up_display"],result:"泡芙的画被贴了出来，却很快发现花花因此变得沉默。你照顾了一个人的委屈，也让另一个人觉得自己的努力被轻易挪开。"},
    {text:"告诉泡芙，不被贴出来也不等于画得不好",effects:{stats:{kindness:1,courage:1},bonds:{puff:2}},flags:["named_jealousy"],result:"泡芙承认自己不是难过，而是嫉妒。说出来以后她没有马上开心，但至少不再假装无所谓。"},
    {text:"请老师再找位置，把所有画都贴出来",effects:{stats:{order:1},energy:-1,bonds:{cutie:1,puff:1}},result:"你们花了很久重新挪位置，最后所有画都挂上了。只是大家也发现，墙面变得太挤，谁的画都不再特别显眼。"}
  ]},
  {id:"broken_keepsake",day:[8,12],title:"没人承认踩坏了小摆件",characters:["taoba","niko","moto"],text:"小可爱做的黏土向日葵被踩扁了一角。地上有几串脚印，蘑托车立刻说不是自己，妮蔻却注意到他鞋底沾着同样颜色的黏土。",choices:[
    {text:"当众指出鞋底的证据",effects:{stats:{courage:2},bonds:{niko:2,moto:-2}},flags:["public_accusation"],result:"蘑托车最后承认了，但一整天都不再和你说话。真相被找到了，关系却没有因此立刻变好。"},
    {text:"私下问蘑托车，给他自己说明的机会",effects:{stats:{kindness:1,order:1},bonds:{moto:2,taoba:1}},flags:["private_confession"],result:"他承认自己怕被骂才撒谎，并答应重做。第二天他真的带来了新的摆件，却始终没有向全班解释原来的那个为什么坏掉。"},
    {text:"先修好摆件，不继续追查",effects:{stats:{creativity:1},bonds:{taoba:-1,niko:-1}},flags:["truth_unasked"],result:"摆件看起来几乎恢复了原样，事情也很快过去。只是妮蔻后来问你：『只要修好了，就可以不用知道是谁做的吗？』"}
  ]},
  {id:"not_invited",day:[10,14],title:"秘密游戏没有邀请所有人",characters:["diandian","qaq","latiao"],text:"点点和几个人在午睡后悄悄玩了一个只有他们知道规则的游戏。辣条发现自己没被叫上，直接问是不是大家不喜欢她。点点却说，只是人太多就不好玩。",choices:[
    {text:"要求游戏必须让所有人参加",effects:{stats:{kindness:1,order:1},bonds:{latiao:2,diandian:-1}},flags:["forced_inclusion"],result:"辣条加入了，游戏却因为人数太多很快停下。没有人被排除，但原来那种秘密的小乐趣也消失了。"},
    {text:"承认小团体可以存在，但不能拿来嘲笑别人",effects:{stats:{courage:1,kindness:1},bonds:{diandian:1,latiao:1,qaq:1}},flags:["allowed_small_group"],result:"辣条还是不高兴，却没有再要求加入。下午她也约了别人玩自己的游戏。大家没有完全和好，但开始承认朋友不必永远一起行动。"},
    {text:"另外陪辣条玩，不再谈那场秘密游戏",effects:{stats:{kindness:2},bonds:{latiao:3,diandian:-1}},result:"辣条很快笑了起来，点点却觉得你在用另一场游戏惩罚她。第二天，两边都没有主动提起这件事。"}
  ]},
  {id:"promise_forgotten",day:[14,17],title:"答应过的事情被忘记了",characters:["momo","huan","xizhou"],text:"欢佬答应替馍馍带一张开放日摊位的小招牌，却忘得一干二净。馍馍说没关系，转身后却偷偷哭了。西洲评价：『说没关系的人，通常就是最有关系。』",choices:[
    {text:"让欢佬立刻想办法补救",effects:{stats:{order:2},energy:-1,bonds:{momo:2,huan:1}},flags:["promise_repaired"],result:"小招牌最后补出来了，却比原计划粗糙。馍馍接受了道歉，但没有说“完全没关系”。"},
    {text:"陪馍馍承认自己真的很失望",effects:{stats:{kindness:2},bonds:{momo:3,huan:-1}},flags:["disappointment_spoken"],result:"馍馍第一次没有急着照顾别人的心情。欢佬听见后沉默很久，直到放学也没想出合适的玩笑。"},
    {text:"替欢佬完成，不让事情继续变大",effects:{stats:{order:1,kindness:1},energy:-2,bonds:{momo:1,huan:2,xizhou:-1}},flags:["covered_promise"],result:"摊位没有少东西，欢佬也很感谢你。西洲却说，你解决了卡片，没有解决“答应的人不用负责”这件事。"}
  ]}
);

// ===== V6.0：角色群像与连续故事更新 =====
Object.assign(GAME_DATA, { version:"6.0", subtitle:"向日葵中班的连续日常与多周目回忆" });
const V6_CHARACTER_UPDATES = {
  qaq:{trait:"平时神秘安静，只有遇到喜欢的高难度游戏才明显活跃；不主动邀人，但很乐意讲玩法、看别人玩。",likes:"高难度游戏、固定游戏搭子、安静旁观"},
  diandian:{trait:"外向而有分寸，想问就问、需要帮助就开口；擅长生活小事和照顾花草，可惜几乎没有中奖运。",likes:"直接提问、花草、解决小麻烦"},
  moto:{trait:"大家口中的猫头或狗头车；爱做无害又可爱的恶作剧，也会学着投喂大家。",likes:"抓宠物游戏、饮料、可爱的捣乱"},
  huahua:{trait:"看起来淡淡的，放学后常有家长安排的兴趣班；会默默补位，不抛下掉队的伙伴，而且抽签运气很好，抢游戏里最后一个位置也很快。",likes:"莲花玩具、投喂、陪伙伴慢慢来"},
  momo:{trait:"聪明、大大咧咧、想到什么说什么；什么游戏都玩，开心就够了，并相信自己总有一天会养到猫。",likes:"真正的小猫、轻松话题、好玩的游戏"},
  niko:{trait:"向日葵中班元老之一；稳重，认真时游戏很强，严肃讨论结束后也能立刻继续一起闹。",likes:"认真讨论规则、接梗、把事情讲清楚"},
  taoba:{trait:"耐心到令人惊讶，擅长解释复杂规则和在缺少材料时想替代办法；会量力而行地帮助亲近的人。",likes:"复杂规则、实践、饮料"},
  puff:{trait:"好奇、爱想办法、喜欢鬼故事；问题严重到一定程度才会指出，自以为委婉，其实仍然很直接。",likes:"鬼故事、新玩法、熟悉的音乐"},
  huan:{trait:"曾经转学离开又回来；兴趣来得快也去得快，但最近真的在认真练琴。",likes:"新鲜兴趣、练琴、突然投入的新玩法"},
  xizhou:{trait:"最近常跟家长去看儿童舞台表演，因此很少来园；社牛、眼力好、爱憎分明，大家会期待他替所有人说出难开口的话。",likes:"舞台故事、好吃的点心、贴纸抽签、直指问题"},
  latiao:{trait:"非常忙，常常不能到场；擅长甜点，被冒犯时会直接说，也愿意分享自己的倒霉事。",likes:"甜点、坦率、有人认真听"},
  cutie:{trait:"出现不多，也没有固定亲密小圈；实力很强却不炫耀，更愿意聊收藏、自己搭配的彩色午餐和偶尔冒出的奇怪想象。",likes:"卡通收藏、彩色午餐、照顾留下的植物"}
};
GAME_DATA.characters.forEach(c=>Object.assign(c,V6_CHARACTER_UPDATES[c.id]||{}));

// 移除与最终角色设定冲突较大的旧事件，保留结构与收藏兼容。
const V6_REMOVE_EVENTS = new Set(["missing_moto","lost_voice","two_leaders","night_guard","credit","lunch","quiet_lunch","broken_keepsake"]);
const V6_REMOVE_FOLLOWUPS = new Set(["voice_return","roles_return"]);
GAME_DATA.events = GAME_DATA.events.filter(e=>!V6_REMOVE_EVENTS.has(e.id));
GAME_DATA.followups = GAME_DATA.followups.filter(e=>!V6_REMOVE_FOLLOWUPS.has(e.id));

GAME_DATA.events.push(
  {
    id:"v6_game_group_new",day:[2,6],title:"今天试哪个新游戏",characters:["qaq","momo","niko","huahua"],
    text:"QAQ丨带来一个规则很多的新游戏。馍馍已经说“先开一局再说”，妮蔻要求先把最容易弄错的地方讲清楚。花花今天的课外兴趣班结束得晚，大家还在犹豫要不要先开始。",
    choices:[
      {text:"等花花来齐以后再开第一局",effects:{stats:{kindness:2},bonds:{qaq:2,huahua:3,momo:1,niko:1}},flags:["game_group_waited"],result:"馍馍先去玩了别的。花花赶来后，QAQ丨从头重新讲了一遍规则，没有人催她。"},
      {text:"先玩一轮练习局，给花花留一张图画规则卡",effects:{stats:{order:1,creativity:1},bonds:{qaq:2,niko:2,huahua:1}},flags:["game_rule_card"],result:"妮蔻把容易误解的地方写得很清楚。花花来晚了，但只看一遍就跟上了。"},
      {text:"让馍馍直接带大家边玩边学",effects:{stats:{courage:1},bonds:{momo:3,qaq:1}},result:"第一局乱成一团，却很好笑。QAQ丨在旁边认真看完，第二局才开始纠正所有人的玩法。"}
    ]
  },
  {
    id:"v6_pet_game",day:[4,10],title:"再抓最后一只",characters:["qaq","moto"],
    text:"QAQ丨和蘑托车蹲在角落玩抓宠物游戏，两个人都说抓到最后一只就停。过了很久，最后一只后面又出现了一只更稀有的。",
    choices:[
      {text:"提醒他们先去吃点东西",effects:{stats:{kindness:1},bonds:{qaq:2,moto:2}},flags:["pet_game_break"],result:"蘑托车嘴上说马上，身体却没动。QAQ丨最后把游戏暂停，先把两个人都拉去吃东西。"},
      {text:"坐下来一起看他们抓",effects:{stats:{creativity:1},bonds:{qaq:2,moto:3}},flags:["pet_game_watched"],result:"你本来只是看，最后也开始替他们记哪只宠物还没抓到。"}
    ]
  },
  {
    id:"v6_diandian_question",day:[1,5],title:"点点先举了手",characters:["diandian","taoba"],
    text:"老师讲完新的活动规则，教室里安静了几秒。点点先举手说：“我没听懂这里。”桃爸把复杂的步骤重新拆成了三小步。",
    choices:[
      {text:"跟着点点一起把不懂的地方问出来",effects:{stats:{courage:2,order:1},bonds:{diandian:2,taoba:2}},flags:["asked_openly"],result:"原来不懂的不只你们两个。桃爸换了三种说法，直到大家都能自己做一遍。"},
      {text:"帮点点把问题画成图",effects:{stats:{creativity:2},bonds:{diandian:2,taoba:1}},result:"点点一看图就懂了，还顺手替旁边的人解释了一次。"}
    ]
  },
  {
    id:"v6_lottery",day:[3,11],title:"这次谁来抽",characters:["diandian","huahua","xizhou"],
    text:"西洲难得回来，带来一个装着贴纸奖品的小抽签盒。大家都知道点点几乎抽不中，花花却常常一伸手就抽到最好的一张。",
    choices:[
      {text:"让点点先抽一次",effects:{stats:{courage:1},bonds:{diandian:3,xizhou:1}},flags:["diandian_lost_again"],result:"点点果然抽到“谢谢参与”，自己先笑了。西洲马上又加了一轮，说这次不算。"},
      {text:"请花花帮别人代抽",effects:{stats:{kindness:1},bonds:{huahua:3,xizhou:2}},flags:["huahua_lucky"],result:"花花替别人抽到了一等奖，自己却只拿了最普通的一张贴纸。"},
      {text:"建议另外准备一张人人都有的小贴纸",effects:{stats:{order:1,kindness:1},bonds:{xizhou:2}},result:"西洲说抽签本来就不该人人一样，但还是给没抽中的人准备了小星星贴纸。"}
    ]
  },
  {
    id:"v6_drink_group",day:[3,12],title:"今天喝什么",characters:["moto","taoba","momo"],
    text:"点心时间有三种饮料：草莓牛奶、橙汁和酸奶饮料。蘑托车想试最少见的，桃爸认真看每种口味，馍馍已经说“都行，快点决定”。",
    choices:[
      {text:"听桃爸分析完再选",effects:{stats:{order:1},bonds:{taoba:3,moto:1,momo:1}},result:"桃爸分析得太完整，最后三个人分别选了三种不同的。"},
      {text:"跟蘑托车一起选最奇怪的新品",effects:{stats:{courage:1},bonds:{moto:3,momo:1}},result:"味道没有想象中奇怪，蘑托车宣布下次还要选颜色更特别的。"},
      {text:"让馍馍直接拍板",effects:{stats:{kindness:1},bonds:{momo:3,taoba:1}},result:"馍馍选了最稳妥的一种，三个人边喝边继续讨论下次。"}
    ]
  },
  {
    id:"v6_latiao_bakery",day:[5,13],title:"纸黏土点心铺",characters:["latiao","huahua","cutie"],
    text:"教室开了一间纸黏土点心铺。辣条捏出来的奶油卷最像真的，但有人把她做的圆饼说成了‘一团白泥’。辣条马上说：‘你可以不喜欢，可别故意说得难听。’",
    choices:[
      {text:"支持辣条把不舒服说清楚",effects:{stats:{courage:2},bonds:{latiao:3,huahua:1}},flags:["latiao_boundary"],result:"对方重新说了一遍：他只是看不出那是什么。辣条告诉他自己原本想做什么，又当场重新捏了一个更清楚的。"},
      {text:"请辣条教大家捏最简单的小点心",effects:{stats:{creativity:2},bonds:{latiao:3,cutie:1}},flags:["latiao_baking_skill"],result:"辣条把步骤讲得很短，手却做得很快。小可爱在旁边认真给每种颜色排了顺序。"},
      {text:"和花花一起把失败品也摆进柜台",effects:{stats:{kindness:1,creativity:1},bonds:{huahua:2,latiao:2}},result:"歪掉的饼干和塌下去的蛋糕反而最受欢迎。辣条说它们不好看，但没说要拿走。"}
    ]
  },
  {
    id:"v6_cutie_imagination",day:[6,14],title:"摆件们的座位表",characters:["cutie","puff"],
    text:"小可爱带来几张自己喜欢的卡通角色卡片。她排了很久，忽然认真地问：‘如果它们晚上在柜子里开会，最爱讲话的应该坐中间，还是坐最远？’",
    choices:[
      {text:"认真帮她安排一张座位表",effects:{stats:{creativity:2,order:1},bonds:{cutie:3}},flags:["toy_seating_chart"],result:"你们按性格把卡片排成一圈。小可爱看了一会儿，说这样晚上大概不会吵起来。"},
      {text:"请泡芙给这场夜间聚会编一个神秘故事",effects:{stats:{creativity:2},bonds:{cutie:2,puff:2}},flags:["toy_night_story"],result:"泡芙讲了一个有点阴森的开头，小可爱却只关心故事里的摆件有没有按她排好的位置坐。"}
    ]
  },
  {
    id:"v6_plant_first",day:[2,8],title:"窗边那盆不是她种的植物",characters:["cutie","diandian"],
    text:"点点发现小可爱每天都会给窗边一盆植物浇水。小可爱说那不是她种的，是一个已经转学的朋友留下来的。",
    choices:[
      {text:"只问清楚多久浇一次，不追问那位朋友",effects:{stats:{kindness:2,order:1},bonds:{cutie:3,diandian:1}},flags:["plant_kept"],result:"小可爱把浇水日期告诉了你。她没有多说，但把花盆往有阳光的地方挪了一点。"},
      {text:"和点点一起做一张不写名字的照顾表",effects:{stats:{order:2},bonds:{cutie:2,diandian:2}},flags:["plant_schedule"],result:"表上只写着‘窗边的植物’，没有写它属于谁。"}
    ]
  },
  {
    id:"v6_huan_piano",day:[4,10],title:"这次好像不是三分钟热度",characters:["huan","qaq"],
    text:"欢佬最近一直在练琴。QAQ丨问他今天还玩不玩，欢佬说要先练完。QAQ丨只回答了一声“好”。",
    choices:[
      {text:"在旁边等他练完",effects:{stats:{kindness:1},bonds:{huan:3,qaq:2}},flags:["piano_kept"],result:"欢佬练完才加入游戏。没有人催他，他自己也没有半途跑去做别的。"},
      {text:"请他弹一小段给大家听",effects:{stats:{courage:1,creativity:1},bonds:{huan:3}},flags:["piano_shared"],result:"欢佬先说还没练好，最后还是弹了一小段。馍馍第一个鼓掌。"}
    ]
  },
  {
    id:"v6_xizhou_return",day:[7,16],title:"西洲偶尔回来一次",characters:["xizhou","puff","diandian"],
    text:"西洲很久没来园，今天一进教室就开始讲最近跟家长看过的儿童舞台剧和吃到的小点心。泡芙只要点点头，他也能自己把故事讲得很热闹。",
    choices:[
      {text:"问他最好吃的是哪一样",effects:{stats:{kindness:1},bonds:{xizhou:3,puff:1}},flags:["xizhou_food_story"],result:"西洲认真夸了一家真的很好吃的点心，又顺便把另外两家批评得很具体。"},
      {text:"请他讲最近最好看的舞台故事",effects:{stats:{creativity:1},bonds:{xizhou:3,puff:2}},flags:["same_music"],result:"泡芙发现自己也喜欢那部舞台剧里的音乐角色。西洲说她总算听懂什么叫好听了。"},
      {text:"问他下次什么时候再来",effects:{stats:{kindness:1},bonds:{xizhou:2,diandian:1}},result:"西洲说不知道，最近还有几次要跟家长外出。但他说下次回来还会带新的贴纸抽签盒。"}
    ]
  },
  {
    id:"v6_xizhou_speaks",day:[9,17],title:"终于有人把话说出来",characters:["xizhou","puff","latiao"],
    text:"自由活动时，有个小朋友总把公共积木先抱到自己身边，别人想拿时还装作没听见。大家都不太高兴，却没人愿意开口。西洲看了一会儿，直接说清楚大家介意的是什么。",
    choices:[
      {text:"支持西洲把具体问题说清楚",effects:{stats:{courage:2,order:1},bonds:{xizhou:3,latiao:2}},flags:["xizhou_spoke"],result:"没有人觉得他把事情搞大，反而都松了一口气。对方第一次知道大家真正介意的是什么。"},
      {text:"由泡芙再补充一句比较委婉的话",effects:{stats:{courage:1,kindness:1},bonds:{puff:3,xizhou:1}},flags:["puff_not_so_gentle"],result:"泡芙认真铺垫了很久，最后说出来的话仍然很直接。西洲听完说：‘你这也没委婉到哪去。’"}
    ]
  },
  {
    id:"v6_cute_prank",day:[2,12],title:"猫头又做了什么",characters:["moto","momo","taoba"],
    text:"大家发现所有铅笔盒被排成一条小火车，最后一节还放着一颗糖。没人真的生气，只是一起喊了一声：‘狗头车！’",
    choices:[
      {text:"把小火车继续接长",effects:{stats:{creativity:1},bonds:{moto:3,momo:1}},flags:["prank_train"],result:"蘑托车从门后探出头，发现大家比她摆得还长，立刻加入了。"},
      {text:"假装没发现她躲在门后",effects:{stats:{kindness:1},bonds:{moto:3,taoba:1}},result:"所有人都配合着找‘犯人’，蘑托车最后自己笑得藏不住了。"}
    ]
  },
  {
    id:"v6_momo_cat",day:[5,14],title:"窗外真的有一只猫",characters:["momo","niko"],
    text:"馍馍第一个发现窗外有一只真正的小猫。她立刻停下手里的游戏，趴到窗边看了很久。",
    choices:[
      {text:"陪她安静看一会儿",effects:{stats:{kindness:1},bonds:{momo:3,niko:1}},flags:["watched_real_cat"],result:"馍馍说以后自己一定会养猫，语气像在说一件迟早会发生的事。"},
      {text:"请妮蔻提醒大家不要吓跑它",effects:{stats:{order:1},bonds:{niko:2,momo:2}},result:"妮蔻认真说完注意事项，又和大家一起蹲在窗边看猫打哈欠。"}
    ]
  },
  {
    id:"v6_taoba_no_material",day:[7,15],title:"没有材料也得想办法",characters:["taoba","diandian","xizhou"],
    text:"点点想修一个坏掉的小架子，却发现缺少原本需要的材料。桃爸蹲下来研究现有的纸板和绳子，西洲则说直接换新的最快。",
    choices:[
      {text:"跟桃爸用现有材料试做",effects:{stats:{order:2,creativity:1},bonds:{taoba:3,diandian:2}},flags:["made_from_nothing"],result:"做出来的架子没有新的漂亮，但真的能用。桃爸说这已经够了。"},
      {text:"接受西洲买新的，再保留旧架子的零件",effects:{stats:{order:1},bonds:{xizhou:2,taoba:1}},result:"西洲不在意花费，桃爸则把还能用的零件全部整理好，免得以后再缺。"}
    ]
  },
  {
    id:"v6_cute_collection",day:[8,16],title:"小可爱愿意展示的东西",characters:["cutie","huahua"],
    text:"有人夸小可爱很会做事，她只说还好。可一提到她喜欢的卡通角色，她马上拿出自己带来的收藏小册子，开始认真介绍每一个。",
    choices:[
      {text:"请她选一个最喜欢的收藏讲故事",effects:{stats:{kindness:1,creativity:1},bonds:{cutie:3}},flags:["collection_story"],result:"她最后说了很久，远比介绍自己会做什么时详细。"},
      {text:"和花花一起做一个展示角",effects:{stats:{creativity:2},bonds:{cutie:2,huahua:2}},flags:["collection_corner"],result:"花花没有抢着设计，只帮她把每个摆件都放到最合适的位置。"}
    ]
  }
);

GAME_DATA.followups.push(
  {id:"v6_plant_leaf",day:[9,16],title:"植物长出一片新叶",characters:["cutie","diandian"],requireFlag:"plant_kept",text:"窗边的植物长出一片很嫩的新叶。小可爱看了很久，只说：‘它还记得怎么长。’",choices:[{text:"把新叶日期记下来",effects:{stats:{order:1,kindness:1},bonds:{cutie:3}},flags:["plant_leaf"],result:"记录表上多了一行日期。小可爱没有提那位已经转学的朋友。"}]},
  {id:"v6_plant_bloom",day:[12,17],title:"这一次终于开花了",characters:["cutie","all"],requireMeta:{runs:3},requireMetaEvents:["v6_plant_first","v6_plant_leaf"],text:"很多学期以后，那盆植物第一次开花。小可爱把花盆搬到窗边最亮的位置，大家轮流来看。",choices:[{text:"只拍植物，不要求小可爱讲过去",effects:{stats:{kindness:2},bonds:{cutie:4}},flags:["plant_bloomed"],result:"花朵旁边没有那位离开的同学，但所有人都知道这朵花为什么被照顾了这么久。"}]},
  {id:"v6_piano_second",day:[10,17],title:"欢佬没有换掉这个兴趣",characters:["huan","momo"],requireMeta:{runs:2},requireMetaEvents:["v6_huan_piano"],text:"下一次再见到欢佬时，他还在练琴。大家本来以为这也会像以前那些兴趣一样很快过去。",choices:[{text:"请他弹完再去玩",effects:{stats:{kindness:1,creativity:1},bonds:{huan:4,momo:1}},flags:["piano_continues"],result:"馍馍坐不住，先跑去玩了。等欢佬弹完，她又第一个回来听。"}]},
  {id:"v6_game_memory",day:[8,17],title:"这个规则以前是不是讲过",characters:["qaq","niko","momo"],requireMeta:{runs:2},requireMetaEvents:["v6_game_group_new"],text:"QAQ丨讲到一半忽然停下来，说这个规则好像以前已经讲过。妮蔻也觉得熟悉，馍馍却说反正再玩一次就知道了。",choices:[{text:"不追究，直接再开一局",effects:{stats:{creativity:1},bonds:{qaq:3,niko:2,momo:2}},flags:["game_dejavu"],result:"这一局和记忆里不太一样，但大家都觉得自己已经知道下一步会发生什么。"}]},
  {id:"v6_xizhou_again",day:[10,17],title:"西洲又很久没来",characters:["xizhou","puff"],requireMeta:{runs:2},requireMetaEvents:["v6_xizhou_return"],text:"西洲又消失了很久。泡芙听见大家说起他，只说等他回来，教室一定又会一下子变热闹。",choices:[{text:"给他留一张下次抽贴纸用的小卡片",effects:{stats:{kindness:1},bonds:{xizhou:3,puff:2}},flags:["xizhou_ticket"],result:"西洲下次回来时先嫌你们多此一举，然后把小卡片又放进了新的贴纸抽签盒。"}]}
);


// V6.0 每局最多保留两枚代表奖章，旧图鉴继续兼容。
