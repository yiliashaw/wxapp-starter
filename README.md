土味情话小程序框架
-------------

## 首次安装
```
npm i # 安装 package.json 依赖模块
```

## 开发模式
运行命令：
```
npm run start/npm run dev # 启动开发模式, host指向测试接口(test)

```
>注：如果需要在开发模式下调用beta接口
```
npm run dev:beta
```

## 发布体验版

```
npm run beta  # 发布体验版, host指向灰度接口（beta）
```

## 发布正式版
运行命令：
```
npm run build # 编译并压缩项目, host指向正式环境接口 (prod)
```

>注：上线项目之前必须使用 `npm run build` 命令编译项目，否则将导致发布没有压缩的资源到线上服务器。


## 小程序配置
```
AppId:wx6fa58869f7b65e7f
Sercet:
```

## 项目结构
```
├─ dist - 编译输出目录
├─ lib - 第三方库
├─ src - 源代码目录
│  ├─ components - 小程序组件
│  ├─ core - 核心包
│  │  ├─ program - [微信小程序](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)
│  │     └─ wepy - [小程序组件化开发框架](https://github.com/Tencent/wepy)
│  │  ├─ service - 网络包(fetch,HttpRequest,HttpResponse)
│  │  │  ├─ login - 登陆包
│  │  └─ utils - 工具包
│  ├─ pages - 小程序页面
│  └─ typings - typescript 类型声明包
└─ wepy.config.js - wepy 编译配置文件
```

## 相关业务说明
#### Ajax request header

每新起一个小程序，先到`src/core/header`里修改对应小程序的`X-Application-Id`:
```js

const Header = {
  appId: { 'X-Application-Id': 'inke_mini_twwd' }
};

export default Header;

/**
 * 题多多：inke_mini_tdd
 * 青蛙：inke_mini_frog
 * 芝士超人：inke_mini_cheese
 * 摇钱树： inke_mini_yqs
 * 单词多多： inke_mini_dcdd
 * 土味情话： inke_mini_twwd
 * /

```

#### 登录

默认在每一个 `page` 的 `onLoad` 之前都会先去判断 `globalData` 里有没有 `userInfo` 和 `isLogin`, 有的话会自动给 `page` 内的 `userInfo` 和 `isLogin` 赋值。

``` js
// 业务逻辑依赖于登录
async onLoad () {
  if (!this.isLogin) {
    await this.login();
  }
}
// 如果该page的业务不依赖于登录，则可以什么都不写。
```

#### 发送 FormId

只需要在page的相关事件里直接`this.sendFormId(e)`， 不需要在 `page` 里写获取 `lang` 的方法。


#### ajax请求

1. 进入`common/entries`里增加相关的 `entry`.
```js

  getUserInfo: {
    baseURL: Host.mini,
    method: HttpMethod.GET,
    url: '/user/user_info'
  },
```
2. 业务层使用：

```js
import api from 'src/common/api';

const userInfo = await api.getUserInfo();
```

#### lang配置

直接在 `page` 或者 `wpy` 文件里使用 `lang.prop`， 不需要在 `data` 里定义 `lang`, 也不需要在 `page` 里写获取 `lang` 的方法。


#### 加解密

// 待补充


### 产品文档



### 服务端接口



### 框架说明

Feature

  1. wxss 文件里可直接写 less 语法。
  2. npm 命令创建页面/组件。
  3. 开发模式下监听文件变化，自动编译。
  4. npm

Tips & bug

  1. gulp-less 会把 import 全都处理成内联，暂无法忽略 @import . 6.4