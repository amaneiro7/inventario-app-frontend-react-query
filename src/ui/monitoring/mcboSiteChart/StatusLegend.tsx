import { COLOR_THRESHOLDS, NO_DATA_COLOR } from '../MapColors'
import Typography from '@/components/Typography'
import { MapLegendList } from '../MapChart/MapLegend'
import { memo } from 'react'

export const StatusLegend = memo(() => {
	return (
		<figcaption className="w-fit rounded-lg border bg-white p-3 shadow-md">
			<Typography
				id="legend-title"
				weight="medium"
				variant="p"
				option="tiny"
				className="mb-2"
			>
				Estado de Equipos Online
			</Typography>
			<ul className="flex gap-2 space-y-1 text-xs" role="list">
				{COLOR_THRESHOLDS.map((item, index) => (
					<MapLegendList key={index} color={item.color} label={item.label} />
				))}
				<MapLegendList color={NO_DATA_COLOR} label="Sin datos" />
			</ul>
		</figcaption>
	)
})

StatusLegend.displayName = 'StatusLegend'
