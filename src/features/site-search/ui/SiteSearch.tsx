import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllSites } from '@/entities/locations/site/infra/hook/useGetAllSite'
import { SiteRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/SiteRenderOption'

export function SiteSearch() {
    return (
        <EntitySearch
            entityName="site"
            useGetAllEntities={useGetAllSites}
            urlPrefix="/form/site/edit"
            searchField="name"
            title="Búsqueda por sitio"
            renderOption={SiteRenderOption}
        />
    )
}