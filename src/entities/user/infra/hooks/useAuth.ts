import { useCallback, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { isTokenExpired } from '@/shared/lib/utils/isTokenExpired'
import { type Permission } from '@/shared/config/permissions'

export function useAuth() {
	const {
		user,
		login,
		loading,
		logout,
		token,
		refreshTokenValidity,
		getUser,
		setUser,
		tempToken,
		deleteTempToken,
		permissions
	} = useAuthStore()
	const location = useLocation()

	const checkTokenValidity = useCallback(async () => {
		const isTokenMissingOrExpired = !token || isTokenExpired(token)
		// Si el token SÍ existe pero está expirado, entonces lo refrescamos.
		if (isTokenMissingOrExpired) {
			await refreshTokenValidity()
		} else if (!user) {
			// Si el token es válido pero falta el objeto de usuario, lo restauramos
			const cacheUser = getUser()
			setUser(cacheUser ?? null)
		}
	}, [token, user, refreshTokenValidity, getUser, setUser])

	useLayoutEffect(() => {
		if (location.pathname === '/login') return
		checkTokenValidity()
	}, [checkTokenValidity, location])

	const hasPermission = useCallback(
		(requiredPermission: Permission) => {
			if (!permissions) {
				return false
			}
			return permissions.includes(requiredPermission)
		},
		[permissions]
	)
	return {
		login,
		logout,
		tempToken,
		deleteTempToken,
		user,
		isLogged: Boolean(token),
		isPasswordExpired: Boolean(tempToken),
		isLoginLoading: loading,
		refreshTokenValidity,
		hasPermission
	}
}
