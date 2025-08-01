import { Logout } from '@/entities/user/application/Logout'
import { LogoutService } from '@/entities/user/infra/service/logout.service'

export const logoutService = new Logout(new LogoutService())
