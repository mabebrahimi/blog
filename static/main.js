/* ============================================================
   Client behaviour (Hugo renders content server-side now).
   Only interactive bits live here:
     - theme toggle (button is in the footer partial)
     - reveal-on-scroll
     - reading-progress bar (post pages)
     - newsletter (demo — static site; wire to a service later)
   ============================================================ */

const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';

/* ---------- Theme ---------- */
function applyTheme(t){
  document.documentElement.classList.toggle('dark', t === 'dark');
  const btn = document.getElementById('themeToggle');
  if(btn) btn.innerHTML = t === 'dark' ? SUN : MOON;
}
function initTheme(){
  let t = localStorage.getItem('theme');
  if(!t){ t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  applyTheme(t);
  const btn = document.getElementById('themeToggle');
  if(btn){
    btn.addEventListener('click', () => {
      const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }
}

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold:.08, rootMargin:'0px 0px -40px 0px'});
  els.forEach((e, i) => { e.style.transitionDelay = Math.min(i * 55, 280) + 'ms'; io.observe(e); });
}

/* ---------- Reading progress (post pages) ---------- */
function initProgress(){
  const bar = document.getElementById('progress');
  if(!bar) return;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  update();
}

/* ---------- Newsletter (demo only — no backend on a static site) ---------- */
function initNewsletter(){
  const form = document.getElementById('nlForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('nlEmail').value.trim();
    if(!email) return;
    document.getElementById('nlNote').textContent = 'ممنون! ' + email + ' ثبت شد. به‌زودی اولین یادداشت را برایت می‌فرستم.';
    this.reset();
  });
}

initTheme();
initReveal();
initProgress();
initNewsletter();
