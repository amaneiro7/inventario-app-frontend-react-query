import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'

export class ComputerName extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 5
	static readonly NAME_MAX_LENGTH = 100

	private static errors = ''

	// REGEX CORREGIDO: Acepta letras, números y guiones (múltiples veces)
	private static readonly ALLOWED_FORMAT = /^[A-Z0-9-]+$/
	private static readonly NO_LOWERCASE = /^[^a-z]*$/

	constructor(
		value: string | null,
		readonly status: Primitives<StatusId>
	) {
		super(value ? value.toUpperCase().trim() : null) // Auto-formateo

		if (!ComputerName.isValid({ value: this.value, status: this.status })) {
			throw new Error(ComputerName.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		this.errors = error
	}

	public static isValid({
		value,
		status
	}: {
		value: string | null
		status?: Primitives<StatusId>
	}): boolean {
		this.updateError('')
		if (!status) return true

		// 1. Agrupar estados por lógica de negocio para limpieza visual
		const statusInUse = [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.JORNADA,
			StatusOptions.GUARDIA
		]

		const statusInStorage = [
			StatusOptions.INALMACEN,
			StatusOptions.PORDESINCORPORAR,
			StatusOptions.DESINCORPORADO
		]

		// 2. Validaciones de Estado vs Valor
		if (statusInUse.includes(status as any) && !value) {
			this.updateError('El nombre de equipo es requerido cuando el equipo está en uso.')
			return false
		}

		if (statusInStorage.includes(status as any) && value) {
			this.updateError(
				'Si el equipo está en almacén o desincorporado, el nombre debe quedar vacío.'
			)
			return false
		}

		// Si no hay valor y pasó las reglas de estado anteriores, es válido (null/empty permitido)
		if (!value) return true

		// 3. Validaciones de Formato técnico
		const errorMessages: string[] = []

		if (!this.ALLOWED_FORMAT.test(value)) {
			errorMessages.push('Solo se permiten letras, números y guiones.')
		}

		if (!this.NO_LOWERCASE.test(value)) {
			errorMessages.push('Debe estar en mayúsculas.')
		}

		if (value.length < this.NAME_MIN_LENGTH || value.length > this.NAME_MAX_LENGTH) {
			errorMessages.push(
				`Debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres.`
			)
		}

		if (errorMessages.length > 0) {
			this.updateError(errorMessages.join(' '))
			return false
		}

		return true
	}

	public static invalidMessage(): string {
		return this.errors || 'Nombre de equipo inválido'
	}
}
