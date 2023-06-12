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
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  (_component_van_cell + _component_van_cell_group)();
}
const _sfc_main = {
  __name: "brand",
  setup(__props) {
    const list = common_vendor.ref([]);
    common_vendor.onLoad(async () => {
      const data = await api_juhe.getGoldShop();
      console.log(data);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "9f075c6c-1-" + i0 + ",9f075c6c-0",
            c: common_vendor.p({
              title: "品牌",
              value: item.brand,
              isLink: true,
              url: "/pages/gold/price?id=" + item._id
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/scan/personal-assistant/pages/gold/brand.vue"]]);
wx.createPage(MiniProgramPage);
