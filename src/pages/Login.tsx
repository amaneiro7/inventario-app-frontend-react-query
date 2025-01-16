import { Input } from "@/components/Input/Input"
import Typography from "../components/Typography"
import { useContext, useState } from "react"
import { AuthContext } from "@/context/Auth/AuthContext"
import { Primitives } from "@/core/shared/domain/value-objects/Primitives"
import { UserEmail } from "@/core/user/domain/entity/UserEmail"

export const Login = () => {
    const { auth: { isLoginLoading, login, hasLoginError } } = useContext(AuthContext)
    const [email, setEmail] = useState < Primitives<UserEmail>('')
    const [password, setPassword] = useState < Primitives<UserEmail>('')
    const [togglePassword, setTogglePassword] = useState(false)



    return (
        <main className="bg-gray-300 dark:bg-gray-900">
            <section className="flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full flex flex-col gap-4 md:w-1/2gap-6 p-6 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border md:mt-0 sm:max-w-md dark:border-gray-700 ">
                    <Typography>
                        Iniciar Sesión
                    </Typography>

                    <form id="login" action="submit" method="post">
                        <div className="space-y-6 md:space-y-8 mb-20">

                            <Input

                            />

                        </div>
                    </form>

                </div>
            </section>
            <footer>
                <Typography>
                    Copyright © <strong>InventarioApp</strong>{`${new Date().getFullYear()}`}
                </Typography>
            </footer>
        </main>
    )
}