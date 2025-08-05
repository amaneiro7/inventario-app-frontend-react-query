import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type OperatingSystemId } from '../value-object/OperatingSystemId'
import { type OperatingSystemName } from '../value-object/OperatingSystemName'

/**
 * @interface OperatingSystem
 * @description Representa la entidad de dominio `OperatingSystem` con sus propiedades básicas.
 * @property {Primitives<OperatingSystemId>} id - El identificador único del sistema operativo.
 * @property {Primitives<OperatingSystemName>} name - El nombre del sistema operativo.
 */
export interface OperatingSystem {
	id: Primitives<OperatingSystemId>
	name: Primitives<OperatingSystemName>
}

/**
 * @typedef {Object} OperatingSystemDto
 * @description Data Transfer Object (DTO) para una entidad `OperatingSystem`.
 * @extends {OperatingSystem}
 */
export type OperatingSystemDto = OperatingSystem