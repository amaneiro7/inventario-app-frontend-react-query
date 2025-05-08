import { memo } from 'react'
import Typography from '../Typography'
import { type LoginUserDto } from '@/core/user/domain/dto/LoginUser.dto'

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
			<span>{`${user?.name} ${user?.lastName}`}</span>
			<span>{`${user?.role?.name}`}</span>
		</Typography>
	)
})
