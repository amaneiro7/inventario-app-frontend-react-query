import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllRegion } from '@/entities/locations/region/infra/hook/useGetAllRegion'

export function RegionSearch() {
    return (
        <EntitySearch
            entityName="region"
            useGetAllEntities={useGetAllRegion}
            urlPrefix="/form/region/edit"
            searchField="name"
            title="Buscar región por nombre"
        />
    )
}