import { Employee } from '../domain/entity/Employee'
import { EmployeeId } from '../domain/value-object/EmployeeId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type EmployeeSaveRepository } from '../domain/repository/EmployeeSaveRepository'
import { type RegularEmployeePrimitives } from '../domain/dto/RegularEmployee.dto'
import { type GenericEmployeePrimitives } from '../domain/dto/GenericEmployee.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { EmployeeTypes } from '../domain/value-object/EmployeeType'
import { RegularEmployee } from '../domain/entity/RegularEmployee'
import { GenericEmployee } from '../domain/entity/GenericEmployee'

type Params = RegularEmployeePrimitives | GenericEmployeePrimitives
export class EmployeeCreator {
	constructor(
		readonly repository: EmployeeSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: Params & { id: Primitives<EmployeeId> }) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			let EmployeeClass: typeof Employee
			switch (params.type) {
				case EmployeeTypes.REGULAR:
					EmployeeClass = RegularEmployee
					break
				case EmployeeTypes.GENERIC:
					EmployeeClass = GenericEmployee
					break
				default:
					EmployeeClass = Employee
			}

			// Crea el payload del modelo.
			const payload = EmployeeClass.create(params).toPrimitives()
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
