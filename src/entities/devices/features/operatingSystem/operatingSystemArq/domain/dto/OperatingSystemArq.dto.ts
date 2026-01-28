import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type OperatingSystemArqId } from '../value-object/OperatingSystemArqId'
import { type OperatingSystemArqName } from '../value-object/OperatingSystemArqName'

/**
 * @interface OperatingSystemArq
 * @description Representa la entidad de dominio `OperatingSystemArq` con sus propiedades básicas.
 * @property {Primitives<OperatingSystemArqId>} id - El identificador único de la arquitectura del sistema operativo.
 * @property {Primitives<OperatingSystemArqName>} name - El nombre de la arquitectura del sistema operativo.
 */
export interface OperatingSystemArq {
	id: Primitives<OperatingSystemArqId>
	name: Primitives<OperatingSystemArqName>
}

/**
 * @typedef {Object} OperatingSystemArqDto
 * @description Data Transfer Object (DTO) para una entidad `OperatingSystemArq`.
 * @extends {OperatingSystemArq}
 */
export type OperatingSystemArqDto = OperatingSystemArq
