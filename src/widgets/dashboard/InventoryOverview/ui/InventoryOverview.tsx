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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { useInventoryOverview } from '../model/useInventoryOverview'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import { BASIC_COLORS, BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'
import { PieCard } from '@/shared/ui/PieChart/PieCard'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface InventoryOverviewProps {
	categoryData: ComputerDashboardDto['category']
	statusData: ComputerDashboardDto['status']
}

export const InventoryOverview = ({ categoryData, statusData }: InventoryOverviewProps) => {
	const {
		barHeight,
		selectedCategory,
		prepareGroupedBarData,
		getTotalCount,
		getSelectedCategoryData,
		setSelectedCategory
	} = useInventoryOverview({ categoryData })

	const totalStatus = useMemo(() => {
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
						<Select
							value={selectedCategory}
							onValueChange={setSelectedCategory}
							aria-label="Filtrar la gráfica de equipos por tipo de sitio por categoría" // Accesibilidad
						>
							<SelectTrigger className="mt-2 w-[180px] md:mt-0">
								<SelectValue placeholder="Seleccionar Categoría" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todas las categorías</SelectItem>
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
					<ResponsiveContainer
						width="100%"
						height="100%"
						aria-label="Gráfica de barras de equipos por tipo de sitio"
					>
						<BarChart
							data={getSelectedCategoryData}
							margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" aria-label="Tipo de sitio" />
							<YAxis aria-label="Cantidad de equipos" />
							<Tooltip
								formatter={value => [`${value} equipos`, 'Cantidad']}
								labelFormatter={label => `Tipo de sitio: ${label}`} // Mejora la información del tooltip
							/>
							<Legend aria-label="Leyenda de la gráfica" />
							<Bar
								dataKey="count"
								name="Cantidad de equipos"
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
				title="Distribución por estatus de equipos"
				desc="Porcentaje de equipos según su estatus"
				colors={BASIC_COLORS_MAP}
				dataKey="count"
				total={totalStatus}
			/>
			<Card>
				<CardHeader>
					<CardTitle>Distribución por categoría de equipos</CardTitle>
					<CardDescription>Cantidad de equipos por categoría</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={categoryData}
							margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" aria-label="Categoría de equipo" />{' '}
							{/* Accesibilidad */}
							<YAxis aria-label="Cantidad de equipos" /> {/* Accesibilidad */}
							<Tooltip
								formatter={value => [`${value} equipos`, 'Cantidad']}
								labelFormatter={label => `Categoría: ${label}`}
							/>
							<Legend aria-label="Leyenda de la gráfica" /> {/* Accesibilidad */}
							<Bar
								dataKey={'count'}
								name="Cantidad de equipos"
								fill={BASIC_COLORS.azul}
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

			{/* New Triple Bar Chart showing all equipment by category and site type */}
			<Card>
				<CardHeader>
					<CardTitle>Distribución Detallada por Tipo de Sitio</CardTitle>{' '}
					<CardDescription>
						Cantidad de equipos por tipo de sitio, discriminados por ubicación.
					</CardDescription>{' '}
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={prepareGroupedBarData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" aria-label="Tipo de sitio" />{' '}
							{/* Accesibilidad */}
							<YAxis aria-label="Cantidad de equipos" /> {/* Accesibilidad */}
							<Tooltip formatter={(value, name) => [`${value} equipos`, name]} />
							<Legend aria-label="Leyenda de la gráfica" /> {/* Accesibilidad */}
							<Bar
								dataKey="Agencia"
								name="Agencia"
								fill={BASIC_COLORS.azul}
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
								fill={BASIC_COLORS.naranja}
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
								fill={BASIC_COLORS.verde}
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
