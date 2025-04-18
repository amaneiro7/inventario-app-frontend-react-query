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
import { HardDrive } from 'lucide-react'
import { useHardDriveAnalysys } from './hooks/useHardDriveAnalysys'
import { PieCard } from './PieCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface HardDriveAnalysisProps {
	data: ComputerDashboardDto['hardDrive']
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658']

export const HardDriveAnalysis: React.FC<HardDriveAnalysisProps> = memo(({ data }) => {
	const { typeData, barHeight, prepareGroupedBarData, totalDrivesByCapacity, totalDrivesByType } =
		useHardDriveAnalysys({ data })

	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(550px,1fr))] gap-4">
			<PieCard
				data={typeData}
				total={totalDrivesByType}
				title="Analisis Tipos de Disco Duros"
				desc="Distribución de Discos por tipo"
				dataKey="count"
				colors={COLORS}
				icon={<HardDrive className="mx-auto h-12 w-12 mb-2 opacity-20" />}
			/>
			<PieCard
				data={data}
				total={totalDrivesByCapacity}
				title="Analisis de Discos Duros"
				desc="Distribución de Discos por capacidad"
				dataKey="count"
				colors={COLORS}
				icon={<HardDrive className="mx-auto h-12 w-12 mb-2 opacity-20" />}
			/>
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle>Distribución de Discos Duros por tipo</CardTitle>
				</CardHeader>
				<CardContent className="h-80">
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
										fill={COLORS[index + 1]}
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
				</CardContent>
			</Card>
		</div>
	)
})
