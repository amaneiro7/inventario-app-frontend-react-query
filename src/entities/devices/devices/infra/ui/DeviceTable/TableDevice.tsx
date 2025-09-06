import { lazy, memo, Suspense, useRef, useState } from 'react'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'
import { type ModalRef } from '@/shared/ui/Modal/Modal'

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const ComputerDetailsModal = lazy(() =>
	import('./ComputerDetailsModal').then(m => ({ default: m.ComputerDetailsModal }))
)
const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)
const Dialog = lazy(() => import('@/shared/ui/Modal/Modal').then(m => ({ default: m.Dialog })))

interface TableDeviceProps {
	devices?: DeviceDto[]
	isError: boolean
	colSpan: number
}

export const TableDevice = memo(({ devices, isError, colSpan }: TableDeviceProps) => {
	// 1. Estado para el dispositivo seleccionado
	const [selectedDevice, setSelectedDevice] = useState<DeviceDto | null>(null)
	const dialogRef = useRef<ModalRef>(null)

	if (isError) {
		return <TableCellError colSpan={colSpan} />
	}
	if (devices && devices.length === 0) {
		return <TableCellEmpty colSpan={colSpan} />
	}

	// 2. Funciones para abrir y cerrar el modal, manejando el estado
	const handleViewDetails = (device: DeviceDto) => {
		setSelectedDevice(device)
		dialogRef.current?.handleOpen()
	}

	const handleCloseModal = () => {
		dialogRef.current?.handleClose()
		// Es buena práctica limpiar el estado después de que la animación de cierre termine,
		// pero por simplicidad lo hacemos al mismo tiempo.
		setSelectedDevice(null)
	}

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
						className="4xl:table-cell hidden"
						size="auto"
						value={device.observation ?? ''}
					/>
					<TableCellOpenIcon index={11} onClick={() => handleViewDetails(device)} />
				</TableRow>
			))}

			{/* 4. El modal ahora está fuera del map y solo se renderiza uno */}
			<Suspense>
				<Dialog ref={dialogRef}>
					{/* Solo renderizamos los detalles si hay un dispositivo seleccionado */}
					{selectedDevice && (
						<ComputerDetailsModal device={selectedDevice} onCLose={handleCloseModal} />
					)}
				</Dialog>
			</Suspense>
		</>
	)
})

TableDevice.displayName = 'TableDevice'
