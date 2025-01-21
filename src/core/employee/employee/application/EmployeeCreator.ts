import { Employee } from '../domain/entity/Employee'
import { EmployeeId } from '../domain/value-object/EmployeeId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type EmployeeSaveRepository } from '../domain/repository/EmployeeSaveRepository'
import { type RegularEmployeePrimitives } from '../domain/dto/RegularEmployee.dto'
import { type GenericEmployeePrimitives } from '../domain/dto/GenericEmployee.dto'
import { EmployeeTypes } from '../domain/value-object/EmployeeType'
import { RegularEmployee } from '../domain/entity/RegularEmployee'
import { GenericEmployee } from '../domain/entity/GenericEmployee'
import { Primitives } from '@/core/shared/domain/value-objects/Primitives'

type Params = RegularEmployeePrimitives | GenericEmployeePrimitives
export class EmployeeCreator {
	constructor(
		readonly repository: EmployeeSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: Params & { id: Primitives<EmployeeId> }) {
		try {
			let payload
			if (params.type === EmployeeTypes.REGULAR) {
				payload = RegularEmployee.create(params).toPrimitives()
			} else if (params.type === EmployeeTypes.GENERIC) {
				payload = GenericEmployee.create(params).toPrimitives()
			} else {
				payload = Employee.create(params).toPrimitives()
			}
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new EmployeeId(params.id).value
				return await this.repository
					.update({ id, payload })
					.then(res => {
						this.events.notify({
							type: 'success',
							message: res.message
						})
						return res
					})
			}
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}
