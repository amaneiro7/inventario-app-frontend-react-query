import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type EmployeeDto } from '../dto/Employee.dto'

export abstract class EmployeeGetAllRepository extends GetAllRepository<EmployeeDto> {}
