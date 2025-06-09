import { memo } from 'react'
import { COLOR_THRESHOLDS, NO_DATA_COLOR, NO_EQUIPMENT_COLOR } from './MapColors'

export const MapLegend = memo(() => {
	return (
		<div className="absolute bottom-4 left-4 rounded-lg border bg-white p-3 shadow-md">
			<h4 className="mb-2 text-sm font-medium">Estado de Sitios (Online %)</h4>
			<div className="space-y-1 text-xs">
				{COLOR_THRESHOLDS.map((item, index) => (
					<div key={index} className="flex items-center gap-2">
						<div
							className="h-4 w-4 rounded"
							style={{ backgroundColor: item.color }}
						></div>
						<span>{item.label}</span>
					</div>
				))}
				<div className="flex items-center gap-2">
					<div
						className="h-4 w-4 rounded"
						style={{ backgroundColor: NO_EQUIPMENT_COLOR }}
					></div>
					<span>0 equipos</span>
				</div>
				<div className="flex items-center gap-2">
					<div
						className="h-4 w-4 rounded"
						style={{ backgroundColor: NO_DATA_COLOR }}
					></div>
					<span>Sin datos</span>
				</div>
			</div>
		</div>
	)
})

MapLegend.displayName = 'MapLegend'
