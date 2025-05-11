import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LabelList,
	LabelListProps
} from 'recharts'
import { MapPin, Filter } from 'lucide-react'
import Button from '@/components/Button'
import { BASIC_COLORS } from '@/utils/colores'
import { type DistributionItem } from '../hooks/useGeographicalDistribution'

interface CustomLabelListProps extends LabelListProps<DistributionItem> {
	value?: number | string
	x?: number
	y?: number
	width?: number
	height?: number
	dataKey: string
}

const CustomLabelList: React.FC<CustomLabelListProps> = ({
	value,
	x,
	y,
	width,
	height,
	dataKey
}) => {
	const labelText = `${dataKey}: ${value}` // Usa dataKey para el nombre
	if (!value || !x || !y) return null
	return (
		<text
			x={Number(x) + Number(width) + 5}
			y={Number(y) + Number(height) / 2}
			fill="#666"
			fontSize={10}
			textAnchor="start"
			dominantBaseline="middle"
		>
			{labelText}
		</text>
	)
}

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload
		return (
			<div className="bg-background rounded-lg border p-2 text-wrap shadow-md">
				<div className="flex items-center gap-2">
					<MapPin className="h-4 w-4" />
					<span className="font-medium">{data.name}</span>
				</div>
				<div className="mt-1 text-sm">
					<p className="flex gap-2">
						<span className="font-semibold">{data.value}</span>
						<span className="text-muted-foreground">Total equipos</span>
					</p>
					{data.Agencia !== undefined && (
						<p className="flex gap-2">
							<span className="text-naranja font-semibold">{data.Agencia}</span>
							<span className="text-muted-foreground">Agencias</span>
						</p>
					)}
					{data['Sede Administrativa'] !== undefined && (
						<p className="flex gap-2">
							<span className="text-verde font-semibold">
								{data['Sede Administrativa']}
							</span>
							<span className="text-muted-foreground">Sedes Administrativas</span>
						</p>
					)}
				</div>
			</div>
		)
	}
	return null
}

interface GeoChartsProps {
	distributionData: DistributionItem[]
	barName: string
	dynamicHeight: string
	barHeight: number
	clearFilters: () => void
}
export const GeoCharts = ({
	distributionData,
	barName,
	dynamicHeight,
	barHeight,
	clearFilters
}: GeoChartsProps) => {
	return (
		<div style={{ height: dynamicHeight ?? '20rem', minHeight: '20rem' }}>
			{distributionData.length > 0 ? (
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						layout="vertical"
						data={distributionData}
						margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis type="number" />
						<YAxis
							dataKey="name"
							type="category"
							axisLine={false}
							width={200}
							scale="auto"
							tick={{ fontSize: '0.65rem' }}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend />
						<Bar
							dataKey="value"
							barSize={barHeight}
							name={barName}
							fill={BASIC_COLORS.azul}
						>
							<LabelList
								dataKey="value"
								position="right"
								style={{ fontSize: '0.65rem' }}
								content={<CustomLabelList dataKey="Total" />}
							/>
						</Bar>
						<Bar
							dataKey="Agencia"
							barSize={barHeight}
							name="Agencia"
							fill={BASIC_COLORS.naranja}
						>
							<LabelList
								dataKey="Agencia"
								position="right"
								style={{ fontSize: '0.65rem' }}
								content={<CustomLabelList dataKey="Agencia" />}
							/>
						</Bar>
						<Bar
							dataKey="Sede Administrativa"
							barSize={barHeight}
							name="Sede Administrativas"
							fill={BASIC_COLORS.verde}
						>
							<LabelList
								dataKey="Sede Administrativa"
								position="right"
								style={{ fontSize: '0.65rem' }}
								content={<CustomLabelList dataKey="Sede Administrativa" />}
							/>
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			) : (
				<div className="flex h-full items-center justify-center">
					<div className="text-muted-foreground text-center">
						<Filter className="mx-auto mb-2 h-12 w-12 opacity-20" />
						<p>No hay datos para mostrar</p>
						<Button
							text="Limpiar filtros"
							buttonSize="medium"
							size="content"
							color="blanco"
							onClick={clearFilters}
							className="mt-2"
						/>
					</div>
				</div>
			)}
		</div>
	)
}
