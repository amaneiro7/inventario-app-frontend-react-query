import { Site } from '../domain/entity/Site'
import { SiteId } from '../domain/value-object/SiteId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type SiteSaveRepository } from '../domain/repository/SiteSaveRepository'
import { type SiteParams } from '../domain/dto/Site.dto'

export class SiteCreator {
	constructor(readonly repository: SiteSaveRepository, private readonly events: EventManager) {}

	async create(params: SiteParams) {
		try {
			const payload = Site.create(params).toPrimitives()
			if (!params.id) {
				return await this.repository.save({ payload }).then(res => {
					this.events.notify({
						type: 'success',
						message: res.message
					})
					return res
				})
			} else {
				const siteId = new SiteId(params.id).value
				return await this.repository.update({ id: siteId, payload }).then(res => {
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
