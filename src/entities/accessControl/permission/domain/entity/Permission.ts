import { PermissionName } from '../value-object/PermissionName'
import { type PermissionPrimitives } from '../dto/Permission.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `Permission`
 * @class
 * @description Representa la entidad de dominio `Permission`.
 * Encapsula la lógica de negocio y las reglas de validación para una marca.
 */
export class Permission {
	/**
	 * Crea una instancia de `Permission`.
	 * @param {PermissionName} name - El nombre de la marca como un Value Object.
	 */ constructor(private readonly name: PermissionName) {}

	/**
	 * Crea una nueva instancia de `Permission` a partir de sus propiedades primitivas.
	 * @param {PermissionPrimitives} params - Las propiedades primitivas de la marca.
	 * @returns {Permission} Una nueva instancia de `Permission`.
	 */ static create(params: PermissionPrimitives): Permission {
		return new Permission(new PermissionName(params.name))
	}

	/**
	 * Obtiene el valor primitivo del nombre de la marca.
	 * @type {Primitives<PermissionName>}
	 */ get nameValue(): Primitives<PermissionName> {
		return this.name.value
	}

	/**
	 * Convierte la entidad `Permission` a su representación primitiva.
	 * @returns {PermissionPrimitives} La representación primitiva de la marca.
	 */ toPrimitives(): PermissionPrimitives {
		return {
			name: this.name.value
		}
	}
}
