import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ModelParams, type ModelPrimitives } from './Model.dto'
import { type MemoryRamTypeId } from '@/entities/model/memoryRamType/domain/value-object/MemoryRamTypeId'
import { type MemoryRamSlotQuantity } from '../value-object/MemoryRamSlotQuantity'
import { type HasBluetooth } from '../value-object/HasBluetooth'
import { type HasWifiAdapter } from '../value-object/HasWifiAdapter'
import { type HasDVI } from '../value-object/HasDVI'
import { type HasHDMI } from '../value-object/HasHDMI'
import { type HasVGA } from '../value-object/HasVGA'
import { type MemoryRamTypeDto } from '@/entities/model/memoryRamType/domain/dto/MemoryRamType.dto'
import { type CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { type MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'

export type ModelComputerPrimitives = ModelPrimitives & {
	memoryRamTypeId: Primitives<MemoryRamTypeId>
	memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
	hasBluetooth: Primitives<HasBluetooth>
	hasWifiAdapter: Primitives<HasWifiAdapter>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}

export type ModelComputerParams = ModelParams & {
	mainCategoryId: MainCategoryOptions.COMPUTER
	categoryId: CategoryOptions.COMPUTER | CategoryOptions.ALLINONE | CategoryOptions.SERVER
	memoryRamTypeId: Primitives<MemoryRamTypeId>
	memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
	hasBluetooth: Primitives<HasBluetooth>
	hasWifiAdapter: Primitives<HasWifiAdapter>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}

export interface ModelComputerDto {
	memoryRamTypeId: Primitives<MemoryRamTypeId>
	memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
	hasBluetooth: Primitives<HasBluetooth>
	hasWifiAdapter: Primitives<HasWifiAdapter>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
	memoryRamType: MemoryRamTypeDto
}
