import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DirectivaPrimitives } from '../dto/Directiva.dto'
import { DirectivaName } from '../value-object/DirectivaName'

export class Directiva {
	constructor(private readonly name: DirectivaName) {}

	public static create(params: DirectivaPrimitives): Directiva {
		return new Directiva(new DirectivaName(params.name))
	}

	get nameValue(): Primitives<DirectivaName> {
		return this.name.value
	}

	toPrimitives(): DirectivaPrimitives {
		return {
			name: this.nameValue
		}
	}
}
