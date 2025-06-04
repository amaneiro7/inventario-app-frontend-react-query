import React, { memo } from 'react'
import { getRelativeTime } from '@/utils/getRelativeTime'
import { Wifi, WifiOff } from 'lucide-react'
// import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
// import { TableCellOpenIcon } from '@/components/Table/TableCellOpenIcon'
import { TableRow } from '@/components/Table/TableRow'
import { TableCell } from '@/components/Table/TableCell'
import { TableCellError } from '@/components/Table/TableCellError'
import { TableCellEmpty } from '@/components/Table/TableCellEmpty'
import { type LocationMonitoringDto } from '@/core/locations/locationMonitoring/domain/dto/LocationMonitoring.dto'

interface TableLocationMonitoringProps {
	locations?: LocationMonitoringDto[]
	isError: boolean
	colSpan: number
	visibleColumns: string[]
}

export const TableLocationMonitoring = memo(
	({ locations, isError, colSpan, visibleColumns }: TableLocationMonitoringProps) => {
		if (isError) {
			return <TableCellError colSpan={colSpan} />
		}
		if (locations && locations.length === 0) {
			return <TableCellEmpty colSpan={colSpan} />
		}

		return (
			<>
				{locations?.map(location => (
					<React.Fragment key={location.id}>
						<TableRow>
							{visibleColumns.includes('status') ? (
								<TableCell
									size="small"
									value={location.status}
									icon={
										location.status === 'online' ? (
											<Wifi className="text-verde-500 ml-4 h-4 w-4 text-center" />
										) : (
											<WifiOff className="text-rojo-500 ml-4 h-4 w-4" />
										)
									}
								/>
							) : null}
							{visibleColumns.includes('name') ? (
								<TableCell size="large" value={location?.name ?? ''} />
							) : null}
							{visibleColumns.includes('subnet') ? (
								<TableCell size="small" value={location?.subnet ?? ''} />
							) : null}
							{visibleColumns.includes('stateId') ? (
								<TableCell
									size="xLarge"
									value={location?.site?.city?.state?.name ?? ''}
								/>
							) : null}
							{visibleColumns.includes('lastSuccess') ? (
								<TableCell
									size="small"
									value={
										location.lastSuccess
											? getRelativeTime(location.lastSuccess)
											: 'Nunca en línea'
									}
								/>
							) : null}
							{visibleColumns.includes('lastFailed') ? (
								<TableCell
									size="small"
									value={
										location.lastFailed
											? getRelativeTime(location.lastFailed)
											: 'Nunca offline'
									}
								/>
							) : null}
							{visibleColumns.includes('lastScan') ? (
								<TableCell
									size="small"
									value={
										location.lastScan
											? getRelativeTime(location.lastScan)
											: 'Pendiente'
									}
								/>
							) : null}
							{/* <TableCellOpenIcon open={expandedRows.includes(location.id)} /> */}
						</TableRow>
					</React.Fragment>
				))}
			</>
		)
	}
)
