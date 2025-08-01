import { Login } from '@/entities/user/application/Login'
import { events } from '../../../shared/lib/events'
import { LoginService } from '@/entities/user/infra/service/login.service'

export const loginService = new Login(new LoginService(), events)
