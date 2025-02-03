import { fetching } from '@/api/api'
import { type Response } from '@/core/shared/domain/methods/Response'
import { type TypeOfSiteGetAllRepository } from '../domain/repository/TypeOfSiteGetAllRepository'
import { type TypeOfSiteDto } from '../domain/dto/TypeOfSite.dto'
import { typeOfSiteUrl } from '../domain/entity/baseUrl'

export class TypeOfSiteGetAllService implements TypeOfSiteGetAllRepository {
	async getAll(queryParams: string): Promise<Response<TypeOfSiteDto>> {
		return await fetching({
			url: `${typeOfSiteUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
