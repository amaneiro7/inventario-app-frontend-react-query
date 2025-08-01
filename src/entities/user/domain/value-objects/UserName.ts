import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class UserName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 30
	private static readonly Regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/
	private static errors = ''

	constructor(value: string) {
		super(value)
		if (!UserName.isValid(value)) {
			throw new Error(UserName.invalidMessage())
		}
	}

	private static updateErrors(value: string): void {
		UserName.errors = value
	}

	static get errorsValue(): string {
		return UserName.errors
	}

	public static isValid(value: string): boolean {
		const errorMessage: string[] = []
		if (value.length < UserName.NAME_MIN_LENGTH) {
			errorMessage.push(`El nombre de usuario debe ser mayor a ${UserName.NAME_MIN_LENGTH}`)
		}
		if (value.length > UserName.NAME_MAX_LENGTH) {
			errorMessage.push(`El nombre de usuario debe ser menor a ${UserName.NAME_MAX_LENGTH}`)
		}

		if (!UserName.Regex.test(value)) {
			errorMessage.push(
				`La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto`
			)
		}
		this.updateErrors(errorMessage.join(' '))
		return (
			errorMessage.length <= 0 // Si el array de errores esta vacio significa que no hay errores y el username es valido
		)
	}

	public static invalidMessage(): string {
		return UserName.errorsValue
	}
}
