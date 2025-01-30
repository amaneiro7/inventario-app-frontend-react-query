import { EnumCriteriaValueObject } from './EnumCriteriaValueObject'

export enum Operator {
	EQUAL = '=',
	NOT_EQUAL = '!=',
	GREATER_THAN = '>',
	GREATER_THAN_OR_EQUAL = '>=',
	LOWER_THAN = '<',
	LOWER_THAN_OR_EQUAL = '<=',
	CONTAINS = 'CONTAINS',
	NOT_CONTAINS = 'NOT_CONTAINS'
}

export const operatorArray = [
	{ id: '=', name: 'es gual a' },
	{ id: '!=', name: 'no es igual a' },
	{ id: '>', name: 'es más grande que' },
	{ id: '>=', name: 'es más grande o igual que' },
	{ id: '<', name: 'es más pequeño que' },
	{ id: '<=', name: 'es más pequeño o igual que' },
	{ id: 'CONTAINS', name: 'contiene' },
	{ id: 'NOT_CONTAINS', name: 'no contiene' }
]

export class FilterOperator extends EnumCriteriaValueObject<Operator> {
	constructor(value: Operator) {
		super(value, Object.values(Operator))
	}

	// Esto es simplemente otra forma de instanciar nuestra clase
	// La usamos cuando queremos hacer logica extra en nuestra instanciación
	public static fromValue(value: string): FilterOperator {
		for (const operatorValue of Object.values(Operator)) {
			if (value === operatorValue.toString()) {
				return new FilterOperator(operatorValue)
			}
		}

		throw new Error(`The filter operator ${value} is invalid`)
	}

	// Condicional que evalua si mi operador es positivo
	public isPositive(): boolean {
		return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS
	}

	// Implementación de nuestro EnumValueObject
	protected throwErrorForInvalidValue(value: Operator): void {
		throw new Error(`The filter operator ${value} is invalid`)
	}

	// Instancio la clase con el operador =
	public static equal() {
		return this.fromValue(Operator.EQUAL)
	}
}
