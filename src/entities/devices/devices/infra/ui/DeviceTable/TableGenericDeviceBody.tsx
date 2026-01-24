import { lazy, memo, Suspense } from 'react'
import { DetailsModal } from './DetailsModal'
import { Dialog, type ModalRef } from '@/shared/ui/Modal/Modal'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)

interface TableGenericDeviceBodyProps {
	devices?: DeviceDto[]
	isError: boolean
	selectedDevice: DeviceDto | null
	dialogRef: React.RefObject<ModalRef | null>
	handleCloseModal: () => void
}

export const TableGenericDeviceBody = memo(
	({
		children,
		devices,
		isError,
		dialogRef,
		handleCloseModal,
		selectedDevice
	}: React.PropsWithChildren<TableGenericDeviceBodyProps>) => {
		if (isError) {
			return <TableCellError />
		}
		if (devices && devices.length === 0) {
			return <TableCellEmpty />
		}

		return (
			<>
				{children}

				<Dialog ref={dialogRef}>
					<Suspense fallback={null}>
						{selectedDevice && (
							<DetailsModal device={selectedDevice} onCLose={handleCloseModal} />
						)}
					</Suspense>
				</Dialog>
			</>
		)
	}
)

TableGenericDeviceBody.displayName = 'TableGenericDeviceBody'
