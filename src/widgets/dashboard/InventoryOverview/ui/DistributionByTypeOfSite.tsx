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
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'

interface DistributionByTypeOfSiteProps {
	prepareGroupedBarData: Record<string, unknown>[]
	barHeight: number
}

export const DistributionByTypeOfSite = memo(
	({ barHeight, prepareGroupedBarData }: DistributionByTypeOfSiteProps) => {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Distribución Detallada por Tipo de Sitio</CardTitle>{' '}
					<CardDescription>
						Cantidad de equipos por tipo de sitio, discriminados por ubicación.
					</CardDescription>{' '}
				</CardHeader>
				<CardContent className="h-96">
					<BarChart
						data={prepareGroupedBarData}
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
						<Tooltip formatter={(value, name) => [`${value} equipos`, name]} />
						<Legend aria-label="Leyenda de la gráfica" />
						<Bar
							dataKey="Agencia"
							name="Agencia"
							fill={BASIC_COLORS.azul}
							barSize={barHeight}
						>
							<LabelList
								dataKey="Agencia"
								position="top"
								style={{ fontSize: '0.75rem' }}
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
								style={{ fontSize: '0.75rem' }}
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
								style={{ fontSize: '0.75rem' }}
							/>
						</Bar>
					</BarChart>
				</CardContent>
			</Card>
		)
	}
)
DistributionByTypeOfSite.displayName = 'DistributionByTypeOfSite'
