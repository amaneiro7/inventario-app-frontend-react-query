import { fetching } from '@/shared/api/api'
import { ForceChangePasswordRepository } from '../../domain/repository/ForceChangePasswordRepository'
import { type ChangeExpiredPasswordParams } from '../../domain/dto/ChangePasword.dto'

export class ExpiredPasswordChangeService implements ForceChangePasswordRepository {
	async run({
		tempToken,
		newPassword,
		reTypePassword
	}: ChangeExpiredPasswordParams): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: 'users/change-expired-password',
			data: { newPassword, reTypePassword },
			headers: {
				Authorization: `Bearer ${tempToken}`
			}
		})
	}
}
