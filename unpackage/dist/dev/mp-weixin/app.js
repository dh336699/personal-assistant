"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/navigation/navigation.js";
  "./pages/remaining/remaining.js";
  "./pages/flower/flower.js";
  "./pages/mbti/mbti.js";
  "./pages/caculator/cal/cal.js";
  "./pages/caculator/result/result.js";
  "./pages/brand/brand.js";
  "./pages/brand/price.js";
  "./pages/birthday/birthday.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/scan/personal-assistant/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinpa: common_vendor.Pinpa
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
