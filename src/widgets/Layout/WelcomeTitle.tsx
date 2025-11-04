import { memo } from 'react'
import { useGreetings } from '@/shared/lib/hooks/useGreetings'
import Typography from '../../shared/ui/Typography'
import { formatDateTime } from '@/shared/lib/utils/formatDate'
import { type LoginUserDto } from '@/entities/user/domain/dto/LoginUser.dto'

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLParagraphElement>,
	HTMLParagraphElement
> & {
	user: LoginUserDto | null
}

export const WelcomeTitle = memo(({ user }: Props) => {
	if (user === null) return null
	const { greeting } = useGreetings()
	return (
		<Typography
			className="flex flex-col"
			variant="p"
			color="white"
			option="tiny"
			transform="capitalize"
			align="left"
			weight="light"
		>
			<span>
				<span>{greeting}, </span>
				<span className="font-semibold">{`${user?.employee?.name} ${user?.employee?.lastName}`}</span>
			</span>
			<span>
				<span>Último acceso: </span>
				<span className="font-semibold">
					{user?.lastLoginAt
						? formatDateTime(user.lastLoginAt)
						: 'Primer inicio de sesión'}
				</span>
			</span>
			<span>
				<span>IP de último acceso: </span>
				<span className="font-semibold">{user?.lastLoginIp ?? 'No registrada'}</span>
			</span>
		</Typography>
	)
})
