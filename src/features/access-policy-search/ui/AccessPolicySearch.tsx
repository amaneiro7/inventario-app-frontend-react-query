import { useGetAllAccessPolicies } from '@/entities/accessControl/accessPolicy/infra/hooks/useGetAllAccessPolicy'
import { createEntitySearch } from '@/shared/ui/EntitySearch/createEntitySearch'

const AccessPolicySearchComponent = createEntitySearch(useGetAllAccessPolicies)

export function AccessPolicySearch() {
	return (
		<AccessPolicySearchComponent
			entityName="permission"
			urlPrefix="/form/access-policy/edit"
			searchField="name"
			title="Búsqueda nombre de la política de acceso"
		/>
	)
}
