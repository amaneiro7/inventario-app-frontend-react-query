import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CentroCostoPrimitives } from '../dto/CentroCosto.dto'
import { CentroCostoId } from '../value-object/CentroCostoId'
import { CentroCostoName } from '../value-object/CentroCostoName'

export class CentroCosto {
	constructor(
		private readonly id: CentroCostoId,
		private readonly name: CentroCostoName
	) {}

	public static create(params: CentroCostoPrimitives): CentroCosto {
		return new CentroCosto(new CentroCostoId(params.id), new CentroCostoName(params.name))
	}

	get idValue(): Primitives<CentroCostoId> {
		return this.id.value
	}

	get nameValue(): Primitives<CentroCostoName> {
		return this.name.value
	}

	toPrimitives(): CentroCostoPrimitives {
		return {
			id: this.idValue,
			name: this.nameValue
		}
	}
}
