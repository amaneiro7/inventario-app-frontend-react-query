import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { EmployeeId } from '@/entities/employee/employee/domain/value-object/EmployeeId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'

/**
 * @class DeviceEmployee
 * @extends {AcceptedNullValueObject<Primitives<EmployeeId>>}
 * @description Value Object que representa el empleado asignado a un dispositivo.
 * Incluye lógica de validación basada en el estado del dispositivo.
 */
export class DeviceEmployee extends AcceptedNullValueObject<Primitives<EmployeeId>> {
	private static errors = ''

	/**
	 * Crea una instancia de `DeviceEmployee`.
	 * @param {Primitives<EmployeeId> | null} value - El ID del empleado asignado.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */ constructor(
		value: Primitives<EmployeeId> | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)
		if (!DeviceEmployee.isValid({ value: this.value, status: this.status })) {
			throw new Error(DeviceEmployee.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} value - El mensaje de error a establecer.
	 */ private static updateError(value: string) {
		DeviceEmployee.errors = value
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */ private static get errorsValue(): string {
		return DeviceEmployee.errors
	}

	/**
	 * Valida el empleado asignado en función del estado del dispositivo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<DeviceEmployee>} props.value - El ID del empleado a validar.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @returns {boolean} `true` si el empleado es válido, `false` en caso contrario.
	 */ public static isValid({
		status,
		value
	}: {
		value: Primitives<DeviceEmployee>
		status?: Primitives<StatusId>
	}): boolean {
		DeviceEmployee.updateError('') // Limpia errores previos
		if (!status) return true
		switch (status) {
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.GUARDIA:
				if (!value) {
					DeviceEmployee.errors =
						'Si el dispositivo esta a préstamo, en contingencia o guardia debe estar asignado a un usuario.'
					return false
				}
				break
			case StatusOptions.DESINCORPORADO:
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
			case StatusOptions.JORNADA:
			case StatusOptions.DISPONIBLE:
				if (value) {
					DeviceEmployee.errors =
						'No se le puede asignar un usuario si el dispositivo esta desincorporado, en almacén, esta por desincorporar, esta asignado para jorndas móviles o esta vacante/disponible.'
					return false
				}
				break
			default:
				break
		}
		if (!value) return true

		try {
			new EmployeeId(value)
			return true
		} catch {
			DeviceEmployee.updateError('El id del empleado proporcionado no es válido.')
			return false
		}
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return DeviceEmployee.errorsValue
	}
}
