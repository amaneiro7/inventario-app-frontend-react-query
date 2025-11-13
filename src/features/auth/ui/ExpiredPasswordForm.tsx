import { memo } from 'react'
import { useExpiredPasswordChange } from '../model/useExpiredPasswordChange'
import { Input } from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/icon/Icon'
import Typography from '@/shared/ui/Typography'
import { LoginPasswordPolicy } from './LoginPasswordPolicy'

export const ExpiredPasswordForm = memo(({ deleteTempToken }: { deleteTempToken: () => void }) => {
	const { formData, errors, isSubmitting, handleChange, handleSubmit } =
		useExpiredPasswordChange()
	return (
		<div className="animate-fade-in-right space-y-4">
			<Typography align="center" color="white" weight="semibold" variant="h2">
				Actualizar Contraseña
			</Typography>

			<Typography align="left" color="white" variant="p">
				Tu contraseña ha expirado. Por favor, crea una nueva contraseña.
			</Typography>
			<form id="update-expired-password" action="submit" onSubmit={handleSubmit}>
				<div className="my-10 space-y-6 md:space-y-8">
					<Input
						id="new-password"
						label="Nueva Contraseña"
						name="newPassword"
						type="password"
						value={formData.newPassword}
						onChange={e => handleChange('newPassword', e.target.value)}
						error={!!errors.newPassword}
						errorMessage={errors.newPassword}
						required
						autoComplete="new-password"
					/>
					<Input
						id="confirm-password"
						label="Confirmar Nueva Contraseña"
						name="reTypePassword"
						type="password"
						value={formData.reTypePassword}
						onChange={e => handleChange('reTypePassword', e.target.value)}
						error={!!errors.reTypePassword}
						errorMessage={errors.reTypePassword}
						required
						autoComplete="new-password"
					/>
					<LoginPasswordPolicy newPassword={formData.newPassword} />
				</div>
				<div className="space-y-4">
					<Button
						form="update-expired-password"
						buttonSize="medium"
						color="blue"
						size="full"
						disabled={isSubmitting}
						text={isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
						type="submit"
						icon={<Icon name="keyRound" className="h-5 w-5" />}
					/>
					<div className="text-center">
						<button
							type="button"
							className="cursor-pointer text-sm text-white transition-colors hover:text-slate-200"
							onClick={() => {
								deleteTempToken()
							}}
						>
							← Volver al login
						</button>
					</div>
				</div>
			</form>
		</div>
	)
})

ExpiredPasswordForm.displayName = 'ExpiredPasswordForm'
