import { memo } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LabelList
} from '@/shared/ui/Charts'
import { Filter } from 'lucide-react'
import Button from '@/shared/ui/Button'
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { CustomLabelList } from '@/shared/ui/CustomLabelList'
import { CustomTooltip } from '@/shared/ui/CustomTooltip'
import { type DistributionItem } from '../model/useGeographicalDistribution'

interface GeoChartsProps {
	distributionData: DistributionItem[]
	barName: string
	dynamicHeight: string
	barHeight: number
	clearFilters: () => void
}

/**
 * `GeoCharts` is a memoized functional component that renders a horizontal bar chart
 * displaying geographical distribution data. It visualizes the total count of devices
 * and breakdowns by 'Agencia' and 'Sede Administrativa' site types.
 * It also handles cases where no data is available.
 */
export const GeoCharts = memo(
	({ distributionData, barName, dynamicHeight, barHeight, clearFilters }: GeoChartsProps) => {
		return (
			<>
				{distributionData.length > 0 ? (
					<BarChart
						layout="vertical"
						data={distributionData}
						style={{
							flex: '1 1 0%',
							width: '100%',
							maxHeight: '100%',
							height: dynamicHeight ?? '20rem',
							minHeight: '20rem',
							aspectRatio: 1.618
						}}
						responsive
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis type="number" />
						<YAxis
							dataKey="name"
							type="category"
							axisLine={false}
							width={200}
							scale="auto"
							tick={{ fontSize: '0.65rem' }}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend />
						<Bar
							dataKey="value"
							barSize={barHeight}
							name={barName}
							fill={BASIC_COLORS.azul}
						>
							<LabelList
								dataKey="value"
								position="right"
								style={{ fontSize: '0.65rem' }}
								content={<CustomLabelList dataKey="Total" />}
							/>
						</Bar>
						<Bar
							dataKey="Agencia"
							barSize={barHeight}
							name="Agencia"
							fill={BASIC_COLORS.naranja}
						>
							<LabelList
								dataKey="Agencia"
								position="right"
								style={{ fontSize: '0.65rem' }}
								content={<CustomLabelList dataKey="Agencia" />}
							/>
						</Bar>
						<Bar
							dataKey="Sede Administrativa"
							barSize={barHeight}
							name="Sede Administrativas"
							fill={BASIC_COLORS.verde}
						>
							<LabelList
								dataKey="Sede Administrativa"
								position="right"
								style={{ fontSize: '0.65rem' }}
								content={<CustomLabelList dataKey="Sede Administrativa" />}
							/>
						</Bar>
					</BarChart>
				) : (
					<div className="flex h-full items-center justify-center">
						<div className="text-muted-foreground text-center">
							<Filter className="mx-auto mb-2 h-12 w-12 opacity-20" />
							<p>No hay datos para mostrar</p>
							<Button
								text="Limpiar filtros"
								buttonSize="medium"
								size="content"
								color="blanco"
								onClick={clearFilters}
								className="mt-2"
							/>
						</div>
					</div>
				)}
			</>
		)
	}
)
