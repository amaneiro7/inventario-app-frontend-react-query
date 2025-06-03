export function formattedDate(date: string | Date | number): string {
	try {
		const dateObj = new Date(date)
		if (isNaN(dateObj.getTime())) {
			return 'Fecha inválida'
		}
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		}
		const userLocal = navigator.language || 'es-VE'
		// return dateObj.toLocaleString(userLocal, options)
		return new Intl.DateTimeFormat(userLocal, options).format(dateObj)
	} catch {
		return 'Fecha inválida'
	}
}
