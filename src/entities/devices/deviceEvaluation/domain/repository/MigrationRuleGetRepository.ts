import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type MigrationRuleDto } from '../dto/MigrationRule.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MigrationRuleId } from '../value-object/MigrationRuleId'

/**
 * Abstract class for a repository that provides methods for retrieving a single MigrationRule entity.
 * It extends the generic `GetRepository` with `Primitives<MigrationRuleId>` as the ID type and `MigrationRuleDto` as the entity type.
 */
export abstract class MigrationRuleGetRepository extends GetRepository<
	Primitives<MigrationRuleId>,
	MigrationRuleDto
> {}
