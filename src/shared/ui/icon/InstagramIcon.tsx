import Instagram from '@/shared/assets/svg/instagram.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function InstagramIcon({ ...props }: Props) {
	return (
		<i>
			<Instagram {...props} />
		</i>
	)
}
