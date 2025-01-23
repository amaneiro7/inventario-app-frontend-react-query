import { StatusId } from '@/core/status/domain/value-object/StatusId'
import { ComputerHDDCapacity } from '../value-object/ComputerHDDCapacity'
import { ComputerHDDType } from '../value-object/ComputerHDDType'
import { IPAddress } from '../value-object/ComputerIPAddress'
import { ComputerOs } from '../value-object/ComputerOS'
import { ComputerOsArq } from '../value-object/ComputerOSArq'
import { DeviceActivo } from '../value-object/DeviceActivo'
import { DeviceSerial } from '../value-object/DeviceSerial'
import { MACAddress } from '../value-object/MACAddress'
import { MemoryRam } from '../value-object/MemoryRam'
import { Device } from './Device'
import { CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { BrandId } from '@/core/brand/domain/value-object/BrandId'
import { ModelId } from '@/core/model/models/domain/value-object/ModelId'
import { DeviceEmployee } from '../value-object/DeviceEmployee'
import { DeviceLocation } from '../value-object/DeviceLocation'
import { DeviceObservation } from '../value-object/DeviceObservation'
import { DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { ComputerName } from '../value-object/ComputerName'
import { ComputerProcessor } from '../value-object/ComputerProcessor'
import { MemoryRamCapacity } from '../value-object/MemoryRamCapacity'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import {
	type DeviceComputerParams,
	type DeviceComputerPrimitives
} from '../dto/DeviceComputer.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class DeviceComputer extends Device {
	constructor(
		serial: DeviceSerial,
		activo: DeviceActivo,
		statusId: StatusId,
		categoryId: CategoryId,
		brandId: BrandId,
		modelId: ModelId,
		employeeId: DeviceEmployee,
		locationId: DeviceLocation,
		observation: DeviceObservation,
		stockNumber: DeviceStockNumber,
		private readonly computerName: ComputerName,
		private readonly processorId: ComputerProcessor,
		private readonly memoryRamCapacity: MemoryRamCapacity,
		private readonly memoryRam: MemoryRam,
		private readonly hardDriveCapacityId: ComputerHDDCapacity,
		private readonly hardDriveTypeId: ComputerHDDType,
		private readonly operatingSystemId: ComputerOs,
		private readonly operatingSystemArqId: ComputerOsArq,
		private readonly macAddress: MACAddress,
		private readonly ipAddress: IPAddress
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

	static isComputerCategory(
		categoryId: (typeof CategoryOptions)[keyof typeof CategoryOptions]
	) {
		return categoryId === CategoryOptions.COMPUTER ||
			categoryId === CategoryOptions.ALLINONE ||
			categoryId === CategoryOptions.LAPTOP ||
			categoryId === CategoryOptions.SERVER
			? true
			: false
	}

	public static create(params: DeviceComputerParams) {
		if (!DeviceComputer.isComputerCategory(params.categoryId)) {
			throw new InvalidArgumentError('No pertenece a esta categoria')
		}
		return new DeviceComputer(
			new DeviceSerial(params.serial),
			new DeviceActivo(params.activo),
			new StatusId(params.statusId),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new ModelId(params.modelId),
			new DeviceEmployee(params.employeeId, params.statusId),
			new DeviceLocation(
				params.locationId,
				params.statusId,
				params.typeOfSiteId
			),
			new DeviceObservation(params.observation),
			new DeviceStockNumber(params.stockNumber, params.statusId),
			new ComputerName(params.computerName, params.statusId),
			new ComputerProcessor(params.processorId, params.statusId),
			new MemoryRamCapacity(params.memoryRamCapacity, params.statusId),
			MemoryRam.fromPrimitives(params.memoryRam, params.statusId),
			new ComputerHDDCapacity(
				params.hardDriveCapacityId,
				params.statusId
			),
			new ComputerHDDType(
				params.hardDriveTypeId,
				params.hardDriveCapacityId
			),
			new ComputerOs(
				params.operatingSystemId,
				params.statusId,
				params.hardDriveCapacityId
			),
			new ComputerOsArq(
				params.operatingSystemArqId,
				params.operatingSystemId
			),
			new MACAddress(params.macAddress),
			new IPAddress(params.ipAddress, params.statusId)
		)
	}

	get computerNameValue(): Primitives<ComputerName> {
		return this.computerName.value
	}
	get memoryRamCapacityValue(): Primitives<MemoryRamCapacity> {
		return this.memoryRamCapacity.value
	}
	get memoryRamValue(): number[] {
		return this.memoryRam.toPrimitives()
	}
	get processorValue(): Primitives<ComputerProcessor> {
		return this.processorId.value
	}
	get hardDriveCapacityValue(): Primitives<ComputerHDDCapacity> {
		return this.hardDriveCapacityId.value
	}
	get hardDriveTypeValue(): Primitives<ComputerHDDType> {
		return this.hardDriveTypeId.value
	}
	get operatingSystemValue(): Primitives<ComputerOs> {
		return this.operatingSystemId.value
	}
	get operatingSystemArqValue(): Primitives<ComputerOsArq> {
		return this.operatingSystemArqId.value
	}
	get macAddressValue(): Primitives<MACAddress> {
		return this.macAddress.value
	}
	get ipAddressValue(): Primitives<IPAddress> {
		return this.ipAddress.value
	}

	toPrimitives(): DeviceComputerPrimitives {
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
			computerName: this.computerNameValue,
			memoryRamCapacity: this.memoryRamCapacityValue,
			memoryRam: this.memoryRamValue,
			processorId: this.processorValue,
			hardDriveCapacityId: this.hardDriveCapacityValue,
			hardDriveTypeId: this.hardDriveTypeValue,
			operatingSystemId: this.operatingSystemValue,
			operatingSystemArqId: this.operatingSystemArqValue,
			macAddress: this.macAddressValue,
			ipAddress: this.ipAddressValue
		}
	}
}
