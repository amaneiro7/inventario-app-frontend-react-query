import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AccessPolicyId } from '../value-object/AccessPolicyId'
import { type AccessPolicyPriority } from '../value-object/AccessPolicyPriority'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type PermissionGroupId } from '@/entities/accessControl/permissionGroup/domain/value-object/PermissionGroupId'
import { type AccessPolicyName } from '../value-object/AceessPolicyName'
import { type DepartamentoId } from '@/entities/employee/departamento/domain/value-object/DepartamentoId'
import { type RoleId } from '@/entities/role/domain/value-object/RoleId'
import { type CargoDto } from '@/entities/employee/cargo/domain/dto/Cargo.dto'
import { type VicepresidenciaId } from '@/entities/employee/vicepresidencia/domain/value-object/VicepresidenciaId'
import { type DirectivaId } from '@/entities/employee/directiva/domain/value-object/DirectivaId'
import { type VicepresidenciaEjecutivaId } from '@/entities/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type RoleDto } from '@/entities/role/domain/dto/Role.dto'
import { type DepartamentoDto } from '@/entities/employee/departamento/domain/dto/Departamento.dto'
import { type VicepresidenciaDto } from '@/entities/employee/vicepresidencia/domain/dto/Vicepresidencia.dto'
import { type VicepresidenciaEjecutivaDto } from '@/entities/employee/vicepresidenciaEjecutiva/domain/dto/VicepresidenciaEjecutiva.dto'
import { type DirectivaDto } from '@/entities/employee/directiva/domain/dto/Directiva.dto'
import { type PermissionGroupDto } from '@/entities/accessControl/permissionGroup/domain/dto/PermissionGroup.dto'

export interface AccessPolicy {
	id: Primitives<AccessPolicyId>
	name: Primitives<AccessPolicyName>
	roleId: Primitives<RoleId> | null
	cargoId: Primitives<CargoId> | null
	departamentoId: Primitives<DepartamentoId> | null
	vicepresidenciaId: Primitives<VicepresidenciaId> | null
	vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId> | null
	directivaId: Primitives<DirectivaId> | null
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
	departamento: DepartamentoDto | null
	vicepresidencia: VicepresidenciaDto | null
	vicepresidenciaEjecutiva: VicepresidenciaEjecutivaDto | null
	directiva: DirectivaDto | null
	permissionsGroups: PermissionGroupDto[]
	updatedAt: string
}
