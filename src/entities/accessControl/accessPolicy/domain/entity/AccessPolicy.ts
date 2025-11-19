import { AccessPolicyName } from '../value-object/AceessPolicyName'
import { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { DepartamentoId } from '@/entities/employee/departamento/domain/value-object/DepartamentoId'
import { PermissionGroupId } from '@/entities/accessControl/permissionGroup/domain/value-object/PermissionGroupId'
import { AccessPolicyPriority } from '../value-object/AccessPolicyPriority'
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
	constructor(
		private readonly name: AccessPolicyName,
		private readonly cargoId: CargoId | null,
		private readonly departamentoId: DepartamentoId | null,
		private readonly permissionGroupId: PermissionGroupId,
		private readonly priority: AccessPolicyPriority
	) {}

	/**
	 * Crea una nueva instancia de `AccessPolicy` a partir de sus propiedades primitivas.
	 * @param {AccessPolicyPrimitives} params - Las propiedades primitivas de la marca.
	 * @returns {AccessPolicy} Una nueva instancia de `AccessPolicy`.
	 */
	static create(params: AccessPolicyPrimitives): AccessPolicy {
		return new AccessPolicy(
			new AccessPolicyName(params.name),
			params.cargoId ? new CargoId(params.cargoId) : null,
			params.departamentoId ? new DepartamentoId(params.departamentoId) : null,
			new PermissionGroupId(params.permissionGroupId),
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
			cargoId: this.cargoValue,
			departamentoId: this.departamentoValue,
			permissionGroupId: this.permissionGroupValue,
			priority: this.priorityValue
		}
	}

	get nameValue(): Primitives<AccessPolicyName> {
		return this.name.value
	}

	get cargoValue(): Primitives<CargoId> | null {
		return this.cargoId?.value ?? null
	}

	get departamentoValue(): Primitives<DepartamentoId> | null {
		return this.departamentoId?.value ?? null
	}

	get permissionGroupValue(): Primitives<PermissionGroupId> {
		return this.permissionGroupId.value
	}

	get priorityValue(): Primitives<AccessPolicyPriority> {
		return this.priority.value
	}
}
