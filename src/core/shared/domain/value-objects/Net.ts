import { AcceptedNullValueObject } from './AcceptedNullValueObject'
import { type Primitives } from './Primitives'

export class Net extends AcceptedNullValueObject<string> {
	static readonly IPADRRESS_VALIDATION =
		/^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/
	private static errors = ''
	constructor(value: string | null) {
		super(value)

		if (!Net.isValid(this.value)) {
			throw new Error(Net.invalidMessage())
		}
	}

	static updateError(error: string): void {
		this.errors = error
	}

	private static get errorsValue(): string {
		return this.errors
	}

	public static isValid(value: Primitives<Net>): boolean {
		if (!value) {
			this.updateError('')
			return true
		}
		const isMatch = this.IPADRRESS_VALIDATION.test(value)
		if (!isMatch) {
			this.updateError(
				`"${value}" no es un dirección IP válida, el formato debe tener un formato xxx.xxx.xxx.xxx`
			)
			return false
		}
		this.updateError('')
		return true
	}

	public static invalidMessage(): string {
		return this.errorsValue
	}
}
