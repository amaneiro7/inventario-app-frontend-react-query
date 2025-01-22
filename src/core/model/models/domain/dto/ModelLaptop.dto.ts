import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import {
	type ModelComputerParams,
	type ModelComputerPrimitives,
	type ModelComputer
} from './ModelComputer.dto'
import { type BatteryModel } from '../value-object/BatteryModel'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'

export interface ModelLaptop extends ModelComputer {
	batteryModel: Primitives<BatteryModel>
}

export type ModelLaptopPrimitives = ModelComputerPrimitives & {
	batteryModel: Primitives<BatteryModel>
}

export type ModelLaptopParams = ModelComputerParams & {
	categoryId: CategoryOptions.LAPTOP
	batteryModel: Primitives<BatteryModel>
}

export type ModelLaptopDto = ModelComputer & {
	categoryId: CategoryOptions.LAPTOP
	batteryModel: Primitives<BatteryModel>
}
