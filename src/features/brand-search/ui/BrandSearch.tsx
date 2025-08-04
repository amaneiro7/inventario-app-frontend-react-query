import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllBrands } from '@/entities/brand/infra/hooks/useGetAllBrand'

export function BrandSearch() {
    return (
        <EntitySearch
            entityName="brand"
            useGetAllEntities={useGetAllBrands}
            urlPrefix="/form/brand/edit"
            searchField="name"
            title="Búsqueda nombre de marca"
        />
    )
}