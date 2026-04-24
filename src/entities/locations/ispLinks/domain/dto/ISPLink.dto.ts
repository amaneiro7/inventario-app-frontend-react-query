import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import type { ISPLinkId } from '../value-object/ISPLinkId'
import type { ISPLinkName } from '../value-object/ISPLinkName'

export interface ISPLink {
	id: Primitives<ISPLinkId>
	name: Primitives<ISPLinkName>
}

export type ISPLinkPrimitives = Omit<ISPLink, 'id'>

export type ISPLinkParams = ISPLinkPrimitives & {
	id?: Primitives<ISPLinkId> | undefined
}

export type ISPLinkDto = ISPLink & {
	updatedAt?: string
}
