"use strict";exports.joinTimestamp=function(t,e=!1){if(!t)return e?"":{};const n=(new Date).getTime();return e?`?_t=${n}`:{_t:n}};
