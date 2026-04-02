import { memo, Suspense } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from '@/shared/ui/Charts'
import { PieChartLegend } from './PieChartLegend'
import { MyCustomPie } from './MyCustomPie'
import type { PieProps } from '@/shared/ui/Charts'
import type { PieChartData } from './PieChart'

interface PieContentProps {
	data: PieChartData[] | undefined
	dataKey?: PieProps['dataKey']
	outerRadius?: PieProps['outerRadius']
	total: number
	icon?: React.ReactNode
	colors?: string[]
	chartTitleId?: string
	chartDescriptionId?: string
	height?: number
	isAnimationActive?: boolean
}

export const PieContent = memo(
	({
		data,
		total,
		icon,
		height = 320, // Altura por defecto del contenedor del gráfico
		colors, // Los colores se obtienen del PieCard que usa c por defecto
		dataKey = 'count', // Coincide con la propiedad 'count' de los datos
		outerRadius = 100,
		isAnimationActive = true,
		chartTitleId = 'pie-chart-title',
		chartDescriptionId = 'pie-chart-description'
	}: PieContentProps) => {
		const chartAccessibilityDescription = data
			?.map(
				entry =>
					`${entry.name}: ${entry.count} (${total > 0 ? ((entry.count / total) * 100).toFixed(0) : 0}%)`
			)
			.join(', ')

		return (
			<div className="flex h-full flex-col">
				<div
					className="flex min-h-0 grow items-center justify-center"
					style={{
						height
					}}
				>
					{data && data.length > 0 && colors ? (
						<Suspense>
							<ResponsiveContainer
								width={500}
								height={300}
								minWidth={500}
								minHeight={300}
								aspect={1}
							>
								<PieChart
									aria-labelledby={chartTitleId}
									aria-describedby={chartDescriptionId}
								>
									{/* Hidden title and description for screen readers */}
									<title id={chartTitleId} className="sr-only">
										Distribución de elementos por categoría
									</title>
									<desc id={chartDescriptionId} className="sr-only">
										Gráfico de pastel que muestra la distribución de datos.{' '}
										{chartAccessibilityDescription}. Total de elementos: {total}
										.
									</desc>
									<defs>
										<pattern
											id="pattern-checkers"
											x="0"
											y="0"
											width="10"
											height="10"
											patternUnits="userSpaceOnUse"
										>
											<rect
												className="checker"
												x="0"
												width="5"
												height="5"
												y="0"
											/>
											<rect
												className="checker"
												x="10"
												width="5"
												height="5"
												y="10"
											/>
										</pattern>
									</defs>
									<Pie
										data={data}
										cx="50%"
										cy="50%"
										labelLine={false}
										label={({
											name,
											percent
										}: {
											name?: string
											percent?: number
										}) => {
											const minVisiblePercent = 0.05 // Solo mostrar etiqueta si el trozo es suficientemente grande
											if (name && percent && percent > minVisiblePercent) {
												return `${name}: ${(percent * 100).toFixed(0)}%`
											}
											return null // No renderizar etiqueta si no cumple las condiciones
										}}
										outerRadius={outerRadius}
										fill="#8884d8"
										dataKey={dataKey}
										tabIndex={0}
										isAnimationActive={isAnimationActive}
										shape={MyCustomPie}
									></Pie>
									<Tooltip
										formatter={(value, name) => [value, name]}
										contentStyle={{
											backgroundColor: 'white',
											borderRadius: '0.5rem',
											border: '1px solid #e2e8f0'
										}}
									/>
								</PieChart>
							</ResponsiveContainer>
						</Suspense>
					) : (
						<div className="flex h-full items-center justify-center">
							<div className="text-muted-foreground text-center">
								{icon}
								<p>No hay datos disponibles</p>
							</div>
						</div>
					)}
				</div>
				{colors && <PieChartLegend data={data} colors={colors} total={total} />}
			</div>
		)
	}
)

PieContent.displayName = 'PieContent'
