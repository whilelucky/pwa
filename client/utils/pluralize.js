export default (amount, text, suffix = 's') =>
  +amount > 1 ? `${text}${suffix}` : text;
