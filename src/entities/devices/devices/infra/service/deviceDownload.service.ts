import { deviceUrl } from '../../domain/entity/baseUrl'
import { fetching } from '@/shared/api/api'
import { type Source } from '@/types/type'
import { type DeviceDownloadRepository } from '../../domain/repository/DeviceDownloadRepository'

export class DeviceDownloadService implements DeviceDownloadRepository {
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
				url: `${deviceUrl}/download?${queryParams}`
			},
			source
		)
	}
}
