/* The public forced-choice preview has its own screen selector and a nested
   introduction. Use them inside the optional navigator, leaving the study intact. */
(() => {
  'use strict';
  const introLength = 5;
  const requests = new WeakMap();
  const branches = new WeakMap();
  const introHost = doc => doc.querySelector('#child-welcome:not([hidden]) iframe');

  function getStudy(frame) {
    try {
      const doc = frame?.contentDocument;
      return doc?.getElementById('story-jump') ? doc : null;
    } catch {
      return null;
    }
  }

  function introPosition(host) {
    const doc = host.contentDocument;
    const title = doc?.querySelector('#jspsych-html-button-response-stimulus h1')?.textContent.trim();
    if (!title) return -1;
    return Array.from(doc.querySelectorAll('template[data-audio]')).findIndex(
      slide => slide.content.querySelector('h1')?.textContent.trim() === title
    );
  }

  function readIndex(frame) {
    const doc = getStudy(frame);
    if (!doc) return null;
    const intro = introHost(doc);
    if (intro) {
      const i = introPosition(intro);
      return i < 0 ? null : i;
    }
    const menu = doc.getElementById('jump');
    return !doc.getElementById('player').hidden && menu.selectedIndex >= 0
      ? introLength + menu.selectedIndex : null;
  }

  function selectScreen(doc, i) {
    const menu = doc.getElementById('jump');
    if (!menu.options[i]) throw new Error('This screen is unavailable in the study.');
    menu.selectedIndex = i;
    menu.dispatchEvent(new doc.defaultView.Event('change', {bubbles: true}));
  }

  function forgetBranch(frame) {
    branches.get(frame)?.();
    branches.delete(frame);
  }

  // A direct jump can start inside either half of the meanness comparison.
  // Supply the implied path to the study's public routing function only. The
  // original study receives just the responses the visitor actually selects.
  function followBranch(frame, doc) {
    const menu = doc.getElementById('jump');
    const session = doc.defaultView.ObligationSession.build(
      doc.getElementById('set-select').value, doc.getElementById('question-order-select').value
    );
    const start = session.steps[menu.selectedIndex];
    if (!start?.ratedActor || (!start.when && !start.unless)) return;
    const comparison = session.steps.find(s => s.pairing?.id === start.pairing.id && s.localId === 'compare');
    if (!comparison) return;
    const actor = comparison.optionActors.indexOf(start.ratedActor);
    if (actor < 0) return;
    const chosen = start.localId.startsWith('evaluation-') ? 1 - actor : actor;
    const prior = { [comparison.id]: comparison.choices[chosen] };
    function onChoice(event) {
      const button = event.target.closest('[data-answer]');
      const index = menu.selectedIndex;
      const step = session.steps[index];
      if (!button || button.disabled || !step?.choices || step.pairing?.id !== start.pairing.id) return;
      const choice = step.choices[Number(button.dataset.answer)];
      if (choice === undefined) return;
      prior[step.id] = choice;
      const next = session.nextIndex(index, prior);
      setTimeout(() => {
        if (branches.get(frame) !== dispose || menu.selectedIndex === index) return;
        if (next !== menu.selectedIndex) selectScreen(doc, next);
        if (session.steps[next]?.pairing?.id !== start.pairing.id) forgetBranch(frame);
      });
    }
    const stage = doc.getElementById('stage');
    const dispose = () => stage.removeEventListener('click', onChoice, true);
    stage.addEventListener('click', onChoice, true);
    branches.set(frame, dispose);
  }

  async function jumpTo(frame, groupIndex, slideIndex, slideLabel, globalIndex) {
    if (!Number.isInteger(globalIndex) || globalIndex < 0) throw new Error('Unknown preview slide.');
    const request = {};
    requests.set(frame, request);
    forgetBranch(frame);
    async function waitFor(getValue) {
      const expires = performance.now() + 20000;
      do {
        if (requests.get(frame) !== request) throw new DOMException('A newer slide was selected.', 'AbortError');
        const value = getValue();
        if (value) return value;
        await new Promise(resolve => setTimeout(resolve, 35));
      } while (performance.now() < expires);
      throw new Error('The narrated study did not finish opening.');
    }
    const doc = await waitFor(() => {
      const study = getStudy(frame);
      return study?.defaultView.ObligationSession &&
        (introHost(study) || study.getElementById('jump').options.length) ? study : null;
    });
    if (globalIndex < introLength) {
      if (!introHost(doc)) {
        // Re-enter the study's introduction via its own Child view control.
        if (doc.body.classList.contains('child-view')) doc.getElementById('researcher-view').click();
        selectScreen(doc, 0);
        doc.getElementById('child-view').click();
      }
      const intro = await waitFor(() => {
        const host = introHost(doc);
        return host && introPosition(host) >= 0 ? host : null;
      });
      const step = introPosition(intro) <= globalIndex ? 1 : -1;
      for (let i = introPosition(intro); i !== globalIndex; i += step) {
        const holder = intro.contentDocument.getElementById('jspsych-html-button-response-stimulus');
        const button = holder.querySelector(step > 0 ? '.ksize-setup-next' : '.intro-back');
        if (!button || button.disabled) throw new Error('The introduction screen is unavailable.');
        button.click();
        if (introPosition(intro) !== i + step) throw new Error('The introduction did not advance.');
      }
    } else {
      const wanted = globalIndex - introLength;
      const intro = introHost(doc);
      if (intro) {
        // This is the same non-response event used by the introduction's Start button.
        intro.dispatchEvent(new doc.defaultView.Event('intro-complete'));
      }
      if (!doc.body.classList.contains('child-view')) {
        // Child view enters the intro at step zero. Switch from a story screen.
        selectScreen(doc, wanted === 0 ? 1 : wanted);
        doc.getElementById('child-view').click();
      }
      selectScreen(doc, wanted);
      followBranch(frame, doc);
    }
    return readIndex(frame);
  }
  window.obligationPreview = {jumpTo, readIndex};
})();
