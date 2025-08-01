import { useMemo } from 'react'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseHardDriveAnalysisProps {
	data: ComputerDashboardDto['hardDrive']
}

export interface HDDTypeData {
	name: string
	count: number
}

export type HDDPrepareGroupedBarData = Record<string, unknown>[]
export function useHardDriveAnalysys({ data }: UseHardDriveAnalysisProps) {
	// Process data by drive type
	const typeData: HDDTypeData[] = useMemo(() => {
		const resultMap = new Map<string, number>()

		data.forEach(hddCapacity => {
			hddCapacity.hddType.forEach(hddType => {
				const key = hddType.name
				if (key) {
					const currentCount = resultMap.get(key) || 0
					resultMap.set(key, currentCount + hddType.count)
				}
			})
		})

		return Array.from(resultMap)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
	}, [data])

	const totalDrivesByCapacity = useMemo(
		() => data.reduce((sum, item) => sum + item.count, 0),
		[data]
	)
	const totalDrivesByType = useMemo(
		() => typeData.reduce((sum, item) => sum + item.count, 0),
		[typeData]
	)

	const barHeight = useMemo(() => 30, [])
	const prepareGroupedBarData: HDDPrepareGroupedBarData = useMemo(() => {
		// Get unique hdd types
		const hddTypes = new Set<string>()
		data.forEach(hddCapacity => {
			hddCapacity.hddType.forEach(hddType => {
				hddTypes.add(hddType.name)
			})
		})

		// Create a mapping for each hddCapacity and hddType
		return data.map(hddCapacity => {
			const result: Record<string, unknown> = {
				name: hddCapacity.name
			}

			// Add counts for each site type
			Array.from(hddTypes).forEach(hddType => {
				const type = hddCapacity.hddType.find(s => s.name === hddType)
				result[hddType] = type ? type.count : 0
			})

			return result
		})
	}, [data])

	return {
		typeData,
		totalDrivesByCapacity,
		totalDrivesByType,
		barHeight,
		prepareGroupedBarData
	}
}
