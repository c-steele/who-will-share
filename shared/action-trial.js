/* Exact-template action interlude: still frame + introduction, then the original movie. */
(function (root, factory) {
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.FTCActionTrial = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';
  var VERSION = 'ftc-actions-interlude-2026-09-23';
  var INTRO = "Oh look! Here are some people. Let's see what happens with them.";
  var STYLE = '.ftc-action-caption{box-sizing:border-box;width:100%;max-width:none;padding:8px 12px;color:white;font-weight:800;line-height:1.15;text-align:center;border-radius:5px 5px 0 0;overflow:hidden}.ftc-action-caption span{display:block;white-space:nowrap;width:100%;max-width:none;line-height:1.15}.ftc-action-video{display:block;width:100%;height:auto;max-height:none;object-fit:contain;background:white;margin:0 auto}.ftc-action-error{font-size:16px;text-align:center}.ftc-action-interlude [hidden]{display:none!important}';
  function escape(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function html(options) {
    options = options || {};
    var number = options.storyNumber || options.data && options.data.story_number;
    var total = options.storyTotal || options.data && options.data.story_total;
    var counter = number && total ? '<div class="ksize-story-counter">Story ' + escape(number) + ' of ' + escape(total) + '</div>' : '';
    return '<main class="ksize-shell ksize-kid-shell"><section class="ksize-screen ksize-kid-screen ftc-action-interlude" data-slide-kind="action_movie" data-ftc-action-stage="loading">' +
      '<div class="ksize-top-hud"><div class="ksize-top-hud-left">' + counter + '</div><div class="ksize-top-hud-center"></div><div class="ksize-top-hud-right"></div></div>' +
      '<div class="ksize-scene-wrap ftc-action-scene">' +
      '<div class="ftc-action-caption" data-ftc-action-caption' + (options.skipIntroNarration ? ' hidden' : '') + '><span>' + escape(options.caption || INTRO) + '</span></div>' +
      '<video class="ftc-action-video" data-ftc-action-video playsinline preload="auto" disablepictureinpicture aria-label="' + escape(options.stillLabel || 'Three people standing still side by side') + '"></video></div>' +
      '<audio data-ftc-action-intro preload="auto"></audio>' +
      '<div class="ksize-bottom-area"><div class="ksize-helper" aria-hidden="true"><div class="ksize-helper-face"><span class="ksize-eye ksize-eye-left"></span><span class="ksize-eye ksize-eye-right"></span><span class="ksize-mouth"></span></div><div class="ksize-helper-bubble">Listen and look!</div></div>' +
      '<div class="ksize-controls"><button class="ksize-audio-btn ksize-icon-btn" type="button" data-ftc-action-replay aria-label="Replay"><span class="ksize-icon-symbol" aria-hidden="true">▶</span><span class="ksize-icon-label">Replay</span></button></div>' +
      '<div class="ftc-action-error" data-ftc-action-status role="status" aria-live="polite"></div></div></section></main>';
  }
  function installStyle(doc) {
    if (doc.getElementById('ftc-action-interlude-style')) return;
    var style = doc.createElement('style'); style.id = 'ftc-action-interlude-style'; style.textContent = STYLE; doc.head.appendChild(style);
  }
  function mount(host, options) {
    options = options || {};
    if (!host || !host.querySelector) throw new Error('Provide the action interlude host element.');
    if (!options.videoSrc) throw new Error('An original action movie URL is required.');
    if (!options.skipIntroNarration && !options.introAudioSrc) throw new Error('The recorded introduction audio is required.');
    var doc = host.ownerDocument || root.document;
    installStyle(doc);
    if (!host.querySelector('[data-ftc-action-video]')) host.innerHTML = html(options);
    var section = host.querySelector('.ftc-action-interlude'), video = host.querySelector('[data-ftc-action-video]');
    var intro = host.querySelector('[data-ftc-action-intro]'), caption = host.querySelector('[data-ftc-action-caption]');
    var replay = host.querySelector('[data-ftc-action-replay]'), status = host.querySelector('[data-ftc-action-status]');
    var silent = options.silent === true || options.silentTest === true;
    var cue = options.jingle || {};
    var sharedCues = root.JingleCues && root.JingleCues.variants && root.JingleCues.variants[options.variantId];
    var cues = cue.cues || cue.cues_s || sharedCues && sharedCues.cues_s;
    var dataURI = cue.audioDataURI || root.JingleAudio && root.JingleAudio.dataURI;
    var factory = options.jingleFactory || root.RoleFreeJinglePlayer;
    if (!factory || !Array.isArray(cues) || !cues.length || !dataURI) throw new Error('Verified jingle audio and movie-relative cue times are required.');
    var listeners = [], activeWaits = new Set(), frameTimer = null, advanceTimer = null, resizeObserver = null;
    var sound = null, disposed = false, generation = 0, stage = 'loading', completed = false, introCompleted = false;
    var errors = [], playCount = 0, finalStats = null;
    video.muted = silent; video.defaultMuted = silent; video.controls = false;
    intro.muted = silent; intro.defaultMuted = silent;
    // Zero the output before any media source or AudioContext is created.
    if (silent) { video.volume = 0; intro.volume = 0; }
    video.src = options.videoSrc;
    if (!options.skipIntroNarration) intro.src = options.introAudioSrc;
    if (options.mirrorVideo) video.style.transform = 'scaleX(-1)';
    caption.style.backgroundColor = options.color || '#197d88';
    if (options.renderControls === false) replay.hidden = true;
    function fitCaption() {
      var span = caption.firstElementChild; if (!span || !span.clientWidth) return;
      var maximum = options.captionFontPx || 32;
      span.style.fontSize = maximum + 'px';
      if (span.scrollWidth > span.clientWidth) span.style.fontSize = Math.max(1, Math.floor(maximum * span.clientWidth / span.scrollWidth)) + 'px';
    }
    function listen(target, name, fn) { target.addEventListener(name, fn); listeners.push(function () { target.removeEventListener(name, fn); }); }
    function setStage(next, message) {
      stage = next; section.setAttribute('data-ftc-action-stage', next); section.setAttribute('data-ftc-action-silent', String(silent));
      status.textContent = message || ''; if (options.onStage) options.onStage(next);
    }
    function clearTimers() { if (frameTimer != null) root.clearTimeout(frameTimer); if (advanceTimer != null) root.clearTimeout(advanceTimer); frameTimer = null; advanceTimer = null; }
    function movieDeadline() {
      if (frameTimer != null) root.clearTimeout(frameTimer);
      frameTimer = root.setTimeout(function () { frameTimer = null; reportError('The movie stopped loading.'); }, options.loadTimeoutMs || 20000);
    }
    function cancelWaits() { activeWaits.forEach(function (cancel) { cancel(); }); activeWaits.clear(); }
    function reportError(message, error) {
      if (disposed) return;
      ++generation; clearTimers(); cancelWaits(); video.pause(); intro.pause(); completed = false;
      errors.push({ stage: stage, message: message, code: error && error.code || null });
      setStage('error', message + ' Press Replay to try again.'); replay.hidden = false; replay.disabled = false;
      if (options.onError) options.onError(error || new Error(message));
    }
    function requestPlaybackGesture() {
      if (disposed) return;
      ++generation; clearTimers(); cancelWaits(); video.pause(); intro.pause(); completed = false;
      // Opening directly at a preview screen can require an initial click. This
      // is a browser playback gate, not a failed participant media recording.
      setStage('awaiting-playback', 'Press Replay to start the story.'); replay.hidden = false; replay.disabled = false;
    }
    function waitFor(target, event, ready, timeoutMs, label) {
      return new Promise(function (resolve, reject) {
        if (ready && ready()) { resolve(); return; }
        var timer, events = Array.isArray(event) ? event : [event];
        function cleanup() { events.forEach(function (name) { target.removeEventListener(name, ok); }); target.removeEventListener('error', bad); if (timer != null) root.clearTimeout(timer); activeWaits.delete(cancel); }
        function ok() { if (ready && !ready()) return; cleanup(); resolve(); }
        function bad() { cleanup(); reject(new Error(label + ' could not load or play.')); }
        function cancel() { cleanup(); resolve(); }
        activeWaits.add(cancel); events.forEach(function (name) { target.addEventListener(name, ok); }); target.addEventListener('error', bad);
        if (timeoutMs) timer = root.setTimeout(function () { cleanup(); reject(new Error(label + ' timed out.')); }, timeoutMs);
      });
    }
    sound = factory.create({
      video: video, audioDataURI: dataURI, cues: cues,
      gain: silent ? 0 : (cue.gain == null ? (root.JingleCues && root.JingleCues.gain || 1) : cue.gain),
      onError: function (error) { reportError('The movie sound could not play.', error); },
      onStatus: function (state) { section.setAttribute('data-jingle-state', JSON.stringify(state)); }
    });
    function stats() {
      return { action_component_version: VERSION, action_variant_id: options.variantId || null, source_video_completed: completed,
        source_video_duration_s: Number.isFinite(video.duration) ? video.duration : null, source_video_plays: playCount,
        movie_introduction_display: options.skipIntroNarration ? 'selected_pair_action_without_static_introduction' : 'unchanged_first_frame_before_action', movie_caption_during_action: options.captionDuringMovie === true,
        movie_introduction_audio_completed: options.skipIntroNarration ? null : introCompleted, movie_introduction_narration_skipped: options.skipIntroNarration === true, silent_test: silent, errors: errors.slice(),
        jingle_playback: finalStats || sound.stats(), jingle_cues_s: cues.slice() };
    }
    async function begin() {
      if (disposed) return;
      var run = ++generation; clearTimers(); cancelWaits(); video.pause(); intro.pause(); sound.resetPlayback();
      completed = false; introCompleted = false; finalStats = null; caption.style.visibility = 'visible'; caption.setAttribute('aria-hidden', 'false');
      video.setAttribute('aria-label', options.stillLabel || 'Three people standing still side by side');
      // A direct preview jump has not necessarily unlocked browser audio. Do
      // not leave AudioContext.resume pending until a misleading load timeout.
      // A participant who has clicked through the study continues automatically.
      var activation = root.navigator && root.navigator.userActivation;
      if (options.skipIntroNarration && activation && !activation.hasBeenActive) {
        requestPlaybackGesture(); return;
      }
      var pairPrepared = null;
      if (options.skipIntroNarration) {
        // Invoke resume during the Replay click, before a loaded-video await
        // can consume that browser's transient user gesture.
        movieDeadline(); pairPrepared = sound.prepare(); pairPrepared.catch(function () {});
        if (disposed || run !== generation) return;
      }
      // Seeking an already-loaded element can change readyState without another
      // loadeddata event. Do not seek needlessly; otherwise also await seeked or canplay.
      if (video.currentTime > 0) video.currentTime = 0;
      if (intro.currentTime > 0) intro.currentTime = 0;
      setStage('loading'); replay.disabled = true; fitCaption();
      try {
        await waitFor(video, ['loadeddata', 'canplay', 'seeked'], function () { return video.readyState >= 2 && !video.seeking; }, options.loadTimeoutMs || 20000, 'The starting picture');
        if (disposed || run !== generation) return;
        if (!options.skipIntroNarration) {
          setStage('still-introduction'); replay.disabled = false;
          var narrated = waitFor(intro, 'ended', null, options.introTimeoutMs || 60000, 'The introduction');
          // Attach rejection handling before play() can fail, then keep the still
          // frame completely frozen until the recording actually reaches its end.
          narrated.catch(function () {});
          await intro.play(); await narrated;
          if (disposed || run !== generation) return;
          introCompleted = true; replay.disabled = true;
        }
        movieDeadline(); await (pairPrepared || sound.prepare());
        if (disposed || run !== generation) return;
        caption.style.visibility = options.captionDuringMovie ? 'visible' : 'hidden'; caption.setAttribute('aria-hidden', options.captionDuringMovie ? 'false' : 'true');
        setStage('action-movie'); video.setAttribute('aria-label', options.movieLabel || 'Movie showing hugging and dancing actions');
        await video.play();
        if (disposed || run !== generation) return;
        playCount++; replay.disabled = false; movieDeadline();
      } catch (error) {
        if (disposed || run !== generation) return;
        if (error && error.name === 'NotAllowedError') requestPlaybackGesture();
        else reportError(stage === 'still-introduction' ? 'The introduction could not play.' : 'The movie could not start.', error);
      }
    }
    listen(video, 'ended', function () {
      if (disposed || stage !== 'action-movie') return;
      clearTimers();
      finalStats = sound.stats();
      section.setAttribute('data-jingle-summary', JSON.stringify(finalStats));
      if (!finalStats.audioAvailable || !finalStats.allCuesCompleted) { reportError('The coordinated sounds did not finish.'); return; }
      completed = true; setStage('complete'); replay.disabled = false;
      section.setAttribute('data-jingle-summary', JSON.stringify(finalStats));
      advanceTimer = root.setTimeout(function () {
        advanceTimer = null; if (!disposed && completed && options.onComplete) options.onComplete(stats());
      }, options.advanceDelayMs == null ? 1200 : options.advanceDelayMs);
    });
    listen(video, 'timeupdate', function () { if (stage === 'action-movie' && !video.paused) movieDeadline(); });
    listen(video, 'error', function () { if (!disposed) reportError('The movie could not load.'); });
    if (!options.skipIntroNarration) listen(intro, 'error', function () { if (!disposed) reportError('The introduction could not load.'); });
    listen(replay, 'click', begin); listen(root, 'resize', fitCaption);
    if (root.ResizeObserver) { resizeObserver = new root.ResizeObserver(fitCaption); resizeObserver.observe(caption); }
    function dispose() {
      if (disposed) return Promise.resolve();
      finalStats = finalStats || sound.stats(); disposed = true; ++generation; clearTimers(); cancelWaits();
      listeners.forEach(function (remove) { remove(); }); if (resizeObserver) resizeObserver.disconnect();
      video.pause(); intro.pause(); video.removeAttribute('src'); intro.removeAttribute('src'); video.load(); intro.load();
      return sound.dispose();
    }
    if (options.autoStart !== false) begin();
    return { replay: begin, dispose: dispose, stats: stats, fitCaption: fitCaption, video: video, intro: intro };
  }
  function makeNode(options) {
    options = options || {};
    var jsPsych = options.jsPsych, plugin = options.plugin || root.jsPsychHtmlButtonResponse;
    if (!jsPsych || !plugin) throw new Error('jsPsych and the html-button-response plugin are required.');
    var controller = null;
    return { type: plugin, stimulus: html(options), choices: [], response_ends_trial: false,
      data: Object.assign({}, options.data || {}, { study_trial_kind: options.studyTrialKind || 'action_movie', action_variant_id: options.variantId || null }),
      on_load: function () {
        controller = mount(jsPsych.getDisplayElement(), Object.assign({}, options, { onComplete: function (data) {
          if (options.onComplete) options.onComplete(data); jsPsych.finishTrial(data);
        } }));
        if (options.onMount) options.onMount(controller);
      },
      on_finish: function (data) { if (controller) { Object.assign(data, controller.stats()); controller.dispose(); } if (options.onFinish) options.onFinish(data); }
    };
  }
  return { version: VERSION, introCaption: INTRO, html: html, mount: mount, makeNode: makeNode };
});
