import { fetching } from '@/shared/api/api'
import { type ChangePasswordParams } from '../../domain/dto/ChangePasword.dto'
import { type ChangePasswordRepository } from '../../domain/repository/changePasswordRepository'

export class ChangePasswordService implements ChangePasswordRepository {
	async run(params: ChangePasswordParams): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: 'users/change-password',
			data: params
		})
	}
}
