import { Config } from "./config";
import Fly from "flyio/dist/npm/wx";

const fly = new Fly();

//添加请求拦截器
fly.interceptors.request.use(request => {
  //给所有请求添加自定义header
  request.headers["X-Tag"] = "flyio";
  var access_token = wx.getStorageSync("access_token");
  console.log(access_token);
  request.headers["Authorization"] = "Bearer " + access_token;
  //打印出请求体
  console.log(request.body);
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    //只将请求结果的data字段返回
    var code = response.statusCode.toString();
    var startChar = code.charAt(0);
    if (startChar == "2") {
      return response.data;
    } else {
    }
  },
  err => {
    wx.showLoading({
      title: err.message, //提示的内容,
      mask: true, //显示透明蒙层，防止触摸穿透,
      success: res => {}
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 3000);
  }
);

class Http {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
    this.newfly = fly;
  }

  get(params, noRefetch) {
    return this.request(params.url, params.data, "get", noRefetch);
  }

  post(params, noRefetch) {
    return this.request(params.url, params.data, "post", noRefetch);
  }

  delete(params, noRefetch) {
    return this.request(params.url, params.data, "delete", noRefetch);
  }

  put(params, noRefetch) {
    return this.request(params.url, params.data, "put", noRefetch);
  }

  /**
   * 通用请求
   */
  request(url, data, type, noRefetch) {
    return this.newfly.request(this.baseRequestUrl + url, data, {
      method: type,
      timeout: 5000 //超时设置为5s
    });
  }
}

export { Http };
