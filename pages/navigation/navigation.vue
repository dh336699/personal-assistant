<template>
	<view>
		<uni-card title="当年假期" extra="跳转" @click="navTo('remaining')">
			<text class="uni-body">查询当年假期安排</text>
		</uni-card>

		<uni-card title="MBTI性格测试" extra="跳转" @click="navTo('mbti')">
			<text class="uni-body">MBTI测试常用于个人成长、职业咨询和团队建设，它可以帮助人们更好地了解自己和他人，了解自己在特定情境下的优势和劣势，以及如何更好地适应和与他人合作。</text>
		</uni-card>

		<uni-card title="热量营养计算" extra="跳转" @click="navTo('cal')">
			<text class="uni-body">通过你的身高、体重、日常活动量等计算出BMI, 及日常能量消耗和所需的营养摄入</text>
		</uni-card>

		<uni-card title="生辰助手" extra="跳转" @click="navTo('birthday')">
			<text class="uni-body">根据年月日时查询生辰八字等信息</text>
		</uni-card>

		<uni-card title="当日金价" extra="跳转" @click="navTo('brand')">
			<text class="uni-body">各金店最新黄金价格对比</text>
		</uni-card>

		<uni-card title="花语箴言" extra="跳转" @click="navTo('flower')">
			<text class="uni-body">语是人们在一定的历史条件下逐渐约定俗成的，一种用花来表达人的某种感情与愿望的语言，具有一定的社会交流价值</text>
		</uni-card>

		<!-- <ad adpid="1111111111"></ad> -->
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
	} from '@dcloudio/uni-app'

	const navTo = type => {
		if (type !== 'cal') {
			uni.navigateTo({
				url: '/pages/' + type + '/' + type
			})
		} else {
			uni.navigateTo({
				url: '/pages/caculator/cal/cal'
			})
		}
	}
	onShareAppMessage((res) => {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title: '好用的工具',
			imageUrl: '/static/1234.jpg',
			path: '/pages/navigation/navigation',
			desc: '可以进行假期查询，性格测试等等'
		}
	})
</script>

<style scoped lang="scss">

</style>