"use strict";
const common_vendor = require("../common/vendor.js");
const utils_cache_index = require("../utils/cache/index.js");
const useStore = common_vendor.defineStore("userStore", {
  state: () => ({
    vacation: utils_cache_index.getVacation() || [],
    flower: utils_cache_index.getFlower() || {},
    mbti: utils_cache_index.getMbti() || [],
    mbtiAnswer: utils_cache_index.getMbtiAnswer() || {},
    bodyInfos: utils_cache_index.getBodyInfo() || {},
    goldBrand: utils_cache_index.getGoldBrand() || {},
    birthday: utils_cache_index.getBirthday() || {}
  }),
  actions: {
    setVacation(vacation) {
      this.vacation = vacation;
      utils_cache_index.setVacation(vacation);
    },
    setFlower(flower) {
      this.flower = Object.assign({}, this.flower, flower);
      utils_cache_index.setFlower(this.flower);
    },
    setMbti(mbti) {
      this.mbti = mbti;
      utils_cache_index.setMbti(this.mbti);
    },
    setMbtiAnswer(answer) {
      this.mbtiAnswer = answer;
      utils_cache_index.setMbtiAnswer(answer);
    },
    setBodyInfos(bodyInfos) {
      this.bodyInfos = bodyInfos;
      utils_cache_index.setBodyInfo(bodyInfos);
    },
    setGoldBrand(brandList) {
      this.goldBrand = brandList;
      utils_cache_index.setGoldBrand(brandList);
    },
    setBirthday(birthday, info) {
      this.birthday[birthday] = info;
      utils_cache_index.setBirthday(this.birthday);
    }
  }
});
exports.useStore = useStore;
