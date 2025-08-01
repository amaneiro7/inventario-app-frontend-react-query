import { useState, useMemo } from 'react'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseModelBreakdownProps {
	data: ComputerDashboardDto['brand']
}

export interface ModelChartData {
	name: string
	quantity: number
	brand: string
}

export function useModelBreakdown({ data }: UseModelBreakdownProps) {
	const [selectedBrand, setSelectedBrand] = useState<string>('All')

	// Get unique brands for the filter
	const brands: string[] = useMemo(() => {
		return [...Array.from(new Set(data.map(item => item.name)))].sort()
	}, [data])
	// Prepare model data based on selected brand
	const modelData: Record<string, ModelChartData> = useMemo(() => {
		let filteredData = data
		if (selectedBrand !== 'All') {
			filteredData = data.filter(item => item.name === selectedBrand)
		}
		const result: Record<string, { name: string; quantity: number; brand: string }> = {}
		filteredData.forEach(
			brand => {
				brand.model.forEach(model => {
					result[model.name] = {
						name: model.name,
						quantity: model.count,
						brand: brand.name
					}
				})
			},
			{} as Record<string, { name: string; quantity: number; brand: string }>
		)
		return result
	}, [data, selectedBrand])

	const modelChartData: ModelChartData[] = useMemo(() => {
		return Object.values(modelData).sort((a, b) => b.quantity - a.quantity)
	}, [modelData])

	// Calculate dynamic height based on the number of bars and barSize
	const barHeight = 16 // Size of each bar
	const barSpacing = 100 // Spacing between bars and other elements
	const dynamicHeight = `${modelChartData.length * (barHeight * 2) + barSpacing}px` // Add extra space for margins and labels

	return {
		selectedBrand,
		barHeight,
		dynamicHeight,
		brands,
		modelData,
		modelChartData,
		setSelectedBrand
	}
}
