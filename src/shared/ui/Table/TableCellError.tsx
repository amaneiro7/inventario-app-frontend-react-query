import { TableCell } from './TableCell'
import { TableRow } from './TableRow'

export const TableCellError = () => {
	return (
		<TableRow className="relative h-24">
			<TableCell
				className="absolute inset-0 flex w-full items-center justify-center"
				size="auto"
				value="Ha ocurrido un error"
			>
				Ha ocurrido un error
			</TableCell>
		</TableRow>
	)
}
