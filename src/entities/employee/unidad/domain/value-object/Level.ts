import { NumberValueObject } from '@/entities/shared/domain/value-objects/NumberValueObject'

export class Level extends NumberValueObject {
	static readonly MIN_LEVEL = 1
	static readonly MAX_LEVEL = 8
	private static errors = ''

	constructor(value: number) {
		super(value)
		if (!Level.isValid({ value })) {
			throw new Error(Level.invalidMessage())
		}
	}

	private static get errorsValue(): string {
		return Level.errors
	}

	private static updateError(error: string): void {
		Level.errors = error
	}

	/**
	 * Valida el nivel de la unidad.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {number} props.value - El valor del nivel a validar.
	 * @param {number} [props.parentLevel] - El nivel del padre, si existe.
	 * @returns {boolean} `true` si el nivel es válido, `false` en caso contrario.
	 */
	public static isValid({
		value,
		parentLevel
	}: {
		value: number
		parentLevel?: number
	}): boolean {
		Level.updateError('') // Limpia errores previos al inicio de la validación

		// 1. Validar que el nivel esté dentro del rango permitido
		const isValueWithinRange = value >= Level.MIN_LEVEL && value <= Level.MAX_LEVEL
		if (!isValueWithinRange) {
			Level.updateError(`El nivel debe estar entre ${Level.MIN_LEVEL} y ${Level.MAX_LEVEL}.`)
			return false
		}

		// 2. Validar la relación con el nivel del padre si se proporciona
		if (parentLevel !== undefined && parentLevel !== null) {
			// La lógica es que el nivel del padre debe ser estrictamente menor que el nivel actual
			if (parentLevel > value) {
				Level.updateError(
					'El nivel del padre debe ser estrictamente menor que el nivel actual.'
				)
				return false
			}
		}

		return true
	}

	public static invalidMessage(): string {
		return Level.errorsValue
	}
}
