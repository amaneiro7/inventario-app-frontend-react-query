import { memo } from 'react'
import { TableCell } from './TableCell'
import { TableRow } from './TableRow'

export const TableCellError = memo(({ colSpan }: { colSpan: number }) => {
	return (
		<TableRow>
			<TableCell colSpan={colSpan} size="xLarge" value="Ha ocurrido un error" />
		</TableRow>
	)
})
