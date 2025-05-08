import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type UserId } from '../domain/value-objects/UserId'
import { DeleteUserRepository } from '../domain/repository/DeleteUserRepository'

export class DeleteUser {
	constructor(
		private readonly deleteUserRepository: DeleteUserRepository,
		private readonly events: EventManager
	) {}

	async execute({ id }: { id: Primitives<UserId> }) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			return await this.deleteUserRepository.run({ id }).then(res => {
				this.events.notify({
					type: 'success',
					message: 'Opearción exitosa'
				})
				return res
			})
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}
