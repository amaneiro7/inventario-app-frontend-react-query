import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'
import { useGetAllCity } from '@/entities/locations/city/infra/hook/useGetAllCity'

const CitySearchComponent = createEntitySearch(useGetAllCity)

export function CitySearch() {
	return (
		<CitySearchComponent
			entityName="city"
			urlPrefix="/form/city/edit"
			searchField="name"
			title="Búsqueda ciudad"
		/>
	)
}
