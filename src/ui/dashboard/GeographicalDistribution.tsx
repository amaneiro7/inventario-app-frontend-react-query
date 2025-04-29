/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Cell,
	ResponsiveContainer,
	LabelList
} from 'recharts'
import { MapPin, Filter } from 'lucide-react'
import { useGeographicalDistribution } from './hooks/useGeographicalDistribution'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import Button from '@/components/Button'
import { Input } from '@/components/Input/Input'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface GeographicalDistributionProps {
	data: ComputerDashboardDto['region']
}

const COLORS = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#8884d8',
	'#82ca9d',
	'#ffc658',
	'#8dd1e1',
	'#a4de6c',
	'#d0ed57'
]

export const GeographicalDistribution = ({ data }: GeographicalDistributionProps) => {
	const {
		distributionData,
		hasActiveFilters,
		uniqueAdmRegions,
		uniqueRegions,
		uniqueStates,
		uniqueCities,
		viewBy,
		barName,
		admRegionFilter,
		regionFilter,
		stateFilter,
		cityFilter,
		searchFilter,
		dynamicHeight,
		barHeight,
		setViewBy,
		clearFilters,
		setAdmRegionFilter,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSearchFilter
	} = useGeographicalDistribution({ data })
	return (
		<Card className="col-span-12">
			<CardHeader>
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<CardTitle>Distribución geográfica</CardTitle>
						<CardDescription>
							Distribución de equipos por regiones, estados y ciudades
						</CardDescription>
					</div>
					<Select value={viewBy} onValueChange={value => setViewBy(value as any)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Ver por..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="admRegion">Por zona</SelectItem>
							<SelectItem value="region">Por región</SelectItem>
							<SelectItem value="state">Por estado</SelectItem>
							<SelectItem value="city">Por ciudad</SelectItem>
							<SelectItem value="location">Por ubicación</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex flex-wrap gap-3">
					<div className="flex flex-1 flex-col gap-3 sm:flex-row">
						<div className="relative w-full sm:max-w-[200px]">
							<Input
								id="geo-search"
								transform
								label="Search"
								name="search"
								placeholder="Search..."
								value={searchFilter}
								onChange={e => setSearchFilter(e.target.value)}
								className="pl-8"
								leftIcon={<MapPin className="text-muted-foreground h-4 w-4" />}
							/>
						</div>

						{viewBy !== 'admRegion' && (
							<Select
								value={admRegionFilter || 'all'}
								onValueChange={value => {
									setAdmRegionFilter(value === 'all' ? '' : value)
									setRegionFilter('')
									setStateFilter('')
									setCityFilter('')
								}}
							>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder="Todas las zonas" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todas las zonas</SelectItem>
									{uniqueAdmRegions.map(admRegion => (
										<SelectItem key={admRegion} value={admRegion}>
											{admRegion}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						{(viewBy === 'state' || viewBy === 'city' || viewBy === 'location') && (
							<Select
								value={regionFilter || 'all'}
								onValueChange={value => {
									setRegionFilter(value === 'all' ? '' : value)
									setStateFilter('')
									setCityFilter('')
								}}
							>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder="Todas las regiones" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todas las regiones</SelectItem>
									{uniqueRegions.map(region => (
										<SelectItem key={region} value={region}>
											{region}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}

						{(viewBy === 'city' || viewBy === 'location') && (
							<Select
								value={stateFilter || 'all'}
								onValueChange={value => {
									setStateFilter(value === 'all' ? '' : value)
									setCityFilter('')
								}}
								disabled={!regionFilter || !uniqueStates.length}
							>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder="Todos los estados" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todos los estados</SelectItem>
									{uniqueStates.map(state => (
										<SelectItem key={state} value={state}>
											{state}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}

						{viewBy === 'location' && (
							<Select
								value={cityFilter || 'all'}
								onValueChange={value => setCityFilter(value === 'all' ? '' : value)}
								disabled={!regionFilter || !stateFilter || !uniqueCities.length}
							>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder="Todas las ciudades" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Todas las ciudades</SelectItem>
									{uniqueCities.map(city => (
										<SelectItem key={city} value={city}>
											{city}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					</div>

					{hasActiveFilters && (
						<Button
							size="content"
							buttonSize="small"
							color="blanco"
							text="Limpiar filtros"
							onClick={clearFilters}
							className="text-muted-foreground"
						/>
					)}
				</div>

				<div style={{ height: dynamicHeight ?? '20rem', minHeight: '20rem' }}>
					{distributionData.length > 0 ? (
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								layout="vertical"
								data={distributionData}
								margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis type="number" />
								<YAxis
									dataKey="name"
									type="category"
									axisLine={false}
									width={200}
									scale="auto"
									tick={{ fontSize: '0.65rem' }}
								/>
								<Tooltip
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											const data = payload[0].payload
											return (
												<div className="bg-background rounded-lg border p-2 text-wrap shadow-md">
													<div className="flex items-center gap-2">
														<MapPin className="h-4 w-4" />
														<span className="font-medium">
															{data.name}
														</span>
													</div>
													<div className="mt-1 flex gap-2 text-sm">
														<span className="font-medium">
															{data.value}
														</span>
														<span className="text-muted-foreground">
															equipos
														</span>
													</div>
												</div>
											)
										}
										return null
									}}
								/>
								<Legend />
								<Bar dataKey="value" barSize={barHeight} name={barName}>
									{distributionData.map((_entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
									<LabelList
										dataKey="value"
										position="right"
										style={{ fontSize: '0.65rem' }}
									/>
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					) : (
						<div className="flex h-full items-center justify-center">
							<div className="text-muted-foreground text-center">
								<Filter className="mx-auto mb-2 h-12 w-12 opacity-20" />
								<p>No hay datos para mostrar</p>
								<Button
									text="Limpiar filtros"
									buttonSize="medium"
									size="content"
									color="blanco"
									onClick={clearFilters}
									className="mt-2"
								/>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
