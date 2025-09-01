import { memo } from 'react'
import { Server } from 'lucide-react'
import { DeviceMonitoringStatuses } from '@/entities/devices/deviceMonitoring/domain/value-object/Status'
import { Badge } from '@/shared/ui/Badge'
import Typography from '@/shared/ui/Typography'
import { type GenericMonitorableItem } from '@/shared/ui/GenericMonitoringList'

interface NetworkLinkItemCardProps {
	link: GenericMonitorableItem
}

export const NetworkLinkItemCard = memo(({ link }: NetworkLinkItemCardProps) => {
	const statusValue =
		link.status === DeviceMonitoringStatuses.ONLINE
			? 'Activo'
			: link.status === DeviceMonitoringStatuses.OFFLINE
				? 'Inactivo'
				: 'N/A'

	const statusColor =
		link.status === DeviceMonitoringStatuses.ONLINE
			? 'verde'
			: link.status === DeviceMonitoringStatuses.OFFLINE
				? 'rojo'
				: 'outline'

	const orgUnitName =
		link.employee?.departamento?.name ||
		link.employee?.vicepresidencia?.name ||
		link.employee?.vicepresidenciaEjecutiva?.name

	return (
		<>
			{/* --- LADO IZQUIERDO: INFO PRINCIPAL --- */}
			<div className="flex min-w-0 flex-1 items-center gap-4">
				<Server className="h-8 w-8 flex-shrink-0 text-gray-400" aria-hidden="true" />
				<div className="flex-1 truncate">
					<Typography
						variant="p"
						option="small"
						className="truncate"
						color="gray-600"
						weight="medium"
					>
						{link.name}
					</Typography>
					{link.employee !== null && (
						<Typography
							variant="p"
							option="small"
							className="mt-1 flex items-center gap-2 text-xs text-gray-500"
							color="gray-600"
							weight="medium"
						>
							<span className="font-medium text-gray-700">{link.employee?.userName}</span>
							{orgUnitName && (
								<>
									<span className="hidden text-gray-400 md:inline">|</span>
									<span className="hidden md:inline">{orgUnitName}</span>
								</>
							)}
						</Typography>
					)}
				</div>
			</div>
			{/* --- LADO DERECHO: STATUS Y META-INFO --- */}
			<div className="flex flex-col items-center gap-1">
				<Badge variant={statusColor} role="status" aria-label={`Estado: ${statusValue}`}>
					{statusValue}
				</Badge>
				<Typography variant="span" option="tiny" color="gray-600" className="font-sans">
					{link.subDetail}
				</Typography>
			</div>
		</>
	)
})

NetworkLinkItemCard.displayName = 'NetworkLinkItemCard'
