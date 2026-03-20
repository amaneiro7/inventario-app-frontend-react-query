import { useGetAllPermissions } from '@/entities/accessControl/permission/infra/hooks/useGetAllPermission'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const PermissionSearchComponent = createEntitySearch(useGetAllPermissions)

export function PermissionSearch() {
	return (
		<PermissionSearchComponent
			entityName="permission"
			urlPrefix="/form/permission/edit"
			searchField="name"
			title="Búsqueda nombre del permiso"
		/>
	)
}
