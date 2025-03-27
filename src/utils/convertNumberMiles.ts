export function convertNumberMiles(numero?: number | null) {
	if (!numero) return ''
	return new Intl.NumberFormat().format(numero)
}
