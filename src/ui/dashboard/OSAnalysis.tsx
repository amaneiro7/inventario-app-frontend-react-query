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
import { useOperatingSystemByRegion } from './hooks/useOperatingSystemByRegion'

interface OSAnalysisProps {
	data: ComputerDashboardDto['operatingSystem']
	operatingSystemByRegion: ComputerDashboardDto['operatingSystemByRegion']
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658']

export const OSAnalysis: React.FC<OSAnalysisProps> = memo(({ data, operatingSystemByRegion }) => {
	const { arqData, barHeight, prepareGroupedBarData, totalArq, totalOperatingSystem } =
		useOperatingSystemAnalysys({ data })

	useOperatingSystemByRegion({ data: operatingSystemByRegion })
	return (
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
			{/* <Card className="col-span-12">
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
			</Card> */}
		</div>
	)
})
