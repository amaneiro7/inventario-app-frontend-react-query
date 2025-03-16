export function formattedDate(date: string | Date): string {
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
			minute: 'numeric'
		}
		const userLocal = navigator.language || 'es-VE'
		console.log(navigator)
		return dateObj.toLocaleString(userLocal, options)
	} catch {
		return 'Fecha inválida'
	}
}
