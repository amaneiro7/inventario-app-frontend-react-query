import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AccessPolicyId } from '../value-object/AccessPolicyId'
import { type AccessPolicyPriority } from '../value-object/AccessPolicyPriority'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type PermissionGroupId } from '@/entities/accessControl/permissionGroup/domain/value-object/PermissionGroupId'
import { type AccessPolicyName } from '../value-object/AceessPolicyName'
import { type RoleId } from '@/entities/role/domain/value-object/RoleId'
import { type CargoDto } from '@/entities/employee/cargo/domain/dto/Cargo.dto'
import { type RoleDto } from '@/entities/role/domain/dto/Role.dto'
import { type PermissionGroupDto } from '@/entities/accessControl/permissionGroup/domain/dto/PermissionGroup.dto'
import type { UnidadDto } from '@/entities/employee/unidad/domain/dto/Unidad.dto'
import type { UnidadId } from '@/entities/employee/unidad/domain/value-object/UnidadId'

export interface AccessPolicy {
	id: Primitives<AccessPolicyId>
	name: Primitives<AccessPolicyName>
	roleId: Primitives<RoleId> | null
	cargoId: Primitives<CargoId> | null
	unidadId: Primitives<UnidadId> | null
	priority: Primitives<AccessPolicyPriority>
}

export type AccessPolicyParams = AccessPolicyPrimitives & {
	id?: Primitives<AccessPolicyId> | undefined
	permissionGroupIds: Primitives<PermissionGroupId>[]
}

export type AccessPolicyPrimitives = Omit<AccessPolicy, 'id'> & {
	permissionGroupIds: Primitives<PermissionGroupId>[]
}

export type AccessPolicyDto = AccessPolicy & {
	role: RoleDto | null
	cargo: CargoDto | null
	unidad: UnidadDto | null
	permissionsGroups: PermissionGroupDto[]
	updatedAt: string
}
