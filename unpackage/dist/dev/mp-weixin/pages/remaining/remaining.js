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
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _component_van_collapse_item = common_vendor.resolveComponent("van-collapse-item");
  const _component_van_collapse = common_vendor.resolveComponent("van-collapse");
  const _component_van_calendar = common_vendor.resolveComponent("van-calendar");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_easycom_uni_tag2 + _component_van_collapse_item + _component_van_collapse + _component_van_calendar + _component_van_button)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  _easycom_uni_tag();
}
const _sfc_main = {
  __name: "remaining",
  setup(__props) {
    const show = common_vendor.ref(false);
    common_vendor.ref(new Date(2e3, 0, 1).getTime());
    common_vendor.ref(new Date(2050, 11, 31).getTime());
    const list = common_vendor.ref([]);
    const activeNames = common_vendor.ref(["1"]);
    const map = /* @__PURE__ */ new Map();
    const store = store_index.useStore();
    const formatter = (day) => {
      const date = common_vendor.dayjs(day.date).format("M月D号");
      const date2 = common_vendor.dayjs(day.date).format("YYYY-MM-DD");
      if (map.has(date)) {
        day.bottomInfo = map.get(date);
        day.className = "festival";
      } else if (map.has(date2)) {
        day.bottomInfo = map.get(date2);
        day.className = "festival";
      }
      return day;
    };
    common_vendor.onShow(async () => {
      utils_utils.msg.loading();
      if (common_vendor.lodashExports.isEmpty(store.vacation)) {
        const data = await api_juhe.getVacationList(common_vendor.dayjs().year());
        store.setVacation(data.list);
      }
      const vacations = common_vendor.lodashExports.cloneDeep(store.vacation);
      list.value = vacations.map((item) => {
        var _a;
        map.set(item.holiday, item.name);
        item.vacation = item.vacation ? (_a = item.vacation) == null ? void 0 : _a.split("|") : [];
        item.vacation.forEach((it) => {
          map.set(it, "假期");
        });
        return item;
      });
      utils_utils.msg.hide();
    });
    common_vendor.onShareAppMessage((res) => {
      if (res.from === "button") {
        console.log(res.target);
      }
      return {
        title: "假期查询",
        imageUrl: "/static/remaining.png",
        path: "/pages/remaining/remaining",
        desc: "假期查询，假期安排，请假助手"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.tip),
            b: common_vendor.f(item.vacation, (it, k1, i1) => {
              return {
                a: "4a7bc74a-2-" + i0 + "-" + i1 + "," + ("4a7bc74a-1-" + i0),
                b: common_vendor.p({
                  text: it,
                  size: "small",
                  type: "primary"
                }),
                c: it
              };
            }),
            c: common_vendor.t(item.rest),
            d: item.name,
            e: "4a7bc74a-1-" + i0 + ",4a7bc74a-0",
            f: common_vendor.p({
              title: item.name + " " + item.holiday,
              name: item.holiday
            })
          };
        }),
        b: common_vendor.o((e) => activeNames.value = e.detail),
        c: common_vendor.p({
          value: activeNames.value
        }),
        d: show.value
      }, show.value ? {
        e: common_vendor.o(($event) => show.value = false),
        f: common_vendor.p({
          show: true,
          formatter
        })
      } : {}, {
        g: common_vendor.o(() => show.value = true),
        h: common_vendor.p({
          type: "primary",
          block: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/scan/personal-assistant/pages/remaining/remaining.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
