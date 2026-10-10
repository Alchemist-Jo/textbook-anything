#!/usr/bin/env node
// Render an HTML file in headless Chrome at true viewport widths, save screenshots for direct viewing,
// and report layout defects that are easy to miss by eye: page overflow, the rendered type scale, text below
// a minimum size, text contrast measured against the actual pixels behind it, overlapping or clipped figure
// labels, broken or upscaled images, raw Markdown or TeX in visible text, and internal links without a target.
// Usage: node render-audit.mjs page.html [--widths 1440,390] [--out dir] [--min-px 12] [--max-sizes 6] [--tile 1800] [--print]
// Needs Node 22+ (global WebSocket) and a local Chrome or Chromium (set CHROME to override the path).
// Widths are emulated through the DevTools protocol, because a headless window narrower than 500px is clamped to 500px.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { inflateSync } from "node:zlib";

const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf(name); return i < 0 ? dflt : args[i + 1]; };
const file = args.find((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--") && args[i - 1] !== "--print"));
if (!file) { console.error("usage: node render-audit.mjs page.html [--widths 1440,390] [--out dir] [--min-px 12] [--max-sizes 6] [--tile 1800] [--print]"); process.exit(2); }
const widths = opt("--widths", "1440,390").split(",").map(Number);
const out = resolve(opt("--out", `${basename(file).replace(/\.html?$/, "")}-render`));
const minPx = Number(opt("--min-px", "12"));
const maxSizes = Number(opt("--max-sizes", "6"));
const tile = Number(opt("--tile", "1800"));
const wantPrint = args.includes("--print");

const candidates = [process.env.CHROME, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean);
const chrome = candidates.find(existsSync);
if (!chrome) { console.error("no Chrome or Chromium found; set CHROME=/path/to/chrome"); process.exit(2); }
if (typeof WebSocket === "undefined") { console.error("Node 22+ is required for the built-in WebSocket"); process.exit(2); }

const profile = mkdtempSync(join(tmpdir(), "render-audit-"));
const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--no-default-browser-check", "--allow-file-access-from-files", `--user-data-dir=${profile}`,
  "--remote-debugging-port=0", ...(process.env.CI ? ["--no-sandbox"] : []), "about:blank"], { stdio: ["ignore", "ignore", "pipe"] }); // CI runners often lack a usable Chrome sandbox
const wsUrl = await new Promise((ok, fail) => {
  let buf = ""; const t = setTimeout(() => fail(new Error("Chrome did not start")), 20000);
  proc.stderr.on("data", d => { buf += d; const m = buf.match(/DevTools listening on (ws:\S+)/); if (m) { clearTimeout(t); ok(m[1]); } });
});

const ws = new WebSocket(wsUrl);
await new Promise(ok => ws.addEventListener("open", ok, { once: true }));
let seq = 0; const pending = new Map(); const waiters = [];
ws.addEventListener("message", ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { const { ok, fail } = pending.get(msg.id); pending.delete(msg.id); msg.error ? fail(new Error(msg.error.message)) : ok(msg.result); }
  else if (msg.method) for (const w of [...waiters]) if (w.method === msg.method) { waiters.splice(waiters.indexOf(w), 1); w.ok(msg.params); }
});
const send = (method, params = {}, sessionId) => new Promise((ok, fail) => { const id = ++seq; pending.set(id, { ok, fail }); ws.send(JSON.stringify({ id, method, params, sessionId })); });
const once = method => new Promise(ok => waiters.push({ method, ok }));

function inPage(minPx) {
  const W = innerWidth, sel = el => { const p = []; for (let e = el; e && e !== document.body && p.length < 4; e = e.parentElement) p.unshift(e.tagName.toLowerCase() + (e.id ? "#" + e.id : e.classList.length ? "." + [...e.classList].slice(0, 2).join(".") : "")); return p.join(" > "); };
  const shown = el => el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true });
  const clipped = el => { for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(p).overflowX)) return true; return false; };
  const res = { width: W, scrollWidth: document.documentElement.scrollWidth, overflow: [], sizes: {}, samples: {}, small: [], contrast: [], boxes: [], labels: [], images: [], raw: [], links: [] };
  const flagged = new Set();
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || (r.right <= W + 1 && r.left >= -1) || r.right <= 0 || clipped(el) || !shown(el)) continue; // wholly left of the page: an off-screen skip link
    let anc = el.parentElement; while (anc && !flagged.has(anc)) anc = anc.parentElement;
    if (anc) continue; flagged.add(el);
    res.overflow.push({ sel: sel(el), left: Math.round(r.left), right: Math.round(r.right) });
  }
  const rgba = v => { const m = (v.match(/[\d.]+/g) || []).map(Number); return m.length < 3 ? null : [m[0], m[1], m[2], m.length > 3 ? m[3] : 1]; };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Map();
  for (let n; (n = walker.nextNode());) {
    const t = n.textContent.trim(); const el = n.parentElement;
    if (!t || !el || el.closest("script,style,noscript,title") || !shown(el)) continue;
    const r = el.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) continue;
    seen.set(el, (seen.get(el) || "") + t);
  }
  for (const [el, text] of seen) {
    const s = getComputedStyle(el); const svg = el instanceof SVGElement;
    const ctm = svg && el.getScreenCTM ? el.getScreenCTM() : null;
    const px = parseFloat(s.fontSize) * (ctm ? Math.hypot(ctm.a, ctm.b) : 1);
    const role = svg ? "figure" : el.closest(".katex,math") ? "math" : el.closest("h1,h2,h3,h4,h5,h6") ? "heading" : el.closest("pre,code,kbd") ? "code" : el.closest("sup,sub") ? "script" : el.closest("figcaption,.caption,small,.section-label,nav") ? "secondary" : "text";
    const key = Math.round(px * 2) / 2; res.sizes[role] = res.sizes[role] || {}; res.sizes[role][key] = (res.sizes[role][key] || 0) + text.length;
    if (!res.samples[key] && ["text", "secondary", "heading"].includes(role)) res.samples[key] = `${role}  ${sel(el)}  "${text.slice(0, 30)}"`;
    const y = el.getBoundingClientRect().top + scrollY;
    if (px < minPx && role !== "math") res.small.push({ px: +px.toFixed(1), role, y, sel: sel(el), text: text.slice(0, 40) });
    if (role !== "math" && !el.closest(":disabled,[aria-disabled='true'],[inert]")) {
      const c = rgba(svg ? s.fill : s.color);
      if (c) { let a = c[3]; for (let e = el; e && e.nodeType === 1; e = e.parentElement) a *= Number(getComputedStyle(e).opacity);
        const r = el.getBoundingClientRect(), large = px >= 24 || (px >= 18.66 && Number(s.fontWeight) >= 700);
        res.boxes.push({ x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, c: [c[0], c[1], c[2], a], need: large ? 3 : 4.5, px: +px.toFixed(1), sel: sel(el), text: text.slice(0, 40) }); }
    }
    if (!el.closest("pre,code,kbd,script,.katex,math") && /\*\*[^*\s][^*]*\*\*|\$\$|\\\(|\\\[|\\(frac|begin|mathbf|sum)\b/.test(text)) res.raw.push({ sel: sel(el), text: text.slice(0, 60) });
  }
  for (const svg of document.querySelectorAll("svg")) {
    if (!shown(svg)) continue;
    const box = svg.getBoundingClientRect(); if (!box.width || !box.height) continue;
    const labels = [...svg.querySelectorAll("text")].filter(t => t.textContent.trim() && shown(t)).map(t => ({ t, r: t.getBoundingClientRect() })).filter(o => o.r.width > 1);
    for (const o of labels) if (o.r.left < box.left - 1 || o.r.right > box.right + 1 || o.r.top < box.top - 1 || o.r.bottom > box.bottom + 1)
      res.labels.push({ issue: "clipped", y: o.r.top + scrollY, sel: sel(o.t), text: o.t.textContent.trim().slice(0, 40) });
    for (let i = 0; i < labels.length; i++) for (let j = i + 1; j < labels.length; j++) {
      const a = labels[i].r, b = labels[j].r, w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (w > 2 && h > 2 && !labels[i].t.contains(labels[j].t) && !labels[j].t.contains(labels[i].t))
        res.labels.push({ issue: "overlap", y: a.top + scrollY, sel: sel(labels[i].t), text: `${labels[i].t.textContent.trim().slice(0, 20)} / ${labels[j].t.textContent.trim().slice(0, 20)}` });
    }
  }
  for (const img of document.images) {
    const r = img.getBoundingClientRect(); if (!r.width) continue;
    if (img.complete && img.naturalWidth === 0) res.images.push({ issue: "broken", src: img.currentSrc.slice(0, 80) });
    else if (img.naturalWidth && r.width * devicePixelRatio > img.naturalWidth * 1.1 && !/\.svg|image\/svg/.test(img.currentSrc)) res.images.push({ issue: `upscaled ${(r.width * devicePixelRatio / img.naturalWidth).toFixed(1)}x`, src: img.currentSrc.slice(0, 80) });
  }
  for (const a of document.querySelectorAll('a[href^="#"]')) { const id = decodeURIComponent(a.getAttribute("href").slice(1)); if (id && !document.getElementById(id)) res.links.push(a.getAttribute("href")); }
  res.height = document.documentElement.scrollHeight;
  return res;
}

function decodePng(buf) {
  let p = 8, w = 0, h = 0, type = 0; const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), kind = buf.toString("latin1", p + 4, p + 8), body = buf.subarray(p + 8, p + 8 + len);
    if (kind === "IHDR") { w = body.readUInt32BE(0); h = body.readUInt32BE(4); type = body[9]; if (body[8] !== 8 || body[12]) throw new Error("unsupported PNG"); }
    if (kind === "IDAT") idat.push(body); p += 12 + len;
  }
  const bpp = type === 6 ? 4 : 3, stride = w * bpp, raw = inflateSync(Buffer.concat(idat)), px = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = y * (stride + 1) + 1, row = y * stride, up = row - stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[row + x - bpp] : 0, b = y ? px[up + x] : 0, c = x >= bpp && y ? px[up + x - bpp] : 0;
      const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
      const pred = [0, a, b, (a + b) >> 1, pa <= pb && pa <= pc ? a : pb <= pc ? b : c][f];
      px[row + x] = (raw[src + x] + pred) & 255;
    }
  }
  return { w, h, bpp, px };
}
const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a, b) => { const L = [lum(a), lum(b)].sort((x, y) => y - x); return (L[0] + 0.05) / (L[1] + 0.05); };
function contrastOf(box, img, top) {
  const out = [];
  for (let i = 1; i <= 4; i++) for (let j = 1; j <= 3; j++) {
    const x = Math.round(box.x + (box.w * i) / 5), y = Math.round(box.y + (box.h * j) / 4) - top;
    if (x < 0 || x >= img.w || y < 0 || y >= img.h) continue;
    const o = (y * img.w + x) * img.bpp, bg = [img.px[o], img.px[o + 1], img.px[o + 2]];
    const fg = bg.map((v, k) => v * (1 - box.c[3]) + box.c[k] * box.c[3]);
    out.push(ratio(fg, bg));
  }
  out.sort((a, b) => a - b); return out.length ? out[out.length >> 1] : null;
}
const HIDE = "*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}svg text,svg tspan{fill:transparent!important;stroke:transparent!important}";

const fmtSizes = sizes => Object.entries(sizes).map(([role, h]) => `${role} ${Object.entries(h).sort((a, b) => b[0] - a[0]).map(([px, n]) => `${px}:${n}`).join(" ")}`).join(" | ");
const list = (rows, f, n = 12) => rows.slice(0, n).map(r => "      " + f(r)).join("\n") + (rows.length > n ? `\n      … ${rows.length - n} more` : "");

mkdirSync(out, { recursive: true });
const url = pathToFileURL(resolve(file)).href;
const report = { file: resolve(file), widths: [] };
let status = 0;
try {
  for (const width of widths) {
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    const s = (m, p) => send(m, p, sessionId);
    await s("Page.enable"); await s("Runtime.enable");
    await s("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    await s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    const loaded = once("Page.loadEventFired"); await s("Page.navigate", { url }); await loaded;
    await s("Runtime.evaluate", { expression: "document.fonts.ready.then(() => new Promise(r => setTimeout(r, 400)))", awaitPromise: true });
    // A full-page capture paints a fixed background only inside the first viewport, which leaves a false band in the tiles.
    await s("Runtime.evaluate", { expression: `document.head.append(Object.assign(document.createElement("style"), { textContent: "*,*::before,*::after{background-attachment:scroll!important}" }))` });
    const { result } = await s("Runtime.evaluate", { expression: `(${inPage})(${minPx})`, returnByValue: true });
    const r = result.value; const shots = [];
    for (let y = 0, i = 1; y < r.height; y += tile, i++) {
      const h = Math.min(tile, r.height - y);
      const { data } = await s("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y, width, height: h, scale: 1 } });
      const name = join(out, `${width}-${String(i).padStart(2, "0")}.png`); writeFileSync(name, Buffer.from(data, "base64")); shots.push(name);
    }
    const scale = Math.min(0.35, 2400 / r.height);
    const { data: ov } = await s("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: r.height, scale } });
    r.overview = join(out, `${width}-overview.png`); writeFileSync(r.overview, Buffer.from(ov, "base64"));
    // A timer, because requestAnimationFrame stalled in the second target of headless Chrome on macOS.
    await s("Runtime.evaluate", { expression: `(() => { const st = document.createElement("style"); st.id = "__ra_hide"; st.textContent = ${JSON.stringify(HIDE)}; document.head.append(st); return new Promise(r => setTimeout(r, 150)); })()`, awaitPromise: true });
    for (let y = 0; y < r.height; y += tile) {
      const h = Math.min(tile, r.height - y);
      const { data } = await s("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y, width, height: h, scale: 1 } });
      const img = decodePng(Buffer.from(data, "base64"));
      for (const b of r.boxes) { const cy = b.y + b.h / 2; if (cy < y || cy >= y + h) continue; const k = contrastOf(b, img, y); if (k !== null && k < b.need) r.contrast.push({ ratio: +k.toFixed(2), px: b.px, y: b.y, sel: b.sel, text: b.text }); }
    }
    await s("Runtime.evaluate", { expression: `document.getElementById("__ra_hide").remove()` });
    delete r.boxes;
    if (wantPrint && width === widths[0]) {
      await s("Emulation.setEmulatedMedia", { media: "print" });
      // Print layout can request font faces again; printing before they load falls back to a system font, which on Linux has no CJK glyphs.
      await s("Runtime.evaluate", { expression: "document.fonts.ready.then(() => new Promise(r => setTimeout(r, 400)))", awaitPromise: true });
      const { data } = await s("Page.printToPDF", { printBackground: true, preferCSSPageSize: true });
      const name = join(out, "print.pdf"); writeFileSync(name, Buffer.from(data, "base64")); r.print = name;
    }
    await send("Target.closeTarget", { targetId });
    r.shots = shots; report.widths.push(r);
    const counted = ["text", "secondary", "heading"].flatMap(k => Object.keys(r.sizes[k] || {}));
    const body = Object.entries(r.sizes.text || {}).sort((a, b) => b[1] - a[1])[0]?.[0];
    const fig = Object.keys(r.sizes.figure || {}).map(Number);
    r.scale = { sizes: [...new Set(counted)].map(Number).sort((a, b) => b - a), body: body ? Number(body) : null, figure: fig.length ? [Math.min(...fig), Math.max(...fig)] : null };
    const at = o => `tile ${String(Math.floor(o.y / tile) + 1).padStart(2, "0")}`;
    if (r.overflow.length || r.images.some(i => i.issue === "broken") || r.raw.length || r.links.length || r.small.length || r.contrast.length || r.labels.length || r.scale.sizes.length > maxSizes) status = 1;
    console.log(`width ${width}: page ${r.width}×${r.height}, ${shots.length} tiles and an overview in ${out}`);
    console.log(`  overflow: ${r.scrollWidth > r.width ? `page scrolls sideways (${r.scrollWidth}px)` : "page fits"}${r.overflow.length ? "\n" + list(r.overflow, o => `${o.sel}  [${o.left}, ${o.right}]`) : ""}`);
    console.log(`  rendered sizes (px:chars): ${fmtSizes(r.sizes)}`);
    console.log(`  type scale: ${r.scale.sizes.length} sizes in text, secondary and heading roles (limit ${maxSizes}): ${r.scale.sizes.join(" ")}; body ${r.scale.body}px; figure text ${r.scale.figure ? r.scale.figure.join("–") + "px" : "none"}`);
    if (r.scale.sizes.length > maxSizes) console.log(list(r.scale.sizes.map(px => `${px}px  first seen: ${r.samples[px]}`), x => x, 20));
    console.log(`  text below ${minPx}px: ${r.small.length || "none"}${r.small.length ? "\n" + list(r.small, o => `${o.px}px ${o.role}  ${at(o)}  ${o.sel}  "${o.text}"`) : ""}`);
    console.log(`  contrast below WCAG AA (text vs. the pixels behind it): ${r.contrast.length || "none"}${r.contrast.length ? "\n" + list(r.contrast, o => `${o.ratio}:1 at ${o.px}px  ${at(o)}  ${o.sel}  "${o.text}"`) : ""}`);
    console.log(`  figure labels overlapping or clipped: ${r.labels.length || "none"}${r.labels.length ? "\n" + list(r.labels, o => `${o.issue}  ${at(o)}  ${o.sel}  "${o.text}"`) : ""}`);
    console.log(`  images: ${r.images.length ? "\n" + list(r.images, o => `${o.issue}  ${o.src}`) : "ok"}`);
    console.log(`  raw markup in visible text: ${r.raw.length ? "\n" + list(r.raw, o => `${o.sel}  "${o.text}"`) : "none"}`);
    console.log(`  internal links without a target: ${r.links.length ? r.links.slice(0, 12).join(" ") : "none"}`);
    if (r.print) console.log(`  print: ${r.print}`);
  }
  writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
} finally {
  // Chrome helpers on Linux can keep writing to the profile after the browser exits; a leftover temp profile is harmless.
  ws.close(); proc.once("exit", () => { try { rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {} }); proc.kill();
}
process.exitCode = status;
