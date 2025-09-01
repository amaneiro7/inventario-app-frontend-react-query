import React, { lazy, memo } from 'react'
import { useExpendedRows } from '@/shared/lib/hooks/useExpendedRows'
import { formatDateToUTC } from '@/shared/lib/utils/formatDateToUTC'
import { StatusEnum } from '../../domain/value-object/ShipmentStatus'
import { type ShipmentDto } from '@/entities/shipment/domain/dto/Shipment.dto'
import { type BackgroundType } from '@/shared/ui/Typography/types'

const ShipmentDescription = lazy(() =>
	import('./ShipmentDescription').then(m => ({ default: m.ShipmentDescription }))
)

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
interface TableShipmentProps {
	/**
	 * An array of Shipment data to display in the table.
	 */
	shipments?: ShipmentDto[]
	/**
	 * Indicates whether an error occurred during data fetching.
	 */
	isError: boolean
	/**
	 * The number of columns the table should span.
	 */
	colSpan: number
	visibleColumns: string[]
}

/**
 * `TableShipment` is a memoized component that renders a table of Shipment records.
 * It handles displaying loading states, error states, empty states, and individual Shipment rows
 * with expandable details.
 */
export const TableShipment = memo(
	({ shipments, isError, colSpan, visibleColumns }: TableShipmentProps) => {
		const { expandedRows, handleRowClick } = useExpendedRows()

		if (isError) {
			return <TableCellError colSpan={colSpan} />
		}
		if (shipments && shipments.length === 0) {
			return <TableCellEmpty colSpan={colSpan} />
		}

		return (
			<>
				{shipments?.map(shipment => {
					const deliveryDate = shipment.deliveryDate
						? formatDateToUTC(shipment.deliveryDate)
						: 'Pendiente'
					const shipmentDate = formatDateToUTC(shipment.shipmentDate)
					const status = shipment.status
						.split('_')
						.map(word => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')
					const reason = shipment.reason
						.split('_')
						.map(word => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')
					const backGroundColor = (status: string): BackgroundType => {
						switch (status) {
							case StatusEnum.PENDING:
								return 'amarillo'
							case StatusEnum.IN_TRANSIT:
								return 'azul'
							case StatusEnum.DELIVERED:
								return 'verde'
							case StatusEnum.CANCELLED:
								return 'rojo'
							default:
								return 'gris'
						}
					}
					return (
						<React.Fragment key={shipment.id}>
							<TableRow
								className={`[&>td]:cursor-pointer ${
									expandedRows.includes(shipment.id) &&
									'[&>td]:border-b-slate-200 [&>td]:bg-slate-200'
								}`}
								onClick={() => handleRowClick(shipment.id)}
							>
								{visibleColumns.includes('shipmentCode') ? (
									<TableCell size="small" value={shipment.shipmentCode} />
								) : null}
								{visibleColumns.includes('status') ? (
									<TableCell
										tag
										backgroundColor={backGroundColor(shipment.status)}
										color="white"
										size="xSmall"
										value={status}
									/>
								) : null}
								{visibleColumns.includes('sentBy') ? (
									<TableCell
										size="small"
										value={`${shipment?.fromUser?.name} ${shipment?.fromUser?.lastName}`}
									/>
								) : null}
								{visibleColumns.includes('origen') ? (
									<TableCell size="large" value={shipment.originLocation?.name} />
								) : null}
								{visibleColumns.includes('destination') ? (
									<TableCell
										size="large"
										value={shipment.destinationLocation?.name}
									/>
								) : null}
								{visibleColumns.includes('reason') ? (
									<TableCell size="xSmall" value={reason} />
								) : null}
								{visibleColumns.includes('shipmentDeviceLenght') ? (
									<TableCell
										size="xSmall"
										value={shipment.shipmentDevice.length}
									/>
								) : null}
								{visibleColumns.includes('shipmentDate') ? (
									<TableCell size="small" value={shipmentDate} />
								) : null}
								{visibleColumns.includes('deliveryDate') ? (
									<TableCell size="small" value={deliveryDate} />
								) : null}
								{visibleColumns.includes('actions') ? (
									<TableCellOpenIcon open={expandedRows.includes(shipment.id)} />
								) : null}
							</TableRow>
							<ShipmentDescription
								open={expandedRows.includes(shipment.id)}
								colSpan={colSpan}
								shipment={shipment}
								visibleColumns={visibleColumns}
							/>
						</React.Fragment>
					)
				})}
			</>
		)
	}
)
