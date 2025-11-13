import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type LoginParams } from '../domain/dto/LoginAuth.dto'
import { type LoginUserRepository } from '../domain/repository/loginUserRepository'
import { PasswordExpiredError } from '../domain/errors/PasswordExpiredError'

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
	async execute(params: LoginParams) {
		try {
			const res = await this.loginUserRepository.run(params)

			// 1. Manejo de éxito
			this.events.notify({ type: 'success', message: res.message })
			return res
		} catch (error) {
			// 2. Manejo del flujo especial (Error de Dominio)
			if (error instanceof PasswordExpiredError) {
				// Notificamos un error, pero lanzamos el error de dominio para que el
				// caller (UI/Controller) pueda interceptarlo y manejar el flujo de "cambio de contraseña".
				// Opcionalmente: No notificamos aquí para que la UI maneje el modal directamente

				// NOTA: Si prefieres no notificar el toast para este error específico:
				this.events.notify({
					//type: 'special_flow',
					type: 'error',
					message: error.message ?? 'Contraseña expirada, redirigiendo.'
				})
				throw error
			}
			// 3. Manejo de errores genéricos (Otros errores de dominio o errores desconocidos)
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}
