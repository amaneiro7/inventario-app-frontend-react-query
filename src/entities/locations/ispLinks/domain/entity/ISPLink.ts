import { ISPLinkName } from '../value-object/ISPLinkName'
import { type ISPLinkPrimitives } from '../dto/ISPLink.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class ISPLink {
	constructor(private readonly name: ISPLinkName) {}

	static create({ name }: ISPLinkPrimitives): ISPLink {
		return new ISPLink(new ISPLinkName(name))
	}

	get nameValue(): Primitives<ISPLinkName> {
		return this.name.value
	}

	toPrimitives(): ISPLinkPrimitives {
		return {
			name: this.nameValue
		}
	}
}
