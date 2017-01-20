export const pluralize = (value, text, suffix = 's') => (
  +value > 1 ? `${text}${suffix}` : text
);

export const performanceMark = (name) => {
  if (window.performance && window.performance.mark) {
    window.performance.mark(name);
  }
};
