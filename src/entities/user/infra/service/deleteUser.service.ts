import { fetching } from '@/shared/api/api'
import { userURL } from '../../domain/entity/baseUrl'
import { DeleteUserRepository } from '../../domain/repository/DeleteUserRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../../domain/value-objects/UserId'

export class DeleteUserService implements DeleteUserRepository {
	async run({ id }: { id: Primitives<UserId> }): Promise<void> {
		return await fetching({
			method: 'DELETE',
			url: userURL,
			data: { id }
		})
	}
}
