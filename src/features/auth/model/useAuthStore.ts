// store/authStore.ts
import { create } from 'zustand'
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage'
import { loginService } from './loginService'
import { logoutService } from './logoutService'
import { events } from '../../../shared/lib/events'
import { refreshTokenServcice } from './refreshTokenService'
import { abortController } from '../../../shared/lib/abortController'
import { PasswordExpiredError } from '@/entities/user/domain/errors/PasswordExpiredError'
import { type LoginParams } from '@/entities/user/domain/dto/LoginAuth.dto'
import { type LoginUserDto } from '@/entities/user/domain/dto/LoginUser.dto'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { queryClient } from '@/shared/lib/queryCliente'

interface AuthState {
	user: LoginUserDto | null
	permissions: string[] | null
	token: string | null
	tempToken: string | null
	events: EventManager
	loading: boolean
	isRefreshing: boolean
	refreshTokenPromise: Promise<string | void> | null
	getUser: () => any
	getPermissions: () => any
	getToken: () => any
	getTempToken: () => any
	deleteTempToken: () => void
	setLoading: (loading: boolean) => void
	setRefreshing: (loading: boolean) => void
	setUser: (user: LoginUserDto | null) => void
	setPermissions: (user: string[] | null) => void
	setToken: (token: string | null) => void
	setTempToken: (tempToken?: string | null) => void
	login: (params: LoginParams) => Promise<void>
	logout: () => Promise<void>
	refreshTokenValidity: () => Promise<string | void>
}

// Persistencia para TOKEN y USER
const {
	getItem: getToken,
	removeItem: removeToken,
	setItem: saveToken
} = useLocalStorage<string>('jwt')
const {
	getItem: getUser,
	removeItem: removeUser,
	setItem: saveUser
} = useLocalStorage<LoginUserDto>('user')
const {
	getItem: getPermissions,
	removeItem: removePermissions,
	setItem: savePermissions
} = useLocalStorage<string[]>('permissions')

export const useAuthStore = create<AuthState>((set, get) => ({
	user: getUser() ?? null,
	permissions: getPermissions() ?? null,
	token: getToken() ?? null,
	tempToken: null,
	loading: false,
	events: events,
	isRefreshing: false,
	refreshTokenPromise: null,
	abortController,

	// Los getters para user y token usando LocalStorage para la inicializacion
	getUser,
	getToken,
	getPermissions,

	getTempToken: () => get().tempToken,
	setLoading: loading => set({ loading }),
	setRefreshing: isRefreshing => set({ isRefreshing }),
	setUser: user => set({ user }),
	setPermissions: permissions => set({ permissions }),
	setToken: token => set({ token }),
	setTempToken: tempToken => set({ tempToken }),
	deleteTempToken: () => set({ tempToken: null }),

	login: async ({ userNameOrEmail, password }: LoginParams) => {
		try {
			set({ loading: true })
			const response = await loginService.execute({ userNameOrEmail, password })
			if (response) {
				set({
					user: response?.user,
					token: response?.accessToken,
					permissions: response?.permissions
				})
				saveToken(response?.accessToken)
				saveUser(response?.user)
				savePermissions(response?.permissions)
			}
		} catch (error) {
			if (error instanceof PasswordExpiredError) {
				const tempToken = error?.tempToken
				set({ tempToken })
			}
			// Otros errores ya son notificados por el EventManager en la capa de aplicación
		} finally {
			set({ loading: false })
		}
	},
	logout: async () => {
		try {
			await logoutService.execute()
		} catch (error) {
			console.error('Logout API call failed, but proceeding with client-side logout.', error)
		} finally {
			set({ user: null, token: null, tempToken: null, permissions: null })
			removeToken()
			removeUser()
			removePermissions()
			queryClient.clear() // Limpia todo el caché de React Query
		}
	},
	refreshTokenValidity: () => {
		if (!get().isRefreshing) {
			set({ isRefreshing: true })
			const refreshTokenPromise = refreshTokenServcice
				.execute()
				.then(response => {
					set({
						user: response.user,
						permissions: response.permissions,
						token: response.accessToken,
						isRefreshing: false,
						refreshTokenPromise: null
					})
					saveToken(response.accessToken)
					saveUser(response.user)
					savePermissions(response.permissions)
					return response.accessToken
				})
				.catch(refreshError => {
					if (refreshError instanceof PasswordExpiredError) {
						const tempToken = refreshError?.tempToken
						set({ tempToken, user: null, token: null }) // Guardamos tempToken y limpiamos sesión
						removeToken()
						removeUser()
						removePermissions()
					} else {
						get().logout() // Para otros errores, cerramos sesión completamente
					}
					set({ isRefreshing: false, refreshTokenPromise: null })
					throw refreshError
				})

			return refreshTokenPromise
		}
		return get().refreshTokenPromise as Promise<string | void>
	}
}))

// Helper para obtener solo la parte 'auth' del store (si lo prefieres)
export const getAuthState = () =>
	useAuthStore(state => ({
		user: state.user,
		token: state.token,
		permissions: state.permissions,
		setUser: state.setUser,
		setToken: state.setToken,
		logout: state.logout,
		deleteTempToken: state.deleteTempToken,
		refreshTokenValidity: state.refreshTokenValidity
	}))
