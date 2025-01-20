import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'
import { type LoginParams } from '@/core/user/domain/dto/LoginAuth.dto'
import { type LoginUserDto } from '@/core/user/domain/dto/LoginUser.dto'
import { api } from '../api/api'
import { isTokenExpired } from '../utils/isTokenExpired'
import { EventContext } from '@/context/EventManager/EventContext'
// capa de application
import { Logout } from '@/core/user/application/Logout'
import { Login } from '@/core/user/application/Login'
import { RefreshToken } from '@/core/user/application/RefreshToken'
// capa de infra
import { RefreshTokenService } from '@/core/user/infra/refreshTokenService'
import { LoginService } from '@/core/user/infra/loginService'
import { LogoutService } from '@/core/user/infra/logoutService'
import { InternalAxiosRequestConfig } from 'axios'
import { useLocation } from 'react-router-dom'

export function useAuth() {
  const [user, setUser] = useState<LoginUserDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState<string | null>(() =>
    window.localStorage.getItem('jwt')
  )
  const { events } = useContext(EventContext)
  const location = useLocation()

  const loginRepository = useMemo(() => {
    return new LoginService()
  }, [])
  const refreshTokenRepository = useMemo(() => {
    return new RefreshTokenService()
  }, [])
  const logoutRepository = useMemo(() => {
    return new LogoutService()
  }, [])
  const loginService = useMemo(() => {
    return new Login(loginRepository, events)
  }, [events, loginRepository])
  const refreshToken = useMemo(() => {
    return new RefreshToken(refreshTokenRepository)
  }, [refreshTokenRepository])
  const logoutService = useMemo(() => {
    return new Logout(logoutRepository)
  }, [logoutRepository])

  const logout = useCallback(async () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('jwt')
    await logoutService.execute()
  }, [])

  const login = useCallback(
    async ({ email, password }: LoginParams) => {
      setIsLoading(true)
      return await loginService
        .execute({ email, password })
        .then((response) => {
          if (response) {
            setUser(response?.user)
            setToken(response?.accessToken)
            window.localStorage.setItem('jwt', response?.accessToken)
          }
        })
        .finally(() => setIsLoading(false))
    },
    [loginService]
  )

  const refreshTokenValidity = useCallback(async () => {
    const response = await refreshToken.execute()
    setUser(response.user)
    setToken(response.accessToken)
    window.localStorage.setItem('jwt', response.accessToken)
    return response.accessToken
  }, [refreshToken])

  const checkTokenValidity = useCallback(async () => {
    // si el token esta presente y no ha expirado retorna por que es válido
    if (token && !isTokenExpired(token)) {
      console.log('el token no ha expirado')
      return
    }

    // Si el token no esta presente o ha expirado, se refresca
    // y si da error se desconecta
    try {
      const response = await refreshToken.execute()
      console.log('el token expiro')
      setUser(response.user)
      setToken(response.accessToken)
      window.localStorage.setItem('jwt', response.accessToken)
    } catch {
      logout()
    }
  }, [logout, refreshToken, token])

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      (
        config: InternalAxiosRequestConfig & {
          _retry?: boolean
        }
      ) => {
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization

        return config
      }
    )

    return () => {
      api.interceptors.request.eject(authInterceptor)
    }
  }, [token])

  useLayoutEffect(() => {
    if (location.pathname === '/login') return
    const refreshInterceptor = api.interceptors.request.use(
      async (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (
          error.response.status === 401 &&
          error.response.data === 'Unauthorized'
        ) {
          try {
            const accessToken = await refreshTokenValidity()
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            originalRequest._retry = true
            return api(originalRequest)
          } catch {
            await logout()
          }
        }
        return await Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.request.eject(refreshInterceptor)
    }
  }, [location, logout, refreshTokenValidity])

  useLayoutEffect(() => {
    if (location.pathname === '/login') return
    checkTokenValidity()
  }, [checkTokenValidity, location])

  return {
    login,
    logout,
    user,
    isLogged: Boolean(token),
    isLoginLoading: isLoading
  }
}
