const sign = require('sign/sign.js')

export const config = (accessTicket, url) => {
  const config = sign(accessTicket, url)
  window.wx && window.wx.config({
    debug: false,
    appId: 'wx1d312c35eb2b8864',
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature,
    jsApiList: ['onMenuShareAppMessage']
  })
}

export const share = (title, desc, link, imgUrl) => {
  const img = imgUrl || 'https://s3.cn-north-1.amazonaws.com.cn/hs-application/icons/bjyxh-logo.png'
  window.wx && window.wx.ready(function () {
    window.wx.checkJsApi({
      jsApiList: [
        'onMenuShareAppMessage'
      ],
      success: function (res) {
      }
    })
    window.wx && window.wx.onMenuShareAppMessage({
      title: title, // '2017年北京地区病理学术年会', // 分享标题
      desc: desc, // '北京医学会病理学分会', // 分享描述
      // link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      link: link,
      imgUrl: img, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
      },
      cancel: function () {
      },
      fail: function (res) {
      }
    })
  })
}
