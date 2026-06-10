import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MigrationRuleDto } from '../domain/dto/MigrationRule.dto'
import { type MigrationRuleId } from '../domain/value-object/MigrationRuleId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * `MigrationRuleGetter`
 * @class
 * @extends {GetBaseService<Primitives<MigrationRuleId>, MigrationRuleDto>}
 * @description Servicio de aplicación para obtener una entidad `MigrationRule` por su ID.
 * Extiende de `GetBaseService` para reutilizar la lógica común de obtención por ID.
 */
export class MigrationRuleGetter extends GetBaseService<
	Primitives<MigrationRuleId>,
	MigrationRuleDto
> {}
