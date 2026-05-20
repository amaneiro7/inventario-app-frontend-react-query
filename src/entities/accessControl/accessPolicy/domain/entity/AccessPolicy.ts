import { AccessPolicyName } from '../value-object/AceessPolicyName'
import { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { PermissionGroupId } from '@/entities/accessControl/permissionGroup/domain/value-object/PermissionGroupId'
import { AccessPolicyPriority } from '../value-object/AccessPolicyPriority'
import { UnidadId } from '@/entities/employee/unidad/domain/value-object/UnidadId'
import { RoleId } from '@/entities/role/domain/value-object/RoleId'
import { type AccessPolicyPrimitives } from '../dto/AccessPolicy.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `AccessPolicy`
 * @class
 * @description Representa la entidad de dominio `AccessPolicy`.
 * Encapsula la lógica de negocio y las reglas de validación para una marca.
 */
export class AccessPolicy {
	/**
	 * Crea una instancia de `AccessPolicy`.
	 * @param {AccessPolicyPriority} priority - El nombre de la marca como un Value Object.
	 */
	private permissionGroupIds: Set<PermissionGroupId>
	constructor(
		private readonly name: AccessPolicyName,
		private readonly roleId: RoleId | null,
		private readonly cargoId: CargoId | null,
		private readonly unidadId: UnidadId | null,
		permissionGroupIds: Set<PermissionGroupId>,
		private readonly priority: AccessPolicyPriority
	) {
		this.permissionGroupIds = permissionGroupIds
	}

	/**
	 * Crea una nueva instancia de `AccessPolicy` a partir de sus propiedades primitivas.
	 * @param {AccessPolicyPrimitives} params - Las propiedades primitivas de la marca.
	 * @returns {AccessPolicy} Una nueva instancia de `AccessPolicy`.
	 */
	static create(params: AccessPolicyPrimitives): AccessPolicy {
		const permissionGroupIds = new Set(
			params.permissionGroupIds.map(
				permissionGroupId => new PermissionGroupId(permissionGroupId)
			)
		)

		return new AccessPolicy(
			new AccessPolicyName(params.name),
			params.roleId ? new RoleId(params.roleId) : null,
			params.cargoId ? new CargoId(params.cargoId) : null,
			params.unidadId ? new UnidadId(params.unidadId) : null,
			permissionGroupIds,
			new AccessPolicyPriority(params.priority)
		)
	}

	/**
	 * Convierte la entidad `AccessPolicy` a su representación primitiva.
	 * @returns {AccessPolicyPrimitives} La representación primitiva de la marca.
	 */
	toPrimitives(): AccessPolicyPrimitives {
		return {
			name: this.nameValue,
			roleId: this.roleValue,
			cargoId: this.cargoValue,
			unidadId: this.unidadValue,
			permissionGroupIds: this.permissionGroupValue,
			priority: this.priorityValue
		}
	}

	get nameValue(): Primitives<AccessPolicyName> {
		return this.name.value
	}

	get cargoValue(): Primitives<CargoId> | null {
		return this.cargoId?.value ?? null
	}

	get roleValue(): Primitives<RoleId> | null {
		return this.roleId?.value ?? null
	}

	get unidadValue(): Primitives<UnidadId> | null {
		return this.unidadId?.value ?? null
	}

	get permissionGroupValue(): Primitives<PermissionGroupId>[] {
		return Array.from(this.permissionGroupIds).map(p => p.value)
	}

	get priorityValue(): Primitives<AccessPolicyPriority> {
		return this.priority.value
	}
}
