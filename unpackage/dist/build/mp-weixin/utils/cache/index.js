"use strict";const e=require("../../common/vendor.js"),t=require("../../enum/cacheEnum.js"),o=t=>e.index.getStorageSync(t),r=(t,o)=>e.index.setStorageSync(t,o);exports.getBirthday=()=>o(t.BIRTHDAY),exports.getBodyInfo=()=>o(t.BODYINFO),exports.getFlower=()=>o(t.FLOWER),exports.getGoldBrand=()=>o(t.GOLD_BRAND),exports.getMbti=()=>o(t.MBTI),exports.getMbtiAnswer=()=>o(t.MBTI_ANSWER),exports.getVacation=()=>o(t.VACATION),exports.setBirthday=e=>r(t.BIRTHDAY,e),exports.setBodyInfo=e=>r(t.BODYINFO,e),exports.setFlower=e=>r(t.FLOWER,e),exports.setGoldBrand=e=>r(t.GOLD_BRAND,e),exports.setMbti=e=>r(t.MBTI,e),exports.setMbtiAnswer=e=>r(t.MBTI_ANSWER,e),exports.setVacation=e=>r(t.VACATION,e);
