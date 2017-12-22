//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    templates: [],
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        qcloud.request({
          url: config.service.templetUrl,
          success: function(res){
            this.templates = res.data;
          }.bind(this)
        })
    }
})