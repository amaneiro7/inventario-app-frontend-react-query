import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllUser } from '@/entities/user/infra/hooks/useGetAlUser'

export function UserServiceSearch() {
	return (
		<EntitySearch
			entityName="user"
			useGetAllEntities={useGetAllUser}
			urlPrefix="/user-management/profile"
			searchField="email"
			title="Búsqueda por usuario"
			displayAccessor="email"
		/>
	)
}
