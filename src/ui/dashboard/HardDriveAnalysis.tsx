import { memo, useMemo } from 'react'
import { HardDrive } from 'lucide-react'
import { PieCard } from './PieCard'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
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

interface HardDriveAnalysisProps {
	data: ComputerDashboardDto['hardDrive']
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658']

export const HardDriveAnalysis: React.FC<HardDriveAnalysisProps> = memo(({ data }) => {
	// Process data by drive type
	const typeData = useMemo(() => {
		const resultMap = new Map<string, number>()

		data.forEach(hddCapacity => {
			hddCapacity.hddType.forEach(hddType => {
				const key = hddType.name
				if (key) {
					const currentCount = resultMap.get(key) || 0
					resultMap.set(key, currentCount + hddType.count)
				}
			})
		})

		return Array.from(resultMap)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
	}, [data])

	const totalDrivesByCapacity = useMemo(
		() => data.reduce((sum, item) => sum + item.count, 0),
		[data]
	)
	const totalDrivesByType = useMemo(
		() => typeData.reduce((sum, item) => sum + item.count, 0),
		[typeData]
	)

	const barHeight = useMemo(() => 30, [])
	const prepareGroupedBarData = useMemo(() => {
		// Get unique hdd types
		const hddTypes = new Set<string>()
		data.forEach(hddCapacity => {
			hddCapacity.hddType.forEach(hddType => {
				hddTypes.add(hddType.name)
			})
		})

		// Create a mapping for each hddCapacity and hddType
		return data.map(hddCapacity => {
			const result: Record<string, unknown> = {
				name: hddCapacity.name
			}

			// Add counts for each site type
			Array.from(hddTypes).forEach(hddType => {
				const type = hddCapacity.hddType.find(s => s.name === hddType)
				result[hddType] = type ? type.count : 0
			})

			return result
		})
	}, [data])

	return (
		<div className="grid grid-cols-[repeat(auto-fit,_minmax(550px,_1fr))] gap-4">
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
