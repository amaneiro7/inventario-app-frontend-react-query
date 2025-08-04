import {
	ComputerDashboardDto,
	MemoryRamTotal
} from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { useMemo, useState } from 'react'

interface UseMemoryRamAnalysisProps {
	data: ComputerDashboardDto['memoryRamCapacity']
}

export type MemoryViewSelect = 'all' | 'inUse' | 'agency' | 'administrative' | 'almacen'

export function useMemoryRamAnalysis({ data }: UseMemoryRamAnalysisProps) {
	const [viewBy, setViewBy] = useState<MemoryViewSelect>('all')
	const memoryData = useMemo(() => {
		const memoryMap = new Map<string, { name: string; count: number }>()
		const processMemory = (memoryList: MemoryRamTotal[]) => {
			memoryList.forEach(memory => {
				const existing = memoryMap.get(memory.name)
				if (existing) {
					existing.count += memory.count
				} else {
					memoryMap.set(memory.name, { ...memory })
				}
			})
		}
		data.forEach(typeOfSite => {
			switch (viewBy) {
				case 'all':
					processMemory(typeOfSite.memoryRamTotal)
					break
				case 'inUse':
					if (typeOfSite.name !== 'Almacén') {
						processMemory(typeOfSite.memoryRamTotal)
					}
					break
				case 'administrative':
					if (typeOfSite.name === 'Sede Administrativa') {
						processMemory(typeOfSite.memoryRamTotal)
					}
					break
				case 'agency':
					if (typeOfSite.name === 'Agencia') {
						processMemory(typeOfSite.memoryRamTotal)
					}
					break
				case 'almacen':
					if (typeOfSite.name === 'Almacén') {
						processMemory(typeOfSite.memoryRamTotal)
					}
					break
				default:
					break
			}
		})
		return Array.from(memoryMap.values()).sort((a, b) => b?.name.localeCompare(a?.name))
	}, [data, viewBy])

	const total = useMemo(() => memoryData.reduce((sum, item) => sum + item.count, 0), [memoryData])
	return {
		memoryData,
		total,
		viewBy,
		setViewBy
	}
}
