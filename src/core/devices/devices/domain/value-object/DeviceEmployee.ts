import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { EmployeeId } from '@/core/employee/employee/domain/value-object/EmployeeId'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'

export class DeviceEmployee extends AcceptedNullValueObject<
	Primitives<EmployeeId>
> {
	private static errors = ''
	constructor(
		value: Primitives<EmployeeId> | null,
		private readonly status: (typeof StatusOptions)[keyof typeof StatusOptions]
	) {
		super(value)
		if (!DeviceEmployee.isValid(this.value, this.status)) {
			throw new Error(DeviceEmployee.invalidMessage())
		}
	}

	private static updateError(value: string) {
		DeviceEmployee.errors = value
	}

	private static get errorsValue(): string {
		return DeviceEmployee.errors
	}

	public static isValid(
		value: Primitives<DeviceEmployee>,
		status: (typeof StatusOptions)[keyof typeof StatusOptions]
	): boolean {
		const allowedStausValues = [
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (allowedStausValues.includes(status) && !value) {
			DeviceEmployee.errors =
				'Si el dispositivo esta a préstamo, en contingencia o guardia debe estar asignado a un usuario'
			return false
		}
		const notAllowedStausValues = [
			StatusOptions.DESINCORPORADO,
			StatusOptions.INALMACEN,
			StatusOptions.PORDESINCORPORAR,
			StatusOptions.DISPONIBLE
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (notAllowedStausValues.includes(status) && value) {
			DeviceEmployee.errors =
				'No se le puede asignar un usuario si el dispositivo esta desincorporado, en almacén, esta por desincorporar o esta vacante/disponible'
			return false
		}
		if (!value) return true
		const employeeId = new EmployeeId(value)
		if (!(employeeId instanceof EmployeeId)) {
			DeviceEmployee.updateError(
				'El id del empleado proporcionado no es válido'
			)
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return DeviceEmployee.errorsValue
	}
}
