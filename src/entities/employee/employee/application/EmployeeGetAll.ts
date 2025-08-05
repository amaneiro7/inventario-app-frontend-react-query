import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type EmployeeDto } from '../domain/dto/Employee.dto'

/**
 * Service class for retrieving all Employee entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type EmployeeDto.
 */
export class EmployeeGetAll extends GetAllBaseService<EmployeeDto> {}