import { type PermissionGroupDto } from '../domain/dto/PermissionGroup.dto'
import { type DefaultPermissionGroup } from '../infra/reducers/permissionGroupFormReducer'

/**
 * Mapea un objeto `PermissionGroupDto` a la estructura `DefaultPermissionGroup` para el estado del formulario.
 * @param {PermissionGroupDto} permissionGroup - El objeto `PermissionGroupDto` a mapear.
 */
export const mapPermissionGroupToState = (
	permissionGroup: PermissionGroupDto
): DefaultPermissionGroup => {
	const permissions = [...permissionGroup?.permissions.map(p => p.id)]
	return {
		id: permissionGroup.id,
		name: permissionGroup.name,
		description: permissionGroup.description,
		permissions,
		updatedAt: permissionGroup?.updatedAt
	}
}
