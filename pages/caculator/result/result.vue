<template>
	<view class="Result">
		<van-cell title="BMI" :value="bmi.bmi" :label="bmi.tip +'标准体重: ' + bmi.normweight" />
		<van-cell title="基础代谢率" :value="metabolicRate" />
		<van-cell title="代谢热量" :value="metabolicCalories + 'kcal'" />
		<van-cell title="建议碳水摄入" :value="carbon + 'g'" />
		<van-cell title="建议蛋白质摄入" :value="protein + 'g'" />
		<van-cell title="建议脂肪摄入" :value="fat + 'g'" />
	</view>

</template>

<script setup>
	import {
		reactive,
		ref,
		unref
	} from 'vue';
	import {
		getBmi
	} from '@/api/juhe'
	import {
		onLoad,
		onShow,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import {
		useStore
	} from '@/store'
	import {
		round
	} from 'lodash';
	import {
		msg
	} from '@/utils/utils'

	const bodyInfo = reactive({})
	const bmi = ref('')
	const metabolicRate = ref(0)
	const metabolicCalories = ref(0)
	const carbon = ref(0)
	const protein = ref(0)
	const fat = ref(0)
	const store = useStore()

	const nutritionCal = () => {
		const {
			weight,
			exercise,
			exerciseIdx
		} = bodyInfo
		carbon.value = (weight * exercise) || 0;
		protein.value = exerciseIdx < 6 ? 1.5 * weight : exerciseIdx >= 6 && exerciseIdx <= 7 ? 1.8 * weight : 2.1 *
			weight + unref(carbon)
		fat.value = ((unref(metabolicCalories) - 4 * (unref(protein) + unref(carbon))) / 9).toFixed(2)
	}
	const caloriesCal = () => {
		const {
			active
		} = bodyInfo
		metabolicCalories.value = (unref(metabolicRate) * active).toFixed(2);
		nutritionCal();
	}

	const metabolicCal = () => {
		let {
			sex,
			age,
			height,
			weight,
			bodyFat,
			goal,
		} = bodyInfo
		var e, t, a, g = 0;
		if (sex === 1) {
			e = 10 * weight + 6.25 * height - 5 * age - 161;
			t = 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;
			if (age < 3) {
				a = 61 * weight - 51
			} else if (age < 10) {
				a = 22.5 * weight + 499
			} else if (age < 18) {
				a = 12.2 * weight + 746
			} else if (age < 30) {
				a = 14.7 * weight + 496
			} else if (age < 60) {
				a = 8.7 * weight + 829
			} else if (age > 60) {
				a = 10.5 * weight + 596
			}
		} else {
			e = 10 * weight + 6.25 * height - 5 * age + 5;
			t = 66.47 + 13.75 * weight + 5 * height - 6.67 * age;
			if (age < 3) {
				a = 60.9 * weight - 54
			} else if (age < 10) {
				a = 22.7 * weight + 495
			} else if (age < 18) {
				a = 17.5 * weight + 651
			} else if (age < 30) {
				a = 15.3 * weight + 679
			} else if (age < 60) {
				a = 11.6 * weight + 879
			} else if (age > 60) {
				a = 13.5 * weight + 487
			}
		}
		if (bodyFat > 0) {
			g = (1 - bodyFat / 100) * weight * 21.6 + 370
		}
		switch (goal) {
			case 1:
				if (Number(bodyFat) > 18) {
					metabolicRate.value = Math.min(e, g, t, a)
				} else if (bodyFat && Number(bodyFat) <= 18) {
					metabolicRate.value = Math.max(e, g, t, a)
				}
				break;
			case 2:
				metabolicRate.value = g ? Math.min(e, g, t, a) : Math.min(e, t, a);
				break;
			case 3:
				metabolicRate.value = g ? Math.max(e, g, t, a) : Math.max(e, t, a);
		}
		metabolicRate.value = metabolicRate.value.toFixed(2)

		caloriesCal();
	}
	const _init = async () => {
		if (store.bodyInfos) {
			msg.loading()
			const {
				bodyInfos
			} = store;
			for (let key in bodyInfos) {
				bodyInfo[key] = bodyInfos[key]
			}
			metabolicCal();
			bmi.value = await getBmi({
				height: bodyInfo.height,
				weight: bodyInfo.weight,
				sex: bodyInfo.sex
			})
			msg.hide()
			// bmi.value = round(bodyInfo.weight / Math.pow((bodyInfo.height / 100), 2), 2)
		}
	}

	onShareAppMessage((res) => {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title: '热量营养计算',
			imageUrl: '/static/sport.jpeg',
			path: '/pages/caculator/cal/cal',
			desc: '计算BMI, 热量消耗, 代谢以及一天内所需营养成分'
		}
	})

	onLoad(() => _init())
</script>

<style scoped lang="scss">
	.Result-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6rpx 0;
		margin: 0 20rpx 20rpx;
		font-size: 28rpx;
		border-bottom: 1rpx solid #eee;
	}
</style>