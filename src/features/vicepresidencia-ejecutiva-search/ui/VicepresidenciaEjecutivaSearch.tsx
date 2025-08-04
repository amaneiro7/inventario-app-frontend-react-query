import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllVicepresidenciaEjecutivas } from '@/entities/employee/vicepresidenciaEjecutiva/infra/hook/useGetAllVicepresidenciaEjecutiva'

export function VicepresidenciaEjecutivaSearch() {
    return (
        <EntitySearch
            entityName="vicepresidenciaEjecutiva"
            useGetAllEntities={useGetAllVicepresidenciaEjecutivas}
            urlPrefix="/form/vicepresidenciaEjecutiva/edit"
            searchField="name"
            title="Búsqueda por nombre de vicepresidencia"
        />
    )
}