import { EnumCriteriaValueObject } from './EnumCriteriaValueObject'

export enum Operator {
	EQUAL = '=',
	AND = 'AND',
	OR = 'OR',
	NOT_EQUAL = '!=',
	GREATER_THAN = '>',
	GREATER_THAN_OR_EQUAL = '>=',
	LOWER_THAN = '<',
	LOWER_THAN_OR_EQUAL = '<=',
	CONTAINS = 'CONTAINS',
	NOT_CONTAINS = 'NOT_CONTAINS'
}

export const operatorArray = [
	{ id: '=', name: 'Igual a' },
	{ id: '!=', name: 'No igual a' },
	{ id: '>', name: 'Mayor que' },
	{ id: '>=', name: 'Mayor o igual' },
	{ id: '<', name: 'Menor que' },
	{ id: '<=', name: 'Menor o igual' },
	{ id: 'CONTAINS', name: 'Contiene' },
	{ id: 'NOT_CONTAINS', name: 'No contiene' }
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
