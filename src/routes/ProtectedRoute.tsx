import { Navigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext"

export function ProtectedRoute({ children }: React.PropsWithChildren) {
    const { auth: { isLogged } } = useContext(AuthContext)

    return isLogged ? children : <Navigate to="/login" replace={true} />
}