"use strict";const e=require("../../common/vendor.js"),r=require("../../store/index.js"),n=require("../../api/juhe.js"),t=require("../../utils/utils.js");if(require("../../utils/cache/index.js"),require("../../enum/cacheEnum.js"),require("../../utils/http/index.js"),require("../../utils/auth/index.js"),require("../../utils/http/http.js"),require("../../config/index.js"),require("../../hooks/useEnv.js"),require("../../utils/http/helper.js"),!Array){(e.resolveComponent("van-radio")+e.resolveComponent("van-radio-group")+e.resolveComponent("van-icon")+e.resolveComponent("van-button")+e.resolveComponent("van-empty"))()}const u={__name:"mbti",setup(u){const a=e.ref(),s=e.ref(),o=e.ref(0),i=r.useStore(),l=e.computed((()=>e.unref(a)[e.unref(o)]||{})),p=e.computed((()=>e.unref(o)<e.unref(a).length-1)),m=e.computed((()=>e.unref(o)===e.unref(a).length-1)),f=e.computed((()=>0!==e.unref(o))),v=()=>{o.value-=1},d=()=>{e.unref(l).answers?o.value+=1:t.msg.toast("请先回答当前题目哦")},c=()=>{t.msg.modal("确认清空历史记录并重新答题?",(()=>{w(!1,!0)}))},y=()=>{console.log("进入"),w(!1)},h=async()=>{const r=e.unref(a).map((e=>e.answers)),t=await n.getAnswers(r.join(","));s.value=t,i.setMbtiAnswer(t)},w=async(r=!0,t=!1)=>{if(s.value=null,o.value=0,e.lodashExports.isEmpty(i.mbti)||t)a.value=await n.getMbti(),a.value=e.unref(a).map((e=>(e.answers="",e))),i.setMbti(e.unref(a));else if(a.value=i.mbti,r)for(let e=0;e<i.mbti.length;e++)if(!i.mbti[e].answers){o.value=e;break}};return e.onLoad((()=>{e.lodashExports.isEmpty(i.mbtiAnswer)?w():s.value=i.mbtiAnswer})),(r,n)=>e.e({a:!s.value&&!e.unref(e.lodashExports.isEmpty)(a.value)},s.value||e.unref(e.lodashExports.isEmpty)(a.value)?s.value?{v:e.t(s.value.type),w:e.t(s.value.name),x:e.t(s.value.summary),y:e.t(s.value.characteristic),z:e.t(s.value.field),A:e.t(s.value.job),B:e.p({name:"replay"}),C:e.o(c),D:e.p({round:!0,type:"primary"}),E:e.p({name:"revoke"}),F:e.o(y),G:e.p({round:!0,type:"primary"})}:{H:e.p({description:"暂无数据"})}:{b:e.t(e.unref(l).question),c:e.t(e.unref(l).answer1),d:e.p({name:e.unref(l).type1}),e:e.t(e.unref(l).answer2),f:e.p({name:e.unref(l).type2}),g:e.o((r=>(r=>{a.value[e.unref(o)].answers=r.detail,console.log(a.value[e.unref(o)]),i.setMbti(e.unref(a)),setTimeout((()=>{e.unref(o)<e.unref(a).length-1&&(o.value+=1)}),600)})(r))),h:e.p({value:e.unref(l).answers}),i:e.p({name:"arrow-left"}),j:e.unref(f),k:e.o(v),l:e.p({round:!0,type:"primary"}),m:e.p({name:"arrow"}),n:e.o(d),o:e.unref(p),p:e.p({round:!0,type:"primary"}),q:e.unref(m),r:e.o(h),s:e.p({round:!0,color:"linear-gradient(to right, #4bb0ff, #6149f6)"})},{t:s.value})}};wx.createPage(u);
