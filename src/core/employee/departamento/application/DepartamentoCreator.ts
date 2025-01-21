import { Departamento } from '../domain/entity/Departamento'
import { DepartamentoId } from '../domain/value-object/DepartamentoId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type DepartamentoSaveRepository } from '../domain/repository/DepartamentoSaveRepository'
import { type DepartamentoParams } from '../domain/dto/Departamento.dto'

export class DepartamentoCreator {
	constructor(
		readonly repository: DepartamentoSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: DepartamentoParams) {
		try {
			const payload = Departamento.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new DepartamentoId(params.id).value
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
