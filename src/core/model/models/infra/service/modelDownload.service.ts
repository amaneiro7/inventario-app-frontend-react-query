import { type Source } from '@/types/type'
import { type ModelDownloadRepository } from '../../domain/repository/ModelDownloadRepository'
import { apiDownload } from '@/api/apiDownload'
import { modelUrl } from '../../domain/entity/baseUrl'

export class ModelDownloadService implements ModelDownloadRepository {
	async download({
		source,
		queryParams
	}: {
		queryParams?: string
		source: Source
	}): Promise<void> {
		return await apiDownload(
			{
				method: 'GET',
				url: `${modelUrl}/download?${queryParams}`
			},
			source
		)
	}
}
