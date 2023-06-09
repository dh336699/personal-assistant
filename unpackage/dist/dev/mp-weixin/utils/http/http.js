"use strict";
const common_vendor = require("../../common/vendor.js");
class Http {
  constructor(options) {
    this.options = options;
  }
  getTransform() {
    const {
      transform
    } = this.options;
    return transform;
  }
  get(config, options) {
    return this.request({
      ...config,
      method: "GET"
    }, options);
  }
  post(config, options) {
    return this.request({
      ...config,
      method: "POST"
    }, options);
  }
  put(config, options) {
    return this.request({
      ...config,
      method: "PUT"
    }, options);
  }
  delete(config, options) {
    return this.request({
      ...config,
      method: "DELETE"
    }, options);
  }
  request(config, options) {
    const transform = this.getTransform();
    config.header = config.header || (options == null ? void 0 : options.header) || this.options.header;
    const {
      beforeRequestHook,
      transformResponseHook
    } = transform || {};
    const opt = Object.assign({}, options, this.options);
    if (beforeRequestHook) {
      config = beforeRequestHook(config, opt);
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request(config).then((res) => {
        if (transformResponseHook) {
          resolve(transformResponseHook(res, opt));
        }
        resolve(res);
      }).catch((err) => reject(err));
    });
  }
}
exports.Http = Http;
