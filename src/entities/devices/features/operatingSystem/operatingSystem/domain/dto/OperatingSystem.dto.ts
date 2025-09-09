import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type OperatingSystemId } from '../value-object/OperatingSystemId'
import { type OperatingSystemName } from '../value-object/OperatingSystemName'
import { type OperatingSystemBuildNumber } from '../value-object/OperatingSystemBuildNumber'
import { type OperatingSystemVersion } from '../value-object/OperatingSystemVersion'

/**
 * @interface OperatingSystem
 * @description Representa la entidad de dominio `OperatingSystem` con sus propiedades básicas.
 * @property {Primitives<OperatingSystemId>} id - El identificador único del sistema operativo.
 * @property {Primitives<OperatingSystemName>} name - El nombre del sistema operativo.
 * @property {Primitives<OperatingSystemBuildNumber>} buildNumber - La build number del sistema operativo.
 * @property {Primitives<OperatingSystemVersion>} version - La version del sistema operativo.
 */
export interface OperatingSystem {
	id: Primitives<OperatingSystemId>
	name: Primitives<OperatingSystemName>
	buildNumber: Primitives<OperatingSystemBuildNumber>
	version: Primitives<OperatingSystemVersion>
}

/**
 * @typedef {Object} OperatingSystemDto
 * @description Data Transfer Object (DTO) para una entidad `OperatingSystem`.
 * @extends {OperatingSystem}
 */
export type OperatingSystemDto = OperatingSystem
