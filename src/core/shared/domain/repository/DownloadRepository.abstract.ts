import { type Source } from '@/types/type'

export abstract class DownloadRepository {
	abstract download({
		source,
		queryParams
	}: {
		queryParams?: string
		source: Source
	}): Promise<void>
}
