import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeDto } from '../domain/dto/Employee.dto'
import { type EmployeeId } from '../domain/value-object/EmployeeId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class EmployeeGetter extends GetBaseService<Primitives<EmployeeId>, EmployeeDto> {}
