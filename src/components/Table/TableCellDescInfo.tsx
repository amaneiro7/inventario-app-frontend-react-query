import Typography from '../Typography'

interface Props {
	title: string
	text: string
}

export function TableCellDescInfo({ title, text }: Props) {
	return (
		<Typography
			variant="p"
			color="azul"
			option="tiny"
			className="max-w-fit flex flex-col gap-1"
		>
			<Typography variant="span" option="tiny" className="font-extrabold">
				{title}:
			</Typography>
			<Typography variant="span" option="tiny" className="ml-2 font-light">
				{text}
			</Typography>
		</Typography>
	)
}
