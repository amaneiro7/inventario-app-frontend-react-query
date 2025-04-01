import { memo, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'

import { ChartContainer } from '@/components/Chart'
import {
	PieChart,
	Pie,
	Cell,
	Legend,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid
} from 'recharts'
import { HardDrive } from 'lucide-react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface HardDriveAnalysisProps {
	data: ComputerDashboardDto[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658']

export const HardDriveAnalysis: React.FC<HardDriveAnalysisProps> = memo(({ data }) => {
	// Process data by drive type
	const typeData = useMemo(() => {
		const resultMap = new Map<string, number>()

		data.forEach(item => {
			const key = item.driveType
			if (key) {
				const currentCount = resultMap.get(key) || 0
				resultMap.set(key, currentCount + item.quantity)
			}
		})

		return Array.from(resultMap)
			.map(([name, value]) => ({ name, value }))
			.sort((a, b) => b.value - a.value)
	}, [data])

	// Process data by drive capacity
	const capacityData = useMemo(() => {
		const resultMap = new Map<string, number>()

		data.forEach(item => {
			const key = item.driveCapacity
			if (key) {
				const currentCount = resultMap.get(key) || 0
				resultMap.set(key, currentCount + item.quantity)
			}
		})

		return Array.from(resultMap)
			.map(([name, value]) => ({ name, value }))
			.sort((a, b) => b.value - a.value)
	}, [data])

	const config = {
		data: { label: 'Hard Drives' }
	}

	const totalDrivesByType = typeData.reduce((sum, item) => sum + item.value, 0)
	const totalDrivesByCapacity = capacityData.reduce((sum, item) => sum + item.value, 0)

	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent
	}: any) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5
		const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
		const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

		return (
			<text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		)
	}

	return (
		<>
			<Card className="col-span-12">
				<CardHeader>
					<div>
						<CardTitle>Hard Drive Type Analysis</CardTitle>
						<CardDescription>Distribution of hard drives by type</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-5 gap-6">
						<div className="md:col-span-2">
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
											<span className="font-bold">{entry.value}</span>
											<span className="text-muted-foreground text-sm">
												(
												{Math.round(
													(entry.value / totalDrivesByType) * 100
												)}
												%)
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="md:col-span-3 h-80">
							{typeData.length > 0 ? (
								<ChartContainer config={config}>
									<PieChart>
										<Pie
											data={typeData}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={renderCustomizedLabel}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value"
										>
											{typeData.map((entry, index) => (
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
								</ChartContainer>
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

			<Card className="col-span-12 mt-4">
				<CardHeader>
					<div>
						<CardTitle>Hard Drive Capacity Analysis</CardTitle>
						<CardDescription>Distribution of hard drives by capacity</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-5 gap-6">
						<div className="md:col-span-2">
							<div className="space-y-4">
								{capacityData.map((entry, index) => (
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
											<span className="font-bold">{entry.value}</span>
											<span className="text-muted-foreground text-sm">
												(
												{Math.round(
													(entry.value / totalDrivesByCapacity) * 100
												)}
												%)
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="md:col-span-3 h-80">
							{capacityData.length > 0 ? (
								<ChartContainer config={config}>
									<PieChart>
										<Pie
											data={capacityData}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={renderCustomizedLabel}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value"
										>
											{capacityData.map((entry, index) => (
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
								</ChartContainer>
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
		</>
	)
})
