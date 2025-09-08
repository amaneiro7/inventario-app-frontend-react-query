import { memo, Suspense } from 'react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellError } from '@/shared/ui/Table/TableCellError'
import { TableCellEmpty } from '@/shared/ui/Table/TableCellEmpty'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { Icon } from '@/shared/ui/icon/Icon'
import { monitoringStatusConfig } from '../../Shared/Model/monitoringStatusConfig'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { type LocationMonitoringDto } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoring.dto'
import { Dialog } from '@/shared/ui/Modal/Modal'
import { DetailsLocationMonitoringModal } from './DetailsLocationMonitoringModal'

interface TableLocationMonitoringProps {
	locations?: LocationMonitoringDto[]
	isError: boolean
}

export const TableLocationMonitoring = memo(
	({ locations, isError }: TableLocationMonitoringProps) => {
		const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
			useTableGenericDeviceBody<LocationMonitoringDto>()
		if (isError) {
			return <TableCellError />
		}
		if (locations && locations.length === 0) {
			return <TableCellEmpty />
		}

		return (
			<>
				{locations?.map(location => (
					<TableRow key={location.id}>
						<TableCell aria-colindex={1} size="small" value={location.status}>
							<Icon
								name={monitoringStatusConfig[location.status]?.icon ?? 'helpCircle'}
								className={
									monitoringStatusConfig[location.status]?.className ??
									'ml-4 h-4 w-4 text-gray-400'
								}
							/>
						</TableCell>

						<TableCell aria-colindex={2} size="xxLarge" value={location?.name ?? ''}>
							{location?.name ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={3}
							size="medium"
							value={location?.subnet ?? ''}
							className="hidden sm:table-cell"
						>
							{location?.subnet ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={4}
							size="medium"
							value={location.site?.city?.state?.name ?? ''}
							className="2md:table-cell hidden"
						>
							{location.site?.city?.state?.name ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={5}
							size="small"
							value={
								location.lastSuccess
									? getRelativeTime(location.lastSuccess)
									: 'Nunca en línea'
							}
							className="hidden lg:table-cell"
						>
							{location.lastSuccess
								? getRelativeTime(location.lastSuccess)
								: 'Nunca en línea'}
						</TableCell>

						<TableCell
							aria-colindex={6}
							size="small"
							value={
								location.lastFailed
									? getRelativeTime(location.lastFailed)
									: 'Nunca offline'
							}
							className="hidden xl:table-cell"
						>
							{location.lastFailed
								? getRelativeTime(location.lastFailed)
								: 'Nunca offline'}
						</TableCell>

						<TableCell
							aria-colindex={7}
							size="small"
							value={
								location.lastScan ? getRelativeTime(location.lastScan) : 'Pendiente'
							}
							className="1xl:table-cell hidden"
						>
							{location.lastScan ? getRelativeTime(location.lastScan) : 'Pendiente'}
						</TableCell>

						<TableCellOpenIcon index={8} onClick={() => handleViewDetails(location)} />
					</TableRow>
				))}
				<Suspense>
					<Dialog ref={dialogRef}>
						{selectedDevice && (
							<DetailsLocationMonitoringModal
								onClose={handleCloseModal}
								location={selectedDevice}
							/>
						)}
					</Dialog>
				</Suspense>
			</>
		)
	}
)
