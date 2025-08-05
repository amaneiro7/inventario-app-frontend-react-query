import {
	createDeviceQueryParams,
	type DeviceBaseFilters
} from '@/entities/devices/devices/application/createDeviceQueryParams'
import { type Source } from '@/types/type'
import { type DeviceDownloadRepository } from '../domain/repository/DeviceDownloadRepository'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'

/**
 * @class DeviceDownload
 * @description Application service responsible for downloading device data.
 */
export class DeviceDownload {
	/**
	 * @param {DeviceDownloadRepository} repository - The repository for downloading device data.
	 * @param {EventManager} events - The event manager to notify about process status (loading, success, error).
	 */ constructor(
		private readonly repository: DeviceDownloadRepository,
		private readonly events: EventManager
	) {}

	/**
	 * @description Initiates the download of device data based on provided filters.
	 * @param {object} params - Parameters for the download.
	 * @param {DeviceBaseFilters} params.query - The filters to apply for the device data.
	 * @param {Source} params.source - The source of the download (e.g., 'computer', 'model').
	 * @returns {Promise<void>} A promise that resolves when the download is initiated.
	 * @throws {Error} Throws an error if the download process fails.
	 */ async run({
		orderBy = 'employeeId',
		orderType,
		source,
		...options
	}: DeviceBaseFilters & { source: Source }) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			const queryParams = await createDeviceQueryParams({
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
