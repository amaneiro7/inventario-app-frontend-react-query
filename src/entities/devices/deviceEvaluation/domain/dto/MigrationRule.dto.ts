import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import type { MigrationRuleId } from '../value-object/MigrationRuleId'
import type { MigrationRuleMinRamGb } from '../value-object/MigrationRuleMinRamGb'
import type { MigrationRuleMinDiskGb } from '../value-object/MigrationRuleMinDiskGb'
import type { MigrationRuleIsActive } from '../value-object/MigrationRuleIsActive'
import type { ProcessorId } from '@/entities/devices/features/processor/domain/value-object/ProcessorId'
import type { ProcessorDto } from '@/entities/devices/features/processor/domain/dto/Processor.dto'

/**
 * Represents the core properties of a MigrationRule entity.
 */
export interface MigrationRule {
	id: Primitives<MigrationRuleId>
	minRamGb: Primitives<MigrationRuleMinRamGb>
	minDiskGb: Primitives<MigrationRuleMinDiskGb>
	isActive: Primitives<MigrationRuleIsActive>
}

export interface EvaluationResult {
	isApto: boolean
	reasons: string[]
}

/**
 * Represents the primitive properties of a MigrationRule entity, excluding the ID but including associated unit IDs.
 */
export type MigrationRulePrimitives = Omit<MigrationRule, 'id'> & {
	approvedProcessor: Primitives<ProcessorId>[]
}

/**
 * Represents the parameters used for creating or updating a MigrationRule entity.
 * It includes all primitive properties and an optional ID for update operations.
 */
export type MigrationRuleParams = MigrationRulePrimitives & {
	id?: Primitives<MigrationRuleId>
	approvedProcessor: Primitives<ProcessorId>[]
}

/**
 * Represents the Data Transfer Object (DTO) for a MigrationRule entity, including full Unit details and update timestamp.
 */
export type MigrationRuleDto = MigrationRule & {
	approvedProcessor: ProcessorDto[]
	updatedAt: string
}
