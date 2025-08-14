import { Site } from '../domain/entity/Site'
import { SiteId } from '../domain/value-object/SiteId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type SiteSaveRepository } from '../domain/repository/SiteSaveRepository'
import { type SiteParams } from '../domain/dto/Site.dto'

export class SiteCreator {
	constructor(
		readonly repository: SiteSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: SiteParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Site.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new SiteId(params.id).value, payload })
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
