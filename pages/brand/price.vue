<template>
	<view class='GoldPrice'>
		<uni-card :title="brandInfo.brand" v-if="brandInfo">
			<van-cell title="黄金参考价" :value="brandInfo.goldPrice" :label="'最新更新时间: ' + brandInfo.auLastDate" />
			<van-cell title="铂金参考价" v-if="brandInfo.platinumPrice" :value="brandInfo.platinumPrice"
				:label="'最新更新时间: ' + brandInfo.ptLastDate" />
		</uni-card>
		<van-empty v-else description="暂无数据" />
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
		onShow
	} from '@dcloudio/uni-app';
	import {
		getGoldPrice
	} from '@/api/juhe';

	const brandInfo = ref()

	onLoad(async options => {
		if (options?.id) {
			brandInfo.value = await getGoldPrice(options?.id);
			console.log(brandInfo.value);
		}
	})
</script>

<style lang="scss">
	.GoldPrice {
		.van-cell {
			padding: 0 !important;
		}
	}
</style>