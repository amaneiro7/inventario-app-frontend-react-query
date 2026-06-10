import { lazy, memo } from 'react'
import type { EvaluationHardwareDeviceDto } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

const Icon = lazy(() => import('@/shared/ui/icon/Icon').then(m => ({ default: m.Icon })))
const EvaluationHardwareModalTitle = lazy(() =>
	import('./EvaluationHardwareModalTitle').then(m => ({
		default: m.EvaluationHardwareModalTitle
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

interface DetailsEvaluationHardwareModalProps {
	device: EvaluationHardwareDeviceDto
	onClose: () => void
}

export const DetailsEvaluationHardwareModal = memo(
	({ device, onClose }: DetailsEvaluationHardwareModalProps) => {
		const {
			deviceId,
			employee,
			hardware: { computerName, disk, ipAddress, processor, ram },
			location,
			reasons,
			serial,
			status
		} = device

		return (
			<DetailModalWrapper>
				<DetailModalHeader onClose={onClose} url={`/form/device/edit/${deviceId}`}>
					<EvaluationHardwareModalTitle
						computerName={computerName ?? ''}
						status={status}
					/>
				</DetailModalHeader>
				<DetailModalContent>
					{/* --- Tarjeta de Información General del Equipo --- */}
					<CardDetail
						title="Información General del Equipo"
						icon={<Icon name="monitor" className="h-5 w-5" />}
					>
						<DetailItem label="Serial" value={serial} />
						<DetailItem label="Nombre de Equipo" value={computerName} />
						<DetailItem label="Dirección IP" value={ipAddress} />
					</CardDetail>
					{/* --- Tarjeta de Especificaciones de Hardware --- */}
					<CardDetail
						title="Especificaciones de Hardware"
						icon={<Icon name="cpu" className="h-5 w-5" />}
					>
						<DetailItem label="Disco Duro" value={disk} />
						<DetailItem label="Memoria RAM" value={ram} />

						<DetailItem label="Procesador" value={processor} />
						{reasons && reasons.length > 0 && (
							<DetailItem label="Motivos de No Aptitud" value={reasons.join(', ')} />
						)}
					</CardDetail>
					{/* --- Tarjeta de Usuario --- */}
					{employee && (
						<CardDetail
							title="Usuario Asignado"
							icon={<Icon name="user" className="h-5 w-5" />}
						>
							<DetailItem label="Usuario" value={employee} />
							{/* <DetailItem
								label="Nombre"
								value={`${employee.name} ${employee.lastName}`}
							/>
							{employee.email && <DetailItem label="Email" value={employee.email} />}
							<DetailItem
								label="Unidad Específica"
								value={employee?.unidad?.name || 'N/A'}
							/>
							{employee.cargo && (
								<DetailItem label="Cargo" value={employee.cargo?.name} />
							)}
							{unidadOrganizativaChain &&
								unidadOrganizativaChain.length > 0 &&
								unidadOrganizativaChain.map((level, index) => {
									const levelNum = index + 1
									const levelName = hierarchyLevelTranslations[levelNum]
									const label = `Jerarquía Nivel ${levelNum}${levelName ? ` (${levelName})` : ''}`

									return (
										<DetailItem
											key={`${level}-${index}`}
											label={label}
											value={level}
										/>
									)
								})} */}
						</CardDetail>
					)}
					{/* --- Tarjeta de Ubicación --- */}
					{location && (
						<CardDetail
							title="Ubicación"
							icon={<Icon name="mapPin" className="h-5 w-5" />}
						>
							{/* <DetailItem
								label="Región"
								value={location?.site?.city?.state?.region?.name}
							/>
							<DetailItem label="Estado" value={location?.site?.city?.state?.name} />
							<DetailItem label="Ciudad" value={location?.site?.city?.name} />
							<DetailItem label="Sitio" value={location.site?.name} /> */}
							<DetailItem label="Ubicación Detallada" value={location} />
						</CardDetail>
					)}
				</DetailModalContent>
			</DetailModalWrapper>
		)
	}
)

DetailsEvaluationHardwareModal.displayName = 'DetailsEvaluationHardwareModal'
