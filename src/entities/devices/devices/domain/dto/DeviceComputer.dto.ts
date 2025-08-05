import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type IPAddress } from '../value-object/IPAddress'
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
import { type HardDriveCapacityDto } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/dto/HardDriveCapacity.dto'
import { type HardDriveTypeDto } from '@/entities/devices/features/hardDrive/hardDriveType/domain/dto/HardDriveType.dto'
import { type OperatingSystemDto } from '@/entities/devices/features/operatingSystem/operatingSystem/domain/dto/OperatingSystem.dto'
import { type OperatingSystemArqDto } from '@/entities/devices/features/operatingSystem/operatingSystemArq/domain/dto/OperatingSystemArq.dto'
import { type CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { type ProcessorDto } from '@/entities/devices/features/processor/domain/dto/Processor.dto'

/**
 * @typedef {Object} DeviceComputerPrimitives
 * @description Representa la forma primitiva de un dispositivo de tipo computadora.
 * Incluye propiedades específicas de computadoras además de las propiedades base de `DevicePrimitives`.
 * @property {Primitives<ComputerName>} computerName - Nombre del equipo.
 * @property {Primitives<ComputerProcessor>} processorId - ID del procesador.
 * @property {Primitives<MemoryRamValues>[]} memoryRam - Array de valores de memoria RAM.
 * @property {Primitives<MemoryRamCapacity>} memoryRamCapacity - Capacidad total de memoria RAM.
 * @property {Primitives<ComputerHDDCapacity>} hardDriveCapacityId - ID de la capacidad del disco duro.
 * @property {Primitives<ComputerHDDType>} hardDriveTypeId - ID del tipo de disco duro.
 * @property {Primitives<ComputerOs>} operatingSystemId - ID del sistema operativo.
 * @property {Primitives<ComputerOsArq>} operatingSystemArqId - ID de la arquitectura del sistema operativo.
 * @property {Primitives<MACAddress>} macAddress - Dirección MAC.
 * @property {Primitives<IPAddress>} ipAddress - Dirección IP.
 */
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

/**
 * @typedef {Object} DeviceComputerParams
 * @description Representa los parámetros para crear o actualizar un dispositivo de tipo computadora.
 * Extiende `DeviceParams` e incluye propiedades específicas de computadoras.
 * @property {CategoryOptions.COMPUTER | CategoryOptions.LAPTOP | CategoryOptions.ALLINONE | CategoryOptions.SERVER} categoryId - Categoría del dispositivo (debe ser una de las categorías de computadora).
 * @property {Primitives<ComputerName>} computerName - Nombre del equipo.
 * @property {Primitives<ComputerProcessor>} processorId - ID del procesador.
 * @property {Primitives<MemoryRamValues>[]} memoryRam - Array de valores de memoria RAM.
 * @property {Primitives<MemoryRamCapacity>} memoryRamCapacity - Capacidad total de memoria RAM.
 * @property {Primitives<ComputerHDDCapacity>} hardDriveCapacityId - ID de la capacidad del disco duro.
 * @property {Primitives<ComputerHDDType>} hardDriveTypeId - ID del tipo de disco duro.
 * @property {Primitives<ComputerOs>} operatingSystemId - ID del sistema operativo.
 * @property {Primitives<ComputerOsArq>} operatingSystemArqId - ID de la arquitectura del sistema operativo.
 * @property {Primitives<MACAddress>} macAddress - Dirección MAC.
 * @property {Primitives<IPAddress>} ipAddress - Dirección IP.
 */
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

/**
 * @interface DeviceComputerDto
 * @description Data Transfer Object (DTO) para un dispositivo de tipo computadora.
 * Incluye las propiedades primitivas de la computadora más los DTOs completos de sus relaciones.
 * @extends {DeviceComputerPrimitives}
 * @property {HardDriveCapacityDto} hardDriveCapacity - DTO de la capacidad del disco duro.
 * @property {HardDriveTypeDto} hardDriveType - DTO del tipo de disco duro.
 * @property {OperatingSystemDto} operatingSystem - DTO del sistema operativo.
 * @property {OperatingSystemArqDto} operatingSystemArq - DTO de la arquitectura del sistema operativo.
 * @property {ProcessorDto} processor - DTO del procesador.
 */
export type DeviceComputerDto = DeviceComputerPrimitives & {
	hardDriveCapacity: HardDriveCapacityDto
	hardDriveType: HardDriveTypeDto
	operatingSystem: OperatingSystemDto
	operatingSystemArq: OperatingSystemArqDto
	processor: ProcessorDto
}