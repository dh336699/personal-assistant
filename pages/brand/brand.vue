<template>
	<van-cell-group>
		<van-cell v-for="item in list" :key="item._id" :title="item.brand" value="点击查看最新价格" is-link
			:url="'/pages/brand/price?id=' + item._id" />
	</van-cell-group>
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
		getGoldShop
	} from '@/api/juhe'
	import {
		useStore
	} from '@/store'
	import {
		isEmpty
	} from 'lodash';
	import {
		msg
	} from '@/utils/utils'

	const list = ref([]);
	const store = useStore()
	onLoad(async () => {
		if (isEmpty(store.goldBrand)) {
			msg.loading()
			list.value = await getGoldShop()
			store.setGoldBrand(unref(list))
			msg.hide()
		} else {
			list.value = store.goldBrand
		}
	})
</script>

<style scoped lang="scss">

</style>