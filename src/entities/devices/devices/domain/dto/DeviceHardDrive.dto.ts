import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceParams, type DevicePrimitives } from './Device.dto'
import { type CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { type HardDriveHealth } from '../value-object/HardDriveHealth'
import { type HardDriveCapacityId } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { type HardDriveTypeId } from '@/entities/devices/features/hardDrive/hardDriveType/domain/value-object/HardDriveTypeId'
import { type HardDriveCapacityDto } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/dto/HardDriveCapacity.dto'
import { type HardDriveTypeDto } from '@/entities/devices/features/hardDrive/hardDriveType/domain/dto/HardDriveType.dto'

/**
 * @typedef {Object} DeviceHardDrivePrimitives
 * @description Representa la forma primitiva de un dispositivo de tipo disco duro.
 * Incluye propiedades específicas de discos duros además de las propiedades base de `DevicePrimitives`.
 * @property {Primitives<HardDriveHealth>} health - El estado de salud del disco duro.
 * @property {Primitives<HardDriveCapacityId>} hardDriveCapacityId - ID de la capacidad del disco duro.
 * @property {Primitives<HardDriveTypeId>} hardDriveTypeId - ID del tipo de disco duro.
 */
export type DeviceHardDrivePrimitives = DevicePrimitives & {
	health: Primitives<HardDriveHealth>
	hardDriveCapacityId: Primitives<HardDriveCapacityId>
	hardDriveTypeId: Primitives<HardDriveTypeId>
}

/**
 * @typedef {Object} DeviceHardDriveParams
 * @description Representa los parámetros para crear o actualizar un dispositivo de tipo disco duro.
 * Extiende `DeviceParams` e incluye propiedades específicas de discos duros.
 * @property {CategoryOptions.HARDDRIVE} categoryId - Categoría del dispositivo (debe ser `HARDDRIVE`).
 * @property {Primitives<HardDriveHealth>} health - El estado de salud del disco duro.
 * @property {Primitives<HardDriveCapacityId>} hardDriveCapacityId - ID de la capacidad del disco duro.
 * @property {Primitives<HardDriveTypeId>} hardDriveTypeId - ID del tipo de disco duro.
 */
export type DeviceHardDriveParams = DeviceParams & {
	categoryId: CategoryOptions.HARDDRIVE
	health: Primitives<HardDriveHealth>
	hardDriveCapacityId: Primitives<HardDriveCapacityId>
	hardDriveTypeId: Primitives<HardDriveTypeId>
}

/**
 * @interface DeviceHardDriveDto
 * @description Data Transfer Object (DTO) para un dispositivo de tipo disco duro.
 * Incluye las propiedades primitivas del disco duro más los DTOs completos de sus relaciones.
 * @property {Primitives<HardDriveHealth>} health - El estado de salud del disco duro.
 * @property {Primitives<HardDriveCapacityId>} hardDriveCapacityId - ID de la capacidad del disco duro.
 * @property {Primitives<HardDriveTypeId>} hardDriveTypeId - ID del tipo de disco duro.
 * @property {HardDriveCapacityDto} hardDriveCapacity - DTO de la capacidad del disco duro.
 * @property {HardDriveTypeDto} hardDriveType - DTO del tipo de disco duro.
 */
export interface DeviceHardDriveDto {
	health: Primitives<HardDriveHealth>
	hardDriveCapacityId: Primitives<HardDriveCapacityId>
	hardDriveTypeId: Primitives<HardDriveTypeId>
	hardDriveCapacity: HardDriveCapacityDto
	hardDriveType: HardDriveTypeDto
}