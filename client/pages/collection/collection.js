// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "114.31665",
    latitude: "30.554408",
    markers: [],
    index: 0,
    name: "",
    params: [{
      title: "姓名",
      type: "text",
      typeName: "文本"
    }, {
      title: "发起日期",
      type: "date",
      typeName: "日期"
    }, {
      title: "闹钟",
      type: "time",
      typeName: "时间"
    }, {
      title: "发货地区",
      type: "region",
      typeName: "地区"
    }, {
      title: "价格",
      type: "digit",
      typeName: "数字"
    }, {
      title: "身份证号",
      type: "idcard",
      typeName: "身份证号"
    }, {
      title: "联系方式",
      type: "phone",
      typeName: "电话号码"
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ templates: getApp().templates });
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
    this.setData({
      index: e.detail.value
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
            iconPath: "../index/marker.svg"
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
            iconPath: "../index/marker.svg"
          }],
          latitude: res.latitude,
          longitude: res.longitude
        });
      }.bind(this)
    })
  },
  paramValueChange: function(e){
    var index = e.currentTarget.dataset.index;
    this.data.params[index].value = e.detail.value;
    this.setData({
      params: this.data.params
    })
  },
  addPhoto: function() {
    wx.chooseImage({
      count: 1,
      success: function(e){
        wx.previewImage({
          urls: e.tempFilePaths
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