export default (params) => {
  return new Promise((resolve, reject) => {

    // 加载中请求时候显示加载效果
    uni.showLoading({
      title: '加载中'
    })

    wx.request({
      ...params,
      success (res) {
        resolve(res.data);
      },
      fail (err) {
        reject(err);
      },
      // 请求成功或者失败都会触发complete,隐藏效果
      complete () {
        uni.hideLoading();
      }
    })
  })
}