import { useMemo } from 'react'
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
import { useInventoryOverview } from './hooks/useInventoryOverview'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { PieCard } from './PieCard'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { BASIC_COLORS, BASIC_COLORS_MAP } from '@/utils/colores'

const SITE_TYPE_COLORS = {
	Agencia: 'hsl(213, 100%, 19%)',
	Almacén: 'hsl(19, 99%, 50%)',
	'Sede Administrativa': 'hsl(148, 85%, 24%)'
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

	const getTotalStatus = useMemo(() => {
		return statusData.reduce((sum, cat) => sum + cat.count, 0)
	}, [statusData])
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4">
			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between">
						<div>
							<CardTitle>Equipos por Tipo de Sitio</CardTitle>
							<CardDescription>Total: {getTotalCount} Equipos</CardDescription>
						</div>
						<Select value={selectedCategory} onValueChange={setSelectedCategory}>
							<SelectTrigger className="mt-2 w-[180px] md:mt-0">
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
				<CardContent className="h-96">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={getSelectedCategoryData}
							margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip formatter={value => [`${value} equipos`, 'Cantidad']} />
							<Legend />
							<Bar
								dataKey="count"
								name="Cantidad"
								fill={BASIC_COLORS.verde}
								barSize={barHeight}
							>
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
			<PieCard
				data={statusData}
				title="Distribución por estatus"
				desc="Distribuicion de equipos por estatus"
				colors={BASIC_COLORS_MAP}
				dataKey="count"
				total={getTotalStatus}
			/>
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
							<Bar dataKey={'count'} name="Cantidad" fill={BASIC_COLORS.azul}>
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
