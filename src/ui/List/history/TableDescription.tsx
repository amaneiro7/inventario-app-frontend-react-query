import { memo } from 'react'
import { TableCellDescInfo } from '@/components/Table/TableCellDescInfo'
import { TableCellDescription } from '@/components/Table/TableCellDescription'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'
import { compararDatos } from '@/utils/CompararDatos'
import { ChangeDisplay } from './ChangeDisplay'

interface HistoryDescriptionProps {
	open: boolean
	history: HistoryDto
	colSpan: number
}

export const HistoryDescription = memo(({ open, history, colSpan }: HistoryDescriptionProps) => {
	const cambios = compararDatos(history.newData, history.oldData)

	return (
		<>
			<TableCellDescription
				open={open}
				state={history}
				stateId={history.id}
				url={`/device/edit/${history.deviceId}`}
				colspan={colSpan}
			>
				<TableCellDescInfo
					title="Última Actualización"
					text={history.updatedAt ? new Date(history.updatedAt).toLocaleDateString() : ''}
				/>
				<ChangeDisplay changes={cambios} />
			</TableCellDescription>
		</>
	)
})
