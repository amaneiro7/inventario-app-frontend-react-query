import { employeeUrl } from '../../domain/entity/baseUrl'
import { fetching } from '@/shared/api/api'
import { type Source } from '@/types/type'
import { type EmployeeDownloadRepository } from '../../domain/repository/EmployeeDownloadRepository'

export class EmployeeDownloadService implements EmployeeDownloadRepository {
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
				url: `${employeeUrl}/download?${queryParams}`
			},
			source
		)
	}
}
