// store/authStore.ts
import { create } from 'zustand'
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage'
import { loginService } from './loginService'
import { logoutService } from './logoutService'
import { events } from '../../../shared/lib/events'
import { refreshTokenServcice } from './refreshTokenService'
import { abortController } from '../../../shared/lib/abortController'

import { type LoginParams } from '@/entities/user/domain/dto/LoginAuth.dto'
import { type LoginUserDto } from '@/entities/user/domain/dto/LoginUser.dto'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'

interface AuthState {
	user: LoginUserDto | null
	token: string | null
	events: EventManager
	loading: boolean
	isRefreshing: boolean
	abortController: AbortController
	getToken: () => string | undefined
	getUser: () => LoginUserDto | undefined
	setLoading: (loading: boolean) => void
	setRefreshing: (loading: boolean) => void
	setUser: (user: LoginUserDto | null) => void
	setToken: (token: string | null) => void
	login: (params: LoginParams) => Promise<void>
	logout: () => Promise<void>
	refreshTokenValidity: () => Promise<string | void>
}

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

export const useAuthStore = create<AuthState>((set, get) => ({
	user: getUser() ?? null,
	token: getToken() ?? null,
	loading: false,
	events: events,
	isRefreshing: false,
	abortController,
	getUser,
	getToken,
	setLoading: loading => set({ loading }),
	setRefreshing: isRefreshing => set({ isRefreshing }),
	setUser: user => set({ user }),
	setToken: token => set({ token }),
	login: async ({ email, password }: LoginParams) => {
		set({ loading: true })
		return await loginService
			.execute({ email, password })
			.then(response => {
				if (response) {
					set({ user: response?.user, token: response?.accessToken })
					saveToken(response?.accessToken)
					saveUser(response.user)
				}
			})
			.finally(() => set({ loading: false }))
	},
	logout: async () => {
		try {
			await logoutService.execute()
		} catch (error) {
			console.error('Logout API call failed, but proceeding with client-side logout.', error)
		} finally {
			set({ user: null, token: null })
			removeToken()
			removeUser()
		}
	},
	refreshTokenValidity: async () => {
		if (!get().isRefreshing) {
			set({ isRefreshing: true })
			try {
				const response = await refreshTokenServcice.execute()
				console.log('response', response)
				set({ user: response.user, token: response.accessToken })
				saveToken(response.accessToken)
				saveUser(response.user)
				return response.accessToken
			} catch (refreshError) {
				get().logout()
				return Promise.reject(refreshError)
			} finally {
				set({ isRefreshing: false })
			}
		}
	}
}))

// Helper para obtener solo la parte 'auth' del store (si lo prefieres)
export const getAuthState = () =>
	useAuthStore(state => ({
		user: state.user,
		token: state.token,
		setUser: state.setUser,
		setToken: state.setToken,
		logout: state.logout,
		refreshTokenValidity: state.refreshTokenValidity
	}))
