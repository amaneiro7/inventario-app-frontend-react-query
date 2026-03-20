import { useGetAllLocations } from '@/entities/locations/locations/infra/hook/useGetAllLocation'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const LocationSearchComponent = createEntitySearch(useGetAllLocations)

export function LocationSearch() {
	return (
		<LocationSearchComponent
			entityName="location"
			urlPrefix="/form/location/edit"
			searchField="name"
			title="Búsqueda por ubicación"
		/>
	)
}
