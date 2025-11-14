export const cleanStringToArray = (inputString: string): string[] => {
	try {
		// 1. Verificar y limpiar los corchetes exteriores
		// Quita el '[' al inicio (^) y el ']' al final ($)
		let content = inputString.replace(/^\[|\]$/g, '')

		// 2. Limpiear las comillas que envuelven a los items.
		// La expresión regular /'/g reemplaza TODAS las comillas simples (') por vacías.
		// La expresión regular /"/g reemplaza TODAS las comillas dobles (") por vacías.
		content = content.replace(/'/g, '').replace(/"/g, '')

		// 3. Dividir la cadena or la coma.
		// El metodo .split(',') genera el array.
		// El método .map(item => item.trim()) se asegura de quitar cualquier espacio extra.
		const finalArray: string[] = content.split(',').map(item => item.trim())

		// Si el array resultante es [''] (lo que ocurre si la string original era "[]"),
		// devolvemos un array vacío real.
		if (finalArray.length === 1 && finalArray[0] === '') {
			return []
		}

		return finalArray
	} catch {
		return []
	}
}
