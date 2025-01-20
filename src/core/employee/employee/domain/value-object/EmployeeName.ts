import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class EmployeeName extends StringValueObject {
  static readonly NAME_MIN_LENGTH = 3
  static readonly NAME_MAX_LENGTH = 100
  static readonly regex =
    /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

  private static error = ''

  constructor(value: string) {
    super(value)
    if (!EmployeeName.isValid(value)) {
      throw new Error(EmployeeName.invalidMessage())
    }
  }

  public static isValid(value: string): boolean {
    const errors: string[] = []
    const validFormat = EmployeeName.regex.test(value)
    if (!validFormat) {
      errors.push(
        'La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto.'
      )
    }
    const validLength =
      value.length >= EmployeeName.NAME_MIN_LENGTH &&
      value.length <= EmployeeName.NAME_MAX_LENGTH
    if (!validLength) {
      errors.push(
        `${value} no es un nombre válido. Debe tener entre ${EmployeeName.NAME_MIN_LENGTH} y ${EmployeeName.NAME_MAX_LENGTH} caracteres`
      )
    }
    if (validFormat && validLength) {
      return true
    } else {
      EmployeeName.error = errors.join(' ')
      return false
    }
  }

  public static invalidMessage(): string {
    return EmployeeName.error
  }
}
