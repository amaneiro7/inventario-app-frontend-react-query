import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import type { ComputerCountBrandDashboardDto } from '../dto/ComputerCountBrandDashboard'

/**
 * @abstract
 * @class ComputerCountBrandDashboardRepository
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener datos del dashboard de computadoras.
 */
export abstract class ComputerCountBrandDashboardRepository extends GetAllRepository<ComputerCountBrandDashboardDto> {}
