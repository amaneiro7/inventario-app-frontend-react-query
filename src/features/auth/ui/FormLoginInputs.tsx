import { useLogin } from '../model/useLogin'
import { Input } from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button'
import { CircleSpinningIcon } from '@/shared/ui/icon/CircleSpinning'
import { LockIcon } from '@/shared/ui/icon/LockIcon'
import { UnlockIcon } from '@/shared/ui/icon/UnlockIcon'
import { MailIcon } from '@/shared/ui/icon/MailIcon'
import Typography from '@/shared/ui/Typography'

export const FormLoginInputs = ({ greeting }: { greeting: string }) => {
	const {
		formData,
		isPasswordVisible,
		errors,
		handleSubmit,
		handleChange,
		handleToggleViewPassword,
		isLoginLoading
	} = useLogin()
	return (
		<div className="animate-fade-in-left space-y-4">
			<Typography align="center" color="white" weight="semibold" variant="h2">
				Iniciar Sesión
			</Typography>

			<Typography align="center" color="white" variant="p">
				<>
					¡{greeting}, <strong>Bienvenido</strong>! <br /> Ingrese sus crendenciales
				</>
			</Typography>
			<form id="login" action="submit" onSubmit={handleSubmit}>
				<div className="my-10 space-y-6 md:space-y-8">
					<Input
						id="login-userNameOrEmail"
						leftIcon={
							<MailIcon name="mailcon" className="aspect-square w-4 fill-black/60" />
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
							<LockIcon name="lockIcon" className="aspect-square w-4 fill-black/60" />
						}
						label="Contraseña"
						name="password"
						value={formData.password}
						type={isPasswordVisible ? 'text' : 'password'}
						autoComplete="currentpassword"
						onChange={handleChange}
						aria-label={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
						errorMessage={errors.password}
						error={!!errors.password}
						required
						rightIcon={
							isPasswordVisible ? (
								<LockIcon
									name="lockIcon"
									className="aspect-square w-4 fill-black/60"
								/>
							) : (
								<UnlockIcon
									name="unLockIcon"
									className="aspect-square w-4 fill-black/60"
								/>
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
	)
}
