import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'

export abstract class DeleteUserRepository {
	abstract run({ id }: { id: Primitives<UserId> }): Promise<void>
}
