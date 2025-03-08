import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DeviceId } from '../value-object/DeviceId'
import { type DeviceSerial } from '../value-object/DeviceSerial'
import { type DeviceActivo } from '../value-object/DeviceActivo'
import { type CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { type BrandId } from '@/core/brand/domain/value-object/BrandId'
import { type DeviceEmployee } from '../value-object/DeviceEmployee'
import { type DeviceObservation } from '../value-object/DeviceObservation'
import { type DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { type ModelId } from '@/core/model/models/domain/value-object/ModelId'
import { type StatusDto } from '@/core/status/domain/dto/Status.dto'
import { type LocationDto } from '@/core/locations/locations/domain/dto/Location.dto'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'
import { type ModelDto } from '@/core/model/models/domain/dto/Model.dto'
import { type BrandDto } from '@/core/brand/domain/dto/Brand.dto'
import { type CategoryDto } from '@/core/category/domain/dto/Category.dto'
import { type DeviceLocation } from '../value-object/DeviceLocation'
import { type StatusId } from '@/core/status/domain/value-object/StatusId'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { type TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { type GenericModel } from '@/core/model/models/domain/value-object/GenericModel'
import { type DeviceComputerParams, type DeviceComputerDto } from './DeviceComputer.dto'
import { type DeviceHardDriveParams, type DeviceHardDriveDto } from './DeviceHardDrive.dto'
import { type DeviceMFPParams, type DeviceMFPDto } from './DeviceMFPParams'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'

export interface Device {
	id: Primitives<DeviceId>
	serial: Primitives<DeviceSerial>
	activo: Primitives<DeviceActivo>
	categoryId: Primitives<CategoryId>
	statusId: Primitives<StatusId>
	brandId: Primitives<BrandId>
	modelId: Primitives<ModelId>
	employeeId: Primitives<DeviceEmployee>
	locationId: Primitives<DeviceLocation>
	observation: Primitives<DeviceObservation>
	stockNumber: Primitives<DeviceStockNumber>
}

export type DevicePrimitives = Omit<Device, 'id'>

export type DeviceParams = DevicePrimitives & {
	id?: Primitives<DeviceId>
	categoryId: (typeof CategoryOptions)[keyof typeof CategoryOptions] | ''
	statusId: (typeof StatusOptions)[keyof typeof StatusOptions] | ''
	typeOfSiteId: (typeof TypeOfSiteOptions)[keyof typeof TypeOfSiteOptions] | ''
	genericModel?: Primitives<GenericModel>
}
export type Params = DeviceComputerParams | DeviceHardDriveParams | DeviceMFPParams

export type DeviceDto = Device & {
	status: StatusDto
	category: CategoryDto
	brand: BrandDto
	model: ModelDto
	employee: EmployeeDto
	location: LocationDto
	computer: DeviceComputerDto | null
	hardDrive: DeviceHardDriveDto | null
	mfp: DeviceMFPDto | null
	history: HistoryDto[] | null
	createdAt: string
	updatedAt: string
}
