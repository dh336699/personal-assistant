"use strict";
function joinTimestamp(join, restful = false) {
  if (!join) {
    return restful ? "" : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return {
    _t: now
  };
}
exports.joinTimestamp = joinTimestamp;
