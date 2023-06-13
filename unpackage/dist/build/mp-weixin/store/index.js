"use strict";const t=require("../common/vendor.js"),e=require("../utils/cache/index.js"),s=t.defineStore("userStore",{state:()=>({vacation:e.getVacation()||[],flower:e.getFlower()||{},mbti:e.getMbti()||[],mbtiAnswer:e.getMbtiAnswer()||{},bodyInfos:e.getBodyInfo()||{},goldBrand:e.getGoldBrand()||{},birthday:e.getBirthday()||{}}),actions:{setVacation(t){this.vacation=t,e.setVacation(t)},setFlower(t){this.flower=Object.assign({},this.flower,t),e.setFlower(this.flower)},setMbti(t){this.mbti=t,e.setMbti(this.mbti)},setMbtiAnswer(t){this.mbtiAnswer=t,e.setMbtiAnswer(t)},setBodyInfos(t){this.bodyInfos=t,e.setBodyInfo(t)},setGoldBrand(t){this.goldBrand=t,e.setGoldBrand(t)},setBirthday(t,s){this.birthday[t]=s,e.setBirthday(this.birthday)}}});exports.useStore=s;
