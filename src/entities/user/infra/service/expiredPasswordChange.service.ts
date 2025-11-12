import { fetching } from '@/shared/api/api'
import { ChangeExpiredPasswordParams } from '../../domain/dto/ChangePasword.dto'

export class ExpiredPasswordChangeService {
	async run({
		newPassword,
		tempToken,
		reTypePassword
	}: ChangeExpiredPasswordParams): Promise<void> {
		await fetching(
			{
				method: 'POST',
				url: 'auth/change-expired-password/local',
				data: { newPassword, reTypePassword },
				headers: {
					Authorization: `Bearer ${tempToken}`
				}
			},
			undefined
		)
	}
}
