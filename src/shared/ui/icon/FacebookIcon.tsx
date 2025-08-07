import Facebook from '@/shared/assets/svg/facebook.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function FacebookIcon({ ...props }: Props) {
	return (
		<i>
			<Facebook {...props} />
		</i>
	)
}
