import { memo } from 'react'
import { COLOR_THRESHOLDS, NO_DATA_COLOR } from '../../../../shared/lib/constants/map-colors'
import Typography from '@/shared/ui/Typography'

export const MapLegend = memo(() => {
	return (
		<figcaption
			className="absolute bottom-4 left-4 rounded-lg border bg-white p-3 shadow-md"
			aria-labelledby="legend-title"
		>
			<Typography
				id="legend-title"
				weight="medium"
				variant="p"
				option="tiny"
				className="mb-2"
			>
				Estado de agencias (Online %)
			</Typography>
			<ul className="space-y-1 text-xs" role="list">
				{COLOR_THRESHOLDS.map((item, index) => (
					<MapLegendList key={index} color={item.color} label={item.label} />
				))}
				<MapLegendList color={NO_DATA_COLOR} label="Sin datos" />
			</ul>
		</figcaption>
	)
})

MapLegend.displayName = 'MapLegend'

export const MapLegendList = memo(({ color, label }: { color: string; label: string }) => (
	<li className="flex items-center gap-2">
		<div className="h-4 w-4 rounded" style={{ backgroundColor: color }} role="presentation" />
		<Typography variant="span">{label}</Typography>
	</li>
))

MapLegendList.displayName = 'MapLegendList'
