import { memo } from 'react'

import { Input } from '@/shared/ui/Input/Input'
import Button from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/icon/Icon'
import { useExpiredPasswordChange } from '../model/useExpiredPasswordChange'
import { FormComponent } from '@/widgets/FormContainer/FormComponent'

export const ExpiredPasswordForm = memo(() => {
	const { formData, errors, isSubmitting, handleChange, handleSubmit } =
		useExpiredPasswordChange()

	return (
		<FormComponent onSubmit={handleSubmit}>
			<Input
				id="new-password"
				label="Nueva Contraseña"
				name="newPassword"
				type="password"
				value={formData.newPassword}
				onChange={e => handleChange('newPassword', e.target.value)}
				error={!!errors.newPassword}
				errormessage={errors.newPassword}
				required
				autoComplete="new-password"
			/>
			<Input
				id="confirm-password"
				label="Confirmar Nueva Contraseña"
				name="confirmPassword"
				type="password"
				value={formData.confirmPassword}
				onChange={e => handleChange('confirmPassword', e.target.value)}
				error={!!errors.confirmPassword}
				errormessage={errors.confirmPassword}
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
		</FormComponent>
	)
})

ExpiredPasswordForm.displayName = 'ExpiredPasswordForm'
