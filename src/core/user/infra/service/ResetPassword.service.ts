import { fetching } from '@/api/api'
import { userURL } from '../../domain/entity/baseUrl'
import { type ResetUserPasswordRepository } from '../../domain/repository/ResetUserPasswordRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type UserId } from '../../domain/value-objects/UserId'

export class ResetPasswordService implements ResetUserPasswordRepository {
	async run({ id }: { id: Primitives<UserId> }): Promise<void> {
		return await fetching({
			method: 'PATCH',
			url: `${userURL}/reset-password`,
			data: { id }
		})
	}
}
