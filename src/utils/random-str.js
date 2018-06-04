module.exports = (len = 8) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  len = len >= 0 ? len : 8;
  let str = '';
  for (let i = 0; i < len; i++) {
    const randomPos = Math.floor(Math.random() * possible.length);
    str += possible.slice(randomPos, randomPos + 1);
  }
  return str;
};