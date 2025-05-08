import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'

export abstract class ResetUserPasswordRepository {
	abstract run({ id }: { id: Primitives<UserId> }): Promise<void>
}
