import { Config } from "./config";

class Token {
  constructor() {
    this.refreshUrl = Config.restUrl + "token/refresh";
    this.verifyUrl = Config.restUrl + "token/verify";
    this.tokenUrl = Config.restUrl + "token/login";
  }

  verify() {
    var access_token = wx.getStorageSync("access_token");
    var refresh_token = wx.getStorageSync("refresh_token");
    if (!access_token && !refresh_token) {
      this.getTokenByCodeFromServer();
    } else if (refresh_token && !access_token) {
      this.getTokenByRefreshToken(refresh_token);
    } else {
      this._veirfyFromServer(access_token);
    }
  }

  // 携带刷新令牌去服务器获取令牌
  _veirfyFromServer(access_token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: "get",
      header: {
        Authorization: "Bearer " + access_token
      },
      success: function(res) {
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenByCodeFromServer();
        }
      }
    });
  }

  // 根据refresh_token获取access_token
  getTokenByRefreshToken(refresh_token) {
    var that = this;
    wx.request({
      url: that.refreshUrl,
      method: "get",
      header: {
        Authorization: "Bearer " + refresh_token
      },
      success: function(res) {
        wx.setStorageSync("access_token", res.data.access_token);
        wx.setStorageSync("refresh_token", res.data.refresh_token);
      }
    });
  }

  //从通过code服务器获取token
  getTokenByCodeFromServer(callBack) {
    var that = this;
    wx.login({
      success: function(res) {
        wx.request({
          url: that.tokenUrl,
          method: "post",
          data: {
            code: res.code
          },
          success: function(res) {
            wx.setStorageSync("access_token", res.data.access_token);
            wx.setStorageSync("refresh_token", res.data.refresh_token);
            callBack && callBack(res.data.token);
          }
        });
      }
    });
  }
}

export { Token };
