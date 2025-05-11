import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseMemoryRamTypeAnalysisProps {
	data: ComputerDashboardDto['modulosMemoryRam']
}

export interface MemModuleType {
	name: string
	count: number
}

export type RamPrepareGroupedBarData = Record<string, unknown>
export function useMemoryRamTypeAnalysys({ data }: UseMemoryRamTypeAnalysisProps) {
	const [selectedRamType, setSelectedRamType] = useState<string>('All')

	const memModuleType: MemModuleType[] = useMemo(() => {
		const resultMap = new Map<string, number>()

		data.forEach(ram => {
			ram.memoryRamType.forEach(memType => {
				if (selectedRamType === 'All' || memType.name === selectedRamType) {
					memType.memoryRamValues.forEach(memModule => {
						if (memModule.count > 0) {
							const key = memModule.name
							if (key) {
								const currentCount = resultMap.get(key) || 0
								resultMap.set(key, currentCount + memModule.count)
							}
						}
					})
				}
			})
		})

		return Array.from(resultMap)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
	}, [data, selectedRamType])

	const prepareGroupedBarData: RamPrepareGroupedBarData[] = useMemo(() => {
		// Get unique mem types
		const memValues = new Set<string>()
		data.forEach(ram => {
			ram.memoryRamType.forEach(memtype => {
				if (selectedRamType === 'All' || memtype.name === selectedRamType) {
					memtype.memoryRamValues.forEach(modulos => {
						if (modulos.count > 0) {
							memValues.add(modulos.name)
						}
					})
				}
			})
		})

		// Create a mapping for each ramType and ramCapacity
		return data.flatMap(ran => {
			return ran.memoryRamType
				.filter(memType => selectedRamType === 'All' || memType.name === selectedRamType)
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
	}, [data, selectedRamType])

	const barHeight = useMemo(() => 30, [])
	const barSpacing = useMemo(() => 100, []) // Spacing between bars and other elements
	const dynamicHeight = useMemo(
		() => `${prepareGroupedBarData.length * (barHeight * 3) + barSpacing}px`,
		// Add extra space for margins and labels,
		[barHeight, barSpacing]
	)

	const availableRamTypes: string[] = useMemo(() => {
		const ramTypes = new Set<string>()
		data.forEach(typeOfSite => {
			typeOfSite.memoryRamType.forEach(memtype => {
				ramTypes.add(memtype.name)
			})
		})
		return Array.from(ramTypes).sort((a, b) => a.localeCompare(b))
	}, [data])

	console.log('data', data)
	console.log('memModuleType', memModuleType)
	console.log('prepareGroupedBarData', prepareGroupedBarData)
	console.log('availableRamTypes', availableRamTypes)

	return {
		barHeight,
		memModuleType,
		prepareGroupedBarData,
		dynamicHeight,
		selectedRamType,
		setSelectedRamType,
		availableRamTypes
	}
}
