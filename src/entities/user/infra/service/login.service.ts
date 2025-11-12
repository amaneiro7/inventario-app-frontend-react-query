import { fetching } from '@/shared/api/api'
import { type UserAuthDTO, type LoginParams } from '../../domain/dto/LoginAuth.dto'
import { type LoginUserRepository } from '../../domain/repository/loginUserRepository'
import { PasswordExpiredError } from '../../domain/errors/PasswordExpiredError'
import { type AxiosError } from 'axios'

export class LoginService implements LoginUserRepository {
	async run({ userNameOrEmail, password }: LoginParams): Promise<UserAuthDTO> {
		try {
			return await fetching<UserAuthDTO>({
				method: 'POST',
				url: 'auth/login/local',
				data: { userNameOrEmail, password }
			})
		} catch (rawError) {
			// -- ESTE ES EL PUNTO CLAVE DE LA TRADUCCIÓN --
			const error = rawError as AxiosError
			console.log('loginService', error)
			// 1. Traducción del error de Contraseña Expirada
			if (
				error.response?.status === 403 &&
				error.response?.data?.type === 'PasswordExpired'
			) {
				const tempToken = error.response.data.tempToken // Asumiendo que el token viene en la respuesta

				// LANZAMOS UN ERROR DE DOMINIO
				throw new PasswordExpiredError(tempToken)
			}

			// 3. Re-lanzamos cualquier otro error técnico (ej. error de red, 500)
			throw error
		}
	}
}
