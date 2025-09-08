import { lazy, memo } from 'react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { type DeviceMonitoringDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

const Icon = lazy(() => import('@/shared/ui/icon/Icon').then(m => ({ default: m.Icon })))
const DeviceMonitoringModalTitle = lazy(() =>
	import('./DeviceMonitoringModalTitle').then(m => ({ default: m.DeviceMonitoringModalTitle }))
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

interface DetailsDeviceMonitoringModalProps {
	device: DeviceMonitoringDto
	onClose: () => void
}

export const DetailsDeviceMonitoringModal = memo(
	({ device, onClose }: DetailsDeviceMonitoringModalProps) => {
		const {
			employee,
			computerName,
			deviceId,
			ipAddress,
			lastFailed,
			lastScan,
			lastSuccess,
			location,
			status
		} = device

		return (
			<DetailModalWrapper>
				<DetailModalHeader onClose={onClose} url={`/form/device/edit/${deviceId}`}>
					<DeviceMonitoringModalTitle computerName={computerName} status={status} />
				</DetailModalHeader>
				<DetailModalContent>
					{/* --- Tarjeta de Resumen --- */}
					<CardDetail
						title="Resumen del Monitoreo"
						icon={<Icon name="info" className="h-5 w-5" />}
					>
						<DetailItem label="Nombre de Equipo" value={computerName} />
						<DetailItem label="Dirección IP" value={ipAddress} />
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
					{/* --- Tarjeta de Usuario --- */}
					{employee && (
						<CardDetail
							title="Usuario Asignado"
							icon={<Icon name="user" className="h-5 w-5" />}
						>
							<DetailItem label="Usuario" value={employee.userName} />
							<DetailItem
								label="Nombre"
								value={`${employee.name} ${employee.lastName}`}
							/>
							{employee.email && <DetailItem label="Email" value={employee.email} />}
							{employee.cargo && (
								<DetailItem label="Cargo" value={employee.cargo?.name} />
							)}
							{employee.departamento && (
								<DetailItem
									label="Departamento"
									value={employee.departamento?.name}
								/>
							)}
							{employee.vicepresidencia && (
								<DetailItem
									label="Vicepresidencia"
									value={employee.vicepresidencia?.name}
								/>
							)}
							{employee.vicepresidenciaEjecutiva && (
								<DetailItem
									label="V.P. Ejecutiva"
									value={employee.vicepresidenciaEjecutiva?.name}
								/>
							)}
						</CardDetail>
					)}
					{/* --- Tarjeta de Ubicación --- */}
					{location && (
						<CardDetail
							title="Ubicación"
							icon={<Icon name="mapPin" className="h-5 w-5" />}
						>
							<DetailItem
								label="Región"
								value={location?.site?.city?.state?.region?.name}
							/>
							<DetailItem label="Estado" value={location?.site?.city?.state?.name} />
							<DetailItem label="Ciudad" value={location?.site?.city?.name} />
							<DetailItem label="Sitio" value={location.site?.name} />
							<DetailItem label="Ubicación Detallada" value={location.name} />
						</CardDetail>
					)}
				</DetailModalContent>
			</DetailModalWrapper>
		)
	}
)

DetailsDeviceMonitoringModal.displayName = 'DetailsDeviceMonitoringModal'
