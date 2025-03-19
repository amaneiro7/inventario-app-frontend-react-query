export function eventManager<T extends (...args: never[]) => Promise<void>>(
	fn: T
): (...args: Parameters<T>) => Promise<void> {
	let executing = false
	return async (...args: Parameters<T>) => {
		if (!executing) {
			executing = true
			await fn(...args)
			setTimeout(() => {
				executing = false
			}, 2000)
		}
	}
}
