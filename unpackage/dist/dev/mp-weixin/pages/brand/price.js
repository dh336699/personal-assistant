"use strict";
const common_vendor = require("../../common/vendor.js");
const api_juhe = require("../../api/juhe.js");
require("../../utils/http/index.js");
require("../../utils/auth/index.js");
require("../../enum/cacheEnum.js");
require("../../utils/http/http.js");
require("../../config/index.js");
require("../../hooks/useEnv.js");
require("../../utils/http/helper.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  (_component_van_cell + _easycom_uni_card2 + _component_van_empty)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "price",
  setup(__props) {
    const brandInfo = common_vendor.ref();
    common_vendor.onLoad(async (options) => {
      if (options == null ? void 0 : options.id) {
        brandInfo.value = await api_juhe.getGoldPrice(options == null ? void 0 : options.id);
        console.log(brandInfo.value);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: brandInfo.value
      }, brandInfo.value ? common_vendor.e({
        b: common_vendor.p({
          title: "黄金参考价",
          value: brandInfo.value.goldPrice,
          label: "最新更新时间: " + brandInfo.value.auLastDate
        }),
        c: brandInfo.value.platinumPrice
      }, brandInfo.value.platinumPrice ? {
        d: common_vendor.p({
          title: "铂金参考价",
          value: brandInfo.value.platinumPrice,
          label: "最新更新时间: " + brandInfo.value.ptLastDate
        })
      } : {}, {
        e: common_vendor.p({
          title: brandInfo.value.brand
        })
      }) : {
        f: common_vendor.p({
          description: "暂无数据"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/scan/personal-assistant/pages/brand/price.vue"]]);
wx.createPage(MiniProgramPage);
