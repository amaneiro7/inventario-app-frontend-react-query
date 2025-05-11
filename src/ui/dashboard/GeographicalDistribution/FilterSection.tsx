import { memo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import Button from '@/components/Button'
import { Input } from '@/components/Input/Input'
import { MapPin } from 'lucide-react'

interface FilterSectionProps {
	viewBy: 'admRegion' | 'region' | 'state' | 'city' | 'sites' | 'location'
	hasActiveFilters: boolean
	uniqueAdmRegions: string[]
	uniqueRegions: string[]
	uniqueStates: string[]
	uniqueCities: string[]
	uniqueSites: string[]
	admRegionFilter: string
	regionFilter: string
	stateFilter: string
	cityFilter: string
	siteFilter: string
	searchFilter: string
	setAdmRegionFilter: React.Dispatch<React.SetStateAction<string>>
	setRegionFilter: React.Dispatch<React.SetStateAction<string>>
	setStateFilter: React.Dispatch<React.SetStateAction<string>>
	setCityFilter: React.Dispatch<React.SetStateAction<string>>
	setSiteFilter: React.Dispatch<React.SetStateAction<string>>
	setSearchFilter: React.Dispatch<React.SetStateAction<string>>
	clearFilters: () => void
}

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
