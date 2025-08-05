import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'

/**
 * Abstract class for a repository that provides methods for deleting user accounts.
 */
export abstract class DeleteUserRepository {
	/**
	 * Abstract method to delete a user by their ID.
	 * @param params - An object containing the ID of the user to delete.
	 * @param params.id - The primitive value of the UserId.
	 * @returns A Promise that resolves when the deletion is complete.
	 */
	abstract run({ id }: { id: Primitives<UserId> }): Promise<void>
}