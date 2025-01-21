import { CentroCosto } from '../domain/entity/CentroCosto'
import { CentroCostoId } from '../domain/value-object/CentroCostoId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type CentroCostoSaveRepository } from '../domain/repository/CentroCostoSaveRepository'
import { type CentroCosto as CentroCostoParams } from '../domain/dto/CentroCosto.dto'

export class CentroCostoCreator {
	constructor(
		readonly repository: CentroCostoSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: CentroCostoParams) {
		try {
			const payload = CentroCosto.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new CentroCostoId(params.id).value
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
