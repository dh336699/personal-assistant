<template>
	<view class="Birthday">
		<uni-section :title="sectionTitle" type="line" @click="showPicker = true"></uni-section>
		<view class="example-body">
			<van-popup :show="showPicker" position="bottom" custom-style="height: 50%;" @close="showPicker = false">
				<van-datetime-picker :visible-item-count="5" type="datetime" :min-date="minDay" :max-date="today" :value="datetimesingle" @cancel="showPicker = false" @confirm="changeLog" />
			</van-popup>
			<!-- <uni-datetime-picker type="datetime" v-model:value="datetimesingle" @change="changeLog" /> -->
		</view>
		<van-field :value="bodyInfo.year.value" :label="bodyInfo.year.label" type="number" required :placeholder="'请输入'+ bodyInfo.year.label" @confirm="e => fieldConfirm(e, 'year')" @blur="e => fieldConfirm(e, 'year')" :error-message="bodyInfo.year.error" />

		<van-field :value="bodyInfo.month.value" type="number" required :label="bodyInfo.month.label" :placeholder="'请输入'+ bodyInfo.month.label" @confirm="e => fieldConfirm(e, 'month')" @blur="e => fieldConfirm(e, 'month')" :error-message="bodyInfo.month.error" />

		<van-field :value="bodyInfo.day.value" type="number" required :label="bodyInfo.day.label" :placeholder="'请输入'+ bodyInfo.day.label" @confirm="e => fieldConfirm(e, 'day')" @blur="e => fieldConfirm(e, 'day')" :error-message="bodyInfo.day.error" />
		<van-field :value="bodyInfo.hour.value" type="number" required :label="bodyInfo.hour.label" :placeholder="'请输入'+ bodyInfo.hour.label" @confirm="e => fieldConfirm(e, 'hour')" @blur="e => fieldConfirm(e, 'hour')" :error-message="bodyInfo.hour.error" />
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
			<view class="birthday-item"><text class="label">生辰八字: </text>{{birthInfo?.eightAll?.eight?.join(', ')}} <text v-if="birthInfo?.eightAll?.shu">属:
					{{birthInfo?.eightAll?.shu}}</text></view>
			<view class="birthday-item"><text class="label">五行: </text>{{birthInfo?.fiveAll?.five?.join(', ')}} <text v-if="birthInfo?.fiveAll?.lose">缺:
					{{birthInfo?.fiveAll?.lose}}</text></view>
		</view>
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
	import {
		isEmpty
	} from 'lodash'
	import dayjs from 'dayjs';
	import {
		msg
	} from '@/utils/utils'
	import {
		useStore
	} from '@/store'

	const store = useStore()
	const showPicker = ref(false)
	const bodyInfo = reactive({
		year: {
			value: undefined,
			required: true,
			validate: (val) => {
				if (val > dayjs().year() || val < dayjs().subtract(100, 'year').year()) {
					return `年份不得小于${dayjs().subtract(100, 'year').year()} ，不得大于${dayjs().year()}`
				} else {
					return ''
				}
			},
			label: '出生年份',
			error: ''
		},
		month: {
			value: undefined,
			required: true,
			validate: val => {
				if (val >= 1 && val <= 12) {
					return ''
				} else {
					return '月份不得小于1 ，不得大于12'
				}
			},
			label: '出生月份',
			error: ''
		},
		day: {
			value: undefined,
			required: true,
			validate: val => {
				if (val >= 1 && val <= 31) {
					return ''
				} else {
					return '日期不得小于1 ，不得大于31'
				}
			},
			label: '出生日期',
			error: ''
		},
		hour: {
			value: undefined,
			required: true,
			validate: val => {
				if (val >= 0 && val <= 24) {
					return ''
				} else {
					return '出生小时不得小于0 ，不得大于24'
				}
			},
			label: '出生时辰(24小时制)',
			error: ''
		}
	})
	const today = ref(dayjs().valueOf())
	const minDay = ref(dayjs().subtract(100, 'year').valueOf())
	const datetimesingle = ref(dayjs().subtract(20, 'year').valueOf())
	const birthInfo = ref()

	const sectionTitle = computed(() => unref(birthInfo) ? dayjs(unref(datetimesingle)).format('YYYY-MM-DD HH:mm') : '可以在下方手动输入，也可以点此进行选择出生日期')
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

	const fieldConfirm = async (e, type) => {
		const value = e.detail.value
		bodyInfo[type].value = value >= 0 ? Number(value) : undefined
		if (bodyInfo.year.value > 0 && bodyInfo.month.value > 0 && bodyInfo.day.value > 0 && bodyInfo.hour.value > 0) {
			const data = await validate()
			if (!isEmpty(data)) {
				datetimesingle.value = dayjs(`${data.year}-${data.month}-${data.day} ${data.hour}`).valueOf()
				await submit(data.year, data.month, data.day, data.hour)
			}
		}
	}

	const validate = async () => {
		let bool = false
		const res = {}
		for (let key in bodyInfo) {
			const data = bodyInfo[key]
			data.error = ''
			if (data.required && !data.value) {
				data.error = `${data.label}为必填项哦`
			} else if (data.validate) {
				data.error = data.validate(data.value)
			}

			if (data.error) {
				bool = true
			} else {
				res[key] = data.value
			}
		}

		if (bool) {
			return Promise.reject('请检查输入的数据')
		}
		return Promise.resolve(res)
	}

	const changeLog = async (e) => {
		datetimesingle.value = e.detail
		const date = dayjs(unref(datetimesingle))
		const year = date.year()
		const month = date.month() + 1
		const day = date.date()
		const hour = date.hour()
		bodyInfo.year.value = year
		bodyInfo.year.error = ''
		bodyInfo.month.value = month
		bodyInfo.month.error = ''
		bodyInfo.day.value = day
		bodyInfo.day.error = ''
		bodyInfo.hour.value = hour
		bodyInfo.hour.error = ''

		await submit(year, month, day, hour)
	}

	const submit = async (year, month, day, hour) => {
		const cacheKey = `${year}-${month}-${day} ${hour}`
		showPicker.value = false
		if (store.birthday[cacheKey]) {
			birthInfo.value = store.birthday[cacheKey]
			return
		}
		msg.loading()
		birthInfo.value = await getBirth({
			year,
			month,
			day,
			hour
		})
		store.setBirthday(cacheKey, unref(birthInfo))
		msg.hide()
	}
</script>

<style scoped lang="scss">
	.Birthday {
		height: 100vh;
		background-color: #fff;
	}

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