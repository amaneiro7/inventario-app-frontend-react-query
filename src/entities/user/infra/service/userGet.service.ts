import { fetching } from '@/shared/api/api'
import { userURL } from '../../domain/entity/baseUrl'
import { type UserGetRepository } from '../../domain/repository/UserGetRepository'
import { type LoginUserDto } from '../../domain/dto/LoginUser.dto'
import { type UserId } from '../../domain/value-objects/UserId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class UserGetService implements UserGetRepository {
	async getById({ id }: { id: Primitives<UserId> }): Promise<LoginUserDto> {
		return await fetching<LoginUserDto>({
			url: `${userURL}/${id}`,
			method: 'GET'
		})
	}
}
