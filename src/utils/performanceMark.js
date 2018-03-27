export default (name) => {
  if (window.performance && window.performance.mark) {
    window.performance.mark(name);
  }
};
