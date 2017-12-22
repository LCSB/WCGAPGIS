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
    columns: [{
      column_comment: "姓名",
      column_datatype: "文本"
    }, {
      column_comment: "发起日期",
      column_datatype: "日期"
    }, {
      column_comment: "闹钟",
      column_datatype: "时间"
    }, {
      column_comment: "发货地区",
      column_datatype: "地区"
    }, {
      column_comment: "价格",
      column_datatype: "数字"
    }, {
      column_comment: "身份证号",
      column_datatype: "身份证号"
    }, {
      column_comment: "联系方式",
      column_datatype: "电话号码"
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