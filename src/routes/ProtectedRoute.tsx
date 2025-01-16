import { Redirect } from 'wouter'
import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext"

export function ProtectedRoute({ children }: React.PropsWithChildren) {
    const { auth: { isLogged } } = useContext(AuthContext)

    return isLogged ? children : <Redirect to='/login' />
}