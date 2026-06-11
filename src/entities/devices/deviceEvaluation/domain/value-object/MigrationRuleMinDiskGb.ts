import { NumberValueObject } from '@/entities/shared/domain/value-objects/NumberValueObject'

export class MigrationRuleMinDiskGb extends NumberValueObject {
	static readonly MIN = 1
	static readonly MAX = 4096

	constructor(value: number) {
		super(value)
		if (!MigrationRuleMinDiskGb.isValid(this.value)) {
			throw new Error(MigrationRuleMinDiskGb.invalidMessage(this.value))
		}
	}

	public static isValid(value: number): boolean {
		return value >= MigrationRuleMinDiskGb.MIN && value <= MigrationRuleMinDiskGb.MAX
	}

	public static invalidMessage(value: number): string {
		return `El espacio en disco de ${value}GB no es válido. Debe estar entre ${MigrationRuleMinDiskGb.MIN} y ${MigrationRuleMinDiskGb.MAX} GB`
	}
}
