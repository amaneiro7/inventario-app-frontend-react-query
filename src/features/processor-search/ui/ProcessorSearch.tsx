import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllProcessor } from '@/entities/devices/features/processor/infra/hooks/useGetAllProcessors'

export function ProcessorSearch() {
	return (
		<EntitySearch
			entityName="processor"
			useGetAllEntities={useGetAllProcessor}
			urlPrefix="/form/processor/edit"
			searchField="name"
			title="Búsqueda por Number Model"
		/>
	)
}
