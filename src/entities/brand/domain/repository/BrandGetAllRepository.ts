import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type BrandDto } from '../dto/Brand.dto'

/**
 * `BrandGetAllRepository`
 * @abstract
 * @class
 * @extends {GetAllRepository<BrandDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `Brand`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class BrandGetAllRepository extends GetAllRepository<BrandDto> {}