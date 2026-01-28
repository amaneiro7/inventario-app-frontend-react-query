import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { HardDriveTypeDto } from '../dto/HardDriveType.dto'

/**
 * @abstract
 * @class HardDriveTypeGetAllRepository
 * @extends {GetAllRepository<HardDriveTypeDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todos los tipos de disco duro.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class HardDriveTypeGetAllRepository extends GetAllRepository<HardDriveTypeDto> {}
