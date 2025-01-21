import { Directiva } from '../domain/entity/Directiva'
import { DirectivaId } from '../domain/value-object/DirectivaId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type DirectivaSaveRepository } from '../domain/repository/DirectivaSaveRepository'
import { type Directiva as DirectivaParams } from '../domain/dto/Directiva.dto'

export class DirectivaCreator {
	constructor(
		readonly repository: DirectivaSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: DirectivaParams) {
		try {
			const payload = Directiva.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new DirectivaId(params.id).value
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
