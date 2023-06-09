export const msg = {
	loading: (title = '加载中', mask = true) => uni.showLoading({
		title,
		mask
	}),
	hide: () => uni.hideLoading(),

	toast: (title = '请求失败', icon = 'none', callback) => uni.showToast({
		title,
		icon,
		success: () => callback && callback()
	}),

	modal: (content, confirmCallBack, cancelCallBack, title = '提示') => uni.showModal({
		title,
		content,
		success: async function(res) {
			if (res.confirm) {
				confirmCallBack && await confirmCallBack()
			} else if (res.cancel) {
				cancelCallBack && await cancelCallBack()
			}
		}
	})
}