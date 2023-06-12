import {
	defineStore
} from 'pinia';
import {
	ref
} from 'vue';
import * as cache from '@/utils/cache'
import {
	find
} from 'lodash';

export const useStore = defineStore('userStore', {
	state: () => ({
		vacation: cache.getVacation() || [],
		flower: cache.getFlower() || {},
		mbti: cache.getMbti() || [],
		mbtiAnswer: cache.getMbtiAnswer() || {},
		bodyInfos: cache.getBodyInfo() || {},
		goldBrand: cache.getGoldBrand() || {}
	}),
	actions: {
		setVacation(vacation) {
			this.vacation = vacation
			cache.setVacation(vacation)
		},
		setFlower(flower) {
			this.flower = Object.assign({}, this.flower, flower)
			cache.setFlower(this.flower)
		},
		setMbti(mbti) {
			this.mbti = mbti
			cache.setMbti(this.mbti)
		},
		setMbtiAnswer(answer) {
			this.mbtiAnswer = answer;
			cache.setMbtiAnswer(answer)
		},
		setBodyInfos(bodyInfos) {
			this.bodyInfos = bodyInfos
			cache.setBodyInfo(bodyInfos)
		},
		setGoldBrand(brandList) {
			this.goldBrand = brandList;
			cache.setGoldBrand(brandList)
		}
	}
})