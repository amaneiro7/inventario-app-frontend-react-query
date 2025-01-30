export abstract class StringCriteriaValueObject {
	constructor(protected _value: string) {}

	public value(): string {
		return this._value
	}
}
