import LinkedIn from '@/shared/assets/svg/linkedin.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function LinkedInIcon({ ...props }: Props) {
	return (
		<i>
			<LinkedIn {...props} />
		</i>
	)
}
