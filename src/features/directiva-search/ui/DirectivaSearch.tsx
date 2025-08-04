import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllDirectiva } from '@/entities/employee/directiva/infra/hook/useGetAllDirectiva'

export function DirectivaSearch() {
    return (
        <EntitySearch
            entityName="directiva"
            useGetAllEntities={useGetAllDirectiva}
            urlPrefix="/form/directiva/edit"
            searchField="name"
            title="Búsqueda por nombre"
        />
    )
}