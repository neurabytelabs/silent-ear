import { DEFAULTS, frequencies } from './engine.js';
import { DURATION, stageAt, leadTime } from './scenario.js';
const $=id=>document.getElementById(id), TAU=2*Math.PI;
let settings={...DEFAULTS},context,node,rate=48000,playing=false,ab=false,sequence=0;
let scenario=false,paused=false,seeking=false,timelineEditing=false,scenarioTime=0,latestRecord=null,analysis=null;
let ring=new Float32Array(rate*5),write=0,filled=0,endTime=0,impacts=[],lastBlock=null;
let queuedInjection=null;
let zoomValue=35,following=true,panOffset=0,lastAnnounced='',history=[],events={},drawId=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const worker=new Worker(new URL('./analysis-worker.js',import.meta.url),{type:'module'});
window.listenDiagnostics=()=>({audioClock:context?.currentTime||0,queuedSources:sources?.size||0,audioState:context?.state||'not started',sampleRate:rate,generatedSeconds:endTime,records:latestRecord?.result.count||0,playbackReady:!!node,scenarioTime,sequence});
const testWaiters=new Map();
let testID=0;
const fmt=(x,d=3)=>Number.isFinite(x)?x.toFixed(d):'—';
const minutes=x=>x*240/DURATION;
const colors=()=>{const s=getComputedStyle(document.documentElement);return Object.fromEntries(['bg','panel','line','cyan','gold','muted','text','red'].map(k=>[k,s.getPropertyValue('--'+k).trim()]));};
let palette=colors();
function updateGeometry(){
 const f=frequencies(settings),ratios=frequencies({...settings,rpm:60});
 $('shaft-number').textContent=fmt(f.fr,2)+' Hz';$('cage-number').textContent=fmt(f.ftf,2)+' Hz';$('spin-number').textContent=fmt(f.bsf,2)+' Hz';
 $('formulas').innerHTML=[['BPFO','Outer race','(n/2) · fᵣ · (1 − (d/D) cos φ)',f.bpfo],['BPFI','Inner race','(n/2) · fᵣ · (1 + (d/D) cos φ)',f.bpfi],['FTF','Cage','(fᵣ/2) · (1 − (d/D) cos φ)',f.ftf],['BSF','Ball spin','(D/(2d)) · fᵣ · (1 − ((d/D) cos φ)²)',f.bsf]].map(([name,label,formula,value])=>`<div class="formula">${name} / ${label}<strong>${fmt(value,2)} Hz · ${fmt(({BPFO:ratios.bpfo,BPFI:ratios.bpfi,FTF:ratios.ftf,BSF:ratios.bsf})[name],5)} × shaft</strong>${formula}${name==='BSF'?`<br>Ball impact rhythm: 2·BSF = ${fmt(f.ball,2)} Hz`:''}</div>`).join('');
}
updateGeometry();
function postSettings(){node?.port.postMessage({type:'settings',settings});updateGeometry();}
function clearView(){ring=new Float32Array(rate*5);write=0;filled=0;endTime=0;impacts=[];history=[];lastBlock=null;analysis=null;panOffset=0;following=true;events={};latestRecord=null;}
function resetEngine(isScenario=false,snapshot=null,time=0){
 sequence++;clearView();
 worker.postMessage({type:'reset',rate,settings,records:Number($('records').value),k:Number($('k').value),sequence});
 node?.port.postMessage({type:'reset',settings,scenario:isScenario,snapshot,time,sequence});
}
let sources=new Set(),nextAudioTime=0,outputGain;
function clearQueue(){for(const source of sources){source.onended=null;try{source.stop();}catch{/* Already ended. */}}sources.clear();nextAudioTime=context?.currentTime||0;}
function requestSource(){worker.postMessage({type:'generate',sequence,count:4096});}
function queueSource(data){
 if(data.sequence!==sequence||seeking)return;
 const buffer=context.createBuffer(1,data.samples.length,rate),channel=buffer.getChannelData(0);
 // Playback alone is soft-limited. The worker analyses the original samples on completion.
 for(let i=0;i<channel.length;i++)channel[i]=.82*Math.tanh(data.samples[i]*3/.82);
 const source=context.createBufferSource();source.buffer=buffer;source.connect(outputGain);
 const start=Math.max(context.currentTime+.012,nextAudioTime),finish=start+channel.length/rate;nextAudioTime=finish;
 data.audioTime=finish;sources.add(source);storeSamples(data);
 source.onended=()=>{sources.delete(source);source.disconnect();if(data.sequence!==sequence)return;onSamples({data});if(data.final){onSamples({data:{type:'seizure',time:DURATION,sequence}});}else requestSource();};
 source.start(start);
}
async function ensureAudio(){
 if(!context){const Audio=contextConstructor();context=new Audio({latencyHint:'interactive'});rate=context.sampleRate;ring=new Float32Array(rate*5);
  outputGain=context.createGain();outputGain.gain.value=Number($('volume').value)/100;outputGain.connect(context.destination);
  // Three real sample buffers provide scheduling headroom while FFT work stays in a worker.
  node={port:{postMessage(message){
   if(message.type==='reset'){clearQueue();worker.postMessage({...message,type:'sourceReset',rate});worker.postMessage({type:'sourceAB',value:ab&&!message.scenario});for(let i=0;i<3;i++)requestSource();}
   else if(message.type==='volume')outputGain.gain.setTargetAtTime(message.value,context.currentTime,.005);
   else if(message.type==='settings')worker.postMessage({type:'sourceSettings',settings:message.settings});
   else if(message.type==='ab')worker.postMessage({type:'sourceAB',value:message.value});
   else if(message.type==='pause'){if(message.value)context.suspend().catch(reportError);else context.resume().catch(reportError);}
  }}};
  worker.postMessage({type:'init',rate,settings,records:Number($('records').value),k:Number($('k').value),sequence});
  worker.postMessage({type:'sourceReset',rate,settings,sequence,scenario:false});worker.postMessage({type:'sourceAB',value:ab});for(let i=0;i<3;i++)requestSource();
  $('sample-rate').textContent=(rate/1000).toFixed(1)+' kSAMPLES / S';
 }
 context.resume().catch(reportError);playing=true;
}
function contextConstructor(){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('This browser does not support Web Audio. Use a current browser with Web Audio support.');return Audio;}
function reportError(error){$('audio-note').textContent=String(error.message||error);$('announcements').textContent=String(error.message||error);}
$('start').onclick=async()=>{try{
 if(scenario&&scenarioTime>=DURATION){await startScenario();return;}
 if(playing){await context.suspend();playing=false;if(scenario){paused=true;setScenarioControls();}$('start').textContent='▶ Resume listening';}
 else {await ensureAudio();if(scenario){paused=false;setScenarioControls();}$('start').textContent='Ⅱ Pause listening';}
}catch(error){reportError(error);}};
$('volume').oninput=()=>{$('volume-value').textContent=$('volume').value+'%';node?.port.postMessage({type:'volume',value:Number($('volume').value)/100});};
function leaveScenario(){if(!scenario)return;scenario=false;paused=false;seeking=false;setScenarioControls();worker.postMessage({type:'sourceManual'});context?.resume().catch(reportError);playing=!!context;$('start').textContent='Ⅱ Pause listening';if(!sources.size)for(let i=0;i<3;i++)requestSource();$('scenario-stage').textContent='Manual laboratory';}
for(const key of ['rpm','load','severity','variation']) $(key).oninput=()=>{
 leaveScenario();settings[key]=Number($(key).value);
 if(key==='severity')warnLearning();
 $(key+'-value').textContent=key==='rpm'?settings[key]+' rpm':key==='load'?fmt(settings[key],2)+' ×':Math.round(settings[key]*100)+'%';postSettings();
};
const descriptions={none:'Healthy: small shaft components over a Gaussian noise floor. A defect adds knocks that make the housing ring.',outer:'Outer race: steady ticks. The damaged spot stays still inside the load zone.',inner:'Inner race: ticks pulse once per shaft turn. The damaged spot rotates into and out of the loaded arc.',ball:'Ball: ticks swell and fade with the cage. The damaged ball strikes both races once per spin revolution.'};
$('fault').onchange=()=>{leaveScenario();warnLearning();settings.fault=$('fault').value;postSettings();$('rhythm-note').textContent=descriptions[settings.fault];};
function warnLearning(){if(!latestRecord?.result.ready)$('learning-note').hidden=false;}
function seedFault(defect){
 settings={...settings,...defect};$('fault').value=settings.fault;$('severity').value=settings.severity;
 $('severity-value').textContent=Math.round(settings.severity*100)+'%';postSettings();$('rhythm-note').textContent=descriptions[settings.fault];
 queuedInjection=null;$('inject').textContent='＋ Inject fault';$('injection-note').hidden=false;$('injection-note').textContent='Fault seeded after the reference became ready.';
}
$('inject').onclick=()=>{
 leaveScenario();const defect={fault:settings.fault==='none'?'outer':settings.fault,severity:Math.max(.2,settings.severity)};
 if(!latestRecord?.result.ready){queuedInjection=defect;$('inject').textContent='Fault queued';$('injection-note').hidden=false;$('injection-note').textContent='Fault will be seeded when the reference is ready';}
 else seedFault(defect);
};
$('ab').onclick=()=>{ab=!ab;node?.port.postMessage({type:'ab',value:ab});$('ab').setAttribute('aria-pressed',String(ab));$('ab').textContent=ab?'A/B: hear selected fault':'A/B: hear healthy';$('ab-note').textContent=ab?'Listening: healthy bearing at the same rpm':'Listening: selected bearing';};
for(const key of ['n','d','D','phi','resonance','zeta']) $(key).onchange=()=>{
 const input=$(key);if(!input.checkValidity()){input.reportValidity();return;}
 const value=Number(input.value);const proposed={...settings,[key]:value};
 if(proposed.d>=proposed.D){input.setCustomValidity('Ball diameter must be smaller than pitch diameter.');input.reportValidity();return;}
 input.setCustomValidity('');leaveScenario();settings=proposed;postSettings();
};
$('k').oninput=()=>{$('k-value').textContent=fmt(Number($('k').value),1);worker.postMessage({type:'k',value:Number($('k').value)});};
$('records').onchange=()=>{if(!$('records').checkValidity())$('records').reportValidity();};
$('relearn').onclick=()=>{if(!$('records').checkValidity()){ $('records').reportValidity();return;}if(scenario)startScenario();else resetEngine();renderLearning();};
function renderLearning(){$('score').textContent='Score unavailable — learning demo baseline';$('score').classList.add('unavailable');$('status').textContent='TRAINING';$('event').textContent='Threshold event: unavailable';$('learned').textContent='0 / '+$('records').value;for(const key of ['mean','sigma','threshold'])$(key).textContent='—';$('payload').textContent='Score unavailable — learning demo baseline';$('metrics').textContent='Awaiting reference.';}
function storeSamples(data){
 const samples=data.samples;
 for(let i=0;i<samples.length;i++){ring[write]=samples[i];write=(write+1)%ring.length;}
 filled=Math.min(ring.length,filled+samples.length);endTime=data.endTime;
 impacts.push(...data.impacts);impacts=impacts.filter(i=>i.time>endTime-5);lastBlock=data;
}
function onSamples({data}){
 if(data.sequence!==sequence||seeking)return;
 if(data.type==='seizure'){if(lastBlock){lastBlock.settings.rpm=0;if(lastBlock.operating)lastBlock.operating.rpm=0;}settings.rpm=0;$('rpm').value=0;$('rpm-value').textContent='0 rpm / seized';updateGeometry();scenarioTime=DURATION;paused=true;events.failure=DURATION;playing=false;$('start').textContent='↻ Restart scenario';setScenarioControls();renderTimeline();$('scenario-stage').textContent='Simulated seizure';$('announcements').textContent='Simulated seizure at 240 simulated minutes.';return;}
 if(data.type!=='samples'&&data.type!=='source')return;
 const samples=data.samples;
 if(data.scenario&&!paused){scenarioTime=data.scenarioTime;syncScenarioSettings(data.settings);renderTimeline();}
 worker.postMessage({...data,type:'samples'},[samples.buffer]);
}
worker.onmessage=({data})=>{
 if(data.type==='selftest'){
  const label=data.pass?'LISTEN SELFTEST PASS':'LISTEN SELFTEST FAIL: '+data.failures.join('; ');
  console[data.pass?'log':'error'](label);
  if(location.hash==='#selftest'){$('test-result').hidden=false;$('test-result').textContent=label+'\n'+data.checks.join('\n');}
  testWaiters.get(data.id)?.(data);testWaiters.delete(data.id);return;
 }
 if(data.sequence!==sequence)return;
 if(data.type==='source'){queueSource(data);return;}
 if(data.type==='record'){latestRecord=data;if(data.result.ready){$('learning-note').hidden=true;if(queuedInjection)seedFault(queuedInjection);}events={...events,...data.events};renderRecord(data);if(scenario)renderTimeline();}
 if(data.type==='analysis'){analysis=data;}
 if(data.type==='stft'){history.push(data);if(history.length>160)history.shift();}
 if(data.type==='seeked'){
  seeking=false;scenarioTime=data.time;events=data.events;
  // Restore ring for immediate inspection of the deterministically replayed signal.
  if(analysis?.samples){const s=analysis.samples;ring.set(s);filled=s.length;write=s.length%ring.length;endTime=analysis.endTime;impacts=analysis.impacts;}
  node?.port.postMessage({type:'reset',snapshot:data.snapshot,settings,scenario:true,time:data.time,sequence});
  node?.port.postMessage({type:'pause',value:true});paused=true;playing=false;$('start').textContent=data.time>=DURATION?'↻ Restart scenario':'▶ Resume listening';
  lastBlock={endTime,shaftPhase:data.snapshot.shaftPhase,cagePhase:data.snapshot.cagePhase,spinPhase:data.snapshot.spinPhase,settings:data.snapshot.settings,audioTime:context?.currentTime||0};
  syncScenarioSettings({...data.snapshot.settings,rpm:data.time>=DURATION?0:data.snapshot.settings.rpm});lastBlock.settings={...settings};
  renderTimeline();setScenarioControls();$('scenario-stage').textContent=stageAt(data.time)+(data.time<DURATION?' / paused':'');
 }
};
worker.onerror=event=>{reportError(new Error('Analysis worker failed: '+event.message));};
window.listenSelfTest=()=>new Promise(resolve=>{const id=++testID;testWaiters.set(id,resolve);worker.postMessage({type:'selftest',id});});
if(location.hash==='#selftest')window.listenSelfTest();
function renderRecord(data){
 const {values:v,result:r}=data;
 $('rms').textContent=fmt(v.rms,4);$('crest').textContent=fmt(v.crest,2);$('kurtosis').textContent=fmt(v.kurtosis,2);
 $('raw-text').textContent=`RMS ${fmt(v.rms,4)} demo units · peak ${fmt(v.peak,4)} demo units · ${Math.round(rate*.25).toLocaleString()} samples / record · predicted ${fmt(({outer:frequencies(data.settings).bpfo,inner:frequencies(data.settings).bpfi,ball:frequencies(data.settings).ball})[data.settings.fault]||0,2)} knocks/s`;
 $('learned').textContent=r.count+' / '+$('records').value+(!r.ready&&r.count===Number($('records').value)?' · first score on next record':'');
 if(r.ready){
  $('score').classList.remove('unavailable');$('score').textContent=fmt(r.score*100,1)+' / 100';
  $('mean').textContent=fmt(r.mean,6)+' demo units';$('sigma').textContent=fmt(r.sigma,6)+' demo units';$('threshold').textContent=fmt(r.threshold,6)+' demo units';
  $('event').textContent='Threshold event: '+(r.event?'YES · RMS > mean + k·σ':'NO');
  $('payload').textContent=JSON.stringify({health_score:Number(r.score.toFixed(6)),status:r.status,timestamp:new Date().toISOString()},null,2);
  $('metrics').textContent=`silent_ear_health_score ${fmt(r.score,6)}\nsilent_ear_health_percent ${fmt(r.score*100,3)}\nsilent_ear_anomalies_detected_total ${data.anomalyCount}`;
  $('alert-text').textContent=r.status==='CRITICAL'?'Illustration: silent-ear/alerts would publish a CRITICAL alert.':'No illustrated CRITICAL alert.';
 }else{$('score').classList.add('unavailable');$('score').textContent='Score unavailable — learning demo baseline';$('event').textContent='Threshold event: unavailable';}
 $('status').textContent=r.status;
 $('status').style.color=r.status==='CRITICAL'?palette.red:r.status==='WARNING'?palette.gold:palette.cyan;
 const announcement=r.status+'; threshold event '+(r.ready?(r.event?'yes':'no'):'unavailable');
 if(announcement!==lastAnnounced){$('announcements').textContent=announcement;lastAnnounced=announcement;}
}
function syncScenarioSettings(value){
 settings={...settings,...value};
 for(const key of ['rpm','load','severity'])$(key).value=settings[key];
 $('rpm-value').textContent=Math.round(settings.rpm)+' rpm';$('load-value').textContent=fmt(settings.load,2)+' ×';$('severity-value').textContent=Math.round(settings.severity*100)+'%';$('fault').value=settings.fault;
 $('rhythm-note').textContent=descriptions[settings.fault];updateGeometry();
}
function setScenarioControls(){
 $('pause').disabled=!scenario||seeking||scenarioTime>=DURATION;$('restart').disabled=!scenario||seeking;
 $('timeline').disabled=!scenario||seeking;
 $('pause').textContent=scenarioTime>=DURATION?'Scenario ended':paused?'Resume scenario':'Pause scenario';$('run').disabled=seeking;
 // A/B works during manual experiments. A scenario records one controlled trajectory.
 $('ab').disabled=scenario;
}
async function startScenario(){try{
 queuedInjection=null;$('inject').textContent='＋ Inject fault';$('injection-note').hidden=true;$('learning-note').hidden=true;
 await ensureAudio();scenario=true;paused=false;ab=false;timelineEditing=false;scenarioTime=0;
 settings={...settings,rpm:1797,load:1,fault:'none',severity:0};
 $('rpm').value=1797;$('rpm-value').textContent='1797 rpm';$('load').value=1;$('load-value').textContent='1.00 ×';$('fault').value='none';$('severity').value=0;$('severity-value').textContent='0%';
 $('ab').setAttribute('aria-pressed','false');$('ab').textContent='A/B: hear healthy';$('ab-note').textContent='Listening: scenario bearing';
 resetEngine(true);updateGeometry();renderLearning();setScenarioControls();renderTimeline();$('start').textContent='Ⅱ Pause listening';
}catch(error){reportError(error);}}
$('run').onclick=startScenario;$('restart').onclick=startScenario;
$('pause').onclick=async()=>{paused=!paused;playing=!paused;$('start').textContent=paused?'▶ Resume listening':'Ⅱ Pause listening';node?.port.postMessage({type:'pause',value:paused});setScenarioControls();renderTimeline();};
$('timeline').onpointerdown=()=>{timelineEditing=true;if(scenario&&!paused){paused=true;playing=false;node?.port.postMessage({type:'pause',value:true});$('start').textContent='▶ Resume listening';setScenarioControls();}};
$('timeline').oninput=()=>{timelineEditing=true;const t=Number($('timeline').value);$('timeline-value').textContent=fmt(minutes(t),1)+' simulated minutes';};
$('timeline').onchange=async()=>{
 if(!scenario||seeking)return;timelineEditing=false;seeking=true;paused=true;node?.port.postMessage({type:'pause',value:true});
 sequence++;clearView();setScenarioControls();$('scenario-stage').textContent='Recomputing samples from seed…';
 worker.postMessage({type:'seek',rate,settings,time:Number($('timeline').value),records:Number($('records').value),k:Number($('k').value),sequence});
};
function renderTimeline(){
 if(!timelineEditing&&!seeking){$('timeline').value=scenarioTime;$('timeline-value').textContent=fmt(minutes(scenarioTime),1)+' simulated minutes';}
 $('scenario-stage').textContent=stageAt(scenarioTime)+(paused&&scenarioTime<DURATION?' / paused':'');
 $('milestones').innerHTML=[['Kurtosis > 4.5',events.kurtosis],['RMS rule fired',events.rms],['Score CRITICAL',events.critical],['Simulated seizure',DURATION]].map(([name,t])=>`<span>${name}<b>${t===undefined?'not observed':fmt(minutes(t),1)+' min'+(name==='Simulated seizure'?' / fixed':'')}</b></span>`).join('');
 $('lead-time').textContent=leadTime(events,scenarioTime);
}
$('theme').onclick=()=>{const current=getComputedStyle(document.documentElement).colorScheme;document.documentElement.dataset.theme=current==='dark'?'light':'dark';palette=colors();lastAnalysis=null;lastSpectrogramTime=-1;};
matchMedia('(prefers-color-scheme: light)').addEventListener('change',()=>{palette=colors();});
// Continuous zoom uses one time axis; every view is a different scale of the same ring.
const span=()=>4*Math.exp(-zoomValue/100*Math.log(4000));
function changeZoom(value){zoomValue=Math.max(0,Math.min(100,value));$('zoom-slider').value=zoomValue;}
$('zoom-slider').oninput=()=>changeZoom(Number($('zoom-slider').value));
$('follow').onclick=()=>{following=!following;if(following)panOffset=0;$('follow').setAttribute('aria-pressed',String(following));$('follow').textContent=following?'Follow newest impact':'Resume following';};
$('zoom').addEventListener('wheel',event=>{event.preventDefault();changeZoom(zoomValue-event.deltaY*.04);},{passive:false});
$('zoom').onkeydown=event=>{
 if(['+','=','-','ArrowLeft','ArrowRight','Home'].includes(event.key))event.preventDefault();
 if(event.key==='+'||event.key==='=')changeZoom(zoomValue+3);if(event.key==='-')changeZoom(zoomValue-3);
 if(event.key==='ArrowLeft'||event.key==='ArrowRight'){following=false;panOffset+=(event.key==='ArrowLeft'?-1:1)*span()*.15;}
 if(event.key==='Home'){following=true;panOffset=0;}
};
const pointers=new Map();let dragX=0,pinchDistance=0;
$('zoom').onpointerdown=event=>{pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});$('zoom').setPointerCapture(event.pointerId);dragX=event.clientX;if(pointers.size===2){const p=[...pointers.values()];pinchDistance=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}};
$('zoom').onpointermove=event=>{
 if(!pointers.has(event.pointerId))return;pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
 if(pointers.size===2){const p=[...pointers.values()],distance=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);if(distance&&pinchDistance)changeZoom(zoomValue+Math.log(distance/pinchDistance)*100/Math.log(4000));pinchDistance=distance;}
 else {following=false;panOffset-=(event.clientX-dragX)/$('zoom').clientWidth*span();dragX=event.clientX;}
};
for(const event of ['pointerup','pointercancel'])$('zoom').addEventListener(event,e=>{pointers.delete(e.pointerId);pinchDistance=0;});
function surface(id){
 const canvas=$(id),rect=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
 const w=rect.width,h=rect.height;
 if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
 const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);c.lineWidth=1;c.font='10px ui-monospace, monospace';return {c,w,h};
}
function grid(c,w,h,label){c.strokeStyle=palette.line;c.fillStyle=palette.muted;c.lineWidth=.7;
 for(let i=1;i<5;i++){c.beginPath();c.moveTo(0,h*i/5);c.lineTo(w,h*i/5);c.stroke();}
 for(let i=1;i<9;i++){c.beginPath();c.moveTo(w*i/9,0);c.lineTo(w*i/9,h);c.stroke();}
 c.fillText(label,8,13);
}
function sampleAt(time){const i=Math.round((time-(endTime-filled/rate))*rate);if(i<0||i>=filled)return 0;return ring[((write-filled+i)%ring.length+ring.length)%ring.length];}
function drawSignal(id,start,duration,dots=false){
 if(!visibleCanvases.has(id))return;
 const {c,w,h}=surface(id);grid(c,w,h,'ACCELERATION / DEMO UNITS');
 if(!filled){c.fillStyle=palette.muted;c.fillText('START LISTENING TO COMPUTE SAMPLES',16,h/2);return;}
 let maximum=.04;const step=Math.max(1,Math.floor(duration*rate/w));
 for(let i=0;i<duration*rate;i+=step)maximum=Math.max(maximum,Math.abs(sampleAt(start+i/rate)));
 const sy=x=>h*.5-x/maximum*h*.37;
 c.strokeStyle=palette.cyan;c.lineWidth=1.1;c.beginPath();
 if(duration*rate>w*2){
  for(let x=0;x<w;x++){let lo=Infinity,hi=-Infinity;const begin=Math.floor(x/w*duration*rate),end=Math.floor((x+1)/w*duration*rate);
   for(let i=begin;i<=end;i++){const v=sampleAt(start+i/rate);lo=Math.min(lo,v);hi=Math.max(hi,v);}
   c.moveTo(x,sy(lo));c.lineTo(x,sy(hi));}
 }else for(let i=0;i<duration*rate;i++){const x=i/(duration*rate)*w,y=sy(sampleAt(start+i/rate));if(i===0)c.moveTo(x,y);else c.lineTo(x,y);}
 c.stroke();
 if(dots&&duration*rate<w/3){c.fillStyle=palette.cyan;for(let i=0;i<duration*rate;i++){c.beginPath();c.arc(i/(duration*rate)*w,sy(sampleAt(start+i/rate)),2.5,0,TAU);c.fill();}}
 c.strokeStyle=palette.gold;c.setLineDash([3,4]);
 for(const impact of impacts){if(impact.time<start||impact.time>start+duration)continue;const x=(impact.time-start)/duration*w;c.globalAlpha=impact.amplitude>0?.95:.8;c.beginPath();c.moveTo(x,20);c.lineTo(x,h-19);c.stroke();}
 c.globalAlpha=1;c.setLineDash([]);c.fillStyle=palette.muted;c.fillText(fmt(maximum,3),w-54,24);c.fillText(fmt(start,3)+' s',8,h-5);const label=fmt(duration*1000,duration<.01?2:0)+' ms';c.fillText(label,w-80,h-5);
}
function drawBearing(time){
 if(!visibleCanvases.has('bearing'))return;
 const {c,w,h}=surface('bearing'),cx=w/2,cy=h/2,R=Math.min(w*.27,h*.43),f=frequencies({...lastBlock?.settings||settings,rpm:lastBlock?.operating?.rpm??(lastBlock?.settings||settings).rpm});
 const delay=Math.max(0,endTime-time),shaft=(lastBlock?.shaftPhase||0)-f.fr*delay,cage=(lastBlock?.cagePhase||0)-f.ftf*delay,spin=(lastBlock?.spinPhase||0)-f.bsf*delay;
 const shaftAngle=reduced.matches?0:shaft*TAU,cageAngle=reduced.matches?0:cage*TAU,spinAngle=reduced.matches?0:spin*TAU;
 c.save();c.translate(cx,cy);
 const metal=c.createRadialGradient(0,0,R*.2,0,0,R*1.1);metal.addColorStop(0,palette.line);metal.addColorStop(.7,palette.muted);metal.addColorStop(1,palette.raised||palette.panel);
 c.strokeStyle=metal;c.lineWidth=R*.18;c.beginPath();c.arc(0,0,R*.99,0,TAU);c.stroke();
 c.strokeStyle=palette.line;c.lineWidth=1;c.beginPath();c.arc(0,0,R*1.09,0,TAU);c.stroke();
 c.strokeStyle=metal;c.lineWidth=R*.17;c.beginPath();c.arc(0,0,R*.5,0,TAU);c.stroke();
 c.save();c.rotate(shaftAngle);c.strokeStyle=palette.cyan;c.lineWidth=2;
 for(let i=0;i<8;i++){c.rotate(TAU/8);c.beginPath();c.moveTo(R*.39,0);c.lineTo(R*.48,0);c.stroke();}c.restore();
 c.strokeStyle=palette.gold;c.globalAlpha=.9;c.lineWidth=2;c.beginPath();c.arc(0,0,R*.745,0,TAU);c.stroke();c.globalAlpha=1;
 const selected=lastBlock?.settings?.fault||settings.fault;
 for(let i=0;i<settings.n;i++){
  const angle=cageAngle+i*TAU/settings.n,x=Math.cos(angle)*R*.745,y=Math.sin(angle)*R*.745,br=R*Math.min(.13,Math.PI*.59/settings.n);
  const ball=c.createRadialGradient(x-br*.3,y-br*.3,0,x,y,br);ball.addColorStop(0,palette.text);ball.addColorStop(1,palette.line);c.fillStyle=ball;c.beginPath();c.arc(x,y,br,0,TAU);c.fill();
  c.strokeStyle=palette.bg;c.lineWidth=1.5;c.beginPath();c.moveTo(x-Math.cos(spinAngle)*br*.75,y-Math.sin(spinAngle)*br*.75);c.lineTo(x+Math.cos(spinAngle)*br*.75,y+Math.sin(spinAngle)*br*.75);c.stroke();
  if(selected==='ball'&&i===0){c.fillStyle=palette.red;c.beginPath();c.arc(x+Math.cos(spinAngle)*br*.7,y+Math.sin(spinAngle)*br*.7,3,0,TAU);c.fill();}
 }
 if(selected==='outer'||selected==='inner'){const angle=selected==='outer'?0:shaftAngle,r=R*(selected==='outer'?.9:.59);c.fillStyle=palette.red;c.beginPath();c.arc(Math.cos(angle)*r,Math.sin(angle)*r,4,0,TAU);c.fill();}
 const recent=impacts.filter(x=>x.amplitude>0&&time-x.time>=0&&time-x.time<.035);
 if(recent.length){const hit=recent[recent.length-1],a=selected==='outer'?0:selected==='inner'?hit.shaftPhase*TAU:hit.cagePhase*TAU,r=R*(selected==='outer'?.87:selected==='inner'?.6:.745);
  c.strokeStyle=palette.gold;c.lineWidth=3;c.globalAlpha=reduced.matches?.7:1-(time-hit.time)/.035;c.beginPath();c.arc(Math.cos(a)*r,Math.sin(a)*r,9,0,TAU);c.stroke();c.globalAlpha=1;
 }
 c.fillStyle=palette.muted;c.font='9px ui-monospace,monospace';c.textAlign='center';c.fillText('SHAFT',0,-4);c.fillStyle=palette.cyan;c.font='13px ui-monospace,monospace';c.fillText(fmt(f.fr,2)+' Hz',0,14);c.restore();
}
function resonanceBand(){
 // Exact digital half-power edges of the two cascaded Q=2.5 stages.
 const beta=Math.sqrt(Math.SQRT2-1)/(2*2.5),t=Math.tan(Math.PI*settings.resonance/rate);
 return [-1,1].map(sign=>rate/Math.PI*Math.atan(t*(Math.sqrt(1+beta*beta)+sign*beta)));
}
function drawSpectrum(id,spec,maxFrequency,envelopeMode=false){
 if(!visibleCanvases.has(id))return;
 const {c,w,h}=surface(id);grid(c,w,h,envelopeMode?'ENVELOPE AMPLITUDE / NORMALIZED':'ACCELERATION / dB re 1 demo units');
 const limit=Math.min(maxFrequency,rate/2),base=h-25;
 if(!envelopeMode){
  c.fillStyle=palette.gold;c.globalAlpha=.16;c.fillRect(0,19,500/limit*w,base-19);
  const [low,high]=resonanceBand();c.fillStyle=palette.cyan;c.globalAlpha=.13;c.fillRect(low/limit*w,19,(high-low)/limit*w,base-19);c.globalAlpha=1;
  c.strokeStyle=palette.cyan;c.setLineDash([3,4]);for(const edge of [low,high]){c.beginPath();c.moveTo(edge/limit*w,19);c.lineTo(edge/limit*w,base);c.stroke();}c.setLineDash([]);
 }
 if(spec){
  const {frequencies:freq,magnitudes:mag}=spec;let maximum=1e-8;
  if(envelopeMode)for(let i=2;i<mag.length&&freq[i]<limit;i++)maximum=Math.max(maximum,mag[i]);
  const sy=v=>envelopeMode?base-Math.min(1,v/maximum)*(base-96):base-Math.max(0,Math.min(1,(20*Math.log10(Math.max(1e-8,v))+110)/110))*(h-52);
  c.strokeStyle=palette.cyan;c.lineWidth=1;c.beginPath();
  for(let x=0;x<w;x++){const lo=Math.floor(x/w*limit/(freq[1]||1)),hi=Math.min(mag.length-1,Math.ceil((x+1)/w*limit/(freq[1]||1)));let v=0;for(let i=lo;i<=hi;i++)v=Math.max(v,mag[i]);if(x===0)c.moveTo(x,sy(v));else c.lineTo(x,sy(v));}c.stroke();
 }
 if(envelopeMode){
  const f=frequencies(lastBlock?.settings||settings),markers=[['BPFO',f.bpfo],['BPFI',f.bpfi],['2·BSF',f.ball],['FTF',f.ftf]];
  markers.forEach(([label,value],row)=>{
   if(value<=0||value>limit)return;
   for(let harmonic=1;harmonic<=3;harmonic++){
    const hz=value*harmonic;if(hz>limit)continue;const x=hz/limit*w;c.strokeStyle=palette.gold;c.globalAlpha=harmonic===1?1:.8;c.setLineDash([3,4]);c.beginPath();c.moveTo(x,94);c.lineTo(x,base);c.stroke();
   }
   if(label==='BPFI'||label==='2·BSF')for(let harmonic=1;harmonic<=3;harmonic++)for(const sign of [-1,1]){const hz=value*harmonic+sign*(label==='BPFI'?f.fr:f.ftf);if(hz<0||hz>limit)continue;c.strokeStyle=palette.muted;c.globalAlpha=.9;c.beginPath();c.moveTo(hz/limit*w,94);c.lineTo(hz/limit*w,base);c.stroke();}
   // Four separate label rows, above all traces and marker strokes, cannot overprint.
   c.globalAlpha=1;c.setLineDash([]);const labelWidth=c.measureText(label).width,x=Math.min(w-labelWidth-5,Math.max(5,value/limit*w-labelWidth/2)),y=29+row*18;
   c.fillStyle=palette.panel;c.fillRect(x-3,y-11,labelWidth+6,15);c.fillStyle=palette.gold;c.fillText(label,x,y);
  });
 }else{
  const words='fault rhythms are down here, buried: see the envelope spectrum'.split(' '),lines=[];let line='';
  for(const word of words){const next=line?line+' '+word:word;if(c.measureText(next).width>Math.min(260,w-16)&&line){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);
  c.fillStyle=palette.panel;c.fillRect(5,23,Math.min(266,w-10),lines.length*13+5);c.fillStyle=palette.gold;lines.forEach((text,i)=>c.fillText(text,8,35+i*13));
  const [low,high]=resonanceBand(),label='Band-pass −3 dB',width=c.measureText(label).width,x=Math.max(8,Math.min(w-width-8,(low+high)/2/limit*w-width/2));
  c.fillStyle=palette.panel;c.fillRect(x-3,83,width+6,17);c.fillStyle=palette.cyan;c.fillText(label,x,95);
 }
 c.globalAlpha=1;c.setLineDash([]);c.fillStyle=palette.muted;for(let i=0;i<=4;i++){const tick=Math.round(limit*i/4)+' Hz',width=c.measureText(tick).width;c.fillText(tick,Math.max(2,Math.min(w-width-2,w*i/4-width/2)),h-7);}
}
function drawDemod(){if(!visibleCanvases.has('demod'))return;const {c,w,h}=surface('demod');grid(c,w,h,'BAND-PASS CYAN / ENVELOPE GOLD');if(!analysis)return;
 const {bandpassed,envelope,envelopeRate}=analysis.analysis;if(!bandpassed||!envelope)return;
 const duration=.06,start=Math.max(0,bandpassed.length-Math.round(duration*rate));let maximum=.025;
 for(let i=start;i<bandpassed.length;i++)maximum=Math.max(maximum,Math.abs(bandpassed[i]));
 c.strokeStyle=palette.cyan;c.beginPath();for(let x=0;x<w;x++){const i=start+Math.floor(x/w*(bandpassed.length-start)),y=h/2-bandpassed[i]/maximum*h*.35;if(x)c.lineTo(x,y);else c.moveTo(x,y);}c.stroke();
 c.strokeStyle=palette.gold;c.lineWidth=2;c.beginPath();const envStart=Math.max(0,envelope.length-Math.round(duration*envelopeRate));for(let x=0;x<w;x++){const i=Math.min(envelope.length-1,envStart+Math.floor(x/w*(envelope.length-envStart))),y=h/2-envelope[i]/maximum*h*.35;if(x)c.lineTo(x,y);else c.moveTo(x,y);}c.stroke();c.lineWidth=1;c.fillStyle=palette.muted;c.fillText('60 ms / envelope lag from causal filtering',8,h-8);
}
const heatCanvas=document.createElement('canvas'),heatContext=heatCanvas.getContext('2d');
function heatColor(v){
 const hue=(190-v*150)/60,sat=(45+v*35)/100,light=(8+v*55)/100;
 const chroma=(1-Math.abs(2*light-1))*sat,x=chroma*(1-Math.abs(hue%2-1)),m=light-chroma/2;
 const rgb=hue<1?[chroma,x,0]:hue<2?[x,chroma,0]:hue<3?[0,chroma,x]:[0,x,chroma];
 return rgb.map(x=>Math.round((x+m)*255));
}
const heatPalette=Array.from({length:256},(_,i)=>heatColor(i/255));
function drawSpectrogram(){
 if(!visibleCanvases.has('spectrogram'))return;
 const {c,w,h}=surface('spectrogram');grid(c,w,h,'0–8 kHz / TIME →');if(!history.length)return;
 // One raster upload replaces thousands of individual canvas fill operations.
 const rows=72,columns=160;heatCanvas.width=columns;heatCanvas.height=rows;
 const pixels=heatContext.createImageData(columns,rows),start=Math.max(0,history.length-columns);
 for(let j=start;j<history.length;j++){
  const spec=history[j].spectrum,x=j-start+columns-(history.length-start),df=spec.frequencies[1];
  for(let y=0;y<rows;y++){
   const hz=(1-y/(rows-1))*8000,index=Math.min(spec.magnitudes.length-1,Math.round(hz/df));
   const db=20*Math.log10(Math.max(1e-8,spec.magnitudes[index]));
   const color=heatPalette[Math.max(0,Math.min(255,Math.round((db+100)/80*255)))],offset=(y*columns+x)*4;
   pixels.data[offset]=color[0];pixels.data[offset+1]=color[1];pixels.data[offset+2]=color[2];pixels.data[offset+3]=255;
  }
 }
 heatContext.putImageData(pixels,0,0);c.imageSmoothingEnabled=false;c.drawImage(heatCanvas,0,18,w,h-40);
 c.fillStyle=palette.panel;c.fillRect(0,18,52,17);c.fillRect(0,h-36,48,15);
 c.fillStyle=palette.muted;c.fillText('8 kHz',4,28);c.fillText('0 Hz',4,h-24);c.fillText('40 seconds of window spectra',8,h-5);
}
let lastAnalysis=null,lastDraw=0,lastSpectrogramTime=-1;
const visibleCanvases=new Set();
const visibilityObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visibleCanvases.add(entry.target.id);else visibleCanvases.delete(entry.target.id);}lastAnalysis=null;lastSpectrogramTime=-1;},{rootMargin:'80px'});
for(const canvas of document.querySelectorAll('canvas'))visibilityObserver.observe(canvas);
function draw(now){drawId=0;if(document.hidden)return;
 if(now-lastDraw>= (reduced.matches?100:33)){
  lastDraw=now;let audibleTime=endTime;
  if(lastBlock&&context)audibleTime=Math.min(endTime,endTime+(context.currentTime-(lastBlock.audioTime||context.currentTime))-(context.outputLatency||context.baseLatency||0));
  drawBearing(audibleTime);drawSignal('raw',Math.max(endTime-filled/rate,audibleTime-.08),.08);
  const duration=span();let center=audibleTime-duration*.5;
  if(following&&duration<.05){const last=impacts.findLast(x=>x.time<=audibleTime&&x.amplitude>0);if(last)center=last.time+duration*.3;}
  const oldest=endTime-filled/rate;panOffset=Math.min(0,Math.max(-4,panOffset));
  let start=center-duration*.5+panOffset;start=Math.max(oldest,Math.min(endTime-duration,start));
  drawSignal('zoom',start,duration,true);
  $('zoom-title').textContent='Acceleration / '+fmt(duration*1000,duration<.01?2:0)+' ms';
  $('zoom-stage').textContent=duration>1?'MONITOR WINDOW':duration>.04?'IMPACT TRAIN':duration>.003?'ONE HOUSING RESONANCE':'INDIVIDUAL SAMPLES';
  $('zoom-text').textContent=`${Math.round(duration*rate)} samples shown · ${fmt(start,4)}–${fmt(start+duration,4)} s. Wheel / pinch: zoom. Drag / arrow keys: pan. + / −: zoom.`;
  $('follow').setAttribute('aria-pressed',String(following));$('follow').textContent=following?'Follow newest impact':'Resume following';
  if(analysis!==lastAnalysis){
   lastAnalysis=analysis;const a=analysis?.analysis;
   drawSpectrum('spectrum',a?.spectrum,8000);drawSpectrum('envelope',a?.envelopeSpectrum,Math.min(a?.envelopeRate/2||1024,Math.max(600,frequencies(lastBlock?.settings||settings).bpfi*3.2)),true);drawDemod();
   if(a){const name={BPFO:'Outer race','BPFI':'Inner race','2·BSF':'Rolling ball',none:'No clear fault line'}[a.verdict.name]||a.verdict.name;
    $('verdict').textContent=name+(a.verdict.name==='none'?'':' · '+a.verdict.name);
    $('verdict-detail').textContent=`${a.verdict.name==='none'?'No line exceeds the local noise floor.':`Strongest matching line: ${fmt(a.verdict.frequency,2)} Hz.`} Teaching layer on simulated samples; not computed by Silent-Ear today.`;
    $('spectrum-text').textContent=`Own FFT: ${fmt(a.spectrum.frequencies[1],3)} Hz bin spacing. Resonance ${settings.resonance} Hz. 0–500 Hz: buried fault rhythms; see the envelope spectrum. Band-pass band: ${resonanceBand().map(x=>fmt(x,0)).join("–")} Hz (combined half-power band).`;
    $('envelope-text').textContent=`${a.verdict.name} ${fmt(a.verdict.frequency,2)} Hz; sidebands ${a.verdict.sidebands.map(x=>fmt(x.frequency,2)+' Hz / '+fmt(x.strength,5)).join(', ')||'none'}. Gray marks: ±shaft at BPFI; ±cage at 2·BSF.`;
    $('demod-text').textContent=`Two resonance band-pass stages, Q = 2.5. Absolute value → two 650 Hz low-pass stages → ${fmt(a.envelopeRate,1)} envelope samples/s. Acceleration uses arbitrary demo units, not calibrated sensor units.`;
   }
  }
  const spectrogramTime=history.at(-1)?.time??0;if(spectrogramTime!==lastSpectrogramTime){drawSpectrogram();lastSpectrogramTime=spectrogramTime;}if(history.length)$('spectrogram-text').textContent=`${history.length} short-time spectra; newest at ${fmt(history[history.length-1].time,2)} generated seconds. Colors show −100 to −20 dB re 1 demo units.`;
 }
 drawId=requestAnimationFrame(draw);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(drawId);drawId=0;}else if(!drawId)drawId=requestAnimationFrame(draw);});
new ResizeObserver(()=>{lastAnalysis=null;lastSpectrogramTime=-1;palette=colors();}).observe(document.body);
drawId=requestAnimationFrame(draw);
