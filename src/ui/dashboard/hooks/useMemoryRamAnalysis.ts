import { ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { useMemo, useState } from 'react'

interface UseMemoryRamAnalysisProps {
	data: ComputerDashboardDto['brand']
}
export function useMemoryRamAnalysis({ data }: UseMemoryRamAnalysisProps) {
	const [viewBy, setViewBy] = useState<'all' | 'inUse' | 'agency' | 'administrative' | 'almacen'>(
		'all'
	)
	const memoryData = useMemo(
		() =>
			data.map(brand => ({
				name: brand.name.replace('-', ' '), // Reemplaza el guion con un espacio
				count: brand.count,
				models: brand.model.length
			})),
		[data]
	)
	const total = useMemo(() => data.reduce((sum, item) => sum + item.count, 0), [data])
	return {
		memoryData,
		total
	}
}
