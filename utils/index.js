export const labelFilter = (val, dict) => {
	if (dict.length) {
		return dict.find(item => item.value === val).label || ''
	} else {
		return ''
	}
}