export let launchedResolve = null
export const onPageLaunched = new Promise(resolve => {
	launchedResolve = resolve
})

export let showedResolve = null
export const onPageShowed = new Promise(resolve => {
	showedResolve = resolve
})