"use strict";
const useEnv = () => {
  const isDev = () => true;
  const isPro = () => false;
  return {
    isDev,
    isPro
  };
};
exports.useEnv = useEnv;
