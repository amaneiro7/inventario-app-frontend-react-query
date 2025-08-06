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
		<main className="bg-[url('@/shared/assets/bnc_logo-white.png')] bg-cover bg-no-repeat">
			<section className="mx-auto flex h-screen w-11/12 flex-col items-center justify-center gap-2 px-6 py-8 sm:max-w-md lg:py-0">
				<header className="flex w-full flex-row items-end-safe justify-between px-2">
					<LazyLogoImage
						className="clear-none w-12 max-w-12 bg-contain pr-1"
						width="44"
						height="44"
					/>
					<Typography
						align="right"
						transform="capitalize"
						color="azul"
						weight="semibold"
						variant="p"
					>
						{date}
					</Typography>
				</header>
				<div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-2xl">
					<div className="h-fit w-full py-4">
						<Typography align="center" color="naranja" variant="h2">
							Sistema Gestión de Inventario
							<br />
							{titleLogo}
						</Typography>
					</div>
					<div className="bg-azul space-y-4 p-6">
						<Typography align="center" color="white" weight="semibold" variant="h2">
							Iniciar Sesión
						</Typography>

						<Typography align="center" color="white" variant="p">
							¡{greeting}, <strong>Bienvenido</strong>! <br /> Ingrese sus
							crendenciales
						</Typography>
						<form id="login" action="submit" onSubmit={handleSubmit}>
							<div className="mb-20 space-y-6 md:space-y-8">
								<Input
									id="login-email"
									leftIcon={
										<MailIcon className="aspect-square w-4 fill-black/60" />
									}
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
									leftIcon={
										<LockIcon className="aspect-square w-4 fill-black/60" />
									}
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
