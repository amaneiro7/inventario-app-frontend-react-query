import { DeviceActivo } from '../value-object/DeviceActivo'
import { DeviceSerial } from '../value-object/DeviceSerial'
import { StatusId } from '@/core/status/status/domain/value-object/StatusId'
import { CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { BrandId } from '@/core/brand/domain/value-object/BrandId'
import { ModelId } from '@/core/model/models/domain/value-object/ModelId'
import { DeviceLocation } from '../value-object/DeviceLocation'
import { DeviceEmployee } from '../value-object/DeviceEmployee'
import { DeviceObservation } from '../value-object/DeviceObservation'
import { DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DeviceParams, type DevicePrimitives } from '../dto/Device.dto'

export class Device {
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

	get serialValue(): Primitives<DeviceSerial> {
		return this.serial.value
	}

	get activoValue(): Primitives<DeviceActivo> | null {
		return this.activo.value
	}

	get statusValue(): Primitives<StatusId> {
		return this.statusId.value
	}

	get categoryValue(): Primitives<CategoryId> {
		return this.categoryId.value
	}

	get brandValue(): Primitives<BrandId> {
		return this.brandId.value
	}

	get modelValue(): Primitives<ModelId> {
		return this.modelId.value
	}

	get employeeValue(): Primitives<DeviceEmployee> {
		return this.employeeId.value
	}

	get locationValue(): Primitives<DeviceLocation> {
		return this.locationId.value
	}

	get observationValue(): Primitives<DeviceObservation> {
		return this.observation.value
	}

	get stockNumberValue(): Primitives<DeviceStockNumber> {
		return this.stockNumber.value
	}

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
