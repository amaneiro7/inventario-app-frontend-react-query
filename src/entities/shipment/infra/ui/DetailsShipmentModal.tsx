import { lazy, useMemo } from 'react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { formatDateToUTC } from '@/shared/lib/utils/formatDateToUTC'
import { CategoryOptionsName } from '@/entities/category/domain/entity/CategoryOptionsName'
import { type ShipmentDto } from '../../domain/dto/Shipment.dto'

const DetailModalWrapper = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalWrapper').then(m => ({
		default: m.DetailModalWrapper
	}))
)
const DetailModalHeader = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalHeader').then(m => ({
		default: m.DetailModalHeader
	}))
)
const DetailModalContent = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalContent').then(m => ({
		default: m.DetailModalContent
	}))
)
const ShipmentModalTitle = lazy(() =>
	import('./ShipmentModalTitle').then(m => ({ default: m.ShipmentModalTitle }))
)
const DetailItem = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailItem').then(m => ({ default: m.DetailItem }))
)
const CardDetail = lazy(() =>
	import('@/shared/ui/DescriptionList/CardDetail').then(m => ({ default: m.CardDetail }))
)
const Icon = lazy(() => import('@/shared/ui/icon/Icon').then(m => ({ default: m.Icon })))

const DeviceSummaryCard = lazy(() =>
	import('@/entities/shipment/infra/ui/DeviceSummaryCard').then(m => ({
		default: m.DeviceSummaryCard
	}))
)

interface DetailsShipmentModalProps {
	shipment: ShipmentDto
	onClose: () => void
}
export const DetailsShipmentModal = ({ shipment, onClose }: DetailsShipmentModalProps) => {
	const deliveryDate = useMemo(
		() => formatDateToUTC(shipment.deliveryDate),
		[shipment.deliveryDate]
	)
	const shipmentDate = useMemo(
		() => formatDateToUTC(shipment.shipmentDate),
		[shipment.shipmentDate]
	)

	const reason = useMemo(
		() =>
			shipment.reason
				.split('_')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' '),
		[shipment.reason]
	)

	return (
		<DetailModalWrapper>
			<DetailModalHeader onClose={onClose} url={`/form/shipment/edit/${shipment.id}`}>
				<ShipmentModalTitle shipmentCode={shipment.shipmentCode} status={shipment.status} />
			</DetailModalHeader>
			{/* --- Card de Información General --- */}
			<DetailModalContent>
				<CardDetail
					className="lg:col-span-2"
					title="Información General"
					icon={<Icon name="chipboardList" className="h-5 w-5" />}
				>
					<div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
						<DetailItem
							label="Enviado por"
							value={`${shipment?.fromUser?.employee?.name} ${shipment?.fromUser?.employee?.lastName}`}
						/>
						<DetailItem
							label="Recibido por"
							value={
								shipment.receivedBy
									? `${shipment?.toEmployee?.name} ${shipment?.toEmployee?.lastName}`
									: 'Pendiente de recepción'
							}
						/>
						<DetailItem
							label="Número de seguimiento"
							value={shipment.trackingNumber ?? 'No proporcianado'}
						/>
						<DetailItem label="Motivo" value={reason} />
						<DetailItem label="Fecha de Envio" value={shipmentDate} />
						<DetailItem label="Fecha de Entrega" value={deliveryDate} />
						<DetailItem label="Observaciones" value={shipment.observation} />

						<DetailItem
							label="Última Actualización"
							value={shipment.updatedAt ? getRelativeTime(shipment.updatedAt) : ''}
						/>
						<DetailItem
							classNameBox="col-span-2"
							label="Origen"
							value={[
								shipment.originLocation?.name || '--',
								shipment.originLocation?.address || '--'
							]}
						/>
						<DetailItem
							classNameBox="col-span-2"
							label="Destino"
							value={[
								shipment.destinationLocation?.name || '--',
								shipment.destinationLocation?.address || '--'
							]}
						/>
					</div>
				</CardDetail>
				{/* --- Card para la lista de Dispositivos --- */}
				<CardDetail
					className="lg:col-span-2"
					title="Dispositivos Enviados"
					icon={<Icon name="box" className="h-5 w-5" />}
				>
					<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
						{shipment.shipmentDevice.map(device => {
							const categoryName =
								device.deviceSnapshot.categoryName?.toLowerCase() ?? ''
							// Se determina si la tarjeta es "grande" (un computador)
							const isLargeCard = [
								CategoryOptionsName.COMPUTER.toLowerCase(),
								CategoryOptionsName.LAPTOP.toLowerCase(),
								CategoryOptionsName.ALLINONE.toLowerCase(),
								CategoryOptionsName.SERVER.toLowerCase()
							].includes(categoryName)
							return (
								<DeviceSummaryCard
									key={device.id}
									shipmentDevice={device}
									className={isLargeCard ? 'md:col-span-2' : 'md:columns-1'}
								/>
							)
						})}
					</div>
				</CardDetail>
			</DetailModalContent>
		</DetailModalWrapper>
	)
}
