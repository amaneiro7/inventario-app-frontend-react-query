import { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { useModelBreakdown } from './hooks/useModelBreakdown'

interface ModelBreakdownProps {
	data: ComputerDashboardDto['brand']
}

export const ModelBreakdown = memo(({ data }: ModelBreakdownProps) => {
	const { selectedBrand, barHeight, brands, dynamicHeight, modelChartData, setSelectedBrand } =
		useModelBreakdown({ data })

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Comparación de modelos</CardTitle>
						<CardDescription>Vista de modelos por marcas específicas</CardDescription>
					</div>
					<Select value={selectedBrand} onValueChange={setSelectedBrand}>
						<SelectTrigger className="w-[188px]">
							<SelectValue placeholder="Seleccione una marca" />
						</SelectTrigger>
						<SelectContent>
							{brands.map(brand => (
								<SelectItem key={brand} value={brand}>
									{brand}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardHeader>
				<CardContent style={{ height: dynamicHeight ?? '20rem', minHeight: '20rem' }}>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={modelChartData}
							margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
							layout="vertical"
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis type="number" />
							<YAxis
								type="category"
								dataKey="name"
								width={150}
								tick={{ fontSize: '0.75rem' }}
							/>
							<Tooltip
								formatter={(value, name) => {
									if (name === 'Value') {
										return [`${Number(value).toLocaleString()}`, name]
									}
									return [value, name]
								}}
								labelFormatter={label => `Model: ${label}`}
							/>
							<Legend />
							<Bar
								dataKey="quantity"
								name="Cantidad"
								fill="#0ea5e9"
								barSize={barHeight}
							>
								<LabelList
									dataKey="quantity"
									position="right"
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
