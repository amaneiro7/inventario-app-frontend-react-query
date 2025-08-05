import { type JSX, type PropsWithChildren } from 'react'
import { useAuth } from '@/entities/user/infra/hooks/useAuth'
import { AuthContext } from './AuthContext'

/**
 * @typedef {Object} AuthContextProviderProps
 * @property {React.ReactNode} children - Los componentes hijos que tendrán acceso al contexto de autenticación.
 */

/**
 * `AuthContextProvider`
 * @component
 * @description Componente proveedor que envuelve la aplicación para proporcionar el contexto de autenticación.
 * Inicializa el hook `useAuth` y pasa su valor al `AuthContext.Provider`.
 * @param {AuthContextProviderProps} props - Las propiedades del componente.
 * @returns {JSX.Element} Un proveedor de contexto de autenticación que envuelve a los componentes hijos.
 */
export const AuthContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const auth = useAuth()

	return <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
}
