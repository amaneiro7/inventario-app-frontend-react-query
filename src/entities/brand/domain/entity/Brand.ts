import { BrandName } from '../value-object/BrandName'
import { CategoryId } from '@/entities/category/domain/value-object/CategorydId'
import { type BrandPrimitives } from '../dto/Brand.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class Brand {
	constructor(
		private readonly name: BrandName,
		private readonly categories: CategoryId[]
	) {}

	static create(params: BrandPrimitives): Brand {
		return new Brand(
			new BrandName(params.name),
			params.categories.map(categoryId => new CategoryId(categoryId))
		)
	}

	get nameValue(): Primitives<BrandName> {
		return this.name.value
	}

	get categoriesValue(): Primitives<CategoryId>[] {
		return this.categories.map(c => c.value)
	}

	toPrimitives(): BrandPrimitives {
		return {
			name: this.name.value,
			categories: this.categoriesValue
		}
	}
}
