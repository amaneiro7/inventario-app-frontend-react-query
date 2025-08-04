// src/ui/Home/LocationMonitoring/ByStateList.tsx
import { memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { StatusProgress } from '@/widgets/InventoryStatus/StatusProgress'
import { type LocationMonitoringDashboardByStateDto } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoringDashboardByState.dto'
import { type DeviceMonitoringDashboardByStateDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByState.dto'

interface ByStateListProps {
	statesData:
		| LocationMonitoringDashboardByStateDto['byState']
		| DeviceMonitoringDashboardByStateDto['byState']
}

export const ByStateList = memo(({ statesData }: ByStateListProps) => {
	return (
		<section
			className="flex h-[400px] flex-col gap-1.5 rounded-lg border bg-slate-100 p-6 pb-0.5 shadow-lg"
			aria-labelledby="state-details-title"
		>
			<Typography variant="h4" color="azul" id="state-details-title">
				Estado de ubicaciones por Estado
			</Typography>
			{statesData && statesData.length > 0 ? (
				<ul className="h-full min-h-0 w-full flex-1 space-y-1 overflow-y-auto pr-2">
					{statesData.map(location => (
						<li
							key={location.stateName}
							className="flex w-full items-center justify-between"
						>
							<StatusProgress
								label={location.stateName}
								total={location.total}
								value={location.onlineCount}
								indicatorColor="bg-verde"
							/>
						</li>
					))}
				</ul>
			) : (
				<Typography variant="p" color="gris">
					No hay datos de ubicaciones por estado disponibles.
				</Typography>
			)}
		</section>
	)
})

ByStateList.displayName = 'ByStateList'
