import { EnumValueObject } from '@/entities/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

export enum UserStatusEnum {
	ACTIVE = 'ACTIVE',
	LOCKED = 'LOCKED', // Bloqueado por intentos fallidos
	SUSPENDED = 'SUSPENDED' // Suspendido por un administrador
}

/**
 * @description Represents the status of a user in the system.
 */
export class UserStatus extends EnumValueObject<UserStatusEnum> {
	constructor(value: UserStatusEnum) {
		super(value, Object.values(UserStatusEnum))
	}

	protected throwErrorForInvalidValue(value: UserStatusEnum): void {
		throw new InvalidArgumentError(`El estatus de usuario '${value}' es inválida.`)
	}
}
