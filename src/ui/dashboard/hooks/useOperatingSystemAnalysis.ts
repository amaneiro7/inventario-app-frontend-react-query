import { useMemo } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseOperatingSystemAnalysisProps {
	data: ComputerDashboardDto['operatingSystem']
}
export function useOperatingSystemAnalysys({ data }: UseOperatingSystemAnalysisProps) {
	// Process data by drive type
	const arqData = useMemo(() => {
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

	console.log('prepareGroupedBarData', prepareGroupedBarData)

	return {
		arqData,
		totalOperatingSystem,
		totalArq,
		barHeight,
		prepareGroupedBarData
	}
}
