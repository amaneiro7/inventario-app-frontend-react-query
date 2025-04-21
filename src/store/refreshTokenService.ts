import { RefreshToken } from '@/core/user/application/RefreshToken'
import { RefreshTokenService } from '@/core/user/infra/service/refreshToken.service'

export const refreshTokenServcice = new RefreshToken(new RefreshTokenService())
