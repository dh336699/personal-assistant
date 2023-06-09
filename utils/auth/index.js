import {
	TOKEN_KEY
} from '../../enum/cacheEnum.js'

export const getToken = () => getCache(TOKEN_KEY);

export const setToken = (value) => setCache(TOKEN_KEY, value);

export const getCache = (key) => uni.getStorageSync(key)

export const setCache = (key, value) => uni.setStorageSync(key, value)