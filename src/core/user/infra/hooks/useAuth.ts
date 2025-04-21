import { useCallback, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { isTokenExpired } from '@/utils/isTokenExpired'
import { api } from '@/api/axios.config'
import { type InternalAxiosRequestConfig } from 'axios'
// import { queryClient } from '@/lib/queryCliente'

// capa de application

export function useAuth() {
	const {
		user,
		abortController,
		login,
		loading,
		logout,
		token,
		refreshTokenValidity,
		getUser,
		setUser
	} = useAuthStore()
	const location = useLocation()

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
	}, [token, user, refreshTokenValidity])

	useLayoutEffect(() => {
		const authInterceptor = api.interceptors.request.use(
			(
				config: InternalAxiosRequestConfig & {
					_retry?: boolean
				}
			) => {
				config.signal = abortController.signal
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
		isLoginLoading: loading,
		refreshTokenValidity
	}
}
