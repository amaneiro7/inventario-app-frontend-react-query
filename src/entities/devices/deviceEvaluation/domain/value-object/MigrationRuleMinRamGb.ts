import { NumberValueObject } from '@/entities/shared/domain/value-objects/NumberValueObject'

export class MigrationRuleMinRamGb extends NumberValueObject {
	static readonly MIN = 1
	static readonly MAX = 128

	constructor(value: number) {
		super(value)
		if (!MigrationRuleMinRamGb.isValid(value)) {
			throw new Error(MigrationRuleMinRamGb.invalidMessage(value))
		}
	}

	public static isValid(value: number): boolean {
		return value >= MigrationRuleMinRamGb.MIN && value <= MigrationRuleMinRamGb.MAX
	}

	public static invalidMessage(value: number): string {
		return `La memoria RAM de ${value}GB no es válida. Debe estar entre ${MigrationRuleMinRamGb.MIN} y ${MigrationRuleMinRamGb.MAX} GB`
	}
}
