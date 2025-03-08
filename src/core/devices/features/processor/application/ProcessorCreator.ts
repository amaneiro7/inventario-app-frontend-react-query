import { Processor } from '../domain/entity/Processor'
import { ProcessorId } from '../domain/value-object/ProcessorId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type ProcessorSaveRepository } from '../domain/repository/ProcessorSaveRepository'
import { type ProcessorParams } from '../domain/dto/Processor.dto'

export class ProcessorCreator {
	constructor(
		readonly repository: ProcessorSaveRepository,
		private readonly events: EventManager
	) {}

	async create(params: ProcessorParams) {
		try {
			const payload = Processor.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const id = new ProcessorId(params.id).value
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
