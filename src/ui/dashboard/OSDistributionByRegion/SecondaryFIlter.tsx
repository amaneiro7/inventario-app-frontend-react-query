import { memo } from 'react'
import { MapPin } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Input } from '@/components/Input/Input'

interface SecondaryFIlterProps {
	sortOrder: 'name' | 'count'
	setViewBy: React.Dispatch<
		React.SetStateAction<'region' | 'admRegion' | 'state' | 'city' | 'site' | 'location'>
	>
	viewBy: 'region' | 'admRegion' | 'state' | 'city' | 'site' | 'location'
	setSortOrder: React.Dispatch<React.SetStateAction<'name' | 'count'>>
	setTypeOfSiteFilter: React.Dispatch<React.SetStateAction<string>>
	typeOfSiteFilter: string
	uniqueTypeOfSite: string[]
	searchFilter: string
	setSearchFilter: React.Dispatch<React.SetStateAction<string>>
}

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
						aria-label="Buscar por ubicación" // Mejora la accesibilidad del input
					/>
				</div>
				<Select
					value={typeOfSiteFilter}
					onValueChange={value => setTypeOfSiteFilter(value)}
					aria-label="Filtrar por tipo de sitio" // Texto más claro para la accesibilidad
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
				<Select
					value={sortOrder}
					onValueChange={value => setSortOrder(value as any)}
					aria-label="Ordenar los resultados por" // Mejora la accesibilidad
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
				<Select
					value={viewBy}
					onValueChange={value =>
						setViewBy(
							value as 'region' | 'admRegion' | 'state' | 'city' | 'site' | 'location'
						)
					}
					aria-label="Ver la distribución por" // Mejora la accesibilidad
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
