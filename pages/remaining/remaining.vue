<template>
	<view>
		<van-collapse :value="activeNames" @change="e => activeNames = e.detail">
			<van-collapse-item v-for="item in list" :title="item.name + ' ' + item.holiday" :name="item.holiday" :key="item.name">
				<p>注意：{{ item.tip }}</p>
				<div class="holiday">假日：<p v-for="it in item.vacation" :key="it" style="margin-right: 4px;margin-bottom: 4px;white-space: nowrap;">
						<uni-tag :text="it" size='small' type="primary" />
					</p>
				</div>
				<p>温馨提示： {{item.rest}}</p>
			</van-collapse-item>
		</van-collapse>
		<van-calendar v-if="show" :show="true" :formatter="formatter" @close="show = false" />
		<view class="ButtonWrapper">
			<van-button type="primary" block @click="() => show = true">打开日历</van-button>
		</view>
	</view>
</template>

<script setup>
	import {
		nextTick,
		reactive,
		ref,
		unref
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import * as Api from '@/api/juhe'
	import {
		useStore
	} from '@/store'
	import {
		includes,
		isEmpty
	} from 'lodash';
	import dayjs from 'dayjs';
	import {
		msg
	} from '@/utils/utils'

	const show = ref(false)
	const minDate = ref(new Date(2000, 0, 1).getTime())
	const maxDate = ref(new Date(2050, 11, 31).getTime())
	const list = ref([])
	const activeNames = ref(['1'])
	const map = new Map()
	const store = useStore()

	const formatter = day => {
		const date = dayjs(day.date).format('M月D号')
		const date2 = dayjs(day.date).format('YYYY-MM-DD')
		if (map.has(date)) {
			day.bottomInfo = map.get(date)
			day.className = 'festival'
		} else if (map.has(date2)) {
			day.bottomInfo = map.get(date2)
			day.className = 'festival'
		}

		// if (day.type === 'start') {
		// 	day.bottomInfo = '入住';
		// } else if (day.type === 'end') {
		// 	day.bottomInfo = '离店';
		// }
		return day;
	}
	onLoad(async () => {
		msg.loading()
		if (isEmpty(store.vacation)) {
			const data = await Api.getVacationList()
			data?.list.forEach(item => {
				map.set(item.holiday, item.name)
				item.vacation = (item.vacation) ? item.vacation?.split(
					'|') : []
				item.vacation.forEach(it => {
					map.set(it, '假期')
				})
			})
			list.value = data.list
			store.setVacation(data.list)
		}
		list.value = store.vacation
		msg.hide()
	})
</script>

<style lang="scss">
	.ButtonWrapper {
		position: fixed;
		bottom: 20px;
		left: 10px;
		right: 10px;
	}

	.festival {
		background: rgba(235, 51, 51, .05) !important;
		color: #eb3333 !important;
	}

	.holiday {
		display: flex;
		flex-wrap: wrap;
		margin-top: 6px;
		margin-bottom: 6px
	}
</style>