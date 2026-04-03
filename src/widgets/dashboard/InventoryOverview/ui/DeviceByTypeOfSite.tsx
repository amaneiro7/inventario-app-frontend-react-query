import { memo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
	LabelList
} from '@/shared/ui/Charts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import type { ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface DeviceByTypeOfSiteProps {
	categoryData: ComputerDashboardDto['category']
	selectedCategory: string
	getTotalCount: number
	barHeight: number
	getSelectedCategoryData: {
		name: string
		count: number
	}[]
	handleCategorySelect: (value: string) => void
}

export const DeviceByTypeOfSite = memo(
	({
		categoryData,
		barHeight,
		selectedCategory,
		getTotalCount,
		getSelectedCategoryData,
		handleCategorySelect
	}: DeviceByTypeOfSiteProps) => {
		return (
			<Card>
				<CardHeader>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between">
						<div>
							<CardTitle>Equipos por Tipo de Sitio</CardTitle>
							<CardDescription>Total: {getTotalCount} Equipos</CardDescription>
						</div>
						<Select
							value={selectedCategory}
							onValueChange={handleCategorySelect}
							aria-label="Filtrar la gráfica de equipos por tipo de sitio por categoría" // Accesibilidad
						>
							<SelectTrigger className="mt-2 w-45 md:mt-0">
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
					<BarChart
						data={getSelectedCategoryData}
						style={{
							flex: '1 1 0%',
							width: '100%',
							maxHeight: '100%',
							minHeight: '0',
							aspectRatio: 1
						}}
						responsive
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							aria-label="Tipo de sitio"
							intercept={0}
							angle={15}
							textAnchor="middle"
							height={60}
							tickMargin={20}
							style={{
								fontSize: '1rem'
							}}
						/>
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
				</CardContent>
			</Card>
		)
	}
)

DeviceByTypeOfSite.displayName = 'DeviceByTypeOfSite'
