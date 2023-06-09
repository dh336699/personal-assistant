"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_auth_index = require("../auth/index.js");
const utils_http_http = require("./http.js");
const config_index = require("../../config/index.js");
const utils_http_helper = require("./helper.js");
const transform = {
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      urlPrefix,
      joinTime
    } = options;
    let {
      url,
      method,
      data,
      header
    } = config;
    if (joinPrefix && urlPrefix) {
      url = `${urlPrefix}${url}`;
    }
    if (apiUrl && typeof apiUrl === "string") {
      url = `${apiUrl}${url}`;
    }
    if (!data instanceof Object) {
      data = Object.assign({}, data, utils_http_helper.joinTimestamp(joinTime, false));
    } else {
      if (method.toUpperCase() === "GET" && typeof data === "string" || typeof data === "number") {
        url = `${url}/${data}` + utils_http_helper.joinTimestamp(joinTime, true);
      }
    }
    const token = utils_auth_index.getToken();
    if (token && withToken) {
      header.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;
    }
    return {
      ...config,
      url,
      method,
      data,
      header
    };
  },
  transformResponseHook: (res, options) => {
    const {
      isTransformResponse,
      isReturnNativeResponse,
      modal
    } = options;
    if (isReturnNativeResponse) {
      return res;
    }
    if (!isTransformResponse) {
      return res.data;
    }
    const {
      data
    } = res;
    if (!data) {
      throw new Error("请求失败");
    }
    const {
      code,
      result,
      msg,
      status
    } = data;
    console.log(data, "data");
    const hasSuccess = code === 200 || status === 0;
    if (hasSuccess) {
      if (modal) {
        if (modal.type === "toast") {
          common_vendor.index.showToast({
            title: modal.content,
            icon: modal.icon
          });
        } else {
          common_vendor.index.showModal({
            title: modal.title || "提示",
            content: modal.content
          });
        }
      }
      return result;
    }
    let timeoutMsg = "";
    switch (code) {
      case 502:
        timeoutMsg = "请求超时";
        useUserStoreWithOut();
        break;
      default:
        if (msg) {
          timeoutMsg = msg;
        }
    }
    if (modal) {
      if (modal.type === "toast") {
        common_vendor.index.showToast({
          title: "请求失败，请稍后再试",
          icon: "error"
        });
      } else {
        common_vendor.index.showModal({
          title: "提示",
          content: "请求失败，请稍后再试"
        });
      }
    }
    throw new Error(timeoutMsg || "请求失败");
  }
};
function createHttp(opt) {
  return new utils_http_http.Http(Object.assign({}, {
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    transform,
    // 下面的配置可以在独立接口中覆盖
    authenticationScheme: "Bearer",
    // 默认将prefix 添加到url
    joinPrefix: true,
    urlPrefix: config_index.globSetting.urlPrefix,
    apiUrl: config_index.globSetting.apiUrl,
    joinTime: true,
    isTransformResponse: true,
    isReturnNativeResponse: false,
    // 是否携带token
    withToken: true
  }, opt));
}
createHttp();
createHttp({
  apiUrl: "http://api.moonapi.com"
});
const tianHttp = createHttp({
  apiUrl: "https://apis.tianapi.com"
});
const jisuHttp = createHttp({
  apiUrl: "https://api.jisuapi.com"
});
exports.jisuHttp = jisuHttp;
exports.tianHttp = tianHttp;
