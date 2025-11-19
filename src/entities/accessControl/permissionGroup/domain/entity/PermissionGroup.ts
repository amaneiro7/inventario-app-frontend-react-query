import { PermissionGroupName } from '../value-object/PermissionGroupName'
import { type PermissionGroupPrimitives } from '../dto/PermissionGroup.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { PermissionId } from '@/entities/accessControl/permission/domain/value-object/PermissionId'

/**
 * `PermissionGroup`
 * @class
 * @description Representa la entidad de dominio `PermissionGroup`.
 * Encapsula la lógica de negocio y las reglas de validación para una marca.
 */
export class PermissionGroup {
	/**
	 * Crea una instancia de `PermissionGroup`.
	 * @param {PermissionGroupName} name - El nombre de la marca como un Value Object.
	 * @param {PermissionId[]} permissions - Un array de IDs de categorías como Value Objects.
	 */
	constructor(
		private readonly name: PermissionGroupName,
		private readonly permissions: PermissionId[]
	) {}

	/**
	 * Crea una nueva instancia de `PermissionGroup` a partir de sus propiedades primitivas.
	 * @param {PermissionGroupPrimitives} params - Las propiedades primitivas de la marca.
	 * @returns {PermissionGroup} Una nueva instancia de `PermissionGroup`.
	 */
	static create(params: PermissionGroupPrimitives): PermissionGroup {
		return new PermissionGroup(
			new PermissionGroupName(params.name),
			params.permissions.map(permissionId => new PermissionId(permissionId))
		)
	}

	/**
	 * Obtiene el valor primitivo del nombre de la marca.
	 * @type {Primitives<PermissionGroupName>}
	 */
	get nameValue(): Primitives<PermissionGroupName> {
		return this.name.value
	}

	/**
	 * Obtiene los valores primitivos de los IDs de las categorías asociadas.
	 * @type {Primitives<PermissionId>[]}
	 */
	get permissionsValue(): Primitives<PermissionId>[] {
		return this.permissions.map(p => p.value)
	}

	/**
	 * Convierte la entidad `PermissionGroup` a su representación primitiva.
	 * @returns {PermissionGroupPrimitives} La representación primitiva de la marca.
	 */
	toPrimitives(): PermissionGroupPrimitives {
		return {
			name: this.nameValue,
			permissions: this.permissionsValue
		}
	}
}
