import { fetching } from '@/shared/api/api'
import { userURL } from '../../domain/entity/baseUrl'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../../domain/value-objects/UserId'
import { type UnlockAccountRepository } from '../../domain/repository/UnlockAccountRepository'

export class UnlockAccountService implements UnlockAccountRepository {
	async run({ id }: { id: Primitives<UserId> }): Promise<void> {
		return await fetching({
			method: 'PATCH',
			url: `${userURL}/unlock`,
			data: { id }
		})
	}
}
