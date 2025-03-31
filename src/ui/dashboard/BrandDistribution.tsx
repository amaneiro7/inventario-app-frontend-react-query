import { memo, useMemo } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface BrandDistributionProps {
	brandData: ComputerDashboardDto['brand']
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#8dd1e1']
export const BrandDistribution = memo(({ brandData }: BrandDistributionProps) => {
	const data = useMemo(
		() =>
			brandData.map(brand => ({
				name: brand.name.replace('-', ' '), // Reemplaza el guion con un espacio
				count: brand.count,
				models: brand.model.length
			})),
		[brandData]
	)

	console.log(data)
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Cantidad de equipos por marca</CardTitle>
					<CardDescription>Total de equipos por marca</CardDescription>
					<CardContent className="h-80">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={data}
								margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="name"
									tick={{
										fontSize: '0.75rem' // Reduce el tamaño de la fuente de las etiquetas del eje X
									}}
								/>
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="count" fill="#0ea5e9" name="Cantidad" />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Marca</CardTitle>
					<CardDescription>Distribución de equipos por marca</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={80}
								fill="#8884d8"
								dataKey="count"
								nameKey="name"
								label={({ name, percent }) => {
									const minVisiblePercent = 0.05
									if (percent > minVisiblePercent)
										return `${name}: ${(percent * 100).toFixed(1)}%`
								}}
							>
								{brandData.map((_entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip
								formatter={value => [`${value.toLocaleString()}`, 'Cantidad']}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle>Distribución por cantidad de modelos</CardTitle>
					<CardDescription>Número de modelos por marca</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="models" fill="#8b5cf6" name="Model Count" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	)
})
