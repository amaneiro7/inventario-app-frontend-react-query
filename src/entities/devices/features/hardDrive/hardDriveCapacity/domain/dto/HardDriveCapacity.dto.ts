import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type HardDriveCapacityId } from '../value-object/HardDriveCapacityId'
import { type HardDriveCapacityName } from '../value-object/HardDriveCapacityName'

/**
 * @interface HardDriveCapacity
 * @description Representa la entidad de dominio `HardDriveCapacity` con sus propiedades básicas.
 * @property {Primitives<HardDriveCapacityId>} id - El identificador único de la capacidad de disco duro.
 * @property {Primitives<HardDriveCapacityName>} name - El nombre de la capacidad de disco duro (ej. "500GB", "1TB").
 */
export interface HardDriveCapacity {
	id: Primitives<HardDriveCapacityId>
	name: Primitives<HardDriveCapacityName>
}

/**
 * @typedef {Object} HardDriveCapacityDto
 * @description Data Transfer Object (DTO) para una entidad `HardDriveCapacity`.
 * @extends {HardDriveCapacity}
 */
export type HardDriveCapacityDto = HardDriveCapacity
