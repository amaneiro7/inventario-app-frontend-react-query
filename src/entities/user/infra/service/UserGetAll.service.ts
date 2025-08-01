import { fetching } from '@/shared/api/api'
import { type LoginUserDto } from '../../domain/dto/LoginUser.dto'
import { type UserGetAllRepository } from '../../domain/repository/UserGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { userURL } from '../../domain/entity/baseUrl'

export class UserGetAllService implements UserGetAllRepository {
	async getAll(queryParams: string): Promise<Response<LoginUserDto>> {
		return await fetching({
			url: `${userURL}?${queryParams}`,
			method: 'GET'
		})
	}
}
