import { VicepresidenciaEjecutiva } from '../domain/entity/VicepresidenciaEjecutiva'
import { VicepresidenciaEjecutivaId } from '../domain/value-object/VicepresidenciaEjecutivaId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type VicepresidenciaEjecutivaSaveRepository } from '../domain/repository/VicepresidenciaEjecutivaSaveRepository'
import { type VicepresidenciaEjecutiva as VicepresidenciaEjecutivaParams } from '../domain/dto/VicepresidenciaEjecutiva.dto'

export class VicepresidenciaEjecutivaCreator {
	constructor(
		readonly repository: VicepresidenciaEjecutivaSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: VicepresidenciaEjecutivaParams) {
		try {
			const payload =
				VicepresidenciaEjecutiva.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new VicepresidenciaEjecutivaId(params.id).value
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
