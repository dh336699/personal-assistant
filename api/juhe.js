import {
	defHttp,
	moonHttp,
	tianHttp,
	jisuHttp
} from "@/utils/http";

const Api = {
	vacationList: '/154',
	vacation: '/calendar/year',
	jiejiari: '/jiejiari/index',
	flower: '/huayu/index',
	mbti: '/character/questions',
	answer: '/character/answer'
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

export const getVacationList = () => tianHttp.get({
	url: Api.jiejiari,
	data: {
		key: '335bb78fcbc378fed2ab2f5c79a77045',
		date: '2023',
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