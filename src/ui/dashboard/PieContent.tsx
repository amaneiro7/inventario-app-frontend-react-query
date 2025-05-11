import { memo } from 'react'
import { Cell, Pie, PieChart, type PieProps, ResponsiveContainer, Tooltip } from 'recharts'
import Typography from '@/components/Typography'
import { BASIC_COLORS_MAP } from '@/utils/colores'

interface PieContentProps {
	data: PieProps['data']
	dataKey?: PieProps['dataKey']
	total: number
	icon?: React.ReactNode
	colors?: string[]
}

export const PieContent = memo(
	({ data, total, icon, colors = BASIC_COLORS_MAP, dataKey = 'value' }: PieContentProps) => {
		return (
			<div>
				<div className="h-80">
					{data && data?.length > 0 ? (
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={data}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ name, percent }) => {
										const minVisiblePercent = 0.05
										if (percent > minVisiblePercent)
											return `${name}: ${(percent * 100).toFixed(0)}%`
									}}
									outerRadius={80}
									fill="#8884d8"
									dataKey={dataKey}
								>
									{data?.map((_entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[index % colors.length]}
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
				<div>
					<div className="flex flex-wrap items-center justify-center gap-4">
						{data?.map((entry, index) => (
							<div key={entry.name} className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<span
										className="h-3 w-3 rounded-full"
										style={{
											backgroundColor: colors[index % colors.length]
										}}
									/>
									<Typography variant="span" weight="medium">
										{entry.name}:
									</Typography>
								</div>
								<div className="flex items-center gap-2">
									<Typography variant="span" weight="bold">
										{entry.count}
									</Typography>
									<Typography variant="span" className="text-muted-foreground">
										({Math.round((entry.count / total) * 100)}
										%)
									</Typography>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
)

PieContent.displayName = 'PieContent'
