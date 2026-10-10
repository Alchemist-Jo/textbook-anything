(() => {
  const chinese = document.documentElement.lang.startsWith("zh");
  const labels = chinese ? {copy:"复制",done:"已复制",manual:"请选中复制",aria:"复制这段代码",nav:"章节导航"} : {copy:"Copy",done:"Copied",manual:"Select to copy",aria:"Copy this code",nav:"Contents"};
  const nav = document.querySelector(".site-nav");
  const progress = document.querySelector(".reading-progress");
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".site-nav a")];
  const update = () => {
    const root = document.documentElement;
    const distance = root.scrollHeight - root.clientHeight;
    if (progress) progress.style.transform = "scaleX(" + (distance ? root.scrollTop / distance : 0) + ")";
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 160) current = section.id;
    }
    links.forEach(link => {
      const active = link.hash === "#" + current;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  addEventListener("scroll", update, { passive: true });
  update();
  document.querySelectorAll('a.source-ref[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      const disclosure = target?.closest("details");
      if (disclosure) disclosure.open = true;
    });
  });
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.cssText = "position:fixed;left:-10000px;top:0";
      document.body.append(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      if (!copied) throw new Error("Copy unavailable");
    }
  }
  document.querySelectorAll(".code-block").forEach(block => {
    const code = block.querySelector("pre code");
    if (!code) return;
    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = labels.copy;
    button.setAttribute("aria-label", labels.aria);
    button.addEventListener("click", async () => {
      try {
        await copyText(code.textContent);
        button.textContent = labels.done;
      } catch {
        button.textContent = labels.manual;
      }
      setTimeout(() => { button.textContent = labels.copy; }, 1800);
    });
    block.append(button);
  });
  if (nav) nav.setAttribute("aria-label", labels.nav);
  // Print every hint, solution and source list, then restore what the reader had open.
  let disclosureState = [];
  addEventListener("beforeprint", () => {
    disclosureState = [...document.querySelectorAll("details")].map(node => [node, node.open]);
    disclosureState.forEach(([node]) => { node.open = true; });
  });
  addEventListener("afterprint", () => { disclosureState.forEach(([node, open]) => { node.open = open; }); });
})();
