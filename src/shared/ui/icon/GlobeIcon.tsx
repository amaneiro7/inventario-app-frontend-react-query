import Globe from '@/shared/assets/svg/globe.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function GlobeIcon({ ...props }: Props) {
	return (
		<i>
			<Globe {...props} />
		</i>
	)
}
