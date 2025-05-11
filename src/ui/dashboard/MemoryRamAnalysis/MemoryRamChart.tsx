import { BASIC_COLORS_MAP } from '@/utils/colores'
import { memo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	LabelList
} from 'recharts'

interface MemoryRamChartProps {
	prepareGroupedBarData: Record<string, unknown>[]
	memModuleType: {
		name: string
		count: number
	}[]
	barHeight: number
}

export const MemoryRamChart = memo(
	({ prepareGroupedBarData, memModuleType, barHeight }: MemoryRamChartProps) => {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					layout="vertical"
					data={prepareGroupedBarData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<YAxis type="category" dataKey="name" style={{ fontSize: '0.6rem' }} />
					<XAxis type="number" />
					<Tooltip formatter={(value, name) => [`${value} Memorias`, name]} />
					<Legend />
					{memModuleType.length > 0 &&
						memModuleType.map((type, index) => (
							<Bar
								key={type.name}
								dataKey={type.name}
								name={type.name}
								fill={BASIC_COLORS_MAP[index + 1]}
								barSize={barHeight}
							>
								<LabelList
									dataKey={type.name}
									position="right"
									orientation={45}
									style={{ fontSize: '0.65rem' }}
									content={({ value, x, y, width, height }) => {
										const labelText = `${type.name}: ${value}`
										if (!value || !x || !y) return null
										return (
											<text
												x={Number(x) + Number(width) + 10}
												y={Number(y) + Number(height) / 2}
												fill="#666"
												fontSize={10}
												textAnchor="start"
												dominantBaseline="middle"
												// transform={`rotate(-75, ${
												// 	Number(x) + Number(width) / 2
												// }, ${Number(y) - 10})`}
											>
												{labelText}
											</text>
										)
									}}
								/>
							</Bar>
						))}
				</BarChart>
			</ResponsiveContainer>
		)
	}
)
MemoryRamChart.displayName = 'MemoryRamChart'
