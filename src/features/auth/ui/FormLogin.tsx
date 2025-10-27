import Button from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input/Input'
import { titleLogo } from '@/shared/config'
import Typography from '@/shared/ui/Typography'
import { useLogin } from '@/features/auth/model/useLogin'
import { CircleSpinningIcon } from '@/shared/ui/icon/CircleSpinning'
import { LockIcon } from '@/shared/ui/icon/LockIcon'
import { MailIcon } from '@/shared/ui/icon/MailIcon'
import { UnlockIcon } from '@/shared/ui/icon/UnlockIcon'
import { useMemo } from 'react'
import { formatDateWithWeekday } from '@/shared/lib/utils/formatDate'
import { LazyLogoImage } from '@/shared/ui/Images/LazyLogoImage'
import './formLogin.css'

export const FormLogin = () => {
	const {
		formData,
		isPasswordVisible,
		errors,
		handleSubmit,
		handleChange,
		handleToggleViewPassword,
		isLoginLoading
	} = useLogin()

	const currentDate = new Date()

	const greeting = useMemo(() => {
		const currentHour = currentDate.getHours()
		if (currentHour >= 5 && currentHour < 12) {
			return 'Buenos dias'
		} else if (currentHour >= 12 && currentHour < 19) {
			return 'Buenas tardes'
		} else {
			return 'Buenas noches'
		}
	}, [])

	const date = formatDateWithWeekday(currentDate)

	return (
		<main className="formLogin">
			<section className="mx-auto flex h-screen w-11/12 flex-col items-center justify-center gap-2 px-6 py-8 sm:max-w-md lg:py-0">
				<header className="flex w-full flex-row items-end-safe justify-end px-2">
					<Typography
						align="right"
						transform="capitalize"
						color="black"
						weight="semibold"
						variant="p"
						// className="text-shadow-2xs text-shadow-black/1"
					>
						{date}
					</Typography>
				</header>
				<div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg shadow-black/60">
					{/* logo y titulo */}
					<header className="border-naranja grid h-fit w-full grid-cols-[auto_1fr] items-center gap-4 border-b-8 px-4 py-6">
						<LazyLogoImage
							className="h-auto w-12 flex-shrink-0"
							width="44"
							height="44"
						/>
						<Typography
							align="center"
							color="azul"
							weight="semibold"
							variant="h4"
							className="text-pretty"
						>
							Sistema Gestión de Inventario
							<br />
							{titleLogo}
						</Typography>
					</header>
					<div className="bg-azul space-y-4 p-6">
						<Typography align="center" color="white" weight="semibold" variant="h2">
							Iniciar Sesión
						</Typography>

						<Typography align="center" color="white" variant="p">
							¡{greeting}, <strong>Bienvenido</strong>! <br /> Ingrese sus
							crendenciales
						</Typography>
						<form id="login" action="submit" onSubmit={handleSubmit}>
							<div className="my-10 space-y-6 md:space-y-8">
								<Input
									id="login-userNameOrEmail"
									leftIcon={
										<MailIcon className="aspect-square w-4 fill-black/60" />
									}
									label="Correo electrónico"
									name="userNameOrEmail"
									type="userNameOrEmail"
									autoComplete="userNameOrEmail"
									onChange={handleChange}
									value={formData.userNameOrEmail}
									errorMessage={errors.userNameOrEmail}
									error={!!errors.userNameOrEmail}
									required
								/>
								<Input
									id="login-password"
									leftIcon={
										<LockIcon className="aspect-square w-4 fill-black/60" />
									}
									label="Contraseña"
									name="password"
									value={formData.password}
									type={isPasswordVisible ? 'text' : 'password'}
									autoComplete="currentpassword"
									onChange={handleChange}
									aria-label={
										isPasswordVisible
											? 'Ocultar contraseña'
											: 'Mostrar contraseña'
									}
									errorMessage={errors.password}
									error={!!errors.password}
									required
									rightIcon={
										isPasswordVisible ? (
											<LockIcon className="aspect-square w-4 fill-black/60" />
										) : (
											<UnlockIcon className="aspect-square w-4 fill-black/60" />
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
				</div>
				<footer>
					<Typography variant="p" option="small">
						Copyright © <strong>InventarioApp </strong>2024-
						{`${currentDate.getFullYear()}`}
					</Typography>
				</footer>
			</section>
		</main>
	)
}
