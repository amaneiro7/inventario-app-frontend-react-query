import React, { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	BarChart,
	Bar
} from 'recharts'
import { InventoryItem } from '@/data/inventory'
import { ChartContainer } from '@/components/ui/chart'
import { MapPin } from 'lucide-react'

interface OSAnalysisProps {
	data: InventoryItem[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658']

const OSAnalysis: React.FC<OSAnalysisProps> = ({ data }) => {
	// OS data processing
	const osData = useMemo(() => {
		const osCounts: Record<string, number> = {}
		data.forEach(item => {
			if (item.os) {
				osCounts[item.os] = (osCounts[item.os] || 0) + item.quantity
			}
		})

		return Object.keys(osCounts)
			.map(name => ({ name, value: osCounts[name] }))
			.sort((a, b) => b.value - a.value)
	}, [data])

	// Architecture data processing
	const architectureData = useMemo(() => {
		const archCounts: Record<string, number> = {}
		data.forEach(item => {
			if (item.architecture) {
				archCounts[item.architecture] = (archCounts[item.architecture] || 0) + item.quantity
			}
		})

		return Object.keys(archCounts)
			.map(name => ({ name, value: archCounts[name] }))
			.sort((a, b) => b.value - a.value)
	}, [data])

	// OS by site type data processing
	const osBySiteTypeData = useMemo(() => {
		const osTypeCounts: Record<string, Record<string, number>> = {}

		// First pass: collect all site types to ensure consistent data structure
		const siteTypes = new Set<string>()
		data.forEach(item => {
			if (item.siteType) {
				siteTypes.add(item.siteType)
			}
		})

		// Second pass: collect OS counts by site type
		data.forEach(item => {
			if (item.os && item.siteType) {
				if (!osTypeCounts[item.os]) {
					osTypeCounts[item.os] = {}
					// Initialize all site types with zero
					Array.from(siteTypes).forEach(siteType => {
						osTypeCounts[item.os][siteType] = 0
					})
				}
				osTypeCounts[item.os][item.siteType] =
					(osTypeCounts[item.os][item.siteType] || 0) + item.quantity
			}
		})

		// Convert to array format for chart
		return Object.keys(osTypeCounts).map(os => {
			const result: any = { name: os }
			Object.keys(osTypeCounts[os]).forEach(siteType => {
				result[siteType] = osTypeCounts[os][siteType]
			})
			return result
		})
	}, [data])

	const totalDevices = osData.reduce((sum, item) => sum + item.value, 0)
	const totalArchitectures = architectureData.reduce((sum, item) => sum + item.value, 0)

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

	const config = {
		data: { label: 'Operating Systems' }
	}

	// Get site types for bar chart colors
	const siteTypes = useMemo(() => {
		const types = new Set<string>()
		data.forEach(item => {
			if (item.siteType) {
				types.add(item.siteType)
			}
		})
		return Array.from(types)
	}, [data])

	const SITE_TYPE_COLORS: Record<string, string> = {
		Oficina: COLORS[0],
		Agencia: COLORS[1],
		Tienda: COLORS[2],
		Sucursal: COLORS[3],
		Almacén: COLORS[4],
		Torre: COLORS[5],
		Fábrica: COLORS[6],
		Educacional: COLORS[0]
	}

	return (
		<>
			<Card className="col-span-12">
				<CardHeader>
					<div>
						<CardTitle>Operating System Analysis</CardTitle>
						<CardDescription>Distribution of operating systems</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-5 gap-6">
						<div className="md:col-span-2">
							<div className="space-y-4">
								{osData.map((entry, index) => (
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
												({Math.round((entry.value / totalDevices) * 100)}%)
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="md:col-span-3 h-80">
							{osData.length > 0 ? (
								<ChartContainer config={config}>
									<PieChart>
										<Pie
											data={osData}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={renderCustomizedLabel}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value"
										>
											{osData.map((entry, index) => (
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
										<MapPin className="mx-auto h-12 w-12 mb-2 opacity-20" />
										<p>No OS data available</p>
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
						<CardTitle>Architecture Analysis</CardTitle>
						<CardDescription>Distribution of system architectures</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-5 gap-6">
						<div className="md:col-span-2">
							<div className="space-y-4">
								{architectureData.map((entry, index) => (
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
													(entry.value / totalArchitectures) * 100
												)}
												%)
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="md:col-span-3 h-80">
							{architectureData.length > 0 ? (
								<ChartContainer config={config}>
									<PieChart>
										<Pie
											data={architectureData}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={renderCustomizedLabel}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value"
										>
											{architectureData.map((entry, index) => (
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
										<MapPin className="mx-auto h-12 w-12 mb-2 opacity-20" />
										<p>No architecture data available</p>
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
						<CardTitle>OS Distribution by Site Type</CardTitle>
						<CardDescription>
							Distribution of operating systems by site type
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className="h-80">
						{osBySiteTypeData.length > 0 ? (
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={osBySiteTypeData}
									margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis
										dataKey="name"
										angle={-45}
										textAnchor="end"
										height={70}
									/>
									<YAxis />
									<Tooltip />
									<Legend />
									{siteTypes.map((siteType, index) => (
										<Bar
											key={siteType}
											dataKey={siteType}
											name={siteType}
											fill={
												SITE_TYPE_COLORS[siteType] ||
												COLORS[index % COLORS.length]
											}
										/>
									))}
								</BarChart>
							</ResponsiveContainer>
						) : (
							<div className="h-full flex items-center justify-center">
								<div className="text-center text-muted-foreground">
									<MapPin className="mx-auto h-12 w-12 mb-2 opacity-20" />
									<p>No OS distribution data available</p>
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</>
	)
}

export default OSAnalysis
