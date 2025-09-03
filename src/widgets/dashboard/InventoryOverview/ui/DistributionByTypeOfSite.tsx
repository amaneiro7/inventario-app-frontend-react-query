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
		)
	}
)
DistributionByTypeOfSite.displayName = 'DistributionByTypeOfSite'
