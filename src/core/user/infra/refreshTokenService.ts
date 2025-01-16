import { fetching } from "../../../api/api"
import { type UserAuthDTO } from "../domain/dto/LoginAuth.dto"
import { type RefreshTokenRepository } from "../domain/repository/refreshTokenRepository"

export class RefreshTokenService implements RefreshTokenRepository {
    async run(): Promise<UserAuthDTO> {
        return await fetching<UserAuthDTO>({
            method: 'GET',
            url: 'auth/refresh-token',
        })
    }

}