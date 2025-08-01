import { memo } from 'react'
import {
	BarChart,
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Bar,
	Legend,
	LabelList,
	Tooltip
} from 'recharts'
import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'
import { HDDPrepareGroupedBarData, HDDTypeData } from '../hooks/useHardDriveAnalysys'

interface HardDriveByTypeProps {
	prepareGroupedBarData: HDDPrepareGroupedBarData
	typeData: HDDTypeData[]
	barHeight: number
}

export const HardDriveByType = memo(
	({ barHeight, prepareGroupedBarData, typeData }: HardDriveByTypeProps) => {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={prepareGroupedBarData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
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
			</ResponsiveContainer>
		)
	}
)

HardDriveByType.displayName = 'HardDriveByType'
