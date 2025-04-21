import { Logout } from '@/core/user/application/Logout'
import { LogoutService } from '@/core/user/infra/service/logout.service'

export const logoutService = new Logout(new LogoutService())
