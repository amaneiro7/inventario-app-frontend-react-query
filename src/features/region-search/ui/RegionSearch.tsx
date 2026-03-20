import { useGetAllRegion } from '@/entities/locations/region/infra/hook/useGetAllRegion'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const RegionSearchComponent = createEntitySearch(useGetAllRegion)

export function RegionSearch() {
	return (
		<RegionSearchComponent
			entityName="region"
			urlPrefix="/form/region/edit"
			searchField="name"
			title="Buscar región por nombre"
		/>
	)
}
