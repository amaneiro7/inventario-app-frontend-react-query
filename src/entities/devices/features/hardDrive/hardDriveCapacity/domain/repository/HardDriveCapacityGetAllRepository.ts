import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type HardDriveCapacityDto } from '../dto/HardDriveCapacity.dto'

/**
 * @abstract
 * @class HardDriveCapacityGetAllRepository
 * @extends {GetAllRepository<HardDriveCapacityDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `HardDriveCapacity`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class HardDriveCapacityGetAllRepository extends GetAllRepository<HardDriveCapacityDto> {}
