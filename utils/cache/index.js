import {
	USERINFO,
	VACATION,
	FLOWER,
	MBTI,
	MBTI_ANSWER,
	BODYINFO,
	GOLD_BRAND
} from '@/enum/cacheEnum'

export const getUserInfo = () => getCache(USERINFO)

export const setUserInfo = (value) => setCache(USERINFO, value)

export const getVacation = () => getCache(VACATION)

export const setVacation = (value) => setCache(VACATION, value)

export const getFlower = () => getCache(FLOWER)

export const setFlower = (value) => setCache(FLOWER, value)

export const getMbti = () => getCache(MBTI)

export const setMbti = (value) => setCache(MBTI, value)

export const getMbtiAnswer = () => getCache(MBTI_ANSWER)

export const setMbtiAnswer = (value) => setCache(MBTI_ANSWER, value)

export const getBodyInfo = () => getCache(BODYINFO)

export const setBodyInfo = (value) => setCache(BODYINFO, value)

export const getGoldBrand = () => getCache(GOLD_BRAND)

export const setGoldBrand = (value) => setCache(GOLD_BRAND, value)


export const getCache = (key) => uni.getStorageSync(key)

export const setCache = (key, value) => uni.setStorageSync(key, value)