import { memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { useGetLocationMonitoringDashboard } from '@/entities/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboard'

export const MapLegendTotal = memo(() => {
	const { locationMonitoringDashboard } = useGetLocationMonitoringDashboard({
		typeOfSiteId: TypeOfSiteOptions.AGENCY
	})
	if (!locationMonitoringDashboard) {
		return
	}
	const { total, online, offline } = locationMonitoringDashboard
	return (
		<aside
			className="absolute right-4 bottom-4 rounded-lg border bg-white p-3 shadow-md"
			aria-labelledby="legend-title"
		>
			<Typography
				id="legend-title"
				weight="medium"
				variant="p"
				option="tiny"
				className="mb-2"
			>
				Agencias
			</Typography>
			<ul className="space-y-1 text-xs" role="list">
				<li>
					<Typography variant="span" option="tiny">
						{total} Agencias
					</Typography>
				</li>
				<li>
					<Typography variant="span" option="tiny" color="verde">
						{online} Agencias con enlace {((online * 100) / total).toFixed(1)}%
					</Typography>
				</li>
				<li>
					<Typography variant="span" option="tiny" color="rojo">
						{offline} Agencias sin enlace {((offline * 100) / total).toFixed(1)}%
					</Typography>
				</li>
			</ul>
		</aside>
	)
})

MapLegendTotal.displayName = 'MapLegendTotal'
