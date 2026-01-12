import { lazy, memo } from 'react'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)

interface TableDevicePrinterProps {
	devices?: DeviceDto[]
	handleViewDetails: (device: DeviceDto) => void
}

export const TableDevicePrinter = memo(
	({ devices, handleViewDetails }: TableDevicePrinterProps) => {
		return (
			<>
				{devices?.map(device => (
					<TableRow key={device.id}>
						<TableCell
							aria-colindex={1}
							className="2lg:table-cell hidden"
							size="small"
							value={device.employee?.userName ?? ''}
						>
							{device.employee?.userName ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={2}
							// className="hidden md:table-cell"
							size="xLarge"
							value={device.location?.name}
						>
							{device.location?.name}
						</TableCell>

						<TableCell
							aria-colindex={3}
							size="small"
							value={device.printer?.ipAddress ?? ''}
						>
							{device.printer?.ipAddress ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={4}
							className="1md:table-cell hidden"
							size="small"
							value={device.serial ?? ''}
						>
							{device.serial ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={5}
							className="1lg:table-cell hidden"
							size="medium"
							value={device.category?.name}
						>
							{device.category?.name}
						</TableCell>

						<TableCell
							aria-colindex={6}
							className="hidden md:table-cell"
							size="small"
							value={device.brand?.name}
						>
							{device.brand?.name}
						</TableCell>

						<TableCell
							aria-colindex={7}
							className="1sm:table-cell hidden"
							size="medium"
							value={device.model?.name}
						>
							{device.model?.name}
						</TableCell>

						<TableCell
							aria-colindex={8}
							className="1xl:table-cell hidden"
							size="auto"
							value={device.observation ?? ''}
						>
							{device.observation ?? ''}
						</TableCell>
						<TableCellOpenIcon index={9} onClick={() => handleViewDetails(device)} />
					</TableRow>
				))}
			</>
		)
	}
)

TableDevicePrinter.displayName = 'TableDevicePrinter'
