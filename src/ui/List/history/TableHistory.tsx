import React, { memo } from 'react'
import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
import { TableRow } from '@/components/Table/TableRow'
import { TableCell } from '@/components/Table/TableCell'
import { TableCellOpenIcon } from '@/components/Table/TableCellOpenIcon'
import { TableCellError } from '@/components/Table/TableCellError'
import { TableCellEmpty } from '@/components/Table/TableCellEmpty'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'

interface TableHistoryProps {
	histories?: HistoryDto[]
	isError: boolean
	colSpan: number
}

export const TableHistory = memo(({ histories, isError, colSpan }: TableHistoryProps) => {
	const { expandedRows, handleRowClick } = useExpendedRows()

	if (isError) {
		return <TableCellError colSpan={colSpan} />
	}
	if (histories && histories.length === 0) {
		return <TableCellEmpty colSpan={colSpan} />
	}

	return (
		<>
			{histories?.map(history => (
				<React.Fragment key={history.id}>
					<TableRow
						className={`[&>td]:cursor-pointer ${
							expandedRows.includes(history.id) &&
							'[&>td]:bg-slate-200 [&>td]:border-b-slate-200'
						}`}
						onClick={() => handleRowClick(history.id)}
					>
						<TableCell size="small" value={history.user?.email ?? ''} />
						<TableCell size="large" value={history.action} />
						<TableCell size="small" value={history.device?.serial ?? ''} />
						<TableCell size="small" value={history.updatedAt ?? ''} />
						<TableCellOpenIcon open={expandedRows.includes(history.id)} />
					</TableRow>
					{/* <ComputerDescription open={expandedRows.includes(device.id)} device={device} /> */}
				</React.Fragment>
			))}
		</>
	)
})
