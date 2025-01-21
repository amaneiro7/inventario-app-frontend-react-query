import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type EmployeeDto } from '../domain/dto/Employee.dto'

export class EmployeeGetAll extends GetAllBaseService<EmployeeDto> {}
