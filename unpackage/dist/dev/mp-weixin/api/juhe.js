"use strict";
const utils_http_index = require("../utils/http/index.js");
const Api = {
  vacationList: "/154",
  vacation: "/calendar/year",
  jiejiari: "/jiejiari/index",
  flower: "/huayu/index",
  mbti: "/character/questions",
  answer: "/character/answer"
};
const getVacationList = () => utils_http_index.tianHttp.get({
  url: Api.jiejiari,
  data: {
    key: "335bb78fcbc378fed2ab2f5c79a77045",
    date: "2023",
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
exports.getAnswers = getAnswers;
exports.getFlower = getFlower;
exports.getMbti = getMbti;
exports.getVacationList = getVacationList;
