import type { Source } from '@/types/type'
import type { EventManager } from '@/entities/shared/domain/Observer/EventManager'
import type { EvaluationHardwareDownloadRepository } from '../domain/repository/EvaluationHardwareDownloadRepository'
import {
	createEvaluationHardwareDashboardParams,
	type EvaluationHardwareDashboardFilters
} from './createEvaluationHardwareQueryParams'

/**
 * @class EvaluationHardwareDownload
 * @description Application service responsible for downloading EvaluationHardware data.
 */
export class EvaluationHardwareDownload {
	/**
	 * @param {EvaluationHardwareDownloadRepository} repository - The repository for downloading EvaluationHardware data.
	 * @param {EventManager} events - The event manager to notify about process status (loading, success, error).
	 */
	constructor(
		private readonly repository: EvaluationHardwareDownloadRepository,
		private readonly events: EventManager
	) {}

	/**
	 * @description Initiates the download of EvaluationHardware data based on provided filters.
	 * @param {object} params - Parameters for the download.
	 * @param {EvaluationHardwareBaseFilters} params.query - The filters to apply for the EvaluationHardware data.
	 * @param {Source} params.source - The source of the download (e.g., 'computer', 'model').
	 * @returns {Promise<void>} A promise that resolves when the download is initiated.
	 * @throws {Error} Throws an error if the download process fails.
	 */
	async run({
		orderBy = 'locationId',
		orderType,
		source,
		...options
	}: EvaluationHardwareDashboardFilters & { source: Source }) {
		try {
			this.events.notify({ type: 'loading', message: 'Procesando...' })

			const queryParams = await createEvaluationHardwareDashboardParams({
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
			console.error(error)
			this.events.notify({ type: 'error', message: `${error}` })
		}
	}
}
