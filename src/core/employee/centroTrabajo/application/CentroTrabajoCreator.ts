import { CentroTrabajo } from '../domain/entity/CentroTrabajo'
import { CentroTrabajoId } from '../domain/value-object/CentroTrabajoId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type CentroTrabajoSaveRepository } from '../domain/repository/CentroTrabajoSaveRepository'
import { type CentroTrabajo as CentroTrabajoParams } from '../domain/dto/CentroTrabajo.dto'

export class CentroTrabajoCreator {
	constructor(
		readonly repository: CentroTrabajoSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: CentroTrabajoParams) {
		try {
			const payload = CentroTrabajo.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new CentroTrabajoId(params.id).value
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
