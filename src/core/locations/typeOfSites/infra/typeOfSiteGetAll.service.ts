import { fetching } from '@/api/api'
import { typeOfSiteUrl } from '../domain/entity/baseUrl'
import { type TypeOfSiteGetAllRepository } from '../domain/repository/TypeOfSiteGetAllRepository'
import { type TypeOfSiteDto } from '../domain/dto/TypeOFSite.dto'

export class TypeOfSiteGetAllService implements TypeOfSiteGetAllRepository {
	async getAll(): Promise<TypeOfSiteDto[]> {
		return await fetching<TypeOfSiteDto[]>({
			url: typeOfSiteUrl,
			method: 'GET'
		})
	}
}
