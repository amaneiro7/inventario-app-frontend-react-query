/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { ChartContainer } from '@/components/Chart'
import { MapPin, Filter } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import Button from '@/components/Button'
import { Input } from '@/components/Input/Input'

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
	const [viewBy, setViewBy] = useState<'region' | 'state' | 'city' | 'location'>('region')
	const [regionFilter, setRegionFilter] = useState<string>('')
	const [stateFilter, setStateFilter] = useState<string>('')
	const [cityFilter, setCityFilter] = useState<string>('')
	const [searchFilter, setSearchFilter] = useState<string>('')

	// Get unique regions, states, and cities from data
	const uniqueRegions = useMemo(
		() => [...new Set(data.map(item => item.regionName))].sort(),
		[data]
	)

	const uniqueStates = useMemo(
		() =>
			[
				...new Set(
					data
						.filter(item => !regionFilter || item.regionName === regionFilter)
						.flatMap(item => item.states.map(item => item.stateName))
				)
			].sort(),
		[data, regionFilter]
	)

	const uniqueCities = useMemo(
		() =>
			[
				...new Set(
					data
						.filter(
							item =>
								(!regionFilter || item.regionName === regionFilter) &&
								(!stateFilter ||
									item.states.map(item => item.stateName).includes(stateFilter))
						)
						.flatMap(item =>
							item.states.flatMap(item => item.cities.flatMap(item => item.cityName))
						)
				)
			].sort(),
		[data, regionFilter, stateFilter]
	)

	// Reset lower-level filters when higher-level filters change
	useEffect(() => {
		if (regionFilter === '') {
			setStateFilter('')
			setCityFilter('')
		}
	}, [regionFilter])

	useEffect(() => {
		if (stateFilter === '') {
			setCityFilter('')
		}
	}, [stateFilter])

	const getDistributionData = () => {
		// Apply filters
		const filteredData = data.filter(region => {
			// Filtrar por región
			if (regionFilter && region.regionName !== regionFilter) {
				return false
			}

			// Filtrar por estado
			region.states = region.states.filter(state => {
				if (stateFilter && state.stateName !== stateFilter) {
					return false
				}

				// Filtrar por ciudad
				if (cityFilter) {
					state.cities = state.cities.filter(city => city.cityName === cityFilter)
					return state.cities.length > 0 // Retener solo los estados con ciudades que coincidan
				}

				return true // Estado coincide
			})

			return region.states.length > 0 // Retener solo las regiones con estados que coincidan
		})
		// Group data by the selected view
		const locationMap = new Map<string, number>()

		filteredData.forEach(item => {
			if (viewBy === 'region') {
				locationMap.set(item.regionName, item.count)
			}
			if (viewBy === 'state') {
				item.states.forEach(state => {
					locationMap.set(state.stateName, state.count)
				})
			}
			if (viewBy === 'city') {
				item.states.forEach(state => {
					state.cities.forEach(city => {
						locationMap.set(city.cityName, city.count)
					})
				})
			}
			if (viewBy === 'location') {
				item.states.forEach(state => {
					state.cities.forEach(city => {
						city.sites.forEach(site => {
							site.names.forEach(name => {
								locationMap.set(name.name, name.count)
							})
						})
					})
				})
			}
		})

		return Array.from(locationMap)
			.map(([name, value]) => ({
				name,
				value
			}))
			.sort((a, b) => b.value - a.value)
	}

	const distributionData = getDistributionData()

	const config = {
		data: { label: 'Equipment' }
	}

	// Clear filters
	const clearFilters = () => {
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
		setSearchFilter('')
	}

	// Determine if filters are active
	const hasActiveFilters =
		regionFilter !== null || stateFilter !== null || cityFilter !== null || searchFilter !== ''

	return (
		<Card className="col-span-12">
			<CardHeader>
				<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
					<div>
						<CardTitle>Geographical Distribution</CardTitle>
						<CardDescription>
							Distribution of equipment across Venezuela
						</CardDescription>
					</div>
					<Select value={viewBy} onValueChange={value => setViewBy(value as any)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="View by..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="region">By Region</SelectItem>
							<SelectItem value="state">By State</SelectItem>
							<SelectItem value="city">By City</SelectItem>
							<SelectItem value="location">By Location</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-3 mb-4">
					<div className="flex-1 flex flex-col sm:flex-row gap-3">
						<div className="relative w-full sm:max-w-[200px]">
							<Input
								transform
								label="Search"
								name="search"
								placeholder="Search..."
								value={searchFilter}
								onChange={e => setSearchFilter(e.target.value)}
								className="pl-8"
							/>
							<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
								<MapPin className="h-4 w-4 text-muted-foreground" />
							</div>
						</div>

						{viewBy !== 'region' && (
							<Select
								value={regionFilter || 'all'}
								onValueChange={value =>
									setRegionFilter(value === 'all' ? null : value)
								}
							>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder="All Regions" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Regions</SelectItem>
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
								onValueChange={value =>
									setStateFilter(value === 'all' ? null : value)
								}
								disabled={!uniqueStates.length}
							>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder="All States" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All States</SelectItem>
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
								onValueChange={value =>
									setCityFilter(value === 'all' ? null : value)
								}
								disabled={!uniqueCities.length}
							>
								<SelectTrigger className="w-full sm:w-[180px]">
									<SelectValue placeholder="All Cities" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Cities</SelectItem>
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
							text="Clear Filters"
							onClick={clearFilters}
							className="text-muted-foreground"
						/>
					)}
				</div>

				<div className="h-96">
					{distributionData.length > 0 ? (
						<ChartContainer config={config}>
							<BarChart
								layout="vertical"
								data={distributionData}
								margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis type="number" />
								<YAxis
									dataKey="name"
									type="category"
									width={120}
									tickFormatter={value =>
										value.length > 15 ? `${value.substring(0, 15)}...` : value
									}
								/>
								<Tooltip
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											const data = payload[0].payload
											return (
												<div className="rounded-lg border bg-background p-2 shadow-md">
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
															units
														</span>
													</div>
												</div>
											)
										}
										return null
									}}
								/>
								<Legend />
								<Bar
									dataKey="value"
									barSize={30}
									name={`Equipment by ${
										viewBy.charAt(0).toUpperCase() + viewBy.slice(1)
									}`}
								>
									{distributionData.map((_entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Bar>
							</BarChart>
						</ChartContainer>
					) : (
						<div className="h-full flex items-center justify-center">
							<div className="text-center text-muted-foreground">
								<Filter className="mx-auto h-12 w-12 mb-2 opacity-20" />
								<p>No data matches the current filters</p>
								<Button
									text="Clear filters"
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

// Función para filtrar con múltiples criterios
function filterData({
	data,
	regionFilter,
	stateFilter,
	cityFilter
}: {
	data: ComputerDashboardDto['region']
	regionFilter?: string
	stateFilter?: string
	cityFilter?: string
}) {
	return data.filter(region => {
		// Filtrar por región
		if (regionFilter && region.regionName !== regionFilter) {
			return false
		}

		// Filtrar por estado
		region.states = region.states.filter(state => {
			if (stateFilter && state.stateName !== stateFilter) {
				return false
			}

			// Filtrar por ciudad
			if (cityFilter) {
				state.cities = state.cities.filter(city => city.cityName === cityFilter)
				return state.cities.length > 0 // Retener solo los estados con ciudades que coincidan
			}

			return true // Estado coincide
		})

		return region.states.length > 0 // Retener solo las regiones con estados que coincidan
	})
}
