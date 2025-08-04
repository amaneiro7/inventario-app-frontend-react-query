import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllCargo } from '@/entities/employee/cargo/infra/hook/useGetAllCargo'

export function CargoSearch() {
    return (
        <EntitySearch
            entityName="cargo"
            useGetAllEntities={useGetAllCargo}
            urlPrefix="/form/cargo/edit"
            searchField="name"
            title="Búsqueda por Cargo"
        />
    )
}