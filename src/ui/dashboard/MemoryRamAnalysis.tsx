import { memo, useCallback } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	LabelList
} from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { PieCard } from './PieCard'
import { type MemoryViewSelect, useMemoryRamAnalysis } from './hooks/useMemoryRamAnalysis'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { useMemoryRamTypeAnalysys } from './hooks/useMemoryRamTypeAnalysis'
import { BASIC_COLORS_MAP } from '@/utils/colores'

interface MemoryRamAnalysisProps {
	data: ComputerDashboardDto
}
export const MemoryRamAnalysis = memo(({ data }: MemoryRamAnalysisProps) => {
	const { memoryData, setViewBy, total, viewBy } = useMemoryRamAnalysis({
		data: data.memoryRamCapacity
	})
	const { barHeight, prepareGroupedBarData, memModuleType } = useMemoryRamTypeAnalysys({
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
				title="Memoria Ram"
				desc="Balance de equipos por capacidad total de memoria"
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
				<CardHeader>
					<CardTitle>Distribución de memorias por tipo</CardTitle>
				</CardHeader>
				<CardContent className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={prepareGroupedBarData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis type="category" dataKey="name" style={{ fontSize: '0.6rem' }} />
							<YAxis />
							<Tooltip formatter={(value, name) => [`${value} Memorias`, name]} />
							<Legend />
							{memModuleType.length > 0 &&
								memModuleType.map((type, index) => (
									<Bar
										key={type.name}
										dataKey={type.name}
										name={type.name}
										fill={BASIC_COLORS_MAP[index + 1]}
										barSize={barHeight}
									>
										<LabelList
											dataKey={type.name}
											position="right"
											orientation={45}
											style={{ fontSize: '0.65rem' }}
											content={({ value, x, y, width }) => {
												const labelText = `${type.name}: ${value}`
												if (!value || !x || !y) return null
												return (
													<text
														x={Number(x) + Number(width) + 10}
														y={Number(y) - 5}
														fill="#666"
														fontSize={10}
														textAnchor="middle"
														dominantBaseline="baseline"
														transform={`rotate(-75, ${
															Number(x) + Number(width) / 2
														}, ${Number(y) - 10})`}
													>
														{labelText}
													</text>
												)
											}}
										/>
									</Bar>
								))}
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	)
})

MemoryRamAnalysis.displayName = 'MemoryRamAnalysis'
