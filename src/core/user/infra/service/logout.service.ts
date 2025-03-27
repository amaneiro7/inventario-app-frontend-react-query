import { fetching } from '../../../../api/api'
import { type LogoutUserRepository } from '../../domain/repository/logoutRepository'

export class LogoutService implements LogoutUserRepository {
	async run(): Promise<void> {
		return await fetching({
			method: 'POST',
			url: 'auth/logout'
		})
	}
}
