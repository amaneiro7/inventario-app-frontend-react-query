import { Filter, type FiltersPrimitives } from './Filter'

export class Filters {
	constructor(public readonly value: Filter[]) {}

	// Esto es simplemente otra forma de instanciar nuestra clase
	// La usamos cuando queremos hacer logica extra en nuestra instanciación
	public static fromValues(filters: FiltersPrimitives[]): Filters {
		return new Filters(
			filters.map(({ field, operator, value }) => Filter.fromValues(field, operator, value))
		)
	}

	public static none(): Filters {
		return new Filters([])
	}

	isEmpty(): boolean {
		return this.value.length === 0
	}
}
