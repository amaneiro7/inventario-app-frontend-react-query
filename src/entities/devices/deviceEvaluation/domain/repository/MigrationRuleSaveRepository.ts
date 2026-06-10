import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MigrationRulePrimitives } from '../dto/MigrationRule.dto'
import { type MigrationRuleId } from '../value-object/MigrationRuleId'

/**
 * Abstract class for a repository that provides methods for saving (creating and updating) MigrationRule entities.
 * It extends the generic `SaveRepository` with `Primitives<MigrationRuleId>` as the ID type and `MigrationRulePrimitives` as the entity type.
 */
export abstract class MigrationRuleSaveRepository extends SaveRepository<
	Primitives<MigrationRuleId>,
	MigrationRulePrimitives
> {}
