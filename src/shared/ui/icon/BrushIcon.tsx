import Brush from './brush.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function BrushIcon({ ...props }: Props) {
	return (
		<i>
			<Brush {...props} />
		</i>
	)
}
