import { ISPLink } from '../domain/entity/ISPLink'
import { ISPLinkId } from '../domain/value-object/ISPLinkId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import type { ISPLinkSaveRepository } from '../domain/repository/ISPLinkSaveRepository'
import { type ISPLinkParams } from '../domain/dto/ISPLink.dto'

export class ISPLinkCreator {
	constructor(
		readonly repository: ISPLinkSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: ISPLinkParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = ISPLink.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new ISPLinkId(params.id).value, payload })
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
