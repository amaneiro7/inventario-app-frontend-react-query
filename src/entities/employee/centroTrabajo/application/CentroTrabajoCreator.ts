import { CentroTrabajo } from '../domain/entity/CentroTrabajo'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type CentroTrabajoSaveRepository } from '../domain/repository/CentroTrabajoSaveRepository'
import { type CentroTrabajoParams } from '../domain/dto/CentroTrabajo.dto'

export class CentroTrabajoCreator {
	constructor(
		readonly repository: CentroTrabajoSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: CentroTrabajoParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = CentroTrabajo.create(params).toPrimitives()
			const result = await this.repository.save({ payload })
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
