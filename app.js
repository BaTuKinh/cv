(function () {
  const D = CV_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const TYPE_LABEL = { paper: "Bài báo", poster: "Poster", report: "Báo cáo" };

  // ---- Hồ sơ ----
  const p = D.profile;
  const initials = p.name.split(/\s+/).slice(-2).map((w) => w[0]).join("").toUpperCase();
  const links = (p.links || []).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`);
  $("about").innerHTML = `
    ${p.photo ? `<img class="avatar" src="${esc(p.photo)}" alt="${esc(p.name)}">` : `<div class="avatar" aria-hidden="true">${esc(initials)}</div>`}
    <div>
      <h1>${esc(p.name)}</h1>
      <p class="title">${esc(p.title)}</p>
      <p class="org">${esc(p.org)}</p>
      <div class="contact">
        ${p.location ? `<span>📍 ${esc(p.location)}</span>` : ""}
        ${p.email ? `<a href="mailto:${esc(p.email)}">✉ ${esc(p.email)}</a>` : ""}
        ${p.phone ? `<a href="tel:${esc(p.phone.replace(/\s/g, ""))}">☎ ${esc(p.phone)}</a>` : ""}
        ${links.join("")}
      </div>
      <p class="summary">${esc(p.summary)}</p>
    </div>`;
  document.title = `${p.name} – CV`;
  $("foot-name").textContent = p.name;
  $("foot-date").textContent = new Date().toLocaleDateString("vi-VN");

  // ---- Số liệu nổi bật ----
  const hl = D.highlights || [];
  $("highlights").innerHTML = hl.map((h) => `<div class="stat"><b>${esc(h.value)}</b><span>${esc(h.label)}</span></div>`).join("");
  if (!hl.length) $("highlights").remove();

  // ---- Kinh nghiệm / học vấn ----
  const emptyOrList = (arr, html, el) => { $(el).innerHTML = arr.length ? arr.map(html).join("") : `<p class="empty">Chưa có thông tin.</p>`; };
  emptyOrList(D.experience || [], (e) => `
    <article class="item">
      <h3>${esc(e.role)}</h3>
      <div class="meta">${esc(e.org)} · ${esc(e.period)}</div>
      ${e.points && e.points.length ? `<ul>${e.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    </article>`, "exp-list");
  emptyOrList(D.education || [], (e) => `
    <article class="item"><h3>${esc(e.degree)}</h3><div class="meta">${esc(e.org)} · ${esc(e.period)}</div></article>`, "edu-list");

  // ---- Kỹ năng ----
  emptyOrList(D.skills || [], (g) => `
    <div class="card"><h3>${esc(g.group)}</h3><div class="chips">${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}</div></div>`, "skill-list");

  // ---- Nghiên cứu + bộ lọc ----
  const research = (D.research || []).slice().sort((a, b) => (b.year || 0) - (a.year || 0));
  let current = "all";
  function resCard(r) {
    const links = [
      r.file ? `<a href="${esc(r.file)}" target="_blank" rel="noopener">📄 Xem tài liệu</a>` : "",
      r.link ? `<a href="${esc(r.link)}" target="_blank" rel="noopener">🔗 Liên kết</a>` : "",
    ].join("");
    return `
      <article class="res">
        <span class="tag">${esc(TYPE_LABEL[r.type] || r.type)}</span>
        <h3>${esc(r.title)}</h3>
        <div class="meta">${esc(r.authors)}</div>
        <div class="meta">${esc(r.venue)}${r.year ? " · " + esc(r.year) : ""}</div>
        ${r.role ? `<div class="role"><b>Vai trò:</b> ${esc(r.role)}</div>` : ""}
        ${links ? `<div class="links">${links}</div>` : ""}
      </article>`;
  }
  function renderRes() {
    const list = research.filter((r) => current === "all" || r.type === current);
    $("res-list").innerHTML = list.length ? list.map(resCard).join("") : `<p class="empty">Chưa có mục nào.</p>`;
    document.querySelectorAll("#filters button").forEach((b) => b.classList.toggle("on", b.dataset.t === current));
  }
  const types = [["all", "Tất cả"], ...Object.entries(TYPE_LABEL)];
  $("filters").innerHTML = types.map(([k, v]) => `<button type="button" data-t="${k}">${v}</button>`).join("");
  $("filters").addEventListener("click", (e) => {
    if (e.target.dataset.t) { current = e.target.dataset.t; renderRes(); }
  });
  renderRes();

  // ---- Chứng chỉ ----
  const certs = D.certificates || [];
  if (!certs.length) $("certificates").remove();
  else $("cert-list").innerHTML = certs.map((c) => `
    <article class="res"><h3>${esc(c.name)}</h3>
      <div class="meta">${esc(c.org)}${c.year ? " · " + esc(c.year) : ""}</div>
      ${c.file ? `<div class="links"><a href="${esc(c.file)}" target="_blank" rel="noopener">📄 Xem</a></div>` : ""}
    </article>`).join("");

  // ---- Giao diện sáng/tối + in ----
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  $("theme-btn").addEventListener("click", () => {
    const dark = (root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });
  $("print-btn").addEventListener("click", () => window.print());
})();
