import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type MigrationRuleDto } from '../dto/MigrationRule.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all MigrationRule entities.
 * It extends the generic `GetAllRepository` with `MigrationRuleDto` as the type parameter.
 */
export abstract class MigrationRuleGetAllRepository extends GetAllRepository<MigrationRuleDto> {}
