import { memo } from 'react'
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
import { BASIC_COLORS } from '@/utils/colores'
import { type ModelChartData } from '../hooks/useModelBreakdown'

interface ModelBreakdownChartProps {
	barHeight: number
	modelChartData: ModelChartData[]
}

export const ModelBreakdownChart = memo(
	({ barHeight, modelChartData }: ModelBreakdownChartProps) => {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={modelChartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
					layout="vertical"
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" />
					<YAxis
						type="category"
						dataKey="name"
						width={150}
						tick={{ fontSize: '0.75rem' }}
					/>
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
			</ResponsiveContainer>
		)
	}
)

ModelBreakdownChart.displayName = 'ModelBreakdownChart'
