import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeePrimitives } from '../dto/Employee.dto'
import { type EmployeeId } from '../value-object/EmployeeId'

export abstract class EmployeeSaveRepository extends SaveRepository<
	Primitives<EmployeeId>,
	EmployeePrimitives
> {}
