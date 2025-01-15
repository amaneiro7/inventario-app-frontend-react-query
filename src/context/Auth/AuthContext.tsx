import { createContext } from 'react'
import { useAuth } from "../../hooks/useAuth";

export interface AuthContextType {
  auth: ReturnType<typeof useAuth>
}

export const AuthContext = createContext({} as AuthContextType)

