"use strict";
const common_vendor = require("../../common/vendor.js");
const api_juhe = require("../../api/juhe.js");
const store_index = require("../../store/index.js");
const utils_utils = require("../../utils/utils.js");
require("../../utils/http/index.js");
require("../../utils/auth/index.js");
require("../../enum/cacheEnum.js");
require("../../utils/http/http.js");
require("../../config/index.js");
require("../../hooks/useEnv.js");
require("../../utils/http/helper.js");
require("../../utils/cache/index.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  (_component_van_cell + _component_van_cell_group)();
}
const _sfc_main = {
  __name: "brand",
  setup(__props) {
    const list = common_vendor.ref([]);
    const store = store_index.useStore();
    common_vendor.onLoad(async () => {
      if (common_vendor.lodashExports.isEmpty(store.goldBrand)) {
        utils_utils.msg.loading();
        list.value = await api_juhe.getGoldShop();
        store.setGoldBrand(common_vendor.unref(list));
        utils_utils.msg.hide();
      } else {
        list.value = store.goldBrand;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "7f49973d-1-" + i0 + ",7f49973d-0",
            c: common_vendor.p({
              title: item.brand,
              value: "点击查看最新价格",
              isLink: true,
              url: "/pages/brand/price?id=" + item._id
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/scan/personal-assistant/pages/brand/brand.vue"]]);
wx.createPage(MiniProgramPage);
