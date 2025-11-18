
/*---------------------------------------------------------------------------------------------------------- */
// ===== Menú hamburguesa móvil =====
const hamburger   = document.getElementById('hamburger');
const overlay     = document.getElementById('mobileOverlay');
const mainPanel   = document.getElementById('panel-main');
const closeBtn    = overlay.querySelector('[data-close]');
const backButtons = overlay.querySelectorAll('[data-back]');

function openOverlay() {
  overlay.classList.add('open');
  overlay.classList.remove('level-1');
  overlay.classList.add('level-0');
  overlay.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  overlay.querySelectorAll('.panel[data-panel]').forEach(p => p.classList.remove('active'));
}
function closeOverlay() {
  overlay.classList.remove('open', 'level-0', 'level-1');
  overlay.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
}
function openSubpanel(id){
  overlay.classList.remove('level-0');
  overlay.classList.add('level-1');
  overlay.querySelectorAll('.panel[data-panel]').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-panel') === id);
  });
}
function backToMain(){
  overlay.classList.remove('level-1');
  overlay.classList.add('level-0');
  overlay.querySelectorAll('.panel[data-panel]').forEach(p => p.classList.remove('active'));
}

hamburger.addEventListener('click', openOverlay);
closeBtn.addEventListener('click', closeOverlay);
backButtons.forEach(btn => btn.addEventListener('click', backToMain));
mainPanel.addEventListener('click', (e)=>{
  const trigger = e.target.closest('[data-sub]');
  if(!trigger) return;
  e.preventDefault();
  openSubpanel(trigger.getAttribute('data-sub'));
});
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
});

// ===== Overlay blur para mega menú (desktop) =====
const desktopOverlay   = document.getElementById('submenuOverlay');
const navEl            = document.querySelector('nav');
const desktopMenuItems = document.querySelectorAll('nav .menu-item');

function isDesktop(){
  return window.matchMedia('(min-width: 901px)').matches;
}

function openDesktopOverlay(){
  if(!isDesktop()) return;
  desktopOverlay.classList.add('open');
  desktopOverlay.setAttribute('aria-hidden', 'false');
}
function closeDesktopOverlay(){
  desktopOverlay.classList.remove('open');
  desktopOverlay.setAttribute('aria-hidden', 'true');
}

desktopMenuItems.forEach(li => {
  li.addEventListener('mouseenter', () => {
    if (isDesktop() && li.querySelector('.submenu')) openDesktopOverlay();
  });
});

navEl.addEventListener('mouseleave', () => {
  if (isDesktop()) closeDesktopOverlay();
});

desktopOverlay.addEventListener('mouseenter', closeDesktopOverlay);
desktopOverlay.addEventListener('click', closeDesktopOverlay);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && desktopOverlay.classList.contains('open')) {
    closeDesktopOverlay();
  }
});