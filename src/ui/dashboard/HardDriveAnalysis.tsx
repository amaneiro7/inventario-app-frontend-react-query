import { memo, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { HardDrive } from 'lucide-react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

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

	return (
		<div className="container grid grid- gap-4">
			<Card>
				<CardHeader>
					<div>
						<CardTitle>Analisis Tipos de Disco duros</CardTitle>
						<CardDescription>Distribución de Discos por tipo</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="items-center">
					<div className="flex items-center gap-6">
						<div>
							<div className="space-y-4">
								{typeData.map((entry, index) => (
									<div
										key={entry.name}
										className="flex items-center justify-between"
									>
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded-full"
												style={{
													backgroundColor: COLORS[index % COLORS.length]
												}}
											/>
											<span className="font-medium">{entry.name}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-bold">{entry.count}</span>
											<span className="text-muted-foreground text-sm">
												(
												{Math.round(
													(entry.count / totalDrivesByType) * 100
												)}
												%)
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="w-full h-80">
							{typeData.length > 0 ? (
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={typeData}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={({ name, percent }) => {
												const minVisiblePercent = 0.05
												if (percent > minVisiblePercent)
													return `${name}: ${(percent * 100).toFixed(0)}%`
											}}
											outerRadius={80}
											fill="#8884d8"
											dataKey="count"
										>
											{typeData.map((_entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip
											formatter={(value, name) => [value, name]}
											contentStyle={{
												backgroundColor: 'white',
												borderRadius: '0.5rem',
												border: '1px solid #e2e8f0'
											}}
										/>
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							) : (
								<div className="h-full flex items-center justify-center">
									<div className="text-center text-muted-foreground">
										<HardDrive className="mx-auto h-12 w-12 mb-2 opacity-20" />
										<p>No hard drive type data available</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="">
				<CardHeader>
					<div>
						<CardTitle>Analisis de Discos duros</CardTitle>
						<CardDescription>Distribución de Discos por capacidad</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-6">
						<div>
							<div className="space-y-4">
								{data.map((entry, index) => (
									<div
										key={entry.name}
										className="flex gap-4 items-center justify-between"
									>
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded-full"
												style={{
													backgroundColor: COLORS[index % COLORS.length]
												}}
											/>
											<span className="font-medium">{entry.name}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-bold">{entry.count}</span>
											<span className="text-muted-foreground text-sm">
												(
												{Math.round(
													(entry.count / totalDrivesByCapacity) * 100
												)}
												%)
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="w-full h-80">
							{data.length > 0 ? (
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={data}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={({ name, percent }) => {
												const minVisiblePercent = 0.05
												if (percent > minVisiblePercent)
													return `${name}: ${(percent * 100).toFixed(0)}%`
											}}
											outerRadius={80}
											fill="#8884d8"
											dataKey="count"
										>
											{data.map((_entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip
											formatter={(value, name) => [value, name]}
											contentStyle={{
												backgroundColor: 'white',
												borderRadius: '0.5rem',
												border: '1px solid #e2e8f0'
											}}
										/>
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							) : (
								<div className="h-full flex items-center justify-center">
									<div className="text-center text-muted-foreground">
										<HardDrive className="mx-auto h-12 w-12 mb-2 opacity-20" />
										<p>No hard drive capacity data available</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
})
