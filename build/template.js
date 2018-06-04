
const gulp = require('gulp');
const newFile = require('gulp-file');

const initContent = (name, dest) => {
  const fileName = name.split('.')[0];
  if (/\.wxml$/ig.test(name)) {
    return `<view class="${fileName}-wrap">${fileName}</view>`;
  } else if (/\.json$/ig.test(name)) {
    if (/\/pages\//ig.test(dest)) {
      return `
{
  "usingComponents":{}
}
      `;
    } else {
      return `
{
  "component": true,
  "usingComponents": {}
}
      `;
    }
  } else if (/\.js$/ig.test(name)) {
    if (/\/pages\//ig.test(dest)) {
      return `
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
      `
    } else {
      return `
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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

  }
})
    `
    }
  } else if (/\.wxss$/ig.test(name)) {
    return `.${fileName} {}`
  }
  return '';
};

const createNewFile = (name, dest) => {
  const fileName = name.split('.')[0];
  const content = initContent(name, dest);
  return newFile(`${name}`, content, {
      src: true
    })
    .pipe(gulp.dest(dest));
}

module.exports = (name, dest) => {
  createNewFile(`${name}.wxml`, dest);
  createNewFile(`${name}.wxss`, dest);
  createNewFile(`${name}.js`, dest);
  createNewFile(`${name}.json`, dest);
}