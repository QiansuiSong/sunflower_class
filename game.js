// 向日葵中班主流程。内容优先放在 data.js，本文件只维护机制。
(() => {
  const SAVE_KEY = "sunflower_class_story_v3";
  const META_KEY = "sunflower_class_story_meta_v3";
  const $ = (s) => document.querySelector(s);
  const app = document.getElementById("app");

  const freshState = () => ({
    screen:"start", day:1,
    stats:{...GAME_DATA.initialStats},
    bonds:Object.fromEntries(GAME_DATA.characters.map(c=>[c.id,0])),
    flags:[], seen:[], history:[], currentEvent:null, selectedAction:null
  });
  let state = load() || freshState();
  let meta = loadMeta();
  meta={events:[],awards:[],endings:[],runs:0,...meta};
  ["events","awards","endings"].forEach(k=>{ if(!Array.isArray(meta[k])) meta[k]=[]; });

  function load(){ try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { return null; } }
  function loadMeta(){
    try { return JSON.parse(localStorage.getItem(META_KEY)) || {events:[],awards:[],endings:[],runs:0}; }
    catch { return {events:[],awards:[],endings:[],runs:0}; }
  }
  function saveMeta(){ localStorage.setItem(META_KEY, JSON.stringify(meta)); }
  function collect(type,id){ if(id && !meta[type].includes(id)){ meta[type].push(id); saveMeta(); } }
  function save(){ localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
  function reset(){ localStorage.removeItem(SAVE_KEY); state=freshState(); render(); }
  function character(id){ return GAME_DATA.characters.find(c=>c.id===id); }
  function label(k){ return GAME_DATA.statLabels[k] || k; }
  function addFlag(f){ if(f && !state.flags.includes(f)) state.flags.push(f); }
  function applyEffects(e={}){
    Object.entries(e.stats||{}).forEach(([k,v])=>state.stats[k]=(state.stats[k]||0)+v);
    Object.entries(e.bonds||{}).forEach(([k,v])=>state.bonds[k]=Math.max(0,(state.bonds[k]||0)+v));
    if(e.energy) state.stats.energy=Math.max(0,Math.min(GAME_DATA.maxEnergy||7,state.stats.energy+e.energy));
  }
  function available(choice){
    if(!choice.require) return true;
    const r=choice.require;
    return r.stat ? (state.stats[r.stat]||0)>=r.min : true;
  }
  function chapterForDay(day){ return GAME_DATA.chapters.find(c=>c.day===day); }
  function eventAllowed(e){
    if(state.seen.includes(e.id) || state.day<e.day[0] || state.day>e.day[1]) return false;
    if(e.requireFlag && !state.flags.includes(e.requireFlag)) return false;
    if(e.requireFlags && !e.requireFlags.every(f=>state.flags.includes(f))) return false;
    if(e.notFlags && e.notFlags.some(f=>state.flags.includes(f))) return false;
    if(e.requireMetaEvents && !e.requireMetaEvents.every(id=>meta.events.includes(id))) return false;
    if(e.excludeMetaEvents && e.excludeMetaEvents.some(id=>meta.events.includes(id))) return false;
    if(e.requireMeta){
      const r=e.requireMeta;
      if(r.runs && meta.runs<r.runs) return false;
      if(r.events && meta.events.length<r.events) return false;
      if(r.endings && meta.endings.length<r.endings) return false;
      if(r.awards && meta.awards.length<r.awards) return false;
    }
    return true;
  }
  function pickEvent(list){
    if(!list.length) return null;
    const unseen=list.filter(e=>!meta.events.includes(e.id));
    const pool=unseen.length?unseen:list;
    return pool[Math.floor(Math.random()*pool.length)];
  }
  function chooseEvent(){
    const follow=GAME_DATA.followups.filter(eventAllowed);
    if(follow.length) return pickEvent(follow);
    const regular=GAME_DATA.events.filter(eventAllowed);
    return pickEvent(regular);
  }
  function strongestFriend(){ return Object.entries(state.bonds).sort((a,b)=>b[1]-a[1])[0]; }
  function bondLevel(v){ return v>=8?"最好的朋友":v>=5?"已经会主动来找你":v>=3?"渐渐熟悉":v>=1?"一起玩过":"还不太熟"; }

  function start(){ state.screen="day"; save(); render(); }
  function chooseAction(id){ state.selectedAction=id; render(); }
  function confirmAction(){
    const a=GAME_DATA.dailyActions.find(x=>x.id===state.selectedAction);
    if(!a) return;
    if(state.stats.energy + a.energy < 0){ flash("今天有点累啦，先休息一下会更好。") ; return; }
    state.stats.energy=Math.max(0,Math.min(GAME_DATA.maxEnergy||7,state.stats.energy+a.energy));
    applyEffects({stats:a.stats});
    const target=a.bonds[(state.day-1)%a.bonds.length];
    state.bonds[target]=(state.bonds[target]||0)+1;
    state.history.push({day:state.day,title:a.title,text:`你选择了“${a.title}”，和${character(target).name}多了一段小小回忆。`});
    state.selectedAction=null;
    const ev=chooseEvent();
    if(ev){ state.currentEvent=ev.id; state.screen="event"; }
    else { advanceDay(); }
    save(); render();
  }
  function chooseChoice(index){
    const ev=[...GAME_DATA.events,...GAME_DATA.followups].find(e=>e.id===state.currentEvent);
    const choice=ev.choices[index];
    if(!available(choice)) return;
    applyEffects(choice.effects);
    (choice.flags||[]).forEach(addFlag);
    state.seen.push(ev.id);
    collect("events",ev.id);
    state.history.push({day:state.day,title:ev.title,text:choice.result,choice:choice.text});
    state.screen="result";
    state.lastResult={title:ev.title,choice:choice.text,text:choice.result,effects:choice.effects||{}};
    save(); render();
  }
  function advanceDay(){
    if(state.day>=GAME_DATA.maxDays){ state.screen="ending"; save(); render(); return; }
    state.day += 1;
    // 精力不会每天自动恢复；必须主动休息或从事件中获得。
    state.currentEvent=null;
    state.screen="day";
    save(); render();
  }
  function flash(text){
    const n=document.createElement("div"); n.className="toast"; n.textContent=text; document.body.appendChild(n);
    setTimeout(()=>n.remove(),1800);
  }
  function statBar(k,v,max=10){ return `<div class="stat"><span>${label(k)}</span><div class="bar"><i style="width:${Math.min(100,v/max*100)}%"></i></div><b>${v}</b></div>`; }
  function topbar(){
    return `<header><div><span class="eyebrow">第 ${state.day} / ${GAME_DATA.maxDays} 天 · 幼儿园回忆簿</span><h1>${GAME_DATA.title}</h1></div><button class="ghost small" id="openLog">回忆册</button></header>
    <section class="stats">${["courage","kindness","creativity","order","energy"].map(k=>statBar(k,state.stats[k],k==="energy"?(GAME_DATA.maxEnergy||8):10)).join("")}</section>`;
  }
  function faces(ids){
    if(ids.includes("all")) ids=GAME_DATA.characters.map(c=>c.id);
    return `<div class="faces">${ids.map(id=>{const c=character(id);return `<span title="${c.name}">${c.icon}</span>`}).join("")}</div>`;
  }
  function renderStart(){
    app.innerHTML=`<main class="start card"><div class="sun">🌻</div><p class="eyebrow">V6.0 群像连续剧情 · 单局约 15～25 分钟</p><h1>${GAME_DATA.title}</h1><p class="subtitle">${GAME_DATA.subtitle}</p>
    <p>你是刚转入向日葵中班的小朋友。十八天后，班级会一起迎来开放日。你会交到不同的朋友，也会和大家一起做手工、玩游戏、解决小小麻烦，留下很多可爱的回忆。</p>
    <div class="start-rules"><span>每天选一件事</span><span>遇见不同故事</span><span>跨周目延续故事</span></div>
    <p class="collection-line">第 ${meta.runs} 次学期 · 事件 ${meta.events.length}/${GAME_DATA.events.length+GAME_DATA.followups.length} · 结局 ${meta.endings.length}/${GAME_DATA.endings.length} · 奖章 ${meta.awards.length}/${GAME_DATA.awards.length}</p>
    <button class="primary" id="start">${state.day>1||state.history.length?"继续这学期":"走进教室"}</button>
    ${state.history.length?`<button class="ghost" id="reset">重新开始这一学期</button>`:""}<button class="ghost" id="gallery">结局与奖章图鉴</button></main>`;
    $("#start").onclick=start;
    if($("#reset")) $("#reset").onclick=()=>confirm("确定清除当前进度吗？跨周目收藏会保留。")&&reset();
    $("#gallery").onclick=openGallery;
  }
  function renderDay(){
    const chapter=chapterForDay(state.day);
    app.innerHTML=`${topbar()}<main>${chapter?`<section class="chapter"><span>新篇章</span><h2>${chapter.title}</h2><p>${chapter.text}</p></section>`:""}
    <section class="card"><p class="eyebrow">今天放学前</p><h2>你想怎么度过今天？</h2><div class="actions">${GAME_DATA.dailyActions.map(a=>{const lack=state.stats.energy+a.energy<0;return `<button class="action ${state.selectedAction===a.id?"selected":""}" data-id="${a.id}" ${lack?"disabled":""}><b>${a.title}</b><small>${a.desc}${lack?"（今天的精力不够）":""}</small><em>${a.energy<0?`精力 ${a.energy}`:a.energy>0?`精力 +${a.energy}`:"不消耗精力"}</em></button>`}).join("")}</div>
    <button class="primary" id="confirmAction" ${state.selectedAction?"":"disabled"}>就这样过今天</button></section></main>`;
    document.querySelectorAll(".action:not(:disabled)").forEach(b=>b.onclick=()=>chooseAction(b.dataset.id));
    $("#confirmAction").onclick=confirmAction; bindLog();
  }
  function renderEvent(){
    const ev=[...GAME_DATA.events,...GAME_DATA.followups].find(e=>e.id===state.currentEvent);
    app.innerHTML=`${topbar()}<main><section class="card event">${faces(ev.characters)}<p class="eyebrow">今天的小故事</p><h2>${ev.title}</h2><p class="event-text">${ev.text}</p><div class="choices">${ev.choices.map((c,i)=>{const ok=available(c);return `<button data-i="${i}" ${ok?"":"disabled"}><span>${c.text}</span>${!ok?`<small>需要 ${label(c.require.stat)} ≥ ${c.require.min}</small>`:""}</button>`}).join("")}</div></section></main>`;
    document.querySelectorAll(".choices button").forEach(b=>b.onclick=()=>chooseChoice(+b.dataset.i)); bindLog();
  }
  function effectText(e){
    const parts=[]; Object.entries(e.stats||{}).forEach(([k,v])=>parts.push(`${label(k)} ${v>0?"+":""}${v}`));
    if(e.energy) parts.push(`精力 ${e.energy>0?"+":""}${e.energy}`);
    return parts.join(" · ") || "和大家的关系发生了变化";
  }
  function renderResult(){
    const r=state.lastResult;
    app.innerHTML=`${topbar()}<main><section class="card result"><p class="eyebrow">你的选择</p><h2>${r.choice}</h2><p>${r.text}</p><div class="gain">${effectText(r.effects)}</div><button class="primary" id="nextDay">继续</button></section></main>`;
    $("#nextDay").onclick=advanceDay; bindLog();
  }
  function endingNarrative(){
    const f=strongestFriend();
    const baseEndingIds=new Set(["heart","architect","spark","first_step","friendship","ordinary"]);

    // 第一层：只处理真正依赖连续剧情或多周目条件的特殊结局。
    // 若同一局同时满足多个特殊结局，优先发放尚未收集的，再比较原有优先级。
    const specialCandidates=GAME_DATA.endings
      .filter(e=>!baseEndingIds.has(e.id) && e.test(state,meta))
      .sort((a,b)=>{
        const aNew=meta.endings.includes(a.id)?0:1;
        const bNew=meta.endings.includes(b.id)?0:1;
        return (bNew-aNew) || ((b.priority||0)-(a.priority||0));
      });
    if(specialCandidates.length){
      return {friend:character(f[0]),score:f[1],ending:specialCandidates[0]};
    }

    // 第二层：基础结局不再按固定 if 顺序截断，而是根据本局路线综合评分。
    const actionCount=(title)=>state.history.filter(h=>h.title===title && !h.choice).length;
    const flagCount=(flags)=>flags.filter(flag=>state.flags.includes(flag)).length;
    const bondValues=Object.values(state.bonds).sort((a,b)=>b-a);
    const topBond=bondValues[0]||0;
    const secondBond=bondValues[1]||0;

    const routeScores={
      heart:
        state.stats.kindness*2 +
        actionCount("在角落悄悄聊天")*2 + actionCount("帮忙收拾教室") +
        flagCount(["public_reply","private_reply","thanks_circle","saw_the_dot","disappointment_spoken","quiet_respected"])*2,
      architect:
        state.stats.order*2 +
        actionCount("帮忙收拾教室")*2 +
        flagCount(["careful_search","fair_rules","prototype","storm_leader","credit_board","safe_finale","plan_b_saved","promise_repaired"])*2,
      spark:
        state.stats.creativity*2 +
        actionCount("认真做一件大手工")*2 +
        flagCount(["paper_track","story_fair","old_notes","water_wall","failure_museum","secret_lore","class_game","failure_clues"])*2,
      first_step:
        state.stats.courage*2 +
        actionCount("加入课间游戏")*2 +
        flagCount(["true_finale","final_rescue","player_host","public_accusation","named_jealousy","remembered_dream"])*2
    };

    const candidates=Object.entries(routeScores).map(([id,score])=>({
      ending:GAME_DATA.endings.find(e=>e.id===id), score
    }));

    // 友情结局只有在关系真正集中时才参与，避免普通游玩被关系值轻易截走。
    if(topBond>=12 && topBond-secondBond>=3){
      candidates.push({
        ending:GAME_DATA.endings.find(e=>e.id==="friendship"),
        score:topBond*2 + (topBond-secondBond)*2
      });
    }

    // 普通结局只在没有明显路线时参与。
    const coreStats=[state.stats.kindness,state.stats.order,state.stats.creativity,state.stats.courage];
    const maxStat=Math.max(...coreStats);
    const minStat=Math.min(...coreStats);
    if(maxStat<11 && maxStat-minStat<=2){
      candidates.push({ending:GAME_DATA.endings.find(e=>e.id==="ordinary"),score:maxStat*2+4});
    }

    const valid=candidates.filter(x=>x.ending).sort((a,b)=>b.score-a.score);
    const bestRaw=valid[0].score;
    // 只有与本局最佳路线相差不超过 6 分的结局，才允许由图鉴机制分流。
    const closeRoutes=valid.filter(x=>bestRaw-x.score<=6);
    const unseenClose=closeRoutes.filter(x=>!meta.endings.includes(x.ending.id));
    const chosen=(unseenClose.length?unseenClose:closeRoutes).sort((a,b)=>b.score-a.score)[0];

    return {friend:character(f[0]),score:f[1],ending:chosen.ending};
  }
  function renderEnding(){
    const e=endingNarrative();
    const awards=GAME_DATA.awards.filter(a=>a.test(state)).sort((a,b)=>(b.priority||0)-(a.priority||0)).slice(0,2);
    awards.forEach(a=>collect("awards",a.id));
    collect("endings",e.ending.id);
    if(!state.endingCounted){ meta.runs+=1; state.endingCounted=true; saveMeta(); save(); }
    const memories=state.history.filter(h=>h.choice).slice(-4);
    app.innerHTML=`<main class="ending"><section class="hero-end"><div class="sun">🌻</div><p class="eyebrow">主要结局</p><h1>${e.ending.name}</h1><p>${e.ending.desc}</p></section>
    <section class="card"><p class="eyebrow">本学期代表奖章 · 最多 2 枚</p><div class="awards">${awards.length?awards.map(a=>`<article><b>${a.name}</b><p>${a.desc}</p></article>`).join(""):`<article><b>独一份的小回忆</b><p>这局没有触发固定奖章，但你依然走出了一条只属于自己的学期路线。</p></article>`}</div></section>
    <section class="card friend"><p class="eyebrow">最好的朋友</p><div class="friend-face">${e.friend.icon}</div><h2>${e.friend.name}</h2><p>${e.friend.trait}</p><strong>关系值 ${e.score} · ${bondLevel(e.score)}</strong></section>
    <section class="card"><p class="eyebrow">收藏进度</p><div class="awards"><article><b>事件 ${meta.events.length}/${GAME_DATA.events.length+GAME_DATA.followups.length}</b><p>新学期会优先出现你还没见过的可触发事件。</p></article><article><b>结局 ${meta.endings.length}/${GAME_DATA.endings.length}</b><p>主要结局互斥，每局只会拿到一个。</p></article><article><b>奖章 ${meta.awards.length}/${GAME_DATA.awards.length}</b><p>奖章可以在同一局里同时解锁多个。</p></article></div></section>
    <section class="card"><p class="eyebrow">本学期回忆</p><div class="timeline">${memories.map(m=>`<article><span>第${m.day}天</span><b>${m.title}</b><p>${m.text}</p></article>`).join("")}</div></section>
    <section class="card"><button class="primary" id="replay">开始新的学期</button><button class="ghost" id="galleryEnd">结局与奖章图鉴</button><button class="ghost" id="fullLog">查看完整回忆册</button></section></main>`;
    $("#replay").onclick=()=>confirm("开始新学期会清除本次进度，但保留结局、奖章和事件收藏。确定吗？")&&reset();
    $("#fullLog").onclick=openLog;
    $("#galleryEnd").onclick=openGallery;
  }

  function openGallery(){
    const endingCards=GAME_DATA.endings.map(e=>{
      const unlocked=meta.endings.includes(e.id);
      const secret=e.priority>=90 && !unlocked;
      return `<article class="gallery-card ${unlocked?"":"locked"}"><span>${unlocked?"已解锁":"未解锁"}</span><b>${unlocked?e.name:(secret?"？？？":e.name)}</b><p>${unlocked?e.desc:"完成不同路线，或在更多学期后再回来看看。"}</p></article>`;
    }).join("");
    const awardCards=GAME_DATA.awards.map(a=>{
      const unlocked=meta.awards.includes(a.id);
      return `<article class="gallery-card ${unlocked?"":"locked"}"><span>${unlocked?"已取得":"未取得"}</span><b>${unlocked?a.name:"？？？"}</b><p>${unlocked?a.desc:"在某个学期做出具有代表性的选择。"}</p></article>`;
    }).join("");
    const modal=document.createElement("div"); modal.className="modal gallery-modal";
    modal.innerHTML=`<div class="modal-panel"><button class="close">×</button><h2>向日葵回忆图鉴</h2><p>已完成 ${meta.runs} 个学期 · 结局 ${meta.endings.length}/${GAME_DATA.endings.length} · 奖章 ${meta.awards.length}/${GAME_DATA.awards.length}</p><h3>结局图鉴</h3><div class="gallery-grid">${endingCards}</div><h3>奖章图鉴</h3><div class="gallery-grid">${awardCards}</div></div>`;
    document.body.appendChild(modal); modal.querySelector(".close").onclick=()=>modal.remove(); modal.onclick=e=>{if(e.target===modal) modal.remove()};
  }

  function openLog(){
    const rows=state.history.length?state.history.map(h=>`<article><span>第 ${h.day} 天</span><b>${h.title}</b>${h.choice?`<em>${h.choice}</em>`:""}<p>${h.text}</p></article>`).join(""):"<p>还没有留下回忆。</p>";
    const bonds=Object.entries(state.bonds).sort((a,b)=>b[1]-a[1]).map(([id,v])=>`<div><span>${character(id).name}</span><i>${bondLevel(v)}</i><b>${v}</b></div>`).join("");
    const modal=document.createElement("div");
    modal.className="modal";
    modal.innerHTML=`<div class="modal-panel"><button class="close">×</button><h2>本学期回忆册</h2><h3>和同学的关系</h3><div class="bond-list">${bonds}</div><h3>全部回忆</h3><div class="timeline">${rows}</div></div>`;
    document.body.appendChild(modal);
    modal.querySelector(".close").onclick=()=>modal.remove();
    modal.onclick=e=>{if(e.target===modal) modal.remove()};
  }
  function bindLog(){ if($("#openLog")) $("#openLog").onclick=openLog; }
  function render(){
    if(state.screen==="start") renderStart();
    else if(state.screen==="day") renderDay();
    else if(state.screen==="event") renderEvent();
    else if(state.screen==="result") renderResult();
    else renderEnding();
  }
  render();
})();
