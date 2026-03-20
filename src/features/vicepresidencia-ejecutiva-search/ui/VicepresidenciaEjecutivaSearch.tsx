import { useGetAllVicepresidenciaEjecutivas } from '@/entities/employee/vicepresidenciaEjecutiva/infra/hook/useGetAllVicepresidenciaEjecutiva'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const VicepresidenciaEjecutivaSearchComponent = createEntitySearch(
	useGetAllVicepresidenciaEjecutivas
)
export function VicepresidenciaEjecutivaSearch() {
	return (
		<VicepresidenciaEjecutivaSearchComponent
			entityName="vicepresidenciaEjecutiva"
			urlPrefix="/form/vicepresidenciaEjecutiva/edit"
			searchField="name"
			title="Búsqueda por nombre de vicepresidencia"
		/>
	)
}
