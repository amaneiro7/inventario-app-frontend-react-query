import {
	Cell,
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	LabelList
} from 'recharts'
import { useInventoryOverview } from './hooks/useInventoryOverview'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
const SITE_TYPE_COLORS = {
	Agencia: '#0088FE',
	Almacén: '#00C49F',
	'Sede Administrativa': '#FFBB28'
}

export const InventoryOverview = ({
	categoryData,
	statusData
}: {
	categoryData: ComputerDashboardDto['category']
	statusData: ComputerDashboardDto['status']
}) => {
	const {
		barHeight,
		selectedCategory,
		prepareGroupedBarData,
		getTotalCount,
		getSelectedCategoryData,
		setSelectedCategory
	} = useInventoryOverview({ categoryData })
	return (
		<div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(450px,_1fr))]">
			<Card>
				<CardHeader>
					<CardTitle>Distribución por categoria</CardTitle>
					<CardDescription>Cantidad de equipos por categoria</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={categoryData}
							margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey={'count'} name="Cantidad" fill="#0EA5E9">
								<LabelList
									dataKey="count"
									position="top"
									style={{ fontSize: '0.65rem' }}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Distribución por estatus</CardTitle>
					<CardDescription>Distribuicion de equipos por estatus</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={statusData}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={80}
								fill="#8884d8"
								dataKey="count"
								label={({ name, percent }) => {
									const minVisiblePercent = 0.05
									if (percent > minVisiblePercent)
										return `${name}: ${(percent * 100).toFixed(0)}%`
								}}
							>
								{statusData.map((_entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip
								formatter={(value, _name, props) => [value, props.payload.name]}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
			{/* Equipment by Site Type Card with Category Filter */}
			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between">
						<div>
							<CardTitle>Equipos por Tipo de Sitio</CardTitle>
							<CardDescription>Total: {getTotalCount} Equipos</CardDescription>
						</div>
						<Select value={selectedCategory} onValueChange={setSelectedCategory}>
							<SelectTrigger className="w-[180px] mt-2 md:mt-0">
								<SelectValue placeholder="Seleccionar Categoría" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos</SelectItem>
								{categoryData.map(category => (
									<SelectItem key={category.name} value={category.name}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={getSelectedCategoryData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip formatter={value => [`${value} equipos`, 'Cantidad']} />
							<Legend />
							<Bar dataKey="count" name="Cantidad" fill="#8b5cf6" barSize={barHeight}>
								<LabelList
									dataKey="count"
									position="top"
									style={{ fontSize: '0.65rem' }}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
			{/* New Triple Bar Chart showing all equipment by category and site type */}
			<Card>
				<CardHeader>
					<CardTitle>Distribución de Equipos por tipo de sitio</CardTitle>
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
							<Bar
								dataKey="Agencia"
								name="Agencia"
								fill={SITE_TYPE_COLORS['Agencia']}
								barSize={barHeight}
							>
								<LabelList
									dataKey="Agencia"
									position="top"
									style={{ fontSize: '0.65rem' }}
								/>
							</Bar>
							<Bar
								dataKey="Almacén"
								name="Almacén"
								fill={SITE_TYPE_COLORS['Almacén']}
								barSize={barHeight}
							>
								<LabelList
									dataKey="Almacén"
									position="top"
									style={{ fontSize: '0.65rem' }}
								/>
							</Bar>
							<Bar
								dataKey="Sede Administrativa"
								name="Sede Administrativa"
								fill={SITE_TYPE_COLORS['Sede Administrativa']}
								barSize={barHeight}
							>
								<LabelList
									dataKey="Sede Administrativa"
									position="top"
									style={{ fontSize: '0.65rem' }}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	)
}
