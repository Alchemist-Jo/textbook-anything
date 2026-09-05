(() => {
  const slider = document.querySelector('#rate');
  const value = document.querySelector('#rate-value');
  const curve = document.querySelector('#decay-curve');
  const caption = document.querySelector('#curve-caption');
  if (slider && curve) {
    const update = () => {
      const rate = Number(slider.value);
      const points = Array.from({length: 101}, (_, i) => {
        const time = i / 20;
        return `${i === 0 ? 'M' : 'L'}${(60 + 105 * time).toFixed(2)} ${(245 - 210 * Math.exp(-rate * time)).toFixed(2)}`;
      });
      curve.setAttribute('d', points.join(' '));
      value.value = rate.toFixed(2);
      const endpoint = Math.exp(-5 * rate);
      const displayed = endpoint < 0.001 ? endpoint.toExponential(2) : endpoint.toFixed(4);
      caption.textContent = `For k = ${rate.toFixed(2)}, x(5) = ${displayed}. Values are computed from the analytic solution.`;
    };
    slider.addEventListener('input', update);
    update();
  }
  let previouslyOpen = [];
  window.addEventListener('beforeprint', () => {
    previouslyOpen = [...document.querySelectorAll('details')].map(node => [node, node.open]);
    previouslyOpen.forEach(([node]) => { node.open = true; });
  });
  window.addEventListener('afterprint', () => {
    previouslyOpen.forEach(([node, open]) => { node.open = open; });
  });
})();
