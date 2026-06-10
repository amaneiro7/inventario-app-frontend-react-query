import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type MigrationRuleDto } from '../domain/dto/MigrationRule.dto'

/**
 * `MigrationRuleGetAll`
 * @class
 * @extends {GetAllBaseService<MigrationRuleDto>}
 * @description Servicio de aplicación para obtener todas las entidades `MigrationRule`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class MigrationRuleGetAll extends GetAllBaseService<MigrationRuleDto> {}
