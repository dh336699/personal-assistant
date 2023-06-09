"use strict";
const hooks_useEnv = require("../hooks/useEnv.js");
const {
  isDev
} = hooks_useEnv.useEnv();
const globSetting = {
  // apiUrl: 'https://www.aiww.site',
  apiUrl: isDev() ? "http://v.juhe.cn" : "http://v.juhe.cn",
  // urlPrefix: '/api/v1',
  goodsImagePrefix: isDev() ? "/dev/goods" : "/prod/goods",
  avatarPrefix: isDev() ? "/dev/avatar" : "/prod/avatar"
};
exports.globSetting = globSetting;