import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceId } from '../value-object/DeviceId'
import { type DeviceSerial } from '../value-object/DeviceSerial'
import { type DeviceActivo } from '../value-object/DeviceActivo'
import { type CategoryId } from '@/entities/category/domain/value-object/CategoryId'
import { type BrandId } from '@/entities/brand/domain/value-object/BrandId'
import { type DeviceEmployee } from '../value-object/DeviceEmployee'
import { type DeviceObservation } from '../value-object/DeviceObservation'
import { type DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { type ModelId } from '@/entities/model/models/domain/value-object/ModelId'
import { type StatusDto } from '@/entities/status/status/domain/dto/Status.dto'
import { type LocationDto } from '@/entities/locations/locations/domain/dto/Location.dto'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'
import { type ModelDto } from '@/entities/model/models/domain/dto/Model.dto'
import { type BrandDto } from '@/entities/brand/domain/dto/Brand.dto'
import { type CategoryDto } from '@/entities/category/domain/dto/Category.dto'
import { type DeviceLocation } from '../value-object/DeviceLocation'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { type GenericModel } from '@/entities/model/models/domain/value-object/GenericModel'
import { type DeviceComputerParams, type DeviceComputerDto } from './DeviceComputer.dto'
import { type DeviceHardDriveParams, type DeviceHardDriveDto } from './DeviceHardDrive.dto'
import { type DeviceMFPParams, type DeviceMFPDto } from './DeviceMFPParams'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'
import { TypeOfSiteId } from '@/entities/locations/typeOfSites/domain/value-object/TypeOfSiteId'

/**
 * @interface Device
 * @description Represents the entities primitive structure of a device entity.
 */
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
	typeOfSiteId?: Primitives<TypeOfSiteId>
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
