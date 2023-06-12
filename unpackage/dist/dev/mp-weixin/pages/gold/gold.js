"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  (_component_van_cell + _component_van_cell_group)();
}
const _sfc_main = {
  __name: "gold",
  setup(__props) {
    const list = common_vendor.ref([]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "fef4fb26-1-" + i0 + ",fef4fb26-0",
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/scan/personal-assistant/pages/gold/gold.vue"]]);
wx.createPage(MiniProgramPage);
