import { type EventManager } from "@/core/shared/domain/Observer/EventManager"
import { type LoginParams, type UserAuthDTO } from "../domain/dto/LoginAuth.dto"
import { type LoginUserRepository } from "../domain/repository/loginUserRepository"

export class Login {
    constructor(
        private readonly loginUserRepository: LoginUserRepository,
        private readonly events: EventManager
    ) { }

    async execute({ email, password }: LoginParams): Promise<void | UserAuthDTO> {
        return await this.loginUserRepository.run({ email, password })
            .then((res => {
                this.events.notify({ type: 'success', message: res.message })
                return res
            }))
            .catch((error) => {
                this.events.notify({ type: 'error', message: `${error}` })
            })

    }
}