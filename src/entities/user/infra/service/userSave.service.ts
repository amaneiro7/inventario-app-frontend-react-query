import { fetching } from '@/shared/api/api'
import { userURL } from '../../domain/entity/baseUrl'
import { type UserSaveRepository } from '../../domain/repository/UserSaveRepository'
import { type UserPrimitives } from '../../domain/dto/LoginUser.dto'

export class UserSaveService implements UserSaveRepository {
	async save({ payload }: { payload: UserPrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: `${userURL}/register`, data: payload })
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: UserPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${userURL}/update`,
			data: { id, payload }
		})
	}
}
