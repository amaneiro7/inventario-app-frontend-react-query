export function groupBy<T, K extends string | number | symbol>(
	iterable: Iterable<T>,
	callback: (item: T) => K
) {
	const groups: Record<K, T[]> = {} as Record<K, T[]>
	for (const item of iterable) {
		const result = callback(item)
		if (!groups[result]) {
			groups[result] = [item]
		} else {
			groups[result].push(item)
		}
	}
	return groups
}
