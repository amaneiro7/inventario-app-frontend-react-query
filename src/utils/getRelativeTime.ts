type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'zh' | 'ja'
/**
 * Objeto que define las unidades de tiempo y sus equivalentes en segundos.
 * Se utiliza para calcular el tiempo relativo transcurrido.
 */
const DATE_UNITS: Record<string, number> = {
	year: 31536000, // Segundos en un año
	month: 2629800, // Segundos en un mes
	day: 86400, // Segundos en un día
	hour: 3600, // Segundos en una hora
	minute: 60, // Segundos en un minuto
	second: 1 // Segundos en un segundo
}

/**
 * Código de idioma para formatear el tiempo relativo.
 * En este caso, 'en' representa el inglés.
 */
const languageCode: LanguageCode = 'es' // English

/**
 * Instancia de Intl.RelativeTimeFormat para formatear el tiempo relativo.
 * Utiliza el código de idioma especificado y la opción 'numeric: "auto"' para mostrar valores numéricos automáticamente.
 */
const rtf = new Intl.RelativeTimeFormat(languageCode, { numeric: 'auto' })

/**
 * Función para obtener el tiempo relativo transcurrido desde un timestamp dado.
 *
 * @param timestamp - El timestamp (número, cadena o Date) desde el cual calcular el tiempo relativo.
 * @returns Una cadena que representa el tiempo relativo formateado.
 */
export const getRelativeTime = (timestamp: number | string | Date): string => {
	/**
	 * Convierte el timestamp a milisegundos.
	 */
	const from = new Date(timestamp).getTime()
	/**
	 * Obtiene el timestamp actual en milisegundos.
	 */
	const now = new Date().getTime()

	/**
	 * Calcula la diferencia en segundos entre el timestamp dado y el timestamp actual.
	 */
	let elapsed = (from - now) / 1000
	/**
	 * Determina si el tiempo es pasado (negativo) o futuro (positivo).
	 */
	const isPast = elapsed < 0
	/**
	 * Obtiene el valor absoluto de la diferencia en segundos.
	 */
	elapsed = Math.abs(elapsed)

	/**
	 * Itera sobre las unidades de tiempo para encontrar la unidad más grande que se ajuste a la diferencia.
	 */
	for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
		/**
		 * Si la diferencia en segundos es mayor que la unidad de tiempo actual, formatea el tiempo relativo.
		 */
		if (elapsed > secondsInUnit) {
			/**
			 * Calcula el valor numérico para la unidad de tiempo actual.
			 */
			const value = Math.floor(elapsed / secondsInUnit)
			/**
			 * Formatea el tiempo relativo utilizando Intl.RelativeTimeFormat.
			 * Utiliza el valor calculado y la unidad de tiempo actual.
			 * Si el tiempo es pasado, utiliza un valor negativo.
			 */
			return rtf.format(isPast ? -value : value, unit as Intl.RelativeTimeFormatUnit)
		}
	}

	/**
	 * Si la diferencia es menor que todas las unidades de tiempo, formatea el tiempo relativo como segundos.
	 * Utiliza 0 para indicar "ahora" y la unidad 'second'.
	 * Si el tiempo es pasado, utiliza 0.
	 */
	return rtf.format(isPast ? 0 : 0, 'second')
}
