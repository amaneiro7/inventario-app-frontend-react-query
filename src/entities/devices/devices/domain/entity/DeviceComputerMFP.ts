import { Device } from './Device'
import { DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { DeviceObservation } from '../value-object/DeviceObservation'
import { DeviceLocation } from '../value-object/DeviceLocation'
import { DeviceEmployee } from '../value-object/DeviceEmployee'
import { BrandId } from '@/entities/brand/domain/value-object/BrandId'
import { CategoryId } from '@/entities/category/domain/value-object/CategorydId'
import { ModelId } from '@/entities/model/models/domain/value-object/ModelId'
import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { DeviceActivo } from '../value-object/DeviceActivo'
import { DeviceSerial } from '../value-object/DeviceSerial'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceMFPParams, type DeviceMFPPrimitives } from '../dto/DeviceMFPParams'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { MFPIPAddress } from '../value-object/MFPIpaddress'

export class DeviceMFP extends Device {
	constructor(
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

	static isMFPCategory(
		categoryId: (typeof CategoryOptions)[keyof typeof CategoryOptions]
	): boolean {
		const allowedComputerCategories = [CategoryOptions.MFP]
		return allowedComputerCategories.includes(categoryId)
	}

	public static create(params: DeviceMFPParams) {
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

	get ipAddressValue(): Primitives<MFPIPAddress> {
		return this.ipAddress.value
	}

	toPrimitives(): DeviceMFPPrimitives {
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
