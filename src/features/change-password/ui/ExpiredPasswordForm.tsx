import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/icon/Icon'
import { useExpiredPasswordChange } from '../model/useExpiredPasswordChange'

export const ExpiredPasswordForm = memo(() => {
	const { formData, errors, isSubmitting, handleChange, handleSubmit } =
		useExpiredPasswordChange()

	return (
		<form
			className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2"
			method="post"
			onSubmit={handleSubmit}
		>
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
				onChange={e => handleChange('.reTypePassword', e.target.value)}
				error={!!errors.reTypePassword}
				errorMessage={errors.reTypePassword}
				required
				autoComplete="new-password"
			/>
			<div className="flex justify-end">
				<Button
					type="submit"
					color="blue"
					buttonSize="medium"
					size="content"
					disabled={isSubmitting}
					text={isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
					icon={<Icon name="keyRound" className="h-5 w-5" />}
				/>
			</div>
		</form>
	)
})

ExpiredPasswordForm.displayName = 'ExpiredPasswordForm'
