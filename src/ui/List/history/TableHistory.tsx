import React, { memo } from 'react'
import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
import { TableRow } from '@/components/Table/TableRow'
import { TableCell } from '@/components/Table/TableCell'
import { TableCellOpenIcon } from '@/components/Table/TableCellOpenIcon'
import { TableCellError } from '@/components/Table/TableCellError'
import { TableCellEmpty } from '@/components/Table/TableCellEmpty'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'
import { getRelativeTime } from '@/utils/getRelativeTime'
import { BackgroundType } from '@/components/Typography/types'
import { HistoryDescription } from './TableDescription'

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
			{histories?.map(history => {
				const relativeTime = `${new Date(
					history.updatedAt
				).toLocaleDateString()} (${getRelativeTime(history.updatedAt)})`
				const operation = history.action === 'UPDATE' ? 'Modificación' : 'Creación'
				const backGroundColor: BackgroundType =
					operation === 'Creación' ? 'naranja' : 'verde'
				return (
					<React.Fragment key={history.id}>
						<TableRow
							className={`[&>td]:cursor-pointer ${
								expandedRows.includes(history.id) &&
								'[&>td]:bg-slate-200 [&>td]:border-b-slate-200'
							}`}
							onClick={() => handleRowClick(history.id)}
						>
							<TableCell size="medium" value={history.user?.email ?? ''} />
							<TableCell
								size="small"
								tag
								backgroundColor={backGroundColor}
								color="white"
								value={operation}
							/>
							<TableCell size="small" value={history.device?.category?.name ?? ''} />
							<TableCell size="small" value={history.device?.serial ?? ''} />
							<TableCell size="small" value={relativeTime} />
							<TableCellOpenIcon open={expandedRows.includes(history.id)} />
						</TableRow>
						<HistoryDescription
							open={expandedRows.includes(history.id)}
							colSpan={colSpan}
							history={history}
						/>
					</React.Fragment>
				)
			})}
		</>
	)
})
