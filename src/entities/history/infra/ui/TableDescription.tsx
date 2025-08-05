import { memo } from 'react'
import { TableCellDescInfo } from '@/shared/ui/Table/TableCellDescInfo'
import { TableCellDescription } from '@/shared/ui/Table/TableCellDescription'
import { ChangeDisplay } from './ChangeDisplay'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'

interface HistoryDescriptionProps {
	/**
	 * Controls the visibility of the description.
	 */
	open: boolean
	/**
	 * The history data to display.
	 */
	history: HistoryDto
	/**
	 * The number of columns the description should span in the table.
	 */
	colSpan: number
}

/**
 * `HistoryDescription` is a memoized component that displays detailed information about a history record.
 * It is typically used within a table row to show additional details when expanded, including changes made.
 */
export const HistoryDescription = memo(({ open, history, colSpan }: HistoryDescriptionProps) => {
	return (
		<>
			<TableCellDescription
				open={open}
				state={history}
				stateId={history.id}
				url={`/form/device/edit/${history.deviceId}`}
				colspan={colSpan}
			>
				<TableCellDescInfo
					title="Última Actualización"
					text={history.updatedAt ? new Date(history.updatedAt).toLocaleDateString() : ''}
				/>
				<ChangeDisplay action={history.action} changes={history.cambios} />
			</TableCellDescription>
		</>
	)
})