import { EntitySearch } from '@/shared/ui/EntitySearch'
import { useGetAllAccessPolicies } from '@/entities/accessControl/accessPolicy/infra/hooks/useGetAllAccessPolicy'

export function AccessPolicySearch() {
	return (
		<EntitySearch
			entityName="permission"
			useGetAllEntities={useGetAllAccessPolicies}
			urlPrefix="/form/access-policy/edit"
			searchField="name"
			title="Búsqueda nombre de la política de acceso"
		/>
	)
}
