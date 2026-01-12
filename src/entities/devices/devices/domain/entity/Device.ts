import { DeviceActivo } from '../value-object/DeviceActivo'
import { DeviceSerial } from '../value-object/DeviceSerial'
import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { CategoryId } from '@/entities/category/domain/value-object/CategoryId'
import { BrandId } from '@/entities/brand/domain/value-object/BrandId'
import { ModelId } from '@/entities/model/models/domain/value-object/ModelId'
import { DeviceLocation } from '../value-object/DeviceLocation'
import { DeviceEmployee } from '../value-object/DeviceEmployee'
import { DeviceObservation } from '../value-object/DeviceObservation'
import { DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceParams, type DevicePrimitives } from '../dto/Device.dto'

/**
 * @class Device
 * @description Entidad de dominio base que representa un dispositivo.
 * Encapsula las propiedades y la lógica común a todos los tipos de dispositivos.
 */
export class Device {
	/**
	 * Crea una instancia de `Device`.
	 * @param {DeviceSerial} serial - El número de serie del dispositivo.
	 * @param {DeviceActivo} activo - El número de activo del dispositivo.
	 * @param {StatusId} statusId - El ID del estado del dispositivo.
	 * @param {CategoryId} categoryId - El ID de la categoría del dispositivo.
	 * @param {BrandId} brandId - El ID de la marca del dispositivo.
	 * @param {ModelId} modelId - El ID del modelo del dispositivo.
	 * @param {DeviceEmployee} employeeId - El ID del empleado asignado al dispositivo.
	 * @param {DeviceLocation} locationId - El ID de la ubicación del dispositivo.
	 * @param {DeviceObservation} observation - Observaciones sobre el dispositivo.
	 * @param {DeviceStockNumber} stockNumber - El número de stock del dispositivo.
	 */
	constructor(
		private readonly serial: DeviceSerial,
		private readonly activo: DeviceActivo,
		private readonly statusId: StatusId,
		private readonly categoryId: CategoryId,
		private readonly brandId: BrandId,
		private readonly modelId: ModelId,
		private readonly employeeId: DeviceEmployee,
		private readonly locationId: DeviceLocation,
		private readonly observation: DeviceObservation,
		private readonly stockNumber: DeviceStockNumber
	) {}

	/**
	 * Crea una nueva instancia de `Device` a partir de sus propiedades primitivas.
	 * @param {DeviceParams} params - Los parámetros del dispositivo.
	 * @returns {Device} Una nueva instancia de `Device`.
	 */
	public static create(params: DeviceParams): Device {
		return new Device(
			new DeviceSerial(params.serial, params.genericModel),
			new DeviceActivo(params.activo),
			new StatusId(params.statusId),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new ModelId(params.modelId),
			new DeviceEmployee(params.employeeId, params.statusId),
			new DeviceLocation(params.locationId, params.statusId, params.typeOfSiteId),
			new DeviceObservation(params.observation),
			new DeviceStockNumber(params.stockNumber, params.statusId)
		)
	}

	/**
	 * Obtiene el valor primitivo del número de serie del dispositivo.
	 * @type {Primitives<DeviceSerial>}
	 */
	get serialValue(): Primitives<DeviceSerial> {
		return this.serial.value
	}

	/**
	 * Obtiene el valor primitivo del número de activo del dispositivo.
	 * @type {Primitives<DeviceActivo> | null}
	 */
	get activoValue(): Primitives<DeviceActivo> | null {
		return this.activo.value
	}

	/**
	 * Obtiene el valor primitivo del ID de estado del dispositivo.
	 * @type {Primitives<StatusId>}
	 */
	get statusValue(): Primitives<StatusId> {
		return this.statusId.value
	}

	/**
	 * Obtiene el valor primitivo del ID de categoría del dispositivo.
	 * @type {Primitives<CategoryId>}
	 */
	get categoryValue(): Primitives<CategoryId> {
		return this.categoryId.value
	}

	/**
	 * Obtiene el valor primitivo del ID de marca del dispositivo.
	 * @type {Primitives<BrandId>}
	 */
	get brandValue(): Primitives<BrandId> {
		return this.brandId.value
	}

	/**
	 * Obtiene el valor primitivo del ID de modelo del dispositivo.
	 * @type {Primitives<ModelId>}
	 */
	get modelValue(): Primitives<ModelId> {
		return this.modelId.value
	}

	/**
	 * Obtiene el valor primitivo del ID de empleado asignado al dispositivo.
	 * @type {Primitives<DeviceEmployee>}
	 */
	get employeeValue(): Primitives<DeviceEmployee> {
		return this.employeeId.value
	}

	/**
	 * Obtiene el valor primitivo del ID de ubicación del dispositivo.
	 * @type {Primitives<DeviceLocation>}
	 */
	get locationValue(): Primitives<DeviceLocation> {
		return this.locationId.value
	}

	/**
	 * Obtiene el valor primitivo de las observaciones del dispositivo.
	 * @type {Primitives<DeviceObservation>}
	 */
	get observationValue(): Primitives<DeviceObservation> {
		return this.observation.value
	}

	/**
	 * Obtiene el valor primitivo del número de stock del dispositivo.
	 * @type {Primitives<DeviceStockNumber>}
	 */
	get stockNumberValue(): Primitives<DeviceStockNumber> {
		return this.stockNumber.value
	}

	/**
	 * Convierte la entidad `Device` a su representación primitiva.
	 * @returns {DevicePrimitives} La representación primitiva del dispositivo.
	 */
	toPrimitives(): DevicePrimitives {
		return {
			serial: this.serialValue,
			activo: this.activoValue,
			statusId: this.statusValue,
			modelId: this.modelValue,
			categoryId: this.categoryValue,
			brandId: this.brandValue,
			employeeId: this.employeeValue,
			locationId: this.locationValue,
			observation: this.observationValue,
			stockNumber: this.stockNumberValue
		}
	}
}
