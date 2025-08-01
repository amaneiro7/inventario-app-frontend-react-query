import { type RefreshTokenRepository } from '../domain/repository/refreshTokenRepository'
import { type UserAuthDTO } from '../domain/dto/LoginAuth.dto'

export class RefreshToken {
	constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

	async execute(): Promise<UserAuthDTO> {
		return await this.refreshTokenRepository.run()
	}
}
