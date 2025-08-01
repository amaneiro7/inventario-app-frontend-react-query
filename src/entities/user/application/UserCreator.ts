import { User } from '../domain/entity/User'
import { UserId } from '../domain/value-objects/UserId'
import { type UserParams } from '../domain/dto/LoginUser.dto'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type UserSaveRepository } from '../domain/repository/UserSaveRepository'

export class UserCreator {
	constructor(
		readonly repository: UserSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: UserParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = User.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new UserId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw new Error(errorMessage)
		}
	}
}
