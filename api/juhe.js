import {
	defHttp,
	moonHttp,
	tianHttp,
	jisuHttp,
	wanweiHttp
} from "@/utils/http";

const Api = {
	vacationList: '/154',
	vacation: '/calendar/year',
	jiejiari: '/jiejiari/index',
	flower: '/huayu/index',
	mbti: '/character/questions',
	answer: '/character/answer',
	bmi: '/bmi/index',
	birthday: '/birthEight/query',
	goldShop: '/2145-1',
	goldPirce: '/2145-2'
}

// export const getVacationList = (year) => moonHttp.get({
// 	url: Api.vacationList,
// 	data: {
// 		apid: 155,
// 		keyid: 324,
// 		sign: 'pth6dphwf7r8bwm9pmd6cwdy',
// 		start: '2022-01-20',
// 		end: '2023-12-31'
// 	}
// })

export const getVacationList = (date) => tianHttp.get({
	url: Api.jiejiari,
	data: {
		key: '335bb78fcbc378fed2ab2f5c79a77045',
		date,
		type: 1
	}
})

export const getFlower = (word) => tianHttp.get({
	url: Api.flower,
	data: {
		key: '335bb78fcbc378fed2ab2f5c79a77045',
		word,
	}
})

export const getMbti = (word) => jisuHttp.get({
	url: Api.mbti,
	data: {
		appkey: 'a4140573932ba35b'
	}
})

export const getAnswers = answer => jisuHttp.get({
	url: Api.answer,
	data: {
		appkey: 'a4140573932ba35b',
		answer
	}
})

export const getBmi = (data) => tianHttp.get({
	url: Api.bmi,
	data: {
		key: '335bb78fcbc378fed2ab2f5c79a77045',
		...data
	}
})

export const getGoldShop = () => wanweiHttp.get({
	url: Api.goldShop,
	data: {
		showapi_appid: '1436491',
		showapi_sign: '7c05472b11404229b03529bba9e1d6c6'
	}
})

export const getGoldPrice = (id) => wanweiHttp.post({
	url: `${Api.goldPirce}?showapi_appid=1436491&showapi_sign=7c05472b11404229b03529bba9e1d6c6&id=${id}`,
})

export const getBirth = data => defHttp.get({
	url: Api.birthday,
	data: {
		key: '97d8da898a1b6c458eca5c860e3019e2',
		...data
	}
})