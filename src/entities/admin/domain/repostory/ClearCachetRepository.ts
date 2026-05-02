import type { ClearCacheParams, ClearCacheResponse } from '../dto/ClearCache.dto'

export abstract class ClearCacheRepository {
	abstract run(params: ClearCacheParams): Promise<ClearCacheResponse>
}
