import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

enum AreaCode {
	CARACAS = '0212',
	VALENCIA = '0241',
	MARACAY = '0243',
	BARCELONA = '0281',
	CIUDADBOLIVAR = '0285',
	MARACAIBO = '0261',
	BARINAS = '0273',
	BARQUISIMETO = '0251',
	MERIDA = '0274',
	PUERTOLACRUZ = '0281',
	SANCRISTOBAL = '0273',
	CIUDADGUAYANA = '0285',
	GUARENAS = '0212',
	GUATIRE = '0212',
	LOSTEQUES = '0212',
	LAGUAIRA = '0212',
	NAGUANAGUA = '0241',
	TOCUYITO = '0241',
	GUACARA = '0242',
	GUANARE = '0272',
	CIUDADOJEDA = '0263',
	CORO = '0257',
	PUNTOFIJO = '0263',
	SANFELIPE = '0257',
	BARUTA = '0212',
	CHACAO = '0212',
	CATIALAMAR = '0212',
	LOSGUAYOS = '0241',
	COJEDES = '0249',
	TINAQUILLO = '0258',
	SANCARLOS = '0249',
	TUCUPITA = '0248'
}

export class EmployeeExtension extends StringValueObject {
	private static readonly areaCodes = Object.values(AreaCode)
	private static readonly numberLenght = 7
	private static readonly extension = `^(${this.areaCodes.join('|')})\\d{${this.numberLenght}}$`
	private static readonly phoneRegex = new RegExp(this.extension)
	private static error = ''

	constructor(value: string) {
		super(value)

		if (EmployeeExtension.isValid(value)) {
			throw new InvalidArgumentError(EmployeeExtension.invalidMessage())
		}
	}
	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = this.phoneRegex.test(value)
		if (!validFormat) {
			errors.push(`${value} no es un número de teléfono válido.`)
		}

		if (validFormat) {
			return true
		} else {
			this.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return EmployeeExtension.error
	}
}
