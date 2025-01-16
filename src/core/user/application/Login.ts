import { LoginParams, UserAuthDTO } from "../domain/dto/LoginAuth.dto"
import { type LoginUserRepository } from "../domain/repository/loginUserRepository"

export class Login {
    constructor(private readonly loginUserRepository: LoginUserRepository) { }

    async execute({ email, password }: LoginParams): Promise<UserAuthDTO> {
        return await this.loginUserRepository.run({ email, password })
    }
}