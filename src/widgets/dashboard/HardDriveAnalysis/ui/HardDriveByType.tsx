import { memo } from 'react'
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Bar,
	Legend,
	LabelList,
	Tooltip
} from '@/shared/ui/Charts'
import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'
import { type HDDPrepareGroupedBarData, type HDDTypeData } from '../model/useHardDriveAnalysis'

interface HardDriveByTypeProps {
	prepareGroupedBarData: HDDPrepareGroupedBarData
	typeData: HDDTypeData[]
	barHeight: number
}

export const HardDriveByType = memo(
	({ barHeight, prepareGroupedBarData, typeData }: HardDriveByTypeProps) => {
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
					axisLine={false}
					width={200}
					scale="auto"
					tick={{ fontSize: '0.85rem' }}
				/>
				<YAxis />
				<Tooltip formatter={(value, name) => [`${value} Discos duros`, name]} />
				<Legend />
				{typeData.length > 0 &&
					typeData.map((type, index) => (
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

HardDriveByType.displayName = 'HardDriveByType'
