export const useLocalStorage = <T>(key: string) => {
	const setItem = (value: T) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.error(error)
		}
	}

	const getItem = (): T | undefined => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? (JSON.parse(item) as T) : undefined
		} catch (error) {
			console.error(error)
			return undefined
		}
	}

	const removeItem = () => {
		try {
			window.localStorage.removeItem(key)
		} catch (error) {
			console.error(error)
		}
	}

	return { setItem, getItem, removeItem }
}
