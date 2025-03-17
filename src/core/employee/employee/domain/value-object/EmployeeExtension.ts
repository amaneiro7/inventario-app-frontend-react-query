import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export const codigosAreaVenezuela = [
	{ ciudad: 'Caracas', codigo: '0212' },
	{ ciudad: 'Maracaibo', codigo: '0261' },
	{ ciudad: 'Valencia', codigo: '0241' },
	{ ciudad: 'Barquisimeto', codigo: '0251' },
	{ ciudad: 'Maracay', codigo: '0243' },
	{ ciudad: 'Ciudad Guayana', codigo: '0286' },
	{ ciudad: 'Maturín', codigo: '0291' },
	{ ciudad: 'San Cristóbal', codigo: '0276' },
	{ ciudad: 'Puerto La Cruz', codigo: '0281' },
	{ ciudad: 'Ciudad Bolívar', codigo: '0285' },
	{ ciudad: 'Barinas', codigo: '0273' },
	{ ciudad: 'Puerto Cabello', codigo: '0242' },
	{ ciudad: 'Punto Fijo', codigo: '0269' },
	{ ciudad: 'Mérida', codigo: '0274' },
	{ ciudad: 'Cabimas', codigo: '0264' },
	{ ciudad: 'Coro', codigo: '0268' },
	{ ciudad: 'Los Teques', codigo: '0212' },
	{ ciudad: 'Barcelona', codigo: '0281' },
	{ ciudad: 'Trujillo', codigo: '0272' },
	{ ciudad: 'Guanare', codigo: '0272' },
	{ ciudad: 'Acarigua', codigo: '0255' },
	{ ciudad: 'El Tigre', codigo: '0283' },
	{ ciudad: 'Upata', codigo: '0288' },
	{ ciudad: 'Guarenas', codigo: '0212' },
	{ ciudad: 'Guatire', codigo: '0212' },
	{ ciudad: 'Ocumare del Tuy', codigo: '0239' },
	{ ciudad: 'Charallave', codigo: '0239' },
	{ ciudad: 'Santa Teresa del Tuy', codigo: '0239' },
	{ ciudad: 'Cúa', codigo: '0239' },
	{ ciudad: 'Los Valles del Tuy', codigo: '0239' },
	{ ciudad: 'La Victoria', codigo: '0244' },
	{ ciudad: 'Turmero', codigo: '0244' },
	{ ciudad: 'Cagua', codigo: '0244' },
	{ ciudad: 'El Limón', codigo: '0243' },
	{ ciudad: 'Palo Negro', codigo: '0243' },
	{ ciudad: 'Santa Rita', codigo: '0264' },
	{ ciudad: 'Los Puertos de Altagracia', codigo: '0266' },
	{ ciudad: 'Cabimas', codigo: '0264' },
	{ ciudad: 'Ciudad Ojeda', codigo: '0265' },
	{ ciudad: 'Lagunillas', codigo: '0265' },
	{ ciudad: 'Santa Bárbara del Zulia', codigo: '0275' },
	{ ciudad: 'Machiques', codigo: '0263' },
	{ ciudad: 'La Fría', codigo: '0277' },
	{ ciudad: 'Colón', codigo: '0277' },
	{ ciudad: 'Táriba', codigo: '0276' },
	{ ciudad: 'Rubio', codigo: '0276' },
	{ ciudad: 'San Antonio del Táchira', codigo: '0276' },
	{ ciudad: 'El Vigía', codigo: '0275' },
	{ ciudad: 'Tovar', codigo: '0275' },
	{ ciudad: 'Ejido', codigo: '0274' },
	{ ciudad: 'El Tocuyo', codigo: '0253' },
	{ ciudad: 'Carora', codigo: '0252' },
	{ ciudad: 'Quíbor', codigo: '0253' },
	{ ciudad: 'Yaritagua', codigo: '0254' },
	{ ciudad: 'Nirgua', codigo: '0254' },
	{ ciudad: 'San Felipe', codigo: '0254' },
	{ ciudad: 'Chivacoa', codigo: '0251' },
	{ ciudad: 'Guacara', codigo: '0245' },
	{ ciudad: 'Mariara', codigo: '0243' },
	{ ciudad: 'San Joaquín', codigo: '0245' },
	{ ciudad: 'Güigüe', codigo: '0245' },
	{ ciudad: 'Tinaquillo', codigo: '0258' },
	{ ciudad: 'San Carlos', codigo: '0258' },
	{ ciudad: 'El Baúl', codigo: '0258' },
	{ ciudad: 'Valle de la Pascua', codigo: '0235' },
	{ ciudad: 'Altagracia de Orituco', codigo: '0238' },
	{ ciudad: 'San Juan de los Morros', codigo: '0246' },
	{ ciudad: 'Calabozo', codigo: '0246' },
	{ ciudad: 'Anaco', codigo: '0282' },
	{ ciudad: 'Cantaura', codigo: '0282' },
	{ ciudad: 'Pariaguán', codigo: '0283' },
	{ ciudad: 'Puerto Píritu', codigo: '0259' },
	{ ciudad: 'Clarines', codigo: '0281' },
	{ ciudad: 'Cumaná', codigo: '0293' },
	{ ciudad: 'Carúpano', codigo: '0294' },
	{ ciudad: 'Güiria', codigo: '0294' },
	{ ciudad: 'Porlamar', codigo: '0295' },
	{ ciudad: 'Juan Griego', codigo: '0295' },
	{ ciudad: 'La Asunción', codigo: '0295' },
	{ ciudad: 'Pampatar', codigo: '0295' },
	{ ciudad: 'Tucupita', codigo: '0287' },
	{ ciudad: 'Pedernales', codigo: '0287' },
	{ ciudad: 'Guasdualito', codigo: '0278' },
	{ ciudad: 'San Fernando de Apure', codigo: '0247' },
	{ ciudad: 'Achaguas', codigo: '0247' },
	{ ciudad: 'Elorza', codigo: '0240' },
	{ ciudad: 'Puerto Ayacucho', codigo: '0248' },
	{ ciudad: 'San Carlos de Río Negro', codigo: '0248' }
]

export class EmployeeExtension extends StringValueObject {
	private static readonly areaCodes = codigosAreaVenezuela.map(areaCode => areaCode.codigo)
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
		const validFormat = this.phoneRegex.test(value)
		if (!validFormat) {
			EmployeeExtension.error = `${value} no es un número de teléfono válido.`
			return false
		}

		return true
	}

	public static invalidMessage(): string {
		return EmployeeExtension.error
	}
}
