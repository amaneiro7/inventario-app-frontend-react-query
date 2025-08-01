import { Directiva } from '../domain/entity/Directiva'
import { DirectivaId } from '../domain/value-object/DirectivaId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type DirectivaSaveRepository } from '../domain/repository/DirectivaSaveRepository'
import { type DirectivaParams } from '../domain/dto/Directiva.dto'

export class DirectivaCreator {
	constructor(
		readonly repository: DirectivaSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: DirectivaParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Directiva.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new DirectivaId(params.id).value, payload })
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
