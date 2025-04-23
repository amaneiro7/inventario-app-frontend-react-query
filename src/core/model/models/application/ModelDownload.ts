import { type Source } from '@/types/type'
import { type ModelDownloadRepository } from '../domain/repository/ModelDownloadRepository'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { createModelParams, type ModelFilters } from './CreateModelsQueryParams'

export class ModelDownload {
	constructor(
		private readonly repository: ModelDownloadRepository,
		private readonly events: EventManager
	) {}

	async run({
		orderBy = 'employeeId',
		orderType,
		source,
		...options
	}: ModelFilters & { source: Source }) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			const queryParams = await createModelParams({
				pageSize: undefined,
				orderBy,
				orderType,
				...options
			})

			return this.repository.download({ source, queryParams }).then(res => {
				this.events.notify({
					type: 'success',
					message: 'Descarga exitosa'
				})

				return res
			})
		} catch (error) {
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}
