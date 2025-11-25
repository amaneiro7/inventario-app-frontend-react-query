/**
 * @description Compara dos objetos o valores para determinar si son estructuralmente idénticos.
 * Utiliza genéricos para asegurar que ambas entradas son del mismo tipo T.
 * Maneja anidación, arrays y tipos primitivos de forma robusta.
 * * @template T El tipo de los objetos a comparar.
 * @param {T} obj1 Objeto 1 a comparar.
 * @param {T} obj2 Objeto 2 a comparar.
 * @returns {boolean} true si son iguales en contenido y estructura.
 */
export const isDeepEqual = <T extends any>(obj1: T, obj2: T): boolean => {
	// 1. Comparación de identidad (para primitivos y referencias directas)
	if (obj1 === obj2) return true

	// 2. Manejo de null/tipos diferentes
	// Si no son objetos o son null, y no pasaron la prueba de identidad, son diferentes.
	if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
		return false
	}

	// 3. Comparación de tipos de objetos (Array vs. Object)
	const isArray1 = Array.isArray(obj1)
	const isArray2 = Array.isArray(obj2)

	if (isArray1 !== isArray2) return false

	// 4. Obtener claves y comparar longitud
	// Usamos Record<string, any> para facilitar la indexación si no podemos inferir una estructura estricta.
	const record1 = obj1 as Record<string, any>
	const record2 = obj2 as Record<string, any>

	const keys1 = Object.keys(record1)
	const keys2 = Object.keys(record2)

	if (keys1.length !== keys2.length) return false

	// 5. Comparación recursiva de propiedades
	for (const key of keys1) {
		// La aserción 'as T[keyof T]' o simplemente 'as any' es necesaria aquí
		// para la llamada recursiva, ya que el tipado estricto de la clave 'key' es complejo.
		// Pero usamos la recursividad segura al final.
		if (!keys2.includes(key) || !isDeepEqual(record1[key], record2[key])) {
			return false
		}
	}

	return true
}
