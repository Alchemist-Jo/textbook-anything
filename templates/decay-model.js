function decayState(rate, time) {
  const value = Math.exp(-rate * time);
  return {
    rate, time, value,
    derivative: -rate * value,
    x: 60 + 105 * time,
    y: 245 - 210 * value,
    endpoint: Math.exp(-5 * rate),
    path: Array.from({length: 101}, (_, i) => {
      const t = i / 20;
      return (i ? "L" : "M") + (60 + 105 * t).toFixed(2) + " " + (245 - 210 * Math.exp(-rate * t)).toFixed(2);
    }).join(" ")
  };
}
