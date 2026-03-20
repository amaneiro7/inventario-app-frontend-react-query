import { useGetAllProcessor } from '@/entities/devices/features/processor/infra/hooks/useGetAllProcessors'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const ProcessorSearchComponent = createEntitySearch(useGetAllProcessor)

export function ProcessorSearch() {
	return (
		<ProcessorSearchComponent
			entityName="processor"
			urlPrefix="/form/processor/edit"
			searchField="name"
			title="Búsqueda por Number Model"
		/>
	)
}
