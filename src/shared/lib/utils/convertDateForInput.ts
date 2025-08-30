export const convetDateForInputs = (date: Date | string | null | undefined) => {
	// Si la fecha es nula, indefinida o un string vacio, devuelve un string vacio
	if (!date) {
		return ''
	}
	// creat un objeto Date. si 'date' ya es un string, lo parsea
	const dateObj = new Date(date)

	// Validar si la fecha resultante es v'alida
	if (isNaN(dateObj.getTime())) {
		return ''
	}

	const year = dateObj.getUTCFullYear()
	// getMonth() es 0-indexado, por eso se suma 1.
	// padStart asegura que el mes y el día siempre tengan 2 dígitos (ej: 08)
	const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')
	const day = dateObj.getUTCDate().toString().padStart(2, '0')
	return `${year}-${month}-${day}`
}
