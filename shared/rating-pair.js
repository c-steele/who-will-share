/* A rating pair's original interaction, bound to its predetermined story dyad. */
(function(root){
  'use strict';
  function makeNode(options) {
    const {trial,chunk}=options;
    const binding=root.FTC_ACTION_WORDING.dyadBinding(chunk);
    if(binding.trial!==trial) throw new Error(`The rating pair belongs to a different story: ${chunk.id}`);
    const key=`${trial.id}|${binding.helperStorySide}`;
    const clip=root.FTC_DYAD_ACTION_MAP?.clips[key];
    const mapped=root.FTC_ACTION_MAP[trial.id];
    const helper=mapped[binding.helperStorySide];
    if(!clip||clip.ftcTrialId!==trial.id||clip.helperStorySide!==binding.helperStorySide||
      clip.adultVariantId!==mapped.adultVariant||clip.action!==helper.action||
      clip.size!==helper.size||clip.middleSize!==mapped.middleSize||
      !Array.isArray(clip.jingleCuesSeconds)||clip.jingleCuesSeconds.length!==3) {
      throw new Error(`The rating pair has no exact verified interaction clip: ${key}`);
    }
    const mirror=binding.helperScreenSide!==binding.helperStorySide;
    const node=root.FTCActionTrial.makeNode({
      jsPsych:options.jsPsych,
      variantId:clip.adultVariantId,
      videoSrc:clip.localPath,
      jingle:{cues:clip.jingleCuesSeconds},
      skipIntroNarration:true,
      mirrorVideo:mirror,
      silent:root.FTC_SILENT_TEST===true,
      color:mapped.color,
      studyTrialKind:'dyad_action_movie',
      stillLabel:`The ${helper.size} helper and the ${mapped.middleSize} one from the middle`,
      movieLabel:`The ${helper.size} helper ${helper.action==='hug'?'touches':'does not touch'} the ${mapped.middleSize} one from the middle`,
      storyNumber:options.storyNumber,
      storyTotal:options.storyTotal,
      data:{
        trial_key:trial.id,trial_number:trial.number,variant:trial.variant,
        slide_kind:'dyad_action_intro',dyad_id:chunk.id,dyad_script_key:chunk.scriptKey,
        followup_subject:chunk.subject,followup_target:chunk.target,
        source_condition:chunk.sourceCondition||trial.blocks.INTRO?.condition||null,
        condition_pairing:trial.blocks.INTRO?.condition||chunk.sourceCondition||null,
        source_variant_slot:chunk.source_variant_slot||trial.source_variant_slot||null,
        relationship_status:chunk.relationship_status??null,
        source_condition_relationship_status:chunk.source_relationship_status||trial.relationship_status||null,
        story_number:options.storyNumber,story_total:options.storyTotal,
        event_type:options.eventType,role_set:'actions-core',suffix:'DYAD_ACTION_INTRO',
        helper_story_side:binding.helperStorySide,helper_screen_side:binding.helperScreenSide,
        action_source_variant:clip.adultVariantId,pair_action:clip.action,
        pair_helper_size:clip.size,pair_middle_size:clip.middleSize,
        pair_video_src:clip.localPath,pair_jingle_cues_s:clip.jingleCuesSeconds.slice(),
        pair_mirrored:mirror,pair_action_intro_version:root.FTC_DYAD_ACTION_MAP.version,
        facilitator_script:''
      },
      onMount:options.onMount
    });
    node.stimulus=node.stimulus.replace('data-slide-kind="action_movie"','data-slide-kind="dyad_action_intro"');
    return node;
  }
  root.FTCPairActionIntro={makeNode};
})(typeof window!=='undefined'?window:globalThis);
