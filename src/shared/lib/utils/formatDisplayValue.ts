/**
 * Helper function to render a value, handling arrays by joining them with ' / '.
 * @param value - The value to render.
 * @returns A string representation of the value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatDisplayValue = (value: any): string => {
	return Array.isArray(value) ? value.join(' / ') : String(value ?? 'Sin asignar')
}
