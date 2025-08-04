import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllLocations } from '@/entities/locations/locations/infra/hook/useGetAllLocation'

export function LocationSearch() {
    return (
        <EntitySearch
            entityName="location"
            useGetAllEntities={useGetAllLocations}
            urlPrefix="/form/location/edit"
            searchField="name"
            title="Búsqueda por ubicación"
        />
    )
}