// useScrollH.ts
/** Hooks 动态计算scrollList滑动区域高度
 * @param {Number} offset 可选 -offset偏移量 手动微调scroll高度
 * */
import {
	ref,
	getCurrentInstance
} from 'vue'

export const useScrollHeight = (offset) => {
	const scrollHeight = ref(0) // scroll组件高度
	const topHeight = ref(0) // 组件上方占用高度
	const currentInstance = getCurrentInstance(); // vue3绑定this
	const height = uni.getSystemInfoSync().windowHeight // 获取页面高度
	const topEl = uni.createSelectorQuery().in(currentInstance).select('#top') // 获取#top元素
	console.log(topEl);
	topEl.boundingClientRect((data) => { // 获取顶部高度
		console.log(data);
		topHeight.value = data.height
		scrollHeight.value = height - topHeight.value - (offset ||
			0) // 计算剩余高度 offset 偏移量}).exec()return scrollHeight
	}).exec()
	return {
		scrollHeight
	}
}