import { type LogoutUserRepository } from "../domain/repository/logoutRepository";

export class Logout {
    constructor(
        private readonly logoutUserRepository: LogoutUserRepository
    ) { }

    async execute() {
        return await this.logoutUserRepository.run()
    }
}