import { LoginUserRepository } from "../domain/repository/loginUserRepository";

export class Login {
    constructor(private readonly loginUserRepository: LoginUserRepository) { }

    async login(email: string, password: string): Promise<any> {
        return await this.loginUserRepository.login(email, password)
    }
}