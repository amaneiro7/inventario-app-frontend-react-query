import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type OperatingSystemDto } from '../dto/OperatingSystem.dto'

/**
 * @abstract
 * @class OperatingSystemGetAllRepository
 * @extends {GetAllRepository<OperatingSystemDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todos los sistemas operativos.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class OperatingSystemGetAllRepository extends GetAllRepository<OperatingSystemDto> {}
