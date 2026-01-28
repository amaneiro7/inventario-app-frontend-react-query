import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type BrandDto } from '../dto/Brand.dto'
import { type BrandId } from '../value-object/BrandId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `BrandGetRepository`
 * @abstract
 * @class
 * @extends {GetRepository<Primitives<BrandId>, BrandDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener una entidad `Brand` por su ID.
 * Define el método `getById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class BrandGetRepository extends GetRepository<Primitives<BrandId>, BrandDto> {}
