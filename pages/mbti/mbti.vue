<template>
	<view class="Mbti" v-if="!answers && !isEmpty(list)">
		<view class="Mbti__tip">当前第{{current + 1}}/{{list.length}}题</view>
		<view class="Mbti__question">
			{{item.question}}
		</view>
		<van-radio-group :value="item.answers" @change="(e) => onChange(e)">
			<van-radio :name="item.type1">{{item.answer1}}</van-radio>
			<van-radio :name="item.type2">{{item.answer2}}</van-radio>
		</van-radio-group>
		<view class="Mbti__btns">
			<van-button class="btn" round type="primary" v-show="showPrew" @click="handlePrev"><van-icon
					name="arrow-left" />上一题</van-button>
			<van-button class="btn" round type="primary" @click="handleNext" v-show="showNext">下一题<van-icon
					name="arrow" /></van-button>
			<van-button class="btn" round color="linear-gradient(to right, #4bb0ff, #6149f6)" v-show="showSubmit"
				@click="handleSubmit">提交</van-button>
		</view>
	</view>
	<view class="Answer" v-else-if="answers">
		<view class="Answer__item">
			<view class="label"> 类型:</view>
			<view class="text">{{answers.type}}</view>
		</view>
		<view class="Answer__item">
			<view class="label">类型名称: </view>
			<view class="text">{{answers.name}}</view>
		</view>
		<view class="Answer__item">
			<view class="label">简介: </view>
			<view class="text">{{answers.summary}}</view>
		</view>
		<view class="Answer__item">
			<view class="label">特征: </view>
			<view class="text">{{answers.characteristic}}</view>
		</view>
		<view class="Answer__item">
			<view class="label">适合的职业领域:</view>
			<view class="text">{{answers.field}}</view>
		</view>
		<view class="Answer__item">
			<view class="label">适合的职业: </view>
			<view class="text">{{answers.job}}</view>
		</view>

		<view class="Answer__btns">
			<van-button class="btn" round type="primary" @click="handleReply"><van-icon
					name="replay" />重新答题</van-button>
			<van-button class="btn" round type="primary" @click="handlePreview"><van-icon
					name="revoke" />查看答过的题</van-button>
		</view>
	</view>
	<van-empty v-else description="暂无数据" />
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
		onShow,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import {
		useStore
	} from '@/store'
	import {
		getMbti,
		getAnswers
	} from '@/api/juhe'
	import {
		isEmpty
	} from 'lodash';
	import {
		msg
	} from '@/utils/utils'

	const list = ref()

	const answers = ref()
	const current = ref(0)
	const store = useStore()

	const item = computed(() => unref(list)[unref(current)] || {})

	const showNext = computed(() => unref(current) < unref(list).length - 1)

	const showSubmit = computed(() => unref(current) === unref(list).length - 1)

	const showPrew = computed(() => unref(current) !== 0)

	const handlePrev = () => {
		current.value -= 1
	}

	const handleNext = () => {
		if (!unref(item).answers) {
			msg.toast('请先回答当前题目哦');
			return
		}
		current.value += 1
	}

	const onChange = (e) => {
		list.value[unref(current)].answers = e.detail
		console.log(list.value[unref(current)]);
		store.setMbti(unref(list))
		if (unref(current) < unref(list).length - 1) {
			setTimeout(() => {
				current.value += 1
			}, 200)
		}
	}

	const handleReply = () => {
		msg.modal('确认清空历史记录并重新答题?', () => {
			_initQuestion(false, true)
		})
	}

	const handlePreview = () => {
		console.log('进入');
		_initQuestion(false)
	}

	const handleSubmit = async () => {
		const data = unref(list).map(item => item.answers)
		const res = await getAnswers(data.join(','))
		answers.value = res
		store.setMbtiAnswer(res)
	}

	const _initQuestion = async (init = true, reply = false) => {
		msg.loading()
		answers.value = null
		current.value = 0
		if (isEmpty(store.mbti) || reply) {
			list.value = await getMbti()
			list.value = unref(list).map(item => {
				item.answers = ''
				return item
			});
			store.setMbti(unref(list))
		} else {
			list.value = store.mbti
			if (init) {
				for (let i = 0; i < store.mbti.length; i++) {
					if (!store.mbti[i].answers) {
						current.value = i
						break;
					}
				}
			}
		}
		msg.hide()
	}

	onLoad(() => {
		if (!isEmpty(store.mbtiAnswer)) {
			answers.value = store.mbtiAnswer
		} else {
			_initQuestion()
		}

	})

	onShareAppMessage((res) => {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title: 'MBTI性格测试',
			imageUrl: '/static/mbti.jpg',
			path: '/pages/mbti/mbti',
			desc: 'mbti,性格测试,提升职场能力,提高职场竞争力'
		}
	})
</script>

<style lang="scss">
	.Mbti {
		display: flex;
		flex-direction: column;
		padding: 80px 30px;
		align-items: center;
		height: 100vh;
		background: white;
		box-sizing: border-box;

		&__tip {
			margin-bottom: 20px;
		}

		&__question {
			margin-bottom: 30px;
		}

		.van-radio {
			margin-bottom: 20px !important;
		}

		&__btns {
			margin-top: 50px;
			width: 100%;
			display: flex;
			justify-content: space-between;

			.btn {
				min-width: 80px;

				button {
					width: 100%
				}
			}
		}
	}

	.Answer {
		padding: 20px;
		box-sizing: border-box;

		&__item {
			margin-bottom: 20px;

			.label {
				margin-bottom: 6px;
				color: #4fc08d;
			}

			.text {
				font-size: 14px;
				color: darkgray;
			}
		}

		&__btns {
			margin-top: 50px;
			width: 100%;
			display: flex;
			justify-content: space-between;

			.btn {
				min-width: 80px;

				button {
					width: 100%
				}
			}
		}
	}
</style>