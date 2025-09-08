import { lazy, memo } from 'react'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)

interface TableDeviceComputerProps {
	devices?: DeviceDto[]
	handleViewDetails: (device: DeviceDto) => void
}

export const TableDeviceComputer = memo(
	({ devices, handleViewDetails }: TableDeviceComputerProps) => {
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
							className="hidden xl:table-cell"
							size="xLarge"
							value={device.location?.name}
						>
							{device.location?.name}
						</TableCell>

						<TableCell
							aria-colindex={3}
							size="small"
							value={device.computer?.ipAddress ?? ''}
						>
							{device.computer?.ipAddress ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={4}
							className="hidden md:table-cell"
							size="small"
							value={device.serial ?? ''}
						>
							{device.serial ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={5}
							className="1xl:table-cell hidden"
							size="small"
							value={device.category?.name}
						>
							{device.category?.name}
						</TableCell>

						<TableCell
							aria-colindex={6}
							className="hidden lg:table-cell"
							size="small"
							value={device.brand?.name}
						>
							{device.brand?.name}
						</TableCell>

						<TableCell
							aria-colindex={7}
							className="hidden sm:table-cell"
							size="xLarge"
							value={device.model?.name}
						>
							{device.model?.name}
						</TableCell>

						<TableCell
							aria-colindex={8}
							className="hidden lg:table-cell"
							size="small"
							value={device.computer?.computerName ?? ''}
						>
							{device.computer?.computerName ?? ''}
						</TableCell>
						<TableCell
							aria-colindex={9}
							className="hidden 2xl:table-cell"
							size="medium"
							value={device.computer?.operatingSystem?.name ?? ''}
						>
							{device.computer?.operatingSystem?.name ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={10}
							className="3xl:table-cell hidden"
							size="medium"
							value={device.observation ?? ''}
						/>
						<TableCellOpenIcon index={11} onClick={() => handleViewDetails(device)} />
					</TableRow>
				))}
			</>
		)
	}
)

TableDeviceComputer.displayName = 'TableDeviceComputer'
