import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllDepartamento } from '@/entities/employee/departamento/infra/hook/useGetAllDepartamento'

export function DepartamentoSearch() {
    return (
        <EntitySearch
            entityName="departamento"
            useGetAllEntities={useGetAllDepartamento}
            urlPrefix="/form/departamento/edit"
            searchField="name"
            title="Búsqueda por departamento"
        />
    )
}