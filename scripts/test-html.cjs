const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {execFileSync} = require('node:child_process');
const vm = require('node:vm');
const makeDOM = require('./dom-test.cjs');
const root = path.resolve(__dirname, '..');

function example(reduced = false) {
  return makeDOM(path.join(root, 'templates/tutorial.html'), [
    path.join(root, 'templates/decay-model.js'), path.join(root, 'templates/tutorial.js')
  ], reduced);
}
test('rate and model-time changes update the curve, derivative, point and explanation', () => {
  const page = example(), get = id => page.document.getElementById(id);
  assert.match(get('curve-caption').textContent, /x\(5\) = 0.0067/);
  page.input('rate', 0);
  page.input('model-time', 5);
  assert.match(get('time-explanation').textContent, /x = 1.0000 and dx\/dt = 0.0000/);
  assert.equal(Number(get('trajectory-point').getAttribute('cy')), 35);
  page.input('rate', 2);
  assert.equal(get('model-time').value, '0');
  page.input('model-time', 5);
  assert.match(get('curve-caption').textContent, /4.54e-5/);
  assert.ok(Math.abs(Number(get('trajectory-point').getAttribute('cy')) - 244.990466) < .00001);
});
test('playback pauses, advances manually, stops at the endpoint and replays', () => {
  const page = example(), get = id => page.document.getElementById(id);
  page.click('play-trajectory');
  page.advanceFrame(0); page.advanceFrame(100);
  assert.equal(get('time-value').value, '0.10');
  page.click('play-trajectory');
  assert.equal(page.frames.size, 0);
  page.click('step-trajectory');
  assert.equal(get('time-value').value, '0.60');
  page.click('reset-trajectory');
  page.click('play-trajectory');
  let timestamp = 0;
  while (page.frames.size && timestamp < 7000) { page.advanceFrame(timestamp); timestamp += 100; }
  assert.equal(get('time-value').value, '5.00');
  assert.equal(page.frames.size, 0);
  assert.equal(get('play-trajectory').getAttribute('aria-pressed'), 'false');
  page.click('play-trajectory');
  assert.equal(get('time-value').value, '0.00');
  page.observers[0]([{isIntersecting: false}]);
  assert.equal(page.frames.size, 0);
});
test('reduced motion keeps manual exploration and full solutions available', () => {
  const page = example(true);
  assert.equal(page.document.getElementById('play-trajectory').disabled, true);
  page.click('step-trajectory');
  assert.equal(page.document.getElementById('time-value').value, '0.50');
  assert.ok(page.document.querySelector('details.solution'));
});
test('printing exposes solutions and restores the prior disclosure state', () => {
  const page = example();
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/lesson.js'), 'utf8'), page.context);
  const solution = page.document.querySelector('details.solution');
  assert.equal(Boolean(solution.open), false);
  page.context.window.dispatchEvent(new page.context.window.Event('beforeprint'));
  assert.equal(solution.open, true);
  page.context.window.dispatchEvent(new page.context.window.Event('afterprint'));
  assert.equal(Boolean(solution.open), false);
});
test('the HTML build preserves native math and runs deferred helpers after the DOM', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'textbook-html-'));
  try {
    const output = path.join(temporary, 'tutorial.html');
    execFileSync(process.execPath, [path.join(root, 'scripts/build-html.mjs'), path.join(root, 'templates/tutorial.html'), output]);
    const html = fs.readFileSync(output, 'utf8');
    assert.match(html, /<math display="block">/);
    assert.match(html, /data:font\/woff2;base64,/);
    assert.match(html, /id="trajectory-point"/);
    assert.ok(html.indexOf('function decayState') > html.indexOf('</main>'));
    assert.doesNotMatch(html, /<script[^>]+src=/);
  } finally { fs.rmSync(temporary, {recursive: true, force: true}); }
});
