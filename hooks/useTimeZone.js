import dayjs from 'dayjs';
import {
	isArray,
	isNumber,
	isObject,
	isString
} from 'lodash';

export function useTimeZone() {
	// 获取当前日期时间的时区偏差（以分钟为单位）
	const timezoneOffset = dayjs().utcOffset();
	// 将分钟转换为小时
	const hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);

	// 时区转换功能
	const transTime = (obj) =>
		dayjs(obj).format('YYYY-MM-DD HH:mm:ss');

	// 时区转换功能
	const transReqTime = (obj) =>
		dayjs(obj).subtract(hoursOffset, 'hour').format('YYYY-MM-DD HH:mm:ss');

	const addTime = (obj) => obj + hoursOffset * 60 * 60 * 1000;

	const subtractTime = (obj) => obj - hoursOffset * 60 * 60 * 1000;

	function transResponse(obj) {
		if (!hoursOffset) return obj;

		if (isString(obj) && dayjs(obj).isValid() && obj.includes('-') && obj.includes('20')) {
			return transTime(obj);
		}
		if (isNumber(obj) && dayjs(obj).isValid() && obj >= 63043200) {
			return addTime(obj);
		}
		if (!isObject(obj)) {
			return obj;
		}
		if (isObject(obj)) {
			for (const key in obj) {
				obj[key] = transResponse(obj[key]);
			}
			return obj;
		}

		if (isArray(obj)) {
			for (let i = 0; i < obj.length; i++) {
				(obj[i]) = transResponse(obj[i]);
			}
			return obj;
		}
		return obj;
	}

	const transRequest = (obj) => {
		if (!hoursOffset) return obj;

		if (isString(obj) && dayjs(obj).isValid() && obj.includes('-') && obj.includes('20')) {
			return transReqTime(obj);
		}
		if (isNumber(obj) && dayjs(obj).isValid() && obj >= 63043200) {
			return subtractTime(obj);
		}
		if (!isObject(obj)) {
			return obj;
		}
		if (isObject(obj)) {
			for (const key in obj) {
				obj[key] = transRequest(obj[key]);
			}
			return obj;
		}

		if (isArray(obj)) {
			for (let i = 0; i < obj.length; i++) {
				(obj[i]) = transRequest(obj[i]);
			}
			return obj;
		}
		return obj;
	};

	return {
		transResponse,
		transRequest,
		subtractTime,
		addTime
	};
}