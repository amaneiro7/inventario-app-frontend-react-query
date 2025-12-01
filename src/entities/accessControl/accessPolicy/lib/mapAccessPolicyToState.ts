import { type AccessPolicyDto } from '../domain/dto/AccessPolicy.dto'
import { type DefaultAccessPolicy } from '../infra/reducers/accessPolicyFormReducer'

/**
 * Mapea un objeto `AccessPolicyDto` a la estructura `DefaultAccessPolicy` para el estado del formulario.
 * @param {AccessPolicyDto} data - El objeto `AccessPolicyDto` a mapear.
 * @returns {DefaultAccessPolicy}
 */
export const mapAccessPolicyToState = (data: AccessPolicyDto): DefaultAccessPolicy => {
	const permissionGroupIds = data.permissionsGroups.map(p => p.id)
	return {
		id: data.id,
		name: data.name,
		cargoId: data.cargoId ?? '',
		departamentoId: data.departamentoId ?? '',
		permissionGroupIds,
		priority: data.priority,
		updatedAt: data?.updatedAt
	}
}
