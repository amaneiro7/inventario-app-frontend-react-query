import { memo } from 'react'
import { Cell, Pie, PieChart, type PieProps, ResponsiveContainer, Tooltip } from 'recharts'
import { PieChartLegend } from './PieChartLegend'
import { type PieChartData } from './PieChart'

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
}

export const PieContent = memo(
	({
		data,
		total,
		icon,
		height = 320, // Altura por defecto del contenedor del gráfico
		colors, // Los colores se obtienen del PieCard que usa BASIC_COLORS_MAP por defecto
		dataKey = 'count', // Coincide con la propiedad 'count' de los datos
		outerRadius = 100,
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
					className="flex min-h-0 flex-grow items-center justify-center"
					style={{
						height
					}}
				>
					{data && data.length > 0 && colors ? (
						<ResponsiveContainer width="100%" height="100%">
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
									{chartAccessibilityDescription}. Total de elementos: {total}.
								</desc>
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
								>
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[index % colors.length] ?? '#cccccc'}
											aria-label={`${entry.name}: ${entry.count} (${total > 0 ? ((entry.count / total) * 100).toFixed(0) : 0}%)`}
										/>
									))}
								</Pie>
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
