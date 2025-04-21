import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type StatusId } from '../value-object/StatusId'
import { type StatusName } from '../value-object/StatusName'

export interface Status {
	id: Primitives<StatusId>
	name: Primitives<StatusName>
}

export type StatusPrimitives = Omit<Status, 'id'>

export type StatusDto = Status
