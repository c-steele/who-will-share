const params = new URLSearchParams(window.KSIZE_GAME_SEARCH ?? window.location.search);
const runtimeConfig = window.KSIZE_RUNTIME_CONFIG || {};
const lockedDataStudyVersion = String(runtimeConfig.lockedDataStudyVersion || "").trim();
const assetBaseUrl = runtimeConfig.assetBaseUrl || window.KSIZE_ASSET_BASE_URL || "";
const requestedVoiceProfile = params.get("voice") || "";
const TEACHER_CLASSMATE_ASSET_VERSION = "teacher-classmate-deep-purple-preview-v16";
const TEACHER_CLASSMATE_DESIGN_VERSION = "teacher_classmate_deep_purple_preview_v15";
const TEACHER_CLASSMATE_GENERATED_ROOT = "assets/teacher_classmate/generated/";
const TEACHER_CLASSMATE_V78_REVISION_ROOT = "versions/chs-v78-teacher-classmate-evelyn-unique-roles/assets/teacher_classmate/generated/";
const TEACHER_CLASSMATE_V78_DYAD_REVISION = /^dyads\/classmate-kid_0(?:1_tkc-deep-purple-a|2_tkc-deep-purple-b)\/slide_(?:0[3-9]|1[0-3])\.svg$/;
const TEACHER_CLASSMATE_V78_TRIAL_REVISION = /^trials\/14(?:[ab]\/intro_04|[cd]\/intro_0[34]|[abcd]\/(?:hug|food|help)_screen_2)\.svg$/;
const HOME_SCHOOL_ASSET_VERSION = "home-school-context-preview-v4";
const HOME_SCHOOL_DESIGN_VERSION = "home_school_context_preview_v1";
const HOME_SCHOOL_CONTEXT_SCRIPT_VERSION = "home_school_context_script_v1";
const RATING_SCHEDULE_VERSION = FTC_ACTIONS_ALLOCATION.version;
const BALANCED_VISUAL_PLAN_VERSION = "balanced_unique_colors_sides_v1";
const HOME_SCHOOL_GENERATED_ROOT = "assets/home_school/generated/";
const DYAD_MANIFEST_URL = runtimeConfig.dyadManifestUrl
  || `data/dyad_manifest.json?v=${TEACHER_CLASSMATE_ASSET_VERSION}`;
const EVENT_MANIFEST_URL = runtimeConfig.eventManifestUrl
  || `data/ksize_manifest.json?v=${TEACHER_CLASSMATE_ASSET_VERSION}`;
const INTRO_IMAGE_FIXES_URL = runtimeConfig.introImageFixesUrl
  || "data/intro_image_fixes.json?v=two-part-pairs-1";
const CANONICAL_AUDIO_MANIFEST_URL = runtimeConfig.canonicalAudioManifestUrl
  || (requestedVoiceProfile === "relkind"
    ? "data/canonical_audio_manifest.json?v=relkind-stable-v48"
    : "data/canonical_audio_manifest_evelyn.json?v=evelyn-full-v74");
const TEACHER_CLASSMATE_AUDIO_MANIFEST_URL = runtimeConfig.teacherClassmateAudioManifestUrl
  || `data/teacher_classmate_audio_manifest.json?v=${TEACHER_CLASSMATE_ASSET_VERSION}`;
const HOME_SCHOOL_AUDIO_MANIFEST_URL = runtimeConfig.homeSchoolAudioManifestUrl
  || `data/home_school_audio_manifest.json?v=${HOME_SCHOOL_ASSET_VERSION}`;
const HOME_SCHOOL_CONTEXT_MANIFEST_URL = runtimeConfig.homeSchoolContextManifestUrl
  || `data/home_school_context_manifest.json?v=${HOME_SCHOOL_ASSET_VERSION}`;
const RATING_OPTION_CUES_URL = runtimeConfig.ratingOptionCuesUrl
  || "data/rating_option_cues.json?v=evelyn-full-v74-cues-v1";
const PREFERRED_AUDIO_DIR = requestedVoiceProfile === "relkind" ? "audio_relkind_voice" : "audio_preferred";
const AUDIO_VERSION = requestedVoiceProfile === "relkind" ? "relkind-stable-v48" : "evelyn-full-v74";
const DATA_ENDPOINT_URL = "";
const AUTO_ADVANCE_PAUSE_MS = 1200;
const PARENT_AUTOPLAY_NOTE = "Most pages in the game move on by themselves after a few moments, but you can press Replay to hear it again or press Next to move on sooner when it appears.";
const PARENT_AUTOPLAY_NOTE_SHORT = "Most pages move on by themselves. Press Replay to hear it again, or Next to move on sooner.";
const START_INTRO_TEXT = "Hi there! Welcome to Find the Caregiver! We are going to look at pictures and play a choosing game. Listen to each page. When you see choices, choose the one you pick. When you are ready, hit the green button to start.";
const START_INTRO_AUDIO = "audio/find_the_caregiver_welcome_system_voice.mp3?v=warm-welcome-v1";
const GAME_START_TEXT = "Let’s play. Listen to the story, then answer the questions. Hit the green button to start.";
const GAME_START_AUDIO = requestedVoiceProfile === "relkind"
  ? `${PREFERRED_AUDIO_DIR}/081_game_start_Lets_play.mp3`
  : "audio/game_start_without_game_1.mp3";
const PARENT_WELCOME_AUDIO = `${PREFERRED_AUDIO_DIR}/077_parent_setup_Welcome_grownups.mp3`;
const PARENT_WELCOME_TEXT = "Welcome, grown-ups! Thank you for helping your child take part. First, we'll get the sound, screen, and camera ready. Then your child will listen to stories and choose pictures on the screen. Most pages move on by themselves, and you can press Replay if your child wants to hear a page again. You can help with the device, but please let your child choose the answers.";
const PARENT_QUICK_CHECKS_AUDIO = `${PREFERRED_AUDIO_DIR}/078_parent_setup_Three_quick_checks.mp3`;
const PARENT_QUICK_CHECKS_TEXT = `Before you begin: This is a recorded picture game about social relationships. It takes about ten to fifteen minutes. You and your child may stop at any time. There are no right or wrong answers in this game. The pages are read aloud, so your child does not need to read. ${PARENT_AUTOPLAY_NOTE} Now, three quick checks. Use one screen and place it in front of your child. Turn the sound to a comfortable volume. Stay close to help with the device, but let your child choose the answers.`;
const PARENT_CAMERA_AUDIO = `${PREFERRED_AUDIO_DIR}/079_parent_setup_Check_the_camera.mp3`;
const PARENT_CAMERA_TEXT = "Let's check the camera. Put the screen directly in front of your child. Keep their full face and shoulders in view, and avoid a bright window behind them. Use one screen, and keep the webcam centered above the screen your child is watching.";
const PARENT_HANDOFF_AUDIO = `${PREFERRED_AUDIO_DIR}/083_parent_handoff_Invite_your_child.mp3`;
const PARENT_HANDOFF_TEXT = `Grown-up setup is finished. Now it's your child's turn. Please invite your child to sit in front of the screen. Grown-ups, you may help with the device, but please let your child choose. There are no right or wrong answers. The pages are read aloud. ${PARENT_AUTOPLAY_NOTE_SHORT} When your child is ready, press the green button to continue.`;
const CHILD_ASSENT_AUDIO = `${PREFERRED_AUDIO_DIR}/084_child_assent_Would_you_like_to_play.mp3`;
const CHILD_ASSENT_TEXT = "Hi there! Do you want to play a fun game today? In my game, I'm going to show you some shapes and ask you some questions. You'll press or click buttons on the screen to tell me what you think. There are no right or wrong answers, so you can say whatever you think! We're just curious about how kids think. The camera will stay on while you play, and you can stop at any time. Are you ready to play my game?";
const CHILD_GROWNUP_HANDOFF_TEXT = "Great job—you finished the game! The final questions are for your grown-up to do. Your grown-up may already be with you.";
const FOLLOWUP_MEET_TEXT = "First, we’ll meet the two people so it is clear who each question is about.";
const ORANGE_SISTER_OUTLINE_FIX_TARGET = "assets/dyads/sister-kid_01_mks-orange/sister-kid.007.png";
const ORANGE_SISTER_OUTLINE_FIX_REFERENCE = "assets/dyads/sister-kid_01_mks-orange/sister-kid.006.png";
const FINAL_GROWNUP_AUDIO = `${PREFERRED_AUDIO_DIR}/086_grownup_closeout_Final_steps.mp3`;
const FINAL_GROWNUP_TEXT = "The child's game is complete. Continue to complete the final grown-up steps.";
const ENABLE_CHILD_ASSENT = false;
const ALL_DONE_TEXT = "Thank you for playing! We're all done!";
const ALL_DONE_AUDIO_SEQUENCE = [
  {
    src: `${PREFERRED_AUDIO_DIR}/075_ending_Thank_you_for_playing_fun_profile_v61.mp3`,
    text: "Thank you for playing!",
    volume: 1,
    playbackRate: 1,
    preservePitch: true,
  },
  {
    src: `${PREFERRED_AUDIO_DIR}/075_ending_Were_all_done_fun_profile_v59.mp3`,
    text: "We're all done!",
    volume: 1,
    playbackRate: 1,
    preservePitch: true,
  },
];
const TRIAL_ADVANCE_VALUES = {
  next: 0,
  choice: 0,
  rating: 0,
};

function isolatedTeacherClassmateVisualPath(path) {
  const source = String(path || "");
  if (!source.startsWith(TEACHER_CLASSMATE_GENERATED_ROOT)) return source;
  const relativePath = source.slice(TEACHER_CLASSMATE_GENERATED_ROOT.length);
  const isV78Revision = TEACHER_CLASSMATE_V78_DYAD_REVISION.test(relativePath)
    || TEACHER_CLASSMATE_V78_TRIAL_REVISION.test(relativePath);
  return isV78Revision ? `${TEACHER_CLASSMATE_V78_REVISION_ROOT}${relativePath}` : source;
}

function assetUrl(path) {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;
  const isolatedPath = isolatedTeacherClassmateVisualPath(path);
  if (!assetBaseUrl) return isolatedPath;
  return new URL(isolatedPath, assetBaseUrl).toString();
}

function configValue(...keys) {
  for (const key of keys) {
    const value = params.get(key);
    if (value != null && value !== "") return value;
    if (runtimeConfig[key] != null && runtimeConfig[key] !== "") return String(runtimeConfig[key]);
  }
  return "";
}

function resolveSeedIdentity(explicitSeed, participantId, chsResponse, chsChild, fallbackTimestamp = Date.now()) {
  if (explicitSeed) return { seed: explicitSeed, source: "explicit_seed" };
  if (participantId) return { seed: participantId, source: "participant_id" };
  if (chsResponse) return { seed: chsResponse, source: "chs_response_id" };
  if (chsChild) return { seed: chsChild, source: "chs_child_id" };
  return { seed: String(fallbackTimestamp), source: "timestamp" };
}

const requestedParticipantId = configValue("pid", "participant", "session", "PROLIFIC_PID");
const requestedChsChild = configValue("child", "CHILD_ID");
const requestedChsResponse = configValue("response", "response_uuid", "CHS_RESPONSE_ID");
const requestedExplicitSeed = configValue("seed");
const requestedSeedIdentity = resolveSeedIdentity(
  requestedExplicitSeed,
  requestedParticipantId,
  requestedChsResponse,
  requestedChsChild,
);
const requestedSeed = requestedSeedIdentity.seed;
const requestedSeedSource = requestedSeedIdentity.source;
const requestedRoleSet = configValue("roleSet", "role");
const requestedSet = configValue("set") || "role";
const requestedColor = configValue("color").toLowerCase();
const requestedVariant = configValue("variant").toLowerCase();
const requestedEvent = configValue("event").toUpperCase();
const requestedStudyVersion = String(
  runtimeConfig.lockedStudyVersion || configValue("studyVersion", "study_version")
).toLowerCase();
const isCurrentChsV76Study = [
  "chs-v76",
  "chs_polish_v76",
  "chs-polish-v76",
  "current-v76",
  "current_v76",
].includes(requestedStudyVersion);
const normalizeStudyContext = (value) => {
  const normalized = String(value || "").trim().toUpperCase().replace(/[-_ ]+/g, "_");
  if (["HOME", "AT_HOME"].includes(normalized)) return "HOME";
  if (["SCHOOL", "AT_SCHOOL"].includes(normalized)) return "SCHOOL";
  return "";
};
const lockedStudyContext = normalizeStudyContext(runtimeConfig.lockedContext);
const requestedContext = lockedStudyContext || normalizeStudyContext(
  configValue("context", "assignedContext", "assigned_context") || requestedStudyVersion
);
const isHomeSchoolStudy = Boolean(requestedContext)
  || ["home-school", "home_school", "home-vs-school", "home_vs_school", "context"].includes(requestedStudyVersion)
  || configValue("contextStudy", "context_study") === "1";
const requestedAssignmentIdentity = isHomeSchoolStudy
  ? (requestedChsChild
      ? { seed: requestedChsChild, source: "chs_child_id" }
      : requestedParticipantId
        ? { seed: requestedParticipantId, source: "participant_id" }
        : requestedChsResponse
          ? { seed: requestedChsResponse, source: "chs_response_id" }
          : requestedSeedIdentity)
  : requestedSeedIdentity;
const requestedPartOrder = configValue("partOrder", "order");
const requestedRatingMode = configValue("ratingMode") || "one-after-story";
const requestedFamilyLikertMode = configValue("familyLikert", "familyLikertMode", "familyPairs").toLowerCase();
const requestedPrimaryCellRaw = configValue("primaryCell", "primary_cell");
const requestedRatingPlanRaw = configValue("ratingPlan", "rating_plan");
const requestedVisualPlanRaw = configValue("visualPlan", "visual_plan");
const requestedPrimaryCell = Number(requestedPrimaryCellRaw || 0);
const requestedRatingPlan = Number(requestedRatingPlanRaw || 0);
const requestedVisualPlan = Number(requestedVisualPlanRaw || 0);
const requestedAssignmentId = configValue("assignmentId", "assignment_id");
const requestedAssignmentMethod = configValue("assignmentMethod", "assignment_method");
const requestedAllocatorVersion = configValue("allocatorVersion", "allocator_version");
const requestedPreviewIndex = Math.max(0, Number(configValue("previewIndex") || 0) || 0);
const requestedResumeBackupKey = configValue("resumeBackupKey", "resume_backup_key");
const requestedExpectedResumeRows = Math.max(0, Number(configValue("expectedResumeRows", "expected_resume_rows") || 0) || 0);
const requestedResearcherJump = configValue("researcherJump", "researcher_jump") === "1";
const requestedResearcherTools = configValue("researcherTools");
const isFacilitatorMode = configValue("facilitator", "zoom") === "1";
const isLiveShareMode = configValue("liveShare", "screenShare", "screen_share") === "1";
const showLiveReadAloud = isLiveShareMode
  && configValue("showReadAloud", "readAloudCaptions", "read_aloud_captions") !== "0";
const skipParentSetup = isFacilitatorMode
  && configValue("skipParentSetup", "skip_parent_setup") === "1";
const isFacilitatorChildWindow = isFacilitatorMode && configValue("facilitatorChild") === "1";
const facilitatorSessionKey = configValue("facilitatorSession", "facilitator_session")
  || configValue("session_id", "SESSION_ID")
  || requestedParticipantId
  || requestedSeed;
const showResearcherTools = requestedResearcherTools === "1"
  && (!isFacilitatorChildWindow || isLiveShareMode);
const requestedDataEndpoint = configValue("dataEndpoint") || DATA_ENDPOINT_URL;
const requestedCheckpointEndpoint = configValue("checkpointEndpoint", "checkpoint_endpoint");
const shouldDownloadData = configValue("downloadData") === "1";
const requestedExportFormat = configValue("exportFormat", "export_format").toLowerCase();
const csvOnlyExport = requestedExportFormat === "csv";
// Browser speech is an opt-in researcher fallback only. Participant URLs use
// the complete prerecorded Evelyn set and never mix in a system voice.
const useSyntheticSpeech = showResearcherTools && configValue("syntheticSpeech") === "1";
const currentSessionId = configValue("session_id", "SESSION_ID")
  || requestedChsResponse
  || `${Date.now()}-${hashSeed(`${requestedSeed}:session`).toString(16)}`;

const CORE_CONDITIONS = [
  "MOM-TEACHER",
  "SISTER-FRIEND",
  "BESTFRIEND-FRIEND",
  "TEACHER-FRIEND",
  "MOM-SISTER",
  "TEACHER-CLASSMATE",
];

const MAN_ROLE_CONDITIONS = [
  "DAD-TEACHER",
  "BROTHER-FRIEND",
  "BESTFRIEND-FRIEND",
  "TEACHER-FRIEND",
  "DAD-BROTHER",
  "TEACHER-CLASSMATE",
];

const FAMILY_ROLE_CONDITIONS = [
  "MOM-DAD",
  "SISTER-BROTHER",
  "DAD-KID",
  "MOM-KID",
  "TEACHER-KID",
  "TEACHER-CLASSMATE",
];

/* These are whole-session plans, not a request to force one variant letter
   across all stories. Every plan has six unique exact colors and three LEFT /
   three RIGHT story layouts. Across the four plans, every condition receives
   a, b, c, and d exactly once. */
const SESSION_VISUAL_PLANS = Object.freeze({
  woman: Object.freeze([
    Object.freeze({ "MOM-TEACHER": "a", "SISTER-FRIEND": "d", "BESTFRIEND-FRIEND": "a", "TEACHER-FRIEND": "c", "MOM-SISTER": "b", "TEACHER-CLASSMATE": "c" }),
    Object.freeze({ "MOM-TEACHER": "b", "SISTER-FRIEND": "c", "BESTFRIEND-FRIEND": "c", "TEACHER-FRIEND": "a", "MOM-SISTER": "d", "TEACHER-CLASSMATE": "b" }),
    Object.freeze({ "MOM-TEACHER": "d", "SISTER-FRIEND": "a", "BESTFRIEND-FRIEND": "b", "TEACHER-FRIEND": "d", "MOM-SISTER": "c", "TEACHER-CLASSMATE": "a" }),
    Object.freeze({ "MOM-TEACHER": "c", "SISTER-FRIEND": "b", "BESTFRIEND-FRIEND": "d", "TEACHER-FRIEND": "b", "MOM-SISTER": "a", "TEACHER-CLASSMATE": "d" }),
  ]),
  man: Object.freeze([
    Object.freeze({ "DAD-TEACHER": "a", "BROTHER-FRIEND": "d", "BESTFRIEND-FRIEND": "a", "TEACHER-FRIEND": "c", "DAD-BROTHER": "b", "TEACHER-CLASSMATE": "c" }),
    Object.freeze({ "DAD-TEACHER": "b", "BROTHER-FRIEND": "c", "BESTFRIEND-FRIEND": "c", "TEACHER-FRIEND": "a", "DAD-BROTHER": "d", "TEACHER-CLASSMATE": "b" }),
    Object.freeze({ "DAD-TEACHER": "d", "BROTHER-FRIEND": "a", "BESTFRIEND-FRIEND": "b", "TEACHER-FRIEND": "d", "DAD-BROTHER": "c", "TEACHER-CLASSMATE": "a" }),
    Object.freeze({ "DAD-TEACHER": "c", "BROTHER-FRIEND": "b", "BESTFRIEND-FRIEND": "d", "TEACHER-FRIEND": "b", "DAD-BROTHER": "a", "TEACHER-CLASSMATE": "d" }),
  ]),
  family: Object.freeze([
    Object.freeze({ "MOM-DAD": "a", "SISTER-BROTHER": "d", "DAD-KID": "c", "MOM-KID": "a", "TEACHER-KID": "b", "TEACHER-CLASSMATE": "c" }),
    Object.freeze({ "MOM-DAD": "b", "SISTER-BROTHER": "c", "DAD-KID": "a", "MOM-KID": "c", "TEACHER-KID": "d", "TEACHER-CLASSMATE": "b" }),
    Object.freeze({ "MOM-DAD": "d", "SISTER-BROTHER": "a", "DAD-KID": "d", "MOM-KID": "b", "TEACHER-KID": "c", "TEACHER-CLASSMATE": "a" }),
    Object.freeze({ "MOM-DAD": "c", "SISTER-BROTHER": "b", "DAD-KID": "b", "MOM-KID": "d", "TEACHER-KID": "a", "TEACHER-CLASSMATE": "d" }),
  ]),
});

const EVENT_SUFFIXES = ["HUG", "FOOD", "HELP"];
const PART_EVENT = "event";
const PART_DYAD = "dyad";
const PART_INTERLEAVED = "interleaved";
const DYAD_PAIR_FOLDERS = [
  "mom-kid",
  "dad-kid",
  "teacher-kid",
  "classmate-kid",
  "sister-kid",
  "brother-kid",
  "friend-kid",
  "best friend-kid",
  "kid-mom",
  "kid-dad",
  "kid-teacher",
  "dad-mom",
  "mom-dad",
  "teacher-teacher",
];

const CONDITION_DYAD_FOLDERS = {
  "MOM-SISTER": [{ folder: "mom-kid", sourceKey: "MKS" }, { folder: "sister-kid", sourceKey: "MKS" }],
  "DAD-KID": [{ folder: "dad-mom", sourceKey: "DMK" }, { folder: "kid-mom", sourceKey: "DMK" }],
  "DAD-BROTHER": [{ folder: "dad-kid", sourceKey: "DKB" }, { folder: "brother-kid", sourceKey: "DKB" }],
  "TEACHER-FRIEND": [{ folder: "teacher-kid", sourceKey: "TKF" }, { folder: "friend-kid", sourceKey: "TKF" }],
  "TEACHER-KID": [{ folder: "teacher-teacher", sourceKey: "TTK" }, { folder: "kid-teacher", sourceKey: "TTK" }],
  "MOM-KID": [{ folder: "mom-dad", sourceKey: "MDK" }, { folder: "kid-dad", sourceKey: "MDK" }],
  "MOM-DAD": [{ folder: "mom-kid", sourceKey: "MKD" }, { folder: "dad-kid", sourceKey: "MKD" }],
  "MOM-TEACHER": [{ folder: "mom-kid", sourceKey: "MKT" }, { folder: "teacher-kid", sourceKey: "MKT" }],
  "DAD-TEACHER": [{ folder: "dad-kid", sourceKey: "DKT" }, { folder: "teacher-kid", sourceKey: "DKT" }],
  "SISTER-FRIEND": [{ folder: "sister-kid", sourceKey: "SKF" }, { folder: "friend-kid", sourceKey: "SKF" }],
  "BROTHER-FRIEND": [{ folder: "brother-kid", sourceKey: "BKF" }, { folder: "friend-kid", sourceKey: "BKF" }],
  "SISTER-BROTHER": [{ folder: "sister-kid", sourceKey: "SKB" }, { folder: "brother-kid", sourceKey: "SKB" }],
  "BESTFRIEND-FRIEND": [{ folder: "best friend-kid", sourceKey: "BFKF" }, { folder: "friend-kid", sourceKey: "BFKF" }],
  "TEACHER-CLASSMATE": [{ folder: "teacher-kid", sourceKey: "TKC" }, { folder: "classmate-kid", sourceKey: "TKC" }],
};

const ONE_PAIR_SCRIPT_SCHEDULES = [
  {
    "MOM-TEACHER": "kid-TEACHER",
    "SISTER-FRIEND": "kid-SISTER",
    "TEACHER-FRIEND": "kid-FRIEND",
    "MOM-SISTER": "kid-MOM",
    "BESTFRIEND-FRIEND": "kid-BEST FRIEND",
    "DAD-TEACHER": "kid-TEACHER",
    "BROTHER-FRIEND": "kid-BROTHER",
    "DAD-BROTHER": "kid-DAD",
    "MOM-DAD": "kid-MOM",
    "SISTER-BROTHER": "kid-SISTER",
    "DAD-KID": "mom-DAD",
    "MOM-KID": "dad-MOM",
    "TEACHER-KID": "teacher-TEACHER",
    "TEACHER-CLASSMATE": "kid-CLASSMATE",
  },
  {
    "MOM-TEACHER": "kid-MOM",
    "SISTER-FRIEND": "kid-FRIEND",
    "TEACHER-FRIEND": "kid-TEACHER",
    "MOM-SISTER": "kid-SISTER",
    "BESTFRIEND-FRIEND": "kid-BEST FRIEND",
    "DAD-TEACHER": "kid-DAD",
    "BROTHER-FRIEND": "kid-FRIEND",
    "DAD-BROTHER": "kid-BROTHER",
    "MOM-DAD": "kid-DAD",
    "SISTER-BROTHER": "kid-BROTHER",
    "DAD-KID": "mom-KID",
    "MOM-KID": "dad-KID",
    "TEACHER-KID": "teacher-KID",
    "TEACHER-CLASSMATE": "kid-CLASSMATE",
  },
];

const FAMILY_ONE_PAIR_SCRIPT_SCHEDULES = [
  {
    "MOM-DAD": "kid-MOM",
    "SISTER-BROTHER": "kid-SISTER",
    "DAD-KID": "mom-KID",
    "MOM-KID": "dad-MOM",
    "TEACHER-KID": "teacher-TEACHER",
    "TEACHER-CLASSMATE": "kid-CLASSMATE",
  },
  {
    "MOM-DAD": "kid-MOM",
    "SISTER-BROTHER": "kid-BROTHER",
    "DAD-KID": "mom-KID",
    "MOM-KID": "dad-MOM",
    "TEACHER-KID": "teacher-TEACHER",
    "TEACHER-CLASSMATE": "kid-CLASSMATE",
  },
  {
    "MOM-DAD": "kid-DAD",
    "SISTER-BROTHER": "kid-SISTER",
    "DAD-KID": "mom-DAD",
    "MOM-KID": "dad-KID",
    "TEACHER-KID": "teacher-TEACHER",
    "TEACHER-CLASSMATE": "kid-CLASSMATE",
  },
  {
    "MOM-DAD": "kid-DAD",
    "SISTER-BROTHER": "kid-BROTHER",
    "DAD-KID": "mom-DAD",
    "MOM-KID": "dad-KID",
    "TEACHER-KID": "teacher-TEACHER",
    "TEACHER-CLASSMATE": "kid-CLASSMATE",
  },
];

const OPTION_LABELS = {
  love: ["Does not love", "Loves a little", "Loves a lot"],
  like: ["Does not like", "Likes a little", "Likes a lot"],
  charge: ["Not in charge", "A little in charge", "Very much in charge"],
  old: ["Not old", "A little old", "Very old"],
  strong: ["Not strong", "A little strong", "Very strong"],
};
const STUDY_CONTEXTS = ["HOME", "SCHOOL"];
const CHOICE_CONFIRMATION_TEXT = {
  "BEST FRIEND": "You chose the best friend!",
  BROTHER: "You chose the brother!",
  CLASSMATE: "You chose the classmate!",
  DAD: "You chose the dad!",
  FRIEND: "You chose the friend!",
  KID: "You chose the kid!",
  MOM: "You chose the mom!",
  SISTER: "You chose the sister!",
  TEACHER: "You chose the teacher!",
};
const CHOICE_CONFIRMATION_AUDIO = {};
const FOLLOWUP_TEXT_BY_SCRIPT = {
  "dad-KID": "Now let's answer some questions about the kid inside the box and the dad.",
  "dad-MOM": "Now let's answer some questions about the dad inside the box and the mom.",
  "kid-BEST FRIEND": "Now let's answer some questions about the best friend inside the box and the kid.",
  "kid-BROTHER": "Now let's answer some questions about the brother inside the box and the kid.",
  "kid-CLASSMATE": "Now let's answer some questions about the classmate inside the box and the kid.",
  "kid-DAD": "Now let's answer some questions about the dad inside the box and the kid.",
  "kid-FRIEND": "Now let's answer some questions about the friend inside the box and the kid.",
  "kid-MOM": "Now let's answer some questions about the mom inside the box and the kid.",
  "kid-SISTER": "Now let's answer some questions about the sister inside the box and the kid.",
  "kid-TEACHER": "Now let's answer some questions about the teacher inside the box and the kid.",
  "mom-DAD": "Now let's answer some questions about the mom inside the box and the dad.",
  "mom-KID": "Now let's answer some questions about the kid inside the box and the mom.",
  "teacher-KID": "Now let's answer some questions about the kid inside the box and the teacher.",
  "teacher-TEACHER": "Now let's answer some questions about the teacher inside the box and the other teacher.",
};
const TEACHER_BOX_QUESTION_TEXT = {
  love: "How much does the teacher inside the box love the other teacher?",
  like: "How much does the teacher inside the box like the other teacher?",
  charge: "How much is the teacher inside the box in charge?",
  old: "How old is the teacher inside the box?",
  strong: "How strong is the teacher inside the box?",
};
let introImageFixes = {};
let currentPreviewIndex = 0;
let totalPreviewScreens = 0;
let currentSessionParams = {};
let canonicalAudioByText = new Map();
let canonicalAudioByOriginalSrc = new Map();
let ratingOptionCueManifest = {};
let homeSchoolContextManifest = {};
let activeStudyContext = "";
let activeStudyRoleSet = "";
let activeStudyEvent = "";
let activeFollowupSchedule = null;
let audioPlaybackFailureCount = 0;
let outroMusicStopper = null;
let introMusicStopper = null;
let welcomeSequenceToken = 0;
let facilitatorBridge = null;
let facilitatorJsPsych = null;
let facilitatorAssignmentSummary = null;
let facilitatorCurrentScript = [];
let facilitatorCurrentMeta = {};
let facilitatorEndedEarly = false;
let facilitatorRestoredRowCount = 0;
let facilitatorCloseAfterFinish = false;
let facilitatorStudyFinished = false;
let facilitatorDatasetFingerprint = "";
let facilitatorDatasetRequestSequence = 0;
let facilitatorDatasetQueue = Promise.resolve({ sent: false, reason: "not_started" });
let facilitatorDatasetPendingRequest = null;
let facilitatorDatasetSaveInFlight = false;
let facilitatorDatasetWaiters = [];
let facilitatorDatasetState = {
  status: requestedCheckpointEndpoint ? "waiting" : "not_configured",
  rowsSaved: 0,
  totalRows: 0,
  path: "",
  sessionPath: "",
  sessionCount: 0,
  savedAt: "",
  error: "",
};

function hashSeed(seedText) {
  let hash = 2166136261;
  for (const char of String(seedText)) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function makeRng(seedText) {
  let state = hashSeed(seedText) || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

function shuffle(items, rng) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeAudioText(text) {
  return String(text || "")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeAudioSrc(src) {
  return String(src || "").split("?")[0].replace(/^\.\//, "");
}

function preferredAudioPathFromOutput(output) {
  const normalizedOutput = normalizeAudioSrc(output);
  if (requestedVoiceProfile !== "relkind" && normalizedOutput.startsWith("audio_evelyn/")) {
    return normalizedOutput;
  }
  const filename = normalizedOutput.split("/").pop();
  return filename ? `${PREFERRED_AUDIO_DIR}/${filename}` : "";
}

function installCanonicalAudioMap(manifest, ...extensionManifests) {
  canonicalAudioByText = new Map();
  canonicalAudioByOriginalSrc = new Map();
  for (const line of manifest?.lines || []) {
    const preferredPath = preferredAudioPathFromOutput(line.output);
    if (!preferredPath) continue;
    canonicalAudioByText.set(normalizeAudioText(line.text), preferredPath);
  }
  if (requestedVoiceProfile !== "relkind") {
    for (const [text, output] of Object.entries(manifest?.normalizedTextToOutput || {})) {
      const evelynPath = normalizeAudioSrc(output);
      if (!evelynPath.startsWith("audio_evelyn/")) continue;
      canonicalAudioByText.set(normalizeAudioText(text), evelynPath);
    }
    for (const extensionManifest of extensionManifests) {
      for (const line of extensionManifest?.lines || []) {
        const previewPath = normalizeAudioSrc(line.output);
        const isApprovedExtensionPath = previewPath.startsWith(TEACHER_CLASSMATE_GENERATED_ROOT)
          || previewPath.startsWith(HOME_SCHOOL_GENERATED_ROOT);
        if (!isApprovedExtensionPath) continue;
        canonicalAudioByText.set(normalizeAudioText(line.text), previewPath);
      }
    }
  }
  for (const line of manifest?.lines || []) {
    const preferredPath = canonicalAudioByText.get(normalizeAudioText(line.text))
      || preferredAudioPathFromOutput(line.output);
    if (!preferredPath) continue;
    for (const original of line.currentOutputs || []) {
      canonicalAudioByOriginalSrc.set(normalizeAudioSrc(original), preferredPath);
    }
  }
}

function canonicalAudioPathForText(text) {
  return canonicalAudioByText.get(normalizeAudioText(text)) || "";
}

function canonicalAudioPathForSrc(src) {
  return canonicalAudioByOriginalSrc.get(normalizeAudioSrc(src)) || "";
}

function finishParticipantTrial(jsPsych, data, amount, label) {
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  window.setTimeout(() => {
    jsPsych.finishTrial(data);
  }, 0);
}

function stopOutroMusic() {
  outroMusicStopper?.();
  outroMusicStopper = null;
}

function stopIntroMusic() {
  introMusicStopper?.();
  introMusicStopper = null;
  document.body.classList.remove("ksize-intro-music-playing");
}

function playIntroOpeningMusic() {
  if (isFacilitatorMode) return;
  stopIntroMusic();
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  context.resume?.().catch(() => {});
  const master = context.createGain();
  master.gain.value = 0.28;
  master.connect(context.destination);
  document.body.classList.add("ksize-intro-music-playing");
  const startAt = context.currentTime + 0.05;
  const beat = 0.28;
  const melody = [
    [523.25, 0, 0.22], [659.25, 1, 0.22], [783.99, 2, 0.3],
    [659.25, 3.2, 0.18], [880, 4, 0.22], [987.77, 5, 0.22],
    [1046.5, 6, 0.38], [783.99, 7.5, 0.2], [987.77, 8.5, 0.22],
    [1174.66, 9.5, 0.22], [1318.51, 10.5, 0.55],
  ];
  const playTone = (frequency, offset, duration, type = "triangle", level = 0.1) => {
    const begins = startAt + offset * beat;
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, begins);
    gain.gain.setValueAtTime(0.0001, begins);
    gain.gain.linearRampToValueAtTime(level, begins + 0.025);
    gain.gain.setValueAtTime(level * 0.7, begins + Math.max(0.05, duration - 0.06));
    gain.gain.exponentialRampToValueAtTime(0.0001, begins + duration);
    osc.connect(gain).connect(master);
    osc.start(begins);
    osc.stop(begins + duration + 0.03);
  };
  melody.forEach(([frequency, offset, duration]) => {
    playTone(frequency, offset, duration);
    playTone(frequency * 2, offset + 0.04, duration * 0.72, "sine", 0.025);
  });
  [
    [261.63, 0, 3.4], [349.23, 4, 2.7], [392, 7.5, 2.8], [523.25, 10.5, 1.6],
  ].forEach(([frequency, offset, duration]) => {
    [1, 1.25, 1.5].forEach((ratio) => playTone(frequency * ratio, offset, duration * beat, "sine", 0.018));
  });
  const closeTimer = window.setTimeout(() => {
    master.gain.setTargetAtTime(0.0001, context.currentTime, 0.18);
    window.setTimeout(() => context.close().catch(() => {}), 500);
    introMusicStopper = null;
    document.body.classList.remove("ksize-intro-music-playing");
  }, 3900);
  introMusicStopper = () => {
    window.clearTimeout(closeTimer);
    master.gain.setTargetAtTime(0.0001, context.currentTime, 0.06);
    window.setTimeout(() => context.close().catch(() => {}), 250);
  };
}

function playOutroMusic() {
  if (isFacilitatorMode) return;
  stopOutroMusic();
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  context.resume?.().catch(() => {});
  const master = context.createGain();
  master.gain.value = 0.2;
  master.connect(context.destination);
  const notes = [
    [523.25, 0.00, 0.46],
    [659.25, 0.54, 0.46],
    [783.99, 1.08, 0.64],
    [659.25, 1.90, 0.38],
    [783.99, 2.34, 0.38],
    [1046.5, 2.78, 0.78],
  ];
  const playTone = (frequency, start, duration, gainLevel = 0.12) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(gainLevel, start + 0.08);
    gain.gain.setValueAtTime(gainLevel * 0.8, start + Math.max(0.1, duration - 0.14));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(master);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  };
  const schedule = () => {
    const now = context.currentTime + 0.04;
    notes.forEach(([frequency, offset, duration]) => {
      playTone(frequency, now + offset, duration, 0.1);
      playTone(frequency * 2, now + offset + 0.018, duration * 0.72, 0.022);
    });
    [261.63, 329.63, 392.0].forEach((frequency) => playTone(frequency, now, 1.38, 0.02));
    [349.23, 440.0, 523.25].forEach((frequency) => playTone(frequency, now + 1.62, 1.18, 0.018));
    [392.0, 493.88, 587.33].forEach((frequency) => playTone(frequency, now + 2.72, 1.0, 0.018));
  };
  schedule();
  const loopId = window.setInterval(schedule, 3900);
  outroMusicStopper = () => {
    window.clearInterval(loopId);
    master.gain.setTargetAtTime(0.0001, context.currentTime, 0.08);
    window.setTimeout(() => context.close().catch(() => {}), 300);
  };
}

function playFireworkSfx({ loop = false } = {}) {
  if (isFacilitatorMode) return () => {};
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return () => {};
  const context = new AudioContextClass();
  context.resume?.().catch(() => {});
  const master = context.createGain();
  master.gain.value = 0.16;
  master.connect(context.destination);

  const makePop = (delay, baseFrequency) => {
    const start = context.currentTime + delay;
    const noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.16), context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const noise = context.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.0001, start);
    noiseGain.gain.exponentialRampToValueAtTime(0.7, start + 0.015);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
    noise.connect(noiseGain).connect(master);
    noise.start(start);
    noise.stop(start + 0.2);

    [1, 1.26, 1.5].forEach((ratio, index) => {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(baseFrequency * ratio, start);
      osc.frequency.exponentialRampToValueAtTime(baseFrequency * ratio * 1.6, start + 0.18);
      gain.gain.setValueAtTime(0.0001, start + index * 0.012);
      gain.gain.exponentialRampToValueAtTime(0.12, start + 0.035 + index * 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42 + index * 0.04);
      osc.connect(gain).connect(master);
      osc.start(start + index * 0.012);
      osc.stop(start + 0.5 + index * 0.04);
    });
  };

  const schedulePops = () => {
    [0.15, 0.72, 1.35, 2.15].forEach((delay, index) => {
      makePop(delay, 360 + index * 80);
    });
  };

  schedulePops();
  const loopId = loop ? window.setInterval(schedulePops, 2600) : null;
  const closeTimer = loop ? null : window.setTimeout(() => context.close().catch(() => {}), 3600);
  return () => {
    if (loopId) window.clearInterval(loopId);
    if (closeTimer) window.clearTimeout(closeTimer);
    master.gain.setTargetAtTime(0.0001, context.currentTime, 0.05);
    window.setTimeout(() => context.close().catch(() => {}), 250);
  };
}

function audioIdForText(text) {
  let hash = 0x811c9dc5;
  for (const char of String(text || "")) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 0x01000193);
  }
  return `rating_${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function audioPathForText(text) {
  const mappedPath = canonicalAudioPathForText(text);
  if (mappedPath || requestedVoiceProfile !== "relkind") return mappedPath;
  return `audio/${audioIdForText(text)}.mp3`;
}

function versionedAudioSrc(src) {
  if (!src || /^(data:|blob:)/.test(src)) return src;
  const normalizedSrc = normalizeAudioSrc(src);
  const version = normalizedSrc.startsWith(HOME_SCHOOL_GENERATED_ROOT)
    ? HOME_SCHOOL_ASSET_VERSION
    : (normalizedSrc.startsWith(TEACHER_CLASSMATE_GENERATED_ROOT)
      ? TEACHER_CLASSMATE_ASSET_VERSION
      : AUDIO_VERSION);
  const resolvedSrc = assetUrl(src);
  return resolvedSrc.includes("?") ? `${resolvedSrc}&v=${version}` : `${resolvedSrc}?v=${version}`;
}

function sessionId() {
  return currentSessionId;
}

function makeDataPayload(jsPsych) {
  const rows = jsPsych.data.get().values();
  const completedAt = new Date().toISOString();
  const participantId = requestedParticipantId || "test_no_pid";
  return {
    study: currentSessionParams.context ? "K-SIZE-home-school-context" : "K-SIZE-dyad-likert",
    audio_version: AUDIO_VERSION,
    participant_id: participantId,
    prolific_pid: params.get("PROLIFIC_PID") || participantId,
    study_id: params.get("STUDY_ID") || "",
    session_id: sessionId(),
    chs_child_id: requestedChsChild,
    chs_response_id: requestedChsResponse,
    seed: requestedSeed,
    event_suffix: currentSessionParams.event || "",
    role_set: currentSessionParams.roleSet || "",
    assigned_context: currentSessionParams.context || "",
    study_version: currentSessionParams.studyVersion || "",
    context_script_version: currentSessionParams.contextScriptVersion || "",
    assignment_cell: currentSessionParams.assignmentCell ?? null,
    assignment_cell_schema: currentSessionParams.assignmentCellSchema || "",
    primary_cell: currentSessionParams.primaryCell ?? null,
    primary_cell_schema: currentSessionParams.primaryCellSchema || "",
    assignment_id: currentSessionParams.assignmentId || "",
    assignment_method: currentSessionParams.assignmentMethod || "",
    allocator_version: currentSessionParams.allocatorVersion || "",
    assignment_key_type: currentSessionParams.assignmentKeyType || requestedSeedSource,
    audio_playback_or_load_failure_count: audioPlaybackFailureCount,
    rating_mode: currentSessionParams.ratingMode || requestedRatingMode,
    rating_schedule_version: currentSessionParams.ratingScheduleVersion || "",
    rating_plan: currentSessionParams.ratingPlan ?? null,
    visual_plan: currentSessionParams.visualPlan ?? null,
    visual_plan_version: currentSessionParams.visualPlanVersion || "",
    visual_plan_map: currentSessionParams.visualPlanMap || null,
    rating_focal_roles: currentSessionParams.ratingFocalRoles || [],
    rating_focal_roles_unique: currentSessionParams.ratingFocalRolesUnique ?? null,
    part_order: currentSessionParams.partOrder || "",
    design_version: currentSessionParams.designVersion || "",
    relationship_status: currentSessionParams.relationshipStatus || "",
    facilitator_mode: isFacilitatorMode,
    live_share_mode: isLiveShareMode,
    parent_setup_skipped: skipParentSetup,
    export_format: csvOnlyExport ? "csv" : "json+csv",
    facilitator_session: isFacilitatorMode ? facilitatorSessionKey : "",
    facilitator_preview_index: isFacilitatorMode ? currentPreviewIndex : null,
    facilitator_ended_early: isFacilitatorMode ? facilitatorEndedEarly : false,
    facilitator_resume_backup_key: isFacilitatorMode ? requestedResumeBackupKey : "",
    facilitator_restored_row_count: isFacilitatorMode ? facilitatorRestoredRowCount : 0,
    completed_at: completedAt,
    user_agent: navigator.userAgent,
    url: window.location.href,
    rows,
  };
}

function saveLocalDataBackup(payload) {
  try {
    const key = `who-will-help-data:${payload.session_id}`;
    localStorage.setItem(key, JSON.stringify(payload));
    localStorage.setItem("who-will-help-data:last-session", key);
    return key;
  } catch (error) {
    console.warn("Could not save local data backup", error);
    return "";
  }
}

function restoreFacilitatorDataBackup(jsPsych) {
  if (!isFacilitatorMode || !requestedResumeBackupKey || typeof jsPsych?.data?.get !== "function") return 0;
  if (!requestedResumeBackupKey.startsWith("who-will-help-data:")) return 0;
  try {
    const priorPayload = JSON.parse(localStorage.getItem(requestedResumeBackupKey) || "null");
    if (String(priorPayload?.participant_id || "") !== String(requestedParticipantId || "")) return 0;
    if (String(priorPayload?.seed || "") !== String(requestedSeed || "")) return 0;
    const priorRows = Array.isArray(priorPayload?.rows) ? priorPayload.rows : [];
    const dataCollection = jsPsych.data.get();
    if (typeof dataCollection?.push !== "function") return 0;
    priorRows.forEach((row) => {
      dataCollection.push({
        ...row,
        facilitator_restored_from_backup: requestedResumeBackupKey,
      });
    });
    return priorRows.length;
  } catch (error) {
    console.warn("Could not restore facilitator data backup", error);
    return 0;
  }
}

function safeFacilitatorPreviewIndex({
  requestedIndex,
  facilitatorMode,
  researcherJump,
  resumeBackupKey,
  expectedRows,
  restoredRows,
}) {
  const normalizedIndex = Math.max(0, Number(requestedIndex) || 0);
  if (!facilitatorMode || normalizedIndex === 0) return normalizedIndex;
  if (researcherJump && Number(expectedRows) === 0) return normalizedIndex;
  const recoveryVerified = Boolean(
    resumeBackupKey
      && Number(expectedRows) > 0
      && Number(restoredRows) === Number(expectedRows)
  );
  return recoveryVerified ? normalizedIndex : 0;
}

function flattenRow(row, payload) {
  return {
    exported_at: payload.completed_at,
    participant_id: payload.participant_id,
    prolific_pid: payload.prolific_pid,
    study_id: payload.study_id,
    session_id: payload.session_id,
    chs_child_id: payload.chs_child_id,
    chs_response_id: payload.chs_response_id,
    seed: payload.seed,
    assigned_event_suffix: payload.event_suffix,
    assigned_role_set: payload.role_set,
    assigned_context: payload.assigned_context,
    study_version: payload.study_version,
    context_script_version: payload.context_script_version,
    assignment_cell: payload.assignment_cell,
    assignment_cell_schema: payload.assignment_cell_schema,
    primary_cell: payload.primary_cell,
    primary_cell_schema: payload.primary_cell_schema,
    assignment_id: payload.assignment_id,
    assignment_method: payload.assignment_method,
    allocator_version: payload.allocator_version,
    assignment_key_type: payload.assignment_key_type,
    audio_playback_or_load_failure_count: payload.audio_playback_or_load_failure_count,
    assigned_rating_mode: payload.rating_mode,
    assigned_rating_plan: payload.rating_plan,
    assigned_visual_plan: payload.visual_plan,
    assigned_visual_plan_version: payload.visual_plan_version,
    assigned_visual_plan_map: payload.visual_plan_map,
    assigned_part_order: payload.part_order,
    assigned_design_version: payload.design_version,
    assigned_relationship_status: payload.relationship_status,
    completion_status: payload.completion_status || "",
    facilitator_ended_early: Boolean(payload.facilitator_ended_early),
    live_share_mode: Boolean(payload.live_share_mode),
    parent_setup_skipped: Boolean(payload.parent_setup_skipped),
    export_format: payload.export_format || "json+csv",
    facilitator_restored_row_count: payload.facilitator_restored_row_count || 0,
    audio_version: payload.audio_version,
    ...row,
  };
}

function payloadRowsForExport(payload) {
  return payload.rows.map((row) => flattenRow(row, payload));
}

function csvEscape(value) {
  if (value == null) return "";
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function rowsToCsv(rows) {
  const headers = Array.from(rows.reduce((set, row) => {
    Object.keys(row).forEach((key) => set.add(key));
    return set;
  }, new Set()));
  return [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
}

function downloadTextFile(filename, text, type) {
  try {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch (error) {
    console.warn(`Could not start download for ${filename}`, error);
    return false;
  }
}

function downloadPayloadFiles(payload) {
  const safeId = String(payload.session_id || "session").replace(/[^a-zA-Z0-9_-]/g, "_");
  if (csvOnlyExport) {
    return downloadTextFile(
      `who-will-help_${safeId}.csv`,
      rowsToCsv(payloadRowsForExport(payload)),
      "text/csv",
    );
  }
  const jsonStarted = downloadTextFile(
    `who-will-help_${safeId}.json`,
    JSON.stringify(payload, null, 2),
    "application/json",
  );
  window.setTimeout(() => {
    downloadTextFile(`who-will-help_${safeId}.csv`, rowsToCsv(payloadRowsForExport(payload)), "text/csv");
  }, 300);
  return jsonStarted;
}

function normalizeFacilitatorScript(value) {
  const items = Array.isArray(value) ? value : String(value || "").split(/\n+/);
  return items
    .map((item) => String(item || "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function setFacilitatorScript(lines, meta = {}) {
  if (!isFacilitatorMode) return;
  facilitatorCurrentScript = normalizeFacilitatorScript(lines);
  facilitatorCurrentMeta = { ...meta };
}

function renderLiveShareScript(lines) {
  if (!showLiveReadAloud) {
    document.querySelector(".ksize-live-share-script")?.remove();
    return;
  }
  const slot = document.querySelector(".ksize-top-hud-right");
  if (!slot) return;
  const script = normalizeFacilitatorScript(lines);
  if (!script.length) return;

  const panel = document.createElement("aside");
  panel.className = "ksize-live-share-script";
  panel.setAttribute("aria-label", "Researcher read-aloud script");
  const label = document.createElement("strong");
  label.textContent = "Read aloud";
  const copy = document.createElement("span");
  copy.textContent = script.join(" ");
  panel.append(label, copy);
  slot.replaceChildren(panel);
}

function facilitatorButtonLabel(button) {
  return String(
    button.getAttribute("aria-label")
      || button.dataset.facilitatorLabel
      || button.textContent
      || "Continue"
  ).replace(/\s+/g, " ").trim();
}

function facilitatorControlKind(button) {
  if (button.matches(".ksize-char-btn")) return "choice";
  if (button.matches(".ksize-rating-choice")) return "rating";
  if (button.matches(".ksize-assent-yes, .ksize-assent-no")) return "choice";
  if (button.matches("[data-download-json], [data-download-csv]")) return "export";
  return "continue";
}

function collectFacilitatorControls() {
  const excluded = [
    ".ksize-audio-btn",
    ".ksize-parent-listen",
    ".ksize-researcher-tools button",
  ].join(",");
  return Array.from(document.querySelectorAll("button"))
    .filter((button) => {
      if (button.matches(excluded) || button.disabled || button.hidden) return false;
      const style = window.getComputedStyle(button);
      return style.display !== "none"
        && style.visibility !== "hidden"
        && button.getClientRects().length > 0;
    })
    .map((button, index) => {
      const actionId = `${currentPreviewIndex}-${index}`;
      button.dataset.facilitatorAction = actionId;
      return {
        id: actionId,
        label: facilitatorButtonLabel(button),
        kind: facilitatorControlKind(button),
        choiceIndex: button.dataset.choiceIndex ?? null,
        ratingIndex: button.dataset.ratingIndex ?? null,
      };
    });
}

function postFacilitatorMessage(message) {
  if (!isFacilitatorMode) return;
  const payload = {
    facilitatorSession: facilitatorSessionKey,
    ...message,
  };
  facilitatorBridge?.channel?.postMessage(payload);
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(payload, window.location.origin);
  }
}

function currentFacilitatorPayload() {
  if (!facilitatorJsPsych) return null;
  const payload = makeDataPayload(facilitatorJsPsych);
  payload.facilitator_mode = true;
  payload.facilitator_session = facilitatorSessionKey;
  payload.completed_at = null;
  return payload;
}

function facilitatorDatasetStateFields() {
  return {
    datasetStatus: facilitatorDatasetState.status,
    datasetRowsSaved: facilitatorDatasetState.rowsSaved,
    datasetTotalRows: facilitatorDatasetState.totalRows,
    datasetPath: facilitatorDatasetState.path,
    datasetSessionPath: facilitatorDatasetState.sessionPath,
    datasetSessionCount: facilitatorDatasetState.sessionCount,
    datasetSavedAt: facilitatorDatasetState.savedAt,
    datasetError: facilitatorDatasetState.error,
  };
}

function publishFacilitatorDatasetStatus() {
  postFacilitatorMessage({
    type: "FACILITATOR_DATASET_STATUS",
    ...facilitatorDatasetStateFields(),
  });
}

async function postFacilitatorDatasetCheckpoint(body) {
  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => abortController.abort(), 5000);
  try {
    const response = await fetch(requestedCheckpointEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: abortController.signal,
      credentials: "same-origin",
    });
    const parsedDetails = await response.json().catch(() => null);
    const details = parsedDetails && typeof parsedDetails === "object" && !Array.isArray(parsedDetails)
      ? parsedDetails
      : {};
    const protectedReasons = new Set([
      "stale_checkpoint",
      "row_count_regression",
      "finalized_checkpoint",
    ]);
    if (response.ok && details.saved === false && protectedReasons.has(details.reason)) {
      return { ...details, sent: true, protected: true };
    }
    if (!response.ok || details.saved !== true) {
      const nonRetryableReasons = new Set([
        "session_identity_conflict",
        "same_row_count_conflict",
        "row_history_conflict",
      ]);
      const error = new Error(
        details.error
          || details.reason
          || (response.ok
            ? "Dataset save was not confirmed by the local server"
            : `Dataset save returned ${response.status}`),
      );
      error.facilitatorDatasetNonRetryable = nonRetryableReasons.has(details.reason);
      throw error;
    }
    return { sent: true, ...details };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function settleFacilitatorDatasetWaiters(sequence, result) {
  const settled = facilitatorDatasetWaiters.filter((waiter) => waiter.sequence <= sequence);
  facilitatorDatasetWaiters = facilitatorDatasetWaiters.filter((waiter) => waiter.sequence > sequence);
  settled.forEach((waiter) => waiter.resolve(result));
}

async function drainFacilitatorDatasetQueue() {
  if (facilitatorDatasetSaveInFlight) return;
  facilitatorDatasetSaveInFlight = true;
  while (facilitatorDatasetPendingRequest) {
    const request = facilitatorDatasetPendingRequest;
    facilitatorDatasetPendingRequest = null;
    let result;
    try {
      result = await postFacilitatorDatasetCheckpoint(request.body);
      facilitatorDatasetState.rowsSaved = Number(result.rows ?? request.rowCount) || 0;
      facilitatorDatasetState.totalRows = Number(result.datasetRows ?? result.rows ?? request.rowCount) || 0;
      facilitatorDatasetState.path = String(result.datasetPath || "");
      facilitatorDatasetState.sessionPath = String(result.sessionPath || "");
      facilitatorDatasetState.sessionCount = Number(result.sessionCount || 0) || 0;
      facilitatorDatasetState.savedAt = request.checkpointedAt;
      facilitatorDatasetState.error = "";
      facilitatorDatasetState.status = request.sequence === facilitatorDatasetRequestSequence
        ? "saved"
        : "saving";
    } catch (error) {
      result = {
        sent: false,
        reason: error?.name === "AbortError"
          ? "Local dataset save timed out"
          : (error?.message || "Local dataset save failed"),
      };
      if (request.sequence === facilitatorDatasetRequestSequence) {
        facilitatorDatasetState.status = "error";
        facilitatorDatasetState.error = result.reason;
        // Permit the next heartbeat/state publication to retry this same
        // row count after a brief local-server interruption.
        if (!error?.facilitatorDatasetNonRetryable) facilitatorDatasetFingerprint = "";
      }
    }
    publishFacilitatorDatasetStatus();
    settleFacilitatorDatasetWaiters(request.sequence, result);
  }
  facilitatorDatasetSaveInFlight = false;
}

function queueFacilitatorDatasetCheckpoint(payload, { force = false } = {}) {
  if (!isFacilitatorMode || !requestedCheckpointEndpoint || !payload) {
    return Promise.resolve({ sent: false, reason: "no_checkpoint_endpoint" });
  }
  const rowCount = Array.isArray(payload.rows) ? payload.rows.length : 0;
  const fingerprint = [
    payload.facilitator_session || payload.session_id,
    rowCount,
    payload.completion_status || "in_progress",
    Boolean(payload.facilitator_ended_early),
  ].join(":");
  if (!force && fingerprint === facilitatorDatasetFingerprint) return facilitatorDatasetQueue;
  facilitatorDatasetFingerprint = fingerprint;
  facilitatorDatasetRequestSequence += 1;
  const requestSequence = facilitatorDatasetRequestSequence;
  const checkpointedAt = new Date().toISOString();
  facilitatorDatasetPendingRequest = {
    sequence: requestSequence,
    rowCount,
    checkpointedAt,
    body: JSON.stringify({
      ...payload,
      dataset_checkpointed_at: checkpointedAt,
    }),
  };
  facilitatorDatasetState.status = "saving";
  facilitatorDatasetState.error = "";
  facilitatorDatasetQueue = new Promise((resolve) => {
    facilitatorDatasetWaiters.push({ sequence: requestSequence, resolve });
  });
  void drainFacilitatorDatasetQueue();
  return facilitatorDatasetQueue;
}

function persistFacilitatorProgress({ download = false } = {}) {
  const payload = currentFacilitatorPayload();
  if (!payload) return null;
  payload.saved_at = new Date().toISOString();
  const backupKey = saveLocalDataBackup(payload);
  queueFacilitatorDatasetCheckpoint(payload);
  const downloadStarted = download
    ? downloadPayloadFiles({ ...payload, completed_at: payload.saved_at })
    : false;
  return {
    payload,
    backupKey,
    backupSaved: Boolean(backupKey),
    downloadStarted,
  };
}

function publishFacilitatorState(nodeData = {}, index = currentPreviewIndex) {
  if (!isFacilitatorMode || facilitatorStudyFinished) return;
  const fallbackFollowupLines = nodeData.slide_kind === "followup_transition"
    ? [
        document.querySelector(".ksize-followup-choice")?.textContent,
        document.querySelector(".ksize-followup-transition-card h2")?.textContent,
        ...Array.from(document.querySelectorAll(".ksize-followup-transition-card > p:not(.ksize-followup-choice)"))
          .map((node) => node.textContent),
      ]
    : [];
  const script = facilitatorCurrentScript.length
    ? facilitatorCurrentScript
    : normalizeFacilitatorScript(fallbackFollowupLines);
  const progress = persistFacilitatorProgress();
  postFacilitatorMessage({
    type: "FACILITATOR_STATE",
    previewIndex: index,
    totalScreens: totalPreviewScreens,
    scriptLines: script,
    controls: collectFacilitatorControls(),
    assignment: facilitatorAssignmentSummary,
    screen: {
      ...facilitatorCurrentMeta,
      slideKind: nodeData.slide_kind || facilitatorCurrentMeta.slideKind || "",
      storyNumber: nodeData.story_number ?? facilitatorCurrentMeta.storyNumber ?? null,
      storyTotal: nodeData.story_total ?? facilitatorCurrentMeta.storyTotal ?? null,
      condition: nodeData.condition_pairing || nodeData.condition || facilitatorCurrentMeta.condition || "",
      trait: nodeData.trait || facilitatorCurrentMeta.trait || "",
    },
    rowsSaved: facilitatorJsPsych?.data.get().count?.() ?? null,
    backupKey: progress?.backupKey || "",
    backupSaved: Boolean(progress?.backupSaved),
    ...facilitatorDatasetStateFields(),
    lastActionCommandId: facilitatorBridge?.lastActionCommandId || "",
  });
}

function acknowledgeFacilitatorCommand(message, status, reason = "") {
  if (!message?.commandId) return;
  postFacilitatorMessage({
    type: "FACILITATOR_COMMAND_ACK",
    commandId: message.commandId,
    action: message.action || "",
    status,
    reason,
    previewIndex: currentPreviewIndex,
  });
}

function receiveFacilitatorCommand(message) {
  if (!isFacilitatorMode || !message || message.facilitatorSession !== facilitatorSessionKey) return;
  if (message.type !== "FACILITATOR_COMMAND") return;
  if (message.commandId && facilitatorBridge?.lastCommandId === message.commandId) return;
  if (facilitatorBridge && message.commandId) facilitatorBridge.lastCommandId = message.commandId;

  if (message.action === "ping") {
    publishFacilitatorState();
    return;
  }
  if (message.action === "export") {
    const result = persistFacilitatorProgress({ download: true });
    postFacilitatorMessage({
      type: "FACILITATOR_EXPORT_COMPLETE",
      backupKey: result?.backupKey || "",
      backupSaved: Boolean(result?.backupSaved),
      downloadStarted: Boolean(result?.downloadStarted),
    });
    return;
  }
  if (message.action === "end") {
    facilitatorEndedEarly = true;
    facilitatorCloseAfterFinish = Boolean(message.closeAfterFinish);
    persistFacilitatorProgress();
    acknowledgeFacilitatorCommand(message, "accepted");
    facilitatorJsPsych?.endExperiment?.("Session ended by the researcher.");
    return;
  }
  if (message.action === "activate") {
    if (Number(message.previewIndex) !== currentPreviewIndex) {
      acknowledgeFacilitatorCommand(message, "rejected", "stale_screen");
      publishFacilitatorState();
      return;
    }
    const button = document.querySelector(`[data-facilitator-action="${CSS.escape(String(message.actionId || ""))}"]`);
    if (!button || button.disabled) {
      acknowledgeFacilitatorCommand(message, "rejected", "control_unavailable");
      publishFacilitatorState();
      return;
    }
    try {
      button.click();
    } catch (error) {
      console.warn("Could not activate the facilitator control", error);
      acknowledgeFacilitatorCommand(message, "rejected", "activation_failed");
      publishFacilitatorState();
      return;
    }
    if (facilitatorBridge) facilitatorBridge.lastActionCommandId = message.commandId || "";
    acknowledgeFacilitatorCommand(message, "accepted");
    window.setTimeout(() => publishFacilitatorState(), 50);
  }
}

function installFacilitatorBridge(jsPsych) {
  if (!isFacilitatorMode || facilitatorBridge) return;
  facilitatorJsPsych = jsPsych;
  facilitatorBridge = { channel: null, lastCommandId: "", lastActionCommandId: "" };
  document.body.classList.add("ksize-facilitator-child");
  if (isLiveShareMode) document.body.classList.add("ksize-live-share");
  if ("BroadcastChannel" in window) {
    facilitatorBridge.channel = new BroadcastChannel(`ftc-facilitator:${facilitatorSessionKey}`);
    facilitatorBridge.channel.addEventListener("message", (event) => receiveFacilitatorCommand(event.data));
  }
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    receiveFacilitatorCommand(event.data);
  });
  document.addEventListener("click", () => {
    window.setTimeout(() => publishFacilitatorState(), 50);
  }, true);
  postFacilitatorMessage({ type: "FACILITATOR_READY" });
}

async function postDataPayload(payload) {
  if (!requestedDataEndpoint) return { sent: false, reason: "no_endpoint" };
  await fetch(requestedDataEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return { sent: true, reason: "posted_no_cors" };
}

async function handleStudyFinish(jsPsych) {
  facilitatorStudyFinished = true;
  const payload = makeDataPayload(jsPsych);
  payload.completion_status = facilitatorEndedEarly ? "ended_by_researcher" : "completed";
  const backupKey = saveLocalDataBackup(payload);
  const datasetResult = isFacilitatorMode
    ? await queueFacilitatorDatasetCheckpoint(payload, { force: true })
    : { sent: false, reason: "not_facilitator_mode" };
  const result = await postDataPayload(payload).catch((error) => ({
    sent: false,
    reason: error.message || "post_failed",
  }));
  const downloadStarted = shouldDownloadData ? downloadPayloadFiles(payload) : false;
  const completionMessage = {
      type: "GAME_COMPLETE",
      study: payload.study,
      session_id: payload.session_id,
      chs_child_id: payload.chs_child_id,
      chs_response_id: payload.chs_response_id,
      data_posted: result.sent,
      backup_key: backupKey,
      backup_saved: Boolean(backupKey),
      download_started: downloadStarted,
      dataset_saved: Boolean(datasetResult.sent),
      dataset_rows: Number(datasetResult.rows || payload.rows?.length || 0),
      dataset_total_rows: Number(datasetResult.datasetRows || datasetResult.rows || payload.rows?.length || 0),
      dataset_session_count: Number(datasetResult.sessionCount || facilitatorDatasetState.sessionCount || 0),
      dataset_path: datasetResult.datasetPath || facilitatorDatasetState.path || "",
      dataset_session_path: datasetResult.sessionPath || facilitatorDatasetState.sessionPath || "",
      ended_early: facilitatorEndedEarly,
      payload,
  };
  if (isFacilitatorMode) {
    const { payload: omittedPayload, ...facilitatorCompletionMessage } = completionMessage;
    postFacilitatorMessage(facilitatorCompletionMessage);
  } else {
    if (window.opener) window.opener.postMessage(completionMessage, "*");
    if (window.parent && window.parent !== window) window.parent.postMessage(completionMessage, "*");
  }
  if (shouldDownloadData || params.get("showDataStatus") === "1") {
    const saveSummary = csvOnlyExport
      ? (backupKey
          ? "Responses were saved in this browser, and the CSV download has started."
          : "The CSV download has started.")
      : (result.sent
          ? "Submitted to the data endpoint."
          : (datasetResult.sent
            ? "Saved to the combined local dataset."
            : (backupKey ? "Saved as a local browser backup." : "A local browser backup could not be created; use the download buttons below.")));
    document.body.innerHTML = `
      <main class="ksize-shell">
        <section class="ksize-screen ksize-done-screen">
          <h1 class="ksize-title">${facilitatorEndedEarly ? "Session ended" : "Data saved"}</h1>
          <p class="ksize-text">${saveSummary}</p>
          ${csvOnlyExport ? "" : `<p class="ksize-small">Backup key: ${escapeHtml(backupKey || "not available")}</p>`}
          ${isLiveShareMode ? `<p class="ksize-small"><strong>Researcher:</strong> Stop the Zoom recording now, then keep this page open until ${csvOnlyExport ? "the CSV has" : "both files have"} downloaded.</p>` : ""}
          <div class="ksize-controls">
            ${csvOnlyExport ? "" : `<button class="ksize-next-btn ksize-icon-btn" type="button" data-download-json>
              <span class="ksize-icon-symbol" aria-hidden="true">↓</span>
              <span class="ksize-icon-label">JSON</span>
            </button>`}
            <button class="ksize-next-btn ksize-icon-btn" type="button" data-download-csv>
              <span class="ksize-icon-symbol" aria-hidden="true">↓</span>
              <span class="ksize-icon-label">${csvOnlyExport ? "Download CSV again" : "CSV"}</span>
            </button>
          </div>
        </section>
      </main>
    `;
    document.querySelector("[data-download-json]")?.addEventListener("click", () => {
      const safeId = String(payload.session_id || "session").replace(/[^a-zA-Z0-9_-]/g, "_");
      downloadTextFile(`who-will-help_${safeId}.json`, JSON.stringify(payload, null, 2), "application/json");
    });
    document.querySelector("[data-download-csv]")?.addEventListener("click", () => {
      const safeId = String(payload.session_id || "session").replace(/[^a-zA-Z0-9_-]/g, "_");
      downloadTextFile(`who-will-help_${safeId}.csv`, rowsToCsv(payloadRowsForExport(payload)), "text/csv");
    });
  }
  if (facilitatorCloseAfterFinish && (backupKey || datasetResult.sent)) {
    window.setTimeout(() => window.close(), 2000);
  }
}

function optionAudioText(options) {
  return options.join(". ") + ".";
}

function audioTextForSlide(slide) {
  if (slide.kind === "response" && OPTION_LABELS[slide.trait]) {
    return optionAudioText(OPTION_LABELS[slide.trait]);
  }
  return slide.text;
}

function ratingOptionCueForSlide(slide) {
  if (slide.kind !== "response" || requestedVoiceProfile === "relkind") return null;
  const cue = ratingOptionCueManifest?.scales?.[slide.trait];
  const expectedText = optionAudioText(OPTION_LABELS[slide.trait] || []);
  if (ratingOptionCueManifest?.voiceProfile !== AUDIO_VERSION) return null;
  if (!cue || !Array.isArray(cue.startsSeconds) || cue.startsSeconds.length !== 3) return null;
  if (!cue.startsSeconds.every((start) => Number.isFinite(start))) return null;
  if (normalizeAudioText(cue.text) !== normalizeAudioText(expectedText)) return null;
  if (normalizeAudioSrc(cue.audio) !== normalizeAudioSrc(canonicalAudioPathForText(expectedText))) return null;
  return cue;
}

function questionTextForResponse(chunk, slide) {
  if (slide.kind !== "response" || !slide.trait) return "";
  return chunk.slides.find((candidate) =>
    candidate.kind === "question" && candidate.trait === slide.trait
  )?.text || "";
}

function ratingFocusLabel(chunk) {
  return chunk.displayFocusLabel || "Questions are about the person inside the box.";
}

function localImage(src) {
  return src ? { src, width: 1920, height: 1080, local: true } : null;
}

function displayImageSrc(src) {
  if (/^(data:|blob:)/.test(String(src || ""))) return src;
  const previewMap = window.FTC_PREVIEW_ASSET_MAP;
  if (previewMap && window.FTC_ACTIONS_LOCAL) {
    const original = String(src || "");
    const mapped = previewMap[original] || previewMap[assetUrl(original).split("?")[0]];
    if (!mapped) throw new Error(`The preview has no verified local picture for ${original}`);
    return mapped;
  }
  const resolved = assetUrl(src);
  const source = String(src || "");
  const version = source.startsWith(TEACHER_CLASSMATE_GENERATED_ROOT)
    ? TEACHER_CLASSMATE_ASSET_VERSION
    : (source.startsWith(HOME_SCHOOL_GENERATED_ROOT) ? HOME_SCHOOL_ASSET_VERSION : "");
  if (!version) return resolved;
  const separator = resolved.includes("?") ? "&" : "?";
  return `${resolved}${separator}v=${version}`;
}

function imageHtml(images, className = "") {
  if (!images?.length) return "";
  return `<div class="ksize-images ${className}">
    ${images.map((img) => `<img src="${escapeHtml(displayImageSrc(img.src))}" alt="">`).join("")}
  </div>`;
}

function singleImageHtml(image, className = "") {
  if (!image) return "";
  return `<div class="ksize-slide-image ${className}">
    <img src="${escapeHtml(displayImageSrc(image.src))}" alt="">
  </div>`;
}

function introImageForSlide(trial, slide, slideIndex) {
  return localImage(introImageFixes[`${trial.id}|${slideIndex}`]) || slide.images[0];
}

function selectRoleSet(seedText, forcedRoleSet) {
  const normalized = String(forcedRoleSet || "").toLowerCase();
  if (["woman", "women", "female", "mom"].includes(normalized)) return "woman";
  if (["man", "men", "male", "dad"].includes(normalized)) return "man";
  if (["family", "family-teacher", "family_teacher", "mixed", "third"].includes(normalized)) return "family";
  const rng = makeRng(`${seedText}:role-set`);
  return rng() < 0.5 ? "woman" : "man";
}

function normalizeRoleSet(roleSet) {
  const normalized = String(roleSet || "").toLowerCase();
  if (["woman", "women", "female", "mom"].includes(normalized)) return "woman";
  if (["man", "men", "male", "dad"].includes(normalized)) return "man";
  if (["family", "family-teacher", "family_teacher", "mixed", "third"].includes(normalized)) return "family";
  return "";
}

function balancedAssignment(assignmentKey, forcedRoleSet, forcedEvent, forcedContext = "", contextStudyActive = false, assignmentKeySource = "") {
  const roleOptions = contextStudyActive ? ["woman", "man", "family"] : ["woman", "man"];
  const eventOptions = EVENT_SUFFIXES;
  const contextOptions = contextStudyActive ? STUDY_CONTEXTS : [""];
  const roleForced = normalizeRoleSet(forcedRoleSet);
  const eventForced = EVENT_SUFFIXES.includes(forcedEvent) ? forcedEvent : "";
  const contextForced = normalizeStudyContext(forcedContext);
  const baseHash = hashSeed(assignmentKey || requestedSeed);
  const cell = baseHash % (roleOptions.length * eventOptions.length * contextOptions.length);
  const roleIndex = contextStudyActive ? Math.floor(cell / 6) : cell % roleOptions.length;
  const eventIndex = contextStudyActive
    ? Math.floor((cell % 6) / 2)
    : Math.floor(cell / roleOptions.length) % eventOptions.length;
  const contextIndex = contextStudyActive ? cell % 2 : 0;
  return {
    roleSet: roleForced || roleOptions[roleIndex],
    eventSuffix: eventForced || eventOptions[eventIndex],
    context: contextForced || contextOptions[contextIndex],
    cell,
    method: assignmentKeySource
      ? `${assignmentKeySource}_hash`
      : (assignmentKey ? "participant_hash" : `${requestedSeedSource}_hash`),
  };
}

function describeActualAssignment(
  internalAssignment, selectedRoleSet, selectedEventSuffix,
  roleSelectedByConfig, eventSelectedByConfig
) {
  const cell = ["HUG", "FOOD", "HELP"].indexOf(selectedEventSuffix) + 1;
  if (selectedRoleSet !== "actions-core" || cell < 1) throw new Error("Invalid actions-core assignment.");
  return {
    method: eventSelectedByConfig ? "actions_core_url_selected_preview" : "actions_core_deterministic_preview",
    roleMethod: "fixed_actions_core",
    eventMethod: eventSelectedByConfig ? "wrapper_or_url_selected" : internalAssignment.method,
    contextMethod: "not_applicable",
    cell, cellSchema: "one_based_event_3_events",
    internalHashCell: internalAssignment.cell,
    internalHashMethod: internalAssignment.method
  };
}

function canonicalPrimaryCell(roleSet, eventSuffix, context = "", contextStudyActive = false) {
  const roleIndex = ["woman", "man", "family"].indexOf(roleSet);
  const eventIndex = ["HUG", "FOOD", "HELP"].indexOf(eventSuffix);
  if (roleIndex < 0 || eventIndex < 0) return null;
  if (!contextStudyActive) return eventIndex * 3 + roleIndex + 1;
  const contextIndex = STUDY_CONTEXTS.indexOf(normalizeStudyContext(context));
  return contextIndex < 0 ? null : roleIndex * 6 + eventIndex * 2 + contextIndex + 1;
}

function externalAssignmentRequested() {
  return Boolean(
    requestedAssignmentId
      || requestedAssignmentMethod
      || requestedAllocatorVersion
      || requestedPrimaryCellRaw
      || requestedRatingPlanRaw
      || requestedVisualPlanRaw
  );
}

function validateExternalAssignment() {
  if (requestedRatingPlan && ![1,2].includes(requestedRatingPlan)) throw new Error("Action rating plan must be 1 or 2.");
  if (requestedVisualPlan && ![1,2,3,4].includes(requestedVisualPlan)) throw new Error("Action visual plan must be 1–4.");
  return false;
}

function visualPlanMapForSession(roleSet, number) {
  return FTC_ACTIONS_ALLOCATION.visualPlanMap(number || 1);
}

function selectPartOrder(seedText, forcedPartOrder) {
  const normalized = String(forcedPartOrder || "").toLowerCase();
  if (["ratings-first", "dyad-first", "people-first", "likert-first"].includes(normalized)) return "ratings-first";
  if (["stories-first", "event-first", "choice-first", "hug-first"].includes(normalized)) return "stories-first";
  return hashSeed(`${seedText}:part-order`) % 2 === 0 ? "stories-first" : "ratings-first";
}

function selectedConditionsForSet(setName, roleSet) {
  const normalizedSet = String(setName || "").toLowerCase();
  if (normalizedSet === "all" && !isCurrentChsV76Study) return null;
  const withoutTeacherClassmate = (conditions) => isCurrentChsV76Study
    ? conditions.filter((condition) => condition !== "TEACHER-CLASSMATE")
    : conditions;
  if (isFamilyConditionSet(setName, roleSet)) {
    return withoutTeacherClassmate(FAMILY_ROLE_CONDITIONS);
  }
  return withoutTeacherClassmate(roleSet === "man" ? MAN_ROLE_CONDITIONS : CORE_CONDITIONS);
}

function isFamilyConditionSet(setName, roleSet) {
  const normalizedSet = String(setName || "").toLowerCase();
  return ["family", "mixed", "third", "parent-peer"].includes(normalizedSet)
    || String(roleSet || "").toLowerCase() === "family";
}

function onePairSchedulesForSession() { return [{actionPlan:1},{actionPlan:2}]; }

function wantsAllFamilyDyads(mode) {
  return ["all", "all10", "all-10", "all-pairs", "both", "full"].includes(String(mode || "").toLowerCase());
}

function trialColor(trial) {
  return trial?.blocks.INTRO?.color || "";
}

/* The imported manifest uses broad names such as GREEN and BLUE for several
   genuinely different character fills. Balanced visual plans are validated
   against the exact rendered palette, not those lossy category labels. */
const EXACT_VISUAL_PALETTES = Object.freeze({
  "MOM-SISTER": ["#F2B13D", "#ED6E57"],
  "TEACHER-FRIEND": ["#F2B13D", "#ED6E57"],
  "MOM-TEACHER": ["#81D653", "#FFD100"],
  "SISTER-FRIEND": ["#81D653", "#FFD100"],
  "DAD-BROTHER": ["#893DF6", "#4CA98F"],
  "DAD-TEACHER": ["#A9A9A9", "#92902C"],
  "BROTHER-FRIEND": ["#A9A9A9", "#92902C"],
  "BESTFRIEND-FRIEND": ["#1432F5", "#EB52F7"],
  "MOM-DAD": ["#8DD3FB", "#F19AC8"],
  "SISTER-BROTHER": ["#8DD3FB", "#F19AC8"],
  "DAD-KID": ["#64D4CE", "#7B80F7"],
  "TEACHER-KID": ["#64D4CE", "#7B80F7"],
  "MOM-KID": ["#A62B17", "#22528E"],
  "TEACHER-CLASSMATE": ["#8E2D94", "#8E2D94"],
});

function trialExactColor(trial) {
  const condition = trial?.blocks.INTRO?.condition || "";
  const variant = String(trial?.variant || "").toLowerCase();
  const palettes = EXACT_VISUAL_PALETTES[condition];
  if (!palettes) return `${condition}:${trialColor(trial)}`;
  return palettes[["b", "d"].includes(variant) ? 1 : 0];
}

function hasKnownDuplicateVisualSet(trial, selectedTrials) {
  const condition = trial?.blocks.INTRO?.condition || "";
  const conflictingCondition = condition === "DAD-KID"
    ? "TEACHER-KID"
    : (condition === "TEACHER-KID" ? "DAD-KID" : "");
  if (!conflictingCondition) return false;
  return selectedTrials.some((selectedTrial) =>
    selectedTrial?.blocks.INTRO?.condition === conflictingCondition
      && trialColor(selectedTrial) === trialColor(trial)
  );
}

function shuffleAvoidingAdjacentColors(items, rng) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const shuffled = shuffle(items, rng);
    const hasAdjacentRepeat = shuffled.some((trial, idx) =>
      idx > 0 && trialColor(trial) === trialColor(shuffled[idx - 1])
    );
    if (!hasAdjacentRepeat) return shuffled;
  }
  return shuffle(items, rng);
}

function chooseUniqueColorTrials(conditionOrder, byCondition, rng, forcedVariant) {
  const selected = [];
  const usedColors = new Set();

  const search = (conditionIndex) => {
    if (conditionIndex >= conditionOrder.length) return true;
    const condition = conditionOrder[conditionIndex];
    const variants = byCondition.get(condition) || [];
    const pool = forcedVariant
      ? variants.filter((trial) => trial.variant === forcedVariant)
      : shuffle(variants, rng);
    const freshPool = pool.filter((trial) => !usedColors.has(trialColor(trial)));
    const reusedPool = pool.filter((trial) => usedColors.has(trialColor(trial)));
    // DAD-KID and TEACHER-KID share their underlying purple/blue generic
    // character art. When a color repeat is unavoidable, prefer a different
    // visual set instead of showing that exact set twice in one session.
    const preferredReusedPool = reusedPool.filter((trial) => !hasKnownDuplicateVisualSet(trial, selected));
    const duplicateVisualPool = reusedPool.filter((trial) => hasKnownDuplicateVisualSet(trial, selected));
    const orderedPool = [...freshPool, ...preferredReusedPool, ...duplicateVisualPool];

    for (const trial of orderedPool) {
      const color = trialColor(trial);
      const wasUsed = usedColors.has(color);
      if (wasUsed && freshPool.length) continue;
      selected.push(trial);
      usedColors.add(color);
      if (search(conditionIndex + 1)) return true;
      selected.pop();
      if (!wasUsed) usedColors.delete(color);
    }
    return false;
  };

  return search(0) ? selected : [];
}

function planEventSession(manifest, seed, forcedVariant, set, roleSet, visualPlan) {
  return FTC_ACTIONS_ALLOCATION.planEventSession(manifest, seed, visualPlan || 1);
}

function selectEventSuffix(seedText, forcedEvent) {
  if (EVENT_SUFFIXES.includes(forcedEvent)) return forcedEvent;
  const rng = makeRng(`${seedText}:event`);
  return EVENT_SUFFIXES[Math.floor(rng() * EVENT_SUFFIXES.length)];
}

function chooseOne(items, rng) {
  if (!items.length) return null;
  return items[Math.floor(rng() * items.length)];
}

function traitOrderForChunk(chunk) {
  const traitNames = [...new Set(chunk.slides.map((slide) => slide.trait).filter(Boolean))];
  return shuffle(traitNames, makeRng(`${requestedSeed}:dyad-traits:${chunk.scriptKey || chunk.folder}`));
}

function orderedDyadSlides(chunk, { includeIntro = true } = {}) {
  const introSlides = includeIntro ? chunk.slides.filter((slide) => slide.kind === "intro") : [];
  const ratingSlides = traitOrderForChunk(chunk).flatMap((trait) =>
    chunk.slides.filter((slide) => slide.trait === trait && slide.kind === "response")
  );
  return [...introSlides, ...ratingSlides];
}

function normalizeRatingMode(mode) {
  const normalized = String(mode || "").toLowerCase();
  if (["one-after-story", "one-after-each-story", "interleaved-one", "one-pair"].includes(normalized)) {
    return "one-after-story";
  }
  return "all-pairs";
}

function dyadRequestsForTrial(trial) {
  const requests = [];
  const condition = trial.blocks.INTRO?.condition;
  const color = trial.blocks.INTRO?.color?.toLowerCase() || null;
  const entries = CONDITION_DYAD_FOLDERS[condition] || [];
  for (const entry of entries) {
    requests.push({
      ...entry,
      condition,
      color,
      sourceVariantSlot: trial.source_variant_slot || null,
    });
  }
  return requests;
}

function dedupeDyadGroupsByRelationship(dyadGroups) {
  const seen = new Set();
  return dyadGroups.map((group) => group.filter((chunk) => {
    const key = chunk.scriptKey || `${chunk.subject}-${chunk.target}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }));
}

function selectOneDyadPerTrial(groups, eventPlan, schedule) {
  return FTC_ACTIONS_ALLOCATION.selectDyads(groups, eventPlan, schedule.actionPlan).map((group,index) => {
    group.forEach(chunk => FTC_ACTION_WORDING.bindDyad(chunk,eventPlan[index]));
    return group;
  });
}

function dyadCandidatePool(manifest, request, forcedColor = "") {
  const chunks = manifest.chunks;
  const folder = request.folder;
  const candidates = chunks.filter((chunk) => chunk.folder === folder);
  if (!candidates.length) return [];
  const sourceCandidates = request.sourceKey
    ? candidates.filter((chunk) => chunk.sourceKey === request.sourceKey)
    : [];
  const slotCandidates = request.sourceVariantSlot
    ? sourceCandidates.filter((chunk) => chunk.source_variant_slot === request.sourceVariantSlot)
    : [];
  // A requested source slot represents the identity/color source used by the
  // event trial. Never silently substitute the other slot for its follow-up.
  const constrainedSourceCandidates = request.sourceVariantSlot ? slotCandidates : sourceCandidates;
  if (request.sourceVariantSlot && !constrainedSourceCandidates.length) return [];
  const requestedColorCandidates = forcedColor
    ? constrainedSourceCandidates.filter((chunk) => chunk.color?.toLowerCase() === forcedColor)
    : [];
  const matchingSourceAndColor = request.color
    ? constrainedSourceCandidates.filter((chunk) => chunk.color?.toLowerCase() === request.color)
    : [];
  const matchingColor = request.color
    ? candidates.filter((chunk) => chunk.color?.toLowerCase() === request.color)
    : [];
  return requestedColorCandidates.length
    ? requestedColorCandidates
    : (matchingSourceAndColor.length
      ? matchingSourceAndColor
      : (constrainedSourceCandidates.length
        ? constrainedSourceCandidates
        : (matchingColor.length ? matchingColor : candidates)));
}

function selectDyadChunk(manifest, request) {
  const pool = dyadCandidatePool(manifest, request, requestedColor);
  const chunk = chooseOne(pool, makeRng(`${requestedSeed}:dyad:${request.condition}:${request.folder}`));
  if (!chunk) return null;
  return {
    ...chunk,
    familyName: chunk.scriptKey || chunk.folder,
    familyVariant: chunk.variantKey,
    sourceCondition: request.condition,
    sourceColor: request.color,
  };
}

const audio = {
  voice: null,
  current: null,
  token: 0,
  init() {
    if (isFacilitatorMode) return;
    if (!("speechSynthesis" in window)) return;
    const chooseVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      this.voice = voices.find((v) => /samantha|joanna|aria|jenny|female|english/i.test(v.name)) || voices[0] || null;
    };
    chooseVoice();
    window.speechSynthesis.addEventListener?.("voiceschanged", chooseVoice);
  },
  stop() {
    this.token += 1;
    document.body.classList.remove("ksize-audio-playing");
    if (this.current) {
      this.current.pause();
      this.current.currentTime = 0;
      this.current = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  },
  playSpeech(text) {
    if (!useSyntheticSpeech || !("speechSynthesis" in window) || !text) return Promise.resolve(false);
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.86;
      utterance.pitch = 1.08;
      utterance.volume = 1;
      if (this.voice) utterance.voice = this.voice;
      document.body.classList.add("ksize-audio-playing");
      utterance.addEventListener("end", () => {
        document.body.classList.remove("ksize-audio-playing");
        resolve(true);
      }, { once: true });
      utterance.addEventListener("error", () => {
        document.body.classList.remove("ksize-audio-playing");
        resolve(false);
      }, { once: true });
      window.speechSynthesis.speak(utterance);
    });
  },
  play(text, options = {}) {
    this.stop();
    return this.playFile(audioPathForText(text), text, options);
  },
  playFile(src, text, options = {}) {
    this.stop();
    if (isFacilitatorMode) {
      options.onStart?.();
      options.onEnd?.();
      return Promise.resolve(true);
    }
    const token = this.token;
    return new Promise((resolve) => {
      const mappedTextSrc = canonicalAudioPathForText(text);
      const suppliedSrc = normalizeAudioSrc(src);
      const isPreviewExtensionAudio = suppliedSrc.startsWith("assets/teacher_classmate/generated/audio/")
        || suppliedSrc.startsWith("assets/home_school/generated/audio/");
      const resolvedSrc = mappedTextSrc || (!text
        ? ((suppliedSrc.startsWith("audio_evelyn/") || isPreviewExtensionAudio) ? src : "")
        : "");
      if (!resolvedSrc) {
        options.onFallback?.();
        if (useSyntheticSpeech && text) {
          console.warn(`Using researcher synthetic-speech fallback for: ${text}`);
          options.onStart?.();
          this.playSpeech(text).then(resolve, () => resolve(false));
          return;
        }
        console.error(`Missing Evelyn narration for: ${text || src || "unknown text"}`);
        resolve(false);
        return;
      }
      const fileAudio = new Audio(versionedAudioSrc(resolvedSrc));
      fileAudio.volume = options.volume ?? 1;
      fileAudio.playbackRate = options.playbackRate ?? 1;
      if (options.preservePitch === false) {
        fileAudio.preservesPitch = false;
        fileAudio.mozPreservesPitch = false;
        fileAudio.webkitPreservesPitch = false;
      }
      this.current = fileAudio;
      document.body.classList.add("ksize-audio-playing");
      const reportPlaybackTime = () => {
        if (token !== this.token) return;
        options.onTimeUpdate?.(fileAudio.currentTime, fileAudio.duration);
      };
      fileAudio.addEventListener("play", () => {
        options.onStart?.();
        reportPlaybackTime();
      }, { once: true });
      fileAudio.addEventListener("timeupdate", reportPlaybackTime);
      fileAudio.addEventListener("ended", () => {
        document.body.classList.remove("ksize-audio-playing");
        options.onEnd?.();
        resolve(true);
      }, { once: true });
      fileAudio.addEventListener("error", async () => {
        document.body.classList.remove("ksize-audio-playing");
        if (token !== this.token) return resolve(false);
        options.onFallback?.();
        options.onStart?.();
        resolve(await this.playSpeech(text));
      }, { once: true });
      fileAudio.play().catch(async () => {
        document.body.classList.remove("ksize-audio-playing");
        if (token !== this.token) return resolve(false);
        options.onFallback?.();
        options.onStart?.();
        resolve(await this.playSpeech(text));
      });
    });
  },
  speak(text) {
    return this.play(text);
  },
};

async function playReviewNarration(text, explicitSrc = "") {
  return explicitSrc ? audio.playFile(explicitSrc, text) : audio.play(text);
}

function installResearcherSkip(jsPsych) {
  const existing = document.querySelector(".ksize-researcher-tools");
  if (existing) existing.remove();
  if (!showResearcherTools) return;

  const wrap = document.createElement("div");
  wrap.className = "ksize-researcher-tools";

  const jumpToPreview = (index) => {
    audio.stop();
    const targetIndex = Math.max(0, Math.min(index, totalPreviewScreens - 1));
    const url = new URL(window.location.href);
    Object.entries(currentSessionParams).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
    url.searchParams.delete("resumeBackupKey");
    url.searchParams.delete("expectedResumeRows");
    url.searchParams.set("researcherJump", "1");
    if (isFacilitatorMode && targetIndex > 0) {
      const payload = currentFacilitatorPayload();
      if (!payload) return;
      payload.rows = payload.rows.filter((row) => {
        const rowIndex = Number(row?.preview_index);
        return Number.isFinite(rowIndex) && rowIndex < targetIndex;
      });
      payload.facilitator_navigation_from = currentPreviewIndex;
      payload.facilitator_navigation_to = targetIndex;
      const backupKey = saveLocalDataBackup(payload);
      if (payload.rows.length > 0) {
        if (!backupKey) return;
        url.searchParams.set("resumeBackupKey", backupKey);
        url.searchParams.set("expectedResumeRows", String(payload.rows.length));
      }
    }
    url.searchParams.set("previewIndex", String(targetIndex));
    window.location.href = url.toString();
  };

  const start = document.createElement("button");
  start.type = "button";
  start.className = "ksize-researcher-start";
  start.textContent = "Start";
  start.title = "Jump back to the first preview screen.";
  start.disabled = currentPreviewIndex <= 0;
  start.addEventListener("click", () => jumpToPreview(0));

  const back = document.createElement("button");
  back.type = "button";
  back.className = "ksize-researcher-back";
  back.textContent = "Back";
  back.title = "Go back one preview screen.";
  back.disabled = currentPreviewIndex <= 0;
  back.addEventListener("click", () => {
    if (currentPreviewIndex <= 0) return;
    jumpToPreview(currentPreviewIndex - 1);
  });

  const button = document.createElement("button");
  button.type = "button";
  button.className = "ksize-researcher-skip";
  button.textContent = "Skip";
  button.addEventListener("click", () => {
    audio.stop();
    jsPsych.finishTrial({ researcher_skip: true });
  });

  const end = document.createElement("button");
  end.type = "button";
  end.className = "ksize-researcher-end";
  end.textContent = "End";
  end.title = "Jump to the final preview screen.";
  end.disabled = !totalPreviewScreens || currentPreviewIndex >= totalPreviewScreens - 1;
  end.addEventListener("click", () => jumpToPreview(totalPreviewScreens - 1));

  wrap.append(start, back, button, end);
  document.body.appendChild(wrap);
}

function withPreviewIndex(node, index) {
  const originalOnLoad = node.on_load;
  return {
    ...node,
    data: {
      ...(node.data || {}),
      preview_index: index,
    },
    on_load: () => {
      currentPreviewIndex = index;
      setFacilitatorScript(node.data?.facilitator_script || [], node.data || {});
      originalOnLoad?.();
      renderLiveShareScript(node.data?.facilitator_script || []);
      window.setTimeout(() => publishFacilitatorState(node.data || {}, index), 0);
    },
  };
}

function storyCounterHtml(storyNumber, storyTotal) {
  if (!storyNumber || !storyTotal) return "";
  return `<div class="ksize-story-counter">Story ${storyNumber} of ${storyTotal}</div>`;
}

function contextSpec(context = activeStudyContext) {
  return homeSchoolContextManifest?.contexts?.[context] || null;
}

function contextIntroText(context = activeStudyContext) {
  return contextSpec(context)?.intro?.text || "";
}

function contextualizedEventLines(lines, eventSuffix, context = activeStudyContext) {
  const replacements = contextSpec(context)?.events?.[eventSuffix];
  if (!replacements?.eventText || !replacements?.questionText) return [...lines];
  return [replacements.eventText, replacements.questionText, ...lines.slice(2)];
}

function audioSegmentsForNarrationLines(lines, sourceSegments = [], useContext = Boolean(activeStudyContext)) {
  return lines.map((line, index) => {
    if (useContext && index < 2) return audioPathForText(line);
    return sourceSegments[index] || audioPathForText(line);
  });
}

function contextBadgeSrc(context = activeStudyContext, { large = false } = {}) {
  const spec = contextSpec(context);
  return (large ? spec?.intro?.image?.src : spec?.badge?.src) || spec?.badge?.src || "";
}

function contextImageId(context = activeStudyContext, { intro = false } = {}) {
  const spec = contextSpec(context);
  return (intro ? spec?.intro?.image?.id : spec?.badge?.id) || spec?.badge?.id || null;
}

function contextAudioIdForText(text) {
  if (!activeStudyContext || !text) return null;
  const spec = contextSpec();
  const contextTexts = [
    spec?.intro?.text,
    ...Object.values(spec?.events || {}).flatMap((event) => [event.eventText, event.questionText]),
  ].filter(Boolean);
  if (!contextTexts.some((candidate) => normalizeAudioText(candidate) === normalizeAudioText(text))) return null;
  const mapped = normalizeAudioSrc(canonicalAudioPathForText(text));
  return mapped ? mapped.split("/").pop() : null;
}

function activeContextEventSpec() {
  return activeStudyContext && activeStudyEvent
    ? contextSpec()?.events?.[activeStudyEvent] || null
    : null;
}

function contextBadgeHtml({ large = false } = {}) {
  const src = contextBadgeSrc(activeStudyContext, { large });
  if (!src) return "";
  const alt = large ? contextSpec()?.intro?.image?.alt : contextSpec()?.badge?.alt;
  return `<img class="ksize-context-badge${large ? " ksize-context-badge-large" : ""}" src="${escapeHtml(displayImageSrc(src))}" alt="${escapeHtml(alt || "Story context")}">`;
}

function topHudHtml(storyNumber = null, storyTotal = null, { showContext = false } = {}) {
  return `
    <div class="ksize-top-hud">
      <div class="ksize-top-hud-left">${storyCounterHtml(storyNumber, storyTotal)}</div>
      <div class="ksize-top-hud-center">${showContext ? contextBadgeHtml() : ""}</div>
      <div class="ksize-top-hud-right"></div>
    </div>
  `;
}

function renderKidSlide({ trial, block, audioTexts = [], image, text, choices = [], overlayChoices = false, showText = false, slideKind = "", showNext = false, visualChoices = false, contextIntro = false, storyNumber = null, storyTotal = null }) {
  const hasChoicePrompt = choices.length > 0 && !visualChoices;
  const contextEvent = activeContextEventSpec();
  const contextOverlayText = activeStudyContext
    ? (slideKind === "story"
      ? contextEvent?.eventText || ""
      : (slideKind === "response_choices" ? contextEvent?.questionText || "" : ""))
    : "";
  const contextOverlayHtml = contextOverlayText
    ? `<div class="ksize-context-spoken-banner">${escapeHtml(contextOverlayText)}</div>`
    : "";
  const sizeNameOverlay = SIZE_VISUALS.story({ trial, block, image, text, audioTexts, slideKind, choices });
  const imageBlock = overlayChoices && image
    ? `<div class="ksize-scene-wrap size-names-story-stage${contextOverlayText ? " ksize-contextual-stimulus" : ""}">
        <img src="${escapeHtml(displayImageSrc(image.src))}" alt="" draggable="false">
        <button class="ksize-char-btn ksize-char-left${visualChoices ? " ksize-char-cue-box" : ""}" data-choice-index="0" type="button" aria-label="${escapeHtml(choices[0]?.displayLabel || "left choice")}" ${visualChoices ? "tabindex=\"-1\"" : ""}></button>
        <button class="ksize-char-btn ksize-char-right${visualChoices ? " ksize-char-cue-box" : ""}" data-choice-index="1" type="button" aria-label="${escapeHtml(choices[1]?.displayLabel || "right choice")}" ${visualChoices ? "tabindex=\"-1\"" : ""}></button>
        ${contextOverlayHtml}${sizeNameOverlay}
      </div>`
    : (image
      ? `<div class="ksize-slide-image size-names-story-stage${contextOverlayText ? " ksize-contextual-stimulus" : ""}">
          <img src="${escapeHtml(displayImageSrc(image.src))}" alt="">
          ${contextOverlayHtml}${sizeNameOverlay}
        </div>`
      : "");

  return `
    <main class="ksize-shell ksize-kid-shell">
      <section class="ksize-screen ksize-kid-screen" data-slide-kind="${escapeHtml(slideKind)}" data-context="${escapeHtml(activeStudyContext)}">
        ${topHudHtml(storyNumber, storyTotal, { showContext: Boolean(activeStudyContext) })}
        ${imageBlock}
        ${contextIntro ? `<div class="ksize-context-intro-cue">${contextBadgeHtml({ large: true })}</div>` : ""}
        ${showText && text ? `<div class="ksize-kid-text">${escapeHtml(text)}</div>` : ""}
        <div class="ksize-bottom-area">
          <div class="ksize-helper" aria-hidden="true">
            <div class="ksize-helper-face">
              <span class="ksize-eye ksize-eye-left"></span>
              <span class="ksize-eye ksize-eye-right"></span>
              <span class="ksize-mouth"></span>
            </div>
            <div class="ksize-helper-bubble">${overlayChoices && !visualChoices ? "Choose one!" : "Listen and look!"}</div>
          </div>
          <div class="ksize-controls">
            <button class="ksize-audio-btn ksize-icon-btn" type="button" aria-label="Replay">
              <span class="ksize-icon-symbol" aria-hidden="true">▶</span>
              <span class="ksize-icon-label">Replay</span>
            </button>
            ${showNext ? `
              <button class="ksize-next-btn ksize-icon-btn" type="button" aria-label="Next">
                <span class="ksize-icon-symbol" aria-hidden="true">➜</span>
                <span class="ksize-icon-label">Next</span>
              </button>
            ` : ""}
          </div>
          ${hasChoicePrompt ? `<div class="ksize-choice-page-note">Choose a glowing box to move on.</div>` : ""}
          ${showNext ? `<div class="ksize-auto-next-note">Game will keep going on its own, or press Next to move on sooner.</div>` : ""}
        </div>
      </section>
    </main>
  `;
}

function makeKidNode(jsPsych, { trial, block, suffix, image, text, audioSegments = [], audioTexts = [], choices = [], slideKind, overlayChoices = false, showText = false, autoPlay = true, autoAdvanceAfterAudio = false, partKind, partNumber, visualChoices = false, highlightChoices = false, highlightStartMs = 350, contextIntro = false, storyNumber = null, storyTotal = null }) {
  const hasChoices = choices.length > 0 && !visualChoices;
  const contextAudioIds = activeStudyContext
    ? [...new Set((audioTexts.length ? audioTexts : [text]).map(contextAudioIdForText).filter(Boolean))]
    : [];
  let replayCount = 0;
  let audioPlaybackOrLoadFailure = false;
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: renderKidSlide({ trial, block, audioTexts, image, text, choices, overlayChoices, showText, slideKind, showNext: !hasChoices, visualChoices, contextIntro, storyNumber, storyTotal }),
    choices: [],
    data: {
      trial_key: trial.id,
      trial_number: trial.number,
      variant: trial.variant,
      source_variant_slot: trial.source_variant_slot || null,
      suffix,
      study_part: partNumber,
      part_kind: partKind,
      slide_kind: slideKind,
      block_id: block.blockId,
      question_id: block.questionId,
      condition: block.condition,
      condition_pairing: block.condition,
      context: activeStudyContext || null,
      event_type: activeStudyEvent || null,
      role_set: activeStudyRoleSet || null,
      left_role_label: block.choices?.[0]?.label || null,
      right_role_label: block.choices?.[1]?.label || null,
      side_assignment: block.side || null,
      color_variant: block.color || null,
      story_order: storyNumber,
      context_image_id: activeStudyContext ? contextImageId(activeStudyContext, { intro: contextIntro }) : null,
      context_audio_id: contextAudioIds[0] || null,
      context_audio_ids: contextAudioIds.join(",") || null,
      context_intro_text: activeStudyContext ? contextIntroText() : null,
      context_event_line_1: activeContextEventSpec()?.eventText || null,
      context_event_line_2: activeContextEventSpec()?.questionText || null,
      side: block.side,
      color: block.color,
      relationship_status: trial.relationship_status || block.relationship_status || null,
      design_extension: trial.design_extension || null,
      story_number: storyNumber,
      story_total: storyTotal,
      facilitator_script: (audioTexts.length ? audioTexts : [text]).filter(Boolean).join("\n"),
      facilitator_mode: isFacilitatorMode,
    },
    on_load: () => {
      installResearcherSkip(jsPsych);
      const loadedAt = performance.now();
      let didFinish = false;
      let highlightTimers = [];
      const contextChoiceButtons = Array.from(document.querySelectorAll(".ksize-char-btn"));
      const setContextChoicesEnabled = (enabled) => {
        if (!activeStudyContext || !hasChoices) return;
        contextChoiceButtons.forEach((button) => {
          button.disabled = !enabled;
        });
      };
      setContextChoicesEnabled(false);
      if (isFacilitatorMode) {
        contextChoiceButtons.forEach((button) => { button.disabled = false; });
      }
      const finishNext = () => {
        if (didFinish) return;
        didFinish = true;
        finishParticipantTrial(jsPsych, { response: "auto_next" }, TRIAL_ADVANCE_VALUES.next, "auto_next_page");
      };
      const finishNextAfterPause = async () => {
        await new Promise((resolve) => window.setTimeout(resolve, AUTO_ADVANCE_PAUSE_MS));
        finishNext();
      };
      const clearHighlights = () => {
        highlightTimers.forEach((timer) => clearTimeout(timer));
        highlightTimers = [];
        document.querySelectorAll(".ksize-char-btn").forEach((button) => {
          button.classList.remove("ksize-char-name-cue");
        });
      };
      const highlightChoiceNames = () => {
        if (!highlightChoices) return;
        clearHighlights();
        const buttons = Array.from(document.querySelectorAll(".ksize-char-btn"));
        const optionLabels = String(text || "").split(/\s+or\s+/i);
        const firstLabelMs = optionLabels[0] ? estimatedSpeechMs(optionLabels[0]) : 1150;
        const cueGapMs = Math.max(900, Math.min(1750, firstLabelMs - 250));
        buttons.forEach((button, idx) => {
          highlightTimers.push(setTimeout(() => {
            buttons.forEach((item) => item.classList.remove("ksize-char-name-cue"));
            button.classList.add("ksize-char-name-cue");
          }, highlightStartMs + idx * cueGapMs));
        });
        highlightTimers.push(setTimeout(() => {
          buttons.forEach((item) => item.classList.remove("ksize-char-name-cue"));
        }, highlightStartMs + buttons.length * cueGapMs + 700));
      };
      const playAudio = async ({ advanceWhenDone = false } = {}) => {
        clearHighlights();
        setContextChoicesEnabled(false);
        let attemptFailed = false;
        const narrationItems = audioTexts.length
          ? audioTexts.map((audioText, index) => ({
              src: audioSegments[index] || audioPathForText(audioText),
              text: audioText,
            }))
          : audioSegments.map((segment) => ({ src: segment, text: text || "" }));
        for (const [index, item] of narrationItems.entries()) {
          const isChoiceOptions = highlightChoices && index === narrationItems.length - 1;
          const played = await audio.playFile(item.src, item.text, isChoiceOptions ? {
            onStart: highlightChoiceNames,
            onEnd: clearHighlights,
          } : {});
          if (!played) {
            attemptFailed = true;
            audioPlaybackOrLoadFailure = true;
            audioPlaybackFailureCount += 1;
            break;
          }
        }
        clearHighlights();
        if (attemptFailed) return;
        setContextChoicesEnabled(true);
        if (advanceWhenDone && autoAdvanceAfterAudio && !hasChoices) await finishNextAfterPause();
      };
      document.querySelector(".ksize-audio-btn")?.addEventListener("click", () => {
        replayCount += 1;
        playAudio();
      });
      document.querySelector(".ksize-next-btn")?.addEventListener("click", () => {
        if (didFinish) return;
        didFinish = true;
        clearHighlights();
        audio.stop();
        finishParticipantTrial(jsPsych, { response: "next" }, TRIAL_ADVANCE_VALUES.next, "next_page");
      });
      document.querySelectorAll(".ksize-char-btn").forEach((button) => {
        if (visualChoices) return;
        button.addEventListener("click", () => {
          if (didFinish) return;
          didFinish = true;
          clearHighlights();
          audio.stop();
          const idx = Number(button.dataset.choiceIndex);
          finishParticipantTrial(jsPsych, {
            response: idx,
            choice_index: idx,
            choice_id: choices[idx]?.id || null,
            choice_label: choices[idx]?.label || null,
            choice_analysis_label: choices[idx]?.analysis_label || choices[idx]?.label || null,
            choice_relationship_status: choices[idx]?.relationship_status || null,
            choice_focal_binary: null,
            choice_context_associated_binary: null,
            response_time_ms: Math.round(performance.now() - loadedAt),
            response_missing: false,
          }, TRIAL_ADVANCE_VALUES.choice, "story_choice");
        });
      });
      if (autoPlay && !isFacilitatorMode) {
        setTimeout(() => playAudio({ advanceWhenDone: autoAdvanceAfterAudio }), 250);
      }
    },
    on_finish: (data) => {
      audio.stop();
      data.replay_count = replayCount;
      data.audio_playback_or_load_failure = audioPlaybackOrLoadFailure;
      if (data.response_time_ms == null) data.response_time_ms = data.rt ?? null;
      if (slideKind === "response_choices" && data.response_missing == null) {
        data.response_missing = data.choice_index == null;
      }
    },
  };
}

function estimatedSpeechMs(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1300, Math.min(5200, words * 390));
}

function buildEventTrialNodes(jsPsych, trial, trialIndex, totalTrials, eventSuffix, partKind, partNumber) {
  return trial.blockOrder.flatMap((suffix) => {
    const block = trial.blocks[suffix];
    if (!block) return [];
    if (suffix !== "INTRO" && suffix !== eventSuffix) return [];
    if (suffix === "INTRO") {
      const mapped = window.FTC_ACTION_MAP[trial.id];
      if (!mapped) throw new Error(`No verified action movie for ${trial.id}`);
      return [FTCActionTrial.makeNode({
        jsPsych, variantId: mapped.adultVariant,
        videoSrc: window.FTC_ACTIONS_LOCAL ? `actions-component/media/${mapped.adultVariant}.mp4` : mapped.videoUrl,
        introAudioSrc: window.SIZE_AUDIO_MAP[FTCActionTrial.introCaption],
        color: mapped.color, silent: window.FTC_SILENT_TEST === true, advanceDelayMs: 1200,
        data: {trial_key:trial.id, trial_number:trial.number, variant:trial.variant,
          story_number:trialIndex+1, story_total:totalTrials, slide_kind:"action_movie",
          story_order:trialIndex+1, suffix:"INTRO", condition:block.condition,
          event_type:eventSuffix, facilitator_script:FTCActionTrial.introCaption},
        onMount: () => installResearcherSkip(jsPsych)
      })];
    }

    const baseLines = block.text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    const lines = activeStudyContext
      ? contextualizedEventLines(baseLines, eventSuffix)
      : baseLines;
    const narrationAudioSegments = audioSegmentsForNarrationLines(
      lines,
      block.audioSegments || [],
      Boolean(activeStudyContext),
    );
    const nodes = [];
    const storyImages = block.choices?.length ? block.images.slice(0, -1) : block.images;
    const storyLines = lines.slice(0, storyImages.length);
    storyLines.forEach((line, idx) => {
      nodes.push(makeKidNode(jsPsych, {
        trial,
        block,
        suffix,
        image: storyImages[idx] || block.images[0],
        text: line,
        audioSegments: narrationAudioSegments[idx] ? [narrationAudioSegments[idx]] : [],
        audioTexts: [line],
        choices: [],
        slideKind: "story",
        showText: false,
        autoAdvanceAfterAudio: true,
        partKind,
        partNumber,
        storyNumber: trialIndex + 1,
        storyTotal: totalTrials,
      }));
    });

    const responseImage = block.images.at(-1) || null;
    const responseLines = lines.slice(storyLines.length);
    const responseAudio = narrationAudioSegments.slice(storyLines.length);
    if (block.choices?.length && responseLines.length > 1) {
      const questionLines = responseLines.slice(0, -1);
      const questionAudio = responseAudio.slice(0, -1);
      const optionLine = responseLines.at(-1);
      const optionAudio = responseAudio.at(-1) ? [responseAudio.at(-1)] : [];
      nodes.push(makeKidNode(jsPsych, {
        trial,
        block,
        suffix,
        image: responseImage,
        text: optionLine,
        audioSegments: [...questionAudio, ...optionAudio],
        audioTexts: [...questionLines, optionLine],
        choices: block.choices || [],
        slideKind: "response_choices",
        overlayChoices: Boolean(responseImage),
        showText: false,
        autoPlay: true,
        highlightChoices: true,
        highlightStartMs: 350,
        partKind,
        partNumber,
        storyNumber: trialIndex + 1,
        storyTotal: totalTrials,
      }));
    }
    return nodes;
  });
}

function makeFollowupTransitionNode(jsPsych, trial, chunk, storyNumber, storyTotal) {
  const followupText = chunk.displayFollowupText
    || "Now let's answer some questions about these two people.";
  let choiceLabel = "";
  let choiceText = "";
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <main class="ksize-shell ksize-kid-shell">
        <section class="ksize-screen ksize-followup-transition-screen">
          ${topHudHtml(storyNumber, storyTotal)}
          <div class="ksize-followup-transition-card">
            <div class="ksize-followup-check" aria-hidden="true">✓</div>
            <p class="ksize-followup-choice" data-followup-choice>Thanks for choosing!</p>
            <h2>${escapeHtml(followupText)}</h2>
            <p>${escapeHtml(FOLLOWUP_MEET_TEXT)}</p>
          </div>
          <div class="ksize-bottom-area">
            <div class="ksize-controls">
              <button class="ksize-audio-btn ksize-icon-btn" type="button" aria-label="Replay">
                <span class="ksize-icon-symbol" aria-hidden="true">▶</span>
                <span class="ksize-icon-label">Replay</span>
              </button>
              <button class="ksize-next-btn ksize-icon-btn" type="button" aria-label="Continue">
                <span class="ksize-icon-symbol" aria-hidden="true">➜</span>
                <span class="ksize-icon-label">Continue</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    `,
    choices: [],
    data: {
      trial_key: trial.id,
      slide_kind: "followup_transition",
      dyad_id: chunk.id,
      dyad_script_key: chunk.scriptKey,
      followup_subject: chunk.subject,
      followup_target: chunk.target,
      source_condition: chunk.sourceCondition || trial.blocks.INTRO?.condition || null,
      condition_pairing: trial.blocks.INTRO?.condition || chunk.sourceCondition || null,
      context: activeStudyContext || null,
      event_type: activeStudyEvent || null,
      role_set: activeStudyRoleSet || null,
      context_image_id: null,
      context_audio_id: null,
      source_variant_slot: chunk.source_variant_slot || trial.source_variant_slot || null,
      relationship_status: chunk.relationship_status ?? null,
      source_condition_relationship_status: chunk.source_relationship_status || trial.relationship_status || null,
      story_number: storyNumber,
      story_total: storyTotal,
      facilitator_script: [followupText, FOLLOWUP_MEET_TEXT].join("\n"),
      facilitator_mode: isFacilitatorMode,
    },
    on_load: () => {
      installResearcherSkip(jsPsych);
      let didFinish = false;
      let playToken = 0;
      let replayCount = 0;
      let audioPlaybackOrLoadFailure = false;
      const choiceRows = jsPsych.data.get().filter({
        trial_key: trial.id,
        slide_kind: "response_choices",
      }).last(1).values();
      choiceLabel = String(choiceRows[0]?.choice_label || "").toUpperCase();
      choiceText = FTC_ACTION_WORDING.confirmation(trial, choiceRows[0]?.choice_index ?? choiceLabel);
      const choiceAudio = audioPathForText(choiceText);
      const choiceNode = document.querySelector("[data-followup-choice]");
      if (choiceNode) choiceNode.textContent = choiceText;
      setFacilitatorScript([choiceText, followupText, FOLLOWUP_MEET_TEXT], {
        slideKind: "followup_transition",
        storyNumber,
        storyTotal,
        condition: trial.blocks.INTRO?.condition || chunk.sourceCondition || "",
      });

      const finishTransition = (response, label) => {
        if (didFinish) return;
        didFinish = true;
        playToken += 1;
        audio.stop();
        finishParticipantTrial(jsPsych, {
          response,
          story_choice_label: choiceLabel || null,
          choice_confirmation_text: choiceText,
          followup_orientation_text: followupText,
          followup_meet_text: FOLLOWUP_MEET_TEXT,
          replay_count: replayCount,
          audio_playback_or_load_failure: audioPlaybackOrLoadFailure,
        }, 0, label);
      };
      const playAudio = async ({ advanceWhenDone = false } = {}) => {
        playToken += 1;
        const token = playToken;
        const choicePlayed = await playReviewNarration(choiceText, choiceAudio);
        if (!choicePlayed) {
          audioPlaybackOrLoadFailure = true;
          audioPlaybackFailureCount += 1;
          return;
        }
        if (token !== playToken || didFinish) return;
        await new Promise((resolve) => window.setTimeout(resolve, 140));
        if (token !== playToken || didFinish) return;
        const followupPlayed = await playReviewNarration(followupText);
        if (!followupPlayed) {
          audioPlaybackOrLoadFailure = true;
          audioPlaybackFailureCount += 1;
          return;
        }
        if (token !== playToken || didFinish) return;
        await new Promise((resolve) => window.setTimeout(resolve, 140));
        if (token !== playToken || didFinish) return;
        const meetPlayed = await playReviewNarration(FOLLOWUP_MEET_TEXT);
        if (!meetPlayed) {
          audioPlaybackOrLoadFailure = true;
          audioPlaybackFailureCount += 1;
          return;
        }
        if (!advanceWhenDone || token !== playToken || didFinish) return;
        await new Promise((resolve) => window.setTimeout(resolve, AUTO_ADVANCE_PAUSE_MS));
        if (token !== playToken || didFinish) return;
        finishTransition("auto_continue", "followup_transition_auto");
      };
      document.querySelector(".ksize-audio-btn")?.addEventListener("click", () => {
        replayCount += 1;
        playAudio({ advanceWhenDone: !isFacilitatorMode });
      });
      document.querySelector(".ksize-next-btn")?.addEventListener("click", () => {
        finishTransition("continue", "followup_transition");
      });
      if (!isFacilitatorMode) {
        window.setTimeout(() => playAudio({ advanceWhenDone: true }), 250);
      }
    },
    on_finish: () => audio.stop(),
  };
}

function renderSlide({ chunk, slide, index, total, storyNumber = null, storyTotal = null }) {
  const options = OPTION_LABELS[slide.trait] || [];
  const needsOrangeOutlineFix = String(slide.src || "").split("?")[0] === ORANGE_SISTER_OUTLINE_FIX_TARGET;
  const stimulusImage = needsOrangeOutlineFix
    ? `<div class="ksize-image-stage ksize-orange-outline-fix">
        <img src="${escapeHtml(displayImageSrc(slide.src))}" alt="">
        <img class="ksize-orange-outline-reference" src="${escapeHtml(displayImageSrc(ORANGE_SISTER_OUTLINE_FIX_REFERENCE))}" alt="" aria-hidden="true">
      </div>`
    : `<img src="${escapeHtml(displayImageSrc(slide.src))}" alt="">`;
  const buttons = slide.kind === "response"
    ? `<div class="ksize-rating-options">
        ${options.map((option, idx) => `
          <button class="ksize-rating-choice" data-rating-index="${idx}" type="button" aria-label="${escapeHtml(option)}">
            <span class="ksize-rating-thumb ksize-rating-thumb-${idx + 1}" aria-hidden="true">👍</span>
            <span>${escapeHtml(option)}</span>
          </button>
        `).join("")}
      </div>`
    : "";
  return `
    <main class="ksize-shell">
      <section class="ksize-screen" data-slide-kind="${escapeHtml(slide.kind)}">
        ${topHudHtml(storyNumber, storyTotal)}
        ${slide.kind === "response"
          ? `<div class="ksize-rating-focus">${escapeHtml(ratingFocusLabel(chunk))}</div>`
          : ""}
        <div class="ksize-image-wrap">
          <div class="size-names-dyad-stage">${stimulusImage}${SIZE_VISUALS.dyad({ chunk, slide })}</div>
        </div>
        ${buttons}
        <div class="ksize-bottom-area">
          <div class="ksize-helper" aria-hidden="true">
            <div class="ksize-helper-face">
              <span class="ksize-eye ksize-eye-left"></span>
              <span class="ksize-eye ksize-eye-right"></span>
              <span class="ksize-mouth"></span>
            </div>
            <div class="ksize-helper-bubble">${slide.kind === "response" ? "Pick one!" : "Listen and look!"}</div>
          </div>
          <div class="ksize-controls">
            <button class="ksize-audio-btn ksize-icon-btn" type="button" aria-label="Replay">
              <span class="ksize-icon-symbol" aria-hidden="true">▶</span>
              <span class="ksize-icon-label">Replay</span>
            </button>
            ${slide.kind !== "response" ? `
              <button class="ksize-next-btn ksize-icon-btn" type="button" aria-label="Next">
                <span class="ksize-icon-symbol" aria-hidden="true">➜</span>
                <span class="ksize-icon-label">Next</span>
              </button>
            ` : ""}
          </div>
          ${slide.kind === "response" ? `<div class="ksize-choice-page-note">Choose one answer to move on.</div>` : ""}
          ${slide.kind !== "response" ? `<div class="ksize-auto-next-note">Game will keep going on its own, or press Next to move on sooner.</div>` : ""}
        </div>
      </section>
    </main>
  `;
}

function makeSlideNode(jsPsych, chunk, slide, index, total, storyNumber = null, storyTotal = null) {
  let replayCount = 0;
  let audioPlaybackOrLoadFailure = false;
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: renderSlide({ chunk, slide, index, total, storyNumber, storyTotal }),
    choices: [],
    data: {
      slide_kind: slide.kind,
      family: chunk.familyName,
      family_variant: chunk.familyVariant,
      dyad_id: chunk.id,
      dyad_folder: chunk.folder,
      dyad_script_key: chunk.scriptKey || null,
      source_condition: chunk.sourceCondition || null,
      condition_pairing: chunk.sourceCondition || null,
      context: activeStudyContext || null,
      event_type: activeStudyEvent || null,
      role_set: activeStudyRoleSet || null,
      context_image_id: null,
      context_audio_id: null,
      source_variant_slot: chunk.source_variant_slot || null,
      subject: chunk.subject,
      target: chunk.target,
      followup_subject: chunk.subject,
      followup_target: chunk.target,
      color: chunk.color,
      relationship_status: chunk.relationship_status ?? null,
      source_condition_relationship_status: chunk.source_relationship_status || null,
      trait: slide.trait || null,
      trait_order: slide.trait ? traitOrderForChunk(chunk).indexOf(slide.trait) + 1 : null,
      followup_schedule: activeFollowupSchedule,
      image_src: slide.src,
      story_number: storyNumber,
      story_total: storyTotal,
      facilitator_script: (slide.kind === "response"
        ? [questionTextForResponse(chunk, slide), audioTextForSlide(slide)]
        : [slide.text]).filter(Boolean).join("\n"),
      facilitator_mode: isFacilitatorMode,
    },
    on_load: () => {
      installResearcherSkip(jsPsych);
      const loadedAt = performance.now();
      const buttons = Array.from(document.querySelectorAll(".ksize-rating-choice"));
      let didFinish = false;
      let playToken = 0;
      const resetOptions = () => {
        buttons.forEach((button) => {
          button.disabled = true;
          button.classList.remove("ksize-rating-visible", "ksize-rating-current", "ksize-rating-ready");
        });
      };
      const showOptionsWithoutCue = () => {
        buttons.forEach((button) => {
          button.disabled = true;
          button.classList.add("ksize-rating-visible");
          button.classList.remove("ksize-rating-current", "ksize-rating-ready");
        });
      };
      const showCurrentOption = (currentIndex) => {
        buttons.forEach((button, idx) => {
          button.disabled = true;
          button.classList.toggle("ksize-rating-visible", idx <= currentIndex);
          button.classList.toggle("ksize-rating-current", idx === currentIndex);
          button.classList.remove("ksize-rating-ready");
        });
      };
      const enableOptions = () => {
        buttons.forEach((button) => {
          button.disabled = false;
          button.classList.add("ksize-rating-visible", "ksize-rating-ready");
          button.classList.remove("ksize-rating-current");
        });
      };
      const finishSlide = (data, amount, label) => {
        if (didFinish) return;
        didFinish = true;
        playToken += 1;
        audio.stop();
        finishParticipantTrial(jsPsych, data, amount, label);
      };
      const playAudio = async ({ advanceWhenDone = !isFacilitatorMode } = {}) => {
        playToken += 1;
        const token = playToken;
        if (slide.kind === "response") {
          resetOptions();
          const questionText = questionTextForResponse(chunk, slide);
          if (questionText) {
            const questionPlayed = await audio.play(questionText);
            if (!questionPlayed) {
              audioPlaybackOrLoadFailure = true;
              audioPlaybackFailureCount += 1;
              return;
            }
            if (token !== playToken) return;
          }
        }
        const cue = ratingOptionCueForSlide(slide);
        if (slide.kind === "response" && !cue) showOptionsWithoutCue();
        const narrationPlayed = await audio.play(audioTextForSlide(slide), cue ? {
          onTimeUpdate: (currentTime) => {
            if (token !== playToken) return;
            let currentIndex = -1;
            cue.startsSeconds.forEach((start, idx) => {
              if (currentTime >= start) currentIndex = idx;
            });
            if (currentIndex >= 0) showCurrentOption(currentIndex);
          },
          onFallback: showOptionsWithoutCue,
        } : {});
        if (token !== playToken) return;
        if (!narrationPlayed) {
          audioPlaybackOrLoadFailure = true;
          audioPlaybackFailureCount += 1;
          return;
        }
        if (slide.kind === "response") {
          enableOptions();
          return;
        }
        if (!narrationPlayed) return;
        if (!advanceWhenDone) return;
        await new Promise((resolve) => window.setTimeout(resolve, AUTO_ADVANCE_PAUSE_MS));
        if (token !== playToken || didFinish) return;
        finishSlide({ response: "auto_next" }, TRIAL_ADVANCE_VALUES.next, "auto_next_page");
      };
      document.querySelector(".ksize-audio-btn")?.addEventListener("click", () => {
        replayCount += 1;
        playAudio({ advanceWhenDone: !isFacilitatorMode });
      });
      document.querySelector(".ksize-next-btn")?.addEventListener("click", () => {
        finishSlide({ response: "next" }, TRIAL_ADVANCE_VALUES.next, "next_page");
      });
      document.querySelectorAll(".ksize-rating-choice").forEach((button) => {
        button.addEventListener("click", () => {
          const idx = Number(button.dataset.ratingIndex);
          finishSlide({
            response: idx,
            rating_value: idx + 1,
            rating_label: OPTION_LABELS[slide.trait]?.[idx] || null,
            response_time_ms: Math.round(performance.now() - loadedAt),
            response_missing: false,
          }, TRIAL_ADVANCE_VALUES.rating, "rating_choice");
        });
      });
      if (slide.kind === "response") {
        resetOptions();
        if (isFacilitatorMode) enableOptions();
      }
      if (!isFacilitatorMode) setTimeout(() => playAudio({ advanceWhenDone: true }), 250);
    },
    on_finish: (data) => {
      audio.stop();
      data.replay_count = replayCount;
      data.audio_playback_or_load_failure = audioPlaybackOrLoadFailure;
      if (data.response_time_ms == null) data.response_time_ms = data.rt ?? null;
      if (slide.kind === "response" && data.response_missing == null) {
        data.response_missing = data.rating_value == null;
      }
    },
  };
}

function partTitle(partKind) {
  if (partKind === PART_INTERLEAVED) return "Let’s Play";
  return partKind === PART_EVENT ? "Choosing Game" : "People Questions";
}

function partText(partKind) {
  if (partKind === PART_INTERLEAVED) {
    return "Listen to the story, then answer the questions.";
  }
  return partKind === PART_EVENT
    ? "Now we will look at the people and choose one."
    : "Now we will answer questions about the people.";
}

function makePartBreakNode(jsPsych, partKind, partNumber, eventSuffix) {
  return {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <main class="ksize-shell">
          <section class="ksize-screen ksize-start-screen ksize-welcome-screen">
          <div class="ksize-helper ksize-helper-start" aria-hidden="true">
            <div class="ksize-helper-face">
              <span class="ksize-eye ksize-eye-left"></span>
              <span class="ksize-eye ksize-eye-right"></span>
              <span class="ksize-mouth"></span>
            </div>
            <div class="ksize-helper-bubble">Ready?</div>
          </div>
          <h1 class="ksize-title">${partNumber === 1 ? "Let’s Play" : `Game ${partNumber}`}</h1>
          ${partNumber === 1 ? "" : `<p class="ksize-text">${escapeHtml(partTitle(partKind))}</p>`}
          <p class="ksize-small">${escapeHtml(partText(partKind))}</p>
          <div class="ksize-controls">
            <button class="ksize-next-btn ksize-icon-btn" type="button" aria-label="Start">
              <span class="ksize-icon-symbol" aria-hidden="true">➜</span>
              <span class="ksize-icon-label">Start</span>
            </button>
          </div>
        </section>
      </main>
    `,
    choices: [],
    data: {
      study_part: partNumber,
      part_kind: partKind,
      slide_kind: "part_break",
      event_suffix: eventSuffix,
      facilitator_script: partNumber === 1
        ? GAME_START_TEXT
        : `Game ${partNumber}. Hit the green button to start.`,
      facilitator_mode: isFacilitatorMode,
    },
    on_load: () => {
      installResearcherSkip(jsPsych);
      const partAudioText = partNumber === 1
        ? GAME_START_TEXT
        : `Game ${partNumber}. Hit the green button to start.`;
      const partAudioSrc = partNumber === 1 ? GAME_START_AUDIO : "";
      document.querySelector(".ksize-next-btn")?.addEventListener("click", () => {
        audio.stop();
        finishParticipantTrial(jsPsych, { response: "start_part" }, 0, "start_part");
      });
      if (!isFacilitatorMode) {
        setTimeout(() => {
          if (partAudioSrc) {
            audio.playFile(partAudioSrc, partAudioText);
            return;
          }
          audio.play(partAudioText);
        }, 250);
      }
    },
    on_finish: () => audio.stop(),
  };
}

async function main() {
  const [
    dyadManifest,
    eventManifest,
    canonicalAudioManifest,
    teacherClassmateAudioManifest,
    homeSchoolAudioManifest,
    loadedHomeSchoolContextManifest,
    ratingOptionCues,
  ] = await Promise.all([
    Promise.resolve(window.SIZE_DATA.dyad),
    Promise.resolve(window.SIZE_DATA.event),
    Promise.resolve(window.SIZE_DATA.canonicalAudio),
    Promise.resolve(window.SIZE_DATA.teacherAudio),
    isHomeSchoolStudy
      ? fetch(assetUrl(HOME_SCHOOL_AUDIO_MANIFEST_URL)).then((res) => res.json())
      : Promise.resolve({ lines: [] }),
    isHomeSchoolStudy
      ? fetch(assetUrl(HOME_SCHOOL_CONTEXT_MANIFEST_URL)).then((res) => res.json())
      : Promise.resolve({ contexts: {} }),
    Promise.resolve(window.SIZE_DATA.ratingCues),
  ]);
  homeSchoolContextManifest = loadedHomeSchoolContextManifest;
  installCanonicalAudioMap(canonicalAudioManifest, teacherClassmateAudioManifest, homeSchoolAudioManifest);
  for (const [text, src] of Object.entries(window.SIZE_AUDIO_MAP || {})) {
    canonicalAudioByText.set(normalizeAudioText(text), src);
  }
  ratingOptionCueManifest = ratingOptionCues;
  introImageFixes = window.SIZE_DATA.introFixes;
  const assignment = balancedAssignment(
    isHomeSchoolStudy ? requestedAssignmentIdentity.seed : requestedParticipantId,
    requestedRoleSet,
    requestedEvent,
    requestedContext,
    isHomeSchoolStudy,
    isHomeSchoolStudy ? requestedAssignmentIdentity.source : "",
  );
  const selectedRoleSet = "actions-core";
  const selectedContext = isHomeSchoolStudy ? normalizeStudyContext(assignment.context) : "";
  if (isHomeSchoolStudy && !selectedContext) {
    throw new Error("Home/School study assignment did not resolve a locked participant context");
  }
  if (selectedContext && requestedVoiceProfile === "relkind") {
    throw new Error("Home/School study versions require the approved prerecorded Evelyn narration");
  }
  activeStudyContext = selectedContext;
  activeStudyRoleSet = selectedRoleSet;
  const selectedEventSuffix = assignment.eventSuffix;
  const externalAssignmentActive = validateExternalAssignment(
    selectedRoleSet,
    selectedEventSuffix,
    selectedContext,
    isHomeSchoolStudy,
  );
  const selectedVisualPlanMap = visualPlanMapForSession(selectedRoleSet, requestedVisualPlan);
  const eventPlan = planEventSession(
    eventManifest,
    requestedSeed,
    requestedVariant,
    requestedSet,
    selectedRoleSet,
    requestedVisualPlan,
  );
  activeStudyEvent = selectedEventSuffix;
  const assignmentMetadata = describeActualAssignment(
    assignment,
    selectedRoleSet,
    selectedEventSuffix,
    Boolean(normalizeRoleSet(requestedRoleSet)) || isFamilyConditionSet(requestedSet, requestedRoleSet),
    EVENT_SUFFIXES.includes(requestedEvent),
    selectedContext,
    Boolean(requestedContext),
    isHomeSchoolStudy,
  );
  const includesTeacherClassmate = eventPlan.some((trial) => trial.blocks.INTRO?.condition === "TEACHER-CLASSMATE");
  const resolvedStudyVersion = selectedContext
    ? `home_school_context_${selectedContext.toLowerCase()}_preview_v1`
    : (isCurrentChsV76Study
      ? "chs-polish-v76"
      : (lockedDataStudyVersion || (includesTeacherClassmate ? TEACHER_CLASSMATE_DESIGN_VERSION : "")));
  currentSessionParams = {
    seed: requestedSeed,
    session_id: currentSessionId,
    ...(requestedChsChild ? { child: requestedChsChild } : {}),
    ...(requestedChsResponse ? { response: requestedChsResponse } : {}),
    ...(requestedParticipantId ? { pid: requestedParticipantId } : {}),
    event: selectedEventSuffix,
    roleSet: selectedRoleSet,
    set: requestedSet,
    designVersion: selectedContext
      ? HOME_SCHOOL_DESIGN_VERSION
      : (isCurrentChsV76Study ? "chs-polish-v76" : (includesTeacherClassmate ? TEACHER_CLASSMATE_DESIGN_VERSION : "")),
    studyVersion: resolvedStudyVersion,
    context: selectedContext,
    contextScriptVersion: selectedContext ? HOME_SCHOOL_CONTEXT_SCRIPT_VERSION : "",
    assignmentCell: assignmentMetadata.cell,
    assignmentCellSchema: assignmentMetadata.cellSchema,
    primaryCell: externalAssignmentActive
      ? requestedPrimaryCell
      : canonicalPrimaryCell(selectedRoleSet, selectedEventSuffix, selectedContext, isHomeSchoolStudy),
    primaryCellSchema: isHomeSchoolStudy
      ? "one_based_role_major_3_role_sets_x_3_events_x_2_contexts"
      : "one_based_event_major_3_role_sets_x_3_events",
    assignmentId: externalAssignmentActive ? requestedAssignmentId : "",
    assignmentMethod: externalAssignmentActive ? requestedAssignmentMethod : assignmentMetadata.method,
    allocatorVersion: externalAssignmentActive ? requestedAllocatorVersion : "",
    assignmentKeyType: isHomeSchoolStudy ? requestedAssignmentIdentity.source : requestedSeedSource,
    visualPlan: requestedVisualPlan || null,
    visualPlanVersion: requestedVisualPlan ? BALANCED_VISUAL_PLAN_VERSION : "",
    visualPlanMap: selectedVisualPlanMap || null,
    relationshipStatus: includesTeacherClassmate ? "unspecified" : "",
    ...(requestedVariant ? { variant: requestedVariant } : {}),
    ...(requestedPartOrder ? { partOrder: requestedPartOrder } : {}),
    ...(requestedRatingMode ? { ratingMode: requestedRatingMode } : {}),
    ...(requestedFamilyLikertMode ? { familyLikert: requestedFamilyLikertMode } : {}),
    ...(requestedDataEndpoint ? { dataEndpoint: requestedDataEndpoint } : {}),
    ...(shouldDownloadData ? { downloadData: "1" } : {}),
    ...(params.get("showDataStatus") === "1" ? { showDataStatus: "1" } : {}),
    syntheticSpeech: useSyntheticSpeech ? "1" : "0",
  };
  const rawDyadGroupsByTrial = eventPlan.map((trial) => {
    const chunks = dyadRequestsForTrial(trial)
      .map((request) => selectDyadChunk(dyadManifest, request))
      .filter(Boolean);
    return shuffle(chunks, makeRng(`${requestedSeed}:dyad-order:${trial.id}`));
  });
  const selectedRatingMode = "one-after-story";
  const onePairSchedules = onePairSchedulesForSession(requestedSet, selectedRoleSet);
  if (requestedRatingPlan && (!Number.isInteger(requestedRatingPlan)
    || requestedRatingPlan < 1
    || requestedRatingPlan > onePairSchedules.length)) {
    throw new Error(`The requested rating plan must be 1–${onePairSchedules.length} for this role set.`);
  }
  const onePairScheduleIndex = requestedRatingPlan
    ? requestedRatingPlan - 1
    : hashSeed(`${requestedSeed}:one-pair-schedule`) % onePairSchedules.length;
  const onePairSchedule = onePairSchedules[onePairScheduleIndex] || onePairSchedules[0];
  const useAllFamilyDyadsAfterStory = false;
  const dyadGroupsByTrial = selectedRatingMode === "one-after-story"
    ? (useAllFamilyDyadsAfterStory
      ? rawDyadGroupsByTrial
      : selectOneDyadPerTrial(rawDyadGroupsByTrial, eventPlan, onePairSchedule))
    : dedupeDyadGroupsByRelationship(rawDyadGroupsByTrial);
  activeFollowupSchedule = selectedRatingMode === "one-after-story" && !useAllFamilyDyadsAfterStory
    ? onePairScheduleIndex
    : null;
  const allDyadChunks = dyadGroupsByTrial.flat();
  const ratingFocalRoles = allDyadChunks.map((chunk) => String(chunk.subject || "").trim().toLowerCase());
  const ratingFocalRolesUnique = new Set(ratingFocalRoles).size === ratingFocalRoles.length;
  Object.assign(currentSessionParams, {
    set:"actions-core",roleSet:"actions-core",designVersion:"ftc-actions-core-preview-v1",
    designStatus:"researcher_preview_only",
    wordingVersion:window.FTC_WORDING_MODE, actionAllocationVersion:FTC_ACTIONS_ALLOCATION.version,
    assignmentCell:assignmentMetadata.cell,primaryCell:assignmentMetadata.cell,
    primaryCellSchema:assignmentMetadata.cellSchema,assignmentCellSchema:assignmentMetadata.cellSchema,
    assignmentMethod:assignmentMetadata.method,allocatorVersion:FTC_ACTIONS_ALLOCATION.version,
    visualPlan:requestedVisualPlan || 1,visualPlanVersion:FTC_ACTIONS_ALLOCATION.version,
    visualPlanMap:selectedVisualPlanMap,
    ratingPlanMap:FTC_ACTIONS_ALLOCATION.ratingPlanMap(onePairScheduleIndex + 1)
  });
  currentSessionParams.ratingScheduleVersion = FTC_ACTIONS_ALLOCATION.version;
  currentSessionParams.ratingPlan = onePairScheduleIndex + 1;
  currentSessionParams.ratingFocalRoles = ratingFocalRoles;
  currentSessionParams.ratingFocalRolesUnique = ratingFocalRolesUnique;
  const includePairIntros = !["touch-wording", "loves-likes"].includes(window.FTC_WORDING_MODE);
  const allDyadSlides = allDyadChunks.flatMap((chunk) =>
    orderedDyadSlides(chunk, { includeIntro: includePairIntros }).map((slide) => ({ chunk, slide }))
  );
  const selectedPartOrder = selectPartOrder(requestedSeed, requestedPartOrder);
  const resolvedPartOrder = selectedRatingMode === "one-after-story"
    ? "interleaved-one-after-story"
    : selectedPartOrder;
  currentSessionParams.partOrder = resolvedPartOrder;
  // Preload only the pictures displayed by this session, from local mirrors.
  // The role-introduction pictures and other story events are not used here.
  const imagePaths = [...new Set([
    ...allDyadSlides.map(({ slide }) => displayImageSrc(slide.src)),
    ...eventPlan.flatMap((trial) =>
      (trial.blocks[selectedEventSuffix]?.images || []).map((image) => displayImageSrc(image.src))
    ),
  ])];
  audio.init();

  const jsPsych = initJsPsych({
    on_data_update: () => {
      if (!isFacilitatorMode || facilitatorStudyFinished) return;
      window.setTimeout(() => {
        if (!facilitatorStudyFinished) persistFacilitatorProgress();
      }, 0);
    },
    on_finish: () => handleStudyFinish(jsPsych),
  });
  facilitatorRestoredRowCount = restoreFacilitatorDataBackup(jsPsych);
  if (isFacilitatorMode && requestedResumeBackupKey
    && (requestedExpectedResumeRows <= 0 || facilitatorRestoredRowCount !== requestedExpectedResumeRows)) {
    facilitatorStudyFinished = true;
    postFacilitatorMessage({
      type: "FACILITATOR_RECOVERY_FAILED",
      backupKey: requestedResumeBackupKey,
      expectedRows: requestedExpectedResumeRows,
      restoredRows: facilitatorRestoredRowCount,
      reason: requestedExpectedResumeRows <= 0 ? "missing_expected_row_count" : "row_count_mismatch",
    });
    throw new Error("Recovery stopped because the saved facilitator checkpoint could not be verified.");
  }

  facilitatorAssignmentSummary = {
    studyVersion: resolvedStudyVersion,
    designVersion: currentSessionParams.designVersion,
    designStatus: currentSessionParams.designStatus,
    wordingVersion: window.FTC_WORDING_MODE,
    storyCount: eventPlan.length,
    restoredRowCount: facilitatorRestoredRowCount,
    participantKey: requestedParticipantId || requestedSeed,
    sessionId: sessionId(),
    seed: requestedSeed,
    seedSource: requestedSeedSource,
    roleSet: selectedRoleSet,
    event: selectedEventSuffix,
    context: selectedContext || null,
    assignmentCell: assignmentMetadata.cell,
    assignmentCellSchema: assignmentMetadata.cellSchema,
    primaryCell: currentSessionParams.primaryCell,
    primaryCellSchema: currentSessionParams.primaryCellSchema,
    assignmentId: currentSessionParams.assignmentId || null,
    assignmentMethod: currentSessionParams.assignmentMethod,
    allocatorVersion: currentSessionParams.allocatorVersion || null,
    ratingPlan: currentSessionParams.ratingPlan,
    visualPlan: currentSessionParams.visualPlan,
    visualPlanVersion: currentSessionParams.visualPlanVersion || null,
    visualPlanMap: currentSessionParams.visualPlanMap,
    storyOrder: eventPlan.map((trial) => trial.blocks.INTRO?.condition || ""),
    storyPlan: eventPlan.map((trial, index) => ({
      story: index + 1,
      condition: trial.blocks.INTRO?.condition || "",
      trialId: trial.id,
      variant: trial.variant,
      side: trial.blocks.INTRO?.side || null,
      color: trial.blocks.INTRO?.color || null,
      sourceVariantSlot: trial.source_variant_slot || null,
    })),
    followupSchedule: selectedRatingMode === "one-after-story" && !useAllFamilyDyadsAfterStory
      ? onePairScheduleIndex
      : null,
    followupScheduleMap: FTC_ACTIONS_ALLOCATION.ratingPlanMap(onePairScheduleIndex + 1),
    ratingScheduleVersion: RATING_SCHEDULE_VERSION,
    ratingFocalRoles,
    ratingFocalRolesUnique,
    ratingMode: selectedRatingMode,
    partOrder: resolvedPartOrder,
    traitOrders: allDyadChunks.map((chunk) => ({
      relationship: chunk.scriptKey || `${chunk.subject}-${chunk.target}`,
      order: traitOrderForChunk(chunk),
    })),
  };
  installFacilitatorBridge(jsPsych);

  jsPsych.data.addProperties({
    study: "K-SIZE-actions-core-preview",
    design_status: currentSessionParams.designStatus,
    action_wording_version: window.FTC_WORDING_MODE,
    action_allocation_version: FTC_ACTIONS_ALLOCATION.version,
    source_survey_id: eventManifest.source?.surveyId || null,
    source_survey_name: eventManifest.source?.surveyName || null,
    participant_id: requestedParticipantId || null,
    session_id: sessionId(),
    chs_child_id: requestedChsChild || null,
    chs_response_id: requestedChsResponse || null,
    data_endpoint_configured: Boolean(requestedDataEndpoint),
    data_download_requested: shouldDownloadData,
    seed: requestedSeed,
    seed_source: requestedSeedSource,
    assignment_key_type: isHomeSchoolStudy ? requestedAssignmentIdentity.source : requestedSeedSource,
    assignment_method: currentSessionParams.assignmentMethod,
    assignment_cell: assignmentMetadata.cell,
    assignment_cell_schema: assignmentMetadata.cellSchema,
    primary_cell: currentSessionParams.primaryCell,
    primary_cell_schema: currentSessionParams.primaryCellSchema,
    assignment_id: currentSessionParams.assignmentId || null,
    allocator_version: currentSessionParams.allocatorVersion || null,
    assignment_role_method: assignmentMetadata.roleMethod,
    assignment_event_method: assignmentMetadata.eventMethod,
    assignment_context_method: assignmentMetadata.contextMethod,
    internal_assignment_method: assignmentMetadata.internalHashMethod,
    internal_assignment_cell: assignmentMetadata.internalHashCell,
    role_set: selectedRoleSet,
    event_suffix: selectedEventSuffix,
    assigned_role_set: selectedRoleSet === "family" ? "FAMILY_TEACHER" : selectedRoleSet.toUpperCase(),
    assigned_event: selectedEventSuffix,
    assigned_context: selectedContext || null,
    context: selectedContext || null,
    study_version: resolvedStudyVersion || null,
    context_script_version: selectedContext ? HOME_SCHOOL_CONTEXT_SCRIPT_VERSION : null,
    context_manipulation: selectedContext ? "between_child_fixed_across_six_stories" : null,
    context_visual_treatment: selectedContext ? "matched_persistent_story_cue" : null,
    assigned_context_visual_id: selectedContext ? contextImageId(selectedContext) : null,
    part_order: resolvedPartOrder,
    rating_mode: selectedRatingMode,
    parent_setup_skipped: skipParentSetup,
    export_format: csvOnlyExport ? "csv" : "json+csv",
    design_version: currentSessionParams.designVersion,
    teacher_classmate_design_version: includesTeacherClassmate ? TEACHER_CLASSMATE_DESIGN_VERSION : null,
    teacher_classmate_condition_present: includesTeacherClassmate,
    teacher_classmate_relationship_status: includesTeacherClassmate ? "unspecified" : null,
    family_likert_mode_requested: requestedFamilyLikertMode || null,
    family_likert_mode_used: useAllFamilyDyadsAfterStory ? "all-matching-pairs" : "one-pair-schedule",
    one_pair_schedule: selectedRatingMode === "one-after-story" && !useAllFamilyDyadsAfterStory ? onePairScheduleIndex : null,
    rating_plan: selectedRatingMode === "one-after-story" && !useAllFamilyDyadsAfterStory ? onePairScheduleIndex + 1 : null,
    one_pair_schedule_map: JSON.stringify(FTC_ACTIONS_ALLOCATION.ratingPlanMap(onePairScheduleIndex + 1)),
    rating_schedule_version: RATING_SCHEDULE_VERSION,
    visual_plan: currentSessionParams.visualPlan,
    visual_plan_version: currentSessionParams.visualPlanVersion || null,
    visual_plan_map: currentSessionParams.visualPlanMap
      ? JSON.stringify(currentSessionParams.visualPlanMap)
      : null,
    rating_focal_roles: ratingFocalRoles.join(","),
    rating_focal_roles_unique: ratingFocalRolesUnique,
    requested_set: requestedSet,
    requested_color: requestedColor || null,
    n_event_trials: eventPlan.length,
    n_dyads: allDyadChunks.length,
    event_condition_order: eventPlan.map((trial) => trial.blocks.INTRO?.condition).join(","),
    event_trial_order: eventPlan.map((trial) => trial.id).join(","),
    event_source_variant_slot_order: eventPlan.map((trial) => trial.source_variant_slot || "none").join(","),
    event_color_order: eventPlan.map((trial) => trial.blocks.INTRO?.color).join(","),
    event_relationship_status_order: eventPlan.map((trial) => trial.relationship_status || "none").join(","),
    dyad_unique_relationships: allDyadChunks.map((chunk) => chunk.scriptKey || `${chunk.subject}-${chunk.target}`).join(","),
    dyad_order: allDyadChunks.map((chunk) => chunk.id).join(","),
    dyad_source_conditions: allDyadChunks.map((chunk) => `${chunk.sourceCondition}:${chunk.id}`).join(","),
    dyad_source_variant_slot_order: allDyadChunks.map((chunk) => chunk.source_variant_slot || "none").join(","),
    dyad_color_order: allDyadChunks.map((chunk) => chunk.color).join(","),
    dyad_relationship_status_order: allDyadChunks.map((chunk) => chunk.relationship_status || "none").join(","),
    dyad_source_condition_relationship_status_order: allDyadChunks.map((chunk) =>
      chunk.source_relationship_status || "none"
    ).join(","),
    dyad_trait_order: allDyadChunks.map((chunk) => `${chunk.id}:${traitOrderForChunk(chunk).join("/")}`).join(","),
    facilitator_mode: isFacilitatorMode,
    live_share_mode: isLiveShareMode,
    facilitator_session: isFacilitatorMode ? facilitatorSessionKey : null,
  });

  let dyadSlideIndex = 0;
  const storyNodes = eventPlan.flatMap((trial, idx) =>
    buildEventTrialNodes(jsPsych, trial, idx, eventPlan.length, selectedEventSuffix, PART_EVENT, 1)
  );
  const ratingNodes = selectedRatingMode === "one-after-story"
    ? []
    : dyadGroupsByTrial.flatMap((group) =>
        group.flatMap((chunk) =>
          orderedDyadSlides(chunk, { includeIntro: includePairIntros }).map((slide) => {
            const node = makeSlideNode(jsPsych, chunk, slide, dyadSlideIndex, allDyadSlides.length);
            dyadSlideIndex += 1;
            return node;
          })
        )
      );
  if (selectedRatingMode === "one-after-story") dyadSlideIndex = 0;
  const oneAfterStoryNodes = selectedRatingMode === "one-after-story"
    ? eventPlan.flatMap((trial, idx) => {
        const eventNodes = buildEventTrialNodes(jsPsych, trial, idx, eventPlan.length, selectedEventSuffix, PART_EVENT, 1);
        const dyadNodes = dyadGroupsByTrial[idx].flatMap((chunk) => [
          makeFollowupTransitionNode(jsPsych, trial, chunk, idx + 1, eventPlan.length),
          ...(includePairIntros ? [] : [FTCPairActionIntro.makeNode({
            jsPsych, trial, chunk, storyNumber:idx+1, storyTotal:eventPlan.length,
            eventType:selectedEventSuffix, onMount:() => installResearcherSkip(jsPsych)
          })]),
          ...orderedDyadSlides(chunk, { includeIntro: includePairIntros }).map((slide) => {
            const node = makeSlideNode(
              jsPsych,
              chunk,
              slide,
              dyadSlideIndex,
              allDyadSlides.length,
              idx + 1,
              eventPlan.length
            );
            dyadSlideIndex += 1;
            return node;
          }),
        ]);
        const actionMap = window.FTC_ACTION_MAP[trial.id];
        return [...eventNodes, ...dyadNodes].map(node => {
          Object.assign(node.data || (node.data={}), {
            action_source_variant:actionMap.adultVariant, action_wording_version:window.FTC_WORDING_MODE,
            left_action:actionMap.left.action,right_action:actionMap.right.action,
            left_relation:actionMap.left.relation,right_relation:actionMap.right.relation,
            left_size:actionMap.left.size,middle_size:actionMap.middleSize,right_size:actionMap.right.size
          });
          return node;
        });
      })
    : [];

  const parentPaceNote = isFacilitatorMode
    ? "The researcher controls the pace. Every page stays on screen until the researcher clicks Continue or records an answer."
    : PARENT_AUTOPLAY_NOTE;
  const parentPaceNoteShort = isFacilitatorMode
    ? "The researcher will read each page aloud and move on only when your child is ready."
    : PARENT_AUTOPLAY_NOTE_SHORT;
  const facilitatorDurationText = selectedRatingMode === "one-after-story"
    ? "It takes about ten to fifteen minutes."
    : "It takes about fifteen to thirty minutes, depending on the assigned character set.";
  const visibleSessionDuration = isFacilitatorMode
    ? (selectedRatingMode === "one-after-story" ? "10–15 minutes" : "15–30 minutes")
    : "15 minutes";
  const setupSoundTitle = isFacilitatorMode ? "Check Zoom sound" : "Turn the sound on";
  const setupSoundText = isFacilitatorMode
    ? "Make sure you can hear the researcher at a comfortable volume."
    : "Choose a comfortable listening volume.";
  const cameraSetupTitle = isFacilitatorMode
    ? "Check the Zoom camera and recording"
    : "Set up the camera for recording";
  const cameraRecordingNote = isFacilitatorMode
    ? "<strong>Researcher:</strong> Start recording in Zoom before continuing. Keep the child centered in their Zoom video during the game."
    : "<strong>Camera check:</strong> CHS checks the webcam before the game. Keep your child centered while the game records.";
  const parentWelcomeScript = isFacilitatorMode
    ? "Welcome, grown-ups! Thank you for helping your child take part. First, we'll get the screen and camera ready. Then your child will listen to stories and choose pictures on the screen. I will read each page aloud, and every page will stay on screen until I move on. You can help with the device, but please let your child choose the answers."
    : PARENT_WELCOME_TEXT;
  const parentQuickChecksScript = isFacilitatorMode
    ? `Before you begin: This is a recorded picture game about social relationships. ${facilitatorDurationText} You and your child may stop at any time. There are no right or wrong answers in this game. I will read every page aloud, so your child does not need to read. ${parentPaceNote} Now, three quick checks. Use one screen and place it in front of your child. Turn the sound to a comfortable volume. Stay close to help with the device, but let your child choose the answers.`
    : PARENT_QUICK_CHECKS_TEXT;
  const parentHandoffScript = isFacilitatorMode
    ? `Grown-up setup is finished. Now it's your child's turn. Please invite your child to sit in front of the screen. Grown-ups, you may help with the device, but please let your child choose. There are no right or wrong answers. I will read the pages aloud. ${parentPaceNoteShort} When your child is ready, press the green button to continue.`
    : PARENT_HANDOFF_TEXT;

  const parentProgressHtml = (activeStep) => {
    const labels = ["Welcome", "Quick check", "Camera", "Child’s turn"];
    return `
    <nav class="ksize-parent-progress" aria-label="Parent setup progress">
      ${labels.map((label, index) => {
        const step = index + 1;
        const state = step < activeStep ? "complete" : step === activeStep ? "active" : "";
        return `<span class="ksize-parent-progress-step ${state}"><i>${step < activeStep ? "✓" : step}</i><b>${label}</b></span>`;
      }).join("")}
    </nav>
  `;
  };
  const parentWelcomeNode = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <main class="ksize-shell ksize-setup-shell">
          <section class="ksize-screen ksize-setup-screen ksize-parent-welcome-screen">
            ${parentProgressHtml(1)}
            <header class="ksize-parent-welcome-header">
              <span class="ksize-setup-eyebrow">Find the Caregiver!</span>
              <h1 class="ksize-setup-title">Welcome, grown-ups!</h1>
              <p class="ksize-parent-welcome-lead">Thank you for helping your child take part. We’ll get set up together.</p>
            </header>
            <div class="ksize-parent-welcome-grid">
              <article class="ksize-parent-welcome-card">
                <span class="ksize-parent-welcome-icon ksize-icon-bob" aria-hidden="true">◉</span>
                <h2>Quick setup</h2>
                <p>Check the sound, screen, and camera.</p>
              </article>
              <article class="ksize-parent-welcome-card">
                <span class="ksize-parent-welcome-icon ksize-icon-pulse" aria-hidden="true">▶</span>
                <h2>Your child plays</h2>
                <p>Listen to stories and choose pictures.</p>
              </article>
              <article class="ksize-parent-welcome-card">
                <span class="ksize-parent-welcome-icon ksize-icon-heart" aria-hidden="true">♡</span>
                <h2>Stay close by</h2>
                <p>Help with the device—not the answers.</p>
              </article>
            </div>
            <div class="ksize-parent-flow-note">
              <strong>How the game moves:</strong>
              <span>${parentPaceNote}</span>
            </div>
            <button class="ksize-parent-listen ksize-parent-welcome-audio" type="button"><span aria-hidden="true">▶</span><span>Listen</span></button>
            <footer class="ksize-setup-footer">
              <p>The next pages are for the grown-up.</p>
              <button class="ksize-setup-next ksize-parent-welcome-next" type="button"><span>Let’s get set up</span><span aria-hidden="true">➜</span></button>
            </footer>
          </section>
        </main>
      `,
      choices: [],
      data: {
        slide_kind: "parent_welcome",
        facilitator_script: parentWelcomeScript,
        facilitator_mode: isFacilitatorMode,
      },
      on_load: () => {
        installResearcherSkip(jsPsych);
        const playParentWelcomeAudio = () => audio.playFile(PARENT_WELCOME_AUDIO, parentWelcomeScript);
        document.querySelector(".ksize-parent-welcome-audio")?.addEventListener("click", playParentWelcomeAudio);
        if (!isFacilitatorMode) window.setTimeout(playParentWelcomeAudio, 500);
        document.querySelector(".ksize-parent-welcome-next")?.addEventListener("click", () => {
          audio.stop();
          finishParticipantTrial(jsPsych, { response: "parent_welcome_continue" }, 0, "parent_welcome");
        });
      },
    };

  const setupNode = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <main class="ksize-shell ksize-setup-shell">
          <section class="ksize-screen ksize-setup-screen">
            ${parentProgressHtml(2)}
            <header class="ksize-setup-heading">
              <span class="ksize-setup-eyebrow">A quick note for the grown-up</span>
              <h1 class="ksize-setup-title">Get ready to play</h1>
              <p class="ksize-setup-intro">A few important details, then three quick checks.</p>
            </header>
            <div class="ksize-before-begin-card">
              <strong>Before you begin</strong>
              <span>This is a recorded picture game about social relationships</span>
              <span>${visibleSessionDuration}</span>
              <span>You and your child may stop at any time</span>
              <span>There are no right or wrong answers in this game</span>
              <span>The pages are read aloud, so your child does not need to read</span>
              <span>${parentPaceNote}</span>
            </div>
            <h2 class="ksize-quick-checks-heading">Three quick checks</h2>
            <div class="ksize-setup-list">
              <article class="ksize-setup-card">
                <span class="ksize-setup-number">1</span>
                <div class="ksize-setup-copy">
                  <h2>Make the game easy to see</h2>
                  <p>Use one screen and place it in front of your child.</p>
                </div>
                <div class="ksize-setup-picture ksize-screen-picture" aria-hidden="true">
                  <span class="ksize-monitor">
                    <span class="ksize-monitor-scene"><i></i><i></i><i></i></span>
                    <span class="ksize-monitor-stand"></span>
                  </span>
                  <span class="ksize-setup-check">✓</span>
                  <span class="ksize-setup-spark ksize-setup-spark-1">✦</span>
                </div>
              </article>
              <article class="ksize-setup-card">
                <span class="ksize-setup-number">2</span>
                <div class="ksize-setup-copy">
                  <h2>${setupSoundTitle}</h2>
                  <p>${setupSoundText}</p>
                </div>
                <div class="ksize-setup-picture ksize-sound-picture" aria-hidden="true">
                  <span class="ksize-speaker">▶</span>
                  <span class="ksize-sound-wave ksize-sound-wave-1"></span>
                  <span class="ksize-sound-wave ksize-sound-wave-2"></span>
                  <span class="ksize-sound-wave ksize-sound-wave-3"></span>
                </div>
              </article>
              <article class="ksize-setup-card">
                <span class="ksize-setup-number">3</span>
                <div class="ksize-setup-copy">
                  <h2>Let your child choose</h2>
                  <p>Help with the device, but not with answers.</p>
                  <p class="ksize-no-right-wrong-reminder">There are no right or wrong answers in this game.</p>
                </div>
                <div class="ksize-setup-picture ksize-choice-picture" aria-hidden="true">
                  <span class="ksize-choice-dot ksize-choice-dot-left">A</span>
                  <span class="ksize-choice-hand">☝</span>
                  <span class="ksize-choice-dot ksize-choice-dot-right">B</span>
                </div>
              </article>
            </div>
            <button class="ksize-parent-listen ksize-quick-checks-audio" type="button"><span aria-hidden="true">▶</span><span>Listen</span></button>
            <footer class="ksize-setup-footer">
              <button class="ksize-setup-next" type="button"><span>Ready</span><span aria-hidden="true">➜</span></button>
            </footer>
          </section>
        </main>
      `,
      choices: [],
      data: {
        slide_kind: "parent_quick_checks",
        facilitator_script: parentQuickChecksScript,
        facilitator_mode: isFacilitatorMode,
      },
      on_load: () => {
        installResearcherSkip(jsPsych);
        const playQuickChecksAudio = () => audio.playFile(PARENT_QUICK_CHECKS_AUDIO, parentQuickChecksScript);
        document.querySelector(".ksize-quick-checks-audio")?.addEventListener("click", playQuickChecksAudio);
        if (!isFacilitatorMode) window.setTimeout(playQuickChecksAudio, 500);
        document.querySelector(".ksize-setup-next")?.addEventListener("click", () => {
          audio.stop();
          finishParticipantTrial(jsPsych, { response: "setup_ready" }, 0, "setup_ready");
        });
      },
    };

  const cameraSetupNode = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <main class="ksize-shell ksize-setup-shell">
          <section class="ksize-screen ksize-setup-screen ksize-camera-screen">
            ${parentProgressHtml(3)}
            <header class="ksize-setup-heading">
              <span class="ksize-setup-eyebrow">Camera check</span>
              <h1 class="ksize-setup-title">${cameraSetupTitle}</h1>
              <p class="ksize-setup-intro">Make sure your child stays easy to see.</p>
            </header>
            <div class="ksize-camera-layout">
              <div class="ksize-camera-instructions">
                <article class="ksize-camera-tip">
                  <span class="ksize-camera-tip-number">1</span>
                  <span class="ksize-camera-tip-icon ksize-camera-center-icon" aria-hidden="true"><i></i></span>
                  <div>
                    <h2>Center the camera</h2>
                    <p>Put the screen directly in front of your child.</p>
                  </div>
                </article>
                <article class="ksize-camera-tip">
                  <span class="ksize-camera-tip-number">2</span>
                  <span class="ksize-camera-tip-icon ksize-camera-frame-icon" aria-hidden="true"><i></i></span>
                  <div>
                    <h2>Frame head and shoulders</h2>
                    <p>Keep their full face and shoulders in view.</p>
                  </div>
                </article>
                <article class="ksize-camera-tip">
                  <span class="ksize-camera-tip-number">3</span>
                  <span class="ksize-camera-tip-icon ksize-camera-light-icon" aria-hidden="true">☀</span>
                  <div>
                    <h2>Check the light</h2>
                    <p>Avoid a bright window behind your child.</p>
                  </div>
                </article>
              </div>
              <div class="ksize-camera-panel">
                <h2 class="ksize-camera-examples-title">Use these examples to check your setup</h2>
                <div class="ksize-lookit-example-stack">
                  <figure class="ksize-lookit-example ksize-camera-combined-example">
                    <img src="${escapeHtml(displayImageSrc("assets/lookit-camera-centering.png"))}" alt="Three original setup photos: a correct centered external webcam, an incorrect off-center external webcam, and a correct laptop with a built-in camera.">
                    <figcaption>
                      <span><strong>External webcam:</strong> center it above the study screen.</span>
                      <span><strong>Most families:</strong> use the camera built into your laptop.</span>
                    </figcaption>
                  </figure>
                  <figure class="ksize-lookit-example">
                    <img src="${escapeHtml(displayImageSrc("assets/lookit-monitor-setup-correct-first.png?v=camera-fix-v40"))}" alt="Two correct one-screen setups appear first, with the large monitor setup first; an incorrect two-screen setup appears last.">
                    <figcaption><strong>Use one study screen.</strong> Turn off or close other screens that might distract your child.</figcaption>
                  </figure>
                </div>
                <div class="ksize-recording-note">
                  <span class="ksize-recording-dot" aria-hidden="true"></span>
                  <p>${cameraRecordingNote}</p>
                </div>
              </div>
            </div>
            <button class="ksize-parent-listen ksize-camera-audio" type="button"><span aria-hidden="true">▶</span><span>Listen</span></button>
            <footer class="ksize-setup-footer ksize-camera-footer">
              <p>Keep this position during the game.</p>
              <button class="ksize-setup-next ksize-camera-next" type="button"><span>Finish grown-up setup</span><span aria-hidden="true">➜</span></button>
            </footer>
          </section>
        </main>
      `,
      choices: [],
      data: {
        slide_kind: "camera_setup",
        facilitator_script: PARENT_CAMERA_TEXT,
        facilitator_mode: isFacilitatorMode,
      },
      on_load: () => {
        installResearcherSkip(jsPsych);
        const playCameraAudio = () => audio.playFile(PARENT_CAMERA_AUDIO, PARENT_CAMERA_TEXT);
        document.querySelector(".ksize-camera-audio")?.addEventListener("click", playCameraAudio);
        if (!isFacilitatorMode) window.setTimeout(playCameraAudio, 500);
        document.querySelector(".ksize-camera-next")?.addEventListener("click", () => {
          audio.stop();
          finishParticipantTrial(jsPsych, { response: "camera_setup_continue" }, 0, "camera_setup");
        });
      },
    };

  const childHandoffNode = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <main class="ksize-shell ksize-setup-shell">
          <section class="ksize-screen ksize-setup-screen ksize-handoff-screen">
            ${parentProgressHtml(4)}
            <div class="ksize-handoff-complete"><span aria-hidden="true">✓</span> Grown-up setup complete</div>
            <div class="ksize-handoff-visual" aria-hidden="true">
              <div class="ksize-handoff-person ksize-handoff-grownup"><span></span><b></b></div>
              <div class="ksize-handoff-arrow">➜</div>
              <div class="ksize-handoff-person ksize-handoff-child"><span></span><b></b><i>★</i></div>
            </div>
            <header class="ksize-handoff-heading">
              <span class="ksize-setup-eyebrow">Time to switch players</span>
              <h1 class="ksize-setup-title">Now it’s your child’s turn!</h1>
              <p>Please invite your child to sit in front of the screen.</p>
            </header>
            <div class="ksize-handoff-reminder">
              <span aria-hidden="true">♡</span>
              <p>
                <strong>Grown-ups,</strong> you may help with the device, but please let your child choose.
                <span class="ksize-handoff-reassurance">There are no right or wrong answers.</span>
                <span class="ksize-handoff-reassurance">The pages are read aloud.</span>
                <span class="ksize-handoff-flow">${parentPaceNoteShort}</span>
              </p>
            </div>
            <button class="ksize-parent-listen ksize-handoff-audio" type="button"><span aria-hidden="true">▶</span><span>Listen</span></button>
            <footer class="ksize-setup-footer ksize-handoff-footer">
              <button class="ksize-setup-next ksize-handoff-next" type="button"><span>My child is ready</span><span aria-hidden="true">➜</span></button>
            </footer>
          </section>
        </main>
      `,
      choices: [],
      data: {
        slide_kind: "child_handoff",
        facilitator_script: parentHandoffScript,
        facilitator_mode: isFacilitatorMode,
      },
      on_load: () => {
        installResearcherSkip(jsPsych);
        const playHandoffAudio = () => audio.playFile(PARENT_HANDOFF_AUDIO, parentHandoffScript);
        document.querySelector(".ksize-handoff-audio")?.addEventListener("click", playHandoffAudio);
        if (!isFacilitatorMode) window.setTimeout(playHandoffAudio, 500);
        document.querySelector(".ksize-handoff-next")?.addEventListener("click", () => {
          audio.stop();
          finishParticipantTrial(jsPsych, { response: "child_ready" }, 0, "child_handoff");
        });
      },
    };

  const childAssentNode = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <main class="ksize-shell">
          <section class="ksize-screen ksize-assent-screen">
            <div class="ksize-child-turn-badge">Child’s turn</div>
            <div class="ksize-helper ksize-helper-start ksize-assent-study-helper" aria-hidden="true">
              <div class="ksize-helper-face">
                <span class="ksize-eye ksize-eye-left"></span>
                <span class="ksize-eye ksize-eye-right"></span>
                <span class="ksize-mouth"></span>
              </div>
            </div>
            <header class="ksize-assent-heading">
              <span class="ksize-setup-eyebrow">Before we play</span>
              <h1>Want to play a fun game?</h1>
              <p>I’ll show you some shapes. Tap the buttons to tell me what you think!</p>
            </header>
            <div class="ksize-assent-points">
              <article><span aria-hidden="true">✓</span><p>Say whatever you think!</p></article>
              <article><span aria-hidden="true">■</span><p>The camera stays on.</p></article>
              <article><span aria-hidden="true">♡</span><p>You can stop at any time.</p></article>
            </div>
            <button class="ksize-parent-listen ksize-assent-audio" type="button"><span aria-hidden="true">▶</span><span>Listen</span></button>
            <div class="ksize-assent-actions">
              <button class="ksize-assent-yes" type="button"><span aria-hidden="true">✓</span> Yes!</button>
              <button class="ksize-assent-no" type="button">No, thank you</button>
            </div>
          </section>
        </main>
      `,
      choices: [],
      data: {
        slide_kind: "child_assent",
        facilitator_script: CHILD_ASSENT_TEXT,
        facilitator_mode: isFacilitatorMode,
      },
      on_load: () => {
        installResearcherSkip(jsPsych);
        const playAssentAudio = () => audio.playFile(CHILD_ASSENT_AUDIO, CHILD_ASSENT_TEXT);
        document.querySelector(".ksize-assent-audio")?.addEventListener("click", playAssentAudio);
        if (!isFacilitatorMode) window.setTimeout(playAssentAudio, 500);
        document.querySelector(".ksize-assent-yes")?.addEventListener("click", () => {
          audio.stop();
          playIntroOpeningMusic();
          finishParticipantTrial(jsPsych, { response: "yes", child_assent: true }, 0, "child_assent");
        });
        document.querySelector(".ksize-assent-no")?.addEventListener("click", () => {
          audio.stop();
          jsPsych.data.write({
            slide_kind: "child_assent",
            response: "no",
            child_assent: false,
          });
          jsPsych.endExperiment(`
            <main class="ksize-shell">
              <section class="ksize-screen ksize-assent-decline-screen">
                <div class="ksize-assent-decline-icon" aria-hidden="true">♡</div>
                <h1>That’s okay!</h1>
                <p>Thank you for telling us. You do not have to play today.</p>
                <p class="ksize-small">Grown-up: you may close this page.</p>
              </section>
            </main>
          `);
        });
      },
      on_finish: () => audio.stop(),
    };

  const welcomeNode = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <main class="ksize-shell">
          <section class="ksize-screen ksize-start-screen ksize-welcome-screen">
            <div class="ksize-welcome-sky" aria-hidden="true">
              <span class="ksize-welcome-floater ksize-welcome-star ksize-welcome-floater-1">★</span>
              <span class="ksize-welcome-floater ksize-welcome-circle ksize-welcome-floater-2"></span>
              <span class="ksize-welcome-floater ksize-welcome-diamond ksize-welcome-floater-3"></span>
              <span class="ksize-welcome-floater ksize-welcome-star ksize-welcome-floater-4">✦</span>
              <span class="ksize-welcome-floater ksize-welcome-star ksize-welcome-floater-5">✦</span>
              <span class="ksize-welcome-floater ksize-welcome-triangle ksize-welcome-floater-6"></span>
              <span class="ksize-welcome-floater ksize-welcome-circle ksize-welcome-floater-7"></span>
              <span class="ksize-welcome-floater ksize-welcome-diamond ksize-welcome-floater-8"></span>
              <span class="ksize-welcome-floater ksize-welcome-star ksize-welcome-floater-9">★</span>
              <span class="ksize-welcome-floater ksize-welcome-diamond ksize-welcome-floater-10"></span>
            </div>
            <div class="ksize-child-turn-badge">Child’s turn</div>
            <div class="ksize-helper ksize-helper-start" aria-hidden="true">
              <div class="ksize-helper-face">
                <span class="ksize-eye ksize-eye-left"></span>
                <span class="ksize-eye ksize-eye-right"></span>
                <span class="ksize-mouth"></span>
              </div>
              <div class="ksize-helper-bubble">Ready?</div>
          </div>
          <h1 class="ksize-title">Find the Caregiver!</h1>
          <p class="ksize-text">Listen to each story, choose who you think will help, and answer questions about the people.</p>
            <p class="ksize-start-cue">When you are ready, hit the green button to start.</p>
            <div class="ksize-controls">
              <button class="ksize-audio-btn ksize-icon-btn ksize-start-audio ksize-prompt-glow" type="button" aria-label="Replay">
                <span class="ksize-icon-symbol" aria-hidden="true">▶</span>
                <span class="ksize-icon-label">Replay</span>
              </button>
              <button class="ksize-next-btn ksize-icon-btn" type="button" aria-label="Start">
                <span class="ksize-icon-symbol" aria-hidden="true">➜</span>
                <span class="ksize-icon-label">Start</span>
              </button>
            </div>
          </section>
        </main>
      `,
      choices: [],
      data: {
        slide_kind: "child_welcome",
        facilitator_script: START_INTRO_TEXT,
        facilitator_mode: isFacilitatorMode,
      },
      on_load: () => {
        installResearcherSkip(jsPsych);
        const playButton = document.querySelector(".ksize-start-audio");
        const startButton = document.querySelector(".ksize-next-btn");
        const runWelcomeSequence = async ({ includeOpening = true } = {}) => {
          welcomeSequenceToken += 1;
          const sequenceToken = welcomeSequenceToken;
          if (includeOpening) playIntroOpeningMusic();
          await new Promise((resolve) => window.setTimeout(resolve, 4100));
          if (sequenceToken !== welcomeSequenceToken) return;
          stopIntroMusic();
          playButton?.classList.remove("ksize-prompt-glow");
          await audio.playFile(START_INTRO_AUDIO, START_INTRO_TEXT);
          if (sequenceToken !== welcomeSequenceToken) return;
          playIntroOpeningMusic();
          startButton?.classList.add("ksize-prompt-glow");
        };
        if (!isFacilitatorMode) {
          runWelcomeSequence({ includeOpening: !introMusicStopper });
        } else {
          playButton.hidden = true;
          startButton?.classList.add("ksize-prompt-glow");
        }
        playButton?.addEventListener("click", async () => {
          welcomeSequenceToken += 1;
          stopIntroMusic();
          audio.stop();
          playButton.classList.remove("ksize-prompt-glow");
          await audio.playFile(START_INTRO_AUDIO, START_INTRO_TEXT);
          playIntroOpeningMusic();
          startButton?.classList.add("ksize-prompt-glow");
        });
        startButton?.addEventListener("click", () => {
          welcomeSequenceToken += 1;
          stopIntroMusic();
          audio.stop();
          finishParticipantTrial(jsPsych, { response: "start" }, 0, "start_game");
        });
      },
      on_finish: () => {
        welcomeSequenceToken += 1;
        stopIntroMusic();
        audio.stop();
      },
    };
  const doneNode = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
        <main class="ksize-shell">
          <section class="ksize-screen ksize-done-screen ksize-grownup-return-screen">
            <div class="ksize-firework-field" aria-hidden="true">
              <span class="ksize-firework ksize-firework-1"></span>
              <span class="ksize-firework ksize-firework-2"></span>
              <span class="ksize-firework ksize-firework-3"></span>
              <span class="ksize-firework ksize-firework-4"></span>
              <span class="ksize-firework ksize-firework-5"></span>
            </div>
            <h1 class="ksize-title">Thank you for playing!</h1>
            <p class="ksize-text">Great job—you finished the game!</p>
            <div class="ksize-get-grownup-visual" aria-hidden="true">
              <div class="ksize-get-grownup-child"><span></span><b></b></div>
              <div class="ksize-get-grownup-arrow">➜</div>
              <div class="ksize-get-grownup-adult"><span></span><b></b></div>
            </div>
            <div class="ksize-get-grownup-callout">
              <strong>Final questions for your grown-up to do.</strong>
              <span>Your grown-up may already be with you.</span>
            </div>
            <button class="ksize-grownup-here-btn" type="button">Grown-up ready to answer</button>
            <div class="ksize-final-grownup-panel" hidden>
              <span class="ksize-final-grownup-label">For the grown-up</span>
              <h2>The child’s game is complete</h2>
              <p>${requestedChsResponse
                ? "Continue to stop the recording and complete the final Children Helping Science pages, including a short exit survey and the study debrief. The research team will contact you through Children Helping Science about the gift card."
                : "Continue to complete the final grown-up steps."}</p>
              <button class="ksize-final-grownup-continue" type="button">Continue to grown-up steps <span aria-hidden="true">➜</span></button>
            </div>
          </section>
        </main>
      `,
      choices: [],
      data: {
        slide_kind: "study_complete",
        facilitator_script: [
          "Thank you for playing!",
          "We're all done!",
          CHILD_GROWNUP_HANDOFF_TEXT,
          FINAL_GROWNUP_TEXT,
        ].join("\n"),
        facilitator_mode: isFacilitatorMode,
      },
      on_load: () => {
        installResearcherSkip(jsPsych);
        stopOutroMusic();
        audio.stop();
        const grownupHereButton = document.querySelector(".ksize-grownup-here-btn");
        const grownupPanel = document.querySelector(".ksize-final-grownup-panel");
        const continueButton = document.querySelector(".ksize-final-grownup-continue");
        if (!isFacilitatorMode) {
          (async () => {
            await new Promise((resolve) => window.setTimeout(resolve, 350));
            for (const [index, line] of ALL_DONE_AUDIO_SEQUENCE.entries()) {
              if (index > 0) await new Promise((resolve) => window.setTimeout(resolve, 180));
              await audio.playFile(line.src, line.text, {
                volume: line.volume ?? 0.8,
                playbackRate: line.playbackRate ?? 1,
                preservePitch: line.preservePitch ?? true,
              });
            }
            await playReviewNarration(CHILD_GROWNUP_HANDOFF_TEXT);
            playOutroMusic();
          })();
        }
        grownupHereButton?.addEventListener("click", () => {
          audio.stop();
          stopOutroMusic();
          grownupHereButton.hidden = true;
          grownupPanel.hidden = false;
          continueButton?.focus();
          if (!isFacilitatorMode) {
            window.setTimeout(() => {
              audio.playFile(FINAL_GROWNUP_AUDIO, FINAL_GROWNUP_TEXT);
            }, 250);
          }
        });
        continueButton?.addEventListener("click", () => {
          finishParticipantTrial(jsPsych, { response: "grownup_closeout_continue" }, 0, "grownup_closeout");
        });
      },
      on_finish: () => {
        stopOutroMusic();
        audio.stop();
      },
    };
  const firstPartKind = selectedPartOrder === "ratings-first" ? PART_DYAD : PART_EVENT;
  const secondPartKind = selectedPartOrder === "ratings-first" ? PART_EVENT : PART_DYAD;
  const firstPartNodes = selectedPartOrder === "ratings-first" ? ratingNodes : storyNodes;
  const secondPartNodes = selectedPartOrder === "ratings-first" ? storyNodes : ratingNodes;
  const parentSetupNodes = skipParentSetup
    ? []
    : [parentWelcomeNode, setupNode, cameraSetupNode, childHandoffNode];
  const reviewNodes = (
    selectedRatingMode === "one-after-story"
      ? [
          ...parentSetupNodes,
          ...(ENABLE_CHILD_ASSENT ? [childAssentNode] : []),
          welcomeNode,
          ...oneAfterStoryNodes,
          doneNode,
        ]
      : [
          ...parentSetupNodes,
          ...(ENABLE_CHILD_ASSENT ? [childAssentNode] : []),
          welcomeNode,
          makePartBreakNode(jsPsych, firstPartKind, 1, selectedEventSuffix),
          ...firstPartNodes,
          makePartBreakNode(jsPsych, secondPartKind, 2, selectedEventSuffix),
          ...secondPartNodes,
          doneNode,
        ]
  ).map((node, index) => withPreviewIndex(node, index));
  totalPreviewScreens = reviewNodes.length;
  const safeRequestedPreviewIndex = safeFacilitatorPreviewIndex({
    requestedIndex: requestedPreviewIndex,
    facilitatorMode: isFacilitatorMode,
    researcherJump: requestedResearcherJump,
    resumeBackupKey: requestedResumeBackupKey,
    expectedRows: requestedExpectedResumeRows,
    restoredRows: facilitatorRestoredRowCount,
  });
  const startIndex = Math.min(safeRequestedPreviewIndex, Math.max(0, reviewNodes.length - 1));
  currentPreviewIndex = startIndex;

  const retryPreviewLoad = (event) => {
    if (event.target.closest?.("#ftc-preview-retry")) window.location.reload();
  };
  const timeline = [
    {
      type: jsPsychPreload, images: imagePaths, show_progress_bar: true,
      max_load_time: 30000, continue_after_error: false,
      message: '<p role="status">Getting the pictures ready…</p>',
      error_message: '<section role="alert"><h2>The preview could not finish loading.</h2><p>Check your internet connection and try again.</p><button id="ftc-preview-retry" type="button">Try loading again</button></section>',
      // Delegate while preloading: errors can be reported before this button
      // is rendered, including a failed file followed by a slow successful one.
      on_load: () => document.addEventListener("click", retryPreviewLoad),
      on_finish: () => document.removeEventListener("click", retryPreviewLoad),
    },
    ...reviewNodes.slice(startIndex),
  ];

  jsPsych.run(timeline);
}

main().catch((error) => {
  document.body.innerHTML = `<pre>${escapeHtml(error.stack || error.message || error)}</pre>`;
});
