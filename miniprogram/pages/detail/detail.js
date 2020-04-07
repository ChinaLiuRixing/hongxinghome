// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    listdata:[
      {person:"person",time:"2020年04月04日",value:50,remark:"哈哈北京上海广州"},
      {person:"person",time:"2020年04月04日",value:50,remark:"哈哈"},
      {person:"person",time:"2020年04月04日",value:50,remark:"哈哈"},
      {person:"person",time:"2020年04月04日",value:50,remark:"哈哈"},
      {person:"person",time:"2020年04月04日",value:50,remark:"哈哈"},
      {person:"person",time:"2020年04月04日",value:50,remark:"哈哈"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {location} = options || {};
    const {type1,type2} = location.split('');
    this.setData({
      title:this.calcTitle(type1,type2)
    })
    this.init(location);
  },
  init(location){
    const that = this;
    wx.cloud.callFunction({
      name: 'getList',
      data:{
        location
      },
      success: function (res) {
        that.initValue(res.result);
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  initValue(valueObj){
    this.setData({
      listdata:valueObj
    })
  },
  calcTitle(type1, type2) {
    const arr1 = ['微信', '支付宝'];
    const arr2 = ['生活费', '计划外支出', '网购', '交通'];
    return `${arr1[~~type1]}-${arr2[~~type2]}`;
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