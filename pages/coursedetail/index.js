var app = getApp()
Page({
  data: {
    userInfo: {},
    // 页面的宽高属性
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },
  onLoad: function () {
      wx.pro.getSystemInfo()
        .then((res) => {
            this.setData( {
              winWidth: res.windowWidth,
              winHeight: res.windowHeight
            });
        })
        .catch((err) => {
            console.log(err);
        })
  },
  bindChange(e) {
      const that = this;
      that.setData({ currentTab: e.detail.current });
  },

  switchNav(e) {
      const that = this;
      if (this.data.currentTab === e.target.dataset.current ) {
          return false;
      } else {
          that.setData({
              currentTab: e.target.dataset.current
          })
      }
  }

})