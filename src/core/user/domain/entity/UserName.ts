import { StringValueObject } from "@/core/shared/domain/value-objects/StringValueObjects"

export class UserName extends StringValueObject {
    static readonly NAME_MIN_LENGTH = 3
    static readonly NAME_MAX_LENGTH = 30
    static readonly Regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/
    private static errors: string = ''

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
        const errors: string[] = []
        if (value.length < UserName.NAME_MIN_LENGTH) {
            errors.push(`El nombre de usuario debe ser mayor a ${UserName.NAME_MIN_LENGTH}`)
        }
        if (value.length > UserName.NAME_MAX_LENGTH) {
            errors.push(`El nombre de usuario debe ser menor a ${UserName.NAME_MAX_LENGTH}`)
        }

        if (!UserName.Regex.test(value)) {
            errors.push(`La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto`)
        }

        if (errors.length > 0) {
            UserName.updateErrors(errors.join(' '))
            UserName.invalidMessage()
            return false
        } else {
            return true
        }
    }

    public static invalidMessage(): string {
        return UserName.errorsValue
    }
}
