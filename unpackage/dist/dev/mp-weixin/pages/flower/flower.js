"use strict";
const common_vendor = require("../../common/vendor.js");
const api_juhe = require("../../api/juhe.js");
const store_index = require("../../store/index.js");
require("../../utils/http/index.js");
require("../../utils/auth/index.js");
require("../../enum/cacheEnum.js");
require("../../utils/http/http.js");
require("../../config/index.js");
require("../../hooks/useEnv.js");
require("../../utils/http/helper.js");
require("../../utils/cache/index.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_component_van_field + _easycom_uni_card2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "flower",
  setup(__props) {
    const flowerName = common_vendor.ref("");
    const flowerDesc = common_vendor.ref();
    const store = store_index.useStore();
    const title = common_vendor.computed(() => common_vendor.unref(flowerDesc).cnflower + " " + common_vendor.unref(flowerDesc).enflower);
    const onChange = common_vendor.lodashExports.debounce(async (e) => {
      const name = e.detail;
      if (store.flower[name]) {
        return store.flower[name];
      }
      flowerDesc.value = await api_juhe.getFlower(name);
      store.setFlower({
        [name]: common_vendor.unref(flowerDesc)
      });
    }, 1e3);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(common_vendor.unref(onChange)),
        b: common_vendor.p({
          label: "花名",
          value: flowerName.value,
          placeholder: "请输入花名"
        }),
        c: flowerDesc.value
      }, flowerDesc.value ? {
        d: common_vendor.t(flowerDesc.value.flowerlang),
        e: common_vendor.t(flowerDesc.value.flowerprov),
        f: common_vendor.p({
          title: common_vendor.unref(title)
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/scan/personal-assistant/pages/flower/flower.vue"]]);
wx.createPage(MiniProgramPage);
