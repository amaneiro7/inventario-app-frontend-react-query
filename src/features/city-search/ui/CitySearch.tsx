import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllCity } from '@/entities/locations/city/infra/hook/useGetAllCity'

export function CitySearch() {
    return (
        <EntitySearch
            entityName="city"
            useGetAllEntities={useGetAllCity}
            urlPrefix="/form/city/edit"
            searchField="name"
            title="Búsqueda ciudad"
        />
    )
}