// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalshow: false,
    modalCur: {},
    listData: [{
        title: "",
        type: "title"
      },
      {
        title: "微信",
        type: "title"
      },
      {
        title: "支付宝",
        type: "title"
      },
      {
        title: "生活费",
        type: "title"
      },
      {
        title: "0",
        type: "btn",
        location: "00"
      },
      {
        title: "0",
        type: "btn",
        location: "10"
      },
      {
        title: "计划外支出",
        type: "title"
      },
      {
        title: "0",
        type: "btn",
        location: "01"
      },
      {
        title: "0",
        type: "btn",
        location: "11"
      },
      {
        title: "网购",
        type: "title"
      },
      {
        title: "0",
        type: "btn",
        location: "02"
      },
      {
        title: "0",
        type: "btn",
        location: "12"
      },
      {
        title: "交通",
        type: "title"
      },
      {
        title: "0",
        type: "btn",
        location: "03"
      },
      {
        title: "0",
        type: "btn",
        location: "13"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init(){
    const that = this;
    wx.cloud.callFunction({
      name: 'getSumByType',
      success: function (res) {
        that.initValue(res.result);
      },
      fail: function (res) {
        console.log(res)
      }
    })
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

  onModal() {
    const prev = this.data.modalshow;
    this.setData({
      modalCur: {},
      modalshow: !prev
    })
  },
  priceInput(e) {
    const {
      modalCur
    } = this.data;
    modalCur.price = parseInt(e.detail.value, 10);
    this.setData({
      modalCur
    })
  },
  remarkInput(e) {
    const {
      modalCur
    } = this.data;
    modalCur.remark = e.detail.value.slice(0,8);
    this.setData({
      modalCur
    })
  },
  initValue(valueObj) {
    const {
      listData
    } = this.data;
    listData.forEach(item => {
      if (item.type === 'btn') {
        item.value = valueObj[item.location] || 0
      }
    })
    this.setData({
      listData
    })
  },
  calcTitle(type1, type2) {
    const arr1 = ['微信', '支付宝'];
    const arr2 = ['生活费', '计划外支出', '网购', '交通'];
    return `${arr1[~~type1]}-${arr2[~~type2]}`;

  },
  onSubmit() {
    const {
      modalCur
    } = this.data;
    console.log(modalCur);
    wx.cloud.callFunction({
      name: 'insertData',
      data: {
        modalCur
      }
    }).then(res => {
      console.log(res.result.stats.updated);
      if (res.result.stats.updated) {
        wx.showToast({
          title: '添加成功',
        })
      }
    }).then(()=>{
      this.init();
      this.onModal();
    })
  },
  modalTap(e) {
    e.target.dataset.id === 'modal' && this.onModal();
  },
  add(event) {
    this.onModal();
    const [type1, type2] = event.currentTarget.dataset.location.split('');
    const {
      modalCur
    } = this.data;
    modalCur.type1 = type1;
    modalCur.type2 = type2;
    modalCur.title = this.calcTitle(type1, type2);
    this.setData({
      modalCur
    });
  },
  // 跳转页面去展示所有，可以显示总体趋势，可以显示列表
  showDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?location=${event.currentTarget.dataset.location}`
    })
  }
})