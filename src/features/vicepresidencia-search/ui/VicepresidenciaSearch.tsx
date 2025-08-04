import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllVicepresidencias } from '@/entities/employee/vicepresidencia/infra/hook/useGetAllVicepresidencia'

export function VicepresidenciaSearch() {
    return (
        <EntitySearch
            entityName="vicepresidencia"
            useGetAllEntities={useGetAllVicepresidencias}
            urlPrefix="/form/vicepresidencia/edit"
            searchField="name"
            title="Búsqueda por nombre de vicepresidencia"
        />
    )
}