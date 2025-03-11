import { CentroCosto } from '../domain/entity/CentroCosto'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type CentroCostoSaveRepository } from '../domain/repository/CentroCostoSaveRepository'
import { type CentroCosto as CentroCostoParams } from '../domain/dto/CentroCosto.dto'

export class CentroCostoCreator {
	constructor(
		readonly repository: CentroCostoSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: CentroCostoParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = CentroCosto.create(params).toPrimitives()
			const result = await this.repository.save({ payload })
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
