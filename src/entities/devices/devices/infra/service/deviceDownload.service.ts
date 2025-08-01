import { type Source } from '@/types/type'
import { type DeviceDownloadRepository } from '../../domain/repository/DeviceDownloadRepository'
import { apiDownload } from '@/shared/api/apiDownload'
import { deviceUrl } from '../../domain/entity/baseUrl'

export class DeviceDownloadService implements DeviceDownloadRepository {
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
				url: `${deviceUrl}/download?${queryParams}`
			},
			source
		)
	}
}
