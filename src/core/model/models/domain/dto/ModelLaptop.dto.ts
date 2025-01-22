import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import {
	type ModelDto,
	type ModelParams,
	type ModelPrimitives,
	type Model
} from './Model.dto'
import { type MemoryRamTypeId } from '@/core/model/memoryRamType/domain/value-object/MemoryRamTypeId'
import { type MemoryRamSlotQuantity } from '../value-object/MemoryRamSlotQuantity'
import { type HasBluetooth } from '../value-object/HasBluetooth'
import { type HasWifiAdapter } from '../value-object/HasWifiAdapter'
import { type HasDVI } from '../value-object/HasDVI'
import { type HasHDMI } from '../value-object/HasHDMI'
import { type HasVGA } from '../value-object/HasVGA'
import { type MemoryRamTypeDto } from '@/core/model/memoryRamType/domain/dto/MemoryRamType.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'
import { type BatteryModel } from '../value-object/BatteryModel'

export interface ModelLaptop extends Model {
	memoryRamTypeId: Primitives<MemoryRamTypeId>
	memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
	hasBluetooth: Primitives<HasBluetooth>
	hasWifiAdapter: Primitives<HasWifiAdapter>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
	batteryModel: Primitives<BatteryModel>
}

export type ModelLaptopPrimitives = ModelPrimitives & {
	memoryRamTypeId: Primitives<MemoryRamTypeId>
	memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
	hasBluetooth: Primitives<HasBluetooth>
	hasWifiAdapter: Primitives<HasWifiAdapter>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
	batteryModel: Primitives<BatteryModel>
}

export type ModelLaptopParams = ModelParams & {
	mainCategoryId: MainCategoryOptions.COMPUTER
	categoryId: CategoryOptions.LAPTOP
	memoryRamTypeId: Primitives<MemoryRamTypeId>
	memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
	hasBluetooth: Primitives<HasBluetooth>
	hasWifiAdapter: Primitives<HasWifiAdapter>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
	batteryModel: Primitives<BatteryModel>
}

export type ModelLaptopDto = ModelDto & {
	categoryId: CategoryOptions.LAPTOP
	memoryRamTypeId: Primitives<MemoryRamTypeId>
	memoryRamSlotQuantity: Primitives<MemoryRamSlotQuantity>
	hasBluetooth: Primitives<HasBluetooth>
	hasWifiAdapter: Primitives<HasWifiAdapter>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
	memoryRamType: MemoryRamTypeDto
	batteryModel: Primitives<BatteryModel>
}
