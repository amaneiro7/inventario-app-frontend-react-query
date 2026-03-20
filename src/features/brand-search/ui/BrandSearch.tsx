import { useGetAllBrands } from '@/entities/brand/infra/hooks/useGetAllBrand'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const BrandSearchComponent = createEntitySearch(useGetAllBrands)

export function BrandSearch() {
	return (
		<BrandSearchComponent
			entityName="brand"
			urlPrefix="/form/brand/edit"
			searchField="name"
			title="Búsqueda nombre de marca"
		/>
	)
}
