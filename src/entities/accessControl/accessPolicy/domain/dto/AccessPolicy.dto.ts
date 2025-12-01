import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AccessPolicyId } from '../value-object/AccessPolicyId'
import { type AccessPolicyPriority } from '../value-object/AccessPolicyPriority'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type DepartamentoId } from '@/entities/employee/departamento/domain/value-object/DepartamentoId'
import { type PermissionGroupId } from '@/entities/accessControl/permissionGroup/domain/value-object/PermissionGroupId'
import { type CargoDto } from '@/entities/employee/cargo/domain/dto/Cargo.dto'
import { type DepartamentoDto } from '@/entities/employee/departamento/domain/dto/Departamento.dto'
import { type PermissionGroupDto } from '@/entities/accessControl/permissionGroup/domain/dto/PermissionGroup.dto'
import { type AccessPolicyName } from '../value-object/AceessPolicyName'

export interface AccessPolicy {
	id: Primitives<AccessPolicyId>
	name: Primitives<AccessPolicyName>
	cargoId: Primitives<CargoId> | null
	departamentoId: Primitives<DepartamentoId> | null
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
	cargo: CargoDto | null
	departamento: DepartamentoDto | null
	permissionsGroups: PermissionGroupDto[]
	updatedAt: string
}
