import React, { memo } from 'react'
import { getRelativeTime } from '@/utils/getRelativeTime'
// import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
// import { TableCellOpenIcon } from '@/components/Table/TableCellOpenIcon'
import { TableRow } from '@/components/Table/TableRow'
import { TableCell } from '@/components/Table/TableCell'
import { TableCellError } from '@/components/Table/TableCellError'
import { TableCellEmpty } from '@/components/Table/TableCellEmpty'
import { type DeviceMonitoringDto } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'
import { Wifi, WifiOff } from 'lucide-react'

interface TableDeviceMonitoringProps {
	devices?: DeviceMonitoringDto[]
	isError: boolean
	colSpan: number
	visibleColumns: string[]
}

export const TableDeviceMonitoring = memo(
	({ devices, isError, colSpan, visibleColumns }: TableDeviceMonitoringProps) => {
		if (isError) {
			return <TableCellError colSpan={colSpan} />
		}
		if (devices && devices.length === 0) {
			return <TableCellEmpty colSpan={colSpan} />
		}

		return (
			<>
				{devices?.map(device => (
					<React.Fragment key={device.id}>
						<TableRow>
							{visibleColumns.includes('status') ? (
								<TableCell
									size="small"
									value={device.status}
									icon={
										device.status === 'online' ? (
											<Wifi className="ml-4 h-4 w-4 text-center text-green-500" />
										) : (
											<WifiOff className="ml-4 h-4 w-4 text-red-500" />
										)
									}
								/>
							) : null}
							{visibleColumns.includes('computerName') ? (
								<TableCell size="large" value={device?.computerName ?? ''} />
							) : null}
							{visibleColumns.includes('ipAddress') ? (
								<TableCell size="small" value={device?.ipAddress ?? ''} />
							) : null}
							{visibleColumns.includes('locationId') ? (
								<TableCell size="xLarge" value={device.location.name ?? ''} />
							) : null}
							{visibleColumns.includes('lastSuccess') ? (
								<TableCell
									size="small"
									value={
										device.lastSuccess
											? getRelativeTime(device.lastSuccess)
											: 'Nunca en línea'
									}
								/>
							) : null}
							{visibleColumns.includes('lastFailed') ? (
								<TableCell
									size="small"
									value={
										device.lastFailed
											? getRelativeTime(device.lastFailed)
											: 'Nunca offline'
									}
								/>
							) : null}
							{visibleColumns.includes('lastScan') ? (
								<TableCell
									size="small"
									value={
										device.lastScan
											? getRelativeTime(device.lastScan)
											: 'Pendiente'
									}
								/>
							) : null}
							{/* <TableCellOpenIcon open={expandedRows.includes(device.id)} /> */}
						</TableRow>
					</React.Fragment>
				))}
			</>
		)
	}
)
