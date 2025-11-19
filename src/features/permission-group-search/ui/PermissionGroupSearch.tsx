import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllPermissionGroups } from '@/entities/accessControl/permissionGroup/infra/hooks/useGetAllPermissionGroup'

export function PermissionGroupSearch() {
	return (
		<EntitySearch
			entityName="permissionGroup"
			useGetAllEntities={useGetAllPermissionGroups}
			urlPrefix="/form/permission-groups/edit"
			searchField="name"
			title="Búsqueda de grupos de permisos"
		/>
	)
}
