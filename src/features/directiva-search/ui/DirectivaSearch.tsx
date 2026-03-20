import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'
import { useGetAllDirectiva } from '@/entities/employee/directiva/infra/hook/useGetAllDirectiva'

const DirectivaSearchComponent = createEntitySearch(useGetAllDirectiva)

export function DirectivaSearch() {
	return (
		<DirectivaSearchComponent
			entityName="directiva"
			urlPrefix="/form/directiva/edit"
			searchField="name"
			title="Búsqueda por nombre"
		/>
	)
}
