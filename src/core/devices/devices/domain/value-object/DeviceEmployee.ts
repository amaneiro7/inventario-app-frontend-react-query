import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { EmployeeId } from '@/core/employee/employee/domain/value-object/EmployeeId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/core/status/domain/value-object/StatusId'

export class DeviceEmployee extends AcceptedNullValueObject<Primitives<EmployeeId>> {
	private static errors = ''
	constructor(
		value: Primitives<EmployeeId> | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)
		if (!DeviceEmployee.isValid({ value: this.value, status: this.status })) {
			throw new Error(DeviceEmployee.invalidMessage())
		}
	}

	private static updateError(value: string) {
		DeviceEmployee.errors = value
	}

	private static get errorsValue(): string {
		return DeviceEmployee.errors
	}

	public static isValid({
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
			case StatusOptions.DISPONIBLE:
				if (value) {
					DeviceEmployee.errors =
						'No se le puede asignar un usuario si el dispositivo esta desincorporado, en almacén, esta por desincorporar o esta vacante/disponible.'
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

	public static invalidMessage(): string {
		return DeviceEmployee.errorsValue
	}
}
