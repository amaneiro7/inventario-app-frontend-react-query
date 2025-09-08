import { lazy, memo } from 'react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { type LocationMonitoringDto } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoring.dto'

const Icon = lazy(() => import('@/shared/ui/icon/Icon').then(m => ({ default: m.Icon })))
const LocationMonitoringModalTitle = lazy(() =>
	import('./LocationMonitoringModalTitle').then(m => ({
		default: m.LocationMonitoringModalTitle
	}))
)

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
const DetailItem = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailItem').then(m => ({ default: m.DetailItem }))
)
const CardDetail = lazy(() =>
	import('@/shared/ui/DescriptionList/CardDetail').then(m => ({ default: m.CardDetail }))
)

interface DetailsLocationMonitoringModalProps {
	location: LocationMonitoringDto
	onClose: () => void
}

export const DetailsLocationMonitoringModal = memo(
	({ location, onClose }: DetailsLocationMonitoringModalProps) => {
		const { lastFailed, lastScan, lastSuccess, locationId, name, site, status, subnet } =
			location

		return (
			<DetailModalWrapper>
				<DetailModalHeader onClose={onClose} url={`/form/location/edit/${locationId}`}>
					<LocationMonitoringModalTitle locationName={name} status={status} />
				</DetailModalHeader>
				<DetailModalContent>
					{/* --- Tarjeta de Resumen --- */}
					<CardDetail
						title="Resumen del Monitoreo"
						icon={<Icon name="info" className="h-5 w-5" />}
					>
						<DetailItem label="Nombre de Sitio" value={name} />
						<DetailItem label="Subnet" value={subnet} />
					</CardDetail>
					{/* --- Tarjeta de Cronología --- */}
					<CardDetail
						title="Cronología de Conexión"
						icon={<Icon name="history" className="h-5 w-5" />}
					>
						<DetailItem
							label="Última Conexión Exitosa"
							value={lastSuccess ? getRelativeTime(lastSuccess) : 'Nunca en línea'}
						/>
						<DetailItem
							label="Último Fallo de Conexión"
							value={lastFailed ? getRelativeTime(lastFailed) : 'Nunca offline'}
						/>
						<DetailItem
							label="Último Escaneo de Red"
							value={lastScan ? getRelativeTime(lastScan) : 'Pendiente'}
						/>
					</CardDetail>
					{/* --- Tarjeta de Ubicación --- */}
					{location && (
						<CardDetail
							title="Ubicación"
							icon={<Icon name="mapPin" className="h-5 w-5" />}
						>
							<DetailItem label="Región" value={site?.city?.state?.region?.name} />
							<DetailItem label="Estado" value={site?.city?.state?.name} />
							<DetailItem label="Ciudad" value={site?.city?.name} />
							<DetailItem label="Sitio" value={site?.name} />
							<DetailItem label="Ubicación Detallada" value={name} />
						</CardDetail>
					)}
				</DetailModalContent>
			</DetailModalWrapper>
		)
	}
)

DetailsLocationMonitoringModal.displayName = 'DetailsLocationMonitoringModal'
