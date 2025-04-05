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
import { useOperatingSystemAnalysys } from './hooks/useOperatingSystemAnalysis'
import { MapPin } from 'lucide-react'
import { PieCard } from './PieCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface OSAnalysisProps {
	data: ComputerDashboardDto['operatingSystem']
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658']

export const OSAnalysis: React.FC<OSAnalysisProps> = memo(({ data }) => {
	const { arqData, barHeight, prepareGroupedBarData, totalArq, totalOperatingSystem } =
		useOperatingSystemAnalysys({ data })

	return (
		<>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(550px,_1fr))] gap-4">
				<PieCard
					data={data}
					total={totalOperatingSystem}
					title="Analisis de Sistemas Operativos"
					desc="Distribución de Sistemas Operativos"
					dataKey="count"
					colors={COLORS}
					icon={<MapPin className="mx-auto h-12 w-12 mb-2 opacity-20" />}
				/>
				<PieCard
					data={arqData}
					total={totalArq}
					title="Analisis de Arquitecturas de sistemas operativos"
					desc="Distribución de Arquitecturas de sistemas operativos"
					dataKey="count"
					colors={COLORS}
					icon={<MapPin className="mx-auto h-12 w-12 mb-2 opacity-20" />}
				/>
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Distribución de Sistemas Operativos por Arquitecturas</CardTitle>
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
								<Tooltip formatter={(value, name) => [`${value} equipos`, name]} />
								<Legend />
								{arqData.length > 0 &&
									arqData.map((type, index) => (
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
		</>
	)
})
