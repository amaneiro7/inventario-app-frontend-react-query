import Button from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input/Input'
import Logo from '@/shared/ui/Logo/Logo'
import Typography from '@/shared/ui/Typography'
import { useLogin } from '@/features/auth/model/useLogin'
import { CircleSpinningIcon } from '@/shared/ui/icon/CircleSpinning'
import { LockIcon } from '@/shared/ui/icon/LockIcon'
import { MailIcon } from '@/shared/ui/icon/MailIcon'
import { UnlockIcon } from '@/shared/ui/icon/UnlockIcon'
import { useMemo } from 'react'

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

	const greeting = useMemo(() => {
		const now = new Date()
		const currentHour = now.getHours()
		if (currentHour >= 5 && currentHour < 12) {
			return 'Buenos dias'
		} else if (currentHour >= 12 && currentHour < 19) {
			return 'Buenas tardes'
		} else {
			return 'Buenas noches'
		}
	}, [])

	return (
		<main className="bg-[url('@/shared/assets/bg.png')] bg-contain bg-no-repeat">
			<section className="mx-auto flex h-screen flex-col items-center justify-center gap-2 px-6 py-8 lg:py-0">
				<div className="bg-azul flex w-full flex-col gap-4 rounded-lg p-6 shadow-lg sm:max-w-md sm:p-8 md:mt-0 md:gap-6">
					<Logo dark />

					<Typography color="white" weight="semibold" variant="h1">
						Iniciar Sesión
					</Typography>

					<Typography color="white" variant="p">
						¡{greeting}, <strong>Bienvenido</strong>! <br /> Ingrese sus crendenciales
					</Typography>

					<form id="login" action="submit" onSubmit={handleSubmit}>
						<div className="mb-20 space-y-6 md:space-y-8">
							<Input
								id="login-email"
								leftIcon={<MailIcon className="aspect-square w-4 fill-black/60" />}
								label="Correo electrónico"
								name="email"
								type="email"
								autoComplete="email"
								onChange={handleChange}
								value={formData.email}
								errorMessage={errors.email}
								error={!!errors.email}
								required
							/>
							<Input
								id="login-password"
								leftIcon={<LockIcon className="aspect-square w-4 fill-black/60" />}
								label="Contraseña"
								name="password"
								value={formData.password}
								type={togglePassword ? 'password' : 'text'}
								autoComplete="currentpassword"
								onChange={handleChange}
								errorMessage={errors.password}
								error={!!errors.password}
								required
								rightIcon={
									togglePassword ? (
										<UnlockIcon className="aspect-square w-4 fill-black/60" />
									) : (
										<LockIcon className="aspect-square w-4 fill-black/60" />
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
