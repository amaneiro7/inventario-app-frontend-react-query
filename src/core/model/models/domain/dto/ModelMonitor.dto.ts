import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelParams, type ModelPrimitives } from './Model.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type ScreenSize } from '../value-object/ScreenSize'
import { type HasDVI } from '../value-object/HasDVI'
import { type HasHDMI } from '../value-object/HasHDMI'
import { type HasVGA } from '../value-object/HasVGA'
import { type MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'

export type ModelMonitorPrimitives = ModelPrimitives & {
	screenSize: Primitives<ScreenSize>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}

export type ModelMonitorParams = ModelParams & {
	mainCategoryId: MainCategoryOptions.SCREENS
	categoryId: CategoryOptions.MONITOR
	screenSize: Primitives<ScreenSize>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}

export interface ModelMonitorDto {
	screenSize: Primitives<ScreenSize>
	hasDVI: Primitives<HasDVI>
	hasHDMI: Primitives<HasHDMI>
	hasVGA: Primitives<HasVGA>
}
