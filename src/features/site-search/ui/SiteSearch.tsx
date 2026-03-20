import { useGetAllSites } from '@/entities/locations/site/infra/hook/useGetAllSite'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'
import { SiteRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/SiteRenderOption'

const SiteSearchComponent = createEntitySearch(useGetAllSites)

export function SiteSearch() {
	return (
		<SiteSearchComponent
			entityName="site"
			urlPrefix="/form/site/edit"
			searchField="name"
			title="Búsqueda por sitio"
			renderOption={SiteRenderOption}
		/>
	)
}
