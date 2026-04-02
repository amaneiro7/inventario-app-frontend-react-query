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
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { type ModelChartData } from '../model/useModelBreakdown'

interface ModelBreakdownChartProps {
	barHeight: number
	modelChartData: ModelChartData[]
}

export const ModelBreakdownChart = memo(
	({ barHeight, modelChartData }: ModelBreakdownChartProps) => {
		return (
			<BarChart
				data={modelChartData}
				style={{
					width: '100%',
					height: '100%',
					aspectRatio: 1.618
				}}
				responsive
				layout="vertical"
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" />
				<YAxis type="category" dataKey="name" width={150} tick={{ fontSize: '0.75rem' }} />
				<Tooltip
					formatter={(value, name) => {
						if (name === 'Value') {
							return [`${Number(value).toLocaleString()}`, name]
						}
						return [value, name]
					}}
					labelFormatter={label => `Model: ${label}`}
				/>
				<Legend />
				<Bar
					dataKey="quantity"
					name="Cantidad"
					fill={BASIC_COLORS.azulElectrico}
					barSize={barHeight}
				>
					<LabelList
						dataKey="quantity"
						position="right"
						style={{ fontSize: '0.65rem' }}
					/>
				</Bar>
			</BarChart>
		)
	}
)

ModelBreakdownChart.displayName = 'ModelBreakdownChart'
