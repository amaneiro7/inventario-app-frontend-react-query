import { Cargo } from '../domain/entity/Cargo'
import { CargoId } from '../domain/value-object/CargoId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type CargoSaveRepository } from '../domain/repository/CargoSaveRepository'
import { type CargoParams } from '../domain/dto/Cargo.dto'

export class CargoCreator {
	constructor(
		readonly repository: CargoSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: CargoParams) {
		try {
			const payload = Cargo.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new CargoId(params.id).value
				return await this.repository
					.update({ id, payload })
					.then(res => {
						this.events.notify({
							type: 'success',
							message: res.message
						})
						return res
					})
			}
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}
