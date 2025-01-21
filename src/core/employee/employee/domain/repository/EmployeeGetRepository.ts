import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type EmployeeDto } from '../dto/Employee.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeId } from '../value-object/EmployeeId'

export abstract class EmployeeGetRepository extends GetRepository<
	Primitives<EmployeeId>,
	EmployeeDto
> {}
