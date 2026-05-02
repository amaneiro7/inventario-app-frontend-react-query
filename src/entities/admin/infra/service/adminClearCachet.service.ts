import { fetching } from '@/shared/api/api'
import { clearCacheUrl } from '../../domain/entity/baseUrl'
import type { ClearCacheRepository } from '../../domain/repostory/ClearCachetRepository'
import type { ClearCacheParams, ClearCacheResponse } from '../../domain/dto/ClearCache.dto'

export class CLearCacheService implements ClearCacheRepository {
	async run(params: ClearCacheParams): Promise<ClearCacheResponse> {
		return await fetching({
			method: 'POST',
			url: clearCacheUrl,
			data: params
		})
	}
}
