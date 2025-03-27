import { useCallback, useContext, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { type InternalAxiosRequestConfig } from 'axios'
import { type LoginParams } from '@/core/user/domain/dto/LoginAuth.dto'
import { type LoginUserDto } from '@/core/user/domain/dto/LoginUser.dto'
import { api } from '../api/axios.config'
import { isTokenExpired } from '../utils/isTokenExpired'
import { EventContext } from '@/context/EventManager/EventContext'
// capa de application
import { Logout } from '@/core/user/application/Logout'
import { Login } from '@/core/user/application/Login'
import { RefreshToken } from '@/core/user/application/RefreshToken'
// capa de infra
import { RefreshTokenService } from '@/core/user/infra/service/refreshToken.service'
import { LoginService } from '@/core/user/infra/service/login.service'
import { LogoutService } from '@/core/user/infra/service/logout.service'
import { useLocalStorage } from './utils/useLocalStorage'

export function useAuth() {
	const {
		getItem: getToken,
		removeItem: removeToken,
		setItem: saveToken
	} = useLocalStorage('jwt')
	const { getItem: getUser, removeItem: removeUser, setItem: saveUser } = useLocalStorage('user')
	const [user, setUser] = useState<LoginUserDto | null>(() => getUser())
	const [token, setToken] = useState<string | null>(() => getToken())
	const [isLoading, setIsLoading] = useState(false)
	const { events } = useContext(EventContext)
	const location = useLocation()

	const loginService = new Login(new LoginService(), events)
	const refreshToken = new RefreshToken(new RefreshTokenService())
	const logoutService = new Logout(new LogoutService())

	const logout = useCallback(async () => {
		await logoutService.execute()
		setUser(null)
		setToken(null)
		removeToken()
		removeUser()
	}, [])

	const login = useCallback(
		async ({ email, password }: LoginParams) => {
			setIsLoading(true)
			return await loginService
				.execute({ email, password })
				.then(response => {
					if (response) {
						setUser(response?.user)
						setToken(response?.accessToken)
						saveToken(response?.accessToken)
						saveUser(response?.user)
					}
				})
				.finally(() => setIsLoading(false))
		},
		[loginService, saveToken, saveUser]
	)

	const refreshTokenValidity = useCallback(async () => {
		const response = await refreshToken.execute()
		setUser(response.user)
		setToken(response.accessToken)
		saveToken(response?.accessToken)
		return response.accessToken
	}, [refreshToken, saveToken])

	const checkTokenValidity = useCallback(async () => {
		// si el token esta presente y no ha expirado retorna por que es válido
		if (token && !isTokenExpired(token)) {
			if (!user) {
				const cacheUser = getUser()
				setUser(cacheUser ? JSON.parse(cacheUser) : null)
			}
			return
		}
		// Si el token no esta presente o ha expirado, se refresca
		// y si da error se desconecta
		try {
			const response = await refreshToken.execute()
			setUser(response.user)
			setToken(response.accessToken)
			saveToken(response.accessToken)
		} catch {
			logout()
		}
	}, [token, user, getUser, logout, RefreshTokenService, saveToken])

	useLayoutEffect(() => {
		const authInterceptor = api.interceptors.request.use(
			(
				config: InternalAxiosRequestConfig & {
					_retry?: boolean
				}
			) => {
				if (!config._retry && token) {
					config.headers.Authorization = `Bearer ${token}`
				}
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
			async response => response,
			async error => {
				const originalRequest = error.config
				if (error.response.status === 401 && error.response.data === 'Unauthorized') {
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
