import { memo } from 'react'
import { TableRow } from './TableRow'
import { TableCell } from './TableCell'

export const TableCellEmpty = memo(({ colSpan }: { colSpan: number }) => {
	return (
		<TableRow>
			<TableCell colSpan={colSpan + 1} size="xLarge" value="No se encontraron resultados" />
		</TableRow>
	)
})
