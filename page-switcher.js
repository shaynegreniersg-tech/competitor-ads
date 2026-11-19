/* Page switcher. Page list is injected from pages.json at build time.
   Add a new dashboard by appending to dashboard/pages.json and rebuilding.
   This file is written to the site root as page-switcher.js and loaded by every page. */
(function () {
  const PAGES = {"pages": [{"id": "canada-drives", "label": "Canada Drives competitor ads", "short": "Canada Drives", "description": "Facebook Ad Library teardown", "file": "index.html"}, {"id": "my-ads", "label": "Maple Drive My ads", "short": "My ads", "description": "Our creatives by type and angle", "file": "my-ads/index.html"}]};
  const list = Array.isArray(PAGES) ? PAGES : (PAGES.pages || []);
  const script = document.currentScript;
  const base = (script && script.src) ? new URL('.', script.src) : new URL('.', location.href);

  function norm(path) {
    return String(path || '').replace(/index\.html$/i, '').replace(/\/+$/, '') || '/';
  }
  function hrefFor(p) {
    return new URL(p.file, base).href;
  }
  function isCurrent(p) {
    return norm(new URL(p.file, base).pathname) === norm(location.pathname);
  }

  if (!document.getElementById('page-switcher-css')) {
    const css = document.createElement('style');
    css.id = 'page-switcher-css';
    css.textContent = `
      .psw{position:relative;font:inherit}
      .psw-btn{display:inline-flex;align-items:center;gap:8px;font:inherit;font-size:13px;font-weight:600;color:#fff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:10px;padding:7px 12px;cursor:pointer;max-width:min(72vw,340px)}
      .psw-btn:hover,.psw-btn:focus{background:rgba(255,255,255,.2);outline:none}
      .psw-btn[aria-expanded="true"]{background:rgba(255,255,255,.22)}
      .psw-btn .now{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .psw-btn .chev{opacity:.85;font-size:10px;margin-left:2px}
      .psw-menu{display:none;position:absolute;right:0;top:calc(100% + 6px);min-width:280px;max-width:min(92vw,360px);background:#fff;color:#0f172a;border:1px solid #e5e7eb;border-radius:14px;box-shadow:0 14px 40px rgba(15,23,42,.2);padding:6px;z-index:80}
      .psw-menu.open{display:block}
      .psw-cap{font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748b;padding:6px 10px 4px}
      .psw-item{display:flex;align-items:flex-start;gap:10px;width:100%;text-align:left;border:0;background:transparent;border-radius:10px;padding:9px 10px;cursor:pointer;font:inherit;color:#0f172a;text-decoration:none}
      .psw-item:hover,.psw-item:focus{background:#f1f5f9;outline:none}
      .psw-item.current{background:#eef2ff;cursor:default}
      .psw-item .chk{flex:0 0 18px;width:18px;text-align:center;color:#2563eb;font-weight:700;line-height:1.3}
      .psw-item .lab{display:flex;flex-direction:column;min-width:0;gap:1px}
      .psw-item .lab b{font-size:13.5px;font-weight:650;line-height:1.3}
      .psw-item .lab span{font-size:11.5px;color:#64748b;line-height:1.3}
    `;
    document.head.appendChild(css);
  }

  function mount() {
    const host = document.getElementById('page-switch');
    if (!host || !list.length) return;
    const current = list.find(isCurrent) || list[0];
    const menuId = 'psw-menu';
    host.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'psw';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'psw-btn';
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', menuId);
    btn.setAttribute('aria-label', 'Switch page, current: ' + (current.label || current.short || current.id));
    btn.innerHTML = '<span class="now"></span><span class="chev" aria-hidden="true">▾</span>';
    btn.querySelector('.now').textContent = current.short || current.label || current.id;
    const menu = document.createElement('div');
    menu.className = 'psw-menu';
    menu.id = menuId;
    menu.setAttribute('role', 'menu');
    const cap = document.createElement('div');
    cap.className = 'psw-cap';
    cap.textContent = 'Pages';
    menu.appendChild(cap);
    list.forEach(p => {
      const here = isCurrent(p);
      const a = document.createElement(here ? 'div' : 'a');
      a.className = 'psw-item' + (here ? ' current' : '');
      a.setAttribute('role', 'menuitem');
      if (here) a.setAttribute('aria-current', 'page');
      else {
        a.href = hrefFor(p);
        // Don't carry Canada Drives #videos/#all hashes onto other pages
      }
      a.innerHTML = '<span class="chk" aria-hidden="true"></span><span class="lab"><b></b><span></span></span>';
      a.querySelector('.chk').textContent = here ? '✓' : '';
      a.querySelector('b').textContent = p.label || p.short || p.id;
      const desc = a.querySelector('.lab > span');
      if (p.description) desc.textContent = p.description;
      else desc.remove();
      menu.appendChild(a);
    });
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    host.appendChild(wrap);

    function close() {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function toggle(e) {
      e.preventDefault();
      e.stopPropagation();
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', toggle);
    document.addEventListener('click', ev => {
      if (!wrap.contains(ev.target)) close();
    });
    document.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
