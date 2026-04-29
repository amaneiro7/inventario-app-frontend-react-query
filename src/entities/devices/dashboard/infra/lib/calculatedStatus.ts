// Función auxiliar para calcular el estado
export function calculateStatus(
	count: number,
	threshold: number
): 'In Stock' | 'Low Stock' | 'Out of Stock' {
	if (count === 0 || count === undefined) {
		return 'Out of Stock'
	} else if (count <= threshold) {
		return 'Low Stock'
	} else {
		return 'In Stock'
	}
}
