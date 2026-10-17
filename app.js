(function () {
  const D = CV_DATA;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const TYPE_LABEL = { paper: "Bài báo", poster: "Poster", report: "Báo cáo" };
  const KIND_LABEL = { paper: "Bài báo tạp chí", poster: "Poster hội nghị quốc tế", report: "Báo cáo nghiên cứu" };
  const empty = (t) => `<p class="empty">${t}</p>`;

  // ---- Đầu trang ----
  const p = D.profile;
  document.title = `${p.name} – ${p.title}`;
  $("brand").textContent = p.name;
  const telHref = (p.phone || "").replace(/[^\d+]/g, "");
  const extra = (p.links || []).map((l) =>
    `<div><dt>${esc(l.label)}</dt><dd><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.url.replace(/^https?:\/\//, ""))}</a></dd></div>`).join("");
  $("about").innerHTML = `
    <h1>${esc(p.name)}</h1>
    <p class="title">${esc(p.title)}</p>
    <p class="org">${esc(p.org)}</p>
    ${p.summary ? `<p class="summary">${esc(p.summary)}</p>` : ""}
    <dl class="contact">
      ${p.email ? `<div><dt>Email</dt><dd><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></dd></div>` : ""}
      ${p.phone ? `<div><dt>Điện thoại</dt><dd><a href="tel:${esc(telHref)}">${esc(p.phone)}</a></dd></div>` : ""}
      ${p.location ? `<div><dt>Địa điểm</dt><dd>${esc(p.location)}</dd></div>` : ""}
      ${extra}
    </dl>
    <div class="cta no-print">
      ${p.email ? `<a class="btn primary" href="mailto:${esc(p.email)}">Gửi email</a>` : ""}
      ${p.phone ? `<a class="btn" href="tel:${esc(telHref)}">Gọi điện</a>` : ""}
    </div>`;
  $("foot-name").textContent = `${p.name}, ${p.org}`;
  $("foot-date").textContent = "Cập nhật " + new Date().toLocaleDateString("vi-VN", { month: "long", year: "numeric" });

  // ---- Biểu đồ kiểm soát chất lượng Levey-Jennings (minh họa) ----
  (function chart() {
    const W = 640, H = 340, L = 14, R = 84, T = 16, B = 16, n = 28;
    const pw = W - L - R, ph = H - T - B;
    const y = (z) => T + ((3 - z) / 6) * ph;
    let seed = 1990; // cố định để biểu đồ luôn giống nhau
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const pts = Array.from({ length: n }, (_, i) => {
      const z = (rnd() + rnd() + rnd() + rnd() - 2) * 1.35;
      const zc = Math.max(-1.8, Math.min(1.8, z));
      return [L + 12 + (i * (pw - 24)) / (n - 1), y(zc)];
    });
    const band = (a, b, cls) => `<rect x="${L}" y="${y(b)}" width="${pw}" height="${y(a) - y(b)}" fill="var(--${cls})"/>`;
    const line = (z, cls, label) =>
      `<line class="${cls}" x1="${L}" x2="${L + pw}" y1="${y(z)}" y2="${y(z)}"/>` +
      `<text class="qc-lbl" x="${L + pw + 8}" y="${y(z) + 4}">${label}</text>`;
    const d = pts.map((q, i) => (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" ");
    $("chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img"
        aria-label="Biểu đồ kiểm soát chất lượng Levey-Jennings minh họa: các điểm kiểm soát dao động quanh giá trị trung bình, đều nằm trong giới hạn hai độ lệch chuẩn.">
        ${band(1, 2, "band2")}${band(-2, -1, "band2")}${band(2, 3, "band3")}${band(-3, -2, "band3")}${band(-1, 1, "band1")}
        ${line(3, "qc-l3", "+3 SD")}${line(2, "qc-l2", "+2 SD")}${line(1, "qc-l1", "+1 SD")}
        ${line(0, "qc-mean", "Trung bình")}
        ${line(-1, "qc-l1", "−1 SD")}${line(-2, "qc-l2", "−2 SD")}${line(-3, "qc-l3", "−3 SD")}
        <path class="qc-line" pathLength="1" d="${d}"/>
        ${pts.map((q, i) => `<circle class="qc-dot" style="--i:${i}" cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="3.6"/>`).join("")}
      </svg>
      <figcaption>Minh họa biểu đồ kiểm soát chất lượng Levey-Jennings theo quy luật Westgard. Dữ liệu trên biểu đồ là giả lập, không phải số liệu của đơn vị.</figcaption>`;
  })();

  // ---- Số liệu tóm tắt ----
  const hl = D.highlights || [];
  if (hl.length) $("highlights").innerHTML = hl.map((h) => `<div><dt>${esc(h.value)}</dt><dd>${esc(h.label)}</dd></div>`).join("");
  else $("highlights").remove();

  // ---- Hàng chung: mốc thời gian bên trái, nội dung bên phải ----
  const row = (when, what) => `<article class="row"><div class="when">${esc(when)}</div><div class="what">${what}</div></article>`;

  const exp = D.experience || [];
  $("exp-list").innerHTML = exp.length ? exp.map((e) => row(e.period, `
      <h3>${esc(e.role)}</h3>
      <p class="sub">${esc(e.org)}</p>
      ${e.points && e.points.length ? `<ul>${e.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}`)).join("") : empty("Chưa có thông tin.");

  const edu = D.education || [];
  $("edu-list").innerHTML = edu.length ? edu.map((e) => row(e.period, `
      <h3>${esc(e.degree)}</h3><p class="sub">${esc(e.org)}</p>`)).join("") : empty("Chưa có thông tin.");

  const certs = D.certificates || [];
  if (!certs.length) $("certificates").remove();
  else $("cert-list").innerHTML = certs.map((c) => row(c.year, `
      <h3>${esc(c.name)}</h3><p class="sub">${esc(c.org)}</p>
      ${c.file ? `<a class="doc-link" href="${esc(c.file)}" target="_blank" rel="noopener">Xem chứng chỉ</a>` : ""}`)).join("");

  // ---- Kỹ năng ----
  const skills = D.skills || [];
  $("skill-list").innerHTML = skills.length ? skills.map((g) => `
    <div class="skill-group"><h3>${esc(g.group)}</h3>
      <ul class="pills">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("") : empty("Chưa có thông tin.");

  // ---- Nghiên cứu, có bộ lọc ----
  const research = (D.research || []).slice().sort((a, b) => (b.year || 0) - (a.year || 0));
  let current = "all";
  function resRow(r) {
    const links = [
      r.file ? `<a class="doc-link" href="${esc(r.file)}" target="_blank" rel="noopener">Xem bản gốc (PDF)</a>` : "",
      r.link ? `<a class="doc-link" style="margin-left:16px" href="${esc(r.link)}" target="_blank" rel="noopener">Liên kết ngoài</a>` : "",
    ].join("");
    return row(r.year, `
      <p class="kind">${esc(KIND_LABEL[r.type] || r.type)}</p>
      <h3>${esc(r.title)}</h3>
      <p class="authors">${esc(r.authors)}</p>
      <p class="venue">${esc(r.venue)}</p>
      ${r.role ? `<p class="venue">Vai trò: ${esc(r.role)}</p>` : ""}
      ${links}`);
  }
  function renderRes() {
    const list = research.filter((r) => current === "all" || r.type === current);
    $("res-list").innerHTML = list.length ? list.map(resRow).join("") : empty("Chưa có mục nào.");
    document.querySelectorAll("#filters button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.t === current)));
  }
  const types = [["all", "Tất cả"], ...Object.entries(TYPE_LABEL)];
  $("filters").innerHTML = types.map(([k, v]) => `<button type="button" data-t="${k}">${v}</button>`).join("");
  $("filters").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) { current = b.dataset.t; renderRes(); }
  });
  renderRes();

  // ---- Hội viên ----
  const members = D.memberships || [];
  if (!members.length) $("memberships").remove();
  else $("member-list").innerHTML = `<ul class="members">${members.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>`;

  // ---- Giao diện sáng/tối và in ----
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  $("theme-btn").addEventListener("click", () => {
    const dark = (root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });
  $("print-btn").addEventListener("click", () => window.print());
})();
