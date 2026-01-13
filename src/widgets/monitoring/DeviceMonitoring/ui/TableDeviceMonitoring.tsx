import { memo, Suspense } from 'react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { monitoringStatusConfig } from '../../Shared/Model/monitoringStatusConfig'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellError } from '@/shared/ui/Table/TableCellError'
import { TableCellEmpty } from '@/shared/ui/Table/TableCellEmpty'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { Icon } from '@/shared/ui/icon/Icon'
import { Dialog } from '@/shared/ui/Modal/Modal'
import { DetailsDeviceMonitoringModal } from './DetailsDeviceMonitoringModal'
import { type DeviceMonitoringDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

interface TableDeviceMonitoringProps {
	devices?: DeviceMonitoringDto[]
	isError: boolean
}

export const TableDeviceMonitoring = memo(({ devices, isError }: TableDeviceMonitoringProps) => {
	const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
		useTableGenericDeviceBody<DeviceMonitoringDto>()

	if (isError) {
		return <TableCellError />
	}
	if (devices && devices.length === 0) {
		return <TableCellEmpty />
	}

	return (
		<>
			{devices?.map(device => (
				<TableRow key={device.id}>
					<TableCell aria-colindex={1} size="small" value={device.status}>
						<Icon
							name={monitoringStatusConfig[device.status]?.icon ?? 'helpCircle'}
							className={
								monitoringStatusConfig[device.status]?.className ??
								'ml-4 h-4 w-4 text-gray-400'
							}
						/>
					</TableCell>

					<TableCell aria-colindex={2} size="xLarge" value={device?.computerName ?? ''}>
						{device?.computerName ?? ''}
					</TableCell>

					<TableCell
						aria-colindex={3}
						size="small"
						value={device?.ipAddress ?? ''}
						className="hidden sm:table-cell"
					>
						{device?.ipAddress ?? ''}
					</TableCell>

					<TableCell
						aria-colindex={4}
						size="xxLarge"
						value={device.location.name ?? ''}
						className="1md:table-cell hidden"
					>
						{device.location.name ?? ''}
					</TableCell>

					<TableCell
						aria-colindex={5}
						size="small"
						value={
							device.lastSuccess
								? getRelativeTime(device.lastSuccess)
								: 'Nunca en línea'
						}
						className="hidden lg:table-cell"
					>
						{device.lastSuccess
							? getRelativeTime(device.lastSuccess)
							: 'Nunca en línea'}
					</TableCell>

					<TableCell
						aria-colindex={6}
						size="small"
						value={
							device.lastFailed ? getRelativeTime(device.lastFailed) : 'Nunca offline'
						}
						className="hidden xl:table-cell"
					>
						{device.lastFailed ? getRelativeTime(device.lastFailed) : 'Nunca offline'}
					</TableCell>

					<TableCell
						aria-colindex={7}
						size="small"
						value={device.lastScan ? getRelativeTime(device.lastScan) : 'Pendiente'}
						className="1xl:table-cell hidden"
					>
						{device.lastScan ? getRelativeTime(device.lastScan) : 'Pendiente'}
					</TableCell>

					<TableCellOpenIcon index={8} onClick={() => handleViewDetails(device)} />
				</TableRow>
			))}
			<Suspense>
				<Dialog ref={dialogRef}>
					{selectedDevice && (
						<DetailsDeviceMonitoringModal
							onClose={handleCloseModal}
							device={selectedDevice}
						/>
					)}
				</Dialog>
			</Suspense>
		</>
	)
})
