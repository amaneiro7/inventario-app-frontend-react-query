import { PermissionDto } from '../domain/dto/Permission.dto'
import { DefaultPermission } from '../infra/reducers/permissionFormReducer'

/**
 * Mapea un objeto `PermissionDto` a la estructura `DefaultPermission` para el estado del formulario.
 * @param {PermissionDto} permission - El objeto `PermissionDto` a mapear.
 * @returns {DefaultPermission}
 */
export const mapPermissionToState = (permission: PermissionDto): DefaultPermission => ({
	id: permission.id,
	name: permission.name,
	description: permission.description,
	updatedAt: permission?.updatedAt
})
