import { fetching } from '@/shared/api/api'
import { userURL } from '../../domain/entity/baseUrl'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../../domain/value-objects/UserId'
import { type DisableAccountRepository } from '../../domain/repository/DisableAccountRepository'

export class DisableAccountService implements DisableAccountRepository {
	async run({ id }: { id: Primitives<UserId> }): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${userURL}/disable`,
			data: { id }
		})
	}
}
