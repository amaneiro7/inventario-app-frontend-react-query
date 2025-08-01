import { memo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import Button from '@/shared/ui/Button'

/**
 * Props for the MainOsFilter component.
 */
interface MainOsFilterProps {
	/** The current view mode for filtering (e.g., 'region', 'state'). */
	viewBy: 'region' | 'admRegion' | 'state' | 'city' | 'site' | 'location'
	/** Indicates if any filters are currently active. */
	hasActiveFilters: boolean
	/** List of unique administrative regions available for filtering. */
	uniqueAdmRegions: string[]
	/** List of unique regions available for filtering. */
	uniqueRegions: string[]
	/** List of unique states available for filtering. */
	uniqueStates: string[]
	/** List of unique cities available for filtering. */
	uniqueCities: string[]
	/** List of unique sites available for filtering. */
	uniqueSites: string[]
	/** The currently selected administrative region filter. */
	admRegionFilter: string
	/** The currently selected region filter. */
	regionFilter: string
	/** The currently selected state filter. */
	stateFilter: string
	/** The currently selected city filter. */
	cityFilter: string
	/** The currently selected site filter. */
	siteFilter: string
	/** Function to set the administrative region filter. */
	setAdmRegionFilter: React.Dispatch<React.SetStateAction<string>>
	/** Function to set the region filter. */
	setRegionFilter: React.Dispatch<React.SetStateAction<string>>
	/** Function to set the state filter. */
	setStateFilter: React.Dispatch<React.SetStateAction<string>>
	/** Function to set the city filter. */
	setCityFilter: React.Dispatch<React.SetStateAction<string>>
	/** Function to set the site filter. */
	setSiteFilter: React.Dispatch<React.SetStateAction<string>>
	/** Function to clear all active filters. */
	clearFilters: () => void
}

/**
 * MainOsFilter Component
 *
 * A memoized React component that provides a set of cascading filters
 * for administrative region, region, state, city, and site.
 * It dynamically displays filter options based on the `viewBy` prop
 * and clears dependent filters when a higher-level filter changes.
 */
export const MainOsFilter = memo(
	({
		viewBy,
		hasActiveFilters,
		uniqueAdmRegions,
		uniqueRegions,
		uniqueStates,
		uniqueCities,
		uniqueSites,
		admRegionFilter,
		stateFilter,
		regionFilter,
		cityFilter,
		siteFilter,
		setAdmRegionFilter,
		setRegionFilter,
		setCityFilter,
		setStateFilter,
		setSiteFilter,
		clearFilters
	}: MainOsFilterProps) => {
		return (
			<div className="mb-4 flex flex-wrap justify-end gap-4">
				<div className="flex flex-1 flex-col gap-3 sm:flex-row">
					{viewBy !== 'admRegion' && (
						<Select
							value={admRegionFilter || 'all'}
							onValueChange={value => {
								setAdmRegionFilter(value === 'all' ? '' : value)
								// Clear dependent filters when administrative region changes
								setRegionFilter('')
								setStateFilter('')
								setCityFilter('')
								setSiteFilter('')
							}}
							aria-label="Filtrar por zona administrativa"
						>
							<SelectTrigger className="w-fit sm:min-w-[180px]">
								<SelectValue placeholder="Todas las zonas administrativas" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todas las zonas administrativas</SelectItem>
								{uniqueAdmRegions.map(adm => (
									<SelectItem key={adm} value={adm}>
										{adm}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}

					{(viewBy === 'state' ||
						viewBy === 'city' ||
						viewBy === 'site' ||
						viewBy === 'location') && (
						<Select
							value={regionFilter || 'all'}
							onValueChange={value => {
								setRegionFilter(value === 'all' ? '' : value)
								// Clear dependent filters when region changes
								setStateFilter('')
								setCityFilter('')
								setSiteFilter('')
							}}
							disabled={!admRegionFilter || !uniqueStates.length}
							aria-label="Filtrar por región"
						>
							<SelectTrigger className="w-fit sm:min-w-[180px]">
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

					{(viewBy === 'site' || viewBy === 'city' || viewBy === 'location') && (
						<Select
							value={stateFilter || 'all'}
							onValueChange={value => {
								setStateFilter(value === 'all' ? '' : value)
								// Clear dependent filters when state changes
								setCityFilter('')
								setSiteFilter('')
							}}
							disabled={!regionFilter || !uniqueStates.length}
							aria-label="Filtrar por estado"
						>
							<SelectTrigger className="w-fit sm:min-w-[180px]">
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

					{(viewBy === 'site' || viewBy === 'location') && (
						<Select
							value={cityFilter || 'all'}
							onValueChange={value => {
								setCityFilter(value === 'all' ? '' : value)
								// Clear dependent filters when city changes
								setSiteFilter('')
							}}
							disabled={!stateFilter || !uniqueCities.length}
							aria-label="Filtrar por ciudad"
						>
							<SelectTrigger className="w-fit sm:min-w-[180px]">
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

					{viewBy === 'location' && (
						<Select
							value={siteFilter || 'all'}
							onValueChange={value => {
								setSiteFilter(value === 'all' ? '' : value)
							}}
							disabled={!cityFilter || !uniqueSites.length}
							aria-label="Filtrar por sitio"
						>
							<SelectTrigger className="w-fit sm:min-w-[180px]">
								<SelectValue placeholder="Todos los sitios" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos los sitios</SelectItem>
								{uniqueSites.map(site => (
									<SelectItem key={site} value={site}>
										{site}
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
		)
	}
)

MainOsFilter.displayName = 'MainOsFilter'
