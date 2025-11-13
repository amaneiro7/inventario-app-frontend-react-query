import { memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { UserPassword } from '@/entities/user/domain/value-objects/UserPassword'

export const LoginPasswordPolicy = memo(({ newPassword }: { newPassword: string }) => {
	return (
		<div className="rounded-lg bg-white p-4">
			<Typography variant="p" weight="semibold" className="mb-2">
				Requisitos:
			</Typography>
			<ul className="text-muted-foreground space-y-1 text-xs">
				<li
					className={
						newPassword.length >= UserPassword.HAS_MIN_LENGTH ? 'text-verde-600' : ''
					}
				>
					{newPassword.length >= UserPassword.HAS_MIN_LENGTH ? '✓' : '○'} Al menos 8
					caracteres
				</li>
				<li className={UserPassword.hasUppercase.test(newPassword) ? 'text-verde-600' : ''}>
					{UserPassword.hasUppercase.test(newPassword) ? '✓' : '○'} Una letra mayúscula
				</li>
				<li className={UserPassword.hasLowercase.test(newPassword) ? 'text-verde-600' : ''}>
					{UserPassword.hasLowercase.test(newPassword) ? '✓' : '○'} Una letra minúscula
				</li>
				<li className={UserPassword.hasNumber.test(newPassword) ? 'text-verde-600' : ''}>
					{UserPassword.hasNumber.test(newPassword) ? '✓' : '○'} Un número
				</li>
				<li
					className={
						UserPassword.hasSpecialCharacter.test(newPassword) ? 'text-verde-600' : ''
					}
				>
					{UserPassword.hasSpecialCharacter.test(newPassword) ? '✓' : '○'} Un caracter
					especial
				</li>
			</ul>
		</div>
	)
})

LoginPasswordPolicy.displayName = 'LoginPasswordPolicy'
