'use strict';
const library = JSON.parse(document.getElementById('catalog').textContent);
const touch = 'who-will-share-touch-wording';
const loves = 'who-will-share-loves-likes';
const obligation = 'who-has-to-help';
const findStudy = id => library.find(entry => entry.id === id);
const element = id => document.getElementById(id);
const frame = element('studyFrame');
const panel = element('slides');
const picker = element('study');
const wording = element('wording');
const stories = element('story');
const tray = element('thumbnails');
let deck, activeIndex = 0, tiles = [], sections = [], pending = 0;
const back = element('goBack');
const skip = element('goSkip');
let pages = [], loading = false;
let jumpNumber = 0;

function familyURL(address) {
  const url = new URL(address);
  if (deck.id !== obligation) {
    url.searchParams.set('researcherTools', '1');
    url.searchParams.set('researcherToolbar', 'back-skip');
    url.searchParams.set('downloadData', '0');
    url.searchParams.set('showDataStatus', '0');
    url.searchParams.set('syntheticSpeech', '0');
  }
  return url.href;
}

function loadStudy(address) {
  loading = true;
  updateButtons();
  frame.contentWindow.location.replace(familyURL(address));
}

function setStudy(id) {
  ++jumpNumber;
  deck = findStudy(id) || library[0];
  pages = deck.groups.flatMap((group, groupIndex) =>
    group.slides.map((slide, local) => ({slide, groupIndex, local}))
  );
  activeIndex = 0;
  tiles = [];
  sections = [];
  tray.replaceChildren();
  picker.value = deck.id === loves ? touch : deck.id;
  wording.value = deck.id;
  element('wordingLabel').hidden = picker.value !== touch;
  element('notice').hidden = true;
  document.title = deck.title + ' · Study preview';
  frame.title = deck.title + ' · Narrated study';
  // Every shared link, including an older numbered thumbnail link, starts at welcome.
  const canonical = new URL(location.href);
  canonical.searchParams.set('study', deck.id);
  canonical.hash = '';
  history.replaceState(null, '', canonical);
  loadStudy(deck.start);
}

function studyPosition() {
  if (loading) return null;
  if (deck.id === obligation) return window.obligationPreview.readIndex(frame);
  try {
    return frame.contentWindow.familyPreviewPosition?.() ?? null;
  } catch {
    return null;
  }
}

// The family can advance normally while the preview toolbar stays in sync.
function updateButtons() {
  const index = studyPosition();
  back.disabled = !Number.isInteger(index) || index <= 0;
  skip.disabled = !Number.isInteger(index) || index >= pages.length - 1;
}
frame.addEventListener('load', () => {
  const doc = frame.contentDocument;
  if (!doc?.head || doc.URL === 'about:blank') return;
  loading = false;
  if (deck?.id === obligation) {
    // This public draft also has a button for its technical storyboard.
    // Keep its controls available to the slide picker without exposing that exit to families.
    const researcherView = doc.getElementById('researcher-view');
    if (researcherView) researcherView.style.display = 'none';
    return;
  }
  // Expose one set of controls above the family view. Use the task's own skip
  // implementation so moving past a question never selects an answer.
  const style = doc.createElement('style');
  style.textContent = '.ksize-researcher-tools { display: none !important }';
  doc.head.appendChild(style);
  const readPosition = doc.createElement('script');
  readPosition.textContent = "window.familyPreviewPosition = () => typeof currentPreviewIndex === 'number' && typeof totalPreviewScreens === 'number' && totalPreviewScreens > 0 ? currentPreviewIndex : null;";
  frame.contentDocument.head.appendChild(readPosition);
  readPosition.remove();
});

function note(message) {
  const notice = element('notice');
  notice.textContent = message;
  notice.hidden = false;
  clearTimeout(pending);
  pending = setTimeout(() => {notice.hidden = true}, 8500);
}

async function choose(index) {
  if (!pages[index]) return;
  const {slide, groupIndex, local} = pages[index];
  const requested = ++jumpNumber;
  const position = studyPosition();
  if (panel.open) panel.close();
  if (position === index) return;
  activeIndex = index;
  if (deck.id !== obligation) {
    loadStudy(slide.url);
    return;
  }
  loading = true;
  updateButtons();
  try {
    await window.obligationPreview.jumpTo(frame, groupIndex, local, slide.label, index);
  } catch (error) {
    if (requested === jumpNumber && error.name !== 'AbortError') {
      note('This slide could not open. Choose it again in the slide navigator.');
    }
  } finally {
    if (requested === jumpNumber) {
      loading = false;
      updateButtons();
    }
  }
}

function browse(offset) {
  const index = studyPosition();
  if (!Number.isInteger(index) || !pages[index + offset]) return;
  if (offset === 1 && deck.id !== obligation) {
    const nativeSkip = frame.contentDocument?.querySelector('.ksize-researcher-skip');
    if (nativeSkip && !nativeSkip.disabled) {
      nativeSkip.click();
      updateButtons();
      return;
    }
  }
  choose(index + offset);
}

function buildTray() {
  stories.replaceChildren();
  deck.groups.forEach((group, groupIndex) => {
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    heading.textContent = group.title;
    stories.add(new Option(group.title, String(groupIndex)));
    const grid = document.createElement('div');
    grid.className = 'tiles';
    section.append(heading, grid);
    tray.appendChild(section);
    sections.push(section);
    group.slides.forEach(slide => {
      const index = tiles.length;
      const button = document.createElement('button');
      button.className = 'tile';
      button.type = 'button';
      button.dataset.group = String(groupIndex);
      const number = document.createElement('small');
      number.textContent = String(index + 1);
      const image = document.createElement('img');
      image.loading = 'lazy';
      image.alt = '';
      image.src = slide.img;
      button.append(image, number, document.createTextNode(slide.label));
      button.setAttribute('aria-label', 'Slide ' + (index + 1) + '. ' + slide.label);
      button.addEventListener('click', () => choose(index));
      grid.appendChild(button);
      tiles.push(button);
    });
  });
}

function showSlides() {
  if (!tiles.length) buildTray();
  const current = studyPosition();
  if (Number.isInteger(current) && tiles[current]) activeIndex = current;
  const selected = tiles[activeIndex];
  panel.querySelector('[aria-current]')?.removeAttribute('aria-current');
  selected.setAttribute('aria-current', 'true');
  stories.value = selected.dataset.group;
  panel.showModal();
  selected.scrollIntoView({block: 'nearest'});
}

for (const entry of library) {
  if (entry.id !== loves) picker.add(new Option(entry.id === touch ? 'Who Will Share?' : entry.title, entry.id));
}
picker.onchange = () => {panel.close(); setStudy(picker.value)};
wording.onchange = () => {panel.close(); setStudy(wording.value)};
stories.onchange = () => {
  const section = sections[Number(stories.value)];
  section.scrollIntoView({block: 'start'});
  section.querySelector('button')?.focus({preventScroll: true});
};
back.onclick = () => browse(-1);
skip.onclick = () => browse(1);
setInterval(() => {if (!document.hidden) updateButtons()}, 150);
element('showSlides').onclick = showSlides;
element('close').onclick = () => panel.close();
panel.addEventListener('click', event => {
  if (event.target !== panel) return;
  const rect = panel.getBoundingClientRect();
  if (event.clientX > rect.right || event.clientX < rect.left) panel.close();
});
panel.addEventListener('keydown', event => {
  const button = event.target.closest('.tile');
  if (!button) return;
  const offset = {ArrowLeft:-1,ArrowRight:1,ArrowUp:-2,ArrowDown:2}[event.key];
  if (!offset) return;
  event.preventDefault();
  tiles[tiles.indexOf(button) + offset]?.focus();
});
const requestedStudy = new URLSearchParams(location.search).get('study') || location.hash.slice(1).split('/')[0];
setStudy(requestedStudy);
