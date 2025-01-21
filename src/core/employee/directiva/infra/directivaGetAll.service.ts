import { fetching } from '@/api/api'
import { type DirectivaGetAllRepository } from '../domain/repository/DirectivaGetAllRepository'
import { type DirectivaDto } from '../domain/dto/Directiva.dto'
import { directivaUrl } from '../domain/entity/baseUrl'

export class DirectivaGetAllService implements DirectivaGetAllRepository {
	async getAll(): Promise<DirectivaDto[]> {
		return await fetching<DirectivaDto[]>({
			url: directivaUrl,
			method: 'GET'
		})
	}
}
