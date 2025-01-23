import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'

export class ComputerName extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 5
	static readonly NAME_MAX_LENGTH = 100
	private static errors = ''
	private static readonly notLowerCase = /^[^a-z]*$/
	private static readonly notSpecialCharacterOnlyGuiones =
		/^[^\W_]*-?[^\W_]*$/

	constructor(
		value: string | null,
		readonly status: (typeof StatusOptions)[keyof typeof StatusOptions]
	) {
		super(value)

		if (!ComputerName.isValid(this.value, this.status)) {
			throw new Error(ComputerName.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		this.errors = error
	}

	private static get errorsValue(): string {
		return this.errors
	}

	public static isValid(
		value: Primitives<ComputerName>,
		status: (typeof StatusOptions)[keyof typeof StatusOptions]
	): boolean {
		const allowedStatusOptions = [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (allowedStatusOptions.includes(status) && !value) {
			this.updateError(
				'El nombre de equipo no puede estar en blanco si el equipo esta en uso'
			)
			return false
		}
		const notAllowedStausOptions = [
			StatusOptions.INALMACEN,
			StatusOptions.PORDESINCORPORAR,
			StatusOptions.DESINCORPORADO
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (notAllowedStausOptions.includes(status) && value) {
			this.updateError(
				'Si el equipo no está en uso, el nombre de equipo debe quedar en blanco'
			)
			return false
		}
		if (!value) {
			return true
		}
		const errorMesagge: string[] = []
		const isHasNotSpecialCharacterOnlyGuiones =
			this.notSpecialCharacterOnlyGuiones.test(value)
		if (!isHasNotSpecialCharacterOnlyGuiones) {
			errorMesagge.push(
				'El Nombre de equipo no puede contener caracteres especiales'
			)
		}
		const isNotHasLowerCharacter = this.notLowerCase.test(value)
		if (!isNotHasLowerCharacter) {
			errorMesagge.push('El Nombre de equipo debe estar en mayúsculas')
		}
		const isNameValidLength =
			value.length >= this.NAME_MIN_LENGTH &&
			value.length <= this.NAME_MAX_LENGTH
		if (!isNameValidLength) {
			errorMesagge.push(
				`El Nombre de equipo debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`
			)
		}
		this.updateError(errorMesagge.join(' '))
		return (
			isHasNotSpecialCharacterOnlyGuiones &&
			isNotHasLowerCharacter &&
			isNameValidLength
		)
	}

	public static invalidMessage(): string {
		return this.errorsValue
	}
}
