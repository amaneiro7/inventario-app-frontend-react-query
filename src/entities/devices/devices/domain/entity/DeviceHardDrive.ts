import { HardDriveTypeId } from '@/entities/devices/features/hardDrive/hardDriveType/domain/value-object/HardDriveTypeId'
import { Device } from './Device'
import { HardDriveCapacityId } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { HardDriveHealth } from '../value-object/HardDriveHealth'
import { DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { DeviceObservation } from '../value-object/DeviceObservation'
import { DeviceLocation } from '../value-object/DeviceLocation'
import { DeviceEmployee } from '../value-object/DeviceEmployee'
import { BrandId } from '@/entities/brand/domain/value-object/BrandId'
import { CategoryId } from '@/entities/category/domain/value-object/CategoryId'
import { ModelId } from '@/entities/model/models/domain/value-object/ModelId'
import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { DeviceActivo } from '../value-object/DeviceActivo'
import { DeviceSerial } from '../value-object/DeviceSerial'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import {
	type DeviceHardDriveParams,
	type DeviceHardDrivePrimitives
} from '../dto/DeviceHardDrive.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

/**
 * @class DeviceHardDrive
 * @extends {Device}
 * @description Entidad de dominio que representa un dispositivo de tipo disco duro.
 * Extiende la entidad `Device` base y añade propiedades específicas de discos duros.
 */
export class DeviceHardDrive extends Device {
	/**
	 * Crea una instancia de `DeviceHardDrive`.
	 * @param {DeviceSerial} serial - El número de serie del dispositivo.
	 * @param {DeviceActivo} activo - El número de activo del dispositivo.
	 * @param {StatusId} statusId - El ID del estado del dispositivo.
	 * @param {ModelId} modelId - El ID del modelo del dispositivo.
	 * @param {CategoryId} categoryId - El ID de la categoría del dispositivo.
	 * @param {BrandId} brandId - El ID de la marca del dispositivo.
	 * @param {DeviceEmployee} employeeId - El ID del empleado asignado al dispositivo.
	 * @param {DeviceLocation} locationId - El ID de la ubicación del dispositivo.
	 * @param {DeviceObservation} observation - Observaciones sobre el dispositivo.
	 * @param {DeviceStockNumber} stockNumber - El número de stock del dispositivo.
	 * @param {HardDriveHealth} health - El estado de salud del disco duro.
	 * @param {HardDriveCapacityId} hardDriveCapacityId - El ID de la capacidad del disco duro.
	 * @param {HardDriveTypeId} hardDriveTypeId - El ID del tipo de disco duro.
	 */	constructor(
		serial: DeviceSerial,
		activo: DeviceActivo,
		statusId: StatusId,
		modelId: ModelId,
		categoryId: CategoryId,
		brandId: BrandId,
		employeeId: DeviceEmployee,
		locationId: DeviceLocation,
		observation: DeviceObservation,
		stockNumber: DeviceStockNumber,
		private readonly health: HardDriveHealth,
		private readonly hardDriveCapacityId: HardDriveCapacityId,
		private readonly hardDriveTypeId: HardDriveTypeId
	) {
		super(
			serial,
			activo,
			statusId,
			categoryId,
			brandId,
			modelId,
			employeeId,
			locationId,
			observation,
			stockNumber
		)
	}

	/**
	 * Verifica si una categoría dada corresponde a un tipo de dispositivo de disco duro.
	 * @static
	 * @param {CategoryOptions[keyof CategoryOptions]} categoryId - El ID de la categoría a verificar.
	 * @returns {boolean} `true` si la categoría es de disco duro, `false` en caso contrario.
	 */	static isHardDriveCategory(
		categoryId: (typeof CategoryOptions)[keyof typeof CategoryOptions]
	): boolean {
		const allowedComputerCategories = [CategoryOptions.HARDDRIVE]
		return allowedComputerCategories.includes(categoryId)
	}

	/**
	 * Crea una nueva instancia de `DeviceHardDrive` a partir de sus propiedades primitivas.
	 * @static
	 * @param {DeviceHardDriveParams} params - Los parámetros del dispositivo de disco duro.
	 * @returns {DeviceHardDrive} Una nueva instancia de `DeviceHardDrive`.
	 * @throws {InvalidArgumentError} Si la categoría no pertenece a un tipo de disco duro.
	 */	public static create(params: DeviceHardDriveParams) {
		if (!DeviceHardDrive.isHardDriveCategory(params.categoryId)) {
			throw new InvalidArgumentError('No pertenece a esta categoria')
		}
		return new DeviceHardDrive(
			new DeviceSerial(params.serial, params.genericModel),
			new DeviceActivo(params.activo),
			new StatusId(params.statusId),
			new ModelId(params.modelId),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new DeviceEmployee(params.employeeId, params.statusId),
			new DeviceLocation(params.locationId, params.statusId, params.typeOfSiteId),
			new DeviceObservation(params.observation),
			new DeviceStockNumber(params.stockNumber, params.statusId),
			new HardDriveHealth(params.health),
			new HardDriveCapacityId(params.hardDriveCapacityId),
			new HardDriveTypeId(params.hardDriveTypeId)
		)
	}

	/**
	 * Obtiene el valor primitivo del estado de salud del disco duro.
	 * @type {Primitives<HardDriveHealth>}
	 */	get healthValue(): Primitives<HardDriveHealth> {
		return this.health.value
	}

	/**
	 * Obtiene el valor primitivo del ID de la capacidad del disco duro.
	 * @type {Primitives<HardDriveCapacityId>}
	 */	get hardDriveCapacityValue(): Primitives<HardDriveCapacityId> {
		return this.hardDriveCapacityId.value
	}

	/**
	 * Obtiene el valor primitivo del ID del tipo de disco duro.
	 * @type {Primitives<HardDriveTypeId>}
	 */	get hardDriveTypeValue(): Primitives<HardDriveTypeId> {
		return this.hardDriveTypeId.value
	}

	/**
	 * Convierte la entidad `DeviceHardDrive` a su representación primitiva.
	 * @returns {DeviceHardDrivePrimitives} La representación primitiva del dispositivo de disco duro.
	 */	toPrimitives(): DeviceHardDrivePrimitives {
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
			stockNumber: this.stockNumberValue,
			health: this.healthValue,
			hardDriveCapacityId: this.hardDriveCapacityValue,
			hardDriveTypeId: this.hardDriveTypeValue
		}
	}
}