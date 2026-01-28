import { modelUrl } from '../../domain/entity/baseUrl'
import { fetching } from '@/shared/api/api'
import { type Source } from '@/types/type'
import { type ModelDownloadRepository } from '../../domain/repository/ModelDownloadRepository'

/**
 * Implementation of the ModelDownloadRepository interface using the fetching utility.
 * This service is responsible for downloading model data from the API.
 */
export class ModelDownloadService implements ModelDownloadRepository {
	/**
	 * Downloads model data based on provided query parameters and source.
	 * @param params - An object containing query parameters and the source for the download.
	 * @param params.queryParams - Optional query parameters as a string.
	 * @param params.source - The source of the download (e.g., 'web', 'cli').
	 * @returns A Promise that resolves when the download is complete.
	 */
	async download({
		source,
		queryParams
	}: {
		queryParams?: string
		source: Source
	}): Promise<void> {
		return await fetching(
			{
				method: 'GET',
				url: `${modelUrl}/download?${queryParams}`
			},
			source
		)
	}
}
