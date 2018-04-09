// components/index/index.js
const PageBehavior = require('../behaviors/page-behavior');

Component({
  relations: {
    '../../pages/index/index': {
      type: 'child', // 关联的目标节点应为子节点
      linked(target) {
        console.log('target',target);
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
      },
      linkChanged(target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked(target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // userInfo: null,
    text: 'This is page data.',
    isAnchor: -1, // 0:false, 1: true
    isLiving: 0,
    hasVideo: 0,

    userName: '',
    mynum: 20,
    now: '',
    // mixin: 'mixin_TODO',
    userInfo: {
      nickName: '加载中...'
    },
    normalTitle: '原始标题',
    setTimeoutTitle: '标题三秒后会被修改',
    count: 0,
    netrst: '',
    groupList: [{
        id: 1,
        name: '点击改变',
        list: [{
          childid: '1.1',
          childname: '子项，点我改变'
        }, {
          childid: '1.2',
          childname: '子项，点我改变'
        }, {
          childid: '1.3',
          childname: '子项，点我改变'
        }]
      },
      {
        id: 2,
        name: '点击改变',
        list: [{
          childid: '2.1',
          childname: '子项，点我改变'
        }, {
          childid: '2.2',
          childname: '子项，点我改变'
        }, {
          childid: '2.3',
          childname: '子项，点我改变'
        }]
      },
      {
        id: 3,
        name: '点击改变',
        list: [{
          childid: '3.1',
          childname: '子项，点我改变'
        }]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    plus(e) {
      const {
        arg
      } = e.target.dataset;

      this.data.mynum++;
      this.setData({
        mynum: this.data.mynum
      });

      this.triggerEvent('updateData', {
        mydetail: 'hello'
      })

    },

    toast() {
      wx.showToast({
        title: '其它测试',
        icon: 'none'
      });
    },

    communicate() {
      // console.log(this.$name + ' tap')

      // this.$invoke('counter2', 'minus', 45, 6)
      // this.$invoke('counter1', 'plus', 45, 6)

      // this.$broadcast('index-broadcast', 1, 3, 4)
    },
    goToMy() {
      wx.switchTab({
        url: '/pages/my/my'
      });
    }
  },

  behaviors: [PageBehavior],
  created() {
    console.log('Index_COM created');
  },
  attached() {
    console.log('Index_COM attached');
  },
  ready() { // 在组件布局完成后执行，此时可以获取节点信息
    console.log('Index_COM ready');
    console.log('Data:', this.data);
    var nodes = this.getRelationNodes('../../pages/index/index');
    console.log('Nodes', nodes);


  },
  moved() {
    console.log('Index_COM moved');
  },
  detached() {
    console.log('Index_COM detached');
  },
})