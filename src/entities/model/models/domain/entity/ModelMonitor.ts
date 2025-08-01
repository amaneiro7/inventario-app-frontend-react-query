import { BrandId } from '@/entities/brand/domain/value-object/BrandId'
import { GenericModel } from '../value-object/GenericModel'
import { Model } from './Model'
import { CategoryId } from '@/entities/category/domain/value-object/CategorydId'
import { ModelName } from '../value-object/ModelName'
import { HasDVI } from '../value-object/HasDVI'
import { HasHDMI } from '../value-object/HasHDMI'
import { HasVGA } from '../value-object/HasVGA'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ModelMonitorParams, type ModelMonitorPrimitives } from '../dto/ModelMonitor.dto'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { isScreenCategory } from '../../../../mainCategory/domain/use-case/isScreenCategory'
import { ScreenSize } from '../value-object/ScreenSize'
import { ProcessorId } from '@/entities/devices/features/processor/domain/value-object/ProcessorId'

export class ModelMonitor extends Model {
	constructor(
		name: ModelName,
		categoryId: CategoryId,
		brandId: BrandId,
		generic: GenericModel,
		processors: ProcessorId[],
		private readonly screenSize: ScreenSize,
		private readonly hasDVI: HasDVI,
		private readonly hasHDMI: HasHDMI,
		private readonly hasVGA: HasVGA
	) {
		super(name, categoryId, brandId, generic, processors)
	}

	public static create(params: ModelMonitorParams): ModelMonitor {
		if (!isScreenCategory(params.mainCategoryId)) {
			throw new InvalidArgumentError(
				'No pertenece a esta categoria, solo se permiten Pantallas'
			)
		}
		const allowedCategoryOptions = [CategoryOptions.MONITOR]
		if (!allowedCategoryOptions.includes(params.categoryId)) {
			throw new InvalidArgumentError(
				'No Pertenece a esta categoria, solo se permite Monitores'
			)
		}
		return new ModelMonitor(
			new ModelName(params.name),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new GenericModel(params.generic),
			params.processors.map(processorId => new ProcessorId(processorId)),
			new ScreenSize(params.screenSize),
			new HasDVI(params.hasDVI),
			new HasHDMI(params.hasHDMI),
			new HasVGA(params.hasVGA)
		)
	}

	get screenSizeValue(): Primitives<ScreenSize> {
		return this.screenSize.value
	}
	get hasDVIValue(): Primitives<HasDVI> {
		return this.hasDVI.value
	}
	get hasHDMIValue(): Primitives<HasHDMI> {
		return this.hasHDMI.value
	}
	get hasVGAValue(): Primitives<HasVGA> {
		return this.hasVGA.value
	}

	toPrimitives(): ModelMonitorPrimitives {
		return {
			name: this.nameValue,
			categoryId: this.categoryValue,
			brandId: this.brandValue,
			generic: this.genericValue,
			processors: this.processorsValue,
			screenSize: this.screenSizeValue,
			hasDVI: this.hasDVIValue,
			hasHDMI: this.hasHDMIValue,
			hasVGA: this.hasVGAValue
		}
	}
}
