<template>
	<view>
		<van-field label='花名' :value="flowerName" placeholder="请输入花名" @change="onChange" />

		<uni-card v-if="flowerDesc" :title="title">
			<p class="uni-body">花语: {{flowerDesc.flowerlang}}</p>
			<p class="uni-body">花语箴言: {{flowerDesc.flowerprov}}
			</p>
		</uni-card>
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
		debounce
	} from 'lodash'
	import {
		getFlower
	} from '@/api/juhe'
	import {
		useStore
	} from '@/store';
	import {
		msg
	} from '@/utils/utils'

	const flowerName = ref('');
	const flowerDesc = ref();
	const store = useStore();

	const title = computed(() => unref(flowerDesc).cnflower + ' ' + unref(flowerDesc).enflower)

	const onChange = debounce(async e => {
		msg.loading()
		const name = e.detail
		if (store.flower[name]) {
			return store.flower[name]
		}
		flowerDesc.value = await getFlower(name)
		store.setFlower({
			[name]: unref(flowerDesc)
		})
		msg.hide()
	}, 1000)
</script>

<style scoped lang="scss">

</style>