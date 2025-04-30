export function formatearTelefono(numero?: string) {
	if (!numero) {
		return ''
	}
	const limpio = numero.replace(/\D/g, '')
	const match = limpio.match(/^(\d{4})(\d{3})(\d{4})$/)
	if (match) {
		return `(${match[1]})-${match[2]}.${match[3]}`
	}
	return ''
}
