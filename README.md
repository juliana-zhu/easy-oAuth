## 安装
```shell script
$ npm i --save @juliana_mewo/oauth
```
## 使用
你可以在在调用所有方法前在`window.EVN`里配置如下信息，若不配置，默认使用一下信息：
```javascript
ENV={
    originUrl: '//icity-dev.cloud.cityworks.cn', // 你要调用接口的域名
    loginParams: {
        client_id: 'a1c7b4a4ade84e888009dcdad83909a1', // 支持平台的应用id
        client_secret: '8d28a7aef4af477a8da685a3afaa75d8', // 支撑平台的应用私钥
        response_type: 'code', // code
        state: '_oAuth', // 可根据系统 也可以统一 不限定的参数
    }
}
```
引用
```javascript
import oAuth from '@juliana_mewo/oauth';
```
当http请求是401时使用`oAuth.jumpToLogin();`，你的代码可能长这样
```javascript
'''
const code = error.response.status;
      switch (code) {
        case 401:
          oAuth.jumpToLogin();
          break;
        default:
...
```
当路由跳转时使用`await oAuth.beforeRoute();`，你的代码可能长这样
```javascript
router.beforeEach(async (to, from, next) => {
  await oAuth.beforeRoute();
  next();
});
```