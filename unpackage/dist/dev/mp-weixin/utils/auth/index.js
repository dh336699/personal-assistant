"use strict";
const common_vendor = require("../../common/vendor.js");
const enum_cacheEnum = require("../../enum/cacheEnum.js");
const getToken = () => getCache(enum_cacheEnum.TOKEN_KEY);
const getCache = (key) => common_vendor.index.getStorageSync(key);
exports.getToken = getToken;
