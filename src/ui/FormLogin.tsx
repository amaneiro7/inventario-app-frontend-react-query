import { lazy, useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "@/context/Auth/AuthContext"
import { type Primitives } from "@/core/shared/domain/value-objects/Primitives"
import { UserEmail } from "@/core/user/domain/entity/UserEmail"
import { UserPassword } from "@/core/user/domain/entity/UserPassword"
import { toast } from "sonner"
import Logo from "@/components/Logo/Logo"

const Input = lazy(async () => await import('@/components/Input/Input').then(m => ({ default: m.Input })))
const Typography = lazy(async () => await import('@/components/Typography'))
const CircleSpinningIcon = lazy(async () => import('@/icon/CircleSpinning').then(m => ({ default: m.CircleSpinningIcon })))
const LockIcon = lazy(async () => await import('@/icon/LockIcon').then(m => ({ default: m.LockIcon })))
const UnlockIcon = lazy(async () => await import('@/icon/UnlockIcon').then(m => ({ default: m.UnlockIcon })))
const MailIcon = lazy(async () => await import('@/icon/MailIcon').then(m => ({ default: m.MailIcon })))
const Button = lazy(async () => await import('@/components/Button/Button'))

export const FormLogin = () => {
    const { auth: { isLoginLoading, login } } = useContext(AuthContext)

    const [formData, setFormData] = useState<{
        email: Primitives<UserEmail>,
        password: Primitives<UserPassword>
    }>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({ email: '', password: '' })
    const [togglePassword, setTogglePassword] = useState(true)
    const isPasswordFirstInput = useRef(true)
    const isEmailFirstInput = useRef(true)

    const handleToggleViewPassword = () => {
        setTogglePassword(!togglePassword)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const hableSubmit = async (event: React.FormEvent) => {
        event?.preventDefault()
        event?.stopPropagation()
        console.log('submit', formData)
        await login({ email: formData.email, password: formData.password })
            .then((res) => {
                toast.success(res)
            })
            .catch((err) => {
                toast.error(err)
            })
    }

    useEffect(() => {
        if (isEmailFirstInput.current || formData.email === '') {
            isEmailFirstInput.current = !formData.email.includes('@')
        }

        if (isPasswordFirstInput.current || formData.password === '') {
            isPasswordFirstInput.current = formData.password?.length <= UserPassword.HAS_MIN_LENGTH
        }

        const isEmailValid = isEmailFirstInput.current ? true : UserEmail.isValid(formData.email)
        const isPasswordValid = isPasswordFirstInput.current ? true : UserPassword.isValid(formData.password)

        setErrors(prev => ({
            ...prev,
            email: isEmailValid ? '' : UserEmail.invalidMessage(formData.email),
            password: isPasswordValid ? '' : UserPassword.invalidMessage()
        }))

        return () => {
            setErrors({ email: '', password: '' })
        }
    }, [formData.email, formData.password])

    return (
        <main className="bg-gray-300 dark:bg-gray-900">
            <section className="flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full flex flex-col gap-4 md:gap-6 p-6 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border md:mt-0 sm:max-w-md dark:border-gray-700 ">
                    <Logo />

                    <Typography>
                        Iniciar Sesión
                    </Typography>

                    <form id="login" action="submit" onSubmit={hableSubmit}>
                        <div className="space-y-6 md:space-y-8 mb-20">

                            <Input
                                leftIcon={<MailIcon className='w-4 fill-black/60 aspect-square' />}
                                label="Correo electrónico"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={handleChange}
                                value={formData.email}
                                errorMessage={errors.email}
                                error={!!errors.email}

                                isRequired


                            />
                            <Input
                                leftIcon={<LockIcon className='w-4 fill-black/60 aspect-square' />}
                                label="Contraseña"
                                name="password"
                                value={formData.password}
                                type={togglePassword ? 'password' : "text"}
                                autoComplete="currentpassword"
                                onChange={handleChange}
                                errorMessage={errors.password}
                                error={!!errors.password}
                                isRequired
                                rightIcon={
                                    togglePassword
                                        ? <UnlockIcon className="w-4 fill-black/60 aspect-square" />
                                        : <LockIcon className="w-4 fill-black/60 aspect-square" />
                                }
                                onRightIconClick={handleToggleViewPassword}


                            />
                        </div>
                        <Button
                            buttonSize='large'
                            color='blue'
                            size='full'
                            disabled={isLoginLoading}
                            text={isLoginLoading ? 'Cargando...' : 'Ingresar'}
                            type='submit'
                            icon={
                                isLoginLoading
                                    ? <CircleSpinningIcon width={20} />
                                    : null
                            }
                        />
                    </form>

                </div>
                <footer>
                    <Typography>
                        Copyright © <strong>InventarioApp</strong>{`${new Date().getFullYear()}`}
                    </Typography>
                </footer>
            </section>
        </main>
    )
}