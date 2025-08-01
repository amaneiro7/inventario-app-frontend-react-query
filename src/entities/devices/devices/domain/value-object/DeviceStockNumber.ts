import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'

export class DeviceStockNumber extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 2
	static readonly NAME_MAX_LENGTH = 10
	static errors = ''

	constructor(
		value: string | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)
		if (!DeviceStockNumber.isValid({ value: this.value, status: this.status })) {
			throw new Error(DeviceStockNumber.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		this.errors = error
	}

	private static get errorsValue(): string {
		return this.errors
	}

	public static isValid({
		value,
		status
	}: {
		value: string | null
		status?: Primitives<StatusId>
	}): boolean {
		DeviceStockNumber.updateError('') // Limpia errores previos

		if (!value) return true // No hay validaciones si el valor es nulo o vacio

		switch (status) {
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
				break
			default:
				DeviceStockNumber.errors =
					'Si no está en almacén no se le puede agregar un numero de stock.'
				return false
		}

		const isNameValidLength =
			value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
		if (!isNameValidLength) {
			DeviceStockNumber.updateError(
				`El Número de stock debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres.`
			)
		}
		return true
	}

	public static invalidMessage(): string {
		return this.errorsValue
	}
}
