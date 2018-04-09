App({
  onLaunch: function(options) {
    console.log('App onLaunch...');
    // Do something initial when launch.
  },
  onShow: function(options) {
    // Do something when show.
  },
  onHide: function() {
    // Do something when hide.
  },
  onError: function(msg) {
    console.log(msg);
  },
  globalData: 'I am global data'
});
