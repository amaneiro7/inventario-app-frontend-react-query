import { lazy, memo, Suspense } from 'react'
import { formatDateToUTC } from '@/shared/lib/utils/formatDateToUTC'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { getShipmentStatusText } from './GetShipmentStatusText'
import { getShipmentStatusColor } from './GetShipmentStatusColor'
import { type StatusEnum } from '../../domain/value-object/ShipmentStatus'
import { type ShipmentDto } from '@/entities/shipment/domain/dto/Shipment.dto'

const Tag = lazy(() => import('@/shared/ui/Tag').then(m => ({ default: m.Tag })))

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TableCellOpenIcon = lazy(() =>
	import('@/shared/ui/Table/TableCellOpenIcon').then(m => ({ default: m.TableCellOpenIcon }))
)
const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)
const Dialog = lazy(() => import('@/shared/ui/Modal/Modal').then(m => ({ default: m.Dialog })))
const DetailsShipmentModal = lazy(() =>
	import('./DetailsShipmentModal').then(m => ({ default: m.DetailsShipmentModal }))
)
interface TableShipmentProps {
	shipments?: ShipmentDto[]
	isError: boolean
}

/**
 * `TableShipment` is a memoized component that renders a table of Shipment records.
 * It handles displaying loading states, error states, empty states, and individual Shipment rows
 * with expandable details.
 */
export const TableShipment = memo(({ shipments, isError }: TableShipmentProps) => {
	const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
		useTableGenericDeviceBody<ShipmentDto>()

	if (isError) {
		return <TableCellError />
	}
	if (shipments && shipments.length === 0) {
		return <TableCellEmpty />
	}

	return (
		<>
			{shipments?.map(shipment => {
				const deliveryDate = shipment.deliveryDate
					? formatDateToUTC(shipment.deliveryDate)
					: 'Pendiente'
				const shipmentDate = formatDateToUTC(shipment.shipmentDate)
				const status = shipment.status as StatusEnum
				const reason = shipment.reason
					.split('_')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ')
				return (
					<TableRow key={shipment.id}>
						<TableCell aria-colindex={1} size="small" value={shipment.shipmentCode}>
							{shipment.shipmentCode}
						</TableCell>

						<TableCell
							aria-colindex={2}
							size="xSmall"
							value={status}
							className="xs:table-cell hidden"
						>
							<Tag
								backgroundColor={getShipmentStatusColor(status)}
								iconText={getShipmentStatusText(status)}
								color="white"
								option="tiny"
							/>
						</TableCell>

						<TableCell
							aria-colindex={3}
							size="small"
							value={`${shipment?.fromUser?.employee?.name} ${shipment?.fromUser?.employee?.lastName}`}
							className="hidden 2xl:table-cell"
						>
							{`${shipment?.fromUser?.employee?.name} ${shipment?.fromUser?.employee?.lastName}`}
						</TableCell>

						<TableCell
							aria-colindex={4}
							size="large"
							value={shipment.originLocation?.name}
							className="1xl:table-cell hidden"
						>
							{shipment.originLocation?.name}
						</TableCell>

						<TableCell
							aria-colindex={5}
							size="large"
							value={shipment.destinationLocation?.name}
							className="2md:table-cell hidden"
						>
							{shipment.destinationLocation?.name}
						</TableCell>

						<TableCell
							aria-colindex={6}
							size="xSmall"
							value={reason}
							className="hidden lg:table-cell"
						>
							{reason}
						</TableCell>

						<TableCell
							aria-colindex={7}
							size="xSmall"
							value={shipment.shipmentDevice.length}
							className="2lg:table-cell hidden"
						>
							{shipment.shipmentDevice.length}
						</TableCell>

						<TableCell
							aria-colindex={8}
							size="small"
							value={shipmentDate}
							className="hidden md:table-cell"
						>
							{shipmentDate}
						</TableCell>

						<TableCell
							aria-colindex={9}
							size="small"
							value={deliveryDate}
							className="2md:table-cell hidden"
						>
							{deliveryDate}
						</TableCell>

						<TableCellOpenIcon index={10} onClick={() => handleViewDetails(shipment)} />
					</TableRow>
				)
			})}
			<Suspense>
				<Dialog ref={dialogRef}>
					{selectedDevice && (
						<DetailsShipmentModal
							onClose={handleCloseModal}
							shipment={selectedDevice}
						/>
					)}
				</Dialog>
			</Suspense>
		</>
	)
})
