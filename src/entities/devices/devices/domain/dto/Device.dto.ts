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
import { type DevicePrinterParams, type DevicePrinterDto } from './DevicePrinterParams'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'
import { TypeOfSiteId } from '@/entities/locations/typeOfSites/domain/value-object/TypeOfSiteId'

/**
 * @interface Device
 * @description Representa la estructura primitiva de una entidad de dispositivo.
 * Contiene las propiedades básicas comunes a todos los tipos de dispositivos.
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

/**
 * @typedef {Object} DevicePrimitives
 * @description Representa la forma primitiva de una entidad `Device` para la persistencia.
 * Excluye el `id` ya que puede ser generado por el sistema de persistencia.
 */
export type DevicePrimitives = Omit<Device, 'id'>

/**
 * @typedef {Object} DeviceParams
 * @description Representa los parámetros para crear o actualizar una entidad `Device`.
 * Incluye todas las propiedades de `DevicePrimitives` y opcionalmente el `id`,
 * además de propiedades para el modelo genérico y el tipo de sitio.
 * @property {Primitives<DeviceId>} [id] - El identificador único del dispositivo (opcional para creación).
 * @property {Primitives<TypeOfSiteId>} [typeOfSiteId] - El ID del tipo de sitio asociado al dispositivo.
 * @property {Primitives<GenericModel>} [genericModel] - Indica si el modelo es genérico.
 */
export type DeviceParams = DevicePrimitives & {
	id?: Primitives<DeviceId>
	typeOfSiteId?: Primitives<TypeOfSiteId>
	genericModel?: Primitives<GenericModel>
}

/**
 * @typedef {DeviceComputerParams | DeviceHardDriveParams | DevicePrinterParams} Params
 * @description Tipo de unión que representa los parámetros de creación/actualización para cualquier tipo específico de dispositivo.
 */
export type Params = DeviceComputerParams | DeviceHardDriveParams | DevicePrinterParams

/**
 * @interface DeviceDto
 * @description Representa el Data Transfer Object (DTO) de una entidad `Device`.
 * Incluye todas las propiedades de `Device` más los objetos completos de sus relaciones
 * y propiedades específicas de tipos de dispositivos (computadora, disco duro, MFP).
 * @extends {Device}
 * @property {StatusDto} status - El objeto `Status` completo asociado al dispositivo.
 * @property {CategoryDto} category - El objeto `Category` completo asociado al dispositivo.
 * @property {BrandDto} brand - El objeto `Brand` completo asociado al dispositivo.
 * @property {ModelDto} model - El objeto `Model` completo asociado al dispositivo.
 * @property {EmployeeDto} employee - El objeto `Employee` completo asociado al dispositivo.
 * @property {LocationDto} location - El objeto `Location` completo asociado al dispositivo.
 * @property {DeviceComputerDto | null} computer - Datos específicos de computadora si el dispositivo es de este tipo, o `null`.
 * @property {DeviceHardDriveDto | null} hardDrive - Datos específicos de disco duro si el dispositivo es de este tipo, o `null`.
 * @property {DevicePrinterDto | null} mfp - Datos específicos de MFP si el dispositivo es de este tipo, o `null`.
 * @property {HistoryDto[] | null} history - Historial de cambios del dispositivo, o `null`.
 * @property {string} createdAt - Fecha de creación del dispositivo.
 * @property {string} updatedAt - Fecha de última actualización del dispositivo.
 */
export type DeviceDto = Device & {
	status: StatusDto
	category: CategoryDto
	brand: BrandDto
	model: ModelDto
	employee: EmployeeDto
	location: LocationDto
	computer: DeviceComputerDto | null
	hardDrive: DeviceHardDriveDto | null
	printer: DevicePrinterDto | null
	history: HistoryDto[] | null
	createdAt: string
	updatedAt: string
}
