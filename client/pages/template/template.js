// pages/template/template.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: [{
      title: "姓名",
      type: "text",
      typeName: "文本"
    }, {
      title: "发起日期",
      type: "date",
      typeName: "日期"
    }, {
      title: "发货地区",
      type: "region",
      typeName: "地区"
    }, {
      title: "价格",
      type: "digit",
      typeName: "数字"
    }],
    type: [{
      title: "文本",
      value: "text"
    }, {
      title: "数字",
      value: "digit"
    }, {
      title: "日期",
      value: "date"
    }, {
      title: "电话号码",
      value: "phone"
    }, {
      title: "身份证号",
      value: "idcard"
    }, {
      title: "时间",
      value: "time"
    }, {
      title: "地区",
      value: "region"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新建采集点模版'
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
    this.data.params[index].title = e.detail.value;
    this.setData({params: this.data.params});
  },

  typeValueChange: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.params[index].type = this.data.type[e.detail.value].value; this.data.params[index].typeName = this.data.type[e.detail.value].title;
    this.setData({ params: this.data.params });
  },

  deleteParam: function(e){
    var index = e.currentTarget.dataset.index;
    this.data.params.splice(index, 1);
    this.setData({ params: this.data.params });
  },

  createParam: function(){
    this.data.params.push({typeName: "类型"});
    this.setData({ params: this.data.params });
  }
})