import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { MemoryRamValues } from './MemoryRamValues'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'

export class MemoryRam {
	constructor(readonly value: MemoryRamValues[]) {}

	public toPrimitives(): Primitives<MemoryRamValues>[] {
		return this.value.map(memValue => memValue.value)
	}

	static fromPrimitives(
		memoryRamValues: Primitives<MemoryRamValues>[],
		status: (typeof StatusOptions)[keyof typeof StatusOptions]
	) {
		if (!MemoryRam.isValid(memoryRamValues, status)) {
			throw new Error(MemoryRam.invalidMessage())
		}
		return new MemoryRam(memoryRamValues.map(MemoryRamValues.fromValues))
	}

	public static isValid(
		value: Primitives<MemoryRamValues>[],
		status: (typeof StatusOptions)[keyof typeof StatusOptions]
	): boolean {
		const allowedStatusOptions = [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (
			allowedStatusOptions.includes(status) &&
			MemoryRam.isZeroTotalMemory(value) &&
			!this.isEmpty(value)
		) {
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return 'La capacidad de la memoria Ram no puede ser 0 si el equipo está en uso'
	}

	private static isEmpty(value: Primitives<MemoryRamValues>[]): boolean {
		return value?.length === 0
	}

	static totalAmount(
		value?: Primitives<MemoryRamValues>[]
	): number | undefined {
		if (!value) return
		let number = 0
		for (const val of value) {
			number += Number(val)
		}
		return number
	}

	public static isZeroTotalMemory(
		value: Primitives<MemoryRamValues>[]
	): boolean {
		return this.totalAmount(value) === 0
	}
}
