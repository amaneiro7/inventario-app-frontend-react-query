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
import { type ArqData, type OSPrepareGroupedBarData } from '../model/useOperatingSystemAnalysis'

interface OSAnalysisChartProps {
	barHeight: number
	arqData: ArqData[]
	prepareGroupedBarData: OSPrepareGroupedBarData[]
}

export const OSAnalysisChart = memo(
	({ barHeight, prepareGroupedBarData, arqData }: OSAnalysisChartProps) => {
		return (
			<BarChart
				data={prepareGroupedBarData}
				style={{
					flex: '1 1 0%',
					width: '100%',
					maxHeight: '100%',
					minHeight: '20rem',
					aspectRatio: 1.618
				}}
				responsive
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					style={{
						fontSize: '0.75rem'
					}}
				/>
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
		)
	}
)

OSAnalysisChart.displayName = 'OSAnalysisChart'
