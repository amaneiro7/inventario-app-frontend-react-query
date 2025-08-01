import { VicepresidenciaEjecutiva } from '../domain/entity/VicepresidenciaEjecutiva'
import { VicepresidenciaEjecutivaId } from '../domain/value-object/VicepresidenciaEjecutivaId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type VicepresidenciaEjecutivaSaveRepository } from '../domain/repository/VicepresidenciaEjecutivaSaveRepository'
import { type VicepresidenciaEjecutivaParams } from '../domain/dto/VicepresidenciaEjecutiva.dto'

export class VicepresidenciaEjecutivaCreator {
	constructor(
		readonly repository: VicepresidenciaEjecutivaSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: VicepresidenciaEjecutivaParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = VicepresidenciaEjecutiva.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({
						id: new VicepresidenciaEjecutivaId(params.id).value,
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
