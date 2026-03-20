import { useGetAllCargo } from '@/entities/employee/cargo/infra/hook/useGetAllCargo'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const CargoSearchComponent = createEntitySearch(useGetAllCargo)

export function CargoSearch() {
	return (
		<CargoSearchComponent
			entityName="cargo"
			urlPrefix="/form/cargo/edit"
			searchField="name"
			title="Búsqueda por Cargo"
		/>
	)
}
