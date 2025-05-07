import { HardDriveTypeId } from '@/core/devices/features/hardDrive/hardDriveType/domain/value-object/HardDriveTypeId'
import { Device } from './Device'
import { HardDriveCapacityId } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { HardDriveHealth } from '../value-object/HardDriveHealth'
import { DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { DeviceObservation } from '../value-object/DeviceObservation'
import { DeviceLocation } from '../value-object/DeviceLocation'
import { DeviceEmployee } from '../value-object/DeviceEmployee'
import { BrandId } from '@/core/brand/domain/value-object/BrandId'
import { CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { ModelId } from '@/core/model/models/domain/value-object/ModelId'
import { StatusId } from '@/core/status/status/domain/value-object/StatusId'
import { DeviceActivo } from '../value-object/DeviceActivo'
import { DeviceSerial } from '../value-object/DeviceSerial'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import {
	type DeviceHardDriveParams,
	type DeviceHardDrivePrimitives
} from '../dto/DeviceHardDrive.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'

export class DeviceHardDrive extends Device {
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

	static isHardDriveCategory(
		categoryId: (typeof CategoryOptions)[keyof typeof CategoryOptions]
	): boolean {
		const allowedComputerCategories = [CategoryOptions.HARDDRIVE]
		return allowedComputerCategories.includes(categoryId)
	}

	public static create(params: DeviceHardDriveParams) {
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

	get healthValue(): Primitives<HardDriveHealth> {
		return this.health.value
	}

	get hardDriveCapacityValue(): Primitives<HardDriveCapacityId> {
		return this.hardDriveCapacityId.value
	}

	get hardDriveTypeValue(): Primitives<HardDriveTypeId> {
		return this.hardDriveTypeId.value
	}

	toPrimitives(): DeviceHardDrivePrimitives {
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
