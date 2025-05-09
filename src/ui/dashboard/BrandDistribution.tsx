import { memo } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LabelList
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { PieCard } from './PieCard'
import { useBrandDistribution } from './hooks/useBrandDistribution'
import { BASIC_COLORS, BASIC_COLORS_MAP } from '@/utils/colores'

interface BrandDistributionProps {
	brandData: ComputerDashboardDto['brand']
}
export const BrandDistribution = memo(({ brandData: data }: BrandDistributionProps) => {
	const { brandData, total } = useBrandDistribution({ data })
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Cantidad de equipos por marca</CardTitle>
					<CardDescription>Total de equipos por marca</CardDescription>
					<CardContent className="mb-6 h-80">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={brandData}
								margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="name"
									tick={{
										fontSize: '0.75rem' // Reduce el tamaño de la fuente de las etiquetas del eje X
									}}
								/>
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar
									dataKey="count"
									fill={BASIC_COLORS.naranja}
									name="Cantidad"
									barSize={30}
								>
									<LabelList
										dataKey="count"
										position="top"
										style={{ fontSize: '0.65rem' }}
									/>
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</CardHeader>
			</Card>
			<PieCard
				data={brandData}
				desc="Distribución de equipos por marca"
				title="Marca"
				dataKey="count"
				colors={BASIC_COLORS_MAP}
				total={total}
			/>

			<Card>
				<CardHeader>
					<CardTitle>Distribución por cantidad de modelos</CardTitle>
					<CardDescription>Número de modelos por marca</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={brandData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar
								dataKey="models"
								fill={BASIC_COLORS.verde}
								name="Model Count"
								barSize={45}
							>
								<LabelList
									dataKey="models"
									position="top"
									style={{ fontSize: '0.65rem' }}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	)
})
