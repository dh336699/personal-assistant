"use strict";const n=require("../common/vendor.js"),o={loading:(o="加载中",e=!0)=>n.index.showLoading({title:o,mask:e}),hide:()=>n.index.hideLoading(),toast:(o="请求失败",e="none",i)=>n.index.showToast({title:o,icon:e,success:()=>i&&i()}),modal:(o,e,i,s="提示")=>n.index.showModal({title:s,content:o,success:async function(n){n.confirm?e&&await e():n.cancel&&i&&await i()}})};exports.msg=o;
