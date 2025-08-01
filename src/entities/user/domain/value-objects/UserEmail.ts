import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class UserEmail extends StringValueObject {
	static readonly validEmailRegExp =
		/^(?=.*[@](?:bnc\.com\.ve|banconacionaldecredito\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

	constructor(value: string) {
		super(value)
		if (!UserEmail.isValid(value)) {
			throw new Error(UserEmail.invalidMessage(value))
		}
	}

	public static isValid(value: string): boolean {
		return UserEmail.validEmailRegExp.test(value)
	}

	public static invalidMessage(value: string): string {
		return `El email ${value} no es válido.`
	}
}
