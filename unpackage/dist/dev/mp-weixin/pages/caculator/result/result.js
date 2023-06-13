"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_juhe = require("../../../api/juhe.js");
const store_index = require("../../../store/index.js");
require("../../../utils/http/index.js");
require("../../../utils/auth/index.js");
require("../../../enum/cacheEnum.js");
require("../../../utils/http/http.js");
require("../../../config/index.js");
require("../../../hooks/useEnv.js");
require("../../../utils/http/helper.js");
require("../../../utils/cache/index.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  _component_van_cell();
}
const _sfc_main = {
  __name: "result",
  setup(__props) {
    const bodyInfo = common_vendor.reactive({});
    const bmi = common_vendor.ref("");
    const metabolicRate = common_vendor.ref(0);
    const metabolicCalories = common_vendor.ref(0);
    const carbon = common_vendor.ref(0);
    const protein = common_vendor.ref(0);
    const fat = common_vendor.ref(0);
    const store = store_index.useStore();
    const nutritionCal = () => {
      const {
        weight,
        exercise,
        exerciseIdx
      } = bodyInfo;
      carbon.value = weight * exercise || 0;
      protein.value = exerciseIdx < 6 ? 1.5 * weight : exerciseIdx >= 6 && exerciseIdx <= 7 ? 1.8 * weight : 2.1 * weight + common_vendor.unref(carbon);
      fat.value = ((common_vendor.unref(metabolicCalories) - 4 * (common_vendor.unref(protein) + common_vendor.unref(carbon))) / 9).toFixed(2);
    };
    const caloriesCal = () => {
      const {
        active
      } = bodyInfo;
      metabolicCalories.value = (common_vendor.unref(metabolicRate) * active).toFixed(2);
      nutritionCal();
    };
    const metabolicCal = () => {
      let {
        sex,
        age,
        height,
        weight,
        bodyFat,
        goal
      } = bodyInfo;
      var e, t, a, g = 0;
      if (sex === 1) {
        e = 10 * weight + 6.25 * height - 5 * age - 161;
        t = 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;
        if (age < 3) {
          a = 61 * weight - 51;
        } else if (age < 10) {
          a = 22.5 * weight + 499;
        } else if (age < 18) {
          a = 12.2 * weight + 746;
        } else if (age < 30) {
          a = 14.7 * weight + 496;
        } else if (age < 60) {
          a = 8.7 * weight + 829;
        } else if (age > 60) {
          a = 10.5 * weight + 596;
        }
      } else {
        e = 10 * weight + 6.25 * height - 5 * age + 5;
        t = 66.47 + 13.75 * weight + 5 * height - 6.67 * age;
        if (age < 3) {
          a = 60.9 * weight - 54;
        } else if (age < 10) {
          a = 22.7 * weight + 495;
        } else if (age < 18) {
          a = 17.5 * weight + 651;
        } else if (age < 30) {
          a = 15.3 * weight + 679;
        } else if (age < 60) {
          a = 11.6 * weight + 879;
        } else if (age > 60) {
          a = 13.5 * weight + 487;
        }
      }
      if (bodyFat > 0) {
        g = (1 - bodyFat / 100) * weight * 21.6 + 370;
      }
      switch (goal) {
        case 1:
          if (Number(bodyFat) > 18) {
            metabolicRate.value = Math.min(e, g, t, a);
          } else if (bodyFat && Number(bodyFat) <= 18) {
            metabolicRate.value = Math.max(e, g, t, a);
          }
          break;
        case 2:
          metabolicRate.value = g ? Math.min(e, g, t, a) : Math.min(e, t, a);
          break;
        case 3:
          metabolicRate.value = g ? Math.max(e, g, t, a) : Math.max(e, t, a);
      }
      metabolicRate.value = metabolicRate.value.toFixed(2);
      caloriesCal();
    };
    const _init = async () => {
      if (store.bodyInfos) {
        const {
          bodyInfos
        } = store;
        for (let key in bodyInfos) {
          bodyInfo[key] = bodyInfos[key];
        }
        metabolicCal();
        bmi.value = await api_juhe.getBmi({
          height: bodyInfo.height,
          weight: bodyInfo.weight,
          sex: bodyInfo.sex
        });
      }
    };
    common_vendor.onLoad(() => _init());
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "BMI",
          value: bmi.value.bmi,
          label: bmi.value.tip + "标准体重: " + bmi.value.normweight
        }),
        b: common_vendor.p({
          title: "基础代谢率",
          value: metabolicRate.value
        }),
        c: common_vendor.p({
          title: "代谢热量",
          value: metabolicCalories.value + "kcal"
        }),
        d: common_vendor.p({
          title: "建议碳水摄入",
          value: carbon.value + "g"
        }),
        e: common_vendor.p({
          title: "建议蛋白质摄入",
          value: protein.value + "g"
        }),
        f: common_vendor.p({
          title: "建议脂肪摄入",
          value: fat.value + "g"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dcee2c36"], ["__file", "/Users/demon/work-space/mini-program/personal-assistant/pages/caculator/result/result.vue"]]);
wx.createPage(MiniProgramPage);
