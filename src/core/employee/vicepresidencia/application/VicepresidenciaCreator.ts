import { Vicepresidencia } from '../domain/entity/Vicepresidencia'
import { VicepresidenciaId } from '../domain/value-object/VicepresidenciaId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type VicepresidenciaSaveRepository } from '../domain/repository/VicepresidenciaSaveRepository'
import { type VicepresidenciaParams } from '../domain/dto/Vicepresidencia.dto'

export class VicepresidenciaCreator {
	constructor(
		readonly repository: VicepresidenciaSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: VicepresidenciaParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Vicepresidencia.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({
						id: new VicepresidenciaId(params.id).value,
						payload
				  })
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
