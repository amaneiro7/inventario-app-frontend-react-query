import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import {
	type ModelDto,
	type ModelParams,
	type ModelPrimitives,
	type Model
} from './Model.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type ScreenSize } from '../value-object/ScreenSize'
import { type HasDVI } from '../value-object/HasDVI'
import { type HasHDMI } from '../value-object/HasHDMI'
import { type HasVGA } from '../value-object/HasVGA'

export interface ModelMonitor extends Model {
	screenSize: Primitives<ScreenSize>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}

export type ModelMonitorPrimitives = ModelPrimitives & {
	screenSize: Primitives<ScreenSize>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}

export type ModelMonitorParams = ModelParams & {
	categoryId: CategoryOptions.MONITOR
	screenSize: Primitives<ScreenSize>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}

export type ModelMonitorDto = ModelDto & {
	categoryId: CategoryOptions.MONITOR
	screenSize: Primitives<ScreenSize>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}
