import React, { memo } from 'react'
import { CircleSlash, HelpCircle, TriangleAlert, Wifi, WifiOff } from 'lucide-react'
import { getRelativeTime } from '@/utils/getRelativeTime'
import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
import { TableCellOpenIcon } from '@/components/Table/TableCellOpenIcon'
import { TableRow } from '@/components/Table/TableRow'
import { TableCell } from '@/components/Table/TableCell'
import { TableCellError } from '@/components/Table/TableCellError'
import { TableCellEmpty } from '@/components/Table/TableCellEmpty'
import { type DeviceMonitoringDto } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'
import { DeviceMonitoringDescription } from './DeviceMonitoringDescription'
import { DeviceMonitoringStatuses } from '@/core/devices/deviceMonitoring/domain/value-object/DeviceMonitoringStatus'

interface TableDeviceMonitoringProps {
	devices?: DeviceMonitoringDto[]
	isError: boolean
	colSpan: number
	visibleColumns: string[]
}

export const TableDeviceMonitoring = memo(
	({ devices, isError, colSpan, visibleColumns }: TableDeviceMonitoringProps) => {
		const { expandedRows, handleRowClick } = useExpendedRows()
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
						<TableRow
							className={`[&>td]:cursor-pointer ${
								expandedRows.includes(device.id) &&
								'[&>td]:border-b-slate-200 [&>td]:bg-slate-200'
							}`}
							onClick={() => handleRowClick(device.id)}
						>
							{visibleColumns.includes('status') ? (
								<TableCell
									size="small"
									value={device.status}
									icon={
										device.status === DeviceMonitoringStatuses.ONLINE ? (
											<Wifi className="ml-4 h-4 w-4 text-center text-green-500" />
										) : device.status === DeviceMonitoringStatuses.OFFLINE ? (
											<WifiOff className="ml-4 h-4 w-4 text-red-500" />
										) : device.status ===
										  DeviceMonitoringStatuses.HOSTNAME_MISMATCH ? (
											<TriangleAlert className="ml-4 h-4 w-4 text-orange-500" />
										) : device.status ===
										  DeviceMonitoringStatuses.NOTAVAILABLE ? (
											<CircleSlash className="ml-4 h-4 w-4 text-gray-500" />
										) : (
											<HelpCircle className="ml-4 h-4 w-4 text-gray-400" />
										)
									}
								/>
							) : null}
							{visibleColumns.includes('computerName') ? (
								<TableCell size="xLarge" value={device?.computerName ?? ''} />
							) : null}
							{visibleColumns.includes('ipAddress') ? (
								<TableCell size="small" value={device?.ipAddress ?? ''} />
							) : null}
							{visibleColumns.includes('locationId') ? (
								<TableCell size="xxLarge" value={device.location.name ?? ''} />
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
							<TableCellOpenIcon open={expandedRows.includes(device.id)} />
						</TableRow>
						<DeviceMonitoringDescription
							open={expandedRows.includes(device.id)}
							device={device}
							colSpan={colSpan}
							visibleColumns={visibleColumns}
						/>
					</React.Fragment>
				))}
			</>
		)
	}
)
