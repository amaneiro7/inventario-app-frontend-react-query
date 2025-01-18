import { useContext } from "react"
import { AuthContext } from "./AuthContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthConext must be used within a AuthContextProvider")
    }

    return context
}