import { Processor } from '../domain/entity/Processor'
import { ProcessorId } from '../domain/value-object/ProcessorId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type ProcessorSaveRepository } from '../domain/repository/ProcessorSaveRepository'
import { type ProcessorParams } from '../domain/dto/Processor.dto'

export class ProcessorCreator {
	constructor(
		readonly repository: ProcessorSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: ProcessorParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Processor.create(params).toPrimitives()
			// Guarda o actualiza el procesador basado en si existe un ID.
			const result = params.id
				? await this.repository.update({ id: new ProcessorId(params.id).value, payload })
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
