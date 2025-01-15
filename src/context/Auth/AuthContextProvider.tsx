import { PropsWithChildren } from "react"
import { useAuth } from "../../hooks/useAuth"
import { AuthContext } from "./AuthContext"

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const auth = useAuth()
    // ...
    return (
        <AuthContext.Provider value={{ auth }}>
            {children}
        </AuthContext.Provider>
    )
}
