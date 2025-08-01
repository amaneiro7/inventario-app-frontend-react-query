import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseInventoryOverviewProps {
	categoryData: ComputerDashboardDto['category']
}

export const useInventoryOverview = ({ categoryData }: UseInventoryOverviewProps) => {
	// State to track selected equipment category
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const barHeight = useMemo(() => 30, [])
	const prepareGroupedBarData = useMemo(() => {
		// Get unique site types
		const siteTypes = new Set<string>()
		categoryData.forEach(category => {
			category.typeOfSite.forEach(site => {
				siteTypes.add(site.name)
			})
		})

		// Create a mapping for each category and site type
		return categoryData.map(category => {
			const result: Record<string, unknown> = {
				name: category.name
			}

			// Add counts for each site type
			Array.from(siteTypes).forEach(siteType => {
				const site = category.typeOfSite.find(s => s.name === siteType)
				result[siteType] = site ? site.count : 0
			})

			return result
		})
	}, [categoryData])

	// Get data for selected category or all categories
	const getSelectedCategoryData = useMemo(() => {
		if (selectedCategory === 'all') {
			// Aggregate data for all categories by site type
			const siteTypes = new Map<string, number>()

			categoryData.forEach(category => {
				category.typeOfSite.forEach(site => {
					siteTypes.set(site.name, (siteTypes.get(site.name) || 0) + site.count)
				})
			})

			return Array.from(siteTypes.entries()).map(([name, count]) => ({ name, count }))
		} else {
			// Return data for selected category
			const data = categoryData.find(c => c.name === selectedCategory)
			return data ? data.typeOfSite : []
		}
	}, [categoryData, selectedCategory])

	// Calculate total count for selected category
	const getTotalCount = useMemo(() => {
		if (selectedCategory === 'all') {
			return categoryData.reduce((sum, cat) => sum + cat.count, 0)
		} else {
			const data = categoryData.find(c => c.name === selectedCategory)
			return data ? data.count : 0
		}
	}, [selectedCategory, categoryData])

	return {
		prepareGroupedBarData,
		barHeight,
		selectedCategory,
		setSelectedCategory,
		getTotalCount,
		getSelectedCategoryData
	}
}
