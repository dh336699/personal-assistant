<template>
	<view class="Cal">
		<van-cell title="性别">
			<van-radio-group :value="bodyInfo.sex.value" @change="e => bodyInfo.sex.value = e.detail"
				direction="horizontal">
				<van-radio :name="0">男性</van-radio>
				<van-radio :name="1" checked-color="#07c160">女性</van-radio>
			</van-radio-group>
		</van-cell>

		<van-field :value="bodyInfo.age.value" label="年龄" type="number" required placeholder="请输入年龄"
			@confirm="e => fieldConfirm(e, 'age')" @blur="e => fieldConfirm(e, 'age')"
			:error-message="bodyInfo.age.error" />

		<van-field :value="bodyInfo.height.value" type="number" required label="身高(cm)" placeholder="请输入身高"
			@confirm="e => fieldConfirm(e, 'height')" @blur="e => fieldConfirm(e, 'height')"
			:error-message="bodyInfo.height.error" />

		<van-field :value="bodyInfo.weight.value" type="number" required label="体重(kg)" placeholder="请输入体重"
			@confirm="e => fieldConfirm(e, 'weight')" @blur="e => fieldConfirm(e, 'weight')"
			:error-message="bodyInfo.weight.error" />

		<van-field :value="bodyInfo.bodyFat.value" type="number" label="体脂(%)" placeholder="请输入体脂(非必填)"
			@confirm="e => fieldConfirm(e, 'bodyFat')" @blur="e => fieldConfirm(e, 'bodyFat')" />

		<view class="PickerWrapper">
			<view class='PickerWrapper-label'>日常活动系数</view>
			<view class='PickerWrapper-picker'>
				<picker class='picker' @change="e => handlePicker(e, 'activeIdx')" :value="activeIdx"
					:range="activeList" range-key='text'>
					<view v-if="!activeIdx && activeIdx !== 0" class="picker-placeholder">
						请选择日常活动系数
					</view>
					<view v-else class="picker-value">
						{{activeList[activeIdx].text}}
					</view>
				</picker>
				<view class="picker-error">{{ bodyInfo.active.error }}</view>
			</view>
		</view>
		<view class="PickerWrapper">
			<view class='PickerWrapper-label'>碳水摄入量</view>
			<view class='PickerWrapper-picker'>
				<picker class='picker' @change="e => handlePicker(e, 'exerciseIdx')" :value="exerciseIdx"
					:range="exerciseList" range-key='text'>
					<view v-if="!exerciseIdx && exerciseIdx !== 0" class="picker-placeholder">
						请选择碳水摄入量
					</view>
					<view v-else class="picker-value">
						{{exerciseList[exerciseIdx].text}}
					</view>
				</picker>
				<view class="picker-error">{{ bodyInfo.exercise.error }}</view>
			</view>
		</view>

		<van-cell title="目标">
			<van-radio-group direction='horizontal' :value="bodyInfo.goal.value"
				@change="e => bodyInfo.goal.value = e.detail">
				<van-radio :name="1">减脂</van-radio>
				<van-radio :name="2">塑形</van-radio>
				<van-radio :name="3">增肌</van-radio>
			</van-radio-group>
		</van-cell>

		<view class="button-wrapper">
			<van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" round custom-style="width: 300px;"
				@click="calculate">
				点击计算
			</van-button>
		</view>
	</view>

</template>

<script setup>
	import {
		reactive,
		ref,
		unref
	} from 'vue';
	import {
		onLoad,
		onShow,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import {
		isEmpty,
		isInteger
	} from 'lodash';
	import {
		useStore
	} from '@/store'

	const store = useStore()
	const showActive = ref(false)
	const showExercise = ref(false)
	const bodyInfo = reactive({
		sex: {
			value: 0,
			error: '',
			label: '性别'
		},
		age: {
			value: undefined,
			required: true,
			validate: (val) => {
				if (val > 0 && val < 100) {
					return ''
				} else {
					return '年龄不得小于0 ，不得大于100'
				}
			},
			label: '性别',
			error: ''
		},
		height: {
			value: undefined,
			required: true,
			validate: val => {
				if (val > 100 && val < 250) {
					return ''
				} else {
					return '身高不得小于100 ，不得大于250'
				}
			},
			label: '身高',
			error: ''
		},
		weight: {
			value: undefined,
			required: true,
			validate: val => {
				if (val > 20 && val < 400) {
					return ''
				} else {
					return '体重不得小于20 ，不得大于400'
				}
			},
			label: '体重',
			error: ''
		},
		bodyFat: {
			value: undefined,
			required: false,
			validate: val => {
				if (val > 0 && val < 40) {
					return ''
				} else {
					return '体脂不得小于0 ，不得大于40'
				}
			},
			error: ''
		},
		active: {
			value: undefined,
			required: true,
			label: '活动系数',
			error: ''
		},
		exercise: {
			value: undefined,
			required: true,
			label: '碳水摄入量',
			error: ''
		},
		goal: {
			value: 1,
			required: true,
			label: '目标',
			error: ''
		}
	})
	const activeList = ref([{
		key: 1.2,
		text: "久坐且不运动"
	}, {
		key: 1.375,
		text: "久坐, 少量或不运动, 但职业要求少量运动"
	}, {
		key: 1.55,
		text: "久坐但规律训练, 适合大部分训练者"
	}, {
		key: 1.725,
		text: "动的多, 练得多"
	}, {
		key: 1.9,
		text: "从事体力劳动且训练消耗大"
	}])
	const activeIdx = ref()
	const exerciseList = ref([{
		key: 1,
		text: "减肥计划执行者,适用于很少的增氧练习"
	}, {
		key: 2,
		text: "睡觉,看电视,久坐"
	}, {
		key: 3,
		text: "日常家务事(多数成年人的摄入量)"
	}, {
		key: 4,
		text: "散步,温和运动"
	}, {
		key: 4.5,
		text: "修养运动,健身练习(3~5小时/周)"
	}, {
		key: 5,
		text: "足球,橄榄球,篮球,健身,塑身,举重(5~6小时/周)"
	}, {
		key: 6,
		text: "中等运动强度(7~10小时/周)"
	}, {
		key: 8,
		text: "健身运动,耐力运动,跑步(10小时以上/周)"
	}, {
		key: 10,
		text: "全职运动员,超强耐力训练,铁人三项(15小时/周)"
	}])
	const goalList = ref([{
		key: 1,
		value: "减脂"
	}, {
		key: 2,
		value: "塑形"
	}, {
		key: 3,
		value: "增肌"
	}])
	const exerciseIdx = ref()
	const goalIdx = ref();

	const fieldConfirm = (e, type) => {
		const value = e.detail.value
		if (value) {
			const val = value ? Number(value) : undefined
			bodyInfo[type].value = val
			bodyInfo[type].error = ''
		}
	}
	const handlePicker = (e, type) => {
		if (type === 'activeIdx') {
			activeIdx.value = Number(e.detail.value)
			bodyInfo.active.value = unref(activeList)[unref(activeIdx)].key
		} else if (type === 'exerciseIdx') {
			exerciseIdx.value = Number(e.detail.value)
			bodyInfo.exercise.value = unref(exerciseList)[unref(exerciseIdx)].key
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

	const calculate = async () => {
		const data = await validate()
		store.setBodyInfos({
			...data,
			activeIdx: unref(activeIdx),
			exerciseIdx: unref(exerciseIdx)
		})
		uni.navigateTo({
			url: '../result/result'
		})
	}

	onLoad((e) => {
		if (!isEmpty(store.bodyInfos)) {
			const {
				bodyInfos
			} = store;
			for (let key in bodyInfos) {
				if (key === 'exerciseIdx') {
					exerciseIdx.value = bodyInfos[key]
				} else if (key === 'activeIdx') {
					activeIdx.value = bodyInfos[key]
				} else {
					bodyInfo[key].value = bodyInfos[key]
				}
			}
		}
	})

	onShareAppMessage((res) => {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title: '热量营养计算',
			imageUrl: '/static/sport.jpeg',
			path: '/pages/cal/cal',
			desc: '计算BMI, 热量消耗, 代谢以及一天内所需营养成分'
		}
	})
</script>

<style lang="scss">
	.Cal {
		.van-cell__title {
			max-width: 6.2em !important;
			min-width: 6.2em !important;
			margin-right: 12px !important;
		}
	}

	.PickerWrapper {
		display: flex;
		align-items: flex-start;
		background-color: var(--cell-background-color, #fff);
		box-sizing: border-box;
		color: var(--cell-text-color, #323233);
		display: flex;
		font-size: var(--cell-font-size, 14px);
		line-height: var(--cell-line-height, 24px);
		padding: var(--cell-vertical-padding, 10px) var(--cell-horizontal-padding, 16px);
		position: relative;
		width: 100%;

		&:before {
			color: var(--cell-required-color, #ee0a24);
			content: "*";
			font-size: var(--cell-font-size, 14px);
			left: var(--padding-xs, 8px);
			position: absolute;
		}

		&-label {
			max-width: 6.2em;
			min-width: 6.2em;
			margin-right: 12px;
			color: var(--field-label-color, #646566);
		}

		&-picker {
			.picker {
				&-placeholder {
					color: lightgray
				}

				&-value {
					picker {
						background-color: initial;
						border: 0;
						box-sizing: border-box;
						color: #323233;
						font-family: UICTFontTextStyleBody;
						height: var(--cell-line-height, 24px);
						line-height: inherit;
						margin: 0;
						min-height: var(--cell-line-height, 24px);
						padding: 0;
						position: relative;
						resize: none;
						text-align: left;
						width: 100%;
					}
				}
			}

			.picker-error {
				color: var(--field-error-message-color, #ee0a24);
				font-size: var(--field-error-message-text-font-size, 12px);
				text-align: left;
			}
		}
	}

	.button-wrapper {
		margin: 20rpx auto 0;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.Cal-tip {
		padding: 6rpx 0;
		margin: 0 20rpx 20rpx;
		font-size: 28rpx;
		border-bottom: 1rpx solid #eee;
	}

	.Cal-tip-title {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.Cal-tip-title_icon {
		margin-right: 10rpx;
	}

	.Cal-primary {
		padding: 6rpx 20rpx;
	}

	.Cal-primary-input,
	.Cal-primary-picker {
		margin-bottom: 40rpx;
		border-bottom: 1rpx solid #eee;
	}

	.Cal-primary-input {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.require {
		color: red;
	}

	.noNeed {
		color: #787878;
	}

	input {
		text-align: right;
	}

	.Cal-btn {
		margin-top: 100rpx;
		text-align: center;
	}
</style>