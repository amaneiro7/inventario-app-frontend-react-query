import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type LocationStatusId } from '../value-object/LocationStatusId'
import { type LocationStatusName } from '../value-object/LocationStatusName'

export interface LocationStatus {
	id: Primitives<LocationStatusId>
	name: Primitives<LocationStatusName>
}

export type LocationStatusPrimitives = Omit<LocationStatus, 'id'>

export type LocationStatusDto = LocationStatus
