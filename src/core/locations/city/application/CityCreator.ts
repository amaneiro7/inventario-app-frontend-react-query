import { City } from '../domain/entity/City'
import { CityId } from '../domain/value-object/CityId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type CitySaveRepository } from '../domain/repository/CitySaveRepository'
import { type CityParams } from '../domain/dto/City.dto'

export class CityCreator {
	constructor(readonly repository: CitySaveRepository, private readonly events: EventManager) {}

	async create(params: CityParams) {
		try {
			const payload = City.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new CityId(params.id).value
				return await this.repository.update({ id, payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			}
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
			throw new Error(`${error}`)
		}
	}
}
