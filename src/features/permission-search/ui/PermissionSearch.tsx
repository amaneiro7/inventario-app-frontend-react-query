import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllPermissions } from '@/entities/accessControl/permission/infra/hooks/useGetAllPermission'

export function PermissionSearch() {
	return (
		<EntitySearch
			entityName="permission"
			useGetAllEntities={useGetAllPermissions}
			urlPrefix="/form/permission/edit"
			searchField="name"
			title="Búsqueda nombre del permiso"
		/>
	)
}
