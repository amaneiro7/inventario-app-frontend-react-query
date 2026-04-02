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
				<CardContent className="h-96">
					<BarChart
						data={categoryData}
						style={{
							width: '100%',
							maxWidth: '800px',
							maxHeight: '80vh',
							aspectRatio: 1.618
						}}
						responsive
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							aria-label="Categoría de equipo"
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
							labelFormatter={label => `Categoría: ${label}`}
						/>
						<Legend aria-label="Leyenda de la gráfica" />
						<Bar dataKey={'count'} name="Cantidad de equipos" fill={BASIC_COLORS.azul}>
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

DeviceDistributionByCategory.displayName = 'DeviceDistributionByCategory'
