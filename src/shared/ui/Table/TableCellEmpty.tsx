import { TableRow } from './TableRow'
import { TableCell } from './TableCell'

export const TableCellEmpty = () => {
	return (
		<TableRow className="relative h-24">
			<TableCell
				size="auto"
				className="absolute inset-0 flex w-full items-center justify-center"
				value="No se encontraron resultados"
			>
				No se encontraron resultados
			</TableCell>
		</TableRow>
	)
}
