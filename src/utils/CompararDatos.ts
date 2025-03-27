/* eslint-disable @typescript-eslint/no-explicit-any */
interface Cambio {
	oldValue: any
	newValue: any
}
export function compararDatos(
	newData: Record<string, any>,
	oldData: Record<string, any>
): Record<string, Cambio> {
	const cambios: Record<string, Cambio> = {}

	for (const key in newData) {
		if (Object.prototype.hasOwnProperty.call(newData, key)) {
			if (Array.isArray(newData[key]) && Array.isArray(oldData[key])) {
				if (!arraysIguales(newData[key], oldData[key])) {
					cambios[key] = {
						oldValue: oldData[key],
						newValue: newData[key]
					}
				}
			} else if (normalizarValor(newData[key]) !== normalizarValor(oldData[key])) {
				cambios[key] = {
					oldValue: oldData[key],
					newValue: newData[key]
				}
			}
		}
	}

	return cambios
}

function normalizarValor(valor: any) {
	if (valor === undefined || valor === null || valor === '') {
		return null // Normaliza a null para la comparación
	}
	return valor
}

function arraysIguales(arr1: any[], arr2: any[]) {
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
		return false
	}

	if (arr1.length !== arr2.length) {
		return false
	}

	for (let i = 0; i < arr1.length; i++) {
		if (normalizarValor(arr1[i]) !== normalizarValor(arr2[i])) {
			return false
		}
	}

	return true
}
