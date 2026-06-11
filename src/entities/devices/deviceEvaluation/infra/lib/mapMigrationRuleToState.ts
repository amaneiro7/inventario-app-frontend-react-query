import type { MigrationRuleDto } from '../../domain/dto/MigrationRule.dto'
import type { DefaultMigrationRule } from '../reducers/migrationRuleFormReducer'

/**
 * Mapea un objeto `MigrationRuleDto` a la estructura `DefaultMigrationRule` para el estado del formulario.
 * @param {MigrationRuleDto} MigrationRule - El objeto `MigrationRuleDto` a mapear.
 */
export const mapMigrationRuleToState = (data: MigrationRuleDto): DefaultMigrationRule => {
	const approvedProcessors = data?.approvedProcessors.map(p => p.id)
	return {
		id: data.id,
		minRamGb: data.minRamGb,
		minDiskGb: data.minDiskGb,
		isActive: data.isActive,
		approvedProcessors,
		updatedAt: data?.updatedAt
	}
}
