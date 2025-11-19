import { PermissionName } from '../value-object/PermissionName'
import { PermissionDescription } from '../value-object/PermissionDescription'
import { type PermissionPrimitives } from '../dto/Permission.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `Permission`
 * @class
 * @description Representa la entidad de dominio `Permission`.
 * Encapsula la lógica de negocio y las reglas de validación para un permiso.
 */
export class Permission {
	/**
	 * Crea una instancia de `Permission`.
	 * @param {PermissionName} name - El nombre del permiso como un Value Object.
	 * @param {PermissionDescription} description - La descripción del permiso como un Value Object.
	 */
	constructor(
		private readonly name: PermissionName,
		private readonly description: PermissionDescription
	) {}

	/**
	 * Crea una nueva instancia de `Permission` a partir de sus propiedades primitivas.
	 * @param {PermissionPrimitives} params - Las propiedades primitivas del permiso.
	 * @returns {Permission} Una nueva instancia de `Permission`.
	 */
	static create(params: PermissionPrimitives): Permission {
		return new Permission(
			new PermissionName(params.name),
			new PermissionDescription(params.description)
		)
	}

	/**
	 * Obtiene el valor primitivo del nombre del permiso.
	 * @type {Primitives<PermissionName>}
	 */
	get nameValue(): Primitives<PermissionName> {
		return this.name.value
	}
	/**
	 * Obtiene el valor primitivo de la descripción del permiso.
	 * @type {Primitives<PermissionDescription>}
	 */
	get descriptionValue(): Primitives<PermissionDescription> {
		return this.description.value
	}

	/**
	 * Convierte la entidad `Permission` a su representación de primitivos.
	 * @returns {PermissionPrimitives} La representación primitiva del permiso.
	 */
	toPrimitives(): PermissionPrimitives {
		return {
			name: this.nameValue,
			description: this.descriptionValue
		}
	}
}
