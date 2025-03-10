import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelId } from '../value-object/ModelId'
import { type ModelName } from '../value-object/ModelName'
import { type CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { type BrandId } from '@/core/brand/domain/value-object/BrandId'
import { type GenericModel } from '../value-object/GenericModel'
import { type CategoryDto } from '@/core/category/domain/dto/Category.dto'
import { type BrandDto } from '@/core/brand/domain/dto/Brand.dto'
import { type MainCategoryId } from '@/core/mainCategory/domain/value-object/MainCategorydId'
import { type ModelComputerDto, type ModelComputerParams } from './ModelComputer.dto'
import { type ModelLaptopDto, type ModelLaptopParams } from './ModelLaptop.dto'
import { type ModelMonitorDto, type ModelMonitorParams } from './ModelMonitor.dto'
import { type ModelPrinterDto, type ModelPrinterParams } from './ModelPrinter.dto'
import { type ModelKeyboardDto, type ModelKeyboardParams } from './ModelKeyboard.dto'

export interface Model {
	id: Primitives<ModelId>
	name: Primitives<ModelName>
	categoryId: Primitives<CategoryId>
	brandId: Primitives<BrandId>
	generic: Primitives<GenericModel>
}

export type ModelPrimitives = Omit<Model, 'id'>

export type ModelParams = ModelPrimitives & {
	id?: Primitives<ModelId>
	mainCategoryId: Primitives<MainCategoryId>
	categoryId: Primitives<CategoryId>
}

export type Params =
	| ModelParams
	| ModelComputerParams
	| ModelLaptopParams
	| ModelMonitorParams
	| ModelPrinterParams
	| ModelKeyboardParams

export type ModelDto = Model & {
	createdAt: string
	updatedAt: string
	category: CategoryDto
	brand: BrandDto
	modelComputer: ModelComputerDto | null
	modelLaptop: ModelLaptopDto | null
	modelMonitor: ModelMonitorDto | null
	modelPrinter: ModelPrinterDto | null
	modelKeyboard: ModelKeyboardDto | null
}
