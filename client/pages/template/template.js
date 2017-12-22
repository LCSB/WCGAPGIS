// pages/template/template.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp_name: "",
    columns: [{
      column_comment: "姓名",
      column_datatype: "文本"
    }, {
      column_comment: "发货日期",
      column_datatype: "日期"
    }, {
      column_comment: "发货地区",
      column_datatype: "地区"
    }, {
      column_comment: "价格",
      column_datatype: "数字"
    }],
    type: [{
      column_comment: "文本",
      value: "text"
    }, {
      column_comment: "数字",
      value: "digit"
    }, {
      column_comment: "日期",
      value: "date"
    }, {
      column_comment: "电话号码",
      value: "phone"
    }, {
      column_comment: "身份证号",
      value: "idcard"
    }, {
      column_comment: "时间",
      value: "time"
    }, {
      column_comment: "地区",
      value: "region"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新建采集点类别'
    });
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

  paramValueChange: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.columns[index].column_comment = e.detail.value;
    this.setData({columns: this.data.columns});
  },

  typeValueChange: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.columns[index].type = this.data.type[e.detail.value].value; this.data.columns[index].column_datatype = this.data.type[e.detail.value].column_comment;
    this.setData({ columns: this.data.columns });
  },

  deleteParam: function(e){
    var index = e.currentTarget.dataset.index;
    this.data.columns.splice(index, 1);
    this.setData({ columns: this.data.columns });
  },

  createParam: function(){
    this.data.columns.push({column_datatype: "请选择类型"});
    this.setData({ columns: this.data.columns });
  },
  bindNameChange: function(e){
    this.setData({
      temp_name: e.detail.value
    });
  },
  submit: function() {
    qcloud.request({
      url: config.service.templetUrl,
      method: "POST",
      data: {
        temp_name: this.data.temp_name,
        columns: this.data.columns
      },
      success: function(res){
        console.log(res);
        wx.navigateTo({
          url: "../collection/collection"
        });
      }
    })
  },
  cancel: function () {
    wx.navigateTo({
      url: "../collection/collection"
    });
  }
})