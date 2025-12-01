import { AccessPolicyName } from '../value-object/AceessPolicyName'
import { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { DepartamentoId } from '@/entities/employee/departamento/domain/value-object/DepartamentoId'
import { PermissionGroupId } from '@/entities/accessControl/permissionGroup/domain/value-object/PermissionGroupId'
import { AccessPolicyPriority } from '../value-object/AccessPolicyPriority'
import { type AccessPolicyPrimitives } from '../dto/AccessPolicy.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { RoleId } from '@/entities/role/domain/value-object/RoleId'
import { VicepresidenciaId } from '@/entities/employee/vicepresidencia/domain/value-object/VicepresidenciaId'
import { VicepresidenciaEjecutivaId } from '@/entities/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { DirectivaId } from '@/entities/employee/directiva/domain/value-object/DirectivaId'

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
		private readonly departamentoId: DepartamentoId | null,
		private readonly vicepresidenciaId: VicepresidenciaId | null,
		private readonly vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId | null,
		private readonly directivaId: DirectivaId | null,
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
			params.departamentoId ? new DepartamentoId(params.departamentoId) : null,
			params.vicepresidenciaId ? new VicepresidenciaId(params.vicepresidenciaId) : null,
			params.vicepresidenciaEjecutivaId
				? new VicepresidenciaEjecutivaId(params.vicepresidenciaEjecutivaId)
				: null,
			params.directivaId ? new DirectivaId(params.directivaId) : null,
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
			departamentoId: this.departamentoValue,
			vicepresidenciaId: this.vicepresidenciaValue,
			vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue,
			directivaId: this.directivaValue,
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

	get departamentoValue(): Primitives<DepartamentoId> | null {
		return this.departamentoId?.value ?? null
	}

	get vicepresidenciaValue(): Primitives<VicepresidenciaId> | null {
		return this.vicepresidenciaId?.value ?? null
	}

	get vicepresidenciaEjecutivaValue(): Primitives<VicepresidenciaEjecutivaId> | null {
		return this.vicepresidenciaEjecutivaId?.value ?? null
	}

	get directivaValue(): Primitives<DirectivaId> | null {
		return this.directivaId?.value ?? null
	}

	get permissionGroupValue(): Primitives<PermissionGroupId>[] {
		return Array.from(this.permissionGroupIds).map(p => p.value)
	}

	get priorityValue(): Primitives<AccessPolicyPriority> {
		return this.priority.value
	}
}
