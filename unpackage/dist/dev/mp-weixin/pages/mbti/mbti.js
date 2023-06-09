"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const api_juhe = require("../../api/juhe.js");
const utils_utils = require("../../utils/utils.js");
require("../../utils/cache/index.js");
require("../../enum/cacheEnum.js");
require("../../utils/http/index.js");
require("../../utils/auth/index.js");
require("../../utils/http/http.js");
require("../../config/index.js");
require("../../hooks/useEnv.js");
require("../../utils/http/helper.js");
if (!Array) {
  const _component_van_radio = common_vendor.resolveComponent("van-radio");
  const _component_van_radio_group = common_vendor.resolveComponent("van-radio-group");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  (_component_van_radio + _component_van_radio_group + _component_van_icon + _component_van_button + _component_van_empty)();
}
const _sfc_main = {
  __name: "mbti",
  setup(__props) {
    const list = common_vendor.ref();
    const answers = common_vendor.ref();
    const current = common_vendor.ref(0);
    const store = store_index.useStore();
    const item = common_vendor.computed(() => common_vendor.unref(list)[common_vendor.unref(current)] || {});
    const showNext = common_vendor.computed(() => common_vendor.unref(current) < common_vendor.unref(list).length - 1);
    const showSubmit = common_vendor.computed(() => common_vendor.unref(current) === common_vendor.unref(list).length - 1);
    const showPrew = common_vendor.computed(() => common_vendor.unref(current) !== 0);
    const handlePrev = () => {
      current.value -= 1;
    };
    const handleNext = () => {
      if (!common_vendor.unref(item).answers) {
        utils_utils.msg.toast("请先回答当前题目哦");
        return;
      }
      current.value += 1;
    };
    const onChange = (e) => {
      list.value[common_vendor.unref(current)].answers = e.detail;
      console.log(list.value[common_vendor.unref(current)]);
      store.setMbti(common_vendor.unref(list));
      setTimeout(() => {
        if (common_vendor.unref(current) < common_vendor.unref(list).length - 1) {
          current.value += 1;
        }
      }, 600);
    };
    const handleReply = () => {
      utils_utils.msg.modal("确认清空历史记录并重新答题?", () => {
        _initQuestion(false, true);
      });
    };
    const handlePreview = () => {
      console.log("进入");
      _initQuestion(false);
    };
    const handleSubmit = async () => {
      const data = common_vendor.unref(list).map((item2) => item2.answers);
      const res = await api_juhe.getAnswers(data.join(","));
      answers.value = res;
      store.setMbtiAnswer(res);
    };
    const _initQuestion = async (init = true, reply = false) => {
      answers.value = null;
      current.value = 0;
      if (common_vendor.lodashExports.isEmpty(store.mbti) || reply) {
        list.value = await api_juhe.getMbti();
        list.value = common_vendor.unref(list).map((item2) => {
          item2.answers = "";
          return item2;
        });
        store.setMbti(common_vendor.unref(list));
      } else {
        list.value = store.mbti;
        if (init) {
          for (let i = 0; i < store.mbti.length; i++) {
            if (!store.mbti[i].answers) {
              current.value = i;
              break;
            }
          }
        }
      }
    };
    common_vendor.onLoad(() => {
      if (!common_vendor.lodashExports.isEmpty(store.mbtiAnswer)) {
        answers.value = store.mbtiAnswer;
      } else {
        _initQuestion();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !answers.value && !common_vendor.unref(common_vendor.lodashExports.isEmpty)(list.value)
      }, !answers.value && !common_vendor.unref(common_vendor.lodashExports.isEmpty)(list.value) ? {
        b: common_vendor.t(common_vendor.unref(item).question),
        c: common_vendor.t(common_vendor.unref(item).answer1),
        d: common_vendor.p({
          name: common_vendor.unref(item).type1
        }),
        e: common_vendor.t(common_vendor.unref(item).answer2),
        f: common_vendor.p({
          name: common_vendor.unref(item).type2
        }),
        g: common_vendor.o((e) => onChange(e)),
        h: common_vendor.p({
          value: common_vendor.unref(item).answers
        }),
        i: common_vendor.p({
          name: "arrow-left"
        }),
        j: common_vendor.unref(showPrew),
        k: common_vendor.o(handlePrev),
        l: common_vendor.p({
          round: true,
          type: "primary"
        }),
        m: common_vendor.p({
          name: "arrow"
        }),
        n: common_vendor.o(handleNext),
        o: common_vendor.unref(showNext),
        p: common_vendor.p({
          round: true,
          type: "primary"
        }),
        q: common_vendor.unref(showSubmit),
        r: common_vendor.o(handleSubmit),
        s: common_vendor.p({
          round: true,
          color: "linear-gradient(to right, #4bb0ff, #6149f6)"
        })
      } : answers.value ? {
        v: common_vendor.t(answers.value.type),
        w: common_vendor.t(answers.value.name),
        x: common_vendor.t(answers.value.summary),
        y: common_vendor.t(answers.value.characteristic),
        z: common_vendor.t(answers.value.field),
        A: common_vendor.t(answers.value.job),
        B: common_vendor.p({
          name: "replay"
        }),
        C: common_vendor.o(handleReply),
        D: common_vendor.p({
          round: true,
          type: "primary"
        }),
        E: common_vendor.p({
          name: "revoke"
        }),
        F: common_vendor.o(handlePreview),
        G: common_vendor.p({
          round: true,
          type: "primary"
        })
      } : {
        H: common_vendor.p({
          description: "暂无数据"
        })
      }, {
        t: answers.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/scan/personal-assistant/pages/mbti/mbti.vue"]]);
wx.createPage(MiniProgramPage);
