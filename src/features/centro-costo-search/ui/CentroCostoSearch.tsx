import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'
import { useGetAllCentroCosto } from '@/entities/employee/centroCosto/infra/hook/useGetAllCentroCosto'
import { type CentroCostoDto } from '@/entities/employee/centroCosto/domain/dto/CentroCosto.dto'

const CentroCostoSearchComponent = createEntitySearch(useGetAllCentroCosto)

export function CentroCostoSearch() {
	const displayAccessorFunction = (option: CentroCostoDto) => {
		return `${option.id} - ${option.name}`
	}
	return (
		<CentroCostoSearchComponent
			entityName="centroCosto"
			urlPrefix="/form/centrocosto/edit"
			searchField="name"
			title="Búsqueda nombre de Centro de costo"
			displayAccessor={displayAccessorFunction}
		/>
	)
}
