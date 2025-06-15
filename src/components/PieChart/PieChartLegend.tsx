import { memo } from 'react'
import Typography from '@/components/Typography'
import { type PieProps } from 'recharts'

interface PieChartLegendProps {
	data: PieProps['data']
	dataKey?: PieProps['dataKey']
	colors: string[]
	total: number
}

export const PieChartLegend = memo(({ data, colors, total }: PieChartLegendProps) => {
	if (!data || data.length === 0) {
		return null
	}

	return (
		<div
			className="flex flex-wrap items-center justify-center gap-4 py-4"
			role="list"
			aria-label="Leyenda del gráfico de pastel"
		>
			{data.map((entry: any, index: number) => {
				const value = entry.count
				const percentage = total > 0 ? Math.round((value / total) * 100) : 0

				return (
					<div key={entry.name} className="flex items-center gap-4" role="listitem">
						<div className="flex items-center gap-2">
							<span
								className="h-3 w-3 rounded-full"
								style={{
									backgroundColor: colors[index % colors.length]
								}}
								role="presentation"
								aria-hidden="true"
							/>
							<Typography
								variant="span"
								weight="medium"
								id={`legend-item-${entry.name}`}
							>
								{entry.name}:
							</Typography>
						</div>
						<div className="flex items-center gap-2">
							<Typography
								variant="span"
								weight="bold"
								aria-labelledby={`legend-item-${entry.name}`}
							>
								{value}
							</Typography>
							<Typography
								variant="span"
								className="text-muted-foreground"
								aria-hidden="true"
							>
								({percentage}%)
							</Typography>
						</div>
					</div>
				)
			})}
		</div>
	)
})

PieChartLegend.displayName = 'PieChartLegend'
