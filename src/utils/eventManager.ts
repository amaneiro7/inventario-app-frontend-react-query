/**
 * A function that wraps a function that returns a promise, and prevents that function from being
 * called multiple times in quick succession. This is useful for preventing accidental double clicks
 * on buttons, for example.
 *
 * @param fn The function to be wrapped.
 * @returns A function that can be called instead of the original function. This function will
 *          wait 2000ms after the last call before allowing the function to be called again.
 */

export function eventManager<R, T extends (...args: never[]) => Promise<R>>(
	fn: T
): (...args: Parameters<T>) => Promise<void> {
	console.log('eventManager start')
	let executing = false
	return async (...args: Parameters<T>) => {
		if (!executing) {
			console.log('eventManager ejecutando')
			executing = true
			await fn(...args)
			setTimeout(() => {
				executing = false
			}, 2000)
		}
	}
}
