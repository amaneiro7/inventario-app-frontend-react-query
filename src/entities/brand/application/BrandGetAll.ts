import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type BrandDto } from '../domain/dto/Brand.dto'

/**
 * `BrandGetAll`
 * @class
 * @extends {GetAllBaseService<BrandDto>}
 * @description Servicio de aplicación para obtener todas las entidades `Brand`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class BrandGetAll extends GetAllBaseService<BrandDto> {}
