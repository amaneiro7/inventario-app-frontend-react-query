import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * `CategoryName`
 * @class
 * @extends {StringValueObject}
 * @description Value Object que representa el nombre de una `Category`.
 * Asegura que el nombre cumpla con ciertas reglas de negocio (longitud mínima y máxima).
 */
export class CategoryName extends StringValueObject {}
