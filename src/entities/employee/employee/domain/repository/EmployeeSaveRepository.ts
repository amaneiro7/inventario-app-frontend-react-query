import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeePrimitives } from '../dto/Employee.dto'
import { type EmployeeId } from '../value-object/EmployeeId'

export abstract class EmployeeSaveRepository extends SaveRepository<
	Primitives<EmployeeId>,
	EmployeePrimitives
> {}
