import { useGetAllPermissionGroups } from '@/entities/accessControl/permissionGroup/infra/hooks/useGetAllPermissionGroup'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const PermissionGroupSearchComponent = createEntitySearch(useGetAllPermissionGroups)

export function PermissionGroupSearch() {
	return (
		<PermissionGroupSearchComponent
			entityName="permissionGroup"
			urlPrefix="/form/permission-groups/edit"
			searchField="name"
			title="Búsqueda de grupos de permisos"
		/>
	)
}
