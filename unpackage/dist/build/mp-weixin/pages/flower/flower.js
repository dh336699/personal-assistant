"use strict";const e=require("../../common/vendor.js"),r=require("../../api/juhe.js"),u=require("../../store/index.js");if(require("../../utils/http/index.js"),require("../../utils/auth/index.js"),require("../../enum/cacheEnum.js"),require("../../utils/http/http.js"),require("../../config/index.js"),require("../../hooks/useEnv.js"),require("../../utils/http/helper.js"),require("../../utils/cache/index.js"),!Array){(e.resolveComponent("van-field")+e.resolveComponent("uni-card"))()}Math;const t={__name:"flower",setup(t){const n=e.ref(""),o=e.ref(),l=u.useStore(),s=e.computed((()=>e.unref(o).cnflower+" "+e.unref(o).enflower)),i=e.lodashExports.debounce((async u=>{const t=u.detail;if(l.flower[t])return l.flower[t];o.value=await r.getFlower(t),l.setFlower({[t]:e.unref(o)})}),1e3);return(r,u)=>e.e({a:e.o(e.unref(i)),b:e.p({label:"花名",value:n.value,placeholder:"请输入花名"}),c:o.value},o.value?{d:e.t(o.value.flowerlang),e:e.t(o.value.flowerprov),f:e.p({title:e.unref(s)})}:{})}};wx.createPage(t);
