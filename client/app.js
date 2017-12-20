//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    templates: [
      { name: "wifi点" }, { name: "消防栓" }, { name: "旅店" }, { name: "网吧" },
    ],
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})