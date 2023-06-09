"use strict";const e=require("../../common/vendor.js"),n=require("../../enum/cacheEnum.js"),r=n=>e.index.getStorageSync(n);exports.getToken=()=>r(n.TOKEN_KEY);
