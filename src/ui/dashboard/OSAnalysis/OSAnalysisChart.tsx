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
import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'
import { type ArqData, type OSPrepareGroupedBarData } from '../hooks/useOperatingSystemAnalysis'

interface OSAnalysisChartProps {
	barHeight: number
	arqData: ArqData[]
	prepareGroupedBarData: OSPrepareGroupedBarData[]
}

export const OSAnalysisChart = memo(
	({ barHeight, prepareGroupedBarData, arqData }: OSAnalysisChartProps) => {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={prepareGroupedBarData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip formatter={(value, name) => [`${value} equipos`, name]} />
					<Legend />
					{arqData.length > 0 &&
						arqData.map((type, index) => (
							<Bar
								key={type.name}
								dataKey={type.name}
								name={type.name}
								fill={BASIC_COLORS_MAP[index + 1]}
								barSize={barHeight}
							>
								<LabelList
									dataKey={type.name}
									position="top"
									style={{ fontSize: '0.65rem' }}
								/>
							</Bar>
						))}
				</BarChart>
			</ResponsiveContainer>
		)
	}
)

OSAnalysisChart.displayName = 'OSAnalysisChart'
