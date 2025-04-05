import { useMemo } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseMemoryRamTypeAnalysisProps {
	data: ComputerDashboardDto['modulosMemoryRam']
}
export function useMemoryRamTypeAnalysys({ data }: UseMemoryRamTypeAnalysisProps) {
	const barHeight = useMemo(() => 30, [])

	const memModuleType = useMemo(() => {
		const resultMap = new Map<string, number>()

		data.forEach(typeOfSite => {
			typeOfSite.memoryRamType.forEach(memType => {
				memType.memoryRamValues.forEach(memModule => {
					if (memModule.count > 0) {
						const key = memModule.name
						if (key) {
							const currentCount = resultMap.get(key) || 0
							resultMap.set(key, currentCount + memModule.count)
						}
					}
				})
			})
		})

		return Array.from(resultMap)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
	}, [data])

	const prepareGroupedBarData = useMemo(() => {
		// Get unique hdd types
		const memValues = new Set<string>()
		data.forEach(typeOfSite => {
			typeOfSite.memoryRamType.forEach(memtype => {
				memtype.memoryRamValues.forEach(modulos => {
					if (modulos.count > 0) {
						memValues.add(modulos.name)
					}
				})
			})
		})

		// Create a mapping for each hddCapacity and hddType
		return data.flatMap(typeOfSite => {
			return typeOfSite.memoryRamType
				.map(memType => {
					const result: Record<string, unknown> = {
						name: memType.name
					}
					let hasMemory = false
					// Add counts for each memory module type
					Array.from(memValues).forEach(memModule => {
						const type = memType.memoryRamValues.find(
							module => module.name === memModule
						)
						if (type && type.count > 0) {
							result[memModule] = type.count
							hasMemory = true
						}
					})

					return hasMemory ? result : null
				})
				.filter(Boolean) as Record<string, unknown>[]
		})
	}, [data])

	return {
		barHeight,
		memModuleType,
		prepareGroupedBarData
	}
}
