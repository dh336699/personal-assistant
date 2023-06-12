import {
	useEnv
} from '@/hooks/useEnv'
const {
	isDev
} = useEnv()
export const globSetting = {
	// apiUrl: 'https://www.aiww.site',
	apiUrl: isDev() ? 'https://apis.juhe.cn' : 'https://apis.juhe.cn',
	// urlPrefix: '/api/v1',
	goodsImagePrefix: isDev() ? '/dev/goods' : '/prod/goods',
	avatarPrefix: isDev() ? '/dev/avatar' : '/prod/avatar'
}