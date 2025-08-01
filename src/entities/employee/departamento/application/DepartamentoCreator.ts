import { Departamento } from '../domain/entity/Departamento'
import { DepartamentoId } from '../domain/value-object/DepartamentoId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type DepartamentoSaveRepository } from '../domain/repository/DepartamentoSaveRepository'
import { type DepartamentoParams } from '../domain/dto/Departamento.dto'

export class DepartamentoCreator {
	constructor(
		readonly repository: DepartamentoSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: DepartamentoParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Departamento.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new DepartamentoId(params.id).value, payload })
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
