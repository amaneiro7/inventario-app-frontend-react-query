import { type Source } from '@/types/type'
import { type EmployeeDownloadRepository } from '../domain/repository/EmployeeDownloadRepository'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { createEmployeeParams, type EmployeeFilters } from './createEmployeeQueryParams'

/**
 * @class DeviceDownload
 * @description Application service responsible for downloading device data.
 */
export class EmployeeDownload {
	/**
	 * @param {EmployeeDownloadRepository} repository - The repository for downloading employee data.
	 * @param {EventManager} events - The event manager to notify about process status (loading, success, error).
	 */
	constructor(
		private readonly repository: EmployeeDownloadRepository,
		private readonly events: EventManager
	) {}

	/**
	 * @description Initiates the download of employee data based on provided filters.
	 * @param {object} params - Parameters for the download.
	 * @param {EmployeeFilters} params.query - The filters to apply for the employee data.
	 * @param {Source} params.source - The source of the download (e.g., 'computer', 'model').
	 * @returns {Promise<void>} A promise that resolves when the download is initiated.
	 * @throws {Error} Throws an error if the download process fails.
	 */
	async run({
		orderBy = 'employeeId',
		orderType,
		source,
		...options
	}: EmployeeFilters & { source: Source }): Promise<void> {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			const queryParams = await createEmployeeParams({
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
