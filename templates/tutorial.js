(() => {
  const slider = document.querySelector("#rate");
  const timeInput = document.querySelector("#model-time");
  const play = document.querySelector("#play-trajectory");
  let time = 0, playing = false, frame = null, last = null;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function number(value) { return (Math.abs(value) < .001 && value !== 0 ? value.toExponential(2) : value.toFixed(4)).replace(/^-/, "\u2212"); }
  function render() {
    const state = decayState(Number(slider.value), time);
    document.querySelector("#decay-curve").setAttribute("d", state.path);
    document.querySelector("#rate-value").value = state.rate.toFixed(2);
    document.querySelector("#time-value").value = state.time.toFixed(2);
    timeInput.value = String(state.time);
    document.querySelector("#trajectory-point").setAttribute("cx", state.x);
    document.querySelector("#trajectory-point").setAttribute("cy", state.y);
    const guide = document.querySelector("#time-guide");
    guide.setAttribute("x1", state.x); guide.setAttribute("x2", state.x); guide.setAttribute("y1", state.y);
    document.querySelector("#curve-caption").textContent = "For k = " + state.rate.toFixed(2) + ", x(5) = " + number(state.endpoint) + ". Values are computed from the analytic solution.";
    document.querySelector("#time-explanation").textContent = "At t = " + state.time.toFixed(2) + ", x = " + number(state.value) + " and dx/dt = " + number(state.derivative) + ". The point follows the analytic trajectory.";
    play.textContent = playing ? "Pause" : time === 5 ? "Replay trajectory" : "Play trajectory";
    play.setAttribute("aria-pressed", String(playing));
  }
  function stop() { playing = false; cancelAnimationFrame(frame); frame = null; last = null; render(); }
  function tick(timestamp) {
    if (!playing) return;
    if (last !== null) time = Math.min(5, time + Math.min(.1, (timestamp - last) / 1000));
    last = timestamp;
    render();
    if (time === 5) stop();
    else frame = requestAnimationFrame(tick);
  }
  play.addEventListener("click", () => {
    if (playing) { stop(); return; }
    if (time === 5) time = 0;
    playing = true; last = null; render(); frame = requestAnimationFrame(tick);
  });
  slider.addEventListener("input", () => { stop(); time = 0; render(); });
  timeInput.addEventListener("input", () => { const selectedTime = Number(timeInput.value); stop(); time = selectedTime; render(); });
  document.querySelector("#step-trajectory").addEventListener("click", () => { stop(); time = Math.min(5, time + .5); render(); });
  document.querySelector("#reset-trajectory").addEventListener("click", () => { stop(); time = 0; render(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
  new IntersectionObserver(entries => { if (!entries[0].isIntersecting) stop(); }).observe(document.querySelector("#explore"));
  if (reduced) { play.disabled = true; play.title = "Reduced motion is enabled. Use the time control or advance button."; }
  // assets/lesson.js opens and restores the solutions around printing.
  window.addEventListener("beforeprint", stop);
  render();
})();
