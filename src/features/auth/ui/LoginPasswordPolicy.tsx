import { memo, useMemo } from 'react'
import Typography from '@/shared/ui/Typography'
import { UserPassword } from '@/entities/user/domain/value-objects/UserPassword'

type PolicyItemProps = {
	isValid: boolean
	text: string
}

const PolicyItem = ({ isValid, text }: PolicyItemProps) => (
	<li className={isValid ? 'text-verde-600' : ''}>
		{isValid ? '✓' : '○'} {text}
	</li>
)

export const LoginPasswordPolicy = memo(({ newPassword }: { newPassword: string }) => {
	const policy = useMemo(() => UserPassword.checkPolicy(newPassword), [newPassword])

	return (
		<div className="rounded-lg bg-white p-4">
			<Typography variant="p" weight="semibold" className="mb-2">
				Requisitos:
			</Typography>
			<ul className="text-muted-foreground space-y-1 text-xs">
				<PolicyItem
					isValid={policy.hasMinLength}
					text={`Al menos ${UserPassword.HAS_MIN_LENGTH} caracteres`}
				/>
				<PolicyItem isValid={policy.hasUppercase} text="Una letra mayúscula" />
				<PolicyItem isValid={policy.hasLowercase} text="Una letra minúscula" />
				<PolicyItem isValid={policy.hasNumber} text="Un número" />
				<PolicyItem isValid={policy.hasSpecialCharacter} text="Un caracter especial" />
			</ul>
		</div>
	)
})

LoginPasswordPolicy.displayName = 'LoginPasswordPolicy'
