import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type IPAddress } from '../value-object/ComputerIPAddress'
import { type MACAddress } from '../value-object/MACAddress'
import { type ComputerOsArq } from '../value-object/ComputerOSArq'
import { type ComputerOs } from '../value-object/ComputerOS'
import { type ComputerHDDType } from '../value-object/ComputerHDDType'
import { type ComputerHDDCapacity } from '../value-object/ComputerHDDCapacity'
import { type MemoryRamCapacity } from '../value-object/MemoryRamCapacity'
import { type MemoryRamValues } from '../value-object/MemoryRamValues'
import { type ComputerProcessor } from '../value-object/ComputerProcessor'
import { type ComputerName } from '../value-object/ComputerName'
import { type DeviceParams, type DevicePrimitives } from './Device.dto'
import { type HardDriveCapacityDto } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/dto/HardDriveCapacity.dto'
import { type HardDriveTypeDto } from '@/core/devices/features/hardDrive/hardDriveType/domain/dto/HardDriveType.dto'
import { type OperatingSystemDto } from '@/core/devices/features/operatingSystem/operatingSystem/domain/dto/OperatingSystem.dto'
import { type OperatingSystemArqDto } from '@/core/devices/features/operatingSystem/operatingSystemArq/domain/dto/OperatingSystemArq.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'

export type DeviceComputerPrimitives = DevicePrimitives & {
	computerName: Primitives<ComputerName>
	processorId: Primitives<ComputerProcessor>
	memoryRam: Primitives<MemoryRamValues>[]
	memoryRamCapacity: Primitives<MemoryRamCapacity>
	hardDriveCapacityId: Primitives<ComputerHDDCapacity>
	hardDriveTypeId: Primitives<ComputerHDDType>
	operatingSystemId: Primitives<ComputerOs>
	operatingSystemArqId: Primitives<ComputerOsArq>
	macAddress: Primitives<MACAddress>
	ipAddress: Primitives<IPAddress>
}

export type DeviceComputerParams = DeviceParams & {
	categoryId:
		| CategoryOptions.COMPUTER
		| CategoryOptions.LAPTOP
		| CategoryOptions.ALLINONE
		| CategoryOptions.SERVER
	computerName: Primitives<ComputerName>
	processorId: Primitives<ComputerProcessor>
	memoryRam: Primitives<MemoryRamValues>[]
	memoryRamCapacity: Primitives<MemoryRamCapacity>
	hardDriveCapacityId: Primitives<ComputerHDDCapacity>
	hardDriveTypeId: Primitives<ComputerHDDType>
	operatingSystemId: Primitives<ComputerOs>
	operatingSystemArqId: Primitives<ComputerOsArq>
	macAddress: Primitives<MACAddress>
	ipAddress: Primitives<IPAddress>
}

export interface DeviceComputerDto {
	computerName: Primitives<ComputerName>
	processorId: Primitives<ComputerProcessor>
	memoryRam: Primitives<MemoryRamValues>[]
	memoryRamCapacity: Primitives<MemoryRamCapacity>
	hardDriveCapacityId: Primitives<ComputerHDDCapacity>
	hardDriveTypeId: Primitives<ComputerHDDType>
	operatingSystemId: Primitives<ComputerOs>
	operatingSystemArqId: Primitives<ComputerOsArq>
	macAddress: Primitives<MACAddress>
	ipAddress: Primitives<IPAddress>
	hardDriveCapacity: HardDriveCapacityDto
	hardDriveType: HardDriveTypeDto
	operatingSystem: OperatingSystemDto
	operatingSystemArq: OperatingSystemArqDto
}
