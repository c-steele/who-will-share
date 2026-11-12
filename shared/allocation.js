/* Clone-only action allocation. Source roles are internal matching keys, never labels. */
(function (root) {
  'use strict';
  const VERSION = 'ftc-actions-core-balanced-v1';
  const CONDITIONS = Object.freeze([
    'MOM-SISTER', 'TEACHER-FRIEND', 'DAD-KID', 'TEACHER-KID', 'MOM-TEACHER', 'SISTER-FRIEND'
  ]);
  const SOURCE_KEYS = Object.freeze(['MKS', 'TKF', 'DMK', 'TTK', 'MKT', 'SKF']);
  const PALETTES = Object.freeze([
    ['#f2b13d', '#ed6e57'], ['#f2b13d', '#ed6e57'],
    ['#7b80f7', '#64d4ce'], ['#7b80f7', '#64d4ce'],
    ['#81d653', '#ffd100'], ['#81d653', '#ffd100']
  ]);
  const VISUAL_VARIANTS = Object.freeze([
    Object.freeze(['a', 'd', 'a', 'd', 'a', 'd']),
    Object.freeze(['b', 'c', 'b', 'c', 'b', 'c']),
    Object.freeze(['c', 'b', 'c', 'b', 'c', 'b']),
    Object.freeze(['d', 'a', 'd', 'a', 'd', 'a'])
  ]);
  const RATING_PLANS = Object.freeze([
    Object.freeze({
      'MOM-SISTER': 'kid-MOM', 'TEACHER-FRIEND': 'kid-FRIEND',
      'DAD-KID': 'mom-DAD', 'TEACHER-KID': 'teacher-KID',
      'MOM-TEACHER': 'kid-TEACHER', 'SISTER-FRIEND': 'kid-SISTER'
    }),
    Object.freeze({
      'MOM-SISTER': 'kid-SISTER', 'TEACHER-FRIEND': 'kid-TEACHER',
      'DAD-KID': 'mom-KID', 'TEACHER-KID': 'teacher-TEACHER',
      'MOM-TEACHER': 'kid-MOM', 'SISTER-FRIEND': 'kid-FRIEND'
    })
  ]);
  const FTC_TO_ADULT = Object.freeze({
    '1a':'1a','1b':'1c','1c':'1b','1d':'1d',
    '2a':'2d','2b':'2b','2c':'2c','2d':'2a',
    '3a':'3a','3b':'3c','3c':'3b','3d':'3d',
    '4a':'4d','4b':'4b','4c':'4c','4d':'4a',
    '5a':'5b','5b':'5d','5c':'5a','5d':'5c',
    '6a':'6d','6b':'6b','6c':'6c','6d':'6a'
  });
  function hash(value) {
    let h = 2166136261;
    for (const character of String(value)) h = Math.imul(h ^ character.charCodeAt(0), 16777619);
    return h >>> 0;
  }
  function rng(seed) {
    let state = hash(seed);
    return function () {
      state += 0x6D2B79F5;
      let t = Math.imul(state ^ state >>> 15, 1 | state);
      t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function planNumber(value, maximum, label) {
    const number = Number(value);
    if (!Number.isInteger(number) || number < 1 || number > maximum) {
      throw new Error(`Actions ${label} must be an integer from 1 to ${maximum}.`);
    }
    return number;
  }
  function visualPlanMap(number) {
    const variants = VISUAL_VARIANTS[planNumber(number, 4, 'visual plan') - 1];
    return Object.fromEntries(CONDITIONS.map((condition, index) => [condition, variants[index]]));
  }
  function ratingPlanMap(number) {
    return { ...RATING_PLANS[planNumber(number, 2, 'rating plan') - 1] };
  }
  function planEventSession(manifest, seed, visualPlanNumber) {
    const number = visualPlanNumber === undefined || visualPlanNumber === null || Number(visualPlanNumber) === 0
      ? hash(`${seed}:actions-visual-plan`) % 4 + 1
      : planNumber(visualPlanNumber, 4, 'visual plan');
    const variants = VISUAL_VARIANTS[number - 1];
    if (!Array.isArray(manifest?.trials)) throw new Error('Actions event manifest has no trials.');
    const selected = CONDITIONS.map((condition, familyIndex) => {
      const id = `${familyIndex + 1}${variants[familyIndex]}`;
      const matches = manifest.trials.filter(trial => trial.id === id);
      if (matches.length !== 1) throw new Error(`Actions requires exactly one source trial ${id}.`);
      const trial = matches[0];
      if (!trial.isComplete || trial.blocks?.INTRO?.condition !== condition || trial.variant !== variants[familyIndex]) {
        throw new Error(`Actions source identity mismatch for ${id}.`);
      }
      if (!FTC_TO_ADULT[id]) throw new Error(`No verified action movie for ${id}.`);
      return trial;
    });
    const exactColors = selected.map((trial, index) => PALETTES[index][['b', 'd'].includes(trial.variant) ? 1 : 0]);
    if (new Set(exactColors).size !== 6) throw new Error('Actions visual plan repeats an exact color.');
    const random = rng(`${seed}:actions-event-order`);
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }
    return selected;
  }
  function selectDyads(groups, eventPlan, ratingPlanNumber) {
    if (!Array.isArray(groups) || !Array.isArray(eventPlan) || groups.length !== 6 || eventPlan.length !== 6) {
      throw new Error('Actions requires six story groups and six corresponding dyad groups.');
    }
    const schedule = ratingPlanMap(ratingPlanNumber);
    const seenConditions = new Set();
    return eventPlan.map((trial, index) => {
      const condition = trial.blocks?.INTRO?.condition;
      const familyIndex = CONDITIONS.indexOf(condition);
      if (familyIndex < 0 || seenConditions.has(condition) || !FTC_TO_ADULT[trial.id]) {
        throw new Error(`Unsupported or repeated actions condition ${condition || '(missing)'}.`);
      }
      seenConditions.add(condition);
      const desired = schedule[condition];
      const matches = (groups[index] || []).filter(chunk => chunk.scriptKey === desired);
      if (matches.length !== 1) throw new Error(`Actions ${trial.id} requires exactly one focal dyad ${desired}.`);
      const chunk = matches[0];
      if (chunk.sourceKey !== SOURCE_KEYS[familyIndex]) {
        throw new Error(`Actions ${trial.id} has wrong dyad source ${chunk.sourceKey}.`);
      }
      const storyColor = String(trial.blocks.INTRO.color || '').toLowerCase();
      if (!storyColor || String(chunk.color || '').toLowerCase() !== storyColor) {
        throw new Error(`Actions ${trial.id} has a mismatched focal-dyad color.`);
      }
      if (trial.source_variant_slot && chunk.source_variant_slot !== trial.source_variant_slot) {
        throw new Error(`Actions ${trial.id} has a mismatched focal-dyad source slot.`);
      }
      const traits = new Set((chunk.slides || []).filter(slide => slide.kind === 'response').map(slide => slide.trait));
      if (traits.size !== 5 || [...traits].some(trait => !trait)) {
        throw new Error(`Actions ${trial.id} requires the original five rating traits.`);
      }
      return [chunk];
    });
  }
  function inspectPlan(visual, rating) {
    const variants = VISUAL_VARIANTS[planNumber(visual, 4, 'visual plan') - 1];
    const schedule = ratingPlanMap(rating);
    return CONDITIONS.map((condition, index) => ({
      condition, ftcTrialId: `${index + 1}${variants[index]}`,
      adultVariantId: FTC_TO_ADULT[`${index + 1}${variants[index]}`],
      exactColor: PALETTES[index][['b', 'd'].includes(variants[index]) ? 1 : 0],
      firstCandidateSide: ['a', 'b'].includes(variants[index]) ? 'left' : 'right',
      ratingScriptKey: schedule[condition]
    }));
  }
  const api = Object.freeze({
    version: VERSION, conditions: CONDITIONS, visualPlanCount: 4, ratingPlanCount: 2,
    metadata: Object.freeze({
      visualPlans: VISUAL_VARIANTS, ratingPlans: RATING_PLANS, ftcToAdult: FTC_TO_ADULT,
      ratingPolicy: 'One predetermined candidate per story, five original traits; candidates complementary across two plans; independent of child choice.',
      sourceRolesAreInternalOnly: true,
      legacyFocalRoleUniquenessRequired: false
    }),
    visualPlanMap, ratingPlanMap, planEventSession, selectDyads, inspectPlan
  });
  root.FTC_ACTIONS_ALLOCATION = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
