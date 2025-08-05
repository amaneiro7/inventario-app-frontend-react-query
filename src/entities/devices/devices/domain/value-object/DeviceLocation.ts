import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { TypeOfSiteId } from '@/entities/locations/typeOfSites/domain/value-object/TypeOfSiteId'
import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { type LocationId } from '@/entities/locations/locations/domain/value-object/LocationId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * @class DeviceLocation
 * @extends {AcceptedNullValueObject<Primitives<LocationId>>}
 * @description Value Object que representa la ubicación de un dispositivo.
 * Incluye lógica de validación basada en el estado del dispositivo y el tipo de sitio.
 */
export class DeviceLocation extends AcceptedNullValueObject<Primitives<LocationId>> {
	private static errors = ''

	/**
	 * Crea una instancia de `DeviceLocation`.
	 * @param {Primitives<LocationId> | null} value - El ID de la ubicación.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @param {Primitives<TypeOfSiteId>} [typeOfSite] - El ID del tipo de sitio de la ubicación.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */	constructor(
		value: Primitives<LocationId> | null,
		private readonly status: Primitives<StatusId>,
		private readonly typeOfSite?: Primitives<TypeOfSiteId>
	) {
		super(value)
		if (
			!DeviceLocation.isValid({
				status: this.status,
				typeOfSite: this.typeOfSite
			})
		) {
			throw new Error(DeviceLocation.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */	private static updateError(error: string): void {
		DeviceLocation.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */	private static get errorsValue(): string {
		return DeviceLocation.errors
	}

	/**
	 * Valida la ubicación del dispositivo en función de su estado y tipo de sitio.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @param {Primitives<TypeOfSiteId>} [props.typeOfSite] - El ID del tipo de sitio de la ubicación.
	 * @returns {boolean} `true` si la ubicación es válida, `false` en caso contrario.
	 */	public static isValid({
		status,
		typeOfSite
	}: {
		status?: Primitives<StatusId>
		typeOfSite?: Primitives<TypeOfSiteId>
	}): boolean {
		if (!status) return true
		// condicional para validar
		switch (status) {
			case StatusOptions.INUSE:
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.JORNADA:
			case StatusOptions.GUARDIA:
			case StatusOptions.DISPONIBLE:
				if (typeOfSite === TypeOfSiteOptions.ALMACEN) {
					this.updateError('Si esta en uso, la ubicación no puede estar en almacen.')
					return false
				}
				break
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
				if (typeOfSite !== TypeOfSiteOptions.ALMACEN) {
					this.updateError('Si no esta en uso, solo puede estar ubicado en el almacen.')
					return false
				}
				break
			default:
				break
		}
		if (status !== StatusOptions.DESINCORPORADO && !typeOfSite) {
			this.updateError('La ubicación es requerida.')
			return false
		}
		return true
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */	public static invalidMessage(): string {
		return this.errorsValue
	}
}