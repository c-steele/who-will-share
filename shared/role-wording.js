/* Wording variants change helper identifiers; the size-only reference stays intact. */
(function(root){
  'use strict';
  const wordingMode=root.FTC_WORDING_MODE;
  const usesActionWording=wordingMode==='touch-wording'||wordingMode==='loves-likes';
  const dyadBindings=new WeakMap();
  // These are the original pair artwork's positions, not guesses from size
  // or the rated subject. For example, DMK rates the middle mom on the right.
  const HELPER_SCREEN_SIDE=Object.freeze({
    'MKS|kid-MOM':'right','MKS|kid-SISTER':'right',
    'TKF|kid-TEACHER':'right','TKF|kid-FRIEND':'right',
    'DMK|mom-DAD':'left','DMK|mom-KID':'left',
    'TTK|teacher-TEACHER':'right','TTK|teacher-KID':'left',
    'MKT|kid-MOM':'right','MKT|kid-TEACHER':'right',
    'SKF|kid-SISTER':'right','SKF|kid-FRIEND':'right'
  });
  function verbForAction(action) {
    if(action!=='hug'&&action!=='dance') throw new Error(`No audited wording for action ${action}`);
    return wordingMode==='touch-wording'
      ? (action==='hug'?'touched':'did not touch')
      : (action==='hug'?'loves':'likes');
  }
  function labels(trial) {
    const mapped=root.FTC_ACTION_MAP[trial.id];
    if(!mapped) throw new Error(`No audited action wording for ${trial.id}`);
    return ['left','right'].map(side=>`${mapped[side].size} one who ${verbForAction(mapped[side].action)} the one in the middle`);
  }
  function nameplate(trial,position) {
    const mapped=root.FTC_ACTION_MAP[trial.id];
    if(!mapped) throw new Error(`No audited nameplate mapping for ${trial.id}`);
    if(position==='middle') return `${mapped.middleSize} one`;
    const candidate=mapped[position];
    if(!candidate) throw new Error(`Unknown helper position ${position}`);
    return `${candidate.size} one who ${verbForAction(candidate.action)}`;
  }
  function bindDyad(chunk,trial) {
    if(!usesActionWording) return;
    const mapped=root.FTC_ACTION_MAP[trial.id];
    const helperSides=['left','right'].filter(side=>mapped?.[side].ratingScriptKey===chunk.scriptKey);
    const helperScreenSide=HELPER_SCREEN_SIDE[`${chunk.sourceKey}|${chunk.scriptKey}`];
    if(helperSides.length!==1||!helperScreenSide) throw new Error(`No exact action-pair binding for ${trial.id}/${chunk.id}`);
    dyadBindings.set(chunk,{trial,helperStorySide:helperSides[0],helperScreenSide});
  }
  function dyadBinding(chunk) {
    const binding=dyadBindings.get(chunk);
    if(!binding) throw new Error(`Action pair was not bound to its story: ${chunk.id}`);
    return binding;
  }
  function dyadNameplate(chunk,screenSide) {
    const binding=dyadBinding(chunk);
    return nameplate(binding.trial,screenSide===binding.helperScreenSide?binding.helperStorySide:'middle');
  }
  function confirmation(trial,indexOrRole) {
    if(!usesActionWording) return root.SIZE_NAMES.choiceConfirmation(trial,indexOrRole);
    const block=trial.blocks.HUG||trial.blocks.FOOD||trial.blocks.HELP;
    const index=typeof indexOrRole==='number'?indexOrRole:block.choices.findIndex(c=>root.SIZE_NAMES.normalizeRole(c.label)===root.SIZE_NAMES.normalizeRole(indexOrRole));
    return index===0||index===1?`You chose the ${labels(trial)[index]}!`:'Thanks for choosing!';
  }
  if(usesActionWording) {
    for(const trial of root.SIZE_DATA.event.trials) {
      if(!root.FTC_ACTION_MAP[trial.id]) continue;
      const pair=labels(trial);
      for(const suffix of ['HUG','FOOD','HELP']) {
        const block=trial.blocks[suffix];
        const lines=block.text.split(/\n+/).filter(Boolean);
        lines[lines.length-1]=`The ${pair[0]} or the ${pair[1]}?`;
        block.text=lines.join('\n');
        block.choices.forEach((choice,index)=>{choice.displayLabel=pair[index];});
      }
    }
  }
  root.FTC_ACTION_WORDING={labels,confirmation,nameplate,bindDyad,dyadBinding,dyadNameplate};
})(typeof window!=='undefined'?window:globalThis);
