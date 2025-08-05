import { Device } from './Device'
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
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceMFPParams, type DeviceMFPPrimitives } from '../dto/DeviceMFPParams'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { MFPIPAddress } from '../value-object/MFPIPAddress'

/**
 * @class DeviceMFP
 * @extends {Device}
 * @description Entidad de dominio que representa un dispositivo de tipo MFP (impresora multifuncional).
 * Extiende la entidad `Device` base y añade propiedades específicas de MFP.
 */
export class DeviceMFP extends Device {
	/**
	 * Crea una instancia de `DeviceMFP`.
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
	 * @param {MFPIPAddress} ipAddress - La dirección IP de la MFP.
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
		private readonly ipAddress: MFPIPAddress
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
	 * Verifica si una categoría dada corresponde a un tipo de dispositivo MFP.
	 * @static
	 * @param {CategoryOptions[keyof CategoryOptions]} categoryId - El ID de la categoría a verificar.
	 * @returns {boolean} `true` si la categoría es MFP, `false` en caso contrario.
	 */	static isMFPCategory(
		categoryId: (typeof CategoryOptions)[keyof typeof CategoryOptions]
	): boolean {
		const allowedComputerCategories = [CategoryOptions.MFP]
		return allowedComputerCategories.includes(categoryId)
	}

	/**
	 * Crea una nueva instancia de `DeviceMFP` a partir de sus propiedades primitivas.
	 * @static
	 * @param {DeviceMFPParams} params - Los parámetros del dispositivo MFP.
	 * @returns {DeviceMFP} Una nueva instancia de `DeviceMFP`.
	 * @throws {InvalidArgumentError} Si la categoría no pertenece a un tipo de MFP.
	 */	public static create(params: DeviceMFPParams) {
		if (!DeviceMFP.isMFPCategory(params.categoryId)) {
			throw new InvalidArgumentError('No pertenece a esta categoria')
		}
		return new DeviceMFP(
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
			new MFPIPAddress(params.ipAddress)
		)
	}

	/**
	 * Obtiene el valor primitivo de la dirección IP de la MFP.
	 * @type {Primitives<MFPIPAddress>}
	 */	get ipAddressValue(): Primitives<MFPIPAddress> {
		return this.ipAddress.value
	}

	/**
	 * Convierte la entidad `DeviceMFP` a su representación primitiva.
	 * @returns {DeviceMFPPrimitives} La representación primitiva del dispositivo MFP.
	 */	toPrimitives(): DeviceMFPPrimitives {
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
			ipAddress: this.ipAddressValue
		}
	}
}