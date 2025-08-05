import { modelUrl } from '../../domain/entity/baseUrl'
import { fetching } from '@/shared/api/api'
import { type Source } from '@/types/type'
import { type ModelDownloadRepository } from '../../domain/repository/ModelDownloadRepository'

export class ModelDownloadService implements ModelDownloadRepository {
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
