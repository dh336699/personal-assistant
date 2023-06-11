"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_index = require("../../../store/index.js");
require("../../../utils/cache/index.js");
require("../../../enum/cacheEnum.js");
if (!Array) {
  const _component_van_radio = common_vendor.resolveComponent("van-radio");
  const _component_van_radio_group = common_vendor.resolveComponent("van-radio-group");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_radio + _component_van_radio_group + _component_van_cell + _component_van_field + _component_van_button)();
}
const _sfc_main = {
  __name: "cal",
  setup(__props) {
    const store = store_index.useStore();
    common_vendor.ref(false);
    common_vendor.ref(false);
    const bodyInfo = common_vendor.reactive({
      sex: {
        value: 0,
        error: "",
        label: "性别"
      },
      age: {
        value: void 0,
        required: true,
        validate: (val) => {
          if (val > 0 && val < 100) {
            return "";
          } else {
            return "年龄不得小于0 ，不得大于100";
          }
        },
        label: "性别",
        error: ""
      },
      height: {
        value: void 0,
        required: true,
        validate: (val) => {
          if (val > 100 && val < 250) {
            return "";
          } else {
            return "身高不得小于100 ，不得大于250";
          }
        },
        label: "身高",
        error: ""
      },
      weight: {
        value: void 0,
        required: true,
        validate: (val) => {
          if (val > 20 && val < 400) {
            return "";
          } else {
            return "体重不得小于20 ，不得大于400";
          }
        },
        label: "体重",
        error: ""
      },
      bodyFat: {
        value: void 0,
        required: false,
        validate: (val) => {
          if (val > 0 && val < 40) {
            return "";
          } else {
            return "体脂不得小于0 ，不得大于40";
          }
        },
        error: ""
      },
      active: {
        value: void 0,
        required: true,
        label: "活动系数",
        error: ""
      },
      exercise: {
        value: void 0,
        required: true,
        label: "碳水摄入量",
        error: ""
      },
      goal: {
        value: 1,
        required: true,
        label: "目标",
        error: ""
      }
    });
    const activeList = common_vendor.ref([{
      key: 1.2,
      text: "久坐且不运动"
    }, {
      key: 1.375,
      text: "久坐, 少量或不运动, 但职业要求少量运动"
    }, {
      key: 1.55,
      text: "久坐但规律训练, 适合大部分训练者"
    }, {
      key: 1.725,
      text: "动的多, 练得多"
    }, {
      key: 1.9,
      text: "从事体力劳动且训练消耗大"
    }]);
    const activeIdx = common_vendor.ref();
    const exerciseList = common_vendor.ref([{
      key: 1,
      text: "减肥计划执行者,适用于很少的增氧练习"
    }, {
      key: 2,
      text: "睡觉,看电视,久坐"
    }, {
      key: 3,
      text: "日常家务事(多数成年人的摄入量)"
    }, {
      key: 4,
      text: "散步,温和运动"
    }, {
      key: 4.5,
      text: "修养运动,健身练习(3~5小时/周)"
    }, {
      key: 5,
      text: "足球,橄榄球,篮球,健身,塑身,举重(5~6小时/周)"
    }, {
      key: 6,
      text: "中等运动强度(7~10小时/周)"
    }, {
      key: 8,
      text: "健身运动,耐力运动,跑步(10小时以上/周)"
    }, {
      key: 10,
      text: "全职运动员,超强耐力训练,铁人三项(15小时/周)"
    }]);
    common_vendor.ref([{
      key: 1,
      value: "减脂"
    }, {
      key: 2,
      value: "塑形"
    }, {
      key: 3,
      value: "增肌"
    }]);
    const exerciseIdx = common_vendor.ref();
    common_vendor.ref();
    const fieldConfirm = (e, type) => {
      const value = e.detail.value || e.detail;
      const val = Number(value);
      bodyInfo[type].value = val;
    };
    const handlePicker = (e, type) => {
      if (type === "activeIdx") {
        activeIdx.value = Number(e.detail.value);
        bodyInfo.active.value = common_vendor.unref(activeList)[common_vendor.unref(activeIdx)].key;
      } else if (type === "exerciseIdx") {
        exerciseIdx.value = Number(e.detail.value);
        bodyInfo.exercise.value = common_vendor.unref(exerciseList)[common_vendor.unref(exerciseIdx)].key;
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
    const calculate = async () => {
      const data = await validate();
      store.setBodyInfos({
        ...data,
        activeIdx: common_vendor.unref(activeIdx),
        exerciseIdx: common_vendor.unref(exerciseIdx)
      });
      common_vendor.index.navigateTo({
        url: "../result/result"
      });
    };
    common_vendor.onLoad((e) => {
      if (!common_vendor.lodashExports.isEmpty(store.bodyInfos)) {
        const {
          bodyInfos
        } = store;
        for (let key in bodyInfos) {
          if (key === "exerciseIdx") {
            exerciseIdx.value = bodyInfos[key];
          } else if (key === "activeIdx") {
            activeIdx.value = bodyInfos[key];
          } else {
            bodyInfo[key].value = bodyInfos[key];
          }
        }
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: 0
        }),
        b: common_vendor.p({
          name: 1,
          checkedColor: "#07c160"
        }),
        c: common_vendor.o((e) => bodyInfo.sex.value = e.detail),
        d: common_vendor.p({
          value: bodyInfo.sex.value,
          direction: "horizontal"
        }),
        e: common_vendor.p({
          title: "性别"
        }),
        f: common_vendor.o((e) => fieldConfirm(e, "age")),
        g: common_vendor.o((e) => fieldConfirm(e, "age")),
        h: common_vendor.p({
          value: bodyInfo.age.value,
          label: "年龄",
          type: "number",
          required: true,
          placeholder: "请输入年龄",
          errorMessage: bodyInfo.age.error
        }),
        i: common_vendor.o((e) => fieldConfirm(e, "height")),
        j: common_vendor.o((e) => fieldConfirm(e, "height")),
        k: common_vendor.p({
          value: bodyInfo.height.value,
          type: "number",
          required: true,
          label: "身高(cm)",
          placeholder: "请输入身高",
          errorMessage: bodyInfo.height.error
        }),
        l: common_vendor.o((e) => fieldConfirm(e, "weight")),
        m: common_vendor.o((e) => fieldConfirm(e, "weight")),
        n: common_vendor.p({
          value: bodyInfo.weight.value,
          type: "number",
          required: true,
          label: "体重(kg)",
          placeholder: "请输入体重",
          errorMessage: bodyInfo.weight.error
        }),
        o: common_vendor.o((e) => fieldConfirm(e, "bodyFat")),
        p: common_vendor.o((e) => fieldConfirm(e, "bodyFat")),
        q: common_vendor.p({
          value: bodyInfo.bodyFat.value,
          type: "number",
          label: "体脂(%)",
          placeholder: "请输入体脂(非必填)"
        }),
        r: !activeIdx.value && activeIdx.value !== 0
      }, !activeIdx.value && activeIdx.value !== 0 ? {} : {
        s: common_vendor.t(activeList.value[activeIdx.value].text)
      }, {
        t: common_vendor.o((e) => handlePicker(e, "activeIdx")),
        v: activeIdx.value,
        w: activeList.value,
        x: common_vendor.t(bodyInfo.active.error),
        y: !exerciseIdx.value && exerciseIdx.value !== 0
      }, !exerciseIdx.value && exerciseIdx.value !== 0 ? {} : {
        z: common_vendor.t(exerciseList.value[exerciseIdx.value].text)
      }, {
        A: common_vendor.o((e) => handlePicker(e, "exerciseIdx")),
        B: exerciseIdx.value,
        C: exerciseList.value,
        D: common_vendor.t(bodyInfo.exercise.error),
        E: common_vendor.p({
          name: 1
        }),
        F: common_vendor.p({
          name: 2
        }),
        G: common_vendor.p({
          name: 3
        }),
        H: common_vendor.o((e) => bodyInfo.goal.value = e.detail),
        I: common_vendor.p({
          direction: "horizontal",
          value: bodyInfo.goal.value
        }),
        J: common_vendor.p({
          title: "目标"
        }),
        K: common_vendor.o(calculate),
        L: common_vendor.p({
          color: "linear-gradient(to right, #4bb0ff, #6149f6)",
          round: true,
          customStyle: "width: 300px;"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/demon/work-space/mini-program/personal-assistant/pages/caculator/cal/cal.vue"]]);
wx.createPage(MiniProgramPage);
