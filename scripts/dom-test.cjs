const fs = require('node:fs');
const vm = require('node:vm');
const {parseHTML} = require('linkedom');

module.exports = function makeDOM(file, scripts, reduced = false) {
  const {window, document} = parseHTML(fs.readFileSync(file, 'utf8'));
  const timers = new Map(), frames = new Map(), observers = [];
  let nextID = 0;
  const context = vm.createContext({
    window, document, console,
    addEventListener: window.addEventListener.bind(window),
    setTimeout(fn) { const id = ++nextID; timers.set(id, fn); return id; },
    clearTimeout(id) { timers.delete(id); },
    requestAnimationFrame(fn) { const id = ++nextID; frames.set(id, fn); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
    matchMedia() { return {matches: reduced}; },
    IntersectionObserver: class {
      constructor(callback) { observers.push(callback); }
      observe() {}
    }
  });
  for (const script of scripts) vm.runInContext(fs.readFileSync(script, 'utf8'), context);
  const emit = (id, event) => document.getElementById(id).dispatchEvent(new window.Event(event));
  return {
    document, context, timers, frames, observers,
    click(id) { emit(id, 'click'); },
    input(id, value) { document.getElementById(id).value = String(value); emit(id, 'input'); },
    advanceTimer() { const [id, fn] = timers.entries().next().value; timers.delete(id); fn(); },
    advanceFrame(timestamp) { const [id, fn] = frames.entries().next().value; frames.delete(id); fn(timestamp); }
  };
};
