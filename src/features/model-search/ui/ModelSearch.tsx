import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllModel } from '@/entities/model/models/infra/hook/useGetAllModel'

export function ModelSearch() {
    return (
        <EntitySearch
            entityName="model"
            useGetAllEntities={useGetAllModel}
            urlPrefix="/form/model/edit"
            searchField="name"
            title="Búsqueda por nombre de modelo"
        />
    )
}