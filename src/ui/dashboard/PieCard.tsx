import { Cell, Pie, PieChart, PieProps, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import Typography from '@/components/Typography'

interface PieCardProps {
	data: PieProps['data']
	dataKey?: PieProps['dataKey']
	title: string
	desc: string
	total: number
	icon?: React.ReactNode
	colors?: string[]
}

const COLORS = [
	'#4CAF50', // Verde
	'#2196F3', // Azul
	'#FFC107', // Amarillo
	'#F44336', // Rojo
	'#9C27B0', // Morado
	'#795548', // Marrón
	'#00BCD4', // Cian
	'#FF9800' // Naranja
]

export const PieCard = ({
	data,
	title,
	desc,
	total,
	icon,
	colors = COLORS,
	dataKey = 'value'
}: PieCardProps) => {
	return (
		<Card>
			<CardHeader>
				<div>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{desc}</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-row flex-wrap items-center gap-6">
					<div>
						<div className="space-y-4">
							{data?.map((entry, index) => (
								<div
									key={entry.name}
									className="flex gap-4 items-center justify-between"
								>
									<div className="flex items-center gap-2">
										<div
											className="w-3 h-3 rounded-full"
											style={{
												backgroundColor: colors[index % colors.length]
											}}
										/>
										<Typography variant="span" weight="medium">
											{entry.name}
										</Typography>
									</div>
									<div className="flex items-center gap-2">
										<Typography variant="span" weight="bold">
											{entry.count}
										</Typography>
										<Typography
											variant="span"
											className="text-muted-foreground"
										>
											({Math.round((entry.count / total) * 100)}
											%)
										</Typography>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="h-80">
						{data && data?.length > 0 ? (
							<ResponsiveContainer width={400} height="100%">
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
							<div className="h-full flex items-center justify-center">
								<div className="text-center text-muted-foreground">
									{icon}
									<p>No hay datos disponibles</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
