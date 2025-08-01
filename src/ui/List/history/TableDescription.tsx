import { memo } from 'react'
import { TableCellDescInfo } from '@/shared/ui/Table/TableCellDescInfo'
import { TableCellDescription } from '@/shared/ui/Table/TableCellDescription'
import { ChangeDisplay } from './ChangeDisplay'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'

interface HistoryDescriptionProps {
	open: boolean
	history: HistoryDto
	colSpan: number
}

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
