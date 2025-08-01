import { Region } from '../domain/entity/Region'
import { RegionId } from '../domain/value-object/RegionId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type RegionSaveRepository } from '../domain/repository/RegionSaveRepository'
import { type RegionParams } from '../domain/dto/region.dto'

export class RegionCreator {
	constructor(
		readonly repository: RegionSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: RegionParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Region.create(params).toPrimitives()
			if (!params.id) {
				throw new Error('id is required')
			}

			const result = await this.repository.update({
				id: new RegionId(params.id).value,
				payload
			})

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
