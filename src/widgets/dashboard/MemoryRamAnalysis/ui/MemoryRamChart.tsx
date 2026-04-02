import { memo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
	LabelList
} from '@/shared/ui/Charts'
import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'

interface MemoryRamChartProps {
	prepareGroupedBarData: Record<string, unknown>[]
	availableMemValues: string[]
	barHeight: number
}

export const MemoryRamChart = memo(
	({ prepareGroupedBarData, availableMemValues, barHeight }: MemoryRamChartProps) => {
		return (
			<BarChart
				layout="vertical"
				data={prepareGroupedBarData}
				style={{
					flex: '1 1 0%',
					width: '100%',
					maxHeight: '100%',
					minHeight: '0',
					aspectRatio: 1
				}}
				responsive
			>
				<CartesianGrid strokeDasharray="3 3" />
				<YAxis type="category" dataKey="name" style={{ fontSize: '0.6rem' }} />
				<XAxis type="number" />
				<Tooltip formatter={(value, name) => [`${value} Memorias`, name]} />
				<Legend />
				{availableMemValues.length > 0 &&
					availableMemValues.map((type, index) => (
						<Bar
							key={type}
							dataKey={type}
							name={type}
							fill={BASIC_COLORS_MAP[index + 1]}
							barSize={barHeight}
						>
							<LabelList
								dataKey={type}
								position="right"
								orientation={45}
								style={{ fontSize: '0.65rem' }}
								content={({ value, x, y, width, height }) => {
									const labelText = `${type}: ${value} memorias`
									if (!value || !x || !y) return null
									return (
										<text
											x={Number(x) + Number(width) + 10}
											y={Number(y) + Number(height) / 2}
											fill="#666"
											fontSize={10}
											textAnchor="start"
											dominantBaseline="middle"
										>
											{labelText}
										</text>
									)
								}}
							/>
						</Bar>
					))}
			</BarChart>
		)
	}
)
MemoryRamChart.displayName = 'MemoryRamChart'
