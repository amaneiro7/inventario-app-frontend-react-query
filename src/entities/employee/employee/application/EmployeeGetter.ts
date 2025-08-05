import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeDto } from '../domain/dto/Employee.dto'
import { type EmployeeId } from '../domain/value-object/EmployeeId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * Service class for retrieving a single Employee entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type EmployeeDto using an EmployeeId primitive as the identifier.
 */
export class EmployeeGetter extends GetBaseService<Primitives<EmployeeId>, EmployeeDto> {}