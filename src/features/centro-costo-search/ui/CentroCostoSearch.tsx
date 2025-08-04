import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllCentroCosto } from '@/entities/employee/centroCosto/infra/hook/useGetAllCentroCosto'
import { type CentroCostoDto } from '@/entities/employee/centroCosto/domain/dto/CentroCosto.dto'

export function CentroCostoSearch() {
    const displayAccessorFunction = (option: CentroCostoDto) => {
		return `${option.id} - ${option.name}`
	}
    return (
        <EntitySearch<CentroCostoDto>
            entityName="centroCosto"
            useGetAllEntities={useGetAllCentroCosto}
            urlPrefix="/form/centrocosto/edit"
            searchField="name"
            title="Búsqueda nombre de Centro de costo"
            displayAccessor={displayAccessorFunction}
        />
    )
}