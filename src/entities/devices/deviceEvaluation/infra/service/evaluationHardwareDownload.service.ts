import { migrationRuleUrl } from '../../domain/entity/baseUrl'
import { fetching } from '@/shared/api/api'
import type { Source } from '@/types/type'
import type { EvaluationHardwareDownloadRepository } from '../../domain/repository/EvaluationHardwareDownloadRepository'

export class EvaluationHardwareDownloadService implements EvaluationHardwareDownloadRepository {
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
				url: `${migrationRuleUrl}/download?${queryParams}`
			},
			source
		)
	}
}
