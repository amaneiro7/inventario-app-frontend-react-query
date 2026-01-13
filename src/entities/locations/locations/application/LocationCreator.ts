import { Location } from '../domain/entity/Location'
import { LocationId } from '../domain/value-object/LocationId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type LocationSaveRepository } from '../domain/repository/LocationSaveRepository'
import { type LocationParams } from '../domain/dto/Location.dto'

export class LocationCreator {
	constructor(
		readonly repository: LocationSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: LocationParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Location.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new LocationId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw error
		}
	}
}
