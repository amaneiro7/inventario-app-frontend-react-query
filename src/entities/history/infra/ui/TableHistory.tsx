import React, { lazy, memo } from 'react'
import { useExpendedRows } from '@/shared/lib/hooks/useExpendedRows'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'
import { type BackgroundType } from '@/shared/ui/Typography/types'

const HistoryDescription = lazy(() =>
	import('./HistoryDescription').then(m => ({ default: m.HistoryDescription }))
)

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TableCellOpenIcon = lazy(() =>
	import('@/shared/ui/Table/TableCellOpenIcon').then(m => ({ default: m.TableCellOpenIcon }))
)
const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)
interface TableHistoryProps {
	/**
	 * An array of history data to display in the table.
	 */
	histories?: HistoryDto[]
	/**
	 * Indicates whether an error occurred during data fetching.
	 */
	isError: boolean
	/**
	 * The number of columns the table should span.
	 */
	colSpan: number
}

/**
 * `TableHistory` is a memoized component that renders a table of history records.
 * It handles displaying loading states, error states, empty states, and individual history rows
 * with expandable details.
 */
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
								'[&>td]:border-b-slate-200 [&>td]:bg-slate-200'
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
