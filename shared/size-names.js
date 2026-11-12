/* Display-only character names for isolated CHS clone 6385. Analysis IDs stay unchanged. */
(function (root) {
  "use strict";
  const ROLE_SIZE = Object.freeze({kid:"little",sister:"little",brother:"little",friend:"little","best friend":"little",classmate:"little",mom:"big",dad:"big",teacher:"big"});
  const normalizeRole = role => String(role || "").trim().toLowerCase().replace(/[_-]/g," ").replace(/^bestfriend$/,"best friend");
  function sizeForRole(role) {
    const size = ROLE_SIZE[normalizeRole(role)];
    if (!size) throw new Error(`Unknown character role: ${role}`);
    return size;
  }
  function storyMapping(trial) {
    const block = trial.blocks.HUG || trial.blocks.FOOD || trial.blocks.HELP;
    const number = Number(trial.number || String(trial.id).match(/^\d+/)?.[0]);
    const middleRole = ({3:"mom",4:"teacher",8:"dad"})[number] || "kid";
    const info = (role, position) => ({role, size:sizeForRole(role), label:`${sizeForRole(role)} one`, position});
    const mapping = {left:info(block.choices[0].label,"left"), middle:info(middleRole,"middle"), right:info(block.choices[1].label,"right")};
    for (const position of ["left","right"]) {
      const item = mapping[position];
      item.choiceLabel = `${item.label}${mapping.left.size === mapping.right.size ? ` on the ${position}` : ""}`;
    }
    return mapping;
  }
  function storyIntroPosition(trial, index) {
    if (index === 0) return null;
    const mapping = storyMapping(trial);
    const number = Number(trial.number || String(trial.id).match(/^\d+/)?.[0]);
    if (![3,4,8].includes(number)) return [null,"middle","left","right"][index];
    // The original adult-centred stories first introduce the child, then the two adults in visual order.
    const childPosition = mapping.left.size === "little" ? "left" : "right";
    if (index === 1) return childPosition;
    return childPosition === "left" ? [null,null,"middle","right"][index] : [null,null,"left","middle"][index];
  }
  function choiceConfirmation(trial, choiceIndexOrRole) {
    const block = trial.blocks.HUG || trial.blocks.FOOD || trial.blocks.HELP;
    const index = typeof choiceIndexOrRole === "number" ? choiceIndexOrRole : block.choices.findIndex(choice => normalizeRole(choice.label) === normalizeRole(choiceIndexOrRole));
    if (index !== 0 && index !== 1) return "Thanks for choosing!";
    return `You chose the ${storyMapping(trial)[index === 0 ? "left" : "right"].choiceLabel}!`;
  }
  function dyadText(chunk) {
    const subjectSize = sizeForRole(chunk.subject), targetSize = sizeForRole(chunk.target);
    const subject = `the ${subjectSize} one inside the box`;
    const target = `the ${subjectSize === targetSize ? "other " : ""}${targetSize} one`;
    return {
      subjectSize, targetSize, subject, target,
      focus:`Questions are about ${subject}.`,
      followup:`Now let's answer some questions about ${subject} and ${target}.`,
      questions:{
        love:`How much does ${subject} love ${target}?`,
        like:`How much does ${subject} like ${target}?`,
        charge:`How much is ${subject} in charge?`,
        old:`How old is ${subject}?`,
        strong:`How strong is ${subject}?`
      }
    };
  }
  const api = Object.freeze({ROLE_SIZE, normalizeRole, sizeForRole, storyMapping, storyIntroPosition, choiceConfirmation, dyadText});
  root.SIZE_NAMES = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
