import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type OperatingSystemArqId } from '../value-object/OperatingSystemArqId'
import { type OperatingSystemArqName } from '../value-object/OperatingSystemArqName'

export interface OperatingSystemArq {
	id: Primitives<OperatingSystemArqId>
	name: Primitives<OperatingSystemArqName>
}

export type OperatingSystemArqDto = OperatingSystemArq
