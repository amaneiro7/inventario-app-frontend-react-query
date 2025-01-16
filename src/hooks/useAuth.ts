import { useCallback, useLayoutEffect, useState } from "react"
import { useLocation } from "wouter";
import { loginService } from "../api/login"
import { LoginParams, User } from "../types/user"
import { api } from "../api/api"
import { refreshToken } from "../api/refreshToken"
import { isTokenExpired } from "../utils/isTokenExpired"

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [token, setToken] = useState<string | null>(() => window.localStorage.getItem('jwt'))
    const [location] = useLocation()

    const logout = useCallback(async () => {
        setUser(null)
        setToken(null)
        window.localStorage.removeItem('jwt')
        await logout()
    }, [])

    const login = useCallback(async ({ email, password }: LoginParams) => {
        setIsLoading(false)
        setHasError(false)
        return await loginService({ email, password })
            .then(response => {
                setUser(response.user)
                setToken(response.accessToken)
                window.localStorage.setItem('jwt', response.accessToken)
                return response.message
            })
            .catch(error => {
                setHasError(true)
                return error.message
            })
            .finally(() => setIsLoading(false))
    }, [])


    const refreshTokenValidity = useCallback(async () => {
        const response = await refreshToken()
        setUser(response.user)
        setToken(response.accessToken)
        window.localStorage.setItem('jwt', response.accessToken)
        return response.accessToken
    }, [])

    const checkTokenValidity = useCallback(async () => {
        // si el token esta presente y no ha expirado retorna por que es válido
        if (token && !isTokenExpired(token)) return

        // Si el token no esta presente o ha expirado, se refresca
        // y si da error se desconecta
        try {
            const response = await refreshToken()
            setUser(response.user)
            setToken(response.accessToken)
            window.localStorage.setItem('jwt', response.accessToken)
        } catch {
            logout()
        }


    }, [logout, token])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.request.use(
            response => response,
            async (error) => {
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
            })
        return () => {
            api.interceptors.request.eject(refreshInterceptor)
        }
    }, [logout, refreshTokenValidity])

    useLayoutEffect(() => {
        checkTokenValidity()
    }, [checkTokenValidity, location])

    return {
        login,
        logout,
        user,
        isLogged: Boolean(token),
        isLoginLoading: isLoading,
        hasLoginError: hasError
    }
}