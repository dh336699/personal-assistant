"use strict";
const common_vendor = require("../../common/vendor.js");
const api_juhe = require("../../api/juhe.js");
const utils_utils = require("../../utils/utils.js");
require("../../utils/http/index.js");
require("../../utils/auth/index.js");
require("../../enum/cacheEnum.js");
require("../../utils/http/http.js");
require("../../config/index.js");
require("../../hooks/useEnv.js");
require("../../utils/http/helper.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_section2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_datetime_picker)();
}
const _sfc_main = {
  __name: "birthday",
  setup(__props) {
    const datetimesingle = common_vendor.ref("");
    const birthInfo = common_vendor.ref();
    const cBirthday = common_vendor.computed(() => {
      if (common_vendor.unref(birthInfo)) {
        return `${common_vendor.unref(birthInfo).cYear}-${common_vendor.unref(birthInfo).cMonth}-${common_vendor.unref(birthInfo).cDay}`;
      } else {
        return "";
      }
    });
    const birthday = common_vendor.computed(() => {
      if (common_vendor.unref(birthInfo)) {
        return `${common_vendor.unref(birthInfo).year}-${common_vendor.unref(birthInfo).month}-${common_vendor.unref(birthInfo).day}`;
      } else {
        return "";
      }
    });
    const changeLog = async () => {
      console.log(common_vendor.unref(datetimesingle));
      const date = common_vendor.dayjs(common_vendor.unref(datetimesingle));
      utils_utils.msg.loading();
      birthInfo.value = await api_juhe.getBirth({
        year: date.year(),
        month: date.month() + 1,
        day: date.date(),
        hour: date.hour()
      });
      utils_utils.msg.hide();
      console.log(common_vendor.unref(birthInfo));
    };
    common_vendor.onLoad(() => {
      datetimesingle.value = common_vendor.dayjs().subtract(20, "year").format("YYYY-MM-DD HH:mm:ss");
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
      return common_vendor.e({
        a: common_vendor.p({
          title: "选择出生日期：" + datetimesingle.value,
          type: "line"
        }),
        b: common_vendor.o(changeLog),
        c: common_vendor.o(($event) => datetimesingle.value = $event),
        d: common_vendor.p({
          type: "datetime",
          modelValue: datetimesingle.value
        }),
        e: birthInfo.value
      }, birthInfo.value ? common_vendor.e({
        f: common_vendor.t(common_vendor.unref(cBirthday)),
        g: common_vendor.t((_a = birthInfo.value) == null ? void 0 : _a.ncWeek),
        h: common_vendor.t(common_vendor.unref(birthday)),
        i: common_vendor.t((_b = birthInfo.value) == null ? void 0 : _b.ImonthCn),
        j: common_vendor.t((_c = birthInfo.value) == null ? void 0 : _c.IDayCn),
        k: birthInfo.value.isTerm
      }, birthInfo.value.isTerm ? {
        l: common_vendor.t((_d = birthInfo.value) == null ? void 0 : _d.Term)
      } : {}, {
        m: common_vendor.t((_e = birthInfo.value) == null ? void 0 : _e.Animal),
        n: common_vendor.t((_f = birthInfo.value) == null ? void 0 : _f.astro),
        o: common_vendor.t((_i = (_h = (_g = birthInfo.value) == null ? void 0 : _g.eightAll) == null ? void 0 : _h.eight) == null ? void 0 : _i.join(", ")),
        p: (_k = (_j = birthInfo.value) == null ? void 0 : _j.eightAll) == null ? void 0 : _k.shu
      }, ((_m = (_l = birthInfo.value) == null ? void 0 : _l.eightAll) == null ? void 0 : _m.shu) ? {
        q: common_vendor.t((_o = (_n = birthInfo.value) == null ? void 0 : _n.eightAll) == null ? void 0 : _o.shu)
      } : {}, {
        r: common_vendor.t((_r = (_q = (_p = birthInfo.value) == null ? void 0 : _p.fiveAll) == null ? void 0 : _q.five) == null ? void 0 : _r.join(", ")),
        s: (_t = (_s = birthInfo.value) == null ? void 0 : _s.fiveAll) == null ? void 0 : _t.lose
      }, ((_v = (_u = birthInfo.value) == null ? void 0 : _u.fiveAll) == null ? void 0 : _v.lose) ? {
        t: common_vendor.t((_x = (_w = birthInfo.value) == null ? void 0 : _w.fiveAll) == null ? void 0 : _x.lose)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-39b6ffde"], ["__file", "D:/scan/personal-assistant/pages/birthday/birthday.vue"]]);
wx.createPage(MiniProgramPage);
