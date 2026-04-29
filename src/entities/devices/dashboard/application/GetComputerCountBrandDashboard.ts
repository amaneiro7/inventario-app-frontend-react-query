import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import type { ComputerCountBrandDashboardDto } from '../domain/dto/ComputerCountBrandDashboard'

/**
 * @class GetComputerCountBrandDashboard
 * @description Application service to retrieve computerCountBrand dashboard data.
 */
export class GetComputerCountBrandDashboard extends GetAllBaseService<ComputerCountBrandDashboardDto> {}
