const AppStorage = () => {
	const set = (key: string, value: string) => {
		localStorage.setItem(key, value)
	}

	const get = (key: string) => {
		return localStorage.getItem(key)
	}

	return {
		set,
		get,
	}
}

const appStorage = AppStorage()

export default appStorage
