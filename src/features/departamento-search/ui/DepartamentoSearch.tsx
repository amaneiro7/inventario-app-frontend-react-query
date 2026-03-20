import { useGetAllDepartamento } from '@/entities/employee/departamento/infra/hook/useGetAllDepartamento'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const DepartamentoSearchComponent = createEntitySearch(useGetAllDepartamento)

export function DepartamentoSearch() {
	return (
		<DepartamentoSearchComponent
			entityName="departamento"
			urlPrefix="/form/departamento/edit"
			searchField="name"
			title="Búsqueda por departamento"
		/>
	)
}
