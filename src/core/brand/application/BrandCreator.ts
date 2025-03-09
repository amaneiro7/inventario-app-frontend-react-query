import { Brand } from '../domain/entity/Brand'
import { BrandId } from '../domain/value-object/BrandId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type BrandSaveRepository } from '../domain/repository/BrandSaveRepository'
import { type BrandParams } from '../domain/dto/Brand.dto'

export class BrandCreator {
	constructor(
		readonly repository: BrandSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: BrandParams) {
		try {
			const payload = Brand.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new BrandId(params.id).value
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
