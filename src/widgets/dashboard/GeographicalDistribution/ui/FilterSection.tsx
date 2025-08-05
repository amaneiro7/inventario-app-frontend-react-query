import { memo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import Button from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input/Input'
import { MapPin } from 'lucide-react'

interface FilterSectionProps {
	/**
	 * The current level of geographical aggregation being viewed.
	 */
	viewBy: 'admRegion' | 'region' | 'state' | 'city' | 'sites' | 'location'
	/**
	 * Indicates whether any filters are currently active.
	 */
	hasActiveFilters: boolean
	/**
	 * List of unique administrative regions available for filtering.
	 */
	uniqueAdmRegions: string[]
	/**
	 * List of unique regions available for filtering.
	 */
	uniqueRegions: string[]
	/**
	 * List of unique states available for filtering.
	 */
	uniqueStates: string[]
	/**
	 * List of unique cities available for filtering.
	 */
	uniqueCities: string[]
	/**
	 * List of unique sites available for filtering.
	 */
	uniqueSites: string[]
	/**
	 * The currently selected administrative region filter value.
	 */
	admRegionFilter: string
	/**
	 * The currently selected region filter value.
	 */
	regionFilter: string
	/**
	 * The currently selected state filter value.
	 */
	stateFilter: string
	/**
	 * The currently selected city filter value.
	 */
	cityFilter: string
	/**
	 * The currently selected site filter value.
	 */
	siteFilter: string
	/**
	 * The current search filter string.
	 */
	searchFilter: string
	/**
	 * Setter function for the administrative region filter.
	 */
	setAdmRegionFilter: React.Dispatch<React.SetStateAction<string>>
	/**
	 * Setter function for the region filter.
	 */
	setRegionFilter: React.Dispatch<React.SetStateAction<string>>
	/**
	 * Setter function for the state filter.
	 */
	setStateFilter: React.Dispatch<React.SetStateAction<string>>
	/**
	 * Setter function for the city filter.
	 */
	setCityFilter: React.Dispatch<React.SetStateAction<string>>
	/**
	 * Setter function for the site filter.
	 */
	setSiteFilter: React.Dispatch<React.SetStateAction<string>>
	/**
	 * Setter function for the search filter.
	 */
	setSearchFilter: React.Dispatch<React.SetStateAction<string>>
	/**
	 * Callback function to clear all filters.
	 */
	clearFilters: () => void
}

/**
 * `FilterSection` is a memoized functional component that provides a set of filters
 * for geographical distribution data. It includes a search input and cascading select dropdowns
 * for administrative region, region, state, city, and site, along with a button to clear all filters.
 */
export const FilterSection = memo(
	({
		viewBy,
		hasActiveFilters,
		uniqueAdmRegions,
		uniqueRegions,
		uniqueStates,
		uniqueCities,
		uniqueSites,
		admRegionFilter,
		regionFilter,
		stateFilter,
		cityFilter,
		siteFilter,
		searchFilter,
		setAdmRegionFilter,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSiteFilter,
		setSearchFilter,
		clearFilters
	}: FilterSectionProps) => {
		return (
			<div className="mb-4 flex flex-wrap gap-3">
				<div className="flex flex-1 flex-col flex-wrap gap-3 sm:flex-row">
					<div className="relative w-full sm:max-w-[200px]">
						<Input
							id="geo-search"
							transform
							label="Búsqueda"
							name="search"
							placeholder="Buscar..."
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
					{(viewBy === 'state' ||
						viewBy === 'city' ||
						viewBy === 'sites' ||
						viewBy === 'location') && (
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

					{(viewBy === 'city' || viewBy === 'sites' || viewBy === 'location') && (
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

					{(viewBy === 'location' || viewBy === 'sites') && (
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

					{viewBy === 'location' && (
						<Select
							value={siteFilter || 'all'}
							onValueChange={value => setSiteFilter(value === 'all' ? '' : value)}
							disabled={
								!regionFilter || !stateFilter || !cityFilter || !uniqueSites.length
							}
						>
							<SelectTrigger className="w-full sm:w-[180px]">
								<SelectValue placeholder="Todas los sitios" />
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