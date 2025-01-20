import { StringValueObject } from "@/core/shared/domain/value-objects/StringValueObjects"

export class UserLastName extends StringValueObject {
    static readonly NAME_MIN_LENGTH = 2
    static readonly NAME_MAX_LENGTH = 30

    static readonly Regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

    private static errors = ''

    constructor(value: string) {
        super(value)
        if (!UserLastName.isValid(value)) {
            throw new Error(UserLastName.invalidMessage())
        }
    }

    private static updateErrors(value: string): void {
        UserLastName.errors = value
    }

    static get errorsValue(): string {
        return UserLastName.errors
    }

    public static isValid(value: string): boolean {
        const errors: string[] = []
        if (value.length < UserLastName.NAME_MIN_LENGTH) {
            errors.push(`El apellido del usuario debe ser mayor a ${UserLastName.NAME_MIN_LENGTH} caracteres`)
        }
        if (value.length > UserLastName.NAME_MAX_LENGTH) {
            errors.push(`El apellido del usuario debe ser menor a ${UserLastName.NAME_MAX_LENGTH} caracteres`)
        }

        if (!UserLastName.Regex.test(value)) {
            errors.push('La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto')
        }

        if (errors.length > 0) {
            UserLastName.updateErrors(errors.join(', '))
            UserLastName.invalidMessage()
            return false
        } else {
            return true
        }
    }

    public static invalidMessage(): string {
        return UserLastName.errorsValue
    }
}
