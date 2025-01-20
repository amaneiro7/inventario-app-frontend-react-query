import { lazy } from 'react'
import Logo from '@/components/Logo/Logo'
import { useLogin } from '@/hooks/useLogin'

const Input = lazy(
  async () =>
    await import('@/components/Input/Input').then((m) => ({ default: m.Input }))
)
const Typography = lazy(async () => await import('@/components/Typography'))
const CircleSpinningIcon = lazy(async () =>
  import('@/icon/CircleSpinning').then((m) => ({
    default: m.CircleSpinningIcon
  }))
)
const LockIcon = lazy(
  async () =>
    await import('@/icon/LockIcon').then((m) => ({ default: m.LockIcon }))
)
const UnlockIcon = lazy(
  async () =>
    await import('@/icon/UnlockIcon').then((m) => ({ default: m.UnlockIcon }))
)
const MailIcon = lazy(
  async () =>
    await import('@/icon/MailIcon').then((m) => ({ default: m.MailIcon }))
)
const Button = lazy(async () => await import('@/components/Button/Button'))

export const FormLogin = () => {
  const {
    formData,
    togglePassword,
    errors,
    handleSubmit,
    handleChange,
    handleToggleViewPassword,
    isLoginLoading
  } = useLogin()

  return (
    <main className="bg-gray-300 dark:bg-gray-900">
      <section className="flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="text-quat w-full flex flex-col gap-4 md:gap-6 p-6 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border md:mt-0 sm:max-w-md dark:border-gray-700 ">
          <Logo />

          <Typography color="azul" weight="bold" variant="h4">
            Iniciar Sesión
          </Typography>

          <form id="login" action="submit" onSubmit={handleSubmit}>
            <div className="space-y-6 md:space-y-8 mb-20">
              <Input
                leftIcon={
                  <MailIcon className="w-4 fill-black/60 aspect-square" />
                }
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
                leftIcon={
                  <LockIcon className="w-4 fill-black/60 aspect-square" />
                }
                label="Contraseña"
                name="password"
                value={formData.password}
                type={togglePassword ? 'password' : 'text'}
                autoComplete="currentpassword"
                onChange={handleChange}
                errorMessage={errors.password}
                error={!!errors.password}
                isRequired
                rightIcon={
                  togglePassword ? (
                    <UnlockIcon className="w-4 fill-black/60 aspect-square" />
                  ) : (
                    <LockIcon className="w-4 fill-black/60 aspect-square" />
                  )
                }
                onRightIconClick={handleToggleViewPassword}
              />
            </div>
            <Button
              form="login"
              buttonSize="large"
              color="blue"
              size="full"
              disabled={isLoginLoading}
              text={isLoginLoading ? 'Iniciando...' : 'Ingresar'}
              type="submit"
              icon={isLoginLoading ? <CircleSpinningIcon width={20} /> : null}
            />
          </form>
        </div>
        <footer>
          <Typography variant="p" option="small">
            Copyright © <strong>InventarioApp </strong>2024-
            {`${new Date().getFullYear()}`}
          </Typography>
        </footer>
      </section>
    </main>
  )
}
