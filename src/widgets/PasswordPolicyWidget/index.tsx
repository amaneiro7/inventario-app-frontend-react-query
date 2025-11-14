import { memo, useMemo } from 'react'
import { UserPassword } from '@/entities/user/domain/value-objects/UserPassword'
import Typography from '@/shared/ui/Typography'
import { cn } from '@/shared/lib/utils'

type PolicyItemProps = {
	isValid: boolean
	text: string
}

const PolicyItem = ({ isValid, text }: PolicyItemProps) => (
	<li className={cn(isValid && 'text-verde-600')}>
		{isValid ? '✓' : '○'} {text}
	</li>
)

type PasswordPolicyWidgetProps = {
	passwordValue: string
	title?: string
	className?: string
}

export const PasswordPolicyWidget = memo(
	({ passwordValue, title = 'Requisitos:', className }: PasswordPolicyWidgetProps) => {
		const policy = useMemo(() => UserPassword.checkPolicy(passwordValue), [passwordValue])

		return (
			<div className={cn('rounded-lg p-4', className)}>
				<Typography variant="p" weight="semibold" className="mb-2">
					{title}
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
	}
)

PasswordPolicyWidget.displayName = 'PasswordPolicyWidget'
