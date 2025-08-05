import { useContext } from 'react'
import { AuthContext } from './AuthContext'

/**
 * `useAuthContext`
 * @function
 * @description Hook personalizado para acceder al contexto de autenticación.
 * Asegura que el hook sea utilizado dentro de un `AuthContextProvider`.
 * @returns {import('./AuthContext').AuthContextType} El objeto de contexto de autenticación.
 * @throws {Error} Si el hook es utilizado fuera de un `AuthContextProvider`.
 */
export const useAuthContext = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuthContext must be used within a AuthContextProvider')
	}

	return context
}