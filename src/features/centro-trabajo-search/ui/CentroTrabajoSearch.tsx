import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'
import { useGetAllCentroTrabajo } from '@/entities/employee/centroTrabajo/infra/hook/useGetAllCentroTrabajo'
import { type CentroTrabajoDto } from '@/entities/employee/centroTrabajo/domain/dto/CentroTrabajo.dto'

const CentroTrabajoSearchComponent = createEntitySearch(useGetAllCentroTrabajo)

export function CentroTrabajoSearch() {
	const displayAccessorFunction = (option: CentroTrabajoDto) => {
		return `${option.id} - ${option.name}`
	}
	return (
		<CentroTrabajoSearchComponent
			entityName="centroTrabajo"
			urlPrefix="/form/centroTrabajo/edit"
			searchField="name"
			title="Búsqueda nombre de Centro de Trabajo"
			displayAccessor={displayAccessorFunction}
		/>
	)
}
