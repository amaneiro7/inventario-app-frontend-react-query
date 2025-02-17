import { Source } from '@/types/type'
import { DeviceDownloadRepository } from '../domain/repository/DeviceDownloadRepository'
import {
	createDeviceQueryParams,
	DeviceComputerFilters
} from './computerFilter/CreateDeviceComputerParams'
import { EventManager } from '@/core/shared/domain/Observer/EventManager'

export class DeviceDownload {
	constructor(
		private readonly repository: DeviceDownloadRepository,
		private readonly events: EventManager
	) {}

	async run({
		orderBy = 'employeeId',
		orderType,
		source,
		...options
	}: DeviceComputerFilters & { source: Source }) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			const queryParams = await createDeviceQueryParams({
				pageNumber: undefined,
				pageSize: undefined,
				orderBy,
				orderType,
				defaultQuery: source,
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
