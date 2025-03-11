import { Brand } from '../domain/entity/Brand'
import { BrandId } from '../domain/value-object/BrandId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type BrandSaveRepository } from '../domain/repository/BrandSaveRepository'
import { type BrandParams } from '../domain/dto/Brand.dto'

export class BrandCreator {
	constructor(readonly repository: BrandSaveRepository, private readonly events: EventManager) {}

	async create(params: BrandParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Brand.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new BrandId(params.id).value, payload })
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
