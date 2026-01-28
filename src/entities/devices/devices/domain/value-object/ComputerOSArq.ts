import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type OperatingSystemId } from '@/entities/devices/features/operatingSystem/operatingSystem/domain/value-object/OperatingSystemId'
import { type OperatingSystemArqId } from '@/entities/devices/features/operatingSystem/operatingSystemArq/domain/value-object/OperatingSystemArqId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * @class ComputerOsArq
 * @extends {AcceptedNullValueObject<Primitives<OperatingSystemArqId>>}
 * @description Value Object que representa la arquitectura del sistema operativo de una computadora.
 * Incluye lógica de validación basada en la presencia de un sistema operativo.
 */
export class ComputerOsArq extends AcceptedNullValueObject<Primitives<OperatingSystemArqId>> {
	private static errors = ''

	/**
	 * Crea una instancia de `ComputerOsArq`.
	 * @param {Primitives<OperatingSystemId> | null} value - El valor del ID de la arquitectura del sistema operativo.
	 * @param {Primitives<OperatingSystemId> | null} operatingSystem - El ID del sistema operativo asociado.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */ constructor(
		value: Primitives<OperatingSystemId> | null,
		private readonly operatingSystem: Primitives<OperatingSystemId> | null
	) {
		super(value)

		if (!ComputerOsArq.isValid({ value: this.value, operatingSystem: this.operatingSystem })) {
			throw new Error(ComputerOsArq.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */ private static updateError(error: string): void {
		ComputerOsArq.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */ private static get errorsValue(): string {
		return ComputerOsArq.errors
	}

	/**
	 * Valida la arquitectura del sistema operativo en función de la presencia de un sistema operativo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<ComputerOsArq>} props.value - El valor de la arquitectura del sistema operativo.
	 * @param {Primitives<OperatingSystemId> | null} props.operatingSystem - El ID del sistema operativo asociado.
	 * @returns {boolean} `true` si la arquitectura es válida, `false` en caso contrario.
	 */ public static isValid({
		value,
		operatingSystem
	}: {
		value: Primitives<ComputerOsArq>
		operatingSystem: Primitives<OperatingSystemId> | null
	}): boolean {
		if (!operatingSystem && value) {
			ComputerOsArq.updateError(
				'Si el equipo no posee Sistema Operativo, no se le puede definir una arquitectura'
			)
			return false
		}
		if (operatingSystem && !value) {
			ComputerOsArq.updateError(
				'Si el equipo posee Sistema Operativo, la arquitectura es requerida'
			)
			return false
		}
		return true
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return ComputerOsArq.errorsValue
	}
}
