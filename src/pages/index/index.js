//index.js
const config = {
  data: {

  },
  onLoad(options) {
    console.log('index page onload');
    this.setData({
      now: +Date.now()
    });
  },

  onShow() {
    console.log('index page onShow');
    console.log('Page this', this.childrens);
    // Do something when page show.
  },

  // Event handler.

  onUpdateData(e) {
    console.log('update-data', e);
  },

  viewTap() {
    this.setData({
        text: 'Set some data for updating view.'
      },
      function () {
        // this is setData callback
      }
    );
  },

  changState() {
    const random = Math.random();
    this.setData({
      isAnchor: random > 0.5 ? 0 : 1,
    });
  },



};

Page(config);