import { twMerge } from 'tailwind-merge'
import Typography from '../Typography'

interface Props {
	title: string
	text: string
	className?: string
}

export function TableCellDescInfo({ title, text, className }: Props) {
	const classes = twMerge('max-w-fit flex flex-col gap-1', className)
	return (
		<Typography variant="p" color="azul" option="tiny" className={classes}>
			<Typography variant="span" option="tiny" className="font-extrabold">
				{title}:
			</Typography>
			<Typography variant="span" option="tiny" className="ml-2 font-light max-w-36">
				{text}
			</Typography>
		</Typography>
	)
}
