import { memo } from 'react'
import { UserPassword } from '@/entities/user/domain/value-objects/UserPassword'
import Typography from '@/shared/ui/Typography'

export const PasswordPolicy = memo(() => {
	return (
		<div className="rounded bg-gray-200 p-4 text-sm">
			<Typography>
				<strong>Nota:</strong> Su nueva clave debe cumplir las siguientes condiciones:
			</Typography>
			<ol className="ml-2">
				<li>1. Debe ser de mínimo {UserPassword.HAS_MIN_LENGTH} carácteres.</li>
				<li>
					2. Debe incluir caracteres alfabéticos (sensitivos a mayúsculas y minúsculas),
					numéricos y especiales.
				</li>
				<li>3. Los caracteres especiales válidos son ! . @ # $ % ^ & *</li>
			</ol>
		</div>
	)
})

PasswordPolicy.displayName = 'PasswordPolicy'
