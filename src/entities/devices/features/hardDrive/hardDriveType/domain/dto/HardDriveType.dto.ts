import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type HardDriveTypeId } from '../value-object/HardDriveTypeId'
import { type HardDriveTypeName } from '../value-object/HardDriveTypeName'

/**
 * @interface HardDriveType
 * @description Representa la entidad de dominio `HardDriveType` con sus propiedades básicas.
 * @property {Primitives<HardDriveTypeId>} id - El identificador único del tipo de disco duro.
 * @property {Primitives<HardDriveTypeName>} name - El nombre del tipo de disco duro (ej. "SSD", "HDD").
 */
export interface HardDriveType {
	id: Primitives<HardDriveTypeId>
	name: Primitives<HardDriveTypeName>
}

/**
 * @typedef {Object} HardDriveTypeDto
 * @description Data Transfer Object (DTO) para una entidad `HardDriveType`.
 * @extends {HardDriveType}
 */
export type HardDriveTypeDto = HardDriveType
