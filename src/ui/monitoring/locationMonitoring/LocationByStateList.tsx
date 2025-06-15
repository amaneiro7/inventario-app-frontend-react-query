// src/ui/Home/LocationMonitoring/LocationsByStateList.tsx
import { memo } from 'react'
import Typography from '@/components/Typography'
import { StatusProgress } from '@/ui/Home/InventoryStatus/StatusProgress'
import { type LocationMonitoringDashboardByStateDto } from '@/core/locations/locationMonitoring/domain/dto/LocationMonitoringDashboardByState.dto'

interface LocationsByStateListProps {
	statesData: LocationMonitoringDashboardByStateDto['byState']
}

export const LocationsByStateList = memo(({ statesData }: LocationsByStateListProps) => {
	return (
		<section className="h-[400px] space-y-1.5" aria-labelledby="state-details-title">
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

LocationsByStateList.displayName = 'LocationsByStateList'
