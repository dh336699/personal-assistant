"use strict";
const utils_http_index = require("../utils/http/index.js");
const Api = {
  vacationList: "/154",
  vacation: "/calendar/year",
  jiejiari: "/jiejiari/index",
  flower: "/huayu/index",
  mbti: "/character/questions",
  answer: "/character/answer",
  bmi: "/bmi/index",
  birthday: "/birthEight/query",
  goldShop: "/2145-1",
  goldPirce: "/2145-2"
};
const getVacationList = (date) => utils_http_index.tianHttp.get({
  url: Api.jiejiari,
  data: {
    key: "335bb78fcbc378fed2ab2f5c79a77045",
    date,
    type: 1
  }
});
const getFlower = (word) => utils_http_index.tianHttp.get({
  url: Api.flower,
  data: {
    key: "335bb78fcbc378fed2ab2f5c79a77045",
    word
  }
});
const getMbti = (word) => utils_http_index.jisuHttp.get({
  url: Api.mbti,
  data: {
    appkey: "a4140573932ba35b"
  }
});
const getAnswers = (answer) => utils_http_index.jisuHttp.get({
  url: Api.answer,
  data: {
    appkey: "a4140573932ba35b",
    answer
  }
});
const getBmi = (data) => utils_http_index.tianHttp.get({
  url: Api.bmi,
  data: {
    key: "335bb78fcbc378fed2ab2f5c79a77045",
    ...data
  }
});
const getGoldShop = () => utils_http_index.wanweiHttp.get({
  url: Api.goldShop,
  data: {
    showapi_appid: "1436491",
    showapi_sign: "7c05472b11404229b03529bba9e1d6c6"
  }
});
const getGoldPrice = (id) => utils_http_index.wanweiHttp.post({
  url: `${Api.goldPirce}?showapi_appid=1436491&showapi_sign=7c05472b11404229b03529bba9e1d6c6&id=${id}`
});
const getBirth = (data) => utils_http_index.defHttp.get({
  url: Api.birthday,
  data: {
    key: "97d8da898a1b6c458eca5c860e3019e2",
    ...data
  }
});
exports.getAnswers = getAnswers;
exports.getBirth = getBirth;
exports.getBmi = getBmi;
exports.getFlower = getFlower;
exports.getGoldPrice = getGoldPrice;
exports.getGoldShop = getGoldShop;
exports.getMbti = getMbti;
exports.getVacationList = getVacationList;
