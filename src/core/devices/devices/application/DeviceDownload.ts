import { Source } from '@/types/type'
import { DeviceDownloadRepository } from '../domain/repository/DeviceDownloadRepository'
import { createDeviceQueryParams, DeviceComputerFilters } from './CreateDeviceComputerParams'
import { EventManager } from '@/core/shared/domain/Observer/EventManager'

export class DeviceDownload {
	constructor(
		private readonly repository: DeviceDownloadRepository,
		private readonly events: EventManager
	) {}

	async run({
		options,
		pageNumber,
		pageSize,
		source
	}: DeviceComputerFilters & { source: Source }) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			const queryParams = await createDeviceQueryParams({ options, pageNumber, pageSize })

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
