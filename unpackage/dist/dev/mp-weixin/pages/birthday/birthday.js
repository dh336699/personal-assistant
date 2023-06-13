"use strict";
const common_vendor = require("../../common/vendor.js");
const api_juhe = require("../../api/juhe.js");
const utils_utils = require("../../utils/utils.js");
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
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_van_datetime_picker = common_vendor.resolveComponent("van-datetime-picker");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  (_easycom_uni_section2 + _component_van_datetime_picker + _component_van_popup + _component_van_field)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "birthday",
  setup(__props) {
    const store = store_index.useStore();
    const showPicker = common_vendor.ref(false);
    const bodyInfo = common_vendor.reactive({
      year: {
        value: void 0,
        required: true,
        validate: (val) => {
          if (val > common_vendor.dayjs().year() || val < common_vendor.dayjs().subtract(100, "year").year()) {
            return `年份不得小于${common_vendor.dayjs().subtract(100, "year").year()} ，不得大于${common_vendor.dayjs().year()}`;
          } else {
            return "";
          }
        },
        label: "出生年份",
        error: ""
      },
      month: {
        value: void 0,
        required: true,
        validate: (val) => {
          if (val >= 1 && val <= 12) {
            return "";
          } else {
            return "月份不得小于1 ，不得大于12";
          }
        },
        label: "出生月份",
        error: ""
      },
      day: {
        value: void 0,
        required: true,
        validate: (val) => {
          if (val >= 1 && val <= 31) {
            return "";
          } else {
            return "日期不得小于1 ，不得大于31";
          }
        },
        label: "出生日期",
        error: ""
      },
      hour: {
        value: void 0,
        required: true,
        validate: (val) => {
          if (val >= 0 && val <= 24) {
            return "";
          } else {
            return "出生小时不得小于0 ，不得大于24";
          }
        },
        label: "出生时辰(24小时制)",
        error: ""
      }
    });
    const today = common_vendor.ref(common_vendor.dayjs().valueOf());
    const minDay = common_vendor.ref(common_vendor.dayjs().subtract(100, "year").valueOf());
    const datetimesingle = common_vendor.ref(common_vendor.dayjs().subtract(20, "year").valueOf());
    const birthInfo = common_vendor.ref();
    const sectionTitle = common_vendor.computed(() => common_vendor.unref(birthInfo) ? common_vendor.dayjs(common_vendor.unref(datetimesingle)).format("YYYY-MM-DD HH:mm") : "可以在下方手动输入，也可以点此进行选择出生日期");
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
    const fieldConfirm = async (e, type) => {
      const value = e.detail.value;
      bodyInfo[type].value = value >= 0 ? Number(value) : void 0;
      if (bodyInfo.year.value > 0 && bodyInfo.month.value > 0 && bodyInfo.day.value > 0 && bodyInfo.hour.value > 0) {
        const data = await validate();
        if (!common_vendor.lodashExports.isEmpty(data)) {
          datetimesingle.value = common_vendor.dayjs(`${data.year}-${data.month}-${data.day} ${data.hour}`).valueOf();
          await submit(data.year, data.month, data.day, data.hour);
        }
      }
    };
    const validate = async () => {
      let bool = false;
      const res = {};
      for (let key in bodyInfo) {
        const data = bodyInfo[key];
        data.error = "";
        if (data.required && !data.value) {
          data.error = `${data.label}为必填项哦`;
        } else if (data.validate) {
          data.error = data.validate(data.value);
        }
        if (data.error) {
          bool = true;
        } else {
          res[key] = data.value;
        }
      }
      if (bool) {
        return Promise.reject("请检查输入的数据");
      }
      return Promise.resolve(res);
    };
    const changeLog = async (e) => {
      datetimesingle.value = e.detail;
      const date = common_vendor.dayjs(common_vendor.unref(datetimesingle));
      const year = date.year();
      const month = date.month() + 1;
      const day = date.date();
      const hour = date.hour();
      bodyInfo.year.value = year;
      bodyInfo.year.error = "";
      bodyInfo.month.value = month;
      bodyInfo.month.error = "";
      bodyInfo.day.value = day;
      bodyInfo.day.error = "";
      bodyInfo.hour.value = hour;
      bodyInfo.hour.error = "";
      await submit(year, month, day, hour);
    };
    const submit = async (year, month, day, hour) => {
      const cacheKey = `${year}-${month}-${day} ${hour}`;
      showPicker.value = false;
      if (store.birthday[cacheKey]) {
        birthInfo.value = store.birthday[cacheKey];
        return;
      }
      utils_utils.msg.loading();
      birthInfo.value = await api_juhe.getBirth({
        year,
        month,
        day,
        hour
      });
      store.setBirthday(cacheKey, common_vendor.unref(birthInfo));
      utils_utils.msg.hide();
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
      return common_vendor.e({
        a: common_vendor.o(($event) => showPicker.value = true),
        b: common_vendor.p({
          title: common_vendor.unref(sectionTitle),
          type: "line"
        }),
        c: common_vendor.o(($event) => showPicker.value = false),
        d: common_vendor.o(changeLog),
        e: common_vendor.p({
          visibleItemCount: 5,
          type: "datetime",
          minDate: minDay.value,
          maxDate: today.value,
          value: datetimesingle.value
        }),
        f: common_vendor.o(($event) => showPicker.value = false),
        g: common_vendor.p({
          show: showPicker.value,
          position: "bottom",
          customStyle: "height: 50%;"
        }),
        h: common_vendor.o((e) => fieldConfirm(e, "year")),
        i: common_vendor.o((e) => fieldConfirm(e, "year")),
        j: common_vendor.p({
          value: bodyInfo.year.value,
          label: bodyInfo.year.label,
          type: "number",
          required: true,
          placeholder: "请输入" + bodyInfo.year.label,
          errorMessage: bodyInfo.year.error
        }),
        k: common_vendor.o((e) => fieldConfirm(e, "month")),
        l: common_vendor.o((e) => fieldConfirm(e, "month")),
        m: common_vendor.p({
          value: bodyInfo.month.value,
          type: "number",
          required: true,
          label: bodyInfo.month.label,
          placeholder: "请输入" + bodyInfo.month.label,
          errorMessage: bodyInfo.month.error
        }),
        n: common_vendor.o((e) => fieldConfirm(e, "day")),
        o: common_vendor.o((e) => fieldConfirm(e, "day")),
        p: common_vendor.p({
          value: bodyInfo.day.value,
          type: "number",
          required: true,
          label: bodyInfo.day.label,
          placeholder: "请输入" + bodyInfo.day.label,
          errorMessage: bodyInfo.day.error
        }),
        q: common_vendor.o((e) => fieldConfirm(e, "hour")),
        r: common_vendor.o((e) => fieldConfirm(e, "hour")),
        s: common_vendor.p({
          value: bodyInfo.hour.value,
          type: "number",
          required: true,
          label: bodyInfo.hour.label,
          placeholder: "请输入" + bodyInfo.hour.label,
          errorMessage: bodyInfo.hour.error
        }),
        t: birthInfo.value
      }, birthInfo.value ? common_vendor.e({
        v: common_vendor.t(common_vendor.unref(cBirthday)),
        w: common_vendor.t((_a = birthInfo.value) == null ? void 0 : _a.ncWeek),
        x: common_vendor.t(common_vendor.unref(birthday)),
        y: common_vendor.t((_b = birthInfo.value) == null ? void 0 : _b.ImonthCn),
        z: common_vendor.t((_c = birthInfo.value) == null ? void 0 : _c.IDayCn),
        A: birthInfo.value.isTerm
      }, birthInfo.value.isTerm ? {
        B: common_vendor.t((_d = birthInfo.value) == null ? void 0 : _d.Term)
      } : {}, {
        C: common_vendor.t((_e = birthInfo.value) == null ? void 0 : _e.Animal),
        D: common_vendor.t((_f = birthInfo.value) == null ? void 0 : _f.astro),
        E: common_vendor.t((_i = (_h = (_g = birthInfo.value) == null ? void 0 : _g.eightAll) == null ? void 0 : _h.eight) == null ? void 0 : _i.join(", ")),
        F: (_k = (_j = birthInfo.value) == null ? void 0 : _j.eightAll) == null ? void 0 : _k.shu
      }, ((_m = (_l = birthInfo.value) == null ? void 0 : _l.eightAll) == null ? void 0 : _m.shu) ? {
        G: common_vendor.t((_o = (_n = birthInfo.value) == null ? void 0 : _n.eightAll) == null ? void 0 : _o.shu)
      } : {}, {
        H: common_vendor.t((_r = (_q = (_p = birthInfo.value) == null ? void 0 : _p.fiveAll) == null ? void 0 : _q.five) == null ? void 0 : _r.join(", ")),
        I: (_t = (_s = birthInfo.value) == null ? void 0 : _s.fiveAll) == null ? void 0 : _t.lose
      }, ((_v = (_u = birthInfo.value) == null ? void 0 : _u.fiveAll) == null ? void 0 : _v.lose) ? {
        J: common_vendor.t((_x = (_w = birthInfo.value) == null ? void 0 : _w.fiveAll) == null ? void 0 : _x.lose)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-39b6ffde"], ["__file", "/Users/demon/work-space/mini-program/personal-assistant/pages/birthday/birthday.vue"]]);
wx.createPage(MiniProgramPage);
