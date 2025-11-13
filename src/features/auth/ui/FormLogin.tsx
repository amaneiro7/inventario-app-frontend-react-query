import { useLogin } from '@/features/auth/model/useLogin'
import { useGreetings } from '@/shared/lib/hooks/useGreetings'

import Button from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input/Input'
import Typography from '@/shared/ui/Typography'
import { CircleSpinningIcon } from '@/shared/ui/icon/CircleSpinning'
import { LockIcon } from '@/shared/ui/icon/LockIcon'
import { MailIcon } from '@/shared/ui/icon/MailIcon'
import { UnlockIcon } from '@/shared/ui/icon/UnlockIcon'
import './formLogin.css'
import { LoginFooter } from './LoginFooter'
import { LoginHeader } from './LoginHeader'
import { LoginLogoAndTitle } from './LoginLogoAndTitle'

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

	const { date, greeting, currentDate } = useGreetings()

	return (
		<main className="formLogin">
			<section className="mx-auto flex h-screen w-11/12 flex-col items-center justify-center gap-2 px-6 py-8 sm:max-w-md lg:py-0">
				<LoginHeader date={date} />
				<div className="animate-slide-in-left flex flex-col overflow-hidden rounded-lg bg-white shadow-lg shadow-black/60">
					{/* logo y titulo */}
					<LoginLogoAndTitle />
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
									label="Usuario o Correo electrónico"
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
				<LoginFooter currentDate={currentDate} />
			</section>
		</main>
	)
}
