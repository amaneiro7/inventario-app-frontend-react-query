import { type PermissionGroupDto } from '../domain/dto/PermissionGroup.dto'
import { type DefaultPermissionGroup } from '../infra/reducers/permissionGroupFormReducer'

/**
 * Mapea un objeto `PermissionGroupDto` a la estructura `DefaultPermissionGroup` para el estado del formulario.
 * @param {PermissionGroupDto} permissionGroup - El objeto `PermissionGroupDto` a mapear.
 */
export const mapPermissionGroupToState = (data: PermissionGroupDto): DefaultPermissionGroup => {
	const permissions = data?.permissions.map(p => p.id)
	return {
		id: data.id,
		name: data.name,
		description: data.description,
		permissions,
		updatedAt: data?.updatedAt
	}
}
