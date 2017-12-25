// pages/collection/collection.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "114.31665",
    latitude: "30.554408",
    imgUrl: "",
    markers: [],
    name: "",
    columns: [],
    address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qcloud.request({
      url: config.service.templetUrl,
      success: function (res) {
        var template = res.data[0];
        var today = util.formatDate(new Date());
        for (var i of template.columns) {
          if (i.column_datatype === '地区') {
            i.tempValue = i.value || ['湖北省', '武汉市', '武昌区'];
            i.value = i.value || "['湖北省', '武汉市', '武昌区']";
          }
          if (i.column_datatype === '日期') {
            i.value = i.value || today;
          }
          if (i.column_datatype === '时间') {
            i.value = i.value || '00:00'
          }
        }
        this.setData({ templates: res.data, template: template });
      }.bind(this)
    })
    wx.setNavigationBarTitle({
      title: '添加采集点'
    });
    this.getCurrentLocation();
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
  
  },

  bindNameChange: function(e) {
    this.setData({
      name: e.detail.value
    });
  },

  bindPickerChange: function (e) {
    var template = this.data.templates[e.detail.value];
    var today = util.formatDate(new Date());
    for (var i of template.columns) {
      if (i.column_datatype === '地区') {
        i.tempValue = i.value || ['湖北省', '武汉市', '武昌区'];
        i.value = i.value || "['湖北省', '武汉市', '武昌区']";
      }
      if (i.column_datatype === '日期') {
        i.value = i.value || today;
      }
      if (i.column_datatype === '时间') {
        i.value = i.value || '00:00'
      }
    }
    this.setData({
      template: template
    });
  },

  getCurrentLocation: function() {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        this.setData({
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "../image/current.png",
            height: 40,
            width: 40
          }],
          latitude: res.latitude,
          longitude: res.longitude
        });
      }.bind(this)
    })
  },
  getAssignLocation: function(){
    wx.chooseLocation({
      success: function (res) {
        this.setData({
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "../image/marker.png"
          }],
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.address,
          name: this.data.name || res.name
        });
      }.bind(this)
    })
  },
  paramValueChange: function(e){
    var index = e.currentTarget.dataset.index;
    if (this.data.template && typeof e.detail.value === 'object') {
      this.data.template.columns[index].value = JSON.stringify(e.detail.value);
      this.data.template.columns[index].tempValue = e.detail.value;
    }
    else
      this.data.template.columns[index].value = e.detail.value;
    this.setData({
      template: this.data.template
    })
  },
  addPhoto: function() {
    wx.chooseImage({
      count: 1,
      success: function(e){
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: e.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            this.setData({ imgUrl: JSON.parse(res.data).data.imgUrl });
          }.bind(this),
          fail: function (e) {
            console.error(e)
          }
        });
      }.bind(this)
    })
  },
  submit: function () {
    qcloud.request({
      url: config.service.collectUrl,
      method: "POST",
      data: {
        temp_id: this.data.template.temp_id,
        name: this.data.name,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        imgUrl: this.data.imgUrl,
        columns: this.data.template.columns,
        address: this.data.address
      },
      success: function (res) {
        wx.navigateTo({
          url: "../index/index"
        });
      }
    })
  },
  cancel:  function(){
    wx.navigateTo({
      url: "../index/index"
    });
  }
})