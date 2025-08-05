import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type BrandDto } from '../domain/dto/Brand.dto'
import { type BrandId } from '../domain/value-object/BrandId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * `BrandGetter`
 * @class
 * @extends {GetBaseService<Primitives<BrandId>, BrandDto>}
 * @description Servicio de aplicación para obtener una entidad `Brand` por su ID.
 * Extiende de `GetBaseService` para reutilizar la lógica común de obtención por ID.
 */
export class BrandGetter extends GetBaseService<Primitives<BrandId>, BrandDto> {}