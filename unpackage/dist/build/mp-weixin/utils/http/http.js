"use strict";const e=require("../../common/vendor.js");exports.Http=class{constructor(e){this.options=e}getTransform(){const{transform:e}=this.options;return e}get(e,t){return this.request({...e,method:"GET"},t)}post(e,t){return this.request({...e,method:"POST"},t)}put(e,t){return this.request({...e,method:"PUT"},t)}delete(e,t){return this.request({...e,method:"DELETE"},t)}request(t,s){const r=this.getTransform();t.header=t.header||(null==s?void 0:s.header)||this.options.header;const{beforeRequestHook:o,transformResponseHook:n}=r||{},h=Object.assign({},s,this.options);return o&&(t=o(t,h)),new Promise(((s,r)=>{e.index.request(t).then((e=>{n&&s(n(e,h)),s(e)})).catch((e=>r(e)))}))}};
