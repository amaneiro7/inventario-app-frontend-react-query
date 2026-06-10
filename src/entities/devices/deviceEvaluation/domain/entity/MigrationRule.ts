import type { MigrationRulePrimitives } from '../dto/MigrationRule.dto'
import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { MigrationRuleMinRamGb } from '../value-object/MigrationRuleMinRamGb'
import { MigrationRuleMinDiskGb } from '../value-object/MigrationRuleMinDiskGb'
import { MigrationRuleIsActive } from '../value-object/MigrationRuleIsActive'
import { ProcessorId } from '@/entities/devices/features/processor/domain/value-object/ProcessorId'

/**
 * Represents a MigrationRule entity in the domain. Encapsulates the minimum RAM, minimum disk space, active status, and a list of approved processor IDs.
 */
export class MigrationRule {
	/**
	 * Constructs a new MigrationRule instance.
	 * @param name - The name of the MigrationRule.
	 * @param unidades - An array of UnidadId objects associated with this MigrationRule.
	 * @param minRamGb - The minimum RAM in GB required for the migration rule.
	 * @param minDiskGb - The minimum disk space in GB required for the migration rule.
	 * @param isActive - The active status of the migration rule.
	 * @param approvedProcessor - An array of ProcessorId objects approved for this migration rule.
	 */
	constructor(
		private readonly minRamGb: MigrationRuleMinRamGb,
		private readonly minDiskGb: MigrationRuleMinDiskGb,
		private readonly isActive: MigrationRuleIsActive,
		private readonly approvedProcessor: ProcessorId[]
	) {}

	/**
	 * Creates a new MigrationRule instance from primitive values.
	 * @param params - The primitive values for creating a MigrationRule.
	 * @returns A new MigrationRule instance.
	 */
	public static create(params: MigrationRulePrimitives): MigrationRule {
		const approvedProcessor = params.approvedProcessor.map(id => new ProcessorId(id))
		return new MigrationRule(
			new MigrationRuleMinRamGb(params.minRamGb),
			new MigrationRuleMinDiskGb(params.minDiskGb),
			new MigrationRuleIsActive(params.isActive),
			approvedProcessor
		)
	}

	/**
	 * Gets the primitive value of the minimum RAM in GB.
	 * @returns The primitive value of the minimum RAM in GB.
	 */
	get minRamGbValue(): Primitives<MigrationRuleMinRamGb> {
		return this.minRamGb.value
	}

	/**
	 * Gets the primitive value of the minimum disk space in GB.
	 * @returns The primitive value of the minimum disk space in GB.
	 */
	get minDiskGbValue(): Primitives<MigrationRuleMinDiskGb> {
		return this.minDiskGb.value
	}

	/**
	 * Gets the primitive value of the active status.
	 * @returns The primitive value of the active status.
	 */
	get isActiveValue(): Primitives<MigrationRuleIsActive> {
		return this.isActive.value
	}

	/**
	 * Gets the primitive values of the associated department IDs.
	 */
	get approvedProcessorValue(): Primitives<ProcessorId>[] {
		return this.approvedProcessor.map(id => id.value)
	}

	/**
	 * Converts the MigrationRule entity to its primitive representation.
	 * @returns The primitive representation of the MigrationRule.
	 */
	toPrimitives(): MigrationRulePrimitives {
		return {
			minRamGb: this.minRamGbValue,
			minDiskGb: this.minDiskGbValue,
			isActive: this.isActiveValue,
			approvedProcessor: this.approvedProcessorValue
		}
	}
}
