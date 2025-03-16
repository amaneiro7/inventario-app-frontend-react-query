import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { StatusId } from '@/core/status/domain/value-object/StatusId'

export class IPAddress extends AcceptedNullValueObject<string> {
	static readonly IPADRRESS_VALIDATION =
		/^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/
	private static errors = ''
	constructor(value: string | null, private readonly status: Primitives<StatusId>) {
		super(value)

		if (!IPAddress.isValid({ value: this.value, status: this.status })) {
			throw new Error(IPAddress.invalidMessage())
		}
	}

	static updateError(error: string): void {
		IPAddress.errors = error
	}

	private static get errorsValue(): string {
		return IPAddress.errors
	}

	public static isValid({
		value,
		status
	}: {
		value: Primitives<IPAddress>
		status?: Primitives<StatusId>
	}): boolean {
		IPAddress.updateError('')
		if (!status) return true // No hay validaciones si no hay status
		switch (status) {
			case StatusOptions.INUSE:
				if (!value) {
					IPAddress.updateError('Si el equipo esta en uso la dirección IP es requerida.')
					return false
				}
				break
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
			case StatusOptions.DESINCORPORADO:
				if (value) {
					IPAddress.updateError(
						'Si el equipo no está en uso, no puede tener dirección IP.'
					)
					return false
				}
				return true // No hay más validaciones si no está en uso
			default:
				break
		}
		if (!value) {
			return true
		}

		if (!IPAddress.IPADRRESS_VALIDATION.test(value)) {
			IPAddress.updateError(
				`No es un dirección IP válida, el formato debe tener un formato xxx.xxx.xxx.xxx`
			)
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return IPAddress.errorsValue
	}
}
