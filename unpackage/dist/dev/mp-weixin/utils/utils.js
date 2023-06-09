"use strict";
const common_vendor = require("../common/vendor.js");
const msg = {
  loading: (title = "加载中", mask = true) => common_vendor.index.showLoading({
    title,
    mask
  }),
  hide: () => common_vendor.index.hideLoading(),
  toast: (title = "请求失败", icon = "none", callback) => common_vendor.index.showToast({
    title,
    icon,
    success: () => callback && callback()
  }),
  modal: (content, confirmCallBack, cancelCallBack, title = "提示") => common_vendor.index.showModal({
    title,
    content,
    success: async function(res) {
      if (res.confirm) {
        confirmCallBack && await confirmCallBack();
      } else if (res.cancel) {
        cancelCallBack && await cancelCallBack();
      }
    }
  })
};
exports.msg = msg;
