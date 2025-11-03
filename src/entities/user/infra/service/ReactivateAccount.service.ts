import { fetching } from '@/shared/api/api'
import { userURL } from '../../domain/entity/baseUrl'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../../domain/value-objects/UserId'
import { type ReactivateAccountRepository } from '../../domain/repository/ReactivateAccountRepository'

export class ReactivateAccountService implements ReactivateAccountRepository {
	async run({ id }: { id: Primitives<UserId> }): Promise<void> {
		return await fetching({
			method: 'PATCH',
			url: `${userURL}/reactivate`,
			data: { id }
		})
	}
}
