import { Generator, Reference, analyze, stats, spectrum, bandpass, selfTest } from './engine.js';
import { scenarioAt, DURATION } from './scenario.js';
let rate = 48000, settings = {}, reference = new Reference(20,3), sequence=0;
let ring, ringPos=0, filled=0, window, windowPos=0, samplesSeen=0, latest=null, impacts=[], events={}, anomalyCount=0, scenarioTime=0;
let busySeek=false;
let sourceGenerator,sourceScenario=false,sourceHealthy=false,sourceTime=0;
function reset(data) {
  rate=data.rate||rate; settings=data.settings||settings; sequence=data.sequence ?? sequence;
  reference=new Reference(data.records||20,data.k||3);
  ring=new Float32Array(Math.ceil(rate*4)); ringPos=0; filled=0;
  window=new Float32Array(Math.round(rate*.25));windowPos=0;samplesSeen=0;latest=null;impacts=[];events={};anomalyCount=0;
}
reset({});
function contiguous() {
  const result=new Float32Array(filled);
  const start=(ringPos-filled+ring.length)%ring.length;
  const first=Math.min(filled,ring.length-start);
  result.set(ring.subarray(start,start+first));
  if(first<filled)result.set(ring.subarray(0,filled-first),first);
  return result;
}
function ingest(data, publish=true) {
  settings=data.settings;scenarioTime=data.scenarioTime||0;
  const source=data.samples;
  for(let i=0;i<source.length;i++) {
    ring[ringPos]=source[i];ringPos=(ringPos+1)%ring.length;filled=Math.min(ring.length,filled+1);
    window[windowPos++]=source[i];samplesSeen++;
    if(windowPos===window.length) {
      const values=stats(window); const result=reference.add(values.rms);
      const time=data.scenario ? Math.max(0,scenarioTime-(source.length-i-1)/rate) : samplesSeen/rate;
      if(result.event)anomalyCount++;
      if(data.scenario) {
        if(values.kurtosis>4.5&&events.kurtosis===undefined)events.kurtosis=time;
        if(result.event&&events.rms===undefined)events.rms=time;
        if(result.ready&&result.status==='CRITICAL'&&events.critical===undefined)events.critical=time;
      }
      latest={values,result,time,settings:{...settings},scenario:!!data.scenario,events:{...events},anomalyCount};
      if(publish)self.postMessage({type:'record',...latest,sequence});
      if(publish) {
        const full=spectrum(window,rate),bins=512;
        const stft={frequencies:new Float64Array(bins),magnitudes:new Float64Array(bins)};
        for(let b=0;b<bins;b++){
          stft.frequencies[b]=b*8000/bins;
          const lo=Math.floor(stft.frequencies[b]/full.frequencies[1]);
          const hi=Math.min(full.magnitudes.length,Math.ceil((b+1)*8000/bins/full.frequencies[1]));
          for(let i=lo;i<hi;i++)stft.magnitudes[b]=Math.max(stft.magnitudes[b],full.magnitudes[i]);
        }
        self.postMessage({type:'stft',spectrum:stft,time,sequence},[stft.frequencies.buffer,stft.magnitudes.buffer]);
      }
      windowPos=0;
    }
  }
  impacts.push(...(data.impacts||[]));
  const end=data.endTime;
  impacts=impacts.filter(x=>x.time>=end-4);
  if(publish && samplesSeen % Math.round(rate) < source.length && filled>=rate) publishAnalysis(end);
}
function publishAnalysis(end) {
  const samples=contiguous();
  const analysis=analyze(samples,rate,settings);
  analysis.bandpassed=bandpass(samples,rate,settings).slice(-Math.round(rate*.06));
  self.postMessage({type:'analysis',analysis,samples,impacts,endTime:end,rate,sequence},[samples.buffer,analysis.bandpassed.buffer,analysis.envelope.buffer,analysis.spectrum.frequencies.buffer,analysis.spectrum.magnitudes.buffer,analysis.envelopeSpectrum.frequencies.buffer,analysis.envelopeSpectrum.magnitudes.buffer]);
}
self.onmessage=async({data})=>{
  if(data.type==='sourceReset'){
    sourceGenerator=new Generator(data.rate||rate,215811,data.settings);
    if(data.snapshot)Object.assign(sourceGenerator,data.snapshot);
    sourceScenario=!!data.scenario;sourceTime=data.time||0;sourceHealthy=false;return;
  }
  if(data.type==='sourceManual'){sourceScenario=false;return;}
  if(data.type==='sourceSettings'){sourceGenerator?.set(data.settings);return;}
  if(data.type==='sourceAB'){sourceHealthy=data.value;return;}
  if(data.type==='generate'){
    if(data.sequence!==sequence||!sourceGenerator||busySeek)return;
    const count=sourceScenario?Math.min(data.count,Math.round((DURATION-sourceTime)*rate)):data.count;
    if(count<=0)return;
    const samples=new Float32Array(count),hits=[],startTime=sourceGenerator.time;
    const chosen=sourceGenerator.settings.fault;
    for(let offset=0;offset<count;offset+=128){
      const size=Math.min(128,count-offset);
      if(sourceScenario)sourceGenerator.set(scenarioAt(sourceTime));
      if(sourceHealthy)sourceGenerator.set({fault:'none'});
      const block=sourceGenerator.generate(size);samples.set(block.samples,offset);hits.push(...block.impacts);
      if(sourceScenario)sourceTime=Math.min(DURATION,sourceGenerator.time);
    }
    const sourceSettings={...sourceGenerator.settings};
    if(sourceHealthy)sourceGenerator.set({fault:chosen});
    self.postMessage({type:'source',samples,impacts:hits,startTime,endTime:sourceGenerator.time,
      shaftPhase:sourceGenerator.shaftPhase,cagePhase:sourceGenerator.cagePhase,spinPhase:sourceGenerator.spinPhase,
      operating:{rpm:sourceGenerator.rpm,load:sourceGenerator.operatingLoad},settings:sourceSettings,scenario:sourceScenario,scenarioTime:sourceTime,sequence,final:sourceScenario&&sourceTime>=DURATION-1e-8},[samples.buffer]);return;
  }
  if(data.type==='init'||data.type==='reset') {reset(data);return;}
  if(data.type==='samples'&&data.sequence===sequence&&!busySeek) {ingest(data);return;}
  if(data.type==='k') {reference.setK(data.value);if(latest)self.postMessage({type:'record',...latest,result:reference.evaluate(latest.values.rms),events:{...events},sequence});return;}
  if(data.type==='selftest') {
    try {const result=await selfTest();self.postMessage({type:'selftest',id:data.id,...result});}
    catch(error){self.postMessage({type:'selftest',id:data.id,pass:false,checks:[],failures:[String(error)]});}
    return;
  }
  if(data.type==='seek') {
    busySeek=true;reset(data);
    const generator=new Generator(rate,215811,{...settings,...scenarioAt(0)});
    const target=Math.round(Math.min(DURATION,data.time)*rate);
    let done=0;
    while(done<target) {
      const count=Math.min(128,target-done);
      const time=done/rate;
      generator.set(scenarioAt(time));
      const block=generator.generate(count); done+=count;
      ingest({...block,settings:{...generator.settings},scenario:true,scenarioTime:done/rate},false);
      // Yield between bounded batches. This work never runs on the main or audio thread.
      if(done % (128*2048)===0)await new Promise(resolve=>setTimeout(resolve,0));
    }
    if(data.time>=DURATION)events.failure=DURATION;
    if(latest)self.postMessage({type:'record',...latest,events:{...events},sequence});
    publishAnalysis(generator.time);
    self.postMessage({type:'seeked',snapshot:generator,time:target/rate,sequence,events:{...events}});
    busySeek=false;
  }
};
