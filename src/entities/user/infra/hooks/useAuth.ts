import { useCallback, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { isTokenExpired } from '@/shared/lib/utils/isTokenExpired'
// import { queryClient } from '@/lib/queryCliente'

// capa de application

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
		deleteTempToken
	} = useAuthStore()
	const location = useLocation()

	const checkTokenValidity = useCallback(async () => {
		// Si no hay token, no hay nada que hacer. El usuario está deslogueado.
		if (!token) {
			return
		}

		// Si el token SÍ existe pero está expirado, entonces lo refrescamos.
		if (isTokenExpired(token)) {
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

	return {
		login,
		logout,
		tempToken,
		deleteTempToken,
		user,
		isLogged: Boolean(token),
		isPasswordExpired: Boolean(tempToken),
		isLoginLoading: loading,
		refreshTokenValidity
	}
}
