import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type TypeOfSiteId } from '../value-object/TypeOfSiteId'
import { type TypeOfSiteName } from '../value-object/TypeOfSiteName'

export interface TypeOfSite {
	id: Primitives<TypeOfSiteId>
	name: Primitives<TypeOfSiteName>
}

export type TypeOfSitePrimitives = Omit<TypeOfSite, 'id'>

export type TypeOfSiteDto = TypeOfSite
