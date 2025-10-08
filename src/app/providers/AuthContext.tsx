import { createContext } from 'react'
import { type useAuth } from '@/entities/user/infra/hooks/useAuth'

export interface AuthContextType {
	auth: ReturnType<typeof useAuth>
}

export const AuthContext = createContext({} as AuthContextType)
