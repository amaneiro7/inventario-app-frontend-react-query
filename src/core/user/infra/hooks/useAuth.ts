import { useCallback, useContext, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { type InternalAxiosRequestConfig } from 'axios'
import { type LoginParams } from '@/core/user/domain/dto/LoginAuth.dto'
import { type LoginUserDto } from '@/core/user/domain/dto/LoginUser.dto'
import { api } from '../../../../api/axios.config'
import { isTokenExpired } from '../../../../utils/isTokenExpired'
import { EventContext } from '@/context/EventManager/EventContext'
// capa de application
import { Logout } from '@/core/user/application/Logout'
import { Login } from '@/core/user/application/Login'
import { RefreshToken } from '@/core/user/application/RefreshToken'
// capa de infra
import { RefreshTokenService } from '@/core/user/infra/service/refreshToken.service'
import { LoginService } from '@/core/user/infra/service/login.service'
import { LogoutService } from '@/core/user/infra/service/logout.service'
import { useLocalStorage } from '../../../../hooks/utils/useLocalStorage'
import { eventManager } from '@/utils/eventManager'

export function useAuth() {
	const {
		getItem: getToken,
		removeItem: removeToken,
		setItem: saveToken
	} = useLocalStorage('jwt')
	const { getItem: getUser, removeItem: removeUser, setItem: saveUser } = useLocalStorage('user')

	const initialUser = useCallback(() => getUser(), [])
	const initialToken = useCallback(() => getToken(), [])

	const [user, setUser] = useState<LoginUserDto | null>(initialUser)
	const [token, setToken] = useState<string | null>(initialToken)
	const [isLoading, setIsLoading] = useState(false)
	const { events } = useContext(EventContext)
	const location = useLocation()

	const loginService = new Login(new LoginService(), events)
	const refreshTokenServcice = new RefreshToken(new RefreshTokenService())
	const logoutService = new Logout(new LogoutService())

	const logout = useCallback(async () => {
		await logoutService.execute()
		setUser(null)
		setToken(null)
		removeToken()
		removeUser()
	}, [logoutService, removeToken, removeUser])

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

	const handleRefreshInternal = async (): Promise<string | void> => {
		try {
			const response = await refreshTokenServcice.execute()
			setUser(response.user)
			setToken(response.accessToken)
			saveToken(response?.accessToken)
			return response.accessToken
		} catch (error) {
			await logout()
			throw new Error('Error refreshing token, user logged out.') // Propaga el error
		}
	}

	// Envuelve handleRefreshInternal con eventManager
	const handleRefresh = useCallback(eventManager(handleRefreshInternal, 10000), [
		refreshTokenServcice,
		logout,
		setUser,
		setToken,
		saveToken
	])

	const refreshTokenValidity = useCallback(async () => {
		return await handleRefresh() // Llama a la función envuelta
	}, [handleRefresh])

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
		await refreshTokenValidity()
	}, [token, user, getUser, refreshTokenValidity])

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
				const originalRequest = error.config as InternalAxiosRequestConfig & {
					_retry?: boolean
				}
				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true
					const accessToken = await refreshTokenValidity()
					originalRequest.headers.Authorization = `Bearer ${accessToken}`
					originalRequest._retry = true
					return api(originalRequest)
				}
				return await Promise.reject(error)
			}
		)

		return () => {
			api.interceptors.request.eject(refreshInterceptor)
		}
	}, [location, refreshTokenValidity])

	useLayoutEffect(() => {
		if (location.pathname === '/login') return
		checkTokenValidity()
	}, [checkTokenValidity, location])

	return {
		login,
		logout,
		user,
		isLogged: Boolean(token),
		isLoginLoading: isLoading,
		refreshTokenValidity
	}
}
