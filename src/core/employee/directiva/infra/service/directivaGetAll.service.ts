import { fetching } from '@/api/api'
import { type DirectivaGetAllRepository } from '../../domain/repository/DirectivaGetAllRepository'
import { type Response } from '@/core/shared/domain/methods/Response'
import { type DirectivaDto } from '../../domain/dto/Directiva.dto'
import { directivaUrl } from '../../domain/entity/baseUrl'

export class DirectivaGetAllService implements DirectivaGetAllRepository {
	async getAll(queryParams: string): Promise<Response<DirectivaDto>> {
		return await fetching({
			url: `${directivaUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
