const store = {};

const getStore = (key, reset = false) => {
  const copied = store[key];
  if (reset) {
    store[key] = null;
  }
  return copied;

};

const setStore = (key, value) => {
  store[key] = value;
  // console.log('=====Store: ', store);
};

export {
  getStore,
  setStore
};