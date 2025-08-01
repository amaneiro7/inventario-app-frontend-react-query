import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type EmployeeDto } from '../dto/Employee.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeId } from '../value-object/EmployeeId'

export abstract class EmployeeGetRepository extends GetRepository<
	Primitives<EmployeeId>,
	EmployeeDto
> {}
