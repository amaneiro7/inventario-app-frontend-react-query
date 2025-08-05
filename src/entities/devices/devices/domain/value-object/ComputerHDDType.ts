import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type HardDriveTypeId } from '@/entities/devices/features/hardDrive/hardDriveType/domain/value-object/HardDriveTypeId'
import { type ComputerHDDCapacity } from './ComputerHDDCapacity'

/**
 * @class ComputerHDDType
 * @extends {AcceptedNullValueObject<Primitives<HardDriveTypeId>>}
 * @description Value Object que representa el tipo de disco duro de una computadora.
 * Incluye lógica de validación basada en la capacidad del disco duro.
 */
export class ComputerHDDType extends AcceptedNullValueObject<Primitives<HardDriveTypeId>> {
	private static errors = ''

	/**
	 * Crea una instancia de `ComputerHDDType`.
	 * @param {Primitives<HardDriveTypeId> | null} value - El valor del tipo de disco duro.
	 * @param {Primitives<ComputerHDDCapacity>} hardDriveCapacity - La capacidad del disco duro asociada.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */	constructor(
		value: Primitives<HardDriveTypeId> | null,
		private readonly hardDriveCapacity: Primitives<ComputerHDDCapacity>
	) {
		super(value)

		if (
			!ComputerHDDType.isValid({
				value: this.value,
				hardDriveCapacity: this.hardDriveCapacity
			})
		) {
			throw new Error(ComputerHDDType.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */	private static updateError(error: string): void {
		ComputerHDDType.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */	private static get errorsValue(): string {
		return ComputerHDDType.errors
	}

	/**
	 * Valida el tipo de disco duro en función de la capacidad del disco duro.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<ComputerHDDType>} props.value - El valor del tipo de disco duro.
	 * @param {Primitives<ComputerHDDCapacity>} [props.hardDriveCapacity] - La capacidad del disco duro asociada.
	 * @returns {boolean} `true` si el tipo de disco duro es válido, `false` en caso contrario.
	 */	public static isValid({
		value,
		hardDriveCapacity
	}: {
		value: Primitives<ComputerHDDType>
		hardDriveCapacity?: Primitives<ComputerHDDCapacity>
	}): boolean {
		ComputerHDDType.updateError('')
		if (!hardDriveCapacity && value) {
			ComputerHDDType.updateError('Si no tiene Disco duro, no se puede especificar un tipo.')
			return false
		}
		return true
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */	public static invalidMessage(): string {
		return ComputerHDDType.errorsValue
	}
}