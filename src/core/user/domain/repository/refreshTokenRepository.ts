import { type UserAuthDTO } from "../dto/LoginAuth.dto"
export abstract class RefreshTokenRepository {
    abstract run(): Promise<UserAuthDTO>
}