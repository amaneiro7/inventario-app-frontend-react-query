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
