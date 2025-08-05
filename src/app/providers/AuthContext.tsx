/**
 * @typedef {Object} AuthContextType
 * @property {ReturnType<typeof import("../../entities/user/infra/hooks/useAuth").useAuth>} auth - El objeto de autenticación proporcionado por el hook `useAuth`.
 */

/**
 * Contexto de autenticación de la aplicación.
 * Proporciona el estado y las funciones relacionadas con la autenticación a todos los componentes hijos.
 * @type {React.Context<AuthContextType>}
 */
import { createContext } from 'react'
import { type useAuth } from '../../entities/user/infra/hooks/useAuth'

export interface AuthContextType {
	auth: ReturnType<typeof useAuth>
}

export const AuthContext = createContext({} as AuthContextType)