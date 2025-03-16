import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/core/status/domain/value-object/StatusId'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'

export class ComputerName extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 5
	static readonly NAME_MAX_LENGTH = 100
	private static errors = ''
	private static readonly notLowerCase = /^[^a-z]*$/
	private static readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/

	constructor(value: string | null, readonly status: Primitives<StatusId>) {
		super(value)

		if (!ComputerName.isValid({ value: this.value, status: this.status })) {
			throw new Error(ComputerName.invalidMessage())
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
		value: Primitives<ComputerName>
		status?: Primitives<StatusId>
	}): boolean {
		ComputerName.updateError('')
		if (!status) return true
		switch (status) {
			case StatusOptions.INUSE:
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.GUARDIA:
				if (!value) {
					this.updateError(
						'El nombre de equipo no puede estar en blanco si el equipo esta en uso'
					)
					return false
				}
				break
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
			case StatusOptions.DESINCORPORADO:
				if (value) {
					this.updateError(
						'Si el equipo no está en uso, el nombre de equipo debe quedar en blanco'
					)
					return false
				}
				break
			default:
				break
		}
		if (!value) {
			return true
		}
		const errorMesagge: string[] = []
		const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(value)
		if (!isHasNotSpecialCharacterOnlyGuiones) {
			errorMesagge.push('El Nombre de equipo no puede contener caracteres especiales.')
		}
		const isNotHasLowerCharacter = this.notLowerCase.test(value)
		if (!isNotHasLowerCharacter) {
			errorMesagge.push('El Nombre de equipo debe estar en mayúsculas.')
		}
		const isNameValidLength =
			value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
		if (!isNameValidLength) {
			errorMesagge.push(
				`El Nombre de equipo debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres.`
			)
		}
		this.updateError(errorMesagge.join(' '))
		return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
	}

	public static invalidMessage(): string {
		return this.errorsValue
	}
}
