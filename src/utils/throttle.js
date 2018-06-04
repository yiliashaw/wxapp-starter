module.exports = (fn, interval = 1000) => {
  let lastTime = null;

  return (...args) => {
    let now = +new Date();
    if (now - lastTime > interval || !lastTime) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
};