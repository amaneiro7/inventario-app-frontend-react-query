import { memo } from 'react'
import { Cell, Pie, PieChart, type PieProps, ResponsiveContainer, Tooltip } from 'recharts'
import { PieChartLegend } from './PieChartLegend'
import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'

interface PieContentProps {
	data: PieProps['data']
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
		height = 320,
		colors = BASIC_COLORS_MAP,
		dataKey = 'value',
		outerRadius = 100,
		chartTitleId = 'pie-chart-title',
		chartDescriptionId = 'pie-chart-description'
	}: PieContentProps) => {
		const chartAccessibilityDescription = data
			?.map(
				(entry: any) =>
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
					{data && data?.length > 0 ? (
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
									label={({ name, percent }) => {
										const minVisiblePercent = 0.05 // Only show label if slice is large enough
										if (percent > minVisiblePercent)
											return `${name}: ${(percent * 100).toFixed(0)}%`
									}}
									outerRadius={outerRadius}
									fill="#8884d8"
									dataKey={dataKey}
									tabIndex={0}
								>
									{data?.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[index % colors.length]}
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
				<PieChartLegend data={data} colors={colors} total={total} dataKey={dataKey} />
			</div>
		)
	}
)

PieContent.displayName = 'PieContent'
