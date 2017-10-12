export default (value, text, suffix = 's') => (
  +value > 1 ? `${text}${suffix}` : text
);
