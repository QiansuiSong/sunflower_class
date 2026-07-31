// 向日葵中班主流程。内容优先放在 data.js，本文件只维护机制。
(() => {
  const SAVE_KEY = "sunflower_class_story_v2";
  const META_KEY = "sunflower_class_story_meta_v2";
  const $ = (s) => document.querySelector(s);
  const app = document.getElementById("app");

  const freshState = () => ({
    screen:"start", day:1, stats:{...GAME_DATA.initialStats}, bonds:Object.fromEntries(GAME_DATA.characters.map(c=>[c.id,0])),
    flags:[], seen:[], history:[], currentEvent:null, selectedAction:null
  });
  let state = load() || freshState();
  let meta = loadMeta();

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
    if(e.energy) state.stats.energy=Math.max(0,Math.min(7,state.stats.energy+e.energy));
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
  function strongestFriend(){
    return Object.entries(state.bonds).sort((a,b)=>b[1]-a[1])[0];
  }
  function bondLevel(v){ return v>=8?"最好的朋友":v>=5?"彼此信任":v>=3?"渐渐熟悉":v>=1?"有过交流":"还不熟"; }

  function start(){ state.screen="day"; save(); render(); }
  function chooseAction(id){ state.selectedAction=id; render(); }
  function confirmAction(){
    const a=GAME_DATA.dailyActions.find(x=>x.id===state.selectedAction);
    if(!a) return;
    if(state.stats.energy + a.energy < 0){ flash("精力不够，今天需要先休息。"); return; }
    state.stats.energy=Math.max(0,Math.min(7,state.stats.energy+a.energy));
    applyEffects({stats:a.stats});
    const target=a.bonds[(state.day-1)%a.bonds.length];
    state.bonds[target]=(state.bonds[target]||0)+1;
    state.history.push({day:state.day,title:a.title,text:`你选择了“${a.title}”，和${character(target).name}多了一次共同经历。`});
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
    state.stats.energy=Math.min(7,state.stats.energy+1);
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
    return `<header><div><span class="eyebrow">第 ${state.day} / ${GAME_DATA.maxDays} 天</span><h1>${GAME_DATA.title}</h1></div><button class="ghost small" id="openLog">回忆</button></header>
    <section class="stats">${["courage","kindness","creativity","order","energy"].map(k=>statBar(k,state.stats[k],k==="energy"?7:10)).join("")}</section>`;
  }
  function faces(ids){
    if(ids.includes("all")) ids=GAME_DATA.characters.map(c=>c.id);
    return `<div class="faces">${ids.map(id=>{const c=character(id);return `<span title="${c.name}">${c.icon}</span>`}).join("")}</div>`;
  }
  function renderStart(){
    app.innerHTML=`<main class="start card"><div class="sun">☀</div><p class="eyebrow">文字剧情 · 单局约 15 分钟</p><h1>${GAME_DATA.title}</h1><p class="subtitle">${GAME_DATA.subtitle}</p>
    <p>你是刚转入班级的新同学。十八天后，班级将举办开放日并进行期末评奖。你无法照顾到所有事情，也不可能一次和所有人成为朋友。</p>
    <div class="start-rules"><span>选择每日行动</span><span>触发连续事件</span><span>形成不同结局</span></div>
    <p class="collection-line">周目 ${meta.runs} · 事件 ${meta.events.length}/${GAME_DATA.events.length+GAME_DATA.followups.length} · 结局 ${meta.endings.length}/${GAME_DATA.endings.length} · 奖项 ${meta.awards.length}/${GAME_DATA.awards.length}</p>
    <button class="primary" id="start">${state.day>1||state.history.length?"继续本学期":"进入教室"}</button>
    ${state.history.length?`<button class="ghost" id="reset">重新开始</button>`:""}</main>`;
    $("#start").onclick=start; if($("#reset")) $("#reset").onclick=()=>confirm("确定清除当前进度吗？")&&reset();
  }
  function renderDay(){
    const chapter=chapterForDay(state.day);
    app.innerHTML=`${topbar()}<main>${chapter?`<section class="chapter"><span>新篇章</span><h2>${chapter.title}</h2><p>${chapter.text}</p></section>`:""}
    <section class="card"><p class="eyebrow">今天放学前</p><h2>你准备把时间花在哪里？</h2><div class="actions">${GAME_DATA.dailyActions.map(a=>`<button class="action ${state.selectedAction===a.id?"selected":""}" data-id="${a.id}"><b>${a.title}</b><small>${a.desc}</small><em>${a.energy<0?`精力 ${a.energy}`:a.energy>0?`精力 +${a.energy}`:"不消耗精力"}</em></button>`).join("")}</div>
    <button class="primary" id="confirmAction" ${state.selectedAction?"":"disabled"}>就这样度过今天</button></section></main>`;
    document.querySelectorAll(".action").forEach(b=>b.onclick=()=>chooseAction(b.dataset.id));
    $("#confirmAction").onclick=confirmAction; bindLog();
  }
  function renderEvent(){
    const ev=[...GAME_DATA.events,...GAME_DATA.followups].find(e=>e.id===state.currentEvent);
    app.innerHTML=`${topbar()}<main><section class="card event">${faces(ev.characters)}<p class="eyebrow">事件</p><h2>${ev.title}</h2><p class="event-text">${ev.text}</p><div class="choices">${ev.choices.map((c,i)=>{const ok=available(c);return `<button data-i="${i}" ${ok?"":"disabled"}><span>${c.text}</span>${!ok?`<small>需要 ${label(c.require.stat)} ≥ ${c.require.min}</small>`:""}</button>`}).join("")}</div></section></main>`;
    document.querySelectorAll(".choices button").forEach(b=>b.onclick=()=>chooseChoice(+b.dataset.i)); bindLog();
  }
  function effectText(e){
    const parts=[]; Object.entries(e.stats||{}).forEach(([k,v])=>parts.push(`${label(k)} ${v>0?"+":""}${v}`));
    if(e.energy) parts.push(`精力 ${e.energy>0?"+":""}${e.energy}`);
    return parts.join(" · ") || "关系发生了变化";
  }
  function renderResult(){
    const r=state.lastResult;
    app.innerHTML=`${topbar()}<main><section class="card result"><p class="eyebrow">你的选择</p><h2>${r.choice}</h2><p>${r.text}</p><div class="gain">${effectText(r.effects)}</div><button class="primary" id="nextDay">继续</button></section></main>`;
    $("#nextDay").onclick=advanceDay; bindLog();
  }
  function endingNarrative(){
    const f=strongestFriend();
    const ending=[...GAME_DATA.endings].sort((a,b)=>b.priority-a.priority).find(x=>x.test(state));
    return {friend:character(f[0]),score:f[1],ending};
  }
  function renderEnding(){
    const e=endingNarrative();
    const awards=GAME_DATA.awards.filter(a=>a.test(state));
    awards.forEach(a=>collect("awards",a.id));
    collect("endings",e.ending.id);
    if(!state.endingCounted){ meta.runs+=1; state.endingCounted=true; saveMeta(); save(); }
    const memories=state.history.filter(h=>h.choice).slice(-4);
    app.innerHTML=`<main class="ending"><section class="hero-end"><div class="sun">☀</div><p class="eyebrow">主要结局</p><h1>${e.ending.name}</h1><p>${e.ending.desc}</p></section>
    <section class="card"><p class="eyebrow">班级奖项 · 本局 ${awards.length}</p><div class="awards">${awards.length?awards.map(a=>`<article><b>${a.name}</b><p>${a.desc}</p></article>`).join(""):`<article><b>独一份的学期记录</b><p>没有匹配固定奖项，但你走出了一条无法复制的路线。</p></article>`}</div></section>
    <section class="card friend"><p class="eyebrow">最好的朋友</p><div class="friend-face">${e.friend.icon}</div><h2>${e.friend.name}</h2><p>${e.friend.trait}</p><strong>关系值 ${e.score} · ${bondLevel(e.score)}</strong></section>
    <section class="card"><p class="eyebrow">周目收藏</p><div class="awards"><article><b>事件 ${meta.events.length}/${GAME_DATA.events.length+GAME_DATA.followups.length}</b><p>新周目会优先出现尚未见过的可触发事件。</p></article><article><b>结局 ${meta.endings.length}/${GAME_DATA.endings.length}</b><p>主要结局互斥，每局只会获得一个。</p></article><article><b>奖项 ${meta.awards.length}/${GAME_DATA.awards.length}</b><p>奖项可以在同一局中同时解锁多个。</p></article></div></section>
    <section class="card"><p class="eyebrow">活动回忆</p><div class="timeline">${memories.map(m=>`<article><span>第${m.day}天</span><b>${m.title}</b><p>${m.text}</p></article>`).join("")}</div></section>
    <section class="card"><button class="primary" id="replay">开始新的学期</button><button class="ghost" id="fullLog">查看完整回忆</button></section></main>`;
    $("#replay").onclick=()=>confirm("开始新学期会清除本次进度，但保留结局、奖项和事件收藏。确定吗？")&&reset(); $("#fullLog").onclick=openLog;
  }
  function openLog(){
    const rows=state.history.length?state.history.map(h=>`<article><span>第 ${h.day} 天</span><b>${h.title}</b>${h.choice?`<em>${h.choice}</em>`:""}<p>${h.text}</p></article>`).join(""):"<p>还没有留下回忆。</p>";
    const bonds=Object.entries(state.bonds).sort((a,b)=>b[1]-a[1]).map(([id,v])=>`<div><span>${character(id).name}</span><i>${bondLevel(v)}</i><b>${v}</b></div>`).join("");
    const modal=document.createElement("div"); modal.className="modal"; modal.innerHTML=`<div class="modal-panel"><button class="close">×</button><h2>本学期记录</h2><h3>关系</h3><div class="bond-list">${bonds}</div><h3>回忆</h3><div class="timeline">${rows}</div></div>`;
    document.body.appendChild(modal); modal.querySelector(".close").onclick=()=>modal.remove(); modal.onclick=e=>{if(e.target===modal) modal.remove()};
  }
  function bindLog(){ if($("#openLog")) $("#openLog").onclick=openLog; }
  function render(){
    if(state.screen==="start") renderStart(); else if(state.screen==="day") renderDay(); else if(state.screen==="event") renderEvent(); else if(state.screen==="result") renderResult(); else renderEnding();
  }
  render();
})();
