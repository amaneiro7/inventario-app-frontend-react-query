import { Employee } from '../domain/entity/Employee'
import { EmployeeId } from '../domain/value-object/EmployeeId'
import { EmployeeTypes } from '../domain/value-object/EmployeeType'
import { RegularEmployee } from '../domain/entity/RegularEmployee'
import { GenericEmployee } from '../domain/entity/GenericEmployee'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type EmployeeSaveRepository } from '../domain/repository/EmployeeSaveRepository'
import { type Params } from '../domain/dto/Employee.dto'

export class EmployeeCreator {
	constructor(
		readonly repository: EmployeeSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: Params) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			let employee: Employee | RegularEmployee | GenericEmployee
			switch (params.type) {
				case EmployeeTypes.REGULAR:
					employee = RegularEmployee.create(params)
					break
				case EmployeeTypes.GENERIC:
					employee = GenericEmployee.create(params)
					break
				default:
					employee = Employee.create(params)
			}

			// Crea el payload del modelo.
			const payload = employee.toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new EmployeeId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw new Error(errorMessage)
		}
	}
}
