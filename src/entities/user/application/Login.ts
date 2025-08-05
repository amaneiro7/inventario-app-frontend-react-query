import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type LoginParams } from '../domain/dto/LoginAuth.dto'
import { type LoginUserRepository } from '../domain/repository/loginUserRepository'

/**
 * Service class responsible for handling user login operations.
 * It interacts with a LoginUserRepository to authenticate users and an EventManager to notify about operation status.
 */
export class Login {
	/**
	 * Constructs a Login instance.
	 * @param loginUserRepository - The repository responsible for user login.
	 * @param events - The event manager to notify about the operation's progress (success, error).
	 */
	constructor(
		private readonly loginUserRepository: LoginUserRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Executes the user login operation.
	 * Event notifications are sent for success and error states.
	 * @param params - An object containing the user's email and password.
	 * @param params.email - The user's email address.
	 * @param params.password - The user's password.
	 * @returns A Promise that resolves to the result of the login operation, or undefined if an error occurs.
	 */
	async execute({ email, password }: LoginParams) {
		return await this.loginUserRepository
			.run({ email, password })
			.then(res => {
				this.events.notify({ type: 'success', message: res.message })
				return res
			})
			.catch(error => {
				this.events.notify({ type: 'error', message: `${error}` })
			})
	}
}