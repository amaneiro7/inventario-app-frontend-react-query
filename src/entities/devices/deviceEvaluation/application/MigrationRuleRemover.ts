import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MigrationRuleId } from '../domain/value-object/MigrationRuleId'
import { DeleteBaseService } from '@/entities/shared/domain/methods/remover.abstract'

/**
 * `MigrationRuleRemover`
 * @class
 * @extends {DeleteBaseService<Primitives<MigrationRuleId>, void>}
 * @description Servicio de aplicación para eliminar una entidad `MigrationRule` por su ID.
 * Extiende de `DeleteBaseService` para reutilizar la lógica común de eliminación por ID.
 */
export class MigrationRuleRemover extends DeleteBaseService<Primitives<MigrationRuleId>, void> {}
