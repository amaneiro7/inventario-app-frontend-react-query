import { useGetAllUnidad } from '@/entities/employee/unidad/infra/hook/useGetAllUnidad'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const UnidadSearchComponent = createEntitySearch(useGetAllUnidad)

export function UnidadSearch() {
	return (
		<UnidadSearchComponent
			entityName="unidad"
			urlPrefix="/form/unidad/edit"
			searchField="name"
			title="Buscar Unidad Organizativa por nombre"
		/>
	)
}
