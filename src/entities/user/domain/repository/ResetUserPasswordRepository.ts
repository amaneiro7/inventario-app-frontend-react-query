import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'

/**
 * Abstract class for a repository that provides methods for resetting user passwords.
 */
export abstract class ResetUserPasswordRepository {
	/**
	 * Abstract method to reset a user's password by their ID.
	 * @param params - An object containing the ID of the user whose password is to be reset.
	 * @param params.id - The primitive value of the UserId.
	 * @returns A Promise that resolves when the password reset is complete.
	 */
	abstract run({ id }: { id: Primitives<UserId> }): Promise<void>
}