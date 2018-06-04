import getLang from './utils/lang';

const getLangConfig = async () =>  {
  try {
    // const { route } = this.$wxpage;
    // const page = route.split('/')[1];

    const res = await getLang();
    console.log('Lang', res);
  } catch (error) {
    console.error('getLangConfigError-->', error.message);
  }
};


App({
  onLaunch: function(options) {
    console.log('App onLaunch...');
    // Do something initial when launch.
    // getLangConfig();
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
