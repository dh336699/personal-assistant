import {
	getToken
} from '../auth'
import {
	Http
} from './http';
import {
	globSetting
} from '../../config'
import {
	joinTimestamp
} from './helper'
const transform = {
	// 请求之前处理config
	beforeRequestHook: (config, options) => {
		const {
			apiUrl,
			joinPrefix,
			urlPrefix,
			joinTime
		} = options;

		let {
			url,
			method,
			data,
			header,
		} = config

		if (joinPrefix && urlPrefix) {
			url = `${urlPrefix}${url}`;
		}
		if (apiUrl && typeof apiUrl === 'string') {
			url = `${apiUrl}${url}`;
		}

		if (!data instanceof Object) {
			data = Object.assign({}, data, joinTimestamp(joinTime, false))
		} else {
			if (method.toUpperCase() === 'GET' && typeof data === 'string' || typeof data === 'number') {
				url = `${url}/${data}` + joinTimestamp(joinTime, true)
			}
		}
		const token = getToken();
		if (token && withToken) {
			header.Authorization = options.authenticationScheme ?
				`${options.authenticationScheme} ${token}` :
				token;
		}
		return {
			...config,
			url,
			method,
			data,
			header,
		}
	},

	transformResponseHook: (res, options) => {
		const {
			isTransformResponse,
			isReturnNativeResponse,
			modal
		} = options;
		// 是否返回原生响应头 比如：需要获取响应头时使用该属性
		if (isReturnNativeResponse) {
			return res;
		}
		// 不进行任何处理，直接返回
		// 用于页面代码可能需要直接获取code，data，msg这些信息时开启
		if (!isTransformResponse) {
			return res.data;
		}

		const {
			data
		} = res;
		if (!data) {
			// return '[HTTP] Request has no return value';
			throw new Error('请求失败');
		}

		const {
			code,
			result,
			msg,
			status,
			showapi_res_code,
			showapi_res_body,
			error_code
		} = data;
		// 这里逻辑可以根据项目进行修改
		const hasSuccess = (code === 200) || (status === 0) || showapi_res_code === 0 || error_code === 0;
		if (hasSuccess) {

			if (modal) {
				if (modal.type === 'toast') {
					uni.showToast({
						title: modal.content,
						icon: modal.icon
					})
				} else {
					uni.showModal({
						title: modal.title || '提示',
						content: modal.content
					})
				}
			}
			return result || showapi_res_body?.data || showapi_res_body;
		}

		// 在此处根据自己项目的实际情况对不同的code执行不同的操作
		// 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
		let timeoutMsg = '';
		switch (code) {
			case 502:
				timeoutMsg = '请求超时';
				const userStore = useUserStoreWithOut();
				break;
			default:
				if (msg) {
					timeoutMsg = msg;
				}
		}
		if (modal) {
			if (modal.type === 'toast') {
				uni.showToast({
					title: '请求失败，请稍后再试',
					icon: 'error'
				})
			} else {
				uni.showModal({
					title: '提示',
					content: '请求失败，请稍后再试'
				})
			}
		}
		throw new Error(timeoutMsg || '请求失败');
	}
}

function createHttp(opt) {
	return new Http(Object.assign({}, {
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		transform,
		// 下面的配置可以在独立接口中覆盖
		authenticationScheme: 'Bearer',
		// 默认将prefix 添加到url
		joinPrefix: true,
		urlPrefix: globSetting.urlPrefix,
		apiUrl: globSetting.apiUrl,
		joinTime: true,
		isTransformResponse: true,
		isReturnNativeResponse: false,
		// 是否携带token
		withToken: true,
	}, opt))
}

export const defHttp = createHttp()

export const moonHttp = createHttp({
	apiUrl: 'http://api.moonapi.com'
})

export const tianHttp = createHttp({
	apiUrl: 'https://apis.tianapi.com'
})

export const jisuHttp = createHttp({
	apiUrl: 'https://api.jisuapi.com'
})

export const wanweiHttp = createHttp({
	apiUrl: 'https://route.showapi.com'
})