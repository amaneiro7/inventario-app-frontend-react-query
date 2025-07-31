import { memo } from 'react'
import { MapPin } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Input } from '@/components/Input/Input'

/**
 * Props for the SecondaryFIlter component.
 */
interface SecondaryFIlterProps {
	/** The current sort order for the data (e.g., 'name' or 'count'). */
	sortOrder: 'name' | 'count'
	/** Function to set the view mode for the distribution (e.g., by 'region', 'state'). */
	setViewBy: React.Dispatch<
		React.SetStateAction<'region' | 'admRegion' | 'state' | 'city' | 'site' | 'location'>
	>
	/** The current view mode for the distribution. */
	viewBy: 'region' | 'admRegion' | 'state' | 'city' | 'site' | 'location'
	/** Function to set the sort order. */
	setSortOrder: React.Dispatch<React.SetStateAction<'name' | 'count'>>
	/** Function to set the type of site filter. */
	setTypeOfSiteFilter: React.Dispatch<React.SetStateAction<string>>
	/** The currently selected type of site filter. */
	typeOfSiteFilter: string
	/** List of unique site types available for filtering. */
	uniqueTypeOfSite: string[]
	/** The current search filter string. */
	searchFilter: string
	/** Function to set the search filter. */
	setSearchFilter: React.Dispatch<React.SetStateAction<string>>
}

/**
 * SecondaryFIlter Component
 *
 * A memoized React component that provides secondary filtering and sorting options
 * for the OS distribution data. It includes a search input, type of site filter,
 * sort order selection, and view mode selection.
 */
export const SecondaryFIlter = memo(
	({
		sortOrder,
		setSortOrder,
		viewBy,
		setViewBy,
		setTypeOfSiteFilter,
		typeOfSiteFilter,
		uniqueTypeOfSite,
		searchFilter,
		setSearchFilter
	}: SecondaryFIlterProps) => {
		return (
			<div className="flex flex-wrap gap-4">
				{/* Search input for location */}
				<div className="relative w-full sm:max-w-[200px]">
					<Input
						id="location-search"
						transform
						label="Buscar"
						name="search"
						placeholder="Buscar..."
						value={searchFilter}
						onChange={e => setSearchFilter(e.target.value)}
						className="pl-8"
						leftIcon={<MapPin className="text-muted-foreground h-4 w-4" />}
						aria-label="Buscar por ubicación"
					/>
				</div>
				{/* Filter by type of site */}
				<Select
					value={typeOfSiteFilter}
					onValueChange={value => setTypeOfSiteFilter(value)}
					aria-label="Filtrar por tipo de sitio"
				>
					<SelectTrigger className="w-fit min-w-[180px]">
						<SelectValue placeholder="FIltrar por tipo de sitio" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Todos los tipos</SelectItem>
						{uniqueTypeOfSite.map(typeOfSite => (
							<SelectItem key={typeOfSite} value={typeOfSite}>
								{typeOfSite}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{/* Sort order selection */}
				<Select
					value={sortOrder}
					onValueChange={value => setSortOrder(value as any)}
					aria-label="Ordenar los resultados por"
				>
					<SelectTrigger className="w-fit min-w-[180px]">
						<SelectValue
							placeholder={
								sortOrder === 'name' ? 'Ordenar por nombre' : 'Ordenar por cantidad'
							}
						/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">Por nombre</SelectItem>
						<SelectItem value="count">Por cantidad</SelectItem>
					</SelectContent>
				</Select>
				{/* View by selection */}
				<Select
					value={viewBy}
					onValueChange={value =>
						setViewBy(
							value as 'region' | 'admRegion' | 'state' | 'city' | 'site' | 'location'
						)
					}
					aria-label="Ver la distribución por"
				>
					<SelectTrigger className="w-fit min-w-[180px]">
						<SelectValue placeholder="Ver distribución por..." />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="admRegion">Por zona administrativa</SelectItem>
						<SelectItem value="region">Por región</SelectItem>
						<SelectItem value="state">Por estado</SelectItem>
						<SelectItem value="city">Por ciudad</SelectItem>
						<SelectItem value="site">Por sitio</SelectItem>
						<SelectItem value="location">Por ubicación</SelectItem>
					</SelectContent>
				</Select>
			</div>
		)
	}
)

SecondaryFIlter.displayName = 'SecondaryFIlter'
