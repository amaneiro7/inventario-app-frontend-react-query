import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { OperatingSystemArqDto } from '../dto/OperatingSystemArq.dto'

/**
 * @abstract
 * @class OperatingSystemArqGetAllRepository
 * @extends {GetAllRepository<OperatingSystemArqDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `OperatingSystemArq`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class OperatingSystemArqGetAllRepository extends GetAllRepository<OperatingSystemArqDto> {}
