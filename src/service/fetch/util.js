export default {
  isAbsoluteURL(url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  },

  combineURLs(baseURL, relativeURL) {
    return relativeURL ?
      baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
      baseURL;
  },

  concatParams(params) {
    return Object.keys(params)
      .map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&');
  }
};