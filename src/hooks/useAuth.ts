import { useCallback, useLayoutEffect, useMemo, useState } from "react"
import { api } from "../api/api"
import { isTokenExpired } from "../utils/isTokenExpired"
import { LoginService } from "@/core/user/infra/loginService"
import { Login } from "@/core/user/application/Login"
import { type LoginParams } from "../types/user"
import { type LoginUserDto } from "@/core/user/domain/dto/LoginUser.dto"
import { RefreshToken } from "@/core/user/application/RefreshToken"
import { RefreshTokenService } from "@/core/user/infra/refreshTokenService"

export function useAuth() {
    const [user, setUser] = useState<LoginUserDto | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [token, setToken] = useState<string | null>(() => window.localStorage.getItem('jwt'))

    const location = window.location.pathname


    const loginRepository = useMemo(() => { return new LoginService() }, [])
    const refreshTokenRepository = useMemo(() => { return new RefreshTokenService() }, [])
    const loginService = useMemo(() => { return new Login(loginRepository) }, [loginRepository])
    const refreshToken = useMemo(() => { return new RefreshToken(refreshTokenRepository) }, [refreshTokenRepository])

    const logout = useCallback(async () => {
        setUser(null)
        setToken(null)
        window.localStorage.removeItem('jwt')
        await logout()
    }, [])

    const login = useCallback(async ({ email, password }: LoginParams): Promise<string> => {
        setIsLoading(true)
        setHasError(false)
        return await loginService.execute({ email, password })
            .then(response => {
                console.log('response')
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
    }, [loginService])


    const refreshTokenValidity = useCallback(async () => {
        const response = await refreshToken.execute()
        setUser(response.user)
        setToken(response.accessToken)
        window.localStorage.setItem('jwt', response.accessToken)
        return response.accessToken
    }, [refreshToken])

    const checkTokenValidity = useCallback(async () => {
        // si el token esta presente y no ha expirado retorna por que es válido
        if (token && !isTokenExpired(token)) return

        // Si el token no esta presente o ha expirado, se refresca
        // y si da error se desconecta
        try {
            const response = await refreshToken.execute()
            setUser(response.user)
            setToken(response.accessToken)
            window.localStorage.setItem('jwt', response.accessToken)
        } catch {
            logout()
        }


    }, [logout, refreshToken, token])

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
        console.log(window.location.pathname)
        if (location === '/login') return
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