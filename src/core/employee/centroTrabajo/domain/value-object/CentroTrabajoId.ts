import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class CentroTrabajoId extends StringValueObject {
  static readonly NAME_MIN_LENGTH = 1
  static readonly NAME_MAX_LENGTH = 4
  static readonly regex = /^\d+$/

  private static error = ''

  constructor(value: string) {
    super(value)
    if (!CentroTrabajoId.isValid(value)) {
      throw new Error(CentroTrabajoId.invalidMessage())
    }
  }

  public static isValid(value: string): boolean {
    const errors: string[] = []
    const validFormat = CentroTrabajoId.regex.test(value)
    if (!validFormat) {
      errors.push('El código del centro de Trabajo debe ser numérico.')
    }
    const validLength =
      value.length >= CentroTrabajoId.NAME_MIN_LENGTH &&
      value.length <= CentroTrabajoId.NAME_MAX_LENGTH
    if (!validLength) {
      errors.push(
        `${value} no es un nombre válido. Debe tener entre ${CentroTrabajoId.NAME_MIN_LENGTH} y ${CentroTrabajoId.NAME_MAX_LENGTH} caracteres`
      )
    }
    if (validFormat && validLength) {
      return true
    } else {
      CentroTrabajoId.error = errors.join(' ')
      return false
    }
  }

  public static invalidMessage(): string {
    return CentroTrabajoId.error
  }
}
