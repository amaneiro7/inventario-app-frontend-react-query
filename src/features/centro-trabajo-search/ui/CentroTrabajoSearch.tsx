import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllCentroTrabajo } from '@/entities/employee/centroTrabajo/infra/hook/useGetAllCentroTrabajo'
import { type CentroTrabajoDto } from '@/entities/employee/centroTrabajo/domain/dto/CentroTrabajo.dto'

export function CentroTrabajoSearch() {
    const displayAccessorFunction = (option: CentroTrabajoDto) => {
		return `${option.id} - ${option.name}`
	}
    return (
        <EntitySearch<CentroTrabajoDto>
            entityName="centroTrabajo"
            useGetAllEntities={useGetAllCentroTrabajo}
            urlPrefix="/form/centroTrabajo/edit"
            searchField="name"
            title="Búsqueda nombre de Centro de Trabajo"
            displayAccessor={displayAccessorFunction}
        />
    )
}