import { useMemo } from 'react'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseOperatingSystemAnalysisProps {
	data: ComputerDashboardDto['operatingSystem']
}

export interface ArqData {
	name: string
	count: number
}

export type OSPrepareGroupedBarData = Record<string, unknown>

export function useOperatingSystemAnalysis({ data }: UseOperatingSystemAnalysisProps) {
	// Process data by os arquitecture
	const arqData: ArqData[] = useMemo(() => {
		const resultMap = new Map<string, number>()

		data.forEach(operatingSystem => {
			operatingSystem.arq.forEach(arq => {
				const key = arq.name
				if (key) {
					const currentCount = resultMap.get(key) || 0
					resultMap.set(key, currentCount + arq.count)
				}
			})
		})

		return Array.from(resultMap)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
	}, [data])

	const totalOperatingSystem = useMemo(
		() => data.reduce((sum, item) => sum + item.count, 0),
		[data]
	)
	const totalArq = useMemo(() => arqData.reduce((sum, item) => sum + item.count, 0), [arqData])

	const barHeight = useMemo(() => 30, [])
	const prepareGroupedBarData = useMemo(() => {
		// Get unique arquitecture
		const arqOS = new Set<string>()
		data.forEach(operatingSystem => {
			operatingSystem.arq.forEach(arq => {
				arqOS.add(arq.name)
			})
		})

		// Crear un mapping por cada sistema operativo y arquitectura
		return data.map(operatingSystem => {
			const result: Record<string, unknown> = {
				name: operatingSystem.name
			}

			// Add counts for each site type
			Array.from(arqOS).forEach(arqOS => {
				const arq = operatingSystem.arq.find(s => s.name === arqOS)
				result[arqOS] = arq ? arq.count : 0
			})

			return result
		})
	}, [data])

	return {
		arqData,
		totalOperatingSystem,
		totalArq,
		barHeight,
		prepareGroupedBarData
	}
}
