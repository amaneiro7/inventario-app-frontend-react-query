import { createContext } from 'react'
import { type useAuth } from "../../hooks/useAuth";

export interface AuthContextType {
  auth: ReturnType<typeof useAuth>
}

export const AuthContext = createContext({} as AuthContextType)

