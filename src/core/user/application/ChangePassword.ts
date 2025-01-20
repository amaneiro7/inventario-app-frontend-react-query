import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { ChangePasswordRepository } from '../domain/repository/changePasswordRepository'
import { ChangePassordParams } from '../domain/dto/ChangePasword.dto'

export class ChangePassword {
  constructor(
    private readonly changePasswordRepository: ChangePasswordRepository,
    private readonly events: EventManager
  ) {}

  async execute({
    password,
    newPassword,
    reTypePassword
  }: ChangePassordParams) {
    try {
      this.events.notify({ type: 'loading', message: 'Procesando...' })
      if (newPassword !== reTypePassword) {
        throw new Error('Las contraseñas no coinciden')
      }

      if (password === newPassword) {
        throw new Error('La nueva contraseña debe ser diferente a la actual')
      }
      return await this.changePasswordRepository
        .run({ password, newPassword, reTypePassword })
        .then((res) => {
          this.events.notify({ type: 'success', message: res.message })
          return res
        })
    } catch (error) {
      this.events.notify({ type: 'error', message: `${error}` })
    }
  }
}
