import { RefreshToken } from '@/entities/user/application/RefreshToken'
import { RefreshTokenService } from '@/entities/user/infra/service/refreshToken.service'

export const refreshTokenServcice = new RefreshToken(new RefreshTokenService())
