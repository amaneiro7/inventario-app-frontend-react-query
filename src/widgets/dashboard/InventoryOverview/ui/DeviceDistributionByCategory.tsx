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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface DeviceDistributionByCategoryProps {
	categoryData: ComputerDashboardDto['category']
}

export const DeviceDistributionByCategory = memo(
	({ categoryData }: DeviceDistributionByCategoryProps) => {
		return (
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
		)
	}
)

DeviceDistributionByCategory.displayName = 'DeviceDistributionByCategory'
