import { lazy, memo } from 'react'
import { type ShipmentDto } from '@/entities/shipment/domain/dto/Shipment.dto'
import Typography from '@/shared/ui/Typography'
import { formatDateToUTC } from '@/shared/lib/utils/formatDateToUTC'

const TableCellDescInfo = lazy(() =>
	import('@/shared/ui/Table/TableCellDescInfo').then(m => ({ default: m.TableCellDescInfo }))
)

const TableCellDescription = lazy(() =>
	import('@/shared/ui/Table/TableCellDescription').then(m => ({
		default: m.TableCellDescription
	}))
)

interface ShipmentDescriptionProps {
	/**
	 * Controls the visibility of the description.
	 */
	open: boolean
	/**
	 * The Shipment data to display.
	 */
	shipment: ShipmentDto
	/**
	 * The number of columns the description should span in the table.
	 */
	colSpan: number
	visibleColumns: string[]
}

/**
 * `ShipmentDescription` is a memoized component that displays detailed information about a Shipment record.
 * It is typically used within a table row to show additional details when expanded, including changes made.
 */
export const ShipmentDescription = memo(
	({ open, shipment, colSpan, visibleColumns }: ShipmentDescriptionProps) => {
		const deliveryDate = formatDateToUTC(shipment.deliveryDate)
		const reason = shipment.reason
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
		return (
			<>
				<TableCellDescription
					open={open}
					state={shipment}
					stateId={shipment.id}
					url={`/form/shipment/edit/${shipment.id}`}
					colspan={colSpan}
				>
					{/* --- Grupo 1: Información del Envío --- */}
					<div className="border-b">
						<Typography
							variant="h5"
							color="azul"
							weight="extrabold"
							className="col-span-full mb-2"
						>
							Información de Envío
						</Typography>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							<TableCellDescInfo
								title="Enviado por"
								text={`${shipment?.fromUser?.name} ${shipment?.fromUser?.lastName}`}
							/>
							<TableCellDescInfo
								title="Recibido por"
								text={
									shipment.receivedBy
										? `${shipment?.toEmployee?.name} ${shipment?.toEmployee?.lastName}`
										: 'Pendiente de recepción'
								}
							/>
							<TableCellDescInfo
								title="Origen"
								text={shipment.originLocation?.name}
							/>
							<TableCellDescInfo
								title="Destino"
								text={shipment.destinationLocation?.name}
							/>
							<TableCellDescInfo
								title="Número de seguimiento"
								text={shipment.trackingNumber ?? 'No proporcianado'}
							/>
							{!visibleColumns.includes('reason') ? (
								<TableCellDescInfo title="Motivo" text={reason} />
							) : null}
							{!visibleColumns.includes('deliveryDate') ? (
								<TableCellDescInfo title="Fecha de Entrega" text={deliveryDate} />
							) : null}
							{shipment.observation && (
								<TableCellDescInfo
									title="Observaciones"
									text={shipment.observation}
								/>
							)}
						</div>
					</div>
					{/* --- Grupo 2: Equipos Incluidos --- */}
					<div className="flex-1 p-4">
						<Typography
							variant="h5"
							color="azul"
							weight="extrabold"
							className="col-span-full mb-2"
						>
							Equipos Incluidos ({shipment.shipmentDevice?.length ?? 0})
						</Typography>

						<ul className="list-disc space-y-2 pl-5">
							{shipment.shipmentDevice?.map(({ deviceSnapshot: device }) => (
								<li key={device.id}>
									<Typography variant="p" color="azul">
										<Typography variant="span" option="tiny" weight="semibold">
											{device.categoryName}:{' '}
										</Typography>
										<Typography
											variant="span"
											option="tiny"
											weight="extralight"
										>
											{device.brandName} - {device.modelName} - (Serial:{' '}
											{device.serial ?? 'N/A'})
										</Typography>
									</Typography>
								</li>
							))}
						</ul>
					</div>
				</TableCellDescription>
			</>
		)
	}
)
