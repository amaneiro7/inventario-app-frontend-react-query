import { lazy, memo, Suspense, useCallback } from 'react'
import { useMemoryRamTypeAnalysys } from '../hooks/useMemoryRamTypeAnalysis'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { PieCard } from '../PieCard'
import { type MemoryViewSelect, useMemoryRamAnalysis } from '../hooks/useMemoryRamAnalysis'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { RamTypeSelect } from './RamTypeSelect'

interface MemoryRamAnalysisProps {
	data: ComputerDashboardDto
}

const MemoryRamChart = lazy(() =>
	import('./MemoryRamChart').then(m => ({ default: m.MemoryRamChart }))
)
export const MemoryRamAnalysis = memo(({ data }: MemoryRamAnalysisProps) => {
	const { memoryData, setViewBy, total, viewBy } = useMemoryRamAnalysis({
		data: data.memoryRamCapacity
	})
	const {
		barHeight,
		prepareGroupedBarData,
		memModuleType,
		dynamicHeight,
		availableRamTypes,
		selectedRamType,
		setSelectedRamType
	} = useMemoryRamTypeAnalysys({
		data: data.modulosMemoryRam
	})
	const handleViewByChange = useCallback(
		(value: MemoryViewSelect) => {
			setViewBy(value)
		},
		[setViewBy]
	)
	return (
		<div>
			<PieCard
				data={memoryData}
				total={total}
				dataKey="count"
				title="Análisis de Capacidad de Memoria RAM"
				desc="Distribución de equipos por capacidad total de memoria RAM."
				selectSection={
					<Select value={viewBy} onValueChange={handleViewByChange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Ver por..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="inUse">En uso</SelectItem>
							<SelectItem value="administrative">Torre</SelectItem>
							<SelectItem value="agency">Agencia</SelectItem>
							<SelectItem value="almacen">En almacén</SelectItem>
						</SelectContent>
					</Select>
				}
			/>
			<Card className="col-span-2">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Distribución de Módulos de Memoria RAM por Tipo</CardTitle>
						<CardDescription>
							Cantidad de módulos de memoria RAM según su tipo.
						</CardDescription>
					</div>
					<RamTypeSelect
						availableRamTypes={availableRamTypes}
						selectedRamType={selectedRamType}
						setSelectedRamType={setSelectedRamType}
					/>
				</CardHeader>
				<CardContent style={{ height: dynamicHeight ?? '20rem', minHeight: '20rem' }}>
					<Suspense
						fallback={
							<div className="h-80 min-h-80 w-full animate-pulse bg-gray-200" />
						}
					>
						<MemoryRamChart
							barHeight={barHeight}
							prepareGroupedBarData={prepareGroupedBarData}
							memModuleType={memModuleType}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</div>
	)
})

MemoryRamAnalysis.displayName = 'MemoryRamAnalysis'
