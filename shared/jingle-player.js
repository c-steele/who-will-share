/* Schedules an inline jingle against the movie clock. No external audio requests. */
(function(root,factory){
  var api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;else root.RoleFreeJinglePlayer=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
  'use strict';
  function create(options){
    options=options||{};
    var video=options.video,cues=(options.cues||[]).slice().sort(function(a,b){return a-b;});
    if(!video||typeof video.addEventListener!=='function')throw new Error('Jingle player requires a video element.');
    if(!cues.length||cues.some(function(t,i){return !Number.isFinite(t)||t<0||(i>0&&t===cues[i-1]);}))throw new Error('Jingle cues must be distinct, finite, nonnegative movie times.');
    var volume=options.gain==null?1:options.gain;
    if(!Number.isFinite(volume)||volume<0||volume>4)throw new Error('Jingle gain must be between 0 and 4.');
    var ctx=null,buffer=null,gainNode=null,preparing=null,prepared=false,disposed=false,error=null;
    var waiting=false,seeking=false,awaitingPlayback=false,clockHeld=false,anchor=null,frame=null;
    var nodes=new Map(),listeners=[],records=[],pass=1,scheduleCount=0,maxDrift=0,lastVideo=null,lastAdvance=0;
    var DRIFT=.080;
    function status(kind){if(options.onStatus)options.onStatus({status:kind,audio_available:!!(prepared&&ctx&&ctx.state==='running'&&!error&&!disposed),audio_state:ctx?ctx.state:'not-created',playback_rate:video.playbackRate||1});}
    function captureLaunch(node){
      if(!node.record.started&&ctx&&ctx.currentTime>=node.when){node.record.started=true;node.record.observed_audio_time=ctx.currentTime;}
      if(node.record.started&&buffer){node.record.played_from=node.offset;node.record.played_to=Math.min(buffer.duration,node.offset+Math.max(0,ctx.currentTime-node.when)*node.rate);if(node.record.played_to>=buffer.duration-.002)node.record.completed=true;}
    }
    function cancelNode(node,reason){
      captureLaunch(node);node.cancelled=true;node.record.cancelled=reason;
      try{node.source.stop();}catch(_){}try{node.source.disconnect();}catch(_){}
      if(nodes.get(node.index)===node)nodes.delete(node.index);
    }
    function cancelAll(reason){nodes.forEach(function(n){cancelNode(n,reason);});anchor=null;}
    function stopMonitor(){if(frame!=null){root.cancelAnimationFrame(frame);frame=null;}}
    function fail(code,message,cause){
      var e=new Error(message);e.code=code;if(cause)e.cause=cause;
      error=e;prepared=false;cancelAll(code);stopMonitor();status('error');if(options.onError)options.onError(e);return e;
    }
    function rate(){var r=video.playbackRate==null?1:video.playbackRate;return Number.isFinite(r)&&r>0?r:null;}
    function runnable(){return !disposed&&prepared&&!error&&ctx&&ctx.state==='running'&&!video.paused&&!video.ended&&!video.seeking&&!seeking&&!waiting&&!awaitingPlayback;}
    function schedule(){
      if(!runnable())return;
      var r=rate();if(!r){fail('INVALID_PLAYBACK_RATE','Movie playback speed must be positive.');return;}
      var now=Number(video.currentTime),audioNow=ctx.currentTime;if(!Number.isFinite(now))return;
      // Preserve a current segment when its audio offset already follows the movie.
      nodes.forEach(function(n){
        captureLaunch(n);
        var desired=now-cues[n.index],actual=n.offset+(audioNow-n.when)*n.rate;
        // The audio clock decides whether a sound still has a tail to play.
        // A video clock slightly ahead must not cut off an aligned sound.
        var current=n.record.started&&actual>=0&&actual<buffer.duration;
        if(!(current&&Math.abs(desired-actual)<=DRIFT&&n.rate===r))cancelNode(n,'rescheduled');
      });
      cues.forEach(function(cue,index){
        if(error||disposed||nodes.has(index)||now>=cue+buffer.duration)return;
        var offset=Math.max(0,now-cue),when=audioNow+Math.max(0,cue-now)/r;
        var source=ctx.createBufferSource();source.buffer=buffer;source.playbackRate.value=r;source.connect(gainNode);
        var record={pass:pass,cue_index:index,cue_time:cue,audio_start_time:when,buffer_offset:offset,playback_rate:r,started:false,completed:false,cancelled:null};
        var n={index:index,source:source,when:when,offset:offset,rate:r,record:record,cancelled:false};
        records.push(record);nodes.set(index,n);scheduleCount++;
        source.onended=function(){
          if(n.cancelled||disposed)return;captureLaunch(n);
          // A natural end confirms the whole scheduled remainder played, even
          // when currentTime is rounded to the preceding audio render quantum.
          n.record.started=true;n.record.played_from=n.offset;n.record.played_to=buffer.duration;n.record.completed=true;
          if(nodes.get(index)===n)nodes.delete(index);try{source.disconnect();}catch(_){}
        };
        try{source.start(when,offset);}catch(e){fail('AUDIO_SCHEDULE_FAILED','The jingle could not start. Retry the movie before continuing.',e);}
      });
      anchor={videoTime:now,audioTime:audioNow,rate:r};
    }
    function tick(){
      frame=null;if(!runnable())return;
      var now=Number(video.currentTime),audioNow=ctx.currentTime;
      nodes.forEach(captureLaunch);
      var drift=anchor?Math.abs(now-(anchor.videoTime+(audioNow-anchor.audioTime)*anchor.rate)):0;maxDrift=Math.max(maxDrift,drift);
      if(lastVideo==null||Math.abs(now-lastVideo)>.001){lastVideo=now;lastAdvance=audioNow;if(clockHeld){clockHeld=false;schedule();}}
      else if(audioNow-lastAdvance>DRIFT&&!clockHeld){clockHeld=true;cancelAll('movie-clock-stalled');status('buffering');}
      if(!clockHeld&&anchor){
        if(drift>DRIFT)schedule();
      }
      if(runnable())frame=root.requestAnimationFrame(tick);
    }
    function monitor(){if(frame==null&&runnable())frame=root.requestAnimationFrame(tick);}
    function sync(){
      if(disposed)return;
      if(!runnable()){cancelAll('not-playing');stopMonitor();return;}
      if(typeof root.requestAnimationFrame!=='function'||typeof root.cancelAnimationFrame!=='function'){fail('AUDIO_CLOCK_UNAVAILABLE','This browser cannot synchronize the movie sound.');return;}
      clockHeld=false;lastVideo=Number(video.currentTime);lastAdvance=ctx.currentTime;schedule();monitor();
    }
    function bytes(){
      var uri=options.audioDataURI||'',comma=uri.indexOf(',');
      if(comma<0||!/^data:audio\//i.test(uri)||! /;base64$/i.test(uri.slice(0,comma)))throw new Error('Use inline base64 audio data.');
      var raw=root.atob(uri.slice(comma+1)),out=new Uint8Array(raw.length);for(var i=0;i<raw.length;i++)out[i]=raw.charCodeAt(i);return out.buffer;
    }
    function onContextState(){
      if(disposed)return;
      if(prepared&&ctx.state!=='running'&&!video.paused&&!video.ended)fail('AUDIO_CONTEXT_INTERRUPTED','Movie sound was interrupted. Retry the movie before continuing.');
      else status(ctx.state);
    }
    function prepare(){
      if(disposed)return Promise.reject(new Error('Jingle player has been disposed.'));
      if(preparing)return preparing;
      error=null;
      try{
        var Constructor=options.AudioContext||root.AudioContext||root.webkitAudioContext;
        if(!Constructor)throw new Error('Web Audio is not available.');
        if(!ctx||ctx.state==='closed'){
          ctx=new Constructor();ctx.addEventListener('statechange',onContextState);
          gainNode=ctx.createGain();gainNode.gain.value=volume;gainNode.connect(ctx.destination);
        }
        // Called synchronously within the Play click, before the first await.
        var data=buffer?null:bytes(),resume=ctx.resume(),decode;
        try{decode=buffer?Promise.resolve(buffer):ctx.decodeAudioData(data);}catch(e){decode=Promise.reject(e);}
        preparing=Promise.all([resume,decode]).then(function(results){
          if(disposed)throw new Error('Jingle player disposed during preparation.');
          buffer=results[1];
          if(!buffer||!Number.isFinite(buffer.duration)||buffer.duration<=0)throw new Error('The jingle recording is empty.');
          if(ctx.state!=='running')throw new Error('The audio device is not running.');
          prepared=true;error=null;status('ready');if(runnable())sync();
        }).catch(function(e){
          if(disposed)throw e;
          throw fail('AUDIO_PREPARE_FAILED','Movie sound could not load or start. Retry the movie before continuing.',e);
        }).finally(function(){preparing=null;});
        return preparing;
      }catch(e){return Promise.reject(fail('AUDIO_PREPARE_FAILED','Movie sound is unavailable. Retry the movie before continuing.',e));}
    }
    function resetPlayback(){
      if(disposed)return;cancelAll('replay');stopMonitor();pass++;lastVideo=null;clockHeld=false;waiting=false;seeking=false;awaitingPlayback=true;status('replay-ready');
    }
    function listen(name,fn){video.addEventListener(name,fn);listeners.push(function(){video.removeEventListener(name,fn);});}
    listen('playing',function(){
      waiting=false;seeking=false;awaitingPlayback=false;
      if(!prepared||!ctx||ctx.state!=='running'){if(!disposed)fail('AUDIO_NOT_READY','Start movie sound with Play before continuing.');return;}sync();
    });
    listen('pause',function(){cancelAll('paused');stopMonitor();status('paused');});
    listen('waiting',function(){waiting=true;cancelAll('buffering');stopMonitor();status('buffering');});
    listen('seeking',function(){seeking=true;cancelAll('seeking');stopMonitor();});
    listen('seeked',function(){seeking=false;awaitingPlayback=false;if(!waiting)sync();});
    listen('ratechange',sync);
    listen('ended',function(){nodes.forEach(captureLaunch);cancelAll('movie-ended');stopMonitor();status('ended');});
    function stats(){
      nodes.forEach(captureLaunch);
      var available=!!(prepared&&ctx&&ctx.state==='running'&&!error&&!disposed);
      var launched=Array.from(new Set(records.filter(function(r){return r.pass===pass&&r.started;}).map(function(r){return r.cue_index;})));
      var completed=cues.map(function(_,index){
        var intervals=records.filter(function(r){return r.pass===pass&&r.cue_index===index&&r.started;}).map(function(r){return[r.played_from,r.played_to];}).filter(function(p){return Number.isFinite(p[0])&&Number.isFinite(p[1]);}).sort(function(a,b){return a[0]-b[0];});
        var covered=0;for(var i=0;i<intervals.length;i++){if(intervals[i][0]>covered+.002)break;covered=Math.max(covered,intervals[i][1]);}return buffer&&covered>=buffer.duration-.002?index:null;
      }).filter(function(index){return index!==null;});
      return{audioAvailable:available,cueCount:cues.length,cuesLaunched:launched.length,cuesCompleted:completed.length,allCuesLaunched:launched.length===cues.length,allCuesCompleted:completed.length===cues.length,maxDriftMs:Math.round(maxDrift*1000),audio_available:!!(prepared&&ctx&&ctx.state==='running'&&!error&&!disposed),audio_state:ctx?ctx.state:'not-created',prepared:prepared,disposed:disposed,error_code:error?error.code:null,error_message:error?error.message:null,clip_duration_s:buffer?buffer.duration:null,playback_rate:rate(),playback_pass:pass,cue_times:cues.slice(),scheduled_segments:scheduleCount,launched_segments:records.filter(function(r){return r.started;}).length,completed_segments:records.filter(function(r){return r.completed;}).length,current_pass_cues_launched:Array.from(new Set(records.filter(function(r){return r.pass===pass&&r.started;}).map(function(r){return r.cue_index;}))),max_drift_ms:Math.round(maxDrift*1000),pending_sources:nodes.size,clock_held:clockHeld,segments:records.map(function(r){return Object.assign({},r);})};
    }
    function dispose(){
      if(disposed)return Promise.resolve();disposed=true;prepared=false;cancelAll('disposed');stopMonitor();listeners.forEach(function(remove){remove();});listeners=[];
      if(ctx){ctx.removeEventListener('statechange',onContextState);try{gainNode.disconnect();}catch(_){}try{return Promise.resolve(ctx.close()).catch(function(){});}catch(_){return Promise.resolve();}}return Promise.resolve();
    }
    return{prepare:prepare,sync:sync,resetPlayback:resetPlayback,dispose:dispose,stats:stats};
  }
  return{version:'1.0.0',create:create};
});
