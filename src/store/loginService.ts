import { Login } from '@/core/user/application/Login'
import { events } from './events'
import { LoginService } from '@/core/user/infra/service/login.service'

export const loginService = new Login(new LoginService(), events)
