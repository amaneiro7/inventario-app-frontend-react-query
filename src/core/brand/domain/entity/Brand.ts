import { BrandName } from '../value-object/BrandName'
import { type BrandPrimitives } from '../dto/Brand.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

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
