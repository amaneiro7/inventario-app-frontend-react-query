import { MemoryRamValues } from './MemoryRamValues'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'

export class MemoryRam {
	constructor(readonly value: MemoryRamValues[]) {}

	public toPrimitives(): Primitives<MemoryRamValues>[] {
		return this.value.map(memValue => memValue.value)
	}

	static fromPrimitives(
		memoryRamValues: Primitives<MemoryRamValues>[],
		status: Primitives<StatusId>
	) {
		if (!MemoryRam.isValid({ value: memoryRamValues, status })) {
			throw new Error(MemoryRam.invalidMessage())
		}
		return new MemoryRam(memoryRamValues.map(MemoryRamValues.fromValues))
	}

	public static isValid({
		value,
		status
	}: {
		value: Primitives<MemoryRamValues>[]
		status?: Primitives<StatusId>
	}): boolean {
		if (!status) {
			return true
		}

		switch (status) {
			case StatusOptions.INUSE:
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.GUARDIA:
				if (MemoryRam.isZeroTotalMemory(value) && !this.isEmpty(value)) {
					return false
				}
				break
			default:
				break
		}
		return true
	}

	public static invalidMessage(): string {
		return 'La capacidad de la memoria Ram no puede ser 0 si el equipo está en uso.'
	}

	private static isEmpty(value?: Primitives<MemoryRamValues>[] | null): boolean {
		return !value || value.length === 0
	}

	static totalAmount(value: Primitives<MemoryRamValues>[]): number {
		return value.reduce((acc, val) => acc + Number(val), 0)
	}

	public static isZeroTotalMemory(value: Primitives<MemoryRamValues>[]): boolean {
		return this.totalAmount(value) === 0
	}
}
