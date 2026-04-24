import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'
import { useGetAllISPLink } from '@/entities/locations/ispLinks/infra/hook/useGetAllISPLink'

const ISPLinkSearchComponent = createEntitySearch(useGetAllISPLink)

export function ISPLinkSearch() {
	return (
		<ISPLinkSearchComponent
			entityName="ispLink"
			urlPrefix="/form/isplink/edit"
			searchField="name"
			title="Búsqueda por nombre proveedor de servicio ISP"
		/>
	)
}
