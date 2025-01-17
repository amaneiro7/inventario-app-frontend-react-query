import { lazy, useContext } from "react"
import { AuthContext } from "@/context/Auth/AuthContext"
import { Navigate } from "react-router-dom"

const FormLogin = lazy(async () => import("@/ui/FormLogin").then(m => ({ default: m.FormLogin })))

export const Login = () => {
    const { auth: { isLogged } } = useContext(AuthContext)

    if (!isLogged) {
        return <Navigate to={"/"} />
    }

    return (
        <FormLogin />
    )
}