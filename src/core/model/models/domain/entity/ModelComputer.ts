import { BrandId } from '@/core/brand/domain/value-object/BrandId'
import { GenericModel } from '../value-object/GenericModel'
import { Model } from './Model'
import { CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { MemoryRamTypeId } from '@/core/model/memoryRamType/domain/value-object/MemoryRamTypeId'
import { MemoryRamSlotQuantity } from '../value-object/MemoryRamSlotQuantity'
import { ModelName } from '../value-object/ModelName'
import { HasBluetooth } from '../value-object/HasBluetooth'
import { HasWifiAdapter } from '../value-object/HasWifiAdapter'
import { HasDVI } from '../value-object/HasDVI'
import { HasHDMI } from '../value-object/HasHDMI'
import { HasVGA } from '../value-object/HasVGA'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelComputerParams, type ModelComputerPrimitives } from '../dto/ModelComputer.dto'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { isComputerCategory } from '../../../../mainCategory/domain/use-case/isComputerCategory'
import { ProcessorId } from '@/core/devices/features/processor/domain/value-object/ProcessorId'

export class ModelComputer extends Model {
	constructor(
		name: ModelName,
		categoryId: CategoryId,
		brandId: BrandId,
		generic: GenericModel,
		processors: ProcessorId[],
		private readonly memoryRamTypeId: MemoryRamTypeId,
		private readonly memoryRamSlotQuantity: MemoryRamSlotQuantity,
		private readonly hasBluetooth: HasBluetooth,
		private readonly hasWifiAdapter: HasWifiAdapter,
		private readonly hasDVI: HasDVI,
		private readonly hasHDMI: HasHDMI,
		private readonly hasVGA: HasVGA
	) {
		super(name, categoryId, brandId, generic, processors)
	}

	public static create(params: ModelComputerParams): ModelComputer {
		if (!isComputerCategory(params.mainCategoryId)) {
			throw new InvalidArgumentError(
				'No pertenece a esta categoria, solo se permiten Computadoras'
			)
		}
		const allowedCategoryOptions = [
			CategoryOptions.ALLINONE,
			CategoryOptions.COMPUTER,
			CategoryOptions.SERVER
		]
		if (!allowedCategoryOptions.includes(params.categoryId)) {
			throw new InvalidArgumentError(
				'No Pertenece a esta categoria, solo se permite Computadoras, All in One o Servidores'
			)
		}
		return new ModelComputer(
			new ModelName(params.name),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new GenericModel(params.generic),
			params.processors.map(processorId => new ProcessorId(processorId)),
			new MemoryRamTypeId(params.memoryRamTypeId),
			new MemoryRamSlotQuantity(params.memoryRamSlotQuantity),
			new HasBluetooth(params.hasBluetooth),
			new HasWifiAdapter(params.hasWifiAdapter),
			new HasDVI(params.hasDVI),
			new HasHDMI(params.hasHDMI),
			new HasVGA(params.hasVGA)
		)
	}

	get memoryRamTypeValue(): Primitives<MemoryRamTypeId> {
		return this.memoryRamTypeId.value
	}
	get memoryRamSlotQuantityValue(): Primitives<MemoryRamSlotQuantity> {
		return this.memoryRamSlotQuantity.value
	}
	get hasBluetoothValue(): Primitives<HasBluetooth> {
		return this.hasBluetooth.value
	}
	get hasWifiAdapterValue(): Primitives<HasWifiAdapter> {
		return this.hasWifiAdapter.value
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

	toPrimitives(): ModelComputerPrimitives {
		return {
			name: this.nameValue,
			categoryId: this.categoryValue,
			brandId: this.brandValue,
			generic: this.genericValue,
			processors: this.processorsValue,
			memoryRamTypeId: this.memoryRamTypeValue,
			memoryRamSlotQuantity: this.memoryRamSlotQuantityValue,
			hasBluetooth: this.hasBluetoothValue,
			hasWifiAdapter: this.hasWifiAdapterValue,
			hasDVI: this.hasDVIValue,
			hasHDMI: this.hasHDMIValue,
			hasVGA: this.hasVGAValue
		}
	}
}
