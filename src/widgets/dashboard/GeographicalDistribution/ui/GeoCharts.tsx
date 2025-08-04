import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LabelList
} from 'recharts'
import { Filter } from 'lucide-react'
import Button from '@/shared/ui/Button'
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { CustomLabelList } from '../../../../shared/ui/CustomLabelList'
import { type DistributionItem } from '../model/useGeographicalDistribution'
import { CustomTooltip } from '../../../../shared/ui/CustomTooltip'

interface GeoChartsProps {
	distributionData: DistributionItem[]
	barName: string
	dynamicHeight: string
	barHeight: number
	clearFilters: () => void
}
export const GeoCharts = ({
	distributionData,
	barName,
	dynamicHeight,
	barHeight,
	clearFilters
}: GeoChartsProps) => {
	return (
		<div style={{ height: dynamicHeight ?? '20rem', minHeight: '20rem' }}>
			{distributionData.length > 0 ? (
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						layout="vertical"
						data={distributionData}
						margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
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
				</ResponsiveContainer>
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
		</div>
	)
}
