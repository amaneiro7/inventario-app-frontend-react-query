import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseMemoryRamTypeAnalysisProps {
	data: ComputerDashboardDto['modulosMemoryRam']
}

export type RamPrepareGroupedBarData = Record<string, unknown>
export function useMemoryRamTypeAnalysys({ data }: UseMemoryRamTypeAnalysisProps) {
	const [selectedRamType, setSelectedRamType] = useState<string>('All')
	const [selectedTypeOfSite, setSelectedTypeOfSite] = useState<string>('All')

	const filteredData = useMemo(() => {
		return data.filter(
			typeOfSite => selectedTypeOfSite === 'All' || typeOfSite.name === selectedTypeOfSite
		)
	}, [data, selectedTypeOfSite])

	// Nombres unicos para los tipos de sitio
	const availableTypeOfSite: string[] = useMemo(() => {
		const typeOfSites = new Set<string>()
		data.forEach(typeOfSite => {
			typeOfSites.add(typeOfSite.name)
		})
		return Array.from(typeOfSites).sort((a, b) => a.localeCompare(b))
	}, [data])

	// Nombres unicos para los tipos de memoria
	const availableRamTypes: string[] = useMemo(() => {
		const ramTypes = new Set<string>()
		filteredData.forEach(typeOfSite => {
			typeOfSite.memoryRamType.forEach(memtype => {
				ramTypes.add(memtype.name)
			})
		})
		return Array.from(ramTypes).sort((a, b) => a.localeCompare(b))
	}, [data, filteredData])

	// Nombres unicos para las capacidades de memoria
	const availableMemValues: string[] = useMemo(() => {
		return [
			...new Set(
				filteredData.flatMap(typeOfSite =>
					typeOfSite.memoryRamType
						.filter(
							ramType => selectedRamType === 'All' || ramType.name === selectedRamType
						)
						.flatMap(ramType => ramType.memoryRamValues.map(ramValue => ramValue.name))
				)
			)
		]
	}, [filteredData, selectedRamType])

	const prepareGroupedBarData: RamPrepareGroupedBarData[] = useMemo(() => {
		const groupedData: Record<string, Record<string, any>> = {}

		filteredData.forEach(typeOfSite => {
			typeOfSite.memoryRamType.forEach(ramType => {
				if (selectedRamType === 'All' || ramType.name === selectedRamType) {
					const ramTypeName = ramType.name
					if (!groupedData[ramTypeName]) {
						groupedData[ramTypeName] = { name: ramTypeName }
					}
					ramType.memoryRamValues.forEach(ramValue => {
						groupedData[ramTypeName][ramValue.name] =
							(groupedData[ramTypeName][ramValue.name] || 0) + ramValue.count
					})
				}
			})
		})

		return Object.values(groupedData)
	}, [filteredData, selectedRamType])

	const barHeight = useMemo(() => 30, [])
	const barSpacing = useMemo(() => 100, []) // Spacing between bars and other elements
	const dynamicHeight = useMemo(
		() => `${prepareGroupedBarData.length * (barHeight * 3) + barSpacing}px`,
		// Add extra space for margins and labels,
		[barHeight, barSpacing]
	)

	return {
		barHeight,
		availableMemValues,
		prepareGroupedBarData,
		dynamicHeight,
		// select ram
		selectedRamType,
		setSelectedRamType,
		availableRamTypes,
		// select typeOfSIte
		availableTypeOfSite,
		selectedTypeOfSite,
		setSelectedTypeOfSite
	}
}
