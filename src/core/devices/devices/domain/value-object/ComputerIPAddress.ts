import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class IPAddress extends AcceptedNullValueObject<string> {
	static readonly IPADRRESS_VALIDATION =
		/^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/
	private static errors = ''
	constructor(
		value: string | null,
		private readonly status: (typeof StatusOptions)[keyof typeof StatusOptions]
	) {
		super(value)

		if (!IPAddress.isValid(this.value, this.status)) {
			throw new Error(IPAddress.invalidMessage())
		}
	}

	static updateError(error: string): void {
		IPAddress.errors = error
	}

	private static get errorsValue(): string {
		return IPAddress.errors
	}

	public static isValid(
		value: Primitives<IPAddress>,
		status: (typeof StatusOptions)[keyof typeof StatusOptions]
	): boolean {
		if (!status) return true
		if (StatusOptions.INUSE === status && !value) {
			IPAddress.updateError('Si el equipo esta en uso la dirección IP es requerida.')
			return false
		}
		const notAllowedStausOptions = [
			StatusOptions.INALMACEN,
			StatusOptions.PORDESINCORPORAR,
			StatusOptions.DESINCORPORADO
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (notAllowedStausOptions.includes(status) && value) {
			IPAddress.updateError('Si el equipo no está en uso, no puede tener dirección IP.')
			return false
		}
		if (!value) {
			IPAddress.updateError('')
			return true
		}
		const isMatch = IPAddress.IPADRRESS_VALIDATION.test(value)
		if (!isMatch) {
			IPAddress.updateError(
				`"${value}" no es un dirección IP válida, el formato debe tener un formato xxx.xxx.xxx.xxx`
			)
			return false
		}
		IPAddress.updateError('')
		return true
	}

	public static invalidMessage(): string {
		return IPAddress.errorsValue
	}
}
