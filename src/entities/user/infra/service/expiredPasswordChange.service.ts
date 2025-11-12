import { fetching } from '@/shared/api/api'
import { ChangeExpiredPasswordParams } from '../../domain/dto/ChangePasword.dto'
import { ForceChangePasswordRepository } from '../../domain/repository/ForceChangePasswordRepository'

export class ExpiredPasswordChangeService implements ForceChangePasswordRepository {
	async run({
		tempToken,
		newPassword,
		reTypePassword
	}: ChangeExpiredPasswordParams): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: 'users/change-expired-password',
			data: { newPassword, reTypePassword },
			headers: {
				Authorization: `Bearer ${tempToken}`
			}
		})
	}
}
