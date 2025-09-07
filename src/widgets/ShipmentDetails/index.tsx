import { lazy } from 'react'
import { StatusEnum } from '@/entities/shipment/domain/value-object/ShipmentStatus'
import Typography from '@/shared/ui/Typography'
import { DetailItem } from './DetailItem'
import { GetStatusIndicator } from './GetStatusIndicator'
import { formatDateToUTC } from '@/shared/lib/utils/formatDateToUTC'
import { type ShipmentDto } from '@/entities/shipment/domain/dto/Shipment.dto'

const DeviceSummaryCard = lazy(() =>
	import('../../entities/shipment/infra/ui/DeviceSummaryCard').then(m => ({
		default: m.DeviceSummaryCard
	}))
)

interface ShipmentDetailsProps {
	data: ShipmentDto | undefined
}

export const ShipmentDetails = ({ data }: ShipmentDetailsProps) => {
	return (
		<>
			{/* --- SECCIÓN DE TÍTULO --- */}
			<div>
				<Typography color="azul" variant="h5">
					Información detallada del envío
				</Typography>
				<Typography color="gris" option="small" variant="p">
					Código de envío: <strong>{data?.shipmentCode ?? 'N/A'}</strong>
				</Typography>
				<DetailItem
					label="Número de Tracking"
					value={data?.trackingNumber ?? 'No suministrado'}
				/>
			</div>

			{/* --- SECCIÓN DE DETALLES (2 COLUMNAS) --- */}
			<div className="grid grid-cols-1 md:grid-cols-2">
				{/* MODIFICADO: Usamos la función para mostrar el estatus */}
				<DetailItem
					label="Estatus del envío"
					value={GetStatusIndicator(data?.status as StatusEnum)}
				/>
				<DetailItem
					label="Motivo del envío"
					value={data?.reason ?? 'N/A'}
					transform="capitalize"
				/>
				<DetailItem
					label="Enviado por"
					value={`${data?.fromUser?.name} ${data?.fromUser?.lastName}`}
				/>
				<DetailItem
					label="Recibido por"
					value={
						data?.toEmployee
							? `${data.toEmployee.name} ${data.toEmployee.lastName}`
							: 'Pendiente de recepción'
					}
				/>
				<DetailItem
					label="Fecha de envío"
					value={data?.shipmentDate ? formatDateToUTC(data.shipmentDate) : 'N/A'}
				/>
				<DetailItem
					label="Fecha de recepción"
					value={data?.deliveryDate ? formatDateToUTC(data.deliveryDate) : 'Pendiente'}
				/>
				<DetailItem label="Observación" value={data?.observation || 'Sin observaciones'} />
			</div>

			{/* --- SECCIÓN DE UBICACIONES --- */}
			<div className="grid grid-cols-1 md:grid-cols-2">
				<DetailItem
					label="Enviado Desde"
					value={
						<>
							{data?.originLocation?.name} <br />
							<small>{data?.originLocation?.address}</small>
						</>
					}
				/>
				<DetailItem
					label="Recibido En"
					value={
						<>
							{data?.destinationLocation?.name} <br />
							<small>{data?.destinationLocation?.address}</small>
						</>
					}
				/>
			</div>

			{/* --- SECCIÓN DE DISPOSITIVOS --- */}
			<div>
				<Typography color="azul" variant="h6" className="mb-2">
					Dispositivos Enviados
				</Typography>
				{!data?.shipmentDevice || data?.shipmentDevice.length === 0 ? (
					<Typography color="gris" variant="p">
						No hay dispositivos en este envío.
					</Typography>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:flex-row md:grid-cols-2">
						{data.shipmentDevice.map(device => (
							<DeviceSummaryCard key={device.id} shipmentDevice={device} />
						))}
					</div>
				)}
			</div>
		</>
	)
}
