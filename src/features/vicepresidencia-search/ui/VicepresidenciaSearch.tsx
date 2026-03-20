import { useGetAllVicepresidencias } from '@/entities/employee/vicepresidencia/infra/hook/useGetAllVicepresidencia'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const VicepresidenciaSearchComponent = createEntitySearch(useGetAllVicepresidencias)

export function VicepresidenciaSearch() {
	return (
		<VicepresidenciaSearchComponent
			entityName="vicepresidencia"
			urlPrefix="/form/vicepresidencia/edit"
			searchField="name"
			title="Búsqueda por nombre de vicepresidencia"
		/>
	)
}
