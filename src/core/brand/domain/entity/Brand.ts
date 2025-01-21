import { BrandName } from '../value-object/BrandName'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type BrandPrimitives } from '../dto/BrandPrimitives.dto'

export class Brand {
	constructor(private readonly name: BrandName) {}

	static create({ name }: BrandPrimitives): Brand {
		return new Brand(new BrandName(name))
	}

	get nameValue(): Primitives<BrandName> {
		return this.name.value
	}

	toPrimitives(): BrandPrimitives {
		return {
			name: this.name.value
		}
	}
}
