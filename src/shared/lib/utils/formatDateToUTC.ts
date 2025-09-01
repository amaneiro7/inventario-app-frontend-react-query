// en un archivo como 'formatDate.ts'
/**
 * Formatea una fecha (string o Date) a un formato local (ej: 31/08/2025),
 * pero asegurando que se interprete como UTC para evitar desfases por zona horaria.
 * @param dateInput La fecha a formatear.
 * @param locale El formato regional a usar (por defecto 'es-VE').
 * @returns La fecha formateada o un texto de fallback.
 */
export const formatDateToUTC = (
	dateInput: string | Date | null | undefined,
	fallback: string = 'N/A'
): string => {
	if (!dateInput) return fallback

	try {
		const date = new Date(dateInput)
		// La clave es timeZone: 'UTC'.
		// Le dice a la función que use los componentes (día, mes, año) de la fecha en UTC,
		// ignorando la zona horaria del navegador.
		return date.toLocaleDateString('es-VE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			timeZone: 'UTC'
		})
	} catch (error) {
		console.error('Error formateando la fecha:', dateInput, error)
		return fallback
	}
}
