import { Cargo } from '../domain/entity/Cargo'
import { CargoId } from '../domain/value-object/CargoId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type CargoSaveRepository } from '../domain/repository/CargoSaveRepository'
import { type CargoParams } from '../domain/dto/Cargo.dto'

export class CargoCreator {
	constructor(readonly repository: CargoSaveRepository, private readonly events: EventManager) {}

	async create(params: CargoParams) {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Cargo.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new CargoId(params.id).value, payload })
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
