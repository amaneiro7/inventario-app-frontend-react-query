import { City } from '../domain/entity/City'
import { CityId } from '../domain/value-object/CityId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type CitySaveRepository } from '../domain/repository/CitySaveRepository'
import { type CityParams } from '../domain/dto/City.dto'

export class CityCreator {
	constructor(
		readonly repository: CitySaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: CityParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = City.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new CityId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			return { message: errorMessage }
		}
	}
}
