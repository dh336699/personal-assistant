"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "navigation",
  setup(__props) {
    const navTo = (type) => {
      if (type !== "cal") {
        common_vendor.index.navigateTo({
          url: "/pages/" + type + "/" + type
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/caculator/cal/cal"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => navTo("remaining")),
        b: common_vendor.p({
          title: "当年假期",
          extra: "跳转"
        }),
        c: common_vendor.p({
          title: "朋友圈文案",
          extra: "跳转"
        }),
        d: common_vendor.o(($event) => navTo("flower")),
        e: common_vendor.p({
          title: "花语箴言",
          extra: "跳转"
        }),
        f: common_vendor.o(($event) => navTo("mbti")),
        g: common_vendor.p({
          title: "MBTI性格测试",
          extra: "跳转"
        }),
        h: common_vendor.o(($event) => navTo("cal")),
        i: common_vendor.p({
          title: "热量营养计算",
          extra: "跳转"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/demon/work-space/mini-program/personal-assistant/pages/navigation/navigation.vue"]]);
wx.createPage(MiniProgramPage);
