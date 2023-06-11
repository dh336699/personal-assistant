"use strict";const e=require("../../common/vendor.js"),r=require("../../store/index.js"),n=require("../../api/juhe.js"),t=require("../../utils/utils.js");if(require("../../utils/cache/index.js"),require("../../enum/cacheEnum.js"),require("../../utils/http/index.js"),require("../../utils/auth/index.js"),require("../../utils/http/http.js"),require("../../config/index.js"),require("../../hooks/useEnv.js"),require("../../utils/http/helper.js"),!Array){(e.resolveComponent("van-radio")+e.resolveComponent("van-radio-group")+e.resolveComponent("van-icon")+e.resolveComponent("van-button")+e.resolveComponent("van-empty"))()}const u={__name:"mbti",setup(u){const a=e.ref(),s=e.ref(),o=e.ref(0),i=r.useStore(),l=e.computed((()=>e.unref(a)[e.unref(o)]||{})),p=e.computed((()=>e.unref(o)<e.unref(a).length-1)),m=e.computed((()=>e.unref(o)===e.unref(a).length-1)),f=e.computed((()=>0!==e.unref(o))),v=()=>{o.value-=1},d=()=>{e.unref(l).answers?o.value+=1:t.msg.toast("请先回答当前题目哦")},c=()=>{t.msg.modal("确认清空历史记录并重新答题?",(()=>{g(!1,!0)}))},h=()=>{console.log("进入"),g(!1)},y=async()=>{const r=e.unref(a).map((e=>e.answers)),t=await n.getAnswers(r.join(","));s.value=t,i.setMbtiAnswer(t)},g=async(r=!0,u=!1)=>{if(t.msg.loading(),s.value=null,o.value=0,e.lodashExports.isEmpty(i.mbti)||u)a.value=await n.getMbti(),a.value=e.unref(a).map((e=>(e.answers="",e))),i.setMbti(e.unref(a));else if(a.value=i.mbti,r)for(let e=0;e<i.mbti.length;e++)if(!i.mbti[e].answers){o.value=e;break}t.msg.hide()};return e.onLoad((()=>{e.lodashExports.isEmpty(i.mbtiAnswer)?g():s.value=i.mbtiAnswer})),(r,n)=>e.e({a:!s.value&&!e.unref(e.lodashExports.isEmpty)(a.value)},s.value||e.unref(e.lodashExports.isEmpty)(a.value)?s.value?{x:e.t(s.value.type),y:e.t(s.value.name),z:e.t(s.value.summary),A:e.t(s.value.characteristic),B:e.t(s.value.field),C:e.t(s.value.job),D:e.p({name:"replay"}),E:e.o(c),F:e.p({round:!0,type:"primary"}),G:e.p({name:"revoke"}),H:e.o(h),I:e.p({round:!0,type:"primary"})}:{J:e.p({description:"暂无数据"})}:{b:e.t(o.value+1),c:e.t(a.value.length),d:e.t(e.unref(l).question),e:e.t(e.unref(l).answer1),f:e.p({name:e.unref(l).type1}),g:e.t(e.unref(l).answer2),h:e.p({name:e.unref(l).type2}),i:e.o((r=>(r=>{a.value[e.unref(o)].answers=r.detail,console.log(a.value[e.unref(o)]),i.setMbti(e.unref(a)),e.unref(o)<e.unref(a).length-1&&setTimeout((()=>{o.value+=1}),300)})(r))),j:e.p({value:e.unref(l).answers}),k:e.p({name:"arrow-left"}),l:e.unref(f),m:e.o(v),n:e.p({round:!0,type:"primary"}),o:e.p({name:"arrow"}),p:e.o(d),q:e.unref(p),r:e.p({round:!0,type:"primary"}),s:e.unref(m),t:e.o(y),v:e.p({round:!0,color:"linear-gradient(to right, #4bb0ff, #6149f6)"})},{w:s.value})}};wx.createPage(u);
