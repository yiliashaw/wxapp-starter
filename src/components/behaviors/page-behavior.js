module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  data: {
    myBehaviorData: {},
    mixin: 'this is mixin data..'
  },
  methods: {
    myBehaviorMethod: function () {}
  },
  created() {
    console.log('Behavior created');
  },
  attached() {
    console.log('Behavior attached');
  },
  ready() { // 在组件布局完成后执行，此时可以获取节点信息
    console.log('Behavior ready');
  },
  moved() {
    console.log('Behavior moved');
  },
  detached() {
    console.log('Behavior detached');
  },
})