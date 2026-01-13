import { lazy, memo } from 'react'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)

interface TableGenericDeviceCellProps {
	devices?: DeviceDto[]
	handleViewDetails: (device: DeviceDto) => void
}

export const TableGenericDeviceCell = memo(
	({ devices, handleViewDetails }: TableGenericDeviceCellProps) => {
		return (
			<>
				{devices?.map(device => (
					<TableRow key={device.id}>
						<TableCell
							aria-colindex={1}
							size="small"
							value={device.employee?.userName ?? ''}
						>
							{device.employee?.userName ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={2}
							className="hidden md:table-cell"
							size="auto"
							value={device.location?.name}
						>
							{device.location?.name}
						</TableCell>

						<TableCell
							aria-colindex={3}
							className="1md:table-cell hidden"
							size="small"
							value={device.serial ?? ''}
						>
							{device.serial ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={4}
							className="2lg:table-cell hidden"
							size="small"
							value={device.category?.name}
						>
							{device.category?.name}
						</TableCell>

						<TableCell
							aria-colindex={5}
							className="hidden lg:table-cell"
							size="small"
							value={device.brand?.name}
						>
							{device.brand?.name}
						</TableCell>

						<TableCell aria-colindex={6} size="large" value={device.model?.name}>
							{device.model?.name}
						</TableCell>

						<TableCell
							aria-colindex={7}
							className="hidden xl:table-cell"
							size="auto"
							value={device.observation ?? ''}
						>
							{device.observation ?? ''}
						</TableCell>
						<TableCellOpenIcon index={8} onClick={() => handleViewDetails(device)} />
					</TableRow>
				))}
			</>
		)
	}
)

TableGenericDeviceCell.displayName = 'TableGenericDeviceCell'
