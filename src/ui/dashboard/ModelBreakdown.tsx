import { memo, useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface ModelBreakdownProps {
	data: ComputerDashboardDto['brand']
}

export const ModelBreakdown = memo(({ data }: ModelBreakdownProps) => {
	const [selectedBrand, setSelectedBrand] = useState<string>('All Brands')

	// Get unique brands for the filter
	const brands = useMemo(() => {
		return ['All Brands', ...Array.from(new Set(data.map(item => item.name)))].sort()
	}, [data])
	// Prepare model data based on selected brand
	const modelData = useMemo(() => {
		let filteredData = data
		if (selectedBrand !== 'All Brands') {
			filteredData = data.filter(item => item.name === selectedBrand)
		}
		const result: Record<string, { name: string; quantity: number; brand: string }> = {}
		filteredData.forEach(brand => {
			brand.model.forEach(model => {
				result[model.name] = {
					name: model.name,
					quantity: model.count,
					brand: brand.name
				}
			})
		}, {} as Record<string, { name: string; quantity: number; brand: string }>)
		return result
	}, [data, selectedBrand])

	const modelChartData = useMemo(() => {
		return Object.values(modelData).sort((a, b) => b.quantity - a.quantity)
	}, [modelData])

	// Calculate dynamic height based on the number of bars and barSize
	const barHeight = 16 // Size of each bar
	const barSpacing = 40 // Spacing between bars and other elements
	const dynamicHeight = `${modelChartData.length * barSpacing + 100}px` // Add extra space for margins and labels

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
							/>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	)
})
