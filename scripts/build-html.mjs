#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { parse, parseFragment, serialize } from "parse5";
import katex from "katex";

const require = createRequire(import.meta.url);
const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/build-html.mjs lesson.source.html 学习资料.html");
  process.exit(1);
}
const inputPath = path.resolve(input);
const sourceRoot = path.dirname(inputPath);
const mimeTypes = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf"
};
let assetCount = 0;
let mathCount = 0;
let documentCharacters = "";
const fontSubsets = new Map();
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const hasAttr = (node, name) => node.attrs?.some(item => item.name === name);
function removeAttr(node, name) {
  node.attrs = (node.attrs || []).filter(item => item.name !== name);
}
function setAttr(node, name, value) {
  removeAttr(node, name);
  node.attrs.push({ name, value: String(value) });
}
function nodes(root) {
  const all = [];
  const visit = node => {
    all.push(node);
    (node.childNodes || []).forEach(visit);
    if (node.content) visit(node.content);
  };
  visit(root);
  return all;
}
function textOf(node) {
  return node.nodeName === "#text" ? node.value : (node.childNodes || []).map(textOf).join("");
}
function children(node, html) {
  node.childNodes = parseFragment(html).childNodes;
  node.childNodes.forEach(child => { child.parentNode = node; });
}
function append(parent, html) {
  const fragment = parseFragment(html);
  fragment.childNodes.forEach(child => {
    child.parentNode = parent;
    parent.childNodes.push(child);
  });
}
function escape(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function localPath(value, base) {
  if (/^(https?:)?\/\//i.test(value)) throw new Error("Download required resource locally before building: " + value);
  if (value.startsWith("skill:")) return path.join(skillRoot, "assets", value.slice(6));
  return path.resolve(base, value);
}
function embed(value, base) {
  if (value.startsWith("data:") || value.startsWith("#")) return value;
  const filename = localPath(value, base);
  const mime = mimeTypes[path.extname(filename).toLowerCase()];
  if (!mime) throw new Error("Unsupported embedded asset: " + filename);
  assetCount++;
  let contents;
  if (filename.startsWith(path.join(skillRoot, "assets", "fonts") + path.sep)) {
    if (!fontSubsets.has(filename)) {
      fontSubsets.set(filename, execFileSync(process.env.SKILL_HTML_PYTHON || "python3", [path.join(skillRoot, "scripts", "subset-font.py"), filename], {
        input: documentCharacters, maxBuffer: 64 * 1024 * 1024, encoding: null
      }));
    }
    contents = fontSubsets.get(filename);
  } else {
    contents = fs.readFileSync(filename);
  }
  return "data:" + mime + ";base64," + contents.toString("base64");
}
function inlineCSS(css, base) {
  if (/@import\b/i.test(css)) throw new Error("Use local stylesheet links instead of CSS @import.");
  return css.replace(/url\(\s*(?:"([^"]+)"|'([^']+)'|([^)'"\s]+))\s*\)/g,
    (_, a, b, c) => "url(" + embed(a || b || c, base) + ")");
}
function replaceNode(node, replacement) {
  const parent = node.parentNode;
  const newNode = parseFragment(replacement).childNodes[0];
  newNode.parentNode = parent;
  parent.childNodes.splice(parent.childNodes.indexOf(node), 1, newNode);
}
function verify(document) {
  const all = nodes(document);
  const ids = new Set();
  for (const node of all) {
    const id = attr(node, "id");
    if (id) {
      if (ids.has(id)) throw new Error("Duplicate id: " + id);
      ids.add(id);
    }
    if (hasAttr(node, "data-template")) throw new Error("Fill the template and remove body[data-template] before building.");
    if (hasAttr(node, "data-tex")) throw new Error("Unrendered math remains.");
    if (node.tagName === "iframe") throw new Error("Replace the iframe with an offline figure and an external source link.");
    if (hasAttr(node, "srcset")) throw new Error("Use one selected local image per img; srcset is not supported.");
    const src = attr(node, "src");
    if (src && !src.startsWith("data:")) throw new Error("Unembedded resource: " + src);
    if (node.tagName === "link" && attr(node, "rel") === "stylesheet") throw new Error("Unembedded stylesheet.");
    if (node.tagName === "image") {
      const href = attr(node, "href") || attr(node, "xlink:href");
      if (href && !href.startsWith("data:") && !href.startsWith("#")) throw new Error("Unembedded SVG image.");
    }
  }
  for (const node of all) {
    const href = attr(node, "href");
    if (href?.startsWith("#") && href.length > 1 && !ids.has(decodeURIComponent(href.slice(1)))) {
      throw new Error("Broken internal link: " + href);
    }
  }
  if (all.filter(node => node.tagName === "h1").length !== 1) throw new Error("Use exactly one h1.");
}

try {
  const source = fs.readFileSync(inputPath, "utf8");
  const document = parse(source);
  documentCharacters = source + "\n" + fs.readFileSync(path.join(skillRoot, "assets", "lesson.js"), "utf8");
  const all = nodes(document);
  for (const script of all.filter(node => node.tagName === "script" && attr(node, "src"))) {
    documentCharacters += "\n" + fs.readFileSync(localPath(attr(script, "src"), sourceRoot), "utf8");
  }
  const head = all.find(node => node.tagName === "head");
  const headings = all.filter(node => node.tagName === "h2");
  headings.forEach((heading, index) => {
    if (!attr(heading, "id") && !attr(heading.parentNode, "id")) setAttr(heading, "id", "section-" + (index + 1));
  });
  for (const node of all) {
    if (hasAttr(node, "data-toc")) {
      children(node, headings.map(heading => {
        const id = attr(heading, "id") || attr(heading.parentNode, "id");
        const title = attr(heading, "data-nav") || textOf(heading).trim();
        return '<a href="#' + escape(id) + '">' + escape(title) + "</a>";
      }).join(""));
      removeAttr(node, "data-toc");
    }
    const tex = attr(node, "data-tex");
    if (tex !== undefined) {
      try {
        children(node, katex.renderToString(tex, {
          displayMode: attr(node, "data-display") === "true",
          output: "htmlAndMathml", throwOnError: true, trust: false
        }));
      } catch (error) {
        throw new Error("Formula failed: " + tex + "\n" + error.message);
      }
      removeAttr(node, "data-tex");
      removeAttr(node, "data-display");
      mathCount++;
    }
    if (node.tagName === "link" && attr(node, "rel") === "stylesheet") {
      const filename = localPath(attr(node, "href"), sourceRoot);
      replaceNode(node, "<style>" + inlineCSS(fs.readFileSync(filename, "utf8"), path.dirname(filename)) + "</style>");
    } else if (node.tagName === "script" && attr(node, "src")) {
      const filename = localPath(attr(node, "src"), sourceRoot);
      children(node, "");
      node.childNodes.push({ nodeName: "#text", value: fs.readFileSync(filename, "utf8"), parentNode: node });
      removeAttr(node, "src");
      if (hasAttr(node, "defer")) {
        removeAttr(node, "defer");
        const parent = node.parentNode;
        parent.childNodes.splice(parent.childNodes.indexOf(node), 1);
        const body = all.find(item => item.tagName === "body");
        node.parentNode = body;
        body.childNodes.push(node);
      }
    } else if (node.tagName === "img" && attr(node, "src")) {
      setAttr(node, "src", embed(attr(node, "src"), sourceRoot));
    } else if (node.tagName === "image") {
      for (const name of ["href", "xlink:href"]) {
        if (attr(node, name)) setAttr(node, name, embed(attr(node, name), sourceRoot));
      }
    }
    if (attr(node, "style")) setAttr(node, "style", inlineCSS(attr(node, "style"), sourceRoot));
    if (node.tagName === "style" && node.parentNode) {
      const css = inlineCSS(textOf(node), sourceRoot);
      node.childNodes = [{ nodeName: "#text", value: css, parentNode: node }];
    }
  }
  if (mathCount) {
    const katexRoot = path.dirname(require.resolve("katex/package.json"));
    const cssPath = path.join(katexRoot, "dist", "katex.min.css");
    // Modern supported browsers use WOFF2. Omit unused fallback font formats.
    // A declaration ends at ";" or at the "}" that closes its @font-face rule; stopping only at ";" would merge the rules.
    const css = fs.readFileSync(cssPath, "utf8").replace(/src:([^;}]*)/g, (whole, sources) => {
      const woff2 = sources.split(",").find(source => source.includes(".woff2"));
      return woff2 ? "src:" + woff2 : whole;
    });
    append(head, "<style>" + inlineCSS(css, path.dirname(cssPath)) + "</style>");
    const license = fs.readFileSync(path.join(katexRoot, "LICENSE"), "utf8").replaceAll("--", "- -");
    head.childNodes.push({ nodeName: "#comment", data: " KaTeX license:\n" + license, parentNode: head });
  }
  const fandolLicense = path.join(skillRoot, "assets", "fonts", "Fandol-COPYING.txt");
  if (fs.existsSync(fandolLicense)) {
    const license = fs.readFileSync(fandolLicense, "utf8").replaceAll("--", "- -");
    head.childNodes.push({ nodeName: "#comment", data: " Fandol fonts: GPL-3.0 with font exception. WOFF2 subsets retain glyph outlines.\n" + license, parentNode: head });
  }
  verify(document);
  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
  fs.writeFileSync(path.resolve(output), serialize(document), "utf8");
  console.log(JSON.stringify({ output: path.resolve(output), sections: headings.length, formulas: mathCount, embeddedAssets: assetCount }));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
