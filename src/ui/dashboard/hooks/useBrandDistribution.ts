import { ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { useMemo } from 'react'

/**
 * Props for the useBrandDistribution hook.
 */
interface UseBrandDistributionProps {
	/** The raw brand data from the computer dashboard DTO. */
	data: ComputerDashboardDto['brand']
}

/**
 * Represents processed brand data for distribution.
 */
export interface BrandData {
	/** The name of the brand, with hyphens replaced by spaces. */
	name: string
	/** The count of devices for this brand. */
	count: number
	/** The number of unique models associated with this brand. */
	models: number
}

/**
 * `useBrandDistribution` Hook
 *
 * A custom React hook that processes raw brand data to calculate brand distribution
 * and total device count. It memoizes the processed data to optimize performance.
 *
 * @param {UseBrandDistributionProps} { data } - An object containing the raw brand data.
 * @returns {{ brandData: BrandData[]; total: number }} An object containing the processed brand data and the total count of devices.
 */
export function useBrandDistribution({ data }: UseBrandDistributionProps) {
	const brandData: BrandData[] = useMemo(
		() =>
			data.map(brand => ({
				name: brand.name.replace('-', ' '), // Replaces hyphen with a space for better display
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
