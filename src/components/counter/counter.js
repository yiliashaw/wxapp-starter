// components/counter/counter.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 50,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    plus(e) {
      console.log('plus', e);

    },
    minus(e) {
      console.log('minus', e);

    }
  },
  behaviors: [],
  relations: {},
  externalClasses: {},
  created() {
    console.log('counter created');
  },
  attached() {
    console.log('counter attached');
  },
  ready() { // 在组件布局完成后执行，此时可以获取节点信息
    console.log('counter ready');
    const query = wx.createSelectorQuery();
    // console.log('counter-query:', query);
  },
  moved() {
    console.log('counter moved');
  },
  detached() {
    console.log('counter detached');
  },
})