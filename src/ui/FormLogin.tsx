import Button from '@/components/Button'
import { Input } from '@/components/Input/Input'
import Logo from '@/components/Logo/Logo'
import Typography from '@/components/Typography'
import { useLogin } from '@/hooks/useLogin'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { LockIcon } from '@/icon/LockIcon'
import { MailIcon } from '@/icon/MailIcon'
import { UnlockIcon } from '@/icon/UnlockIcon'

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
				<div className="text-quat w-full flex flex-col gap-4 md:gap-6 p-6 sm:p-8 bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:border md:mt-0 sm:max-w-md dark:border-gray-700 ">
					<Logo />

					<Typography color="azul" weight="bold" variant="h4">
						Iniciar Sesión
					</Typography>

					<form id="login" action="submit" onSubmit={handleSubmit}>
						<div className="space-y-6 md:space-y-8 mb-20">
							<Input
								leftIcon={<MailIcon className="w-4 fill-black/60 aspect-square" />}
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
								leftIcon={<LockIcon className="w-4 fill-black/60 aspect-square" />}
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
