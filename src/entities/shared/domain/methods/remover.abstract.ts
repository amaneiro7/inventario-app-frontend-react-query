import { type EventManager } from '../Observer/EventManager'
import { type DeleteRepository } from '../repository/DeleteRepository.abstract'

/**
 * @interface DeletionResponse
 * @description Define la estructura esperada para la respuesta de una operación de eliminación que devuelve un mensaje.
 */
interface DeletionResponse {
	message: string
}

export abstract class DeleteBaseService<ID, T extends DeletionResponse | void> {
	constructor(
		private readonly repository: DeleteRepository<ID, T>,
		private readonly events: EventManager
	) {}

	async execute({ id }: { id: ID }): Promise<T> {
		try {
			this.events.notify({ type: 'loading' })
			const result: T = await this.repository.deleteById({ id })
			this.events.notify({
				type: 'success',
				message: (result as DeletionResponse)?.message ?? 'Eliminación exitosa.'
			})
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw new Error(errorMessage)
		}
	}
}
