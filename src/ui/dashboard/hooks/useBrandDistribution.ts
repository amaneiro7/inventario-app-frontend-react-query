import { ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { useMemo } from 'react'

interface UseBrandDistributionProps {
	data: ComputerDashboardDto['brand']
}

export interface BrandData {
	name: string
	count: number
	models: number
}
export function useBrandDistribution({ data }: UseBrandDistributionProps) {
	const brandData: BrandData[] = useMemo(
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
		brandData,
		total
	}
}
