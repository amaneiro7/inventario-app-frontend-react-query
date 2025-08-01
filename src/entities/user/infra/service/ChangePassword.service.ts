import { fetching } from '@/shared/api/api'
import { type ChangePassordParams } from '../../domain/dto/ChangePasword.dto'
import { type ChangePasswordRepository } from '../../domain/repository/changePasswordRepository'

export class ChangePasswordService implements ChangePasswordRepository {
	async run(params: ChangePassordParams): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: 'users/change-password',
			data: params
		})
	}
}
