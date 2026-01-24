/**
 * Formatea una fecha y hora dada en una cadena legible según la configuración regional del usuario.
 *
 * @param date - La fecha a formatear. Puede ser un objeto Date, una cadena o un número (timestamp).
 * @returns La fecha y hora formateada como una cadena.
 *
 * @example
 * formatDateTime(new Date()) // "31/08/2025, 02:30 p. m."
 */
export function formatDateTime(date: string | Date | number): string {
	try {
		const dateObj = new Date(date)
		if (isNaN(dateObj.getTime())) {
			return 'Fecha inválida'
		}
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		}
		const userLocal = navigator.language || 'es-VE'
		// return dateObj.toLocaleString(userLocal, options)
		return new Intl.DateTimeFormat(userLocal, options).format(dateObj)
	} catch {
		return 'Fecha inválida'
	}
}

/**
 * Formatea una fecha con mes abreviado, año y hora.
 *
 * @param date - La fecha a formatear. Puede ser un objeto Date, una cadena o un número (timestamp).
 * @returns La fecha formateada como una cadena.
 *
 * @example
 * formatDateMedium(new Date()) // "16 ene 2026, 04:30 p. m."
 */
export function formatDateMedium(date: string | Date | number): string {
	try {
		const dateObj = new Date(date)
		if (isNaN(dateObj.getTime())) {
			return 'Fecha inválida'
		}
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		}
		const userLocal = navigator.language || 'es-VE'
		return new Intl.DateTimeFormat(userLocal, options).format(dateObj)
	} catch {
		return 'Fecha inválida'
	}
}

/**
 * Formatea una fecha dada incluyendo el día de la semana, según la configuración regional del usuario.
 *
 * @param date - La fecha a formatear. Puede ser un objeto Date, una cadena o un número (timestamp).
 * @returns La fecha formateada con el día de la semana como una cadena.
 *
 * @example
 * formatDateWithWeekday(new Date()) // "domingo, 31/08/2025"
 */
export function formatDateWithWeekday(date: string | Date | number): string {
	try {
		const dateObj = new Date(date)
		if (isNaN(dateObj.getTime())) {
			return 'Fecha inválida'
		}
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			weekday: 'long',
			day: '2-digit'
		}
		const userLocal = navigator.language || 'es-VE'
		// return dateObj.toLocaleString(userLocal, options)
		return new Intl.DateTimeFormat(userLocal, options).format(dateObj)
	} catch {
		return 'Fecha inválida'
	}
}
