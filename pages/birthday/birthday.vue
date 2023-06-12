<template>
	<uni-section :title="'选择出生日期：' + datetimesingle" type="line"></uni-section>
	<view class="example-body">
		<uni-datetime-picker type="datetime" v-model="datetimesingle" @change="changeLog" />
	</view>
	<view v-if="birthInfo" class="birthday">
		<view class="birthday-title">生辰详细信息: </view>
		<view class="birthday-item"><text class="label">阳历生日: </text> {{cBirthday}}
			{{birthInfo?.ncWeek}}
		</view>

		<view class="birthday-item"><text class="label">阴历生日: </text> {{birthday}}
			{{birthInfo?.ImonthCn}}{{birthInfo?.IDayCn}}
		</view>
		<view class="birthday-item" v-if="birthInfo.isTerm"><text class="label">节气: </text>
			{{birthInfo?.Term}}
		</view>
		<view class="birthday-item"><text class="label">生肖: </text>{{birthInfo?.Animal}}</view>
		<view class="birthday-item"><text class="label">星座: </text>{{birthInfo?.astro}}</view>
		<view class="birthday-item"><text class="label">生辰八字: </text>{{birthInfo?.eightAll?.eight?.join(', ')}} <text
				v-if="birthInfo?.eightAll?.shu">属:
				{{birthInfo?.eightAll?.shu}}</text></view>
		<view class="birthday-item"><text class="label">五行: </text>{{birthInfo?.fiveAll?.five?.join(', ')}} <text
				v-if="birthInfo?.fiveAll?.lose">缺:
				{{birthInfo?.fiveAll?.lose}}</text></view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		unref,
		computed
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		getBirth
	} from '@/api/juhe'
	import dayjs from 'dayjs';
	import {
		msg
	} from '@/utils/utils'

	const datetimesingle = ref('')
	const birthInfo = ref()
	const cBirthday = computed(() => {
		if (unref(birthInfo)) {
			return `${unref(birthInfo).cYear}-${unref(birthInfo).cMonth}-${unref(birthInfo).cDay}`
		} else {
			return ''
		}
	})
	const birthday = computed(() => {
		if (unref(birthInfo)) {
			return `${unref(birthInfo).year}-${unref(birthInfo).month}-${unref(birthInfo).day}`
		} else {
			return ''
		}
	})

	const changeLog = async () => {
		console.log(unref(datetimesingle));
		const date = dayjs(unref(datetimesingle))

		msg.loading()
		birthInfo.value = await getBirth({
			year: date.year(),
			month: date.month() + 1,
			day: date.date(),
			hour: date.hour()
		})
		msg.hide()
		console.log(unref(birthInfo));
	}

	onLoad(() => {
		datetimesingle.value = dayjs().subtract(20, 'year').format('YYYY-MM-DD HH:mm:ss')
	})
</script>

<style scoped lang="scss">
	.example-body {
		background-color: #fff;
		padding: 10px;
	}

	.birthday {
		padding: 12px 10px;
		background-color: white;

		&-title {
			font-weight: bolder;
			margin-bottom: 12px;
		}

		&-item {
			margin-bottom: 6px;
			color: #4bb0ff;

			.label {
				font-weight: bold;
				color: black;
			}
		}
	}
</style>