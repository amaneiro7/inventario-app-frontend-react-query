import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type OperatingSystemId } from '../value-object/OperatingSystemId'
import { type OperatingSystemName } from '../value-object/OperatingSystemName'

export interface OperatingSystem {
	id: Primitives<OperatingSystemId>
	name: Primitives<OperatingSystemName>
}

export type OperatingSystemDto = OperatingSystem
