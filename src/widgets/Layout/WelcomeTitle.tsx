import { memo } from 'react'
import Typography from '../../shared/ui/Typography'
import { type LoginUserDto } from '@/entities/user/domain/dto/LoginUser.dto'

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLParagraphElement>,
	HTMLParagraphElement
> & {
	user: LoginUserDto | null
}

export const WelcomeTitle = memo(({ user }: Props) => {
	if (user === null) return null
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
			<span>Bienvenido, </span>
			<span>{`${user?.employee?.name} ${user?.employee?.lastName}`}</span>
			<span>{`${user?.role?.name}`}</span>
		</Typography>
	)
})
